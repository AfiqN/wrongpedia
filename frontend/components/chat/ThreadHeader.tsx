interface ThreadHeaderProps {
  topic: string;
  postCount: number;
}

export default function ThreadHeader({ topic, postCount }: ThreadHeaderProps) {
  const now = new Date().toLocaleString("id-ID");

  return (
    <div
      className="bbs-box"
      style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}
    >
      <p style={{ fontWeight: "bold" }}>
        WRONGPEDIA {">"} KONSULTASI AKADEMIK
      </p>
      <p>{"═".repeat(50)}</p>
      <p>Topik: {topic}</p>
      <p>
        Dimulai: {now} | Post: {postCount}
      </p>
    </div>
  );
}
