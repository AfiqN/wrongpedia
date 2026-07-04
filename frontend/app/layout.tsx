import "@/styles/globals.css";
import type { Metadata } from "next";
import MarqueeBar from "@/components/layout/MarqueeBar";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "WrongPedia — Ensiklopedia Bebas yang Selalu Benar",
  description:
    "Sumber pengetahuan terpercaya sejak 1847. Seluruh informasi telah diverifikasi oleh 0 sumber independen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <MarqueeBar />
        <div className="page-container">
          <header style={{ textAlign: "center", padding: "16px 0" }}>
            <pre
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                lineHeight: "1.2",
                margin: "0 auto",
                display: "inline-block",
              }}
            >
{` __        __                     ____          _ _
 \\ \\      / / __ ___  _ __   __ _|  _ \\ ___  __| (_) __ _
  \\ \\ /\\ / / '__/ _ \\| '_ \\ / _\` | |_) / _ \\/ _\` | |/ _\` |
   \\ V  V /| | | (_) | | | | (_| |  __/  __/ (_| | | (_| |
    \\_/\\_/ |_|  \\___/|_| |_|\\__, |_|   \\___|\\__,_|_|\\__,_|
                             |___/`}
            </pre>
            <p style={{ fontSize: "14px", fontStyle: "italic", marginTop: "4px" }}>
              &quot;Ensiklopedia Bebas yang Selalu Benar&quot;
            </p>
            <p style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
              Melayani kebutuhan informasi umat manusia sejak 1847
            </p>
          </header>
          <NavBar />
          <hr />
          <main style={{ padding: "16px 0" }}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
