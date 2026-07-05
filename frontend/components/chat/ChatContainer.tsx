"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage } from "@/lib/types";
import { streamChat } from "@/lib/chat-api";
import ChatMessageComponent from "./ChatMessage";
import ChatInput from "./ChatInput";

const MAX_MESSAGES = 40; // Cap context to prevent token overflow

interface ChatContainerProps {
  initialQuestion?: string;
}

export default function ChatContainer({ initialQuestion }: ChatContainerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle initial question from URL params
  useEffect(() => {
    if (initialQuestion && !hasInitialized.current) {
      hasInitialized.current = true;
      handleSend(initialQuestion);
    }
  }, [initialQuestion]);

  async function handleSend(content: string) {
    const userMessage: ChatMessage = { role: "user", content };
    const updatedMessages = [...messages, userMessage].slice(-MAX_MESSAGES);

    setMessages([...updatedMessages]);
    setIsStreaming(true);

    // Add empty assistant message for streaming
    const assistantMessage: ChatMessage = { role: "assistant", content: "" };
    setMessages([...updatedMessages, assistantMessage]);

    try {
      let fullContent = "";
      for await (const chunk of streamChat(updatedMessages)) {
        fullContent += chunk;
        setMessages([
          ...updatedMessages,
          { role: "assistant", content: fullContent },
        ]);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Terjadi kesalahan";
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: `Maaf, terjadi gangguan teknis. Silakan coba lagi dalam beberapa saat.`,
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-welcome">
            <div className="chat-welcome__icon">W</div>
            <h2 className="chat-welcome__title">Tanya WrongBot</h2>
            <p className="chat-welcome__subtitle">
              Asisten ensiklopedia berbasis AI. Tanyakan apa saja tentang sains, sejarah, atau pengetahuan umum.
            </p>
            <div className="chat-welcome__suggestions">
              <button onClick={() => handleSend("Berapa kecepatan cahaya?")} className="chat-welcome__chip">
                Berapa kecepatan cahaya?
              </button>
              <button onClick={() => handleSend("Siapa penemu internet?")} className="chat-welcome__chip">
                Siapa penemu internet?
              </button>
              <button onClick={() => handleSend("Mengapa langit berwarna biru?")} className="chat-welcome__chip">
                Mengapa langit berwarna biru?
              </button>
              <button onClick={() => handleSend("Jelaskan teori relativitas")} className="chat-welcome__chip">
                Jelaskan teori relativitas
              </button>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessageComponent
            key={i}
            message={msg}
            isStreaming={isStreaming && i === messages.length - 1 && msg.role === "assistant"}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={isStreaming} />
    </div>
  );
}
