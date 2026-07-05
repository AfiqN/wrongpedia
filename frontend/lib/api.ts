import { ArticleData } from "@/components/article/ArticleContent";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// --- Article API ---

export async function generateArticle(topic: string): Promise<ArticleData> {
  const res = await fetch(`${API_BASE}/api/v1/article/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Gagal menghasilkan artikel");
  }
  return res.json();
}

export async function fetchArticle(slug: string): Promise<ArticleData | null> {
  const res = await fetch(`${API_BASE}/api/v1/article/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error("Gagal memuat artikel");
  }
  return res.json();
}

export async function fetchRandomTopic(): Promise<string> {
  const res = await fetch(`${API_BASE}/api/v1/article/random`);
  if (!res.ok) {
    throw new Error("Gagal mengambil topik acak");
  }
  const data = await res.json();
  return data.topic;
}
