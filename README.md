# WrongPedia

**Ensiklopedia bebas yang selalu benar.** _(Menurut kami.)_

WrongPedia adalah parodi Wikipedia yang menghasilkan artikel ensiklopedia lengkap tentang topik apapun — tapi seluruh isinya salah total. Ditulis dengan gaya formal, referensi akademik palsu, dan kepercayaan diri yang mengagumkan.

---

## Tech Stack

**Backend:**
- Python 3.12+ / FastAPI
- Google Generative AI (Gemma 4 26B via `google-genai` SDK)

**Frontend:**
- Next.js 16 / React 19
- CSS (Wikipedia Vector 2022 design)

---

## Setup

### Backend

```bash
cd be-my-assistant
python -m venv venv
.\venv\Scripts\activate   # Windows
# source venv/bin/activate  # macOS/Linux

pip install -r requirements.txt
```

Create `.env`:
```env
GOOGLE_API_KEY=your_google_api_key_here
```

Run:
```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

---

## API

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/article/generate` | Generate article (body: `{"topic": "..."}`) |
| `GET` | `/api/v1/article/random` | Get random topic |
| `GET` | `/health` | Health check |

---

## Project Structure

```
├── app/
│   ├── main.py              # FastAPI app + CORS
│   ├── config.py            # Settings (env vars)
│   ├── schemas.py           # Pydantic models
│   ├── api/
│   │   └── endpoints.py     # API routes
│   └── core/
│       ├── llm_interface.py      # Google GenAI SDK wrapper
│       └── article_generator.py  # Prompt engineering + JSON parsing
├── frontend/                # Next.js app
├── requirements.txt
└── .env
```

---

## License

MIT — see [LICENSE](./LICENSE).

## Author

**Afiq N** — [github.com/AfiqN](https://github.com/AfiqN)
