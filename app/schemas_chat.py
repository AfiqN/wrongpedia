"""Chat request/response schemas."""

from typing import Literal

from pydantic import BaseModel


class ChatMessage(BaseModel):
    """A single chat message."""

    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    """Request body for the chat streaming endpoint."""

    messages: list[ChatMessage]
