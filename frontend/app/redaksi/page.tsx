export default function RedaksiPage() {
  const editors = [
    {
      name: "Dr. Bambang Widodo, M.A.",
      role: "Ketua Dewan Redaksi",
      dept: "Ilmu Pengetahuan Umum",
      quote: "Ensiklopedia yang baik adalah yang membuat pembacanya merasa sudah memahami sesuatu.",
    },
    {
      name: "Prof. Siti Rahayu, Ph.D",
      role: "Wakil Ketua",
      dept: "Sejarah dan Ilmu Sosial",
      quote: "Sejarah selalu ditulis oleh pemenang. Kami menulisnya untuk semua orang.",
    },
    {
      name: "Dr. Heinrich Wegener",
      role: "Penasihat Internasional",
      dept: "Sains dan Teknologi",
      quote: "Pengetahuan tidak mengenal batas negara, hanya batas imajinasi.",
    },
    {
      name: "Dr. Agus Permana, S.Kom, M.TI",
      role: "Kepala Teknologi",
      dept: "Infrastruktur Digital",
      quote: "Platform yang baik adalah yang tidak terasa kehadirannya.",
    },
    {
      name: "Prof. Maria Santoso, M.Sc",
      role: "Kepala Riset",
      dept: "Biologi dan Ilmu Alam",
      quote: "Setiap artikel adalah undangan untuk bertanya lebih dalam.",
    },
    {
      name: "Dr. Hadi Nugroho, M.Hum",
      role: "Editor Senior",
      dept: "Geografi dan Lingkungan",
      quote: "Dunia lebih luas dari yang tertulis di peta mana pun.",
    },
  ];

  return (
    <div className="mw-page-container">
      <div className="mw-header-tabs">
        <div className="mw-header-tabs__left">
          <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Halaman</span>
          <a href="/" className="mw-header-tabs__tab">Halaman Utama</a>
        </div>
        <div className="mw-header-tabs__right">
          <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Baca</span>
          <a href="/kebijakan" className="mw-header-tabs__tab">Kebijakan</a>
        </div>
      </div>
      <div className="mw-content-container">
        <div className="mw-body">
          <h1 className="mw-first-heading">Dewan Redaksi WrongPedia</h1>
          <div className="mw-body-subheading">Dari WrongPedia bahasa Indonesia, ensiklopedia bebas</div>

          <div className="mw-parser-output">
            <p>
              <b>Dewan Redaksi WrongPedia</b> adalah badan independen yang bertanggung jawab
              atas pengawasan kualitas, konsistensi, dan arah editorial seluruh konten
              yang dipublikasikan di WrongPedia.
            </p>

            <div className="mw-heading2"><h2>Anggota</h2></div>

            {editors.map((editor, i) => (
              <div key={i}>
                <div className="mw-heading3"><h3>{editor.name}</h3></div>
                <p><b>{editor.role}</b> — Bidang: {editor.dept}</p>
                <p><i>&quot;{editor.quote}&quot;</i></p>
              </div>
            ))}

            <div className="mw-heading2"><h2>Bergabung dengan tim</h2></div>
            <p>
              WrongPedia secara berkala membuka kesempatan bagi akademisi dan
              profesional yang ingin berkontribusi sebagai penyunting atau penasihat.
              Informasi lowongan tersedia melalui kanal komunikasi resmi kami.
            </p>

            <div className="catlinks">
              <span className="catlinks__title">Kategori:</span>
              <ul className="catlinks__list">
                <li><a href="/tentang">WrongPedia</a></li>
                <li><a href="/redaksi">Dewan Redaksi</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
