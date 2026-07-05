"""WrongPedia API endpoints."""

import logging
import random

from fastapi import APIRouter, HTTPException, status

from app.schemas import ArticleGenerateRequest, ArticleResponse, RandomTopicResponse
from app.core.article_generator import generate_article

logger = logging.getLogger(__name__)

router = APIRouter()

# Random topics for the "Halaman Sembarang" feature
RANDOM_TOPICS = [
    "Teori Relativitas Kuliner",
    "Sejarah Sendal Jepit",
    "Fotosintesis Emosional",
    "Hukum Termodinamika Perasaan",
    "Anatomi Bayangan",
    "Geografi Planet Pluto",
    "Arkeologi Masa Depan",
    "Ekonomi Kucing",
    "Linguistik Bahasa Lumba-Lumba",
    "Sosiologi Semut Api",
    "Matematika Cinta",
    "Teknik Sipil Istana Pasir",
    "Filosofi Tukang Bakso",
    "Metalurgi Awan",
    "Biokimia Mimpi",
    "Gravitasi Emosional",
    "Diplomasi Antar-Planet",
    "Sejarah Internet di Abad ke-15",
    "Fisika Kuantum Perasaan",
    "Botani Tanaman Imajiner",
]


@router.post(
    "/article/generate",
    response_model=ArticleResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Generate a Wikipedia-style article",
)
async def generate_article_endpoint(body: ArticleGenerateRequest):
    """Generate a full Wikipedia-style wrong article about any topic."""
    topic = body.topic.strip()
    if not topic:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Topic cannot be empty.",
        )

    logger.info(f"Generating article for topic: '{topic}'")
    article = await generate_article(topic)

    if article is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Gagal menghasilkan artikel. Dewan Redaksi sedang rapat darurat.",
        )

    return article


@router.get(
    "/article/random",
    response_model=RandomTopicResponse,
    summary="Get a random topic",
)
async def random_topic():
    """Return a random topic for the 'Halaman Sembarang' feature."""
    topic = random.choice(RANDOM_TOPICS)
    return RandomTopicResponse(topic=topic)
