"use client";

import ReactMarkdown from "react-markdown";
import { ChatMessage } from "@/lib/types";

interface ChatMessageProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

export default function ChatMessageComponent({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`chat-message ${isUser ? "chat-message--user" : "chat-message--assistant"}`}>
      {!isUser && (
        <div className="chat-message__avatar">
          <span className="chat-message__avatar-icon">W</span>
        </div>
      )}
      <div className="chat-message__body">
        {!isUser && (
          <div className="chat-message__name">
            WrongBot <span className="chat-message__badge">editor</span>
          </div>
        )}
        <div className="chat-message__content">
          {isUser ? (
            message.content
          ) : (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          )}
          {isStreaming && <span className="chat-cursor">▌</span>}
        </div>
        {!isUser && !isStreaming && message.content && (
          <div className="chat-message__timestamp">
            {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
          </div>
        )}
      </div>
    </div>
  );
}
