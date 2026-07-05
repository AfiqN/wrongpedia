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
    LLM_MODEL_NAME: str = "gemini-2.5-flash"

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
    logger.warning("Article generation will not work.")
    logger.warning("=" * 50)
