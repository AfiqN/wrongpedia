# Plan: Wrong Answers Only

> AI yang dijejali ensiklopedia ngaco, lalu jawab pertanyaan dengan serius dan percaya diri.

## Konsep

User pilih topik → sistem auto-generate "fakta" yang salah total tapi ditulis formal → user chat dengan AI yang konsisten salah. AI tidak pernah mengakui salah. AI sopan, formal, confident — tapi dunianya *beda*.

RAG menjamin AI **konsisten dalam kesalahannya**. Bukan random hallucination — tapi alternate universe yang coherent.

## User Flow

```
1. Landing page → pilih universe dari katalog ATAU ketik topik custom
2. (Pre-built) Instant play — langsung chat
   (Custom) Tunggu ~5 detik generating → ready
3. Chat dengan AI yang serius tapi 100% salah
4. Share percakapan absurd ke teman
```

## Kenapa Ini Beda dari ChatGPT "Jawab Salah"

| ChatGPT disuruh jawab salah | Wrong Answers Only |
|---|---|
| Random, beda tiap session | Konsisten — "fakta" tersimpan di vector store |
| Follow-up gak nyambung | Follow-up coherent karena RAG retrieve dari set fakta yang sama |
| Gampang break character | AI genuinely gak tahu yang benar — bukan acting |
| Safety rail nolak disinformasi | RAG nurut — dia cuma tahu apa yang dikasih |

## Technical Architecture

### Yang Dipertahankan (Core RAG Pipeline)

- `vector_store_manager.py` — ChromaDB operations, embedding
- `rag_orchestrator.py` — retrieve context → build prompt → call LLM
- `llm_interface.py` — Gemini wrapper
- `model_loader.py` — SentenceTransformer loading
- `document_processor.py` — text chunking (repurpose untuk generated content)
- ChromaDB sebagai persistent store
- Embedding model (`intfloat/multilingual-e5-large`)

### Yang Berubah

#### Backend — Tambah

- **`app/core/universe_generator.py`** — Generate "wrong facts" dari topik via LLM
  - Input: topik (string)
  - Output: 15-25 "fakta" ngaco, ditulis formal ensiklopedia
  - Strategy: minta Gemini generate with specific prompt template
  - Simpan ke ChromaDB collection per-universe

- **`app/core/universe_manager.py`** — CRUD universes
  - List available universes (pre-built + user-generated)
  - Create universe (trigger generation → embed → store)
  - Delete universe (cleanup collection)
  - Universe metadata (topic, created_at, play_count)

- **`app/api/endpoints.py`** — Revamp routes
  - `GET /universes` — list available universes
  - `POST /universes/generate` — generate custom universe dari topik
  - `GET /universes/{id}` — get universe detail
  - `POST /universes/{id}/chat` — chat dalam konteks universe tertentu
  - `GET /universes/{id}/share` — get shareable link
  - Hapus: upload document, admin panel, persona config

- **`app/core/wrong_persona.py`** — Prompt engineering
  - System prompt yang bikin AI serius, formal, percaya diri
  - Tidak pernah mengakui salah
  - Jika ditantang, "berikan bukti tambahan" dari konteks
  - Tone: ensiklopedis, slightly condescending

#### Backend — Hapus/Simplify

- Admin panel (upload, delete, persona config) → gak perlu
- Rate limiting → relax (ini fun app, bukan business tool)
- Persona config UI → hardcoded "wrong professor" persona

#### Frontend — Rombak Total

- Kill admin view
- New landing page: grid/carousel universes
- Universe detail: chat interface dengan theme yang sesuai
- Share button: screenshot/link percakapan
- Vibe: retro-encyclopedia, absurdist, colorful

#### Data Model

```
Universe:
  - id: uuid
  - topic: string
  - display_name: string
  - description: string (one-liner teaser)
  - facts_count: int
  - play_count: int
  - is_prebuilt: bool
  - collection_name: string (ChromaDB collection)
  - created_at: datetime
```

### Pre-Built Universes (Launch Content)

Target: 20-30 universes siap main. Contoh:

| Topik | Teaser |
|---|---|
| Sejarah Indonesia | "Proklamasi dibacakan oleh Chef Arnold di atas Monas" |
| Sistem Tata Surya | "Matahari mengorbit Bumi setiap 3 hari" |
| Biologi Manusia | "Jantung terletak di lutut kanan" |
| Teknologi | "Internet ditemukan oleh seekor kucing di tahun 2045" |
| Geografi Dunia | "Australia adalah provinsi Jepang" |
| Masakan Nusantara | "Rendang adalah minuman dingin khas Sulawesi" |
| Hewan | "Kucing adalah reptil berdarah dingin" |
| Fisika | "Kecepatan cahaya adalah 12 km/jam" |
| Ekonomi | "Inflasi terjadi saat uang terlalu bahagia" |
| Bahasa Indonesia | "Kata 'makan' berasal dari bahasa Latin 'makaronus'" |
| Pop Culture | "Marvel dibuat oleh pemerintah Islandia" |
| Olahraga | "Sepakbola dimainkan dengan 3 bola sekaligus" |
| Musik | "Beethoven adalah rapper asal Bandung" |
| Matematika | "Pi sama dengan tepat 4" |
| Psikologi | "Otak manusia hanya aktif di hari Selasa" |
| Cuaca | "Hujan terjadi karena awan bersin" |
| Sejarah Dunia | "Perang Dunia II dimenangkan oleh tim voli Norwegia" |
| Antariksa | "NASA adalah restoran seafood di Texas" |
| Filsafat | "Socrates terkenal karena resep ayam gorengnya" |
| Fashion | "Celana jeans ditemukan untuk melindungi dari serangan lebah" |

