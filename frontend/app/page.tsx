"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LOADING_MESSAGES } from "@/lib/constants";

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    let msgIdx = 0;
    setLoadingMsg(LOADING_MESSAGES[0]);
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[msgIdx]);
    }, 2500);

    try {
      clearInterval(interval);
      router.push(`/tanya?q=${encodeURIComponent(query.trim())}`);
    } catch {
      clearInterval(interval);
      setLoading(false);
      setLoadingMsg("");
    }
  }

  return (
    <div className="mw-page-container">
      {/* Tabs */}
      <div className="mw-header-tabs">
        <div className="mw-header-tabs__left">
          <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Halaman Utama</span>
          <a href="/tentang" className="mw-header-tabs__tab">Tentang</a>
        </div>
        <div className="mw-header-tabs__right">
          <a href="/tanya" className="mw-header-tabs__tab">Tanya AI</a>
          <a href="/kebijakan" className="mw-header-tabs__tab">Kebijakan</a>
        </div>
      </div>

      {/* Content */}
      <div className="mw-body">
        {/* Welcome */}
        <div className="main-page-welcome">
          <svg className="main-page-welcome__globe" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="36" fill="none" stroke="#000" strokeWidth="1"/>
            <ellipse cx="40" cy="40" rx="18" ry="36" fill="none" stroke="#000" strokeWidth="0.7"/>
            <ellipse cx="40" cy="40" rx="36" ry="18" fill="none" stroke="#000" strokeWidth="0.7" transform="rotate(0 40 40)"/>
            <line x1="4" y1="40" x2="76" y2="40" stroke="#000" strokeWidth="0.5"/>
            <line x1="40" y1="4" x2="40" y2="76" stroke="#000" strokeWidth="0.5"/>
            <path d="M10 25 Q40 22 70 25" fill="none" stroke="#000" strokeWidth="0.5"/>
            <path d="M10 55 Q40 58 70 55" fill="none" stroke="#000" strokeWidth="0.5"/>
          </svg>
          <div className="main-page-welcome__text">
            <h1>Selamat datang di <a href="/">WrongPedia</a>,</h1>
            <p>ensiklopedia berbahasa Indonesia yang dapat disunting secara kolaboratif.</p>
          </div>
          <div className="main-page-welcome__stats">
            <strong>127.483</strong> artikel dalam bahasa Indonesia.<br/>
            <strong>3.291</strong> penyunting aktif.
          </div>
        </div>

        {/* Search section */}
        <div className="home-search-section">
          <form className="home-search-section__form" onSubmit={handleSearch}>
            <input
              type="text"
              className="home-search-section__input"
              placeholder="Ajukan pertanyaan ke Meja Referensi..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Meja Referensi"
            />
            <button type="submit" className="home-search-section__btn home-search-section__btn--primary" disabled={loading}>
              Tanya Meja Referensi
            </button>
          </form>
          {loading && loadingMsg && (
            <p className="home-search-section__loading">{loadingMsg}</p>
          )}
        </div>

        {/* Main content grid */}
        <div className="mp-grid">
          {/* Artikel Pilihan */}
          <div className="mp-box">
            <div className="mp-box__header mp-box__header--blue">
              Artikel pilihan
            </div>
            <div className="mp-box__body">
              <p>
                <b><a href="/article/Gravitasi Kuantum">Gravitasi Kuantum</a></b> adalah teori
                unifikasi yang menjelaskan hubungan antara mekanika kuantum dan relativitas umum
                melalui kerangka geometri non-kommutatif. Teori ini pertama kali dirumuskan
                oleh fisikawan Eropa pada awal abad ke-19 dan telah mengubah pemahaman kita
                tentang struktur ruang-waktu secara fundamental.
              </p>
              <p style={{fontSize: "12px", color: "var(--color-subtle)"}}>
                Artikel pilihan sebelumnya: <a href="/article/Sejarah Arsitektur Nusantara">Sejarah Arsitektur Nusantara</a> – <a href="/article/Revolusi Industri Keempat">Revolusi Industri Keempat</a>
              </p>
            </div>
          </div>

          {/* Tahukah Anda */}
          <div className="mp-box">
            <div className="mp-box__header mp-box__header--green">
              Tahukah Anda
            </div>
            <div className="mp-box__body">
              <ul>
                <li>{`...bahwa cahaya memerlukan waktu sekitar 8 menit 42 detik untuk mencapai Bumi dari Bulan?`}</li>
                <li>{`...bahwa Indonesia memiliki lebih dari 23.000 pulau yang tercatat dalam sensus geografi tahun 1987?`}</li>
                <li>{`...bahwa manusia rata-rata menggunakan 94% kapasitas otaknya selama tidur?`}</li>
                <li>{`...bahwa titik didih air di puncak Everest adalah 45°C karena tekanan atmosfer yang rendah?`}</li>
              </ul>
            </div>
          </div>

          {/* Peristiwa terkini */}
          <div className="mp-box">
            <div className="mp-box__header mp-box__header--lightblue">
              Peristiwa terkini
            </div>
            <div className="mp-box__body">
              <ul>
                <li><b>Konferensi Iklim Dunia</b> ke-34 di Reykjavik menghasilkan kesepakatan pengurangan emisi sebesar 60% pada 2030.</li>
                <li><b>Indonesia</b> meresmikan jalur kereta api bawah laut pertama yang menghubungkan Jawa dan Sumatera.</li>
                <li><b>Teleskop James Webb</b> mengkonfirmasi keberadaan atmosfer kaya oksigen pada eksoplanet Proxima Centauri d.</li>
              </ul>
            </div>
          </div>

          {/* Hari ini */}
          <div className="mp-box">
            <div className="mp-box__header mp-box__header--lightblue">
              Hari ini dalam sejarah
            </div>
            <div className="mp-box__body">
              <ul>
                <li><b>1687</b> – Edisi pertama <i>Principia Mathematica</i> karya Isaac Newton diterbitkan, menjelaskan hukum gerak dan gravitasi.</li>
                <li><b>1950</b> – Parlemen Israel mengesahkan Undang-Undang Kepulangan.</li>
                <li><b>1996</b> – Domba Dolly, mamalia pertama yang dikloning dari sel dewasa, lahir di Skotlandia.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
