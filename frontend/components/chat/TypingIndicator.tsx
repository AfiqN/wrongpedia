export default function TypingIndicator() {
  return (
    <div
      className="bbs-box"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        color: "var(--text-muted)",
        fontStyle: "italic",
      }}
    >
      Profesor sedang memeriksa arsip referensi
      <span className="blink">...</span>
    </div>
  );
}
