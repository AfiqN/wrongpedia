"""WrongPedia API endpoints."""

import logging
from typing import Any

from fastapi import APIRouter, HTTPException, Request, status

from app.schemas import (
    ChatRequest,
    ChatResponse,
    UniverseCreate,
    UniverseResponse,
    UniverseListResponse,
)
from app.core.universe_generator import (
    generate_universe_facts,
    generate_universe_metadata,
    store_facts_in_vectorstore,
)
from app.core.universe_manager import (
    create_universe,
    get_universe,
    list_universes,
    increment_play_count,
    delete_universe,
)
from app.core.rag_orchestrator import get_chat_response
from app.dependencies import get_embedding_model

logger = logging.getLogger(__name__)

router = APIRouter()


# --- Universe Endpoints ---


@router.get("/universes", response_model=UniverseListResponse, summary="List all universes")
async def list_all_universes(request: Request):
    """Get all available universes (pre-built and user-generated)."""
    db_path = request.app.state.universe_db_path
    universes = list_universes(db_path)
    return UniverseListResponse(universes=universes, total=len(universes))


@router.get("/universes/{universe_id}", response_model=UniverseResponse, summary="Get universe details")
async def get_universe_detail(universe_id: str, request: Request):
    """Get details of a specific universe."""
    db_path = request.app.state.universe_db_path
    universe = get_universe(db_path, universe_id)
    if universe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Universe not found.")
    return universe


@router.post(
    "/universes/generate",
    response_model=UniverseResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Generate a new universe",
)
async def generate_new_universe(body: UniverseCreate, request: Request):
    """Generate a new universe from a topic. Creates wrong facts and stores them."""
    topic = body.topic.strip()
    if not topic:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Topic cannot be empty.")

    embedding_model = await get_embedding_model(request)
    db_path = request.app.state.universe_db_path
    vector_store_path = request.app.state.vector_store_path

    # 1. Generate wrong facts
    logger.info(f"Generating universe for topic: '{topic}'")
    facts = await generate_universe_facts(topic)
    if facts is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate facts. Try again.",
        )

    # 2. Generate metadata (display name + description)
    metadata = await generate_universe_metadata(topic)
    display_name = metadata.get("display_name", topic) if metadata else topic
    description = metadata.get("description", f"Universe alternatif tentang {topic}") if metadata else f"Universe alternatif tentang {topic}"

    # 3. Create universe record in DB
    universe = create_universe(
        db_path=db_path,
        topic=topic,
        display_name=display_name,
        description=description,
        facts_count=len(facts),
        is_prebuilt=False,
    )

    # 4. Embed and store facts in ChromaDB
    success = store_facts_in_vectorstore(
        facts=facts,
        collection_name=universe["collection_name"],
        embedding_model=embedding_model,
        vector_store_path=vector_store_path,
    )

    if not success:
        # Cleanup the DB record if storage failed
        delete_universe(db_path, universe["id"])
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to store universe facts. Try again.",
        )

    logger.info(f"Universe created: '{display_name}' ({len(facts)} facts)")
    return universe


@router.delete(
    "/universes/{universe_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a universe",
)
async def delete_universe_endpoint(universe_id: str, request: Request):
    """Delete a universe and its associated data."""
    db_path = request.app.state.universe_db_path

    universe = get_universe(db_path, universe_id)
    if universe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Universe not found.")

    # Delete ChromaDB collection
    try:
        import chromadb
        client = chromadb.PersistentClient(path=request.app.state.vector_store_path)
        client.delete_collection(name=universe["collection_name"])
    except Exception as e:
        logger.warning(f"Could not delete collection '{universe['collection_name']}': {e}")

    # Delete DB record
    delete_universe(db_path, universe_id)
    return None


# --- Chat Endpoint ---


@router.post("/universes/{universe_id}/chat", response_model=ChatResponse, summary="Chat in a universe")
async def chat_in_universe(universe_id: str, body: ChatRequest, request: Request):
    """Chat with the wrong professor in a specific universe."""
    db_path = request.app.state.universe_db_path
    embedding_model = await get_embedding_model(request)
    vector_store_path = request.app.state.vector_store_path

    # Validate universe exists
    universe = get_universe(db_path, universe_id)
    if universe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Universe not found.")

    question = body.question.strip()
    if not question:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Question cannot be empty.")

    # Increment play count
    increment_play_count(db_path, universe_id)

    # Get response from RAG
    answer = get_chat_response(
        question=question,
        collection_name=universe["collection_name"],
        embedding_model=embedding_model,
        vector_store_path=vector_store_path,
        chat_history=body.chat_history,
    )

    if answer is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate response. The professor is... thinking.",
        )

    return ChatResponse(
        answer=answer,
        universe_id=universe_id,
        universe_topic=universe["topic"],
    )
