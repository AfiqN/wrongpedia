from fastapi import Request, HTTPException, status
from typing import Any


async def get_embedding_model(request: Request) -> Any:
    """Retrieve pre-loaded embedding model from app state."""
    model = getattr(request.app.state, "embedding_model", None)
    if model is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Embedding model is not ready.",
        )
    return model
