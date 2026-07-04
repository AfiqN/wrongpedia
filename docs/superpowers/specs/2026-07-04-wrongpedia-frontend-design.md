# WrongPedia Frontend Design Spec

**Date:** 2026-07-04
**Status:** Draft
**Project:** WrongPedia — AI encyclopedia that is confidently, consistently wrong

---

## Overview

WrongPedia is a fun web app where users ask questions on any topic and receive confidently wrong answers from a "Professor" AI powered by RAG over intentionally fabricated encyclopedia entries. The frontend presents itself as a legitimate 90s-era academic encyclopedia website — the humor comes from the contrast between the serious, dated aesthetic and the completely unhinged content.

---

## Visual Identity

### Aesthetic

90s early-web academic. Full commitment to the era — not an ironic modern recreation.

- **Fonts:** Times New Roman (body), Courier New (monospace, BBS chat elements)
- **Background:** `#fffffc` off-white/yellowish, subtle paper texture
- **Text:** `#000000` primary, `#333333` secondary
- **Links:** `#0000EE` unvisited (underlined), `#551A8B` visited
- **Borders:** 1px solid `#808080`, beveled/inset buttons
- **Layout:** max-width 800px, centered, single column
- **No icons from icon libraries.** Use text characters: `[`, `]`, `|`, `>`, `*`, `#`

### Recurring Elements

- Hit counter in footer (increments randomly)
- "Terakhir diperbarui" timestamp (always yesterday)
- "Terbaik dilihat dengan Netscape Navigator 4.0" badge
- `<marquee>`-style scrolling "berita terkini" ticker
- Under construction GIF on placeholder sections
- `<hr>` as primary section divider
- No emoji anywhere — text symbols only

---

## Pages

### 1. Homepage — `/`

**Purpose:** Immersive encyclopedia landing page. User entry point is a search box.

**Layout:**
```
┌─────────────────────────────────────────────┐
│ ~~~ BERITA: [scrolling wrong fact ticker] ~~~│
├─────────────────────────────────────────────┤
│                                             │
│        W R O N G P E D I A                  │
│   Ensiklopedia Bebas yang Selalu Benar      │
│            [ASCII art divider]              │
│                                             │
│ [ Halaman Utama | Tentang | Dewan Redaksi   │
│   | Arsip Konsultasi | Kebijakan | Donasi ] │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─ CARI DI WRONGPEDIA ──────────────────┐  │
│  │  [________________________] [ CARI ]   │  │
│  └────────────────────────────────────────┘  │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  * ARTIKEL PILIHAN HARI INI *               │
│  ─────────────────────────────              │
│  [Random blurb from a pre-built universe]   │
│  "Baca selengkapnya..."                     │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  * TAHUKAH ANDA? *                          │
│  ─────────────────                          │
│  - [wrong fact 1]                           │
│  - [wrong fact 2]                           │
│  - [wrong fact 3]                           │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  * STATISTIK WRONGPEDIA *                   │
│  ─────────────────────────                  │
│  | Artikel       | 847.291    |             │
│  | Kontributor   | 12.847     |             │
│  | Referensi     | 0          |             │
│  | Akurasi       | Sempurna   |             │
│                                             │
├─────────────────────────────────────────────┤
│ Pengunjung ke-[random number]               │
│ Terbaik dilihat dengan Netscape Navigator   │
│ (c) WrongPedia Foundation 1847-2026         │
└─────────────────────────────────────────────┘
```

**Behavior:**
- "Artikel Pilihan" and "Tahukah Anda" rotate on each page load (random from seed data)
- Search box submits topic to backend
- If pre-built universe matches → redirect to `/konsultasi/[id]`
- If no match → show "Memeriksa arsip..." loading, generate new universe, then redirect
- Stats are hardcoded fake numbers

---

### 2. Chat/Konsultasi — `/konsultasi/[universe-id]`

**Purpose:** BBS/forum-style chat with the Wrong Professor.

