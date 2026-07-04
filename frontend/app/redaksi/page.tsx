export default function RedaksiPage() {
  const professors = [
    {
      name: "Prof. Dr. Ir. Bambang Ngawuranto, S.Pd, M.Ngaco, Ph.D",
      role: "Ketua Dewan Redaksi",
      dept: "Gravitasi Emosional dan Fisika Perasaan",
      quote: "Gravitasi hanyalah bumi yang kesepian dan ingin memeluk kita semua.",
      ascii: `  .---.
 (  o o )
  | ^ |
  '---'`,
    },
    {
      name: "Prof. Dr. Siti Faktualis, M.Bohong, D.Sc (Univ. of Nowhere)",
      role: "Kepala Departemen Verifikasi",
      dept: "Verifikasi Tanpa Sumber",
      quote: "Saya sudah memverifikasi: tidak perlu verifikasi.",
      ascii: `  .---.
 (  - - )
  | o |
  '---'`,
    },
    {
      name: "Prof. Heinrich von Falschen III (almarhum, tapi masih menulis)",
      role: "Pendiri & Editor Abadi",
      dept: "Sejarah Masa Depan",
      quote: "Kematian tidak menghalangi saya dari tugas editorial.",
      ascii: `  .---.
 (  x x )
  | - |
  '---'`,
    },
    {
      name: "Dr. Agus Keliru, S.Kom, M.TI, Ph.D (self-proclaimed)",
      role: "Kepala Teknologi Informasi",
      dept: "Teknologi Imajiner dan Komputer Khayalan",
      quote: "Internet bekerja karena ada kurcaci kecil di dalam kabel.",
      ascii: `  .---.
 (  @ @ )
  | ~ |
  '---'`,
    },
    {
      name: "Prof. Dr. Maria van der Salah, M.Bio, Ph.D",
      role: "Kepala Riset Biologi",
      dept: "Biologi Imajiner dan Anatomi Kreatif",
      quote: "Jantung sebenarnya terletak di lutut kanan. Semua buku anatomi salah cetak.",
      ascii: `  .---.
 (  ^ ^ )
  | u |
  '---'`,
    },
    {
      name: "Prof. Drs. Hadi Ngawur, M.Geo, M.Ngaco, Ph.D (honoris causa dari diri sendiri)",
      role: "Kepala Departemen Geografi",
      dept: "Geografi Khayalan dan Peta Palsu",
      quote: "Australia tidak ada. Yang ada adalah proyeksi hologram kolektif.",
      ascii: `  .---.
 (  > < )
  | = |
  '---'`,
    },
  ];

  return (
    <div>
      <h2 style={{ fontSize: "18px", textAlign: "center" }}>
        * DEWAN REDAKSI WRONGPEDIA *
      </h2>
      <hr />
      <p style={{ fontSize: "13px", textAlign: "center", fontStyle: "italic" }}>
        &quot;Kualitas tanpa kompromi. Akurasi tanpa verifikasi.&quot;
      </p>
      <hr />

      {professors.map((prof, i) => (
        <div className="bbs-box" key={i}>
          <div className="bbs-box-header">ANGGOTA DEWAN #{i + 1}</div>
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <pre
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                lineHeight: "1.2",
                flexShrink: 0,
              }}
            >
              {prof.ascii}
            </pre>
            <div style={{ fontSize: "13px" }}>
              <p>
                <strong>{prof.name}</strong>
              </p>
              <p>{prof.role}</p>
              <p style={{ color: "#666" }}>Spesialisasi: {prof.dept}</p>
              <p style={{ marginTop: "8px", fontStyle: "italic" }}>
                &quot;{prof.quote}&quot;
              </p>
            </div>
          </div>
        </div>
      ))}

      <hr />
      <p style={{ fontSize: "11px", textAlign: "center", color: "#666" }}>
        Untuk melamar posisi di Dewan Redaksi, kirimkan CV kosong ke alamat yang
        tidak ada.
      </p>
    </div>
  );
}
