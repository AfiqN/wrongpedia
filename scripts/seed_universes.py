"""Seed pre-built universes into the database and vector store."""

import sys
import json
import logging
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.config import settings
from app.core.model_loader import initialize_embedding_model
from app.core.universe_manager import init_db, create_universe, list_universes
from app.core.universe_generator import store_facts_in_vectorstore

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


def main():
    """Load seed data and populate DB + vector store."""
    seed_path = Path(__file__).parent.parent / "app" / "data" / "seed_universes.json"

    if not seed_path.exists():
        logger.error(f"Seed file not found: {seed_path}")
        sys.exit(1)

    with open(seed_path, "r", encoding="utf-8") as f:
        universes_data = json.load(f)

    logger.info(f"Loaded {len(universes_data)} universes from seed file.")

    # Init DB
    init_db(settings.UNIVERSE_DB_PATH)

    # Check if already seeded
    existing = list_universes(settings.UNIVERSE_DB_PATH)
    if existing:
        logger.info(f"Database already has {len(existing)} universes. Skipping seed.")
        return

    # Load embedding model
    logger.info(f"Loading embedding model: {settings.EMBEDDING_MODEL_NAME}")
    embedding_model = initialize_embedding_model(settings.EMBEDDING_MODEL_NAME)
    if embedding_model is None:
        logger.error("Failed to load embedding model.")
        sys.exit(1)

    # Seed each universe
    for i, data in enumerate(universes_data, 1):
        topic = data["topic"]
        display_name = data["display_name"]
        description = data["description"]
        facts = data["facts"]

        logger.info(f"[{i}/{len(universes_data)}] Seeding: {display_name} ({len(facts)} facts)")

        # Create DB record
        universe = create_universe(
            db_path=settings.UNIVERSE_DB_PATH,
            topic=topic,
            display_name=display_name,
            description=description,
            facts_count=len(facts),
            is_prebuilt=True,
        )

        # Embed and store facts
        success = store_facts_in_vectorstore(
            facts=facts,
            collection_name=universe["collection_name"],
            embedding_model=embedding_model,
            vector_store_path=settings.VECTOR_STORE_PATH,
        )

        if success:
            logger.info(f"  ✓ {display_name} seeded successfully.")
        else:
            logger.error(f"  ✗ Failed to store facts for {display_name}.")

    logger.info("Seeding complete!")


if __name__ == "__main__":
    main()
