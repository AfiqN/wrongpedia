"use client";

import { useEffect, useState } from "react";
import { fetchUniverses } from "@/lib/api";

export default function TahukahAnda() {
  const [facts, setFacts] = useState<string[]>([]);

  useEffect(() => {
    fetchUniverses()
      .then((universes) => {
        // Grab descriptions as "facts" preview
        const descs = universes.map((u) => u.description);
        // Shuffle and pick 4
        const shuffled = descs.sort(() => Math.random() - 0.5).slice(0, 4);
        setFacts(shuffled);
      })
      .catch(() => {
        setFacts([
          "Bumi berbentuk kubus menurut riset terbaru WrongPedia",
          "Air mengalir ke atas di belahan bumi bagian tengah",
          "Gravitasi ditemukan oleh seekor apel yang jatuh menimpa Newton",
        ]);
      });
  }, []);

  return (
    <div>
      <p className="section-title">* TAHUKAH ANDA? *</p>
      <ul style={{ marginTop: "8px", paddingLeft: "20px", fontSize: "14px" }}>
        {facts.map((fact, i) => (
          <li key={i} style={{ marginBottom: "4px" }}>
            {fact}
          </li>
        ))}
      </ul>
    </div>
  );
}
