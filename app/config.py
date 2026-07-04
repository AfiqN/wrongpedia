import logging
from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)


class Settings(BaseSettings):
    """WrongPedia application settings."""

    # --- API Keys ---
    GOOGLE_API_KEY: Optional[str] = None

    # --- LLM ---
    LLM_MODEL_NAME: str = "gemini-2.0-flash"
    LLM_TEMPERATURE: float = 0.7  # Slightly creative for funnier wrong answers

    # --- Embeddings & Vector Store ---
    EMBEDDING_MODEL_NAME: str = "intfloat/multilingual-e5-large"
    VECTOR_STORE_PATH: str = "app/data/chroma_db"
    RAG_NUM_RESULTS: int = 5  # More chunks = more consistent wrong answers

    # --- Universe Generation ---
    UNIVERSE_FACTS_COUNT: int = 20  # Facts per universe
    UNIVERSE_DB_PATH: str = "app/data/wrongpedia.db"

    # --- Pydantic-Settings ---
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()

if not settings.GOOGLE_API_KEY:
    logger.warning("=" * 50)
    logger.warning("WARNING: GOOGLE_API_KEY is not set.")
    logger.warning("Universe generation and chat will not work.")
    logger.warning("=" * 50)
