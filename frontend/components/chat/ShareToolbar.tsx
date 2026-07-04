"use client";

import { ChatMessage, archiveConversation } from "@/lib/api";
import { useState } from "react";

interface ShareToolbarProps {
  messages: ChatMessage[];
  topic: string;
  universeId: string;
}

export default function ShareToolbar({
  messages,
  topic,
  universeId,
}: ShareToolbarProps) {
  const [archiveStatus, setArchiveStatus] = useState<string>("");

  async function handleArchive() {
    if (messages.length < 3) {
      setArchiveStatus("Minimal 2 pertanyaan untuk mengarsipkan.");
      return;
    }

    setArchiveStatus("Menyimpan ke arsip publik...");
    try {
      const result = await archiveConversation(universeId, topic, messages);
      setArchiveStatus(
        `Tersimpan. Tautan: /arsip/${result.id}`
      );
    } catch {
      setArchiveStatus("Gagal menyimpan. Arsip penuh (kapasitas: tidak terbatas).");
    }
  }

  function handleCopyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setArchiveStatus("Tautan disalin ke clipboard.");
  }

  return (
    <div style={{ marginTop: "16px", fontSize: "13px" }}>
      <button className="btn-beveled" onClick={handleArchive}>
        [ ARSIPKAN KONSULTASI ]
      </button>
      {" "}
      <button className="btn-beveled" onClick={handleCopyLink}>
        [ BAGIKAN TAUTAN ]
      </button>
      {archiveStatus && (
        <p
          style={{
            marginTop: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--text-muted)",
          }}
        >
          {"> "}{archiveStatus}
        </p>
      )}
    </div>
  );
}
