"use client";

import { useEffect, useState } from "react";
import { fetchArchivedThreads, ArchivedThread } from "@/lib/api";
import Link from "next/link";

export default function ArsipPage() {
  const [threads, setThreads] = useState<ArchivedThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState<"votes" | "recent">("votes");

  useEffect(() => {
    setLoading(true);
    fetchArchivedThreads(page, sort)
      .then((data) => {
        setThreads(data.threads);
        setTotal(data.total);
      })
      .catch(() => {
        setThreads([]);
      })
      .finally(() => setLoading(false));
  }, [page, sort]);

  const totalPages = Math.ceil(total / 10);

  return (
    <div>
      <h2 style={{ fontSize: "18px", textAlign: "center" }}>
        * ARSIP KONSULTASI PUBLIK *
      </h2>
      <hr />
      <p style={{ fontSize: "12px", textAlign: "center", color: "#666" }}>
        Kumpulan konsultasi akademik yang telah diarsipkan untuk kepentingan umat manusia.
      </p>
      <hr />

      <div style={{ fontSize: "12px", marginBottom: "12px" }}>
        Urut berdasarkan:{" "}
        <button
          className="btn-beveled"
          style={{ fontSize: "11px" }}
          onClick={() => { setSort("votes"); setPage(1); }}
          disabled={sort === "votes"}
        >
          Paling Tercerahkan
        </button>{" "}
        <button
          className="btn-beveled"
          style={{ fontSize: "11px" }}
          onClick={() => { setSort("recent"); setPage(1); }}
          disabled={sort === "recent"}
        >
          Terbaru
        </button>
      </div>

      {loading ? (
        <div className="bbs-box">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}>
            Membuka arsip...<span className="blink">_</span>
          </p>
        </div>
      ) : threads.length === 0 ? (
        <div className="bbs-box">
          <p style={{ fontSize: "14px", textAlign: "center" }}>
            Arsip masih kosong. Belum ada konsultasi yang diarsipkan.
          </p>
          <p style={{ fontSize: "12px", textAlign: "center", color: "#666", marginTop: "8px" }}>
            (Lakukan konsultasi dan klik [ ARSIPKAN ] untuk menambahkan)
          </p>
        </div>
      ) : (
        <>
          <table className="retro-table" style={{ width: "100%", fontSize: "13px" }}>
            <thead>
              <tr>
                <th>Topik</th>
                <th style={{ width: "60px" }}>Post</th>
                <th style={{ width: "50px" }}>+</th>
                <th style={{ width: "100px" }}>Waktu</th>
              </tr>
            </thead>
            <tbody>
              {threads.map((thread) => (
                <tr key={thread.id}>
                  <td>
                    <Link href={`/arsip/${thread.id}`}>
                      Re: {thread.topic}
                    </Link>
                  </td>
                  <td>{thread.messages.length}</td>
                  <td>{thread.votes}</td>
                  <td style={{ fontSize: "11px" }}>
                    {new Date(thread.created_at).toLocaleDateString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div style={{ textAlign: "center", marginTop: "12px", fontSize: "13px" }}>
              <button
                className="btn-beveled"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                {"[ << ]"}
              </button>
              {" "}Halaman {page} dari {totalPages}{" "}
              <button
                className="btn-beveled"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                {"[ >> ]"}
              </button>
            </div>
          )}
        </>
      )}

      <hr />
      <p style={{ fontSize: "11px", textAlign: "center", color: "#666" }}>
        Arsip ini bersifat permanen dan tidak dapat dihapus (kecuali servernya mati).
      </p>
    </div>
  );
}
