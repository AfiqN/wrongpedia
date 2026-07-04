"use client";

import { useEffect, useState } from "react";
import { fetchUniverses, Universe } from "@/lib/api";

export default function ArtikelPilihan() {
  const [article, setArticle] = useState<Universe | null>(null);

  useEffect(() => {
    fetchUniverses()
      .then((universes) => {
        if (universes.length > 0) {
          const random = universes[Math.floor(Math.random() * universes.length)];
          setArticle(random);
        }
      })
      .catch(() => {});
  }, []);

  if (!article) {
    return (
      <div>
        <p className="section-title">* ARTIKEL PILIHAN HARI INI *</p>
        <p style={{ fontSize: "13px", color: "#666", fontStyle: "italic" }}>
          [Memuat artikel pilihan...]
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="section-title">* ARTIKEL PILIHAN HARI INI *</p>
      <p style={{ marginTop: "8px" }}>
        <strong>{article.display_name}</strong>
      </p>
      <p style={{ fontSize: "14px", marginTop: "4px" }}>
        {article.description}
      </p>
      <p style={{ fontSize: "12px", marginTop: "4px", color: "#666" }}>
        Kategori: {article.topic} | Terverifikasi: Ya (oleh kami sendiri)
      </p>
    </div>
  );
}
