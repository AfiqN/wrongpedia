import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints import router as api_router
from app.config import settings
from app.core.model_loader import initialize_embedding_model
from app.core.vector_store_manager import initialize_vector_store
from app.core.universe_manager import init_db

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: load embedding model, init vector store, init universe DB."""
    logger.info("WrongPedia starting up...")

    # Initialize embedding model
    logger.info(f"Loading embedding model: {settings.EMBEDDING_MODEL_NAME}")
    embedding_model = initialize_embedding_model(settings.EMBEDDING_MODEL_NAME)
    if embedding_model is None:
        logger.error("CRITICAL: Embedding model failed to load.")
    app.state.embedding_model = embedding_model

    # Initialize ChromaDB client (shared across universes)
    logger.info(f"Initializing vector store at '{settings.VECTOR_STORE_PATH}'")
    vector_client = initialize_vector_store(
        persist_directory=settings.VECTOR_STORE_PATH,
        collection_name="_default"  # Placeholder; each universe gets its own collection
    )
    app.state.vector_store_path = settings.VECTOR_STORE_PATH
    app.state.vector_client = vector_client

    # Initialize universe SQLite database
    init_db(settings.UNIVERSE_DB_PATH)
    app.state.universe_db_path = settings.UNIVERSE_DB_PATH

    logger.info("WrongPedia startup complete.")
    yield

    # Shutdown
    logger.info("WrongPedia shutting down...")
    app.state.embedding_model = None
    app.state.vector_client = None
    logger.info("Shutdown complete.")


app = FastAPI(
    title="WrongPedia API",
    description="AI encyclopedia that is confidently, consistently, hilariously wrong.",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Status"])
async def health_check(request: Request):
    """Health check endpoint."""
    emb_ok = getattr(request.app.state, "embedding_model", None) is not None
    db_ok = getattr(request.app.state, "vector_client", None) is not None

    if emb_ok and db_ok:
        return {"status": "ok", "embedding_model": emb_ok, "vector_store": db_ok}

    raise HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail={
            "status": "error",
            "embedding_model": emb_ok,
            "vector_store": db_ok,
        },
    )


# Mount API router
app.include_router(api_router, prefix="/api/v1", tags=["WrongPedia API"])

logger.info("WrongPedia app configured.")
