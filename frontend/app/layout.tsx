import "@/styles/globals.css";
import type { Metadata } from "next";
import WikiHeader from "@/components/layout/WikiHeader";
import WikiFooter from "@/components/layout/WikiFooter";

export const metadata: Metadata = {
  title: "WrongPedia — Ensiklopedia Bebas Berbahasa Indonesia",
  description:
    "WrongPedia adalah ensiklopedia daring berbahasa Indonesia yang menyajikan informasi komprehensif dari berbagai bidang ilmu pengetahuan, sejarah, dan budaya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <WikiHeader />
        {children}
        <WikiFooter />
      </body>
    </html>
  );
}
