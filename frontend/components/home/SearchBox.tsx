"use client";

import { FormEvent } from "react";

interface SearchBoxProps {
  query: string;
  setQuery: (q: string) => void;
  onSubmit: (e: FormEvent) => void;
  loading: boolean;
  loadingMsg: string;
}

export default function SearchBox({
  query,
  setQuery,
  onSubmit,
  loading,
  loadingMsg,
}: SearchBoxProps) {
  return (
    <div className="bbs-box" style={{ textAlign: "center" }}>
      <div className="bbs-box-header">CARI DI WRONGPEDIA</div>
      <form onSubmit={onSubmit} style={{ margin: "12px 0" }}>
        <input
          type="text"
          className="input-inset"
          style={{ width: "70%", maxWidth: "400px" }}
          placeholder="Ketik topik apa saja..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
        />
        {" "}
        <button type="submit" className="btn-beveled" disabled={loading}>
          [ CARI ]
        </button>
      </form>
      {loading && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "#666",
            marginTop: "8px",
          }}
        >
          {loadingMsg}
          <span className="blink">_</span>
        </p>
      )}
    </div>
  );
}
