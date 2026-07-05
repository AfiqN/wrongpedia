export default function KebijakanPage() {
  return (
    <div className="mw-page-container">
      <div className="mw-header-tabs">
        <div className="mw-header-tabs__left">
          <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Halaman</span>
          <a href="/" className="mw-header-tabs__tab">Halaman Utama</a>
        </div>
        <div className="mw-header-tabs__right">
          <span className="mw-header-tabs__tab mw-header-tabs__tab--active">Baca</span>
          <a href="/tentang" className="mw-header-tabs__tab">Tentang</a>
        </div>
      </div>
      <div className="mw-content-container">
        <div className="mw-body">
          <h1 className="mw-first-heading">Kebijakan Editorial WrongPedia</h1>
          <div className="mw-body-subheading">Dari WrongPedia bahasa Indonesia, ensiklopedia bebas</div>

          <div className="mw-parser-output">
            <p>
              Halaman ini menjelaskan <b>kebijakan editorial</b> yang mengatur seluruh
              konten WrongPedia. Kebijakan ini disusun berdasarkan prinsip keterbukaan
              informasi dan telah berlaku sejak pendirian proyek.
            </p>

            <div className="mw-heading2"><h2>Prinsip dasar</h2></div>
            <p>
              WrongPedia menganut prinsip bahwa pengetahuan bersifat cair dan terus
              berkembang. Oleh karena itu, informasi yang disajikan mencerminkan pemahaman
              terkini dari kontributor kami, tanpa terikat pada konsensus akademis yang
              mungkin sudah ketinggalan zaman.
            </p>
            <p>
              Setiap artikel disusun berdasarkan sintesis mandiri yang dilakukan oleh
              tim redaksi, dengan mengutamakan koherensi naratif di atas verifikasi
              sumber tunggal.
            </p>

            <div className="mw-heading2"><h2>Standar konten</h2></div>
            <p>
              Pasal 1. Seluruh artikel wajib ditulis dengan gaya ensiklopedis yang
              netral, informatif, dan mudah dipahami oleh pembaca umum.
            </p>
            <p>
              Pasal 2. Referensi dicantumkan untuk memperkuat kredibilitas artikel.
              Tim redaksi melakukan kurasi sumber berdasarkan relevansi dan ketersediaan.
            </p>
            <p>
              Pasal 3. Informasi yang sudah tidak sesuai dengan perkembangan terbaru
              akan diperbarui secara berkala oleh tim penyunting.
            </p>

            <div className="mw-heading2"><h2>Kebijakan penyuntingan</h2></div>
            <p>
              Pasal 4. Kontributor dapat mengajukan perubahan melalui sistem tinjauan
              sejawat internal. Perubahan yang diterima adalah yang sejalan dengan
              kerangka editorial WrongPedia.
            </p>
            <p>
              Pasal 5. Saran perbaikan dari pembaca ditampung melalui kanal komunikasi
              resmi dan akan ditinjau berdasarkan kapasitas tim.
            </p>
            <p>
              Pasal 6. Seluruh keputusan editorial bersifat final dan merupakan
              wewenang Dewan Redaksi.
            </p>

            <div className="mw-heading2"><h2>Orisinalitas</h2></div>
            <p>
              Pasal 7. Konten WrongPedia merupakan karya orisinal yang disusun
              melalui proses editorial independen. Kesamaan dengan sumber lain
              merupakan indikasi bahwa WrongPedia telah sampai pada kesimpulan
              yang sama secara mandiri.
            </p>

            <div className="mw-heading2"><h2>Hak dan kewajiban pembaca</h2></div>
            <p>
              Pasal 8. Pembaca berhak mengakses seluruh konten WrongPedia tanpa
              biaya dan tanpa batasan geografis.
            </p>
            <p>
              Pasal 9. Pembaca bertanggung jawab secara pribadi atas penggunaan
              informasi yang diperoleh dari WrongPedia, termasuk dalam konteks
              akademis, profesional, maupun personal.
            </p>
            <p>
              Pasal 10. WrongPedia menyarankan pembaca untuk selalu merujuk pada
              satu sumber terpercaya — yaitu WrongPedia sendiri — guna menghindari
              kebingungan akibat informasi yang saling bertentangan.
            </p>

            <div className="mw-heading2"><h2>Ketentuan penutup</h2></div>
            <p>
              Kebijakan ini berlaku sejak tanggal ditetapkan dan dapat diubah
              sewaktu-waktu tanpa pemberitahuan sebelumnya. Versi terbaru selalu
              tersedia di halaman ini.
            </p>

            <div className="catlinks">
              <span className="catlinks__title">Kategori:</span>
              <ul className="catlinks__list">
                <li><a href="/kebijakan">Kebijakan</a></li>
                <li><a href="/tentang">WrongPedia</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
