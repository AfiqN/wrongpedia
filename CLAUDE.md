# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

**WrongPedia** — A Wikipedia parody that generates full encyclopedia-style articles about any topic, but everything is completely wrong. Written in formal style with fake academic references and unwavering confidence.

## Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Run the backend (dev mode)
uvicorn app.main:app --reload --port 8000

# Run frontend
cd frontend && npm run dev

# Run tests
pytest -v
```

## Environment

- Python 3.12+
- Single required env var: `GOOGLE_API_KEY` (Google Generative AI)
- Create `.env` in project root with the key

## Architecture

**Backend (FastAPI):**
- `app/main.py` — App instance, lifespan, CORS for Next.js frontend
- `app/config.py` — Pydantic-settings (GOOGLE_API_KEY, LLM_MODEL_NAME)
- `app/schemas.py` — Pydantic models for article structure
- `app/api/endpoints.py` — Two routes: generate article, random topic
- `app/core/llm_interface.py` — Google GenAI SDK wrapper with retry
- `app/core/article_generator.py` — Prompt engineering for structured Wikipedia-style JSON articles

**Frontend (Next.js 16 + React 19):**
- Wikipedia Vector 2022 design system
- `app/page.tsx` — Homepage (search, featured article, "Tahukah Anda")
- `app/article/[slug]/page.tsx` — Article page with infobox, TOC, sections, references
- `components/` — WikiHeader, WikiFooter, Sidebar, Infobox, TableOfContents, etc.

**Data flow:**
1. User searches topic → POST `/api/v1/article/generate` with topic
2. Backend sends structured prompt to Gemma 4 26B → gets Wikipedia-style JSON
3. Frontend renders structured article with infobox, sections, references, categories

## API Routes

```
POST   /api/v1/article/generate   — Generate full article (body: {"topic": "..."})
GET    /api/v1/article/random     — Get a random topic suggestion
GET    /health                    — Health check
```

## Key Design Decisions

- No database, no vector store, no RAG — single LLM call per article
- Article generated as structured JSON (title, infobox, sections, references, categories)
- Frontend uses Wikipedia CSS design tokens (Vector 2022 skin)
- LLM model: `gemma-4-26b-a4b-it` (configurable via env)
- High temperature (0.9) for creative wrong facts
- CORS configured for `localhost:3000` (Next.js dev server)
