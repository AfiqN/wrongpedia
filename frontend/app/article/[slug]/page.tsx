"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArticleContent, { ArticleData } from "@/components/article/ArticleContent";
import TableOfContents from "@/components/article/TableOfContents";
import Sidebar from "@/components/layout/Sidebar";
import { LOADING_MESSAGES } from "@/lib/constants";
import { generateArticle } from "@/lib/api";

export default function ArticlePage() {
  const params = useParams();
  const slug = decodeURIComponent(params.slug as string);

  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [error, setError] = useState("");

  useEffect(() => {
    let msgIdx = 0;
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[msgIdx]);
    }, 2500);

    generateArticle(slug)
      .then((data) => {
        setArticle(data);
        setLoading(false);
        clearInterval(interval);
      })
      .catch((err) => {
        setError(err.message || "Gagal memuat artikel");
        setLoading(false);
        clearInterval(interval);
      });

    return () => clearInterval(interval);
  }, [slug]);

  if (loading) {
    return (
      <div className="mw-page-container">
        <div className="mw-header-tabs">
          <div className="mw-header-tabs__left">
            <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Halaman</span>
            <span className="mw-header-tabs__tab">Pembicaraan</span>
          </div>
          <div className="mw-header-tabs__right">
            <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Baca</span>
            <span className="mw-header-tabs__tab">Sunting</span>
            <span className="mw-header-tabs__tab">Sunting sumber</span>
            <span className="mw-header-tabs__tab">Lihat riwayat</span>
          </div>
        </div>
        <div className="mw-content-container">
          <div className="mw-body">
            <div className="skeleton skeleton--title" />
            <div style={{ float: "right", width: "22em", margin: "0 0 14px 14px" }}>
              <div className="skeleton skeleton--box" />
            </div>
            <div className="skeleton skeleton--text" />
            <div className="skeleton skeleton--text" style={{ width: "90%" }} />
            <div className="skeleton skeleton--text" style={{ width: "70%" }} />
            <div className="skeleton skeleton--text" style={{ width: "85%" }} />
            <div className="skeleton skeleton--text-short" />
            <p style={{ marginTop: "24px", fontStyle: "italic", color: "var(--color-subtle)", fontSize: "13px", clear: "both" }}>
              {loadingMsg}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mw-page-container">
        <div className="mw-header-tabs">
          <div className="mw-header-tabs__left">
            <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Halaman</span>
            <span className="mw-header-tabs__tab">Pembicaraan</span>
          </div>
          <div className="mw-header-tabs__right">
            <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Baca</span>
          </div>
        </div>
        <div className="mw-content-container">
          <div className="mw-body">
            <h1 className="mw-first-heading">Kesalahan</h1>
            <p style={{ marginTop: "12px", color: "var(--color-destructive)" }}>{error}</p>
            <p style={{ marginTop: "8px" }}>
              <a href="/">← Kembali ke Halaman Utama</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!article) return null;

  const tocItems = article.sections.map((s) => ({ id: s.id, title: s.title, level: s.level }));

  return (
    <div className="mw-page-container">
      {/* Tabs */}
      <div className="mw-header-tabs">
        <div className="mw-header-tabs__left">
          <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Halaman</span>
          <a href="/" className="mw-header-tabs__tab">Halaman Utama</a>
        </div>
        <div className="mw-header-tabs__right">
          <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Baca</span>
          <a href="/tanya" className="mw-header-tabs__tab">Tanya AI</a>
        </div>
      </div>

      <div className="mw-content-container">
        {/* TOC sidebar */}
        <Sidebar>
          <TableOfContents items={tocItems} />
        </Sidebar>

        {/* Article body */}
        <div className="mw-body">
          <div className="mw-body-subheading">
            Dari WrongPedia bahasa Indonesia, ensiklopedia bebas
          </div>

          <h1 className="mw-first-heading">{article.title}</h1>

          <ArticleContent article={article} />
        </div>
      </div>
    </div>
  );
}
