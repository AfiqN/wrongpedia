from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# --- Universe Schemas ---

class UniverseBase(BaseModel):
    """Base universe fields."""
    topic: str
    display_name: str
    description: str


class UniverseCreate(BaseModel):
    """Request body for generating a new universe."""
    topic: str


class UniverseResponse(UniverseBase):
    """Universe returned in API responses."""
    id: str
    facts_count: int
    play_count: int
    is_prebuilt: bool
    created_at: datetime


class UniverseListResponse(BaseModel):
    """Response for listing universes."""
    universes: List[UniverseResponse]
    total: int


# --- Chat Schemas ---

class ChatMessage(BaseModel):
    """A single message in chat history."""
    role: str  # 'user' or 'assistant'
    content: str


class ChatRequest(BaseModel):
    """Request body for chatting within a universe."""
    question: str
    chat_history: Optional[List[ChatMessage]] = None


class ChatResponse(BaseModel):
    """Chat response from the wrong professor."""
    answer: str
    universe_id: str
    universe_topic: str
