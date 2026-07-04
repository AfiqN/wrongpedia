"use client";

import { useState, FormEvent } from "react";

interface ReplyBoxProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ReplyBox({ onSend, disabled }: ReplyBoxProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <div className="bbs-box" style={{ marginTop: "16px" }}>
      <div className="bbs-box-header">TULIS PERTANYAAN</div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="input-inset"
          style={{
            width: "100%",
            minHeight: "80px",
            resize: "vertical",
            fontFamily: "var(--font-serif)",
            fontSize: "14px",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder="Ketik pertanyaan Anda di sini..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <div style={{ marginTop: "8px" }}>
          <button type="submit" className="btn-beveled" disabled={disabled}>
            [ KIRIM PERTANYAAN ]
          </button>
        </div>
      </form>
    </div>
  );
}
