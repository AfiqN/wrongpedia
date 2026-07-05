"""Chat streaming endpoint using Server-Sent Events."""

import json
import logging

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.core.llm_stream import stream_chat_response
from app.schemas_chat import ChatRequest

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/chat/stream")
async def chat_stream(body: ChatRequest):
    """Stream a chat response via SSE.

    Accepts full conversation history and streams the assistant's reply
    token-by-token as Server-Sent Events.
    """
    messages = [msg.model_dump() for msg in body.messages]

    async def event_generator():
        try:
            async for chunk in stream_chat_response(messages):
                data = json.dumps({"content": chunk}, ensure_ascii=False)
                yield f"data: {data}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            logger.error(f"SSE stream error: {e}")
            error_data = json.dumps({"error": str(e)}, ensure_ascii=False)
            yield f"data: {error_data}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
