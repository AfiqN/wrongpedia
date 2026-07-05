"use client";

import { useState } from "react";

export default function DonasiPage() {
  const [donated, setDonated] = useState(false);

  return (
    <div className="mw-page-container">
      <div className="mw-header-tabs">
        <div className="mw-header-tabs__left">
          <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Halaman</span>
          <a href="/" className="mw-header-tabs__tab">Halaman Utama</a>
        </div>
        <div className="mw-header-tabs__right">
          <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Baca</span>
          <a href="/tentang" className="mw-header-tabs__tab">Tentang</a>
        </div>
      </div>
      <div className="mw-content-container">
        <div className="mw-body">
          <h1 className="mw-first-heading">Dukung WrongPedia</h1>
          <div className="mw-body-subheading">Dari WrongPedia bahasa Indonesia, ensiklopedia bebas</div>

          <div className="mw-parser-output">
            <p>
              <b>Pembaca yang terhormat,</b> WrongPedia adalah proyek nirlaba yang
              bergantung sepenuhnya pada dukungan pembaca. Tanpa sumbangan Anda,
              kami tidak dapat mempertahankan server, membayar tim redaksi, dan
              terus menyediakan akses pengetahuan terbuka bagi jutaan pembaca.
            </p>
            <p>
              Jika setiap pembaca menyumbangkan sebesar secangkir kopi, kami
              dapat memenuhi kebutuhan operasional selama satu tahun penuh.
            </p>

            <div className="mw-heading2"><h2>Kampanye penggalangan 2026</h2></div>
            <p>Target tahunan: Rp 250.000.000 | Terkumpul: Rp 47.830.000 (19,1%)</p>
            <div style={{
              border: "1px solid var(--border-color-base)",
              height: "16px",
              width: "100%",
              background: "var(--background-color-interactive-subtle)",
              margin: "8px 0",
              borderRadius: "2px",
            }}>
              <div style={{
                width: "19%",
                height: "100%",
                background: "var(--color-progressive)",
                borderRadius: "2px 0 0 2px",
              }} />
            </div>
            <p style={{ fontSize: "12px", color: "var(--color-subtle)" }}>
              Terakhir diperbarui: Juli 2026
            </p>

            <div className="mw-heading2"><h2>Alokasi dana</h2></div>
            <ul>
              <li><b>Infrastruktur server</b> — 45% dari total anggaran</li>
              <li><b>Pengembangan platform</b> — 25% untuk pemeliharaan dan fitur baru</li>
              <li><b>Program komunitas</b> — 20% untuk pelatihan kontributor</li>
              <li><b>Operasional</b> — 10% untuk administrasi umum</li>
            </ul>

            {!donated ? (
              <div style={{ textAlign: "center", margin: "24px 0" }}>
                <button
                  onClick={() => setDonated(true)}
                  style={{
                    padding: "8px 24px",
                    background: "var(--color-progressive)",
                    color: "#fff",
                    border: "1px solid var(--color-progressive)",
                    borderRadius: "2px",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Donasi Sekarang
                </button>
              </div>
            ) : (
              <div style={{
                border: "1px solid var(--border-color-subtle)",
                background: "var(--background-color-interactive-subtle)",
                padding: "16px",
                margin: "16px 0",
                textAlign: "center"
              }}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>Terima kasih atas dukungan Anda</p>
                <p style={{ marginTop: "8px" }}>
                  Kontribusi Anda telah dicatat. Bersama-sama kita menjaga pengetahuan
                  tetap terbuka dan dapat diakses oleh semua orang.
                </p>
              </div>
            )}

            <div className="mw-heading2"><h2>Cara lain untuk berkontribusi</h2></div>
            <ul>
              <li>Menjadi penyunting sukarelawan</li>
              <li>Menerjemahkan artikel ke bahasa daerah</li>
              <li>Menyebarkan tautan WrongPedia di media sosial</li>
              <li>Mengikuti program magang editorial</li>
            </ul>

            <div className="catlinks">
              <span className="catlinks__title">Kategori:</span>
              <ul className="catlinks__list">
                <li><a href="/tentang">WrongPedia</a></li>
                <li><a href="/donasi">Sumbangan</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
