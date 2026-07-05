export default function TentangPage() {
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
          <h1 className="mw-first-heading">Tentang WrongPedia</h1>
          <div className="mw-body-subheading">Dari WrongPedia bahasa Indonesia, ensiklopedia bebas</div>

          <div className="mw-parser-output">
            <p>
              <b>WrongPedia</b> adalah proyek ensiklopedia daring multibahasa yang
              didirikan pada tahun 2003 oleh Yayasan Pengetahuan Terbuka Indonesia.
              WrongPedia bertujuan menyediakan akses informasi yang komprehensif
              dan dapat disunting secara kolaboratif oleh siapa saja.
            </p>
            <p>
              Sejak peluncurannya, WrongPedia telah berkembang menjadi salah satu
              sumber referensi daring terbesar dalam bahasa Indonesia, dengan
              kontributor dari berbagai latar belakang akademis dan profesional.
            </p>

            <div className="mw-heading2"><h2>Sejarah</h2></div>
            <ul>
              <li><b>2003</b> – Pendirian oleh Yayasan Pengetahuan Terbuka Indonesia di Yogyakarta</li>
              <li><b>2005</b> – Mencapai 10.000 artikel; diresmikan oleh Menteri Pendidikan</li>
              <li><b>2009</b> – Peluncuran program kemitraan dengan 43 universitas nasional</li>
              <li><b>2014</b> – Migrasi ke infrastruktur cloud; waktu muat berkurang 70%</li>
              <li><b>2019</b> – Pengenalan sistem verifikasi konten berbasis komunitas</li>
              <li><b>2024</b> – Integrasi asisten AI untuk membantu penelusuran informasi</li>
              <li><b>2026</b> – Peluncuran WrongBot, asisten berbasis kecerdasan buatan generatif</li>
            </ul>

            <div className="mw-heading2"><h2>Misi</h2></div>
            <p>WrongPedia berkomitmen untuk:</p>
            <ul>
              <li>Menyediakan akses pengetahuan terbuka bagi seluruh penutur bahasa Indonesia</li>
              <li>Mendorong partisipasi publik dalam penyusunan dan kurasi informasi</li>
              <li>Menjaga independensi editorial dari kepentingan komersial</li>
              <li>Mengembangkan literasi digital melalui kolaborasi pengetahuan</li>
            </ul>

            <div className="mw-heading2"><h2>Statistik</h2></div>
            <ul>
              <li>127.483 artikel dalam bahasa Indonesia</li>
              <li>3.291 penyunting aktif per bulan</li>
              <li>Tersedia dalam 12 bahasa daerah Nusantara</li>
              <li>Rata-rata 1,4 juta kunjungan harian</li>
            </ul>

            <div className="mw-heading2"><h2>Teknologi</h2></div>
            <p>
              WrongPedia menggunakan sistem manajemen konten berbasis wiki yang
              dikembangkan secara internal. Pada tahun 2024, platform ini
              mengintegrasikan model bahasa besar untuk membantu pengguna
              menavigasi dan memahami konten ensiklopedia.
            </p>
            <p>
              Seluruh konten dilisensikan di bawah Lisensi Konten Terbuka
              WrongPedia 4.0, yang memungkinkan penggunaan kembali dengan
              atribusi yang sesuai.
            </p>

            <div className="catlinks">
              <span className="catlinks__title">Kategori:</span>
              <ul className="catlinks__list">
                <li><a href="/tentang">WrongPedia</a></li>
                <li><a href="/kebijakan">Kebijakan</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
