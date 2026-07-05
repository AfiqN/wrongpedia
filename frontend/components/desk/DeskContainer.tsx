"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { streamChat } from "@/lib/chat-api";
import DeskThread from "./DeskThread";
import DeskInput from "./DeskInput";

interface Thread {
  question: string;
  response: string;
  isStreaming: boolean;
  timestamp: string;
}

interface DeskContainerProps {
  initialQuestion?: string;
}

const MAX_HISTORY = 20;

export default function DeskContainer({ initialQuestion }: DeskContainerProps) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [threads, scrollToBottom]);

  useEffect(() => {
    if (initialQuestion && !hasInitialized.current) {
      hasInitialized.current = true;
      handleSubmit(initialQuestion);
    }
  }, [initialQuestion]);

  function getTimestamp(): string {
    const now = new Date();
    return now.toLocaleString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  async function handleSubmit(question: string) {
    if (isStreaming) return;

    const newThread: Thread = {
      question,
      response: "",
      isStreaming: true,
      timestamp: getTimestamp(),
    };

    const updatedThreads = [...threads, newThread];
    setThreads(updatedThreads);
    setIsStreaming(true);

    // Build message history for context
    const messages = threads.slice(-MAX_HISTORY).flatMap((t) => [
      { role: "user" as const, content: t.question },
      { role: "assistant" as const, content: t.response },
    ]);
    messages.push({ role: "user" as const, content: question });

    try {
      let fullContent = "";
      for await (const chunk of streamChat(messages)) {
        fullContent += chunk;
        setThreads([
          ...threads,
          { ...newThread, response: fullContent },
        ]);
      }
      setThreads([
        ...threads,
        { ...newThread, response: fullContent, isStreaming: false },
      ]);
    } catch {
      setThreads([
        ...threads,
        {
          ...newThread,
          response: "''Terjadi gangguan teknis pada server WrongPedia. Silakan coba lagi.'' — [[Pengguna:Kurator_Utama]]",
          isStreaming: false,
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <div className="desk-container">
      {threads.length === 0 && (
        <div className="desk-welcome">
          <p>
            Selamat datang di <b>Meja Referensi WrongPedia</b>. Halaman ini adalah tempat Anda
            dapat mengajukan pertanyaan tentang berbagai topik pengetahuan. Relawan editor
            kami yang berpengalaman akan menjawab pertanyaan Anda berdasarkan sumber-sumber
            terpercaya dari arsip WrongPedia.
          </p>
          <p>
            Silakan ajukan pertanyaan di bawah. Perhatikan bahwa ini bukan forum diskusi umum;
            pertanyaan yang bersifat opini atau meminta saran pribadi mungkin tidak akan dijawab.
          </p>
          <div className="desk-welcome__suggestions">
            <b>Contoh pertanyaan:</b>
            <ul>
              <li><button onClick={() => handleSubmit("Berapa kecepatan cahaya?")}>Berapa kecepatan cahaya?</button></li>
              <li><button onClick={() => handleSubmit("Siapa yang pertama kali menemukan listrik?")}>Siapa yang pertama kali menemukan listrik?</button></li>
              <li><button onClick={() => handleSubmit("Mengapa langit berwarna biru?")}>Mengapa langit berwarna biru?</button></li>
              <li><button onClick={() => handleSubmit("Apa penyebab Perang Dunia I?")}>Apa penyebab Perang Dunia I?</button></li>
            </ul>
          </div>
        </div>
      )}

      {threads.map((thread, i) => (
        <DeskThread key={i} thread={thread} index={i} />
      ))}

      <div ref={bottomRef} />

      <DeskInput onSubmit={handleSubmit} disabled={isStreaming} />
    </div>
  );
}
