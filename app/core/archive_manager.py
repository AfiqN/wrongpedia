"""Archive manager — CRUD for archived conversations."""

import json
import sqlite3
import uuid
from datetime import datetime, timezone
from typing import Optional


def _ensure_archive_table(db_path: str) -> None:
    """Create archived_conversations table if it doesn't exist."""
    conn = sqlite3.connect(db_path)
    try:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS archived_conversations (
                id TEXT PRIMARY KEY,
                universe_id TEXT NOT NULL,
                topic TEXT NOT NULL,
                messages_json TEXT NOT NULL,
                votes INTEGER DEFAULT 0,
                created_at TEXT NOT NULL
            )
        """)
        conn.commit()
    finally:
        conn.close()


def archive_conversation(
    db_path: str,
    universe_id: str,
    topic: str,
    messages: list[dict],
) -> dict:
    """Save a conversation to the archive."""
    _ensure_archive_table(db_path)

    thread_id = str(uuid.uuid4())[:8]
    now = datetime.now(timezone.utc).isoformat()
    messages_json = json.dumps(messages, ensure_ascii=False)

    conn = sqlite3.connect(db_path)
    try:
        conn.execute(
            """INSERT INTO archived_conversations (id, universe_id, topic, messages_json, votes, created_at)
               VALUES (?, ?, ?, ?, 0, ?)""",
            (thread_id, universe_id, topic, messages_json, now),
        )
        conn.commit()
    finally:
        conn.close()

    return {
        "id": thread_id,
        "universe_id": universe_id,
        "topic": topic,
        "messages": messages,
        "votes": 0,
        "created_at": now,
    }


def list_archived(
    db_path: str,
    page: int = 1,
    sort: str = "votes",
    per_page: int = 10,
) -> tuple[list[dict], int]:
    """List archived conversations, paginated."""
    _ensure_archive_table(db_path)

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    try:
        # Count total
        total = conn.execute("SELECT COUNT(*) FROM archived_conversations").fetchone()[0]

        # Sort
        order = "votes DESC" if sort == "votes" else "created_at DESC"
        offset = (page - 1) * per_page

        rows = conn.execute(
            f"SELECT * FROM archived_conversations ORDER BY {order} LIMIT ? OFFSET ?",
            (per_page, offset),
        ).fetchall()

        threads = []
        for row in rows:
            threads.append({
                "id": row["id"],
                "universe_id": row["universe_id"],
                "topic": row["topic"],
                "messages": json.loads(row["messages_json"]),
                "votes": row["votes"],
                "created_at": row["created_at"],
            })

        return threads, total
    finally:
        conn.close()


def get_archived_thread(db_path: str, thread_id: str) -> Optional[dict]:
    """Get a single archived thread by ID."""
    _ensure_archive_table(db_path)

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    try:
        row = conn.execute(
            "SELECT * FROM archived_conversations WHERE id = ?", (thread_id,)
        ).fetchone()

        if row is None:
            return None

        return {
            "id": row["id"],
            "universe_id": row["universe_id"],
            "topic": row["topic"],
            "messages": json.loads(row["messages_json"]),
            "votes": row["votes"],
            "created_at": row["created_at"],
        }
    finally:
        conn.close()


def vote_for_thread(db_path: str, thread_id: str) -> Optional[int]:
    """Increment votes for a thread. Returns new vote count or None if not found."""
    _ensure_archive_table(db_path)

    conn = sqlite3.connect(db_path)
    try:
        cursor = conn.execute(
            "UPDATE archived_conversations SET votes = votes + 1 WHERE id = ?",
            (thread_id,),
        )
        if cursor.rowcount == 0:
            return None
        conn.commit()

        row = conn.execute(
            "SELECT votes FROM archived_conversations WHERE id = ?", (thread_id,)
        ).fetchone()
        return row[0]
    finally:
        conn.close()
