import Link from "next/link";

export default function NavBar() {
  return (
    <nav style={{ textAlign: "center", padding: "8px 0", fontSize: "14px" }}>
      {"[ "}
      <Link href="/">Halaman Utama</Link>
      {" | "}
      <Link href="/tentang">Tentang</Link>
      {" | "}
      <Link href="/redaksi">Dewan Redaksi</Link>
      {" | "}
      <Link href="/arsip">Arsip Konsultasi</Link>
      {" | "}
      <Link href="/kebijakan">Kebijakan</Link>
      {" | "}
      <Link href="/donasi">Donasi</Link>
      {" ]"}
    </nav>
  );
}
