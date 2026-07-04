interface ForumPostProps {
  postNumber: number;
  role: "user" | "assistant";
  content: string;
  professorAscii: string;
  professorName: string;
  department: string;
}

export default function ForumPost({
  postNumber,
  role,
  content,
  professorAscii,
  professorName,
}: ForumPostProps) {
  const isProf = role === "assistant";
  const timestamp = new Date().toLocaleString("id-ID");
  const sender = isProf ? professorName : "Mahasiswa Penanya";

  return (
    <div className="bbs-box">
      <div className="bbs-box-header">
        <span>Post #{postNumber}</span>
        <span style={{ float: "right" }}>{timestamp}</span>
      </div>
      <div style={{ marginBottom: "4px" }}>
        <strong>Dari:</strong> {sender}
      </div>
      <div
        style={{
          borderTop: "1px dashed var(--border-light)",
          paddingTop: "8px",
        }}
      >
        {isProf && (
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              lineHeight: "1.2",
              marginBottom: "8px",
              color: "var(--text-muted)",
            }}
          >
            {professorAscii}
          </pre>
        )}
        <div style={{ whiteSpace: "pre-wrap", fontSize: "14px" }}>
          {content}
        </div>
      </div>
    </div>
  );
}
