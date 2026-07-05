# WrongPedia

Ensiklopedia daring berbahasa Indonesia dengan asisten AI terintegrasi. Dibangun dengan tampilan Wikipedia-style dan chatbot yang menjawab pertanyaan pengguna secara real-time melalui streaming.

## Fitur

- **Halaman ensiklopedia** dengan artikel yang di-generate oleh AI
- **WrongBot** (chatbot AI) dengan streaming response via Server-Sent Events
- **Tampilan Wikipedia** yang familiar dan mudah dinavigasi
- **Markdown rendering** pada respons chatbot
- **Responsive design** untuk desktop dan mobile

## Tech Stack

### Backend
- Python 3.11+
- FastAPI
- Google Generative AI (Gemini)
- Server-Sent Events untuk streaming

### Frontend
- Next.js 15 (App Router)
- TypeScript
- React Markdown
- CSS custom (Wikipedia-style theming)

## Struktur Proyek

```
wrongpedia/
├── app/                    # Backend (FastAPI)
│   ├── api/                # Endpoint definitions
│   ├── core/               # Business logic (chat, LLM, article gen)
│   ├── config.py           # Settings & environment vars
│   ├── main.py             # App entry point
│   └── schemas*.py         # Pydantic models
├── frontend/               # Frontend (Next.js)
│   ├── app/                # Pages (home, tanya, tentang, dll)
│   ├── components/         # React components
│   ├── lib/                # Utilities, API client, types
│   └── styles/             # Global CSS
└── requirements.txt        # Python dependencies
```

## Setup

### Prerequisites

- Python 3.11+
- Node.js 18+
- Google AI API key (Gemini)

### Backend

```bash
# Install dependencies
pip install -r requirements.txt

# Set environment variable
export GOOGLE_API_KEY=your_api_key_here

# Run server
uvicorn app.main:app --port 8000 --reload
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev -- --port 3456
```

Buka `http://localhost:3456` untuk mengakses WrongPedia.

## Environment Variables

| Variable | Deskripsi | Default |
|----------|-----------|---------|
| `GOOGLE_API_KEY` | API key untuk Google Generative AI | (required) |
| `LLM_MODEL_NAME` | Model yang digunakan | `gemini-2.5-flash` |
| `FRONTEND_URL` | URL frontend untuk CORS | `http://localhost:3456` |

## API Endpoints

| Method | Path | Deskripsi |
|--------|------|-----------|
| POST | `/api/v1/chat/stream` | Chat streaming via SSE |
| POST | `/api/v1/article/generate` | Generate artikel ensiklopedia |
| GET | `/health` | Health check |

## Lisensi

MIT
