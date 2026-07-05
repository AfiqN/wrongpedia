"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DeskContainer from "@/components/desk/DeskContainer";

function DeskContent() {
  const searchParams = useSearchParams();
  const initialQuestion = searchParams.get("q") || undefined;

  return (
    <div className="mw-page-container">
      <div className="mw-header-tabs">
        <div className="mw-header-tabs__left">
          <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Meja Referensi</span>
          <a href="/" className="mw-header-tabs__tab">Halaman Utama</a>
        </div>
        <div className="mw-header-tabs__right">
          <a href="/tentang" className="mw-header-tabs__tab">Tentang</a>
          <a href="/kebijakan" className="mw-header-tabs__tab">Kebijakan</a>
        </div>
      </div>

      <div className="mw-content-container">
        <div className="mw-body">
          <h1 className="mw-first-heading">WrongPedia:Meja Referensi</h1>
          <div className="mw-body-subheading">Dari WrongPedia bahasa Indonesia, ensiklopedia bebas</div>

          <div className="mw-parser-output">
            <DeskContainer initialQuestion={initialQuestion} />
          </div>
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
      <DeskContent />
    </Suspense>
  );
}
