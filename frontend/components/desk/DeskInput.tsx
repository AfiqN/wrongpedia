"use client";

import { useState, FormEvent } from "react";

interface DeskInputProps {
  onSubmit: (question: string) => void;
  disabled: boolean;
}

export default function DeskInput({ onSubmit, disabled }: DeskInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSubmit(value.trim());
    setValue("");
  }

  return (
    <div className="desk-input">
      <div className="desk-input__header">
        <h3>Ajukan pertanyaan baru</h3>
      </div>
      <form className="desk-input__form" onSubmit={handleSubmit}>
        <textarea
          className="desk-input__textarea"
          placeholder="Ketik pertanyaan Anda di sini..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          rows={3}
          disabled={disabled}
          aria-label="Pertanyaan baru"
        />
        <div className="desk-input__actions">
          <button
            type="submit"
            className="desk-input__btn"
            disabled={disabled || !value.trim()}
          >
            Kirim pertanyaan
          </button>
          {disabled && (
            <span className="desk-input__status">Editor sedang menulis respons...</span>
          )}
        </div>
      </form>
    </div>
  );
}