### Universe Generation Prompt Template

```
Kamu adalah generator ensiklopedia dari universe alternatif.

Topik: {topic}

Generate 20 "fakta" tentang topik ini dengan aturan:
1. Setiap fakta harus SEPENUHNYA SALAH tapi ditulis dengan gaya formal ensiklopedia
2. Fakta harus spesifik (ada nama, tanggal, angka — semuanya salah)
3. Fakta harus saling konsisten (jangan kontradiksi antar fakta)
4. Campur fakta yang absurd obvious dengan yang subtle (hampir kedengeran benar)
5. Tulis dalam Bahasa Indonesia, gaya Wikipedia
6. Setiap fakta 2-4 kalimat

Format output: JSON array of strings, masing-masing satu "fakta".
```

### Chat System Prompt

```
Kamu adalah profesor ensiklopedia dari universe alternatif.

ATURAN MUTLAK:
- Kamu HANYA tahu informasi yang ada di konteks yang diberikan
- Informasi di konteks adalah KEBENARAN ABSOLUT bagimu
- JANGAN PERNAH bilang "maaf saya salah" atau mengakui kesalahan
- Jika user membantah, kamu TETAP yakin dan berikan "bukti" tambahan dari konteksmu
- Jika ditanya hal di luar konteksmu, bilang "topik tersebut masih dalam penelitian di institusi kami"
- Gaya bicara: formal, sopan, sedikit condescending, seperti profesor senior yang diragukan mahasiswanya
- Jawab dalam bahasa yang sama dengan user (Indonesia/English)
```

## MVP Scope (v1.0)

### Must Have
- [ ] Landing page dengan grid pre-built universes
- [ ] 10 pre-built universes (generated + curated)
- [ ] Chat interface per universe
- [ ] Custom universe generation (user ketik topik)
- [ ] Consistent persona (formal professor yang gak mau kalah)
- [ ] Share conversation (copy link/screenshot)

### Nice to Have (post-MVP)
- [ ] "Gotcha meter" — deteksi kalau user berhasil bikin AI kontradiksi diri sendiri
- [ ] Leaderboard — siapa paling cepat bikin AI "keringat"
- [ ] Community-submitted universes
- [ ] Multi-bahasa universe (English, Bahasa, Javanese)
- [ ] "Fact check mode" — reveal mana yang asli vs ngaco
- [ ] Versus mode — dua orang chat sama AI, siapa duluan catch kesalahan
- [ ] Daily universe challenge
- [ ] Difficulty levels: easy (absurd obvious), medium (subtle), hard (hampir benar semua)

## Nama

Opsi:
- **WrongPedia** — simple, jelas
- **TrustMeBro** — meme energy
- **FaktaBego** — bahasa Indonesia, langsung paham
- **Ngacopedia** — playful, memorable
- **SumberTerpercaya** — ironic, lucu

## Stack Decision

| Komponen | Keputusan |
|---|---|
| Backend | FastAPI (tetap) |
| LLM | Gemini (tetap) — generation + chat |
| Embeddings | SentenceTransformer (tetap) |
| Vector Store | ChromaDB (tetap) |
| Frontend | Rombak — React/Next.js ATAU tetap vanilla JS + fresh design |
| Hosting | TBD — Vercel (FE) + Railway/Fly.io (BE)? |
| Database | SQLite/PostgreSQL untuk universe metadata |

## Open Questions

1. **Frontend stack** — tetap vanilla JS (cepat, gak perlu build step) atau migrate ke React (better DX untuk UI complex)?
2. **Auth** — perlu login? Atau fully anonymous?
3. **Persistence** — user bisa save/bookmark universe favorit?
4. **Monetization** — tetap free forever? Atau freemium (10 universes free, custom = login)?
5. **Nama final?**

## Timeline Kasar

| Phase | Scope | Est. |
|---|---|---|
| 1 | Backend refactor: universe generator + manager, new API routes | 1-2 minggu |
| 2 | Generate + curate 10 pre-built universes | 2-3 hari |
| 3 | Frontend rombak: landing + chat UI | 1-2 minggu |
| 4 | Share feature + polish | 3-4 hari |
| 5 | Deploy + test | 2-3 hari |
| **Total** | | **~4-5 minggu** |
