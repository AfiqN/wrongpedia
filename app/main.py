import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints import router as api_router
from app.api.chat_endpoints import router as chat_router
from app.config import settings

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup / shutdown."""
    logger.info("WrongPedia starting up...")

    if not settings.GOOGLE_API_KEY:
        logger.warning("GOOGLE_API_KEY not set — article generation will fail.")

    logger.info(f"LLM model: {settings.LLM_MODEL_NAME}")
    logger.info("WrongPedia startup complete.")
    yield
    logger.info("WrongPedia shutting down.")


app = FastAPI(
    title="WrongPedia API",
    description="Ensiklopedia AI yang percaya diri, konsisten, dan salah total.",
    version="2.0.0",
    lifespan=lifespan,
)

# CORS — allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3456", "http://127.0.0.1:3456"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Status"])
async def health_check():
    """Health check endpoint."""
    return {
        "status": "ok",
        "llm_model": settings.LLM_MODEL_NAME,
        "api_key_configured": settings.GOOGLE_API_KEY is not None,
    }


# Mount API routers
app.include_router(api_router, prefix="/api/v1", tags=["WrongPedia API"])
app.include_router(chat_router, prefix="/api/v1", tags=["Chat"])

logger.info("WrongPedia app configured.")
