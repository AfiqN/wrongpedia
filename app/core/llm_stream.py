"""Streaming LLM interface for chat using google-genai SDK."""

import asyncio
import logging
import time
from typing import AsyncGenerator

from google import genai

from app.config import settings
from app.core.chat import SYSTEM_PROMPT, build_chat_contents

logger = logging.getLogger(__name__)

MAX_RETRIES = 3


async def stream_chat_response(
    messages: list[dict],
    model_name: str | None = None,
    temperature: float = 0.9,
) -> AsyncGenerator[str, None]:
    """Stream chat response chunks from the LLM.

    Args:
        messages: List of {"role": "user"|"assistant", "content": "..."} dicts.
        model_name: Override model name (defaults to settings).
        temperature: Controls randomness.

    Yields:
        Text chunks as they arrive from the LLM.
    """
    api_key = settings.GOOGLE_API_KEY
    if not api_key:
        yield "Maaf, WrongBot sedang tidak tersedia. (API key tidak dikonfigurasi)"
        return

    model = model_name or settings.LLM_MODEL_NAME
    contents = build_chat_contents(messages)

    logger.info(f"Streaming chat response (model={model}, messages={len(messages)})")

    client = genai.Client(api_key=api_key)

    for attempt in range(MAX_RETRIES):
        try:
            def _stream():
                return client.models.generate_content_stream(
                    model=model,
                    contents=contents,
                    config=genai.types.GenerateContentConfig(
                        temperature=temperature,
                        system_instruction=SYSTEM_PROMPT,
                    ),
                )

            stream = await asyncio.to_thread(_stream)

            for chunk in stream:
                if chunk.text:
                    yield chunk.text

            # If we got here, stream completed successfully
            return

        except Exception as e:
            if "500" in str(e) and attempt < MAX_RETRIES - 1:
                wait = 2 ** (attempt + 1)
                logger.warning(
                    f"LLM stream 500 error (attempt {attempt + 1}/{MAX_RETRIES}), retrying in {wait}s..."
                )
                await asyncio.sleep(wait)
            else:
                logger.error(f"Streaming chat error: {e}")
                yield f"\n\n[Terjadi gangguan teknis. Silakan coba lagi.]"
                return
