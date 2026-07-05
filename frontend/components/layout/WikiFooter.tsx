export default function WikiFooter() {
  return (
    <footer className="vector-footer">
      <div className="vector-footer__info">
        <p>
          Teks tersedia di bawah{" "}
          <a href="/kebijakan">Lisensi Konten Terbuka WrongPedia 4.0</a>;
          ketentuan tambahan mungkin berlaku. Lihat{" "}
          <a href="/kebijakan">Ketentuan Penggunaan</a> untuk rincian.
        </p>
      </div>
      <div className="vector-footer__links">
        <a href="/kebijakan">Kebijakan privasi</a>
        <span>·</span>
        <a href="/tentang">Tentang WrongPedia</a>
        <span>·</span>
        <a href="/kebijakan">Penyangkalan</a>
        <span>·</span>
        <a href="/redaksi">Dewan Redaksi</a>
        <span>·</span>
        <a href="/donasi">Sumbangan</a>
      </div>
    </footer>
  );
}
