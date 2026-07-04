"""Generate wrong facts for a universe using Gemini, then embed and store in ChromaDB."""

import json
import logging
import uuid
from typing import List, Optional, Any

from app.config import settings
from app.core.llm_interface import invoke_llm_langchain
from app.core.vector_store_manager import embed_texts
from langchain_core.messages import HumanMessage

import chromadb

logger = logging.getLogger(__name__)


# --- Prompt for generating wrong facts ---

GENERATION_PROMPT = """Kamu adalah generator ensiklopedia dari universe alternatif yang absurd.

Topik: {topic}

Generate {count} "fakta" tentang topik ini dengan aturan:
1. Setiap fakta harus SEPENUHNYA SALAH tapi ditulis dengan gaya formal ensiklopedia Wikipedia
2. Fakta harus spesifik — sertakan nama orang/tempat (yang salah), tanggal (yang salah), angka (yang salah)
3. Fakta-fakta harus SALING KONSISTEN — jangan kontradiksi antar fakta. Bangun satu "dunia" yang coherent
4. Campur antara yang ABSURD OBVIOUS (lucu) dan yang SUBTLE (hampir kedengeran benar)
5. Tulis dalam Bahasa Indonesia, gaya ensiklopedia formal
6. Setiap fakta 2-4 kalimat panjangnya
7. JANGAN masukkan disclaimer atau penjelasan bahwa ini salah

PENTING: Output HANYA JSON array of strings. Tidak ada penjelasan tambahan.
Contoh format output:
["Fakta pertama yang salah total tapi ditulis formal.", "Fakta kedua yang juga salah tapi meyakinkan."]
"""

METADATA_PROMPT = """Berdasarkan topik "{topic}", berikan:
1. display_name: nama pendek yang catchy untuk universe ini (2-4 kata, Bahasa Indonesia)
2. description: satu kalimat teaser lucu yang menggambarkan betapa ngaconya universe ini (max 100 karakter)

Output HANYA JSON object:
{{"display_name": "...", "description": "..."}}
"""


async def generate_universe_facts(topic: str) -> Optional[List[str]]:
    """Generate wrong facts for a topic using Gemini.

    Returns a list of wrong-fact strings, or None on failure.
    """
    prompt = GENERATION_PROMPT.format(topic=topic, count=settings.UNIVERSE_FACTS_COUNT)

    try:
        response = invoke_llm_langchain(
            prompt_input=[HumanMessage(content=prompt)],
            model_name=settings.LLM_MODEL_NAME,
            temperature=0.9,  # High creativity for absurd facts
        )

        if response is None:
            logger.error(f"LLM returned None when generating facts for topic: {topic}")
            return None

        # Parse JSON response
        # Strip markdown code fences if present
        clean = response.strip()
        if clean.startswith("```"):
            clean = clean.split("\n", 1)[1] if "\n" in clean else clean[3:]
            if clean.endswith("```"):
                clean = clean[:-3]
            clean = clean.strip()

        facts = json.loads(clean)
        if not isinstance(facts, list) or len(facts) == 0:
            logger.error(f"LLM returned invalid facts format for topic: {topic}")
            return None

        logger.info(f"Generated {len(facts)} wrong facts for topic: '{topic}'")
        return facts

    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse LLM response as JSON for topic '{topic}': {e}")
        return None
    except Exception as e:
        logger.error(f"Error generating facts for topic '{topic}': {e}", exc_info=True)
        return None


async def generate_universe_metadata(topic: str) -> Optional[dict]:
    """Generate display name and description for a universe."""
    prompt = METADATA_PROMPT.format(topic=topic)

    try:
        response = invoke_llm_langchain(
            prompt_input=[HumanMessage(content=prompt)],
            model_name=settings.LLM_MODEL_NAME,
            temperature=0.8,
        )

        if response is None:
            return None

        clean = response.strip()
        if clean.startswith("```"):
            clean = clean.split("\n", 1)[1] if "\n" in clean else clean[3:]
            if clean.endswith("```"):
                clean = clean[:-3]
            clean = clean.strip()

        metadata = json.loads(clean)
        return metadata

    except (json.JSONDecodeError, Exception) as e:
        logger.error(f"Failed to generate metadata for topic '{topic}': {e}")
        return None


def store_facts_in_vectorstore(
    facts: List[str],
    collection_name: str,
    embedding_model: Any,
    vector_store_path: str,
) -> bool:
    """Embed facts and store them in a dedicated ChromaDB collection.

    Returns True on success.
    """
    try:
        # Create a dedicated collection for this universe
        client = chromadb.PersistentClient(path=vector_store_path)
        collection = client.get_or_create_collection(name=collection_name)

        # Generate embeddings
        embeddings = embed_texts(facts, embedding_model)
        if not embeddings:
            logger.error(f"Failed to generate embeddings for collection: {collection_name}")
            return False

        # Generate IDs and metadata
        ids = [f"fact_{uuid.uuid4().hex[:8]}" for _ in facts]
        metadatas = [{"source": "generated", "index": i} for i in range(len(facts))]

        # Add to collection
        collection.add(
            documents=facts,
            embeddings=embeddings,
            ids=ids,
            metadatas=metadatas,
        )

        logger.info(f"Stored {len(facts)} facts in collection '{collection_name}'")
        return True

    except Exception as e:
        logger.error(f"Error storing facts in vector store: {e}", exc_info=True)
        return False
