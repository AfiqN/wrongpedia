"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useParams } from "next/navigation";
import { fetchUniverse, sendMessage, Universe, ChatMessage } from "@/lib/api";
import {
  PROFESSOR_NAME,
  PROFESSOR_ASCII,
  getRandomDepartment,
  getRandomCitation,
  getProfessorGreeting,
} from "@/lib/constants";
import ThreadHeader from "@/components/chat/ThreadHeader";
import ForumPost from "@/components/chat/ForumPost";
import ReplyBox from "@/components/chat/ReplyBox";
import TypingIndicator from "@/components/chat/TypingIndicator";
import ShareToolbar from "@/components/chat/ShareToolbar";

export default function KonsultasiPage() {
  const params = useParams();
  const universeId = params.id as string;

  const [universe, setUniverse] = useState<Universe | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [department] = useState(() => getRandomDepartment());
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load universe info and show greeting
  useEffect(() => {
    fetchUniverse(universeId)
      .then((u) => {
        setUniverse(u);
        // Professor greeting as first message
        const greeting = getProfessorGreeting(u.display_name || u.topic, department);
        setMessages([{ role: "assistant", content: greeting }]);
      })
      .catch(() => {
        setError("Universe tidak ditemukan. Arsip mungkin telah dipindahkan.");
      });
  }, [universeId, department]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(question: string) {
    if (!question.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: question };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      // Send only actual chat history (exclude greeting for cleaner context)
      const historyForApi = updatedMessages.slice(1); // skip greeting
      const answer = await sendMessage(universeId, question, historyForApi);

      // Append citation to answer
      const citation = getRandomCitation();
      const signedAnswer = `${answer}\n\nReferensi:\n[1] ${citation}\n\n-- ${PROFESSOR_NAME}\n   Ketua ${department}`;

      setMessages([...updatedMessages, { role: "assistant", content: signedAnswer }]);
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "KESALAHAN SISTEM: Perpustakaan pusat sedang dalam pemeliharaan. Mohon ulangi pertanyaan Anda.\n\n-- Sistem Otomatis WrongPedia",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return (
      <div className="bbs-box">
        <p style={{ color: "var(--accent-red)" }}>{error}</p>
      </div>
    );
  }

  if (!universe) {
    return (
      <div className="bbs-box">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}>
          Memuat ruang konsultasi...<span className="blink">_</span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <ThreadHeader
        topic={universe.display_name || universe.topic}
        postCount={messages.length}
      />

      <div>
        {messages.map((msg, i) => (
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

        {loading && <TypingIndicator />}
      </div>

      <div ref={bottomRef} />

      <ReplyBox onSend={handleSend} disabled={loading} />

      <ShareToolbar
        messages={messages}
        topic={universe.display_name || universe.topic}
        universeId={universeId}
      />
    </div>
  );
}
