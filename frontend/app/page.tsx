"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { fetchUniverses, generateUniverse } from "@/lib/api";
import { LOADING_MESSAGES, FAKE_STATS } from "@/lib/constants";
import SearchBox from "@/components/home/SearchBox";
import ArtikelPilihan from "@/components/home/ArtikelPilihan";
import TahukahAnda from "@/components/home/TahukahAnda";
import StatistikPanel from "@/components/home/StatistikPanel";

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);

    // Cycle loading messages
    let msgIdx = 0;
    setLoadingMsg(LOADING_MESSAGES[0]);
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[msgIdx]);
    }, 2500);

    try {
      // Check if a matching universe exists
      const universes = await fetchUniverses();
      const match = universes.find(
        (u) => u.topic.toLowerCase() === query.trim().toLowerCase()
      );

      if (match) {
        clearInterval(interval);
        router.push(`/konsultasi/${match.id}`);
        return;
      }

      // Generate new universe
      const newUniverse = await generateUniverse(query.trim());
      clearInterval(interval);
      router.push(`/konsultasi/${newUniverse.id}`);
    } catch {
      clearInterval(interval);
      setLoading(false);
      setLoadingMsg("");
      alert("KESALAHAN SISTEM: Perpustakaan WrongPedia sedang dalam perbaikan.");
    }
  }

  return (
    <div>
      {/* Search */}
      <SearchBox
        query={query}
        setQuery={setQuery}
        onSubmit={handleSearch}
        loading={loading}
        loadingMsg={loadingMsg}
      />

      <hr />

      {/* Artikel Pilihan */}
      <ArtikelPilihan />

      <hr />

      {/* Tahukah Anda */}
      <TahukahAnda />

      <hr />

      {/* Statistik */}
      <StatistikPanel stats={FAKE_STATS} />
    </div>
  );
}
