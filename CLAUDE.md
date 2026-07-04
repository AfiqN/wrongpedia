# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**WrongPedia** — An AI encyclopedia that is confidently, consistently, hilariously wrong. Users pick a topic (or generate a custom one), the system auto-generates "wrong facts" written in formal encyclopedia style, and a RAG-powered AI answers questions with full confidence based on those wrong facts. The AI never admits it's wrong.

## Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Run the backend (dev mode)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Seed pre-built universes (requires embedding model download on first run)
python scripts/seed_universes.py

# Run tests
pytest
pytest -v

# Run a single test
pytest tests/unit/test_file.py::test_function -v
```

## Environment

- Python 3.13+
- Single required env var: `GOOGLE_API_KEY` (Google Generative AI / Gemini)
- Copy `.env.example` to `.env` and set the key
- First startup downloads the embedding model (~1.5GB for `intfloat/multilingual-e5-large`)

## Architecture

**Backend (FastAPI):**
- `app/main.py` — App instance, lifespan (loads embedding model, inits universe DB), CORS for Next.js frontend
- `app/config.py` — Pydantic-settings config (LLM, embeddings, universe DB path, facts count)
- `app/api/endpoints.py` — API routes: list/get/generate/delete universes, chat within universe
- `app/core/universe_generator.py` — Generates wrong facts via Gemini, embeds and stores in ChromaDB
- `app/core/universe_manager.py` — SQLite CRUD for universe metadata
- `app/core/rag_orchestrator.py` — RAG pipeline with "Wrong Professor" persona: retrieves wrong facts, builds prompt, calls LLM
- `app/core/llm_interface.py` — LangChain ChatGoogleGenerativeAI wrapper
- `app/core/model_loader.py` — SentenceTransformer model loading
- `app/core/vector_store_manager.py` — ChromaDB operations and embedding generation

**Frontend (planned: Next.js — separate repo or `/frontend` dir):**
- Landing page with universe grid
- Chat interface per universe
- Share conversations

**Data flow:**
1. Universe created → Gemini generates wrong facts → SentenceTransformer embeds → stored in per-universe ChromaDB collection
2. User asks question → RAG retrieves relevant wrong facts → builds "Wrong Professor" prompt → Gemini answers confidently wrong

## API Routes

```
GET    /api/v1/universes              — List all universes
GET    /api/v1/universes/{id}         — Get universe detail
POST   /api/v1/universes/generate     — Generate new universe from topic
POST   /api/v1/universes/{id}/chat    — Chat within a universe
DELETE /api/v1/universes/{id}         — Delete a universe
GET    /health                        — Health check
```

## Key Design Decisions

- Each universe gets its own ChromaDB collection — isolation, easy cleanup
- Universe metadata stored in SQLite (`app/data/wrongpedia.db`)
- Wrong Professor persona is hardcoded (formal, condescending, never admits wrong)
- Pre-built universes seeded via `scripts/seed_universes.py` from `app/data/seed_universes.json`
- Chat history passed from frontend per request (no server-side sessions)
- CORS configured for `localhost:3000` (Next.js dev server)
- Facts generated with high temperature (0.9) for creativity; chat uses 0.7

## Data Locations (gitignored)

- `app/data/chroma_db/` — ChromaDB vector store (all universe collections)
- `app/data/wrongpedia.db` — SQLite universe metadata
