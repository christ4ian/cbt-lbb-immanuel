/* ========================================================== */
/* DATABASE SOAL OSN-K IPA SMP 2026                           */
/* ========================================================== */

PAKET_SOAL.push({
    id: "osn-mar-ipa-smp-26",
    judul: "Try Out OSN-K IPA SMP 2026",
    mapel: "Ilmu Pengetahuan Alam",
    waktu: 90,
    waktu_buka: "2026-03-29 00:00:00",
    waktu_tutup: "2026-04-04 23:59:00",
    
    // Konfigurasi fitur poin
    sistem_poin: true,
    base_poin: 100,
    
    petunjuk: [
        "Bentuk soal OSN-K adalah pilihan jamak sebanyak 40 soal dengan empat opsi jawaban, nilai maksimum 160.",
        "Setiap jawaban yang benar diberikan nilai 4 (empat), jawaban yang salah atau tidak menjawab diberikan nilai 0 (nol).",
        "Penilaian menggunakan sistem aplikasi yang sudah dibuat oleh panitia pusat.",
        "Penentuan peringkat mengacu pada mekanisme yang sudah ditetapkan.",
        "Berita acara penilaian OSN ditandatangani oleh tim juri.",
        "Keputusan juri bersifat final dan tidak dapat diganggu gugat.",
        "Peserta yang lolos ke OSN-P adalah peserta dengan skor tertinggi yang menduduki peringkat 1 (satu) sampai 5 (lima) di setiap Kabupaten/Kota dengan 1 sekolah maksimum 2 peserta.",
        "Pemeringkatan didasarkan pada nilai total peserta.",
        "Jika pada tahap pemeringkatan masih terdapat nilai yang sama, maka penentuan pemenang didasarkan pada jumlah jawaban kosong paling sedikit.",
        "Jika masih terdapat nilai yang sama, maka penentuan pemenang didasarkan pada kelas terendah.",
        "Jika masih terdapat kesamaan, maka penentuan pemenang ditentukan berdasarkan umur termuda.",
        "Keputusan juri bersifat mutlak dan tidak dapat diganggu gugat."
    ],

    soal: [
        {
            id: 1,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Eksperimen Louis Pasteur menggunakan labu leher angsa bertujuan untuk menyempurnakan percobaan Lazzaro Spallanzani sekaligus membantah teori abiogenesis. Fungsi utama dari desain leher angsa pada labu tersebut adalah...",
            opsi: [
                "mencegah secara total masuknya udara luar yang membawa daya hidup (vis vitalis) sehingga air kaldu tetap steril",
                "mematikan seluruh mikroorganisme dan spora bakteri dari udara luar yang masuk ke dalam labu kaca",
                "memungkinkan sirkulasi udara tetap terjadi, tetapi menjebak partikel debu dan mikroorganisme pada bagian leher yang melengkung",
                "menghasilkan senyawa organik sederhana dari air kaldu yang bereaksi dengan uap air dan gas di udara pada suhu tinggi"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 2,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Di sebuah lahan pertanian, seorang petani mengamati bahwa tanaman budi daya tumbuh kerdil dan akhirnya mati ketika ditanam berdekatan dengan gulma alang-alang (Imperata cylindrica), meskipun ketersediaan air, cahaya matahari, dan pupuk di lahan tersebut sangat melimpah. Analisis laboratorium lebih lanjut menunjukkan adanya akumulasi senyawa fenolat di sekitar sistem perakaran alang-alang. Berdasarkan fenomena tersebut, bentuk interaksi yang paling tepat untuk mendeskripsikan peristiwa itu adalah...",
            opsi: [
                "kompetisi interspesifik, karena alang-alang dan tanaman budi daya secara agresif memperebutkan unsur hara makro dari dalam tanah",
                "amensalisme, karena alang-alang menyekresikan zat alelopati yang menghambat tanaman lain, sementara alang-alang tidak secara langsung diuntungkan atau dirugikan dari kematian tanaman tersebut",
                "parasitisme, karena alang-alang menggunakan senyawa fenolat sebagai media untuk menyerap nutrisi secara langsung dari jaringan akar tanaman budi daya",
                "antibiosis abiotik, karena alang-alang mengubah kondisi pH tanah secara drastis sehingga lingkungan menjadi tidak toleran bagi kelangsungan hidup tanaman budi daya"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 3,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Seorang siswa melakukan observasi keanekaragaman hayati dan mengelompokkan hasil pengamatannya ke dalam tiga kelompok sebagai berikut:<br>I. Allium cepa (bawang merah), Allium sativum (bawang putih), dan Allium fistulosum (daun bawang).<br>II. Padi (Oryza sativa) kultivar Ciherang, Rojolele, dan Mentik Wangi.<br>III. Zona intertidal, estuari, dan terumbu karang yang masing-masing memiliki profil salinitas serta biota dominan yang spesifik.<br>Berdasarkan data tersebut, urutan kelompok yang mewakili keanekaragaman hayati tingkat spesies, tingkat gen, dan tingkat ekosistem secara berurutan adalah ....",
            opsi: [
                "I, II, dan III",
                "II, I, dan III",
                "I, III, dan II",
                "II, III, dan I"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 4,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Seorang peneliti menemukan mikroorganisme uniseluler prokariotik yang hidup berkoloni di kawah gunung berapi dengan suhu mencapai 90 derajat Celsius dan tingkat keasaman (pH) yang sangat tinggi. Hasil analisis biokimia menunjukkan bahwa dinding sel organisme tersebut sama sekali tidak mengandung peptidoglikan, serta lipid membran plasmanya memiliki struktur ikatan eter. Berdasarkan karakteristik biokimiawi dan ekologisnya, organisme tersebut diklasifikasikan ke dalam kelompok...",
            opsi: [
                "Eubacteria termofilik, karena mikroorganisme ini mampu membentuk endospora untuk bertahan hidup pada suhu didih air dan kondisi lingkungan yang sangat asam",
                "Archaebacteria kelompok termoasidofil, karena ketiadaan peptidoglikan pada dinding sel dan adanya ikatan eter pada membrannya memberikan stabilitas termal yang tinggi",
                "Fungi tingkat rendah, karena memiliki dinding sel berupa zat kitin yang secara kimiawi sangat tahan terhadap denaturasi protein akibat paparan suhu ekstrem kawah",
                "Protista mirip hewan (Protozoa), karena dapat bergerak aktif mencari nutrisi di lingkungan kawah bersuhu tinggi tanpa mengalami lisis atau kerusakan sel"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 5,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Di suatu pulau terpencil, populasi burung pemakan biji awalnya memiliki variasi ukuran paruh, mulai dari paruh kecil yang tipis hingga paruh besar yang tebal. Setelah terjadi kemarau panjang selama beberapa tahun, tumbuhan yang menghasilkan biji berukuran kecil dan lunak mengalami kepunahan, sehingga hanya menyisakan tumbuhan dengan biji besar dan bercangkang keras. Beberapa generasi kemudian, mayoritas populasi burung di pulau tersebut memiliki karakteristik paruh yang besar dan tebal. Berdasarkan teori evolusi Charles Darwin, mekanisme utama yang menyebabkan perubahan struktur paruh pada populasi burung tersebut adalah...",
            opsi: [
                "mutasi genetik yang terjadi secara tiba-tiba akibat perubahan suhu lingkungan yang drastis selama musim kemarau",
                "adaptasi morfologi di mana setiap individu burung melatih dan memperkuat paruhnya secara terus-menerus untuk memecahkan biji yang keras",
                "migrasi kelompok burung berparuh kecil ke wilayah pulau lain secara besar-besaran untuk mencari sumber makanan yang lebih sesuai",
                "seleksi alam yang menguntungkan individu berparuh besar sehingga mereka lebih mampu bertahan hidup dan mewariskan sifatnya"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 6,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Sekelompok ilmuwan menemukan dua jenis katak yang memiliki warna kulit, bentuk tubuh, dan ukuran yang hampir identik di sebuah hutan hujan tropis. Namun, setelah dilakukan analisis lebih lanjut terhadap urutan DNA, struktur protein, dan perbandingan fosil, kedua jenis katak tersebut terbukti berasal dari garis keturunan nenek moyang yang berbeda dan akhirnya ditempatkan pada famili yang berlainan. Metode pengelompokan makhluk hidup yang sangat mempertimbangkan hubungan kekerabatan dan sejarah evolusi seperti pada kasus tersebut adalah metode klasifikasi...",
            opsi: [
                "filogenetik",
                "fenetik",
                "artifisial",
                "ekologis"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 7,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Seorang siswa mengamati sayatan melintang daun tumbuhan dikotil di bawah mikroskop. Ia melihat bahwa jaringan mesofil terbagi menjadi dua bagian. Lapisan atas (palisade) terdiri atas sel-sel yang tersusun rapat, sedangkan lapisan bawah (jaringan spons atau bunga karang) memiliki sel-sel dengan bentuk tidak beraturan dan menyisakan rongga antarsel yang sangat luas. Berdasarkan prinsip hubungan antara struktur dan fungsi, peran utama dari rongga antarsel yang luas pada jaringan spons tersebut adalah...",
            opsi: [
                "menyimpan cadangan air dan hasil fotosintesis berupa amilum secara permanen sebelum diedarkan ke seluruh tubuh tumbuhan",
                "menyerap dan mendistribusikan energi cahaya matahari yang lolos dari jaringan palisade agar fotosintesis tetap berlangsung",
                "memfasilitasi sirkulasi dan pertukaran gas karbon dioksida serta oksigen secara optimal di bagian dalam daun",
                "memberikan dukungan mekanik ekstra dan fleksibilitas pada helai daun agar tidak mudah patah saat tertiup angin"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 8,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Pada suatu kegiatan observasi lapangan, sekelompok siswa mencatat beberapa bentuk interaksi antarspesies di dalam ekosistem seperti yang disajikan pada tabel berikut:<br><br><table border='1' cellpadding='5' cellspacing='0' style='width:100%; border-collapse: collapse;'><tr><th style='text-align:center;'>Nomor</th><th>Interaksi yang Diamati</th></tr><tr><td style='text-align:center;'>1</td><td>Bakteri Rhizobium sp. yang hidup pada bintil akar tanaman kacang-kacangan.</td></tr><tr><td style='text-align:center;'>2</td><td>Tumbuhan anggrek epifit yang menempel pada dahan pohon mahoni yang tinggi.</td></tr><tr><td style='text-align:center;'>3</td><td>Tanaman tali putri (Cuscuta sp.) yang membelit ruas batang tanaman beluntas.</td></tr><tr><td style='text-align:center;'>4</td><td>Bakteri Escherichia coli yang hidup secara alami di dalam kolon (usus besar) manusia.</td></tr><tr><td style='text-align:center;'>5</td><td>Ikan remora yang berenang menempel pada bagian bawah tubuh ikan hiu di lautan.</td></tr></table><br>Berdasarkan data pada tabel tersebut, pasangan interaksi yang menunjukkan bentuk simbiosis komensalisme adalah...",
            opsi: [
                "1 dan 4",
                "2 dan 3",
                "2 dan 5",
                "3 dan 5"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 9,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Seorang siswa melakukan pengamatan terhadap empat jenis hewan avertebrata tanah yang ditemukan di kebun sekolah. Hasil identifikasi karakteristik morfologi tubuh hewan-hewan tersebut dicatat dalam tabel berikut:<br><br><table border='1' cellpadding='5' cellspacing='0' style='width:100%; border-collapse: collapse;'><tr><th style='text-align:center;'>Hewan</th><th style='text-align:center;'>Pembagian Tubuh</th><th style='text-align:center;'>Jumlah Kaki</th><th>Ciri Khusus Tambahan</th></tr><tr><td style='text-align:center;'>I</td><td>3 bagian (kepala, dada, perut)</td><td>3 pasang (6 buah)</td><td>Memiliki sepasang antena</td></tr><tr><td style='text-align:center;'>II</td><td>2 bagian (sefalotoraks dan abdomen)</td><td>4 pasang (8 buah)</td><td>Memiliki kelisera dan pedipalpus</td></tr><tr><td style='text-align:center;'>III</td><td>2 bagian (sefalotoraks dan abdomen)</td><td>4 pasang (8 buah)</td><td>Memiliki alat penyengat di ujung abdomen</td></tr><tr><td style='text-align:center;'>IV</td><td>Banyak segmen</td><td>1 pasang per segmen</td><td>Memiliki antena dan taring beracun</td></tr></table><br>Diketahui bahwa karakteristik utama dari kelas Arachnida (kelompok laba-laba dan kalajengking) adalah tubuh terbagi menjadi dua bagian utama (sefalotoraks dan abdomen), memiliki empat pasang kaki pada bagian sefalotoraks, dan tidak memiliki antena. Berdasarkan data pengamatan tersebut, hewan manakah yang secara spesifik diklasifikasikan ke dalam kelas Arachnida?",
            opsi: [
                "I saja",
                "II dan III",
                "II, III, dan IV",
                "I dan IV"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 10,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Sebuah lahan pertanian jagung yang berada di area perbukitan mengalami penurunan hasil panen secara drastis. Tim penyuluh pertanian melakukan observasi dan mencatat kondisi lahan tersebut ke dalam tabel berikut:<br><br><table border='1' cellpadding='5' cellspacing='0' style='width:100%; border-collapse: collapse;'><tr><th>Parameter Observasi</th><th>Keterangan Kondisi Lahan</th></tr><tr><td>Kemiringan lereng</td><td>15° - 20° (sedang hingga agak curam)</td></tr><tr><td>Sistem pengolahan tanah</td><td>Membajak searah dengan kemiringan lereng (dari atas lurus ke bawah)</td></tr><tr><td>Kondisi topsoil (tanah atas)</td><td>Sangat tipis, tercuci oleh air limpasan, dan lapisan batuan bawah mulai terlihat</td></tr><tr><td>Pola tanam</td><td>Monokultur jagung secara terus-menerus tanpa jeda</td></tr></table><br>Berdasarkan data observasi tersebut, kombinasi tindakan konservasi tanah secara mekanis dan vegetatif yang paling tepat untuk memulihkan lahan dan mencegah erosi lanjutan adalah...",
            opsi: [
                "mengubah arah bajakan tanah menjadi sejajar dengan garis kontur bukit dan menerapkan sistem penanaman berjalur (strip cropping)",
                "membuat dinding penahan erosi permanen dari semen dan menutupi seluruh permukaan lahan pertanian dengan mulsa plastik sintetik",
                "memperdalam alur bajakan dari atas ke bawah lereng agar air limpasan cepat mengalir dan menambahkan pupuk kimia berdosis tinggi",
                "meratakan kemiringan lereng menggunakan alat berat dan membiarkan lahan dalam keadaan bera (kosong tanpa tanaman) selama musim hujan"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 11,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan beberapa fenomena adaptasi makhluk hidup terhadap kondisi lingkungannya berikut ini:<br>1. Orang yang menetap di dataran tinggi pegunungan memproduksi sel darah merah (eritrosit) dalam jumlah yang jauh lebih banyak dibandingkan orang di dataran rendah.<br>2. Mamalia laut seperti paus dan lumba-lumba secara periodik akan muncul ke permukaan laut untuk membuang sisa pernapasan dan menghirup oksigen.<br>3. Tumbuhan kantong semar (Nepenthes sp.) memiliki ujung helaian daun yang bermodifikasi menjadi bentuk piala berisi cairan untuk menjebak serangga.<br>4. Hewan kaki seribu (keluweng) secara refleks akan menggulung tubuhnya membentuk spiral yang keras apabila disentuh atau merasa terancam oleh predator.<br><br>Berdasarkan pernyataan tersebut, klasifikasi tipe adaptasi yang paling tepat adalah...",
            opsi: [
                "1 dan 3 merupakan adaptasi fisiologi, 2 merupakan adaptasi tingkah laku, dan 4 merupakan adaptasi morfologi",
                "1 dan 2 merupakan adaptasi fisiologi, sedangkan 3 dan 4 merupakan adaptasi morfologi",
                "1 merupakan adaptasi tingkah laku, 3 merupakan adaptasi morfologi, serta 2 dan 4 merupakan adaptasi fisiologi",
                "1 merupakan adaptasi fisiologi, 3 merupakan adaptasi morfologi, serta 2 dan 4 merupakan adaptasi tingkah laku"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 12,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Keanekaragaman bentuk mulut pada kelas Insecta (serangga) merupakan contoh klasik dari adaptasi morfologi. Berikut adalah data hasil observasi struktur alat mulut, fungsi utama, dan sumber makanan dari empat jenis serangga:<br><br><table border='1' cellpadding='5' cellspacing='0' style='width:100%; border-collapse: collapse;'><tr><th>Serangga</th><th>Struktur Modifikasi Mulut</th><th>Fungsi Spesifik</th><th>Sumber Makanan</th></tr><tr><td>Kupu-kupu</td><td>Maksila memanjang dan menyatu membentuk tabung panjang (probosis) yang dapat digulung</td><td>Menjangkau dan menghisap cairan dari celah yang sempit dan dalam</td><td>Nektar di dasar mahkota bunga</td></tr><tr><td>Nyamuk betina</td><td>Mandibula dan maksila termodifikasi menjadi struktur tajam menyerupai jarum (stilet)</td><td>Menembus jaringan kulit luar dan menghisap cairan di dalamnya</td><td>Darah inang (vertebrata)</td></tr><tr><td>Belalang</td><td>Mandibula berukuran besar, kuat, serta memiliki tepi bagian dalam yang bergigi tajam</td><td>Memotong, merobek, dan mengunyah materi organik yang padat</td><td>Dedaunan dan batang muda tumbuhan</td></tr><tr><td>Lalat rumah</td><td>Ujung labium membesar menyerupai struktur bantalan spons (labelum)</td><td>Menyerap makanan berbentuk cairan atau padatan yang telah dicairkan oleh air liur</td><td>Permukaan bahan organik yang membusuk</td></tr></table><br>Berdasarkan data observasi tersebut, pernyataan yang paling tepat mengenai hubungan antara modifikasi struktur mulut serangga dengan proses adaptasinya adalah...",
            opsi: [
                "mandibula yang besar dan bergigi pada belalang merupakan adaptasi morfologi yang secara khusus berfungsi untuk memotong dan mengunyah material struktural tumbuhan yang keras",
                "probosis pada kupu-kupu berfungsi ganda sebagai alat untuk menghisap cairan nektar sekaligus menembus jaringan kulit buah yang tebal di habitatnya",
                "struktur stilet pada nyamuk betina secara eksklusif beradaptasi untuk menyapu dan mengumpulkan serbuk sari pada bunga yang bermahkota dangkal",
                "labelum berbentuk spons pada lalat rumah merupakan adaptasi mekanik untuk memotong dan mengoyak makanan yang membusuk sebelum dihisap masuk ke dalam pencernaan"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 13,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Sebuah penelitian dilakukan untuk memantau volume limbah plastik yang terkumpul di sebuah muara sungai selama 5 tahun berturut-turut. Data hasil pengamatan disajikan dalam tabel berikut:<br><br><table border='1' cellpadding='5' cellspacing='0' style='width:100%; border-collapse: collapse;'><tr><th>Tahun</th><th style='text-align:center;'>2021</th><th style='text-align:center;'>2022</th><th style='text-align:center;'>2023</th><th style='text-align:center;'>2024</th><th style='text-align:center;'>2025</th></tr><tr><td>Volume Limbah (ton)</td><td style='text-align:center;'>200</td><td style='text-align:center;'>213</td><td style='text-align:center;'>227</td><td style='text-align:center;'>242</td><td style='text-align:center;'>258</td></tr></table><br>Berdasarkan data di atas, rata-rata persentase peningkatan volume limbah plastik per tahun selama periode 2021-2025 adalah...",
            opsi: [
                "4,5%",
                "5,0%",
                "6,5%",
                "7,2%"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 14,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Seorang peneliti biologi sel mengamati beberapa organel yang diekstraksi dari sel hati (hepar) tikus. Hasil analisis karakteristik struktur dan fungsi biokimiawi dari empat jenis organel tak dikenal disajikan dalam tabel berikut:<br><br><table border='1' cellpadding='5' cellspacing='0' style='width:100%; border-collapse: collapse;'><tr><th style='text-align:center;'>Organel</th><th>Karakteristik Struktur</th><th>Fungsi Spesifik</th></tr><tr><td style='text-align:center;'>I</td><td>Memiliki membran ganda yang melipat ke dalam membentuk krista, serta memiliki DNA sirkuler secara mandiri.</td><td>Tempat berlangsungnya fosforilasi oksidatif untuk menghasilkan energi utama sel (ATP).</td></tr><tr><td style='text-align:center;'>II</td><td>Berupa jaringan tubulus bermembran yang saling bersambungan dan permukaannya tidak ditempeli oleh ribosom.</td><td>Berperan utama dalam sintesis lipid (lemak) dan proses detoksifikasi racun atau obat.</td></tr><tr><td style='text-align:center;'>III</td><td>Berupa kantong bermembran tunggal dengan kondisi pH internal yang sangat asam (pH ≈ 5).</td><td>Mengandung enzim hidrolitik untuk pencernaan intraseluler dan daur ulang organel rusak (autofagi).</td></tr><tr><td style='text-align:center;'>IV</td><td>Tumpukan kantong pipih bermembran (sisterna) yang membentuk formasi cembung dan cekung (sisi cis dan trans).</td><td>Tempat modifikasi akhir protein, pengemasan, dan pembentukan vesikel sekretori.</td></tr></table><br>Berdasarkan data hasil analisis tersebut, identifikasi organel I, II, III, dan IV secara berurutan yang paling tepat adalah...",
            opsi: [
                "I = Kloroplas, II = Retikulum Endoplasma Kasar, III = Lisosom, IV = Badan Golgi",
                "I = Mitokondria, II = Retikulum Endoplasma Halus, III = Lisosom, IV = Badan Golgi",
                "I = Mitokondria, II = Retikulum Endoplasma Halus, III = Peroksisom, IV = Retikulum Endoplasma Kasar",
                "I = Kloroplas, II = Retikulum Endoplasma Halus, III = Vakuola sentral, IV = Badan Golgi"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 15,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Lingkungan perairan memberikan tantangan osmotik yang sangat berbeda bagi ikan teleostei (ikan bertulang sejati). Ikan air tawar hidup di lingkungan yang hipotonik, sementara ikan air laut hidup di lingkungan yang hipertonik terhadap cairan sel tubuhnya. Untuk mencegah terjadinya kerusakan sel (lisis atau dehidrasi) akibat tekanan osmosis, kedua kelompok ikan tersebut melakukan mekanisme adaptasi fisiologi yang saling berkebalikan. Pernyataan yang paling tepat mengenai perbedaan mekanisme osmoregulasi kedua jenis ikan tersebut adalah...",
            opsi: [
                "ikan air tawar banyak minum air untuk mengganti cairan yang hilang, sedangkan ikan air laut sedikit minum air agar sel tubuhnya tidak mengalami plasmolisis",
                "ikan air tawar sangat sedikit minum air dan mengekskresikan banyak urine yang encer, sedangkan ikan air laut banyak minum air dan mengekskresikan sedikit urine yang pekat",
                "insang ikan air tawar secara aktif membuang kelebihan ion garam ke lingkungan, sedangkan insang ikan air laut secara aktif menyerap ion garam terlarut dari perairan",
                "ginjal ikan air tawar memiliki laju filtrasi yang sangat lambat untuk menghemat air, sedangkan ginjal ikan air laut memfiltrasi darah dengan cepat untuk membuang kelebihan air"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 16,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Pada sistem pencernaan hewan ruminansia (memamah biak) seperti sapi, makanan yang masuk ke lambung akan diproses secara bertahap. Bagian lambung yang berfungsi untuk membentuk makanan menjadi gumpalan-gumpalan kasar (bolus) agar dapat dikembalikan lagi ke rongga mulut untuk dikunyah kedua kalinya adalah...",
            opsi: [
                "retikulum",
                "rumen",
                "omasum",
                "abomasum"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 17,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Seorang pasien perempuan diperiksakan ke rumah sakit karena mengalami gangguan pertumbuhan. Dokter menemukan beberapa ciri fisik di antaranya: postur tubuh yang pendek, bentuk leher yang melebar atau berselaput (webbed neck), dada bidang, dan tidak mengalami perkembangan ciri seksual sekunder pada masa pubertas. Setelah dilakukan uji kariotipe, diketahui bahwa sel tubuhnya hanya memiliki 45 kromosom (kehilangan satu kromosom seks X). Kelainan genetik yang dialami oleh pasien tersebut dikenal dengan nama...",
            opsi: [
                "Klinefelter syndrome",
                "Down syndrome",
                "Turner syndrome",
                "Edward syndrome"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 18,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Keuntungan utama yang diperoleh dari penggunaan varietas tanaman transgenik (seperti kapas Bt atau jagung Bt) dalam bidang pertanian adalah...",
            opsi: [
                "meningkatkan keanekaragaman hayati lingkungan sekitar",
                "memperpanjang masa simpan hasil panen di gudang",
                "mengurangi kebutuhan volume air untuk irigasi",
                "mengurangi penggunaan pestisida kimia buatan"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 19,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Jika seorang ayah memiliki golongan darah A dan ibu memiliki golongan darah B, maka kemungkinan golongan darah yang dapat dimiliki oleh anak-anak mereka adalah...",
            opsi: [
                "A atau B saja",
                "AB atau O saja",
                "A, B, atau AB",
                "A, B, AB, atau O"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 20,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Suatu sifat warna bunga pada tanaman ditentukan oleh alel M untuk warna merah yang bersifat dominan penuh terhadap alel m untuk warna putih. Jika tanaman bergenotipe heterozigot (Mm) yang berwarna merah disilangkan dengan sesamanya (Mm), maka persentase perbandingan fenotipe pada keturunannya adalah ....",
            opsi: [
                "25% merah : 50% merah muda : 25% putih",
                "50% merah : 50% putih",
                "75% merah : 25% putih",
                "100% merah muda"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 21,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Pada sebuah piringan tipis logam dengan jari-jari awal 20 cm terdapat sebuah lubang kecil dengan luas penampang 0,16 $cm^{2}$. Piringan logam tersebut kemudian dipanaskan sehingga memuai dan luas penampang lubang membesar menjadi $0,402^{2}$ $cm^{2}$. Jari-jari piringan logam setelah dipanaskan menjadi...",
            opsi: [
                "20,01 cm",
                "20,10 cm",
                "20,20 cm",
                "20,40 cm"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 22,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Pada tekanan udara 1 atm, sebanyak 500 gram es bersuhu $0^{\\circ}C$ dimasukkan ke dalam sebuah wadah terisolasi yang berisi 500 gram air bersuhu $80^{\\circ}C$. Diketahui kalor jenis air adalah $1~kal/g^{\\circ}C$ dan kalor lebur es adalah $80~kal/g$. Setelah beberapa waktu dan sistem mencapai kesetimbangan termal, didapatkan keadaan akhir dalam wadah itu berupa ....",
            opsi: [
                "1000 gram air",
                "750 gram air dan 250 gram es",
                "500 gram air dan 500 gram es",
                "250 gram air dan 750 gram es"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 23,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Suhu tubuh normal seseorang dalam keadaan sehat adalah $37^{\\circ}C$. Ketika sedang sakit demam, suhu tubuhnya mengalami kenaikan sebesar 2,4 °R. Suhu tubuh orang yang sedang demam tersebut jika diukur menggunakan termometer berskala Fahrenheit menunjukkan angka...",
            opsi: [
                "$98,6^{\\circ}F$",
                "$100,4^{\\circ}F$",
                "$102,2^{\\circ}F$",
                "$104,0^{\\circ}F$"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 24,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Seorang pramusaji berjalan lurus sejauh 5 meter melintasi ruang makan sambil menahan sebuah nampan berisi makanan dengan satu tangannya. Pramusaji tersebut berjalan pada lantai mendatar dengan kecepatan konstan. Berdasarkan konsep fisika, pernyataan yang paling tepat mengenai usaha yang dilakukan oleh gaya angkat tangan pramusaji terhadap nampan tersebut adalah...",
            opsi: [
                "bernilai nol karena arah gaya angkat tegak lurus terhadap arah perpindahan nampan",
                "bernilai maksimum karena pramusaji harus menahan gaya gravitasi agar nampan tidak jatuh",
                "bernilai positif dan besarnya sebanding dengan berat nampan dikalikan jarak tempuhnya",
                "bernilai negatif karena tangan pramusaji harus terus mengerem laju nampan agar stabil"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 25,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Sebuah balok kayu didorong ke atas dari dasar sebuah bidang miring licin (tanpa gesekan) yang memiliki sudut kemiringan $30^{\\circ}$ terhadap arah horizontal. Balok tersebut meluncur naik sejauh 2,5 meter di sepanjang bidang miring sebelum akhirnya berhenti sejenak dan mulai meluncur turun. Jika percepatan gravitasi bumi di tempat tersebut diasumsikan $10~m/s^{2}$, maka kecepatan awal yang diberikan pada balok tersebut saat di dasar bidang miring adalah...",
            opsi: [
                "$2~m/s$",
                "$4~m/s$",
                "$5~m/s$",
                "$10~m/s$"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 26,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Sebuah manometer pipa U terbuka diisi dengan cairan bermassa jenis $1000~kg/m^{3}$. Salah satu ujung pipa dihubungkan ke sebuah tangki gas, sedangkan ujung lainnya dibiarkan terbuka ke atmosfer. Jika didapati permukaan cairan pada kaki yang terhubung dengan tangki gas berada 5 cm lebih rendah dibandingkan permukaan cairan pada kaki yang terbuka, maka tekanan ukur (gauge pressure) dari gas di dalam tangki tersebut adalah (Anggap percepatan gravitasi $g=10~m/s^{2})$",
            opsi: [
                "250 Pa",
                "500 Pa",
                "750 Pa",
                "1000 Pa"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 27,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Sebuah drone pengantar paket sedang bergerak naik secara vertikal dengan kecepatan konstan $5~m/s$. Ketika drone tersebut berada pada ketinggian 10 m dari atas tanah, sebuah kotak paket yang dibawanya tiba-tiba terlepas. Jika gesekan udara diabaikan dan percepatan gravitasi bumi dianggap $g=10~m/s^{2}$, paket tersebut akan menyentuh tanah setelah .... detik sejak terlepas.",
            opsi: [
                "1,5",
                "2,0",
                "2,5",
                "3,0"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 28,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Spektrum cahaya tampak terdiri dari berbagai warna yang membentang dari merah hingga ungu. Berdasarkan karakteristik gelombang elektromagnetik, pernyataan yang paling tepat mengenai spektrum cahaya tampak tersebut adalah...",
            opsi: [
                "cahaya ungu memiliki frekuensi tertinggi dan energi foton terbesar dibandingkan warna cahaya tampak lainnya",
                "cahaya merah memiliki panjang gelombang terpendek sehingga merambat paling cepat saat melewati medium kaca",
                "semua spektrum warna cahaya memiliki panjang gelombang dan frekuensi yang identik saat berada di ruang hampa",
                "cahaya hijau memiliki energi foton yang jauh lebih rendah daripada cahaya kuning dan jingga"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 29,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Seorang siswa mengalami kesulitan melihat tulisan di papan tulis dari tempat duduknya yang berada di barisan belakang. Setelah diperiksa oleh dokter mata, diketahui bahwa jarak pandang terjauh yang dapat dilihatnya dengan tajam (titik jauh) hanyalah 40 cm. Agar siswa tersebut dapat melihat benda-benda di kejauhan dengan normal, ia harus menggunakan kacamata dengan kekuatan lensa sebesar...",
            opsi: [
                "+2,5 dioptri",
                "+4,0 dioptri",
                "-4,0 dioptri",
                "-2,5 dioptri"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 30,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Sebuah benda diletakkan 15 cm di depan sebuah lensa konvergen yang memiliki jarak fokus 10 cm. Sebuah cermin konvergen dengan jarak fokus 20 cm diletakkan sejauh 40 cm di belakang lensa tersebut. Posisi bayangan akhir yang dibentuk oleh pantulan cermin tersebut berada pada ....",
            opsi: [
                "10 cm di depan cermin",
                "20 cm di depan cermin",
                "20 cm di belakang cermin",
                "30 cm di belakang lensa"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 31,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Persamaan simpangan sebuah benda yang melakukan getaran harmonis sederhana dinyatakan dengan fungsi $y=5~sin(40\\pi t)$, dengan y dalam satuan cm dan t dalam satuan sekon. Berdasarkan persamaan tersebut, besarnya amplitudo dan frekuensi getaran benda berturut-turut adalah...",
            opsi: [
                "5 m dan 40 Hz",
                "0,05 m dan 20 Hz",
                "5 m dan 20 Hz",
                "0,05 m dan $40\\pi$ Hz"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 32,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Sebuah ayunan bandul matematis disimpangkan dengan sudut yang kecil sehingga bergetar harmonis dengan amplitudo 4 cm. Jika bandul tersebut berayun dengan periode sebesar 2 sekon dan percepatan gravitasi bumi di tempat itu adalah $g=10~m/s^{2}$, maka panjang tali pengikat bandul tersebut adalah...",
            opsi: [
                "$\\frac{5}{\\pi^{2}}$ m",
                "$\\frac{10}{\\pi^{2}}$ m",
                "$\\frac{20}{\\pi^{2}}$ m",
                "$\\frac{40}{\\pi^{2}}$ m"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 33,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Sebuah gelombang mekanik merambat di sepanjang seutas tali dengan kecepatan $20~m/s$. Jika jarak antara dua puncak gelombang yang berdekatan adalah 4 m, maka periode gelombang tali tersebut adalah ....",
            opsi: [
                "5,0 s",
                "0,8 s",
                "0,2 s",
                "0,05 s"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 34,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Sebuah tali sepanjang 6 meter digetarkan pada salah satu ujungnya, sementara ujung lainnya diikat kuat. Getaran tersebut menghasilkan pola gelombang stasioner yang terdiri dari 3 bukit dan 3 lembah dalam waktu 1,5 sekon. Frekuensi getaran dan kecepatan rambat gelombang pada tali tersebut berturut-turut adalah...",
            opsi: [
                "$f=2$ Hz dan $v=4~m/s$",
                "$f=2$ Hz dan $v=12~m/s$",
                "$f=4$ Hz dan $v=2~m/s$",
                "$f=4$ Hz dan $v=8~m/s$"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 35,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Dua buah partikel bermuatan listrik sejenis mula-mula terpisah pada jarak 6 cm dan mengalami gaya tolak-menolak sebesar F. Jika jarak antara kedua muatan tersebut diubah letaknya menjadi 3 cm, maka besarnya gaya tolak-menolak sekarang adalah...",
            opsi: [
                "$1/4F$",
                "$1/2F$",
                "4F",
                "16F"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 36,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Dua buah muatan listrik masing-masing $Q_{1}=-2\\mu C$ dan $Q_{2}=+8\\mu C$ diletakkan terpisah pada jarak 10 cm. Jika muatan $Q_{1}$ berada di sebelah kiri muatan $Q_{2}$, maka letak titik yang memiliki kuat medan listrik sama dengan nol berada pada posisi...",
            opsi: [
                "5 cm di sebelah kiri $Q_{1}$",
                "10 cm di sebelah kiri $Q_{1}$",
                "10 cm di antara $Q_{1}$ dan $Q_{2}$",
                "20 cm di sebelah kanan $Q_{2}$"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 37,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Suatu alat pemanas listrik dihubungkan pada sumber tegangan 200 volt dan mengalirkan arus listrik sebesar 10 ampere. Jika pemanas tersebut dihidupkan secara terus-menerus selama 5 jam, perhatikan pernyataan-pernyataan berikut:<br>1. Hambatan listrik pada kawat pemanas tersebut adalah 20 $\\Omega$.<br>2. Daya listrik pemanas tersebut sebesar 2 kW.<br>3. Jika tarif dasar listrik adalah Rp 2.000,00/kWh, biaya energi yang diperlukan selama waktu tersebut adalah Rp 20.000,00.<br><br>Pernyataan yang benar ditunjukkan oleh nomor...",
            opsi: [
                "1 dan 2",
                "1 dan 3",
                "2 dan 3",
                "1, 2, dan 3"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 38,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan deskripsi topologi rangkaian listrik berikut!<br>Arus listrik mengalir dari titik A menuju titik B. Dari titik A, arus pertama-tama melewati hambatan $R_{1}=4~\\Omega$. Setelah itu, jalur kabel bercabang menjadi dua (paralel). Jalur atas terdiri dari dua hambatan yang dirangkai seri, yaitu $R_{2}=6~\\Omega$ dan $R_{3}=6~\\Omega$. Sementara itu, jalur bawah hanya memiliki satu hambatan, yaitu $R_{4}=6~\\Omega$. Kedua jalur percabangan tersebut kemudian bersatu kembali dan terhubung secara seri dengan hambatan terakhir, yaitu $R_{5}=7~\\Omega$ yang berujung di titik B.<br><br>Besarnya hambatan pengganti antara titik A dan titik B adalah...",
            opsi: [
                "8 $\\Omega$",
                "10 $\\Omega$",
                "12 $\\Omega$",
                "15 $\\Omega$"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 39,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Sebuah kumparan dihubungkan dengan galvanometer untuk mengukur GGL induksi. Saat fluks magnetik yang menembus kumparan tersebut berubah dari 0,2 Wb menjadi 0,8 Wb dalam selang waktu 0,5 sekon, timbul GGL induksi pada ujung-ujung kumparan sebesar 600 volt. Banyaknya lilitan pada kumparan tersebut adalah...",
            opsi: [
                "500 lilitan",
                "600 lilitan",
                "800 lilitan",
                "1000 lilitan"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 40,
            tipe: 'pg',
            poin: 4,
            stimulus: { tampil: false },
            pertanyaan: "Atmosfer bumi terdiri dari beberapa lapisan yang memiliki karakteristik dan fungsi spesifik. Dua fungsi krusial dari atmosfer adalah menyerap paparan sinar ultraviolet (UV) matahari yang berbahaya bagi makhluk hidup, serta membakar habis benda-benda luar angkasa (seperti meteor) sebelum mencapai permukaan bumi. Kedua proses tersebut berturut-turut terjadi pada lapisan...",
            opsi: [
                "Troposfer dan Stratosfer",
                "Mesosfer dan Termosfer",
                "Stratosfer dan Mesosfer",
                "Termosfer dan Eksosfer"
            ],
            kunci: 'C',
            ragu: false
        }
    ]
});
