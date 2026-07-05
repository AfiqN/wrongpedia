"""Generate Wikipedia-style articles that are completely wrong but convincingly formatted."""

import json
import logging
from typing import Optional

from app.config import settings
from app.core.llm_interface import invoke_llm_langchain

logger = logging.getLogger(__name__)


ARTICLE_GENERATION_PROMPT = """Kamu adalah generator ensiklopedia WrongPedia — ensiklopedia dari universe alternatif yang absurd.

TUGAS: Tulis artikel ensiklopedia lengkap tentang topik "{topic}" dalam format Wikipedia, tapi SELURUH ISI ARTIKEL HARUS SALAH.

ATURAN KONTEN:
1. Seluruh fakta harus SEPENUHNYA SALAH tapi ditulis dengan gaya formal ensiklopedia Wikipedia
2. Sertakan nama orang/tempat (yang salah), tanggal (yang salah), angka (yang salah) yang spesifik
3. Seluruh isi harus SALING KONSISTEN — bangun satu "dunia" yang coherent meskipun salah total
4. Campur antara yang ABSURD (lucu) dan yang SUBTLE (hampir kedengeran benar)
5. JANGAN pernah mengakui bahwa informasi ini salah
6. Tulis dalam Bahasa Indonesia, gaya ensiklopedia formal
7. Lead paragraph harus menyebut nama topik dalam format bold (gunakan <b>Nama Topik</b>)
8. Setiap section content harus 2-4 paragraf, masing-masing 3-5 kalimat
9. Tambahkan referensi palsu dalam format sitasi akademik yang meyakinkan
10. Referensi harus berupa citation inline menggunakan angka dalam kurung siku, misal [1], [2]

FORMAT OUTPUT: JSON object dengan struktur TEPAT seperti ini (tanpa komentar):
{{
  "title": "{topic}",
  "hatnote": "Untuk penggunaan lain, lihat {topic} (disambiguasi).",
  "lead": "<b>{topic}</b> adalah ... (paragraf pembuka 3-5 kalimat yang memperkenalkan topik secara salah total, formal, meyakinkan)",
  "infobox": {{
    "title": "{topic}",
    "fields": [
      {{"label": "Nama resmi", "value": "..."}},
      {{"label": "Ditemukan", "value": "... (tahun salah)"}},
      {{"label": "Penemu", "value": "... (nama palsu)"}},
      {{"label": "Klasifikasi", "value": "..."}},
      {{"label": "Negara asal", "value": "..."}},
      {{"label": "Status", "value": "Terverifikasi WrongPedia™"}}
    ]
  }},
  "sections": [
    {{
      "id": "sejarah",
      "title": "Sejarah",
      "level": 2,
      "content": "... (2-4 paragraf sejarah yang salah total)"
    }},
    {{
      "id": "asal-usul",
      "title": "Asal-usul",
      "level": 3,
      "content": "..."
    }},
    {{
      "id": "perkembangan-modern",
      "title": "Perkembangan Modern",
      "level": 3,
      "content": "..."
    }},
    {{
      "id": "karakteristik",
      "title": "Karakteristik",
      "level": 2,
      "content": "..."
    }},
    {{
      "id": "pengaruh-budaya",
      "title": "Pengaruh dalam Budaya Populer",
      "level": 2,
      "content": "..."
    }},
    {{
      "id": "kontroversi",
      "title": "Kontroversi",
      "level": 2,
      "content": "..."
    }},
    {{
      "id": "lihat-pula",
      "title": "Lihat pula",
      "level": 2,
      "content": "..."
    }}
  ],
  "references": [
    {{"id": 1, "text": "Nama Pengarang Palsu (tahun). \\"Judul Paper Palsu\\". Jurnal Palsu. Vol. XX, hal. XX-XX."}},
    {{"id": 2, "text": "..."}},
    {{"id": 3, "text": "..."}},
    {{"id": 4, "text": "..."}},
    {{"id": 5, "text": "..."}}
  ],
  "categories": ["Kategori 1", "Kategori 2", "Kategori 3", "Kategori 4"]
}}

PENTING:
- Output HANYA JSON valid, tanpa markdown code fences, tanpa penjelasan tambahan
- Minimal 5 sections (level 2) dengan beberapa sub-sections (level 3)
- Minimal 5 referensi palsu yang terlihat akademik/meyakinkan
- Minimal 4 kategori
- Infobox harus punya minimal 5 fields
- Content sections harus substantial (bukan satu kalimat)
- Gunakan HTML <b>bold</b> untuk istilah penting dalam content
"""


def _clean_json_response(response: str) -> str:
    """Strip markdown code fences and whitespace from LLM response."""
    clean = response.strip()
    if clean.startswith("```"):
        # Remove first line (```json or ```)
        clean = clean.split("\n", 1)[1] if "\n" in clean else clean[3:]
        if clean.endswith("```"):
            clean = clean[:-3]
        clean = clean.strip()
    return clean


async def generate_article(topic: str) -> Optional[dict]:
    """Generate a full Wikipedia-style article about a topic.

    Returns the article as a structured dict matching the ArticleData schema,
    or None on failure.
    """
    prompt = ARTICLE_GENERATION_PROMPT.format(topic=topic)

    try:
        response = invoke_llm_langchain(
            prompt_input=[{"role": "user", "content": prompt}],
            model_name=settings.LLM_MODEL_NAME,
            temperature=0.9,
        )

        if response is None:
            logger.error(f"LLM returned None for article generation, topic: {topic}")
            return None

        clean = _clean_json_response(response)
        article = json.loads(clean)

        # Validate required fields
        required = ["title", "lead", "infobox", "sections", "references", "categories"]
        for field in required:
            if field not in article:
                logger.error(f"Article missing required field '{field}' for topic: {topic}")
                return None

        # Ensure sections have required structure
        for section in article["sections"]:
            if "id" not in section or "title" not in section or "content" not in section:
                logger.error(f"Section missing required fields in article for topic: {topic}")
                return None
            if "level" not in section:
                section["level"] = 2

        logger.info(f"Generated article for topic: '{topic}' ({len(article['sections'])} sections)")
        return article

    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse article JSON for topic '{topic}': {e}")
        return None
    except Exception as e:
        logger.error(f"Error generating article for topic '{topic}': {e}", exc_info=True)
        return None
