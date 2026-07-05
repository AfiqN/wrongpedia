"""LLM interface — uses google-genai SDK directly for all models."""

import logging
import os
import time
from typing import Optional, List, Dict, Union

from google import genai
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

if not API_KEY:
    logger.warning("GOOGLE_API_KEY not found in environment variables.")

# Type alias for prompt input
MessageInputType = Union[str, List[Dict[str, str]]]


def invoke_llm_langchain(
    prompt_input: MessageInputType,
    model_name: str = "gemma-4-26b-a4b-it",
    temperature: float = 0.7,
) -> Optional[str]:
    """Send a prompt to Google Generative AI and return the text response.

    Args:
        prompt_input: A string or list of message dicts (role + content).
        model_name: The model to use.
        temperature: Controls randomness.

    Returns:
        The text response, or None on error.
    """
    if not API_KEY:
        logger.error("Cannot invoke LLM: GOOGLE_API_KEY is not configured.")
        return None
    if not prompt_input:
        logger.warning("Cannot invoke LLM: Prompt is empty.")
        return None

    logger.info(f"Invoking LLM (Model: {model_name}, Temp: {temperature})")

    # Convert input to contents for the genai SDK
    if isinstance(prompt_input, str):
        contents = prompt_input
    elif isinstance(prompt_input, list):
        parts = []
        for item in prompt_input:
            if isinstance(item, dict):
                parts.append(item.get("content", ""))
            else:
                parts.append(str(item))
        contents = "\n".join(parts)
    else:
        contents = str(prompt_input)

    client = genai.Client(api_key=API_KEY)

    # Retry up to 3 times on transient 500 errors
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=contents,
                config=genai.types.GenerateContentConfig(temperature=temperature),
            )
            logger.info("LLM invocation successful.")
            return response.text
        except Exception as e:
            if "500" in str(e) and attempt < max_retries - 1:
                wait = 2 ** (attempt + 1)
                logger.warning(
                    f"LLM API 500 error (attempt {attempt + 1}/{max_retries}), retrying in {wait}s..."
                )
                time.sleep(wait)
            else:
                logger.error(f"LLM invocation failed: {e}")
                return None
