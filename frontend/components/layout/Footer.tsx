"use client";

import { getHitCount, getYesterday } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        fontSize: "12px",
        color: "#666",
        padding: "16px 0",
        borderTop: "1px solid #808080",
        marginTop: "24px",
      }}
    >
      <hr />
      <p>Pengunjung ke-{getHitCount()}</p>
      <p style={{ marginTop: "4px" }}>
        Terakhir diperbarui: {getYesterday()}
      </p>
      <p style={{ marginTop: "8px", fontFamily: "var(--font-mono)", fontSize: "10px" }}>
        * Terbaik dilihat dengan Netscape Navigator 4.0 (800x600) *
      </p>
      <p style={{ marginTop: "8px" }}>
        (c) WrongPedia Foundation 1847-2026. Hak cipta dilindungi undang-undang yang tidak ada.
      </p>
    </footer>
  );
}
