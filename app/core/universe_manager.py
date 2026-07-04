"""Universe CRUD operations with SQLite."""

import logging
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, List, Dict, Any

logger = logging.getLogger(__name__)

# --- Database Setup ---

def init_db(db_path: str) -> None:
    """Create universe table if it doesn't exist."""
    Path(db_path).parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(db_path)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS universes (
            id TEXT PRIMARY KEY,
            topic TEXT NOT NULL,
            display_name TEXT NOT NULL,
            description TEXT NOT NULL,
            facts_count INTEGER DEFAULT 0,
            play_count INTEGER DEFAULT 0,
            is_prebuilt INTEGER DEFAULT 0,
            collection_name TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()
    logger.info(f"Universe DB initialized at {db_path}")


def _get_conn(db_path: str) -> sqlite3.Connection:
    """Get a database connection with row factory."""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn


# --- CRUD Operations ---

def create_universe(
    db_path: str,
    topic: str,
    display_name: str,
    description: str,
    facts_count: int = 0,
    is_prebuilt: bool = False,
) -> Dict[str, Any]:
    """Create a new universe record. Returns the created universe dict."""
    universe_id = str(uuid.uuid4())[:8]  # Short ID for URLs
    collection_name = f"universe_{universe_id}"
    created_at = datetime.now(timezone.utc).isoformat()

    conn = _get_conn(db_path)
    conn.execute(
        """INSERT INTO universes (id, topic, display_name, description, facts_count, play_count, is_prebuilt, collection_name, created_at)
           VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)""",
        (universe_id, topic, display_name, description, facts_count, int(is_prebuilt), collection_name, created_at),
    )
    conn.commit()
    conn.close()

    logger.info(f"Created universe '{display_name}' (id={universe_id})")
    return {
        "id": universe_id,
        "topic": topic,
        "display_name": display_name,
        "description": description,
        "facts_count": facts_count,
        "play_count": 0,
        "is_prebuilt": is_prebuilt,
        "collection_name": collection_name,
        "created_at": created_at,
    }


def get_universe(db_path: str, universe_id: str) -> Optional[Dict[str, Any]]:
    """Get a single universe by ID."""
    conn = _get_conn(db_path)
    row = conn.execute("SELECT * FROM universes WHERE id = ?", (universe_id,)).fetchone()
    conn.close()

    if row is None:
        return None
    return _row_to_dict(row)


def list_universes(db_path: str) -> List[Dict[str, Any]]:
    """List all universes, newest first."""
    conn = _get_conn(db_path)
    rows = conn.execute("SELECT * FROM universes ORDER BY is_prebuilt DESC, created_at DESC").fetchall()
    conn.close()
    return [_row_to_dict(row) for row in rows]


def increment_play_count(db_path: str, universe_id: str) -> None:
    """Increment the play count for a universe."""
    conn = _get_conn(db_path)
    conn.execute("UPDATE universes SET play_count = play_count + 1 WHERE id = ?", (universe_id,))
    conn.commit()
    conn.close()


def delete_universe(db_path: str, universe_id: str) -> bool:
    """Delete a universe record. Returns True if deleted."""
    conn = _get_conn(db_path)
    cursor = conn.execute("DELETE FROM universes WHERE id = ?", (universe_id,))
    conn.commit()
    conn.close()
    return cursor.rowcount > 0


def _row_to_dict(row: sqlite3.Row) -> Dict[str, Any]:
    """Convert a sqlite3.Row to a dict with proper types."""
    return {
        "id": row["id"],
        "topic": row["topic"],
        "display_name": row["display_name"],
        "description": row["description"],
        "facts_count": row["facts_count"],
        "play_count": row["play_count"],
        "is_prebuilt": bool(row["is_prebuilt"]),
        "collection_name": row["collection_name"],
        "created_at": row["created_at"],
    }
