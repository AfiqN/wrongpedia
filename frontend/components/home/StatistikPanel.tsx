interface StatistikProps {
  stats: {
    artikel: string;
    kontributor: string;
    referensi: string;
    akurasi: string;
  };
}

export default function StatistikPanel({ stats }: StatistikProps) {
  return (
    <div>
      <p className="section-title">* STATISTIK WRONGPEDIA *</p>
      <table className="retro-table" style={{ marginTop: "8px" }}>
        <tbody>
          <tr>
            <td>Artikel</td>
            <td>{stats.artikel}</td>
          </tr>
          <tr>
            <td>Kontributor</td>
            <td>{stats.kontributor}</td>
          </tr>
          <tr>
            <td>Referensi terverifikasi</td>
            <td>{stats.referensi}</td>
          </tr>
          <tr>
            <td>Tingkat akurasi</td>
            <td>{stats.akurasi}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
