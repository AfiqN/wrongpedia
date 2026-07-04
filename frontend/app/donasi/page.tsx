"use client";

import { useState } from "react";

export default function DonasiPage() {
  const [donated, setDonated] = useState(false);

  return (
    <div>
      <h2 style={{ fontSize: "18px", textAlign: "center" }}>
        * DUKUNG WRONGPEDIA *
      </h2>
      <hr />

      <div
        className="bbs-box"
        style={{ textAlign: "center", padding: "24px" }}
      >
        <p style={{ fontSize: "16px", fontWeight: "bold" }}>
          Pembaca yang terhormat,
        </p>
        <p style={{ fontSize: "14px", marginTop: "12px", lineHeight: "1.8" }}>
          Jika setiap pembaca WrongPedia menyumbangkan Rp 1.000, kami tetap
          tidak akan memperbaiki informasi kami. Namun kami bisa membeli kopi
          untuk Dewan Redaksi (yang sebenarnya tidak ada).
        </p>
        <p style={{ fontSize: "14px", marginTop: "12px", lineHeight: "1.8" }}>
          Tanpa dukungan Anda, kami mungkin terpaksa mulai menulis fakta yang
          benar. Bayangkan betapa membosankannya dunia itu.
        </p>
      </div>

      <div className="bbs-box">
        <div className="bbs-box-header">PROGRESS DONASI 2026</div>
        <p style={{ fontSize: "12px", marginBottom: "4px" }}>
          Target: Rp 847.291.000 | Terkumpul: Rp 12.500
        </p>
        <div
          style={{
            border: "1px solid var(--border-color)",
            height: "20px",
            width: "100%",
            background: "#fff",
          }}
        >
          <div
            style={{
              width: "1.5%",
              height: "100%",
              background: "var(--accent-red)",
            }}
          />
        </div>
        <p style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
          1.5% tercapai (progress bar ini belum pernah bergerak sejak 2019)
        </p>
      </div>

      {!donated ? (
        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <button
            className="btn-beveled"
            style={{ fontSize: "16px", padding: "8px 24px" }}
            onClick={() => setDonated(true)}
          >
            [ DONASI SEKARANG ]
          </button>
        </div>
      ) : (
        <div className="bbs-box" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>TERIMA KASIH!</p>
          <p style={{ fontSize: "14px", marginTop: "8px" }}>
            Donasi Anda sebesar Rp 0 telah kami terima dengan penuh haru.
          </p>
          <p style={{ fontSize: "14px", marginTop: "8px" }}>
            Sebagai tanda terima kasih, Anda kini menyandang gelar kehormatan:
          </p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginTop: "8px",
              fontFamily: "var(--font-mono)",
            }}
          >
            &quot;Dermawan Imajiner WrongPedia Kelas Bintang Tiga&quot;
          </p>
          <p style={{ fontSize: "12px", marginTop: "12px", color: "#666" }}>
            (Gelar ini tidak diakui oleh institusi manapun termasuk WrongPedia sendiri)
          </p>
        </div>
      )}

      <div className="bbs-box">
        <div className="bbs-box-header">TESTIMONIAL DONATUR</div>
        <p style={{ fontSize: "13px", fontStyle: "italic", marginBottom: "8px" }}>
          &quot;Sejak berdonasi ke WrongPedia, hidup saya tidak berubah sama
          sekali.&quot; — Anonim, 2024
        </p>
        <p style={{ fontSize: "13px", fontStyle: "italic", marginBottom: "8px" }}>
          &quot;Saya tidak pernah berdonasi tapi nama saya tetap muncul di
          sini.&quot; — Dr. Budi, 2025
        </p>
        <p style={{ fontSize: "13px", fontStyle: "italic" }}>
          &quot;Apakah ini penipuan? Saya rasa tidak, karena mereka tidak
          meminta uang sungguhan.&quot; — Mahasiswa, 2026
        </p>
      </div>

      <hr />
      <p style={{ fontSize: "11px", textAlign: "center", color: "#666" }}>
        WrongPedia Foundation adalah organisasi non-profit (karena memang tidak pernah menghasilkan profit).
      </p>
    </div>
  );
}