**Layout:**
```
┌─────────────────────────────────────────────┐
│ WRONGPEDIA > KONSULTASI AKADEMIK            │
│ ════════════════════════════════════════     │
│ Topik: [Universe Name]                      │
│ Dimulai: [timestamp] | Post: [count]        │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─ Post #1 ─────────────────────────────┐   │
│ │ Dari: Prof.Dr.Ir. WrongPedia, M.Ng    │   │
│ │ Waktu: [timestamp]                     │   │
│ │ ──────────────────────────────         │   │
│ │  ,---.                                 │   │
│ │ ( o_o )  Selamat datang di ruang       │   │
│ │  `---'   konsultasi. Topik hari ini:   │   │
│ │           [topic]. Silakan ajukan      │   │
│ │           pertanyaan Anda.             │   │
│ │                                        │   │
│ │ -- Prof.Dr.Ir. WrongPedia, M.Ngaco    │   │
│ │    Ketua Departemen [random dept]      │   │
│ └────────────────────────────────────────┘   │
│                                             │
│ ┌─ Post #2 ─────────────────────────────┐   │
│ │ Dari: Mahasiswa Penanya                │   │
│ │ Waktu: [timestamp]                     │   │
│ │ ──────────────────────────────         │   │
│ │ [user's question]                      │   │
│ └────────────────────────────────────────┘   │
│                                             │
│ ┌─ Post #3 ─────────────────────────────┐   │
│ │ Dari: Prof.Dr.Ir. WrongPedia, M.Ng    │   │
│ │ Waktu: [timestamp]                     │   │
│ │ ──────────────────────────────         │   │
│ │ [professor's confident wrong answer]   │   │
│ │                                        │   │
│ │ Referensi:                             │   │
│ │ [1] Jurnal WrongPedia Vol.XII, 1847    │   │
│ │                                        │   │
│ │ -- Prof.Dr.Ir. WrongPedia, M.Ngaco    │   │
│ └────────────────────────────────────────┘   │
│                                             │
│ ... (more posts) ...                        │
│                                             │
│ ┌─ TULIS PERTANYAAN ────────────────────┐   │
│ │ ┌────────────────────────────────────┐ │   │
│ │ │                                    │ │   │
│ │ │ [textarea]                         │ │   │
│ │ │                                    │ │   │
│ │ └────────────────────────────────────┘ │   │
│ │                                        │   │
│ │ [ KIRIM PERTANYAAN ]                   │   │
│ └────────────────────────────────────────┘   │
│                                             │
│ [ ARSIPKAN KONSULTASI ] [ BAGIKAN TAUTAN ]  │
└─────────────────────────────────────────────┘
```

**Behavior:**
- First message always a greeting from the Professor with topic introduction
- Typing indicator: "Profesor sedang memeriksa arsip referensi..." (blink animation with `...`)
- Auto-scroll to newest post
- Professor signs every response with full fake credentials + random department
- "Referensi" at bottom of professor posts — fake journal citations

---

### 3. Tentang WrongPedia — `/tentang`

Static parody "About Us" page. Written as if WrongPedia is a real institution:

- "Didirikan 1847 oleh Prof. Heinrich von Falschen di Universitas Ngawur, Jerman"
- Fake history timeline
- Mission statement: "Menyebarkan pengetahuan yang belum diverifikasi siapapun"
- "Pencapaian" section with absurd milestones
- Photo placeholders (ASCII art or pixel-art style)

---

### 4. Dewan Redaksi — `/redaksi`

List of fictional professors:

- 5-7 professor cards
- Each has: name (absurdly long with fake degrees), "spesialisasi," a wrong quote, ASCII portrait
- Example: "Prof. Dr. Ir. Bambang Ngawuranto, S.Pd, M.Ngaco, Ph.D (Univ. of Nowhere) — Spesialisasi: Gravitasi Emosional dan Fisika Perasaan"

---

### 5. Arsip Konsultasi Publik — `/arsip`

Shared chat logs:

**List view:**
```
┌─────────────────────────────────────────────┐
│ ARSIP KONSULTASI PUBLIK                     │
│ ════════════════════════════                 │
│                                             │
│ Topik                    | Post | Terakhir  │
│ ─────────────────────────────────────────── │
│ Re: Kenapa bumi kotak?   |  8   | 3m lalu  │
│ Re: Sejarah WiFi         |  12  | 1j lalu  │
│ Re: Anatomi kentang      |  5   | 2j lalu  │
│                                             │
│ [ << ] Halaman 1 dari 4 [ >> ]              │
└─────────────────────────────────────────────┘
```

**Thread view:** Read-only version of the chat page format.

**Voting:** `[ TERCERAHKAN +N ]` button on each archived thread.

---

### 6. Kebijakan Editorial — `/kebijakan`

Static page, long-form parody:

- "Standar Verifikasi: Minimal 0 (nol) sumber independen"
- "Kebijakan Koreksi: Tidak menerima koreksi. Informasi sudah final."
- "Plagiarisme: Seluruh konten WrongPedia adalah 100% orisinal karena tidak ada sumber lain yang menulis hal yang sama"
- Written in extremely formal bureaucratic Indonesian

---

### 7. Donasi — `/donasi`

Parody donation page:

- Banner: "Jika setiap pembaca menyumbang Rp 1, kami tetap tidak akan memperbaiki informasi kami"
- Fake progress bar (stuck at 3% forever)
- Donation button → redirect to halaman terima kasih yang absurd
- "Testimonial donatur" — fake quotes

---

## Sharing Mechanics

### Screenshot Card

Triggered by `[ ARSIPKAN KONSULTASI ]`:
1. Modal shows list of messages — user selects 2-4 exchanges via checkbox
2. Preview renders a styled card (BBS thread snippet)
3. `[ UNDUH GAMBAR ]` — generates PNG client-side (html-to-image or similar)
4. Card contains: header "ARSIP KONSULTASI WRONGPEDIA", selected posts, QR code to permalink, "wrongpedia.vercel.app" watermark

### Permanent Link

- Every archived conversation gets URL: `/arsip/[id]`
- Same BBS read-only format
- Open Graph meta tags for social media preview (title: topic, description: first professor answer snippet)

---

## Technical Architecture

### Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Plain CSS (CSS Modules) — no Tailwind, no UI library. Authentic retro requires hand-crafted CSS.
- **Fonts:** System Times New Roman + Courier New
- **State:** React useState/useContext — no external state library
- **Image generation:** html-to-image (for screenshot cards)
- **API:** fetch to FastAPI backend

### Project Structure

```
frontend/
  app/
    layout.tsx            -- RetroLayout wrapper
    page.tsx              -- Homepage
    konsultasi/
      [id]/
        page.tsx          -- Chat/BBS page
    arsip/
      page.tsx            -- Archive list
      [id]/
        page.tsx          -- Single archived thread
    tentang/
      page.tsx            -- About page
    redaksi/
      page.tsx            -- Editorial board
    kebijakan/
      page.tsx            -- Editorial policy
    donasi/
      page.tsx            -- Donation parody
  components/
    layout/
      RetroLayout.tsx
      NavBar.tsx
      Footer.tsx
      MarqueeBar.tsx
    home/
      SearchBox.tsx
      ArtikelPilihan.tsx
      TahukahAnda.tsx
      StatistikPanel.tsx
    chat/
      ThreadHeader.tsx
      ForumPost.tsx
      ProfessorPost.tsx
      StudentPost.tsx
      TypingIndicator.tsx
      ReplyBox.tsx
      ShareToolbar.tsx
    archive/
      ThreadList.tsx
      ThreadView.tsx
      VoteButton.tsx
      ArchiveModal.tsx
    shared/
      BeveledButton.tsx
      HrDivider.tsx
  lib/
    api.ts               -- API client (fetch wrapper)
    types.ts             -- TypeScript interfaces
    constants.ts         -- Fake stats, professor names, departments
  styles/
    globals.css          -- Base retro styles, paper texture
    variables.css        -- CSS custom properties
  public/
    under-construction.gif
    netscape-badge.gif
    paper-texture.png
```

### API Integration

Frontend calls:
```
GET  /api/v1/universes                  -- homepage data (random facts)
POST /api/v1/universes/generate         -- create new universe from search
GET  /api/v1/universes/{id}             -- universe detail for chat header
POST /api/v1/universes/{id}/chat        -- send message, get response
POST /api/v1/conversations/archive      -- save conversation to archive
GET  /api/v1/conversations/archived     -- list archived (paginated)
GET  /api/v1/conversations/archived/{id} -- single archived thread
POST /api/v1/conversations/archived/{id}/vote -- upvote
```

### Backend Additions Required

New endpoints for archive/voting:
- `POST /api/v1/conversations/archive` — body: `{universe_id, topic, messages: [{role, content}]}`
- `GET /api/v1/conversations/archived` — query: `?page=1&sort=votes|recent`
- `GET /api/v1/conversations/archived/{id}`
- `POST /api/v1/conversations/archived/{id}/vote`

New SQLite table:
```sql
CREATE TABLE archived_conversations (
    id TEXT PRIMARY KEY,
    universe_id TEXT NOT NULL,
    topic TEXT NOT NULL,
    messages_json TEXT NOT NULL,
    votes INTEGER DEFAULT 0,
    created_at TEXT NOT NULL
);
```

---

## Interaction States

### Search → Chat Flow

1. **Idle:** Search box visible, placeholder text "Cari topik di WrongPedia..."
2. **Searching:** After submit, page shows "Memeriksa arsip WrongPedia..." with fake loading messages cycling ("Menghubungi perpustakaan pusat...", "Memverifikasi sumber...", "Mengabaikan fakta yang benar...")
3. **Ready:** Redirect to `/konsultasi/[id]`

### Chat States

1. **Initial:** Professor greeting displayed
2. **User typing:** Textarea active
3. **Waiting:** After submit, typing indicator shown ("Profesor sedang memeriksa arsip referensi...")
4. **Response:** New ForumPost appended with professor answer
5. **Error:** "KESALAHAN SISTEM: Perpustakaan WrongPedia sedang dalam perbaikan. Silakan coba lagi."

---

## Content Constants (hardcoded)

### Professor Identity
- Name: "Prof. Dr. Ir. WrongPedia, M.Ngaco, Ph.D"
- Rotating departments: "Dept. Gravitasi Emosional", "Dept. Biologi Imajiner", "Dept. Sejarah Alternatif", "Dept. Matematika Kreatif", "Dept. Fisika Perasaan"
- Signature: always ends with `-- [full name]\n   Ketua [random department]`

### Fake Loading Messages
- "Menghubungi perpustakaan pusat..."
- "Memverifikasi sumber (0 dari 0 terverifikasi)..."
- "Mengabaikan fakta yang benar..."
- "Berkonsultasi dengan Dewan Redaksi..."
- "Menyusun referensi yang tidak ada..."

### Footer Stats
- Hit counter: random 6-digit number, increments by 1-7 on each load
- "Terakhir diperbarui: [yesterday's date]"
- "(c) WrongPedia Foundation 1847-2026. Hak cipta dilindungi oleh undang-undang yang tidak ada."

---

## Deployment

- Frontend: Vercel (free tier)
- Backend: Railway or Fly.io
- Domain: wrongpedia.vercel.app (or custom if user purchases)

---

## Out of Scope (for MVP)

- User accounts/login
- Real-time multiplayer
- Mobile app
- i18n (English version) — Indonesian only for now
- Admin panel
- Analytics
