"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchArchivedThread, voteThread, ArchivedThread } from "@/lib/api";
import ForumPost from "@/components/chat/ForumPost";
import { PROFESSOR_NAME, PROFESSOR_ASCII, DEPARTMENTS } from "@/lib/constants";

export default function ArsipDetailPage() {
  const params = useParams();
  const threadId = params.id as string;

  const [thread, setThread] = useState<ArchivedThread | null>(null);
  const [votes, setVotes] = useState(0);
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArchivedThread(threadId)
      .then((t) => {
        setThread(t);
        setVotes(t.votes);
      })
      .catch(() => {
        setError("Arsip tidak ditemukan. Mungkin telah ditelan lubang hitam.");
      });
  }, [threadId]);

  async function handleVote() {
    if (voted) return;
    try {
      const result = await voteThread(threadId);
      setVotes(result.votes);
      setVoted(true);
    } catch {
      // silently fail
    }
  }

  if (error) {
    return (
      <div className="bbs-box">
        <p style={{ color: "var(--accent-red)" }}>{error}</p>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="bbs-box">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}>
          Membuka arsip...<span className="blink">_</span>
        </p>
      </div>
    );
  }

  const department = DEPARTMENTS[Math.abs(threadId.charCodeAt(0)) % DEPARTMENTS.length];

  return (
    <div>
      <div
        className="bbs-box"
        style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}
      >
        <p style={{ fontWeight: "bold" }}>
          WRONGPEDIA {">"} ARSIP KONSULTASI PUBLIK {">"} DETAIL
        </p>
        <p>{"═".repeat(50)}</p>
        <p>Topik: {thread.topic}</p>
        <p>
          Diarsipkan: {new Date(thread.created_at).toLocaleString("id-ID")} |
          Post: {thread.messages.length} | Tercerahkan: +{votes}
        </p>
      </div>

      <div>
        {thread.messages.map((msg, i) => (
          <ForumPost
            key={i}
            postNumber={i + 1}
            role={msg.role}
            content={msg.content}
            professorAscii={PROFESSOR_ASCII}
            professorName={PROFESSOR_NAME}
            department={department}
          />
        ))}
      </div>

      <div style={{ textAlign: "center", margin: "16px 0" }}>
        <button
          className="btn-beveled"
          onClick={handleVote}
          disabled={voted}
          style={{ fontSize: "14px", padding: "6px 16px" }}
        >
          {voted ? `[ TERCERAHKAN +${votes} ]` : `[ TERCERAHKAN +${votes} ] Klik untuk vote`}
        </button>
        {voted && (
          <p style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
            Anda telah merasa tercerahkan. Semoga informasi ini mengubah hidup Anda (dalam arah yang salah).
          </p>
        )}
      </div>

      <hr />
      <p style={{ fontSize: "12px", textAlign: "center" }}>
        <a href="/arsip">&lt;&lt; Kembali ke Arsip</a>
      </p>
    </div>
  );
}
