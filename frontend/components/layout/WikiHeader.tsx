"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function WikiHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/tanya?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="vector-header">
      <div className="vector-header__start">
        {/* Logo */}
        <a href="/" className="vector-header__logo-link">
          <svg className="vector-header__logo-image" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="17" fill="none" stroke="#000" strokeWidth="0.5"/>
            <text x="18" y="24" textAnchor="middle" fontSize="20" fontFamily="Linux Libertine, serif" fill="#000">W</text>
          </svg>
          <div className="vector-header__logo-text-wrap">
            <span className="vector-header__wordmark">WrongPedia</span>
            <span className="vector-header__tagline">Ensiklopedia Bebas</span>
          </div>
        </a>
      </div>

      {/* Search */}
      <div className="vector-header__search">
        <div className="vector-search-box">
          <form className="vector-search-box__form" onSubmit={handleSearch}>
            <svg className="vector-search-box__icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.2 13.6a7 7 0 111.4-1.4l4.9 4.9-1.4 1.4-4.9-4.9zM8 13A5 5 0 108 3a5 5 0 000 10z" fill="currentColor"/>
            </svg>
            <input
              type="text"
              className="vector-search-box__input"
              placeholder="Telusuri WrongPedia"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Telusuri WrongPedia"
            />
            <button type="submit" className="vector-search-box__btn">Cari</button>
          </form>
        </div>
      </div>

      {/* User links */}
      <div className="vector-header__end">
        <a href="/donasi">Sumbangan</a>
        <a href="/tentang">Tentang</a>
        <a href="/tanya">Tanya AI</a>
      </div>
    </header>
  );
}
