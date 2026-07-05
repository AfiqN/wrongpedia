"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ChatContainer from "@/components/chat/ChatContainer";

function ChatContent() {
  const searchParams = useSearchParams();
  const initialQuestion = searchParams.get("q") || undefined;

  return (
    <div className="mw-page-container">
      <div className="mw-header-tabs">
        <div className="mw-header-tabs__left">
          <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Tanya WrongBot</span>
          <a href="/" className="mw-header-tabs__tab">Halaman Utama</a>
        </div>
        <div className="mw-header-tabs__right">
          <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Chat</span>
          <a href="/kebijakan" className="mw-header-tabs__tab">Kebijakan</a>
        </div>
      </div>

      <div className="mw-content-container">
        <div className="mw-body mw-body--chat">
          <ChatContainer initialQuestion={initialQuestion} />
        </div>
      </div>
    </div>
  );
}

export default function TanyaPage() {
  return (
    <Suspense fallback={
      <div className="mw-page-container">
        <div className="mw-content-container">
          <div className="mw-body">
            <p>Memuat...</p>
          </div>
        </div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}
