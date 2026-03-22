/* ========================================================== */
/* DATABASE SOAL OSN-K IPA SD 2026                            */
/* ========================================================== */

PAKET_SOAL.push({
    id: "osn-mar-ipa-sd-26",
    judul: "Try Out OSN-K IPA SD 2026",
    mapel: "Ilmu Pengetahuan Alam",
    waktu: 60,
    
    // Konfigurasi fitur poin
    sistem_poin: true,
    base_poin: 100,
    
    petunjuk: [
        "Penilaian soal pilihan jamak menggunakan aturan sebagai berikut:<br><span style='margin-left: 15px; display: inline-block;'>i. Jika jawaban benar = poin + 1</span><br><span style='margin-left: 15px; display: inline-block;'>ii. Jika jawaban salah atau tidak menjawab = poin 0</span>",
        "Nilai dari hasil pengerjaan OSN-K akan diolah menggunakan metode pembobotan per butir soal berdasarkan tingkat kesulitan soal.",
        "Skema pengolahan nilai akhir peserta IPA Data jawaban soal pilihan jamak setiap peserta dihitung berdasarkan jumlah jawaban benar dikalikan bobot soal. Bobot tingkat kesulitan soal adalah sebagai berikut:<br><table><tr><th style='text-align:center;'>No.</th><th>Jenis Soal</th><th style='text-align:center;'>Jumlah</th><th style='text-align:center;'>Bobot</th></tr><tr><td style='text-align:center;'>1.</td><td>Mudah</td><td style='text-align:center;'>10 soal</td><td style='text-align:center;'>1,00</td></tr><tr><td style='text-align:center;'>2.</td><td>Sedang</td><td style='text-align:center;'>20 soal</td><td style='text-align:center;'>1,25</td></tr><tr><td style='text-align:center;'>3.</td><td>Sulit</td><td style='text-align:center;'>10 soal</td><td style='text-align:center;'>1,50</td></tr></table>",
        "Pemeringkatan didasarkan pada nilai total peserta.",
        "Jika pada tahap pemeringkatan masih terdapat nilai yang sama maka penentuan pemenang didasarkan pada jawaban benar untuk soal sulit paling banyak.",
        "Jika masih terdapat nilai yang sama maka penentuan pemenang didasarkan pada jawaban benar untuk soal sedang paling banyak.",
        "Jika masih terdapat nilai yang sama maka penentuan pemenang didasarkan pada jawaban benar untuk soal mudah paling banyak.",
        "Keputusan Juri bersifat mutlak dan tidak dapat diganggu gugat."
    ],

    soal: [
        {
            id: 1,
            tipe: 'pg',
            poin: 1.00,
            stimulus: { tampil: false },
            pertanyaan: "Bayu melihat tanaman tomat di halaman rumahnya. Tanaman tomat di tempat yang teduh tumbuh lebih tinggi tetapi daunnya pucat, sedangkan tanaman tomat di tempat yang terang tubuhnya lebih pendek tetapi daunnya berwarna hijau segar. Bayu kemudian menduga bahwa jumlah cahaya matahari memengaruhi tinggi dan warna daun tanaman tomat tersebut. Tindakan Bayu yang membuat dugaan sementara dalam tahapan metode ilmiah disebut...",
            opsi: [
                "penyusunan hipotesis",
                "observasi permasalahan",
                "penarikan kesimpulan",
                "pelaksanaan eksperimen"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 2,
            tipe: 'pg',
            poin: 1.00,
            stimulus: { tampil: false },
            pertanyaan: "Kania mengamati sebuah organisme yang tumbuh di tumpukan dedaunan kering di kebunnya. Organisme tersebut memiliki struktur mirip batang dan tudung seperti payung, namun warnanya putih kecokelatan dan sama sekali tidak memiliki zat hijau daun (klorofil). Berdasarkan hasil pengamatan tersebut, organisme yang ditemukan Kania digolongkan sebagai makhluk hidup...",
            opsi: [
                "autotrof karena dapat menyerap air dan mineral langsung dari tumpukan daun",
                "heterotrof karena mendapatkan makanan dengan menyerap nutrisi dari sisa makhluk hidup lain",
                "saprofit karena mampu menghasilkan cadangan makanan sendiri tanpa bantuan cahaya matahari",
                "parasit karena mengambil makanan dan merugikan dedaunan kering yang ditumpanginya"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 3,
            tipe: 'pg',
            poin: 1.00,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan gambar organisme yang hidup di perairan tawar berikut ini.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-ipa-2026-soal3.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Hewan pada gambar tersebut memiliki ciri utama tubuh dan kaki yang berbuku-buku. Berdasarkan klasifikasi makhluk hidup, hewan tersebut berkerabat paling dekat dengan hewan-hewan berikut, kecuali...",
            opsi: [
                "kepiting raja (rajungan)",
                "udang windu",
                "gurita",
                "kalajengking"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 4,
            tipe: 'pg',
            poin: 1.00,
            stimulus: { tampil: false },
            pertanyaan: "Pada pagi hari yang dingin dan lembap, Siska mengamati adanya titik-titik air di sepanjang tepi daun tanaman stroberi di halaman rumahnya. Setelah diamati lebih lanjut, titik-titik air tersebut bukanlah embun yang menempel dari udara, melainkan air yang memang dikeluarkan dari dalam jaringan daun itu sendiri. Proses pengeluaran air dalam wujud cair oleh tumbuhan seperti yang diamati Siska dinamakan...",
            opsi: [
                "transpirasi",
                "gutasi",
                "evaporasi",
                "respirasi"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 5,
            tipe: 'pg',
            poin: 1.00,
            stimulus: { tampil: false },
            pertanyaan: "Biji pohon randu (kapuk) memiliki struktur berupa rambut-rambut halus dan sangat ringan, sedangkan buah kopi memiliki daging buah yang rasanya manis dan kulit berwarna merah mencolok saat sudah matang. Berdasarkan prinsip ekologi dalam pelestarian spesies, perbedaan ciri fisik pada alat perkembangbiakan kedua tumbuhan tersebut menunjukkan bahwa...",
            opsi: [
                "biji randu sangat bergantung pada bantuan serangga untuk proses penyerbukannya",
                "buah kopi beradaptasi agar bagian bijinya ikut hancur dicerna oleh hewan pemakan buah",
                "semua jenis tumbuhan selalu membutuhkan angin dan air agar bijinya dapat tersebar luas",
                "setiap tumbuhan memiliki adaptasi penyebaran biji menggunakan perantara yang berbeda"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 6,
            tipe: 'pg',
            poin: 1.00,
            stimulus: { tampil: false },
            pertanyaan: "Di sebuah ekosistem padang rumput, terdapat populasi singa dan cheetah yang hidup berdampingan. Kedua jenis karnivora ini sama-sama berburu gazelle (sejenis rusa) sebagai sumber makanan utama mereka. Terkadang, kawanan singa yang tubuhnya lebih besar datang dan merebut paksa gazelle yang baru saja ditangkap oleh cheetah. Interaksi yang terjadi antara populasi singa dan cheetah dalam ekosistem tersebut merupakan contoh dari...",
            opsi: [
                "kompetisi",
                "parasitisme",
                "komensalisme",
                "predasi"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 7,
            tipe: 'pg',
            poin: 1.00,
            stimulus: { tampil: false },
            pertanyaan: "Warga Desa Makmur sedang menghadapi lonjakan kasus Demam Berdarah Dengue (DBD) pada musim penghujan. Kepala desa berencana melakukan langkah paling efektif dan berjangka panjang untuk memutus rantai penyebaran penyakit tersebut dengan pendekatan kesehatan lingkungan. Tindakan paling tepat yang harus dikoordinasikan oleh kepala desa adalah...",
            opsi: [
                "melakukan pengasapan (fogging) secara rutin setiap hari di seluruh sudut pemukiman warga",
                "membagikan obat antibiotik dosis tinggi kepada seluruh warga agar tubuh kebal terhadap gigitan nyamuk",
                "menggalakkan program pemberantasan sarang nyamuk dengan menguras, menutup, dan mendaur ulang genangan air",
                "membiarkan jentik nyamuk di genangan air karena jentik tersebut akan mati dengan sendirinya saat musim kemarau"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 8,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan grafik hasil percobaan pengukuran laju penguapan air (transpirasi) pada tanaman sejenis yang diberi tiga perlakuan lingkungan yang berbeda berikut.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-ipa-2026-soal8.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Berdasarkan analisis data pada grafik tersebut, kesimpulan perlakuan yang paling tepat dan logis adalah ....",
            opsi: [
                "meletakkan tanaman di ruangan bersuhu dingin dan sangat lembap akan menghasilkan pola Garis A",
                "menyungkup (menutupi) seluruh bagian daun menggunakan kantong plastik rapat akan menghasilkan pola Garis B",
                "mengoleskan cairan vaselin (pelumas) pada permukaan bawah daun tanaman akan menghasilkan pola Garis A",
                "memberikan hembusan angin yang kuat menggunakan kipas angin ke arah daun akan menghasilkan pola Garis A"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 9,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan gambar hewan endemik dari benua Australia berikut ini.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-ipa-2026-soal9.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Peneliti menemukan hewan tersebut berenang di sungai. Hewan ini memiliki paruh yang menyerupai bebek dan berkembang biak dengan cara bertelur (ovipar). Namun, setelah telurnya menetas, induk hewan tersebut menyusui anak-anaknya. Berdasarkan ciri-ciri anatomi dan fisiologinya, klasifikasi yang paling tepat untuk hewan tersebut adalah kelas...",
            opsi: [
                "Aves (burung), karena memiliki struktur paruh dan berkembang biak dengan cara bertelur",
                "Mammalia (hewan menyusui), karena memiliki kelenjar susu dan tubuhnya ditutupi oleh rambut",
                "Reptilia (hewan melata), karena bertelur dan memiliki suhu tubuh yang menyesuaikan lingkungan",
                "Amphibia (katak/salamander), karena dapat hidup di dua alam, yaitu di darat dan di perairan"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 10,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Sekelompok siswa sedang melakukan pengamatan di sebuah kawasan konservasi. Mereka menemukan sebuah organisme unik yang memiliki bagian berwarna hijau dan struktur menyerupai kantong. Saat diamati, seekor lalat hinggap di bibir kantong tersebut, tergelincir masuk, dan akhirnya mati dicerna oleh cairan di dalamnya. Berdasarkan hasil pengamatan tersebut, organisme ini paling tepat diklasifikasikan ke dalam...",
            opsi: [
                "Kingdom Plantae, karena memiliki klorofil untuk berfotosintesis dan menangkap serangga hanya untuk memenuhi kebutuhan tambahan nitrogen",
                "Kingdom Animalia, karena memiliki kemampuan aktif sebagai predator karnivora yang menangkap dan mencerna hewan lain",
                "Kingdom Fungi, karena mendapatkan nutrisi dengan cara menyerap cairan dari bangkai serangga yang membusuk di dalam kantong",
                "Kingdom Protista, karena memiliki sifat gabungan antara autotrof (berwarna hijau) dan heterotrof (memakan organisme lain)"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 11,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Pada saat manusia bernapas, oksigen dari udara bebas akan berdifusi ke dalam alveolus paru-paru dan mengikatkan diri pada sel darah merah. Darah yang telah kaya akan oksigen tersebut harus dikembalikan terlebih dahulu ke jantung sebelum diedarkan ke seluruh tubuh. Bagian jantung yang berfungsi menerima aliran darah bersih dari paru-paru adalah...",
            opsi: [
                "bilik kanan (ventrikel dekster)",
                "serambi kiri (atrium sinister)",
                "bilik kiri (ventrikel sinister)",
                "serambi kanan (atrium dekster)"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 12,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Sekelompok siswa kelas VI melakukan percobaan fotosintesis dengan menutup sebagian daun mangga menggunakan kertas aluminium. Setelah dijemur seharian, daun tersebut dipetik, direbus dalam air mendidih, lalu direbus kembali di dalam alkohol panas. Tujuan utama dari tahap perebusan daun di dalam alkohol panas pada percobaan tersebut adalah...",
            opsi: [
                "mematikan sel-sel daun agar cairan yodium lebih mudah meresap ke dalam jaringan",
                "menguji dan membuktikan bahwa daun tersebut telah menghasilkan zat tepung (amilum)",
                "melarutkan klorofil agar perubahan warna biru kehitaman nantinya mudah diamati",
                "mencegah terjadinya proses fotosintesis lebih lanjut saat daun sedang diteliti"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 13,
            tipe: 'pg',
            poin: 1.50,
            stimulus: { tampil: false },
            pertanyaan: "Santi mengamati tetesan darah manusia di bawah mikroskop dan mencatat dua jenis sel dengan ciri-ciri sebagai berikut:<br>• Sel X: Berbentuk seperti cakram yang cekung di kedua sisinya (bikonkaf), berwarna kemerahan, dan tidak ditemukan adanya inti sel.<br>• Sel Y: Memiliki bentuk yang tidak tetap (dapat berubah-ubah), memiliki inti sel yang jelas, dan tampak bergerak aktif secara amuboid mendekati zat asing.<br>Berdasarkan ciri-ciri mikroskopis tersebut, fungsi utama dari sel X dan sel Y secara berturut-turut adalah...",
            opsi: [
                "Sel X: mengikat dan mengedarkan oksigen, Sel Y: membasmi kuman penyakit yang masuk ke tubuh",
                "Sel X: membantu proses pembekuan darah, Sel Y: mengangkut sari-sari makanan ke seluruh tubuh",
                "Sel X: membasmi kuman penyakit yang masuk ke tubuh, Sel Y: mengikat dan mengedarkan oksigen",
                "Sel X: mengangkut sari-sari makanan ke seluruh tubuh, Sel Y: membantu proses pembekuan darah"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 14,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Para petani di sekitar sebuah danau sering menggunakan pupuk kimia secara berlebihan. Sisa pupuk tersebut terbawa aliran air hujan dan masuk ke dalam danau, menyebabkan tanaman eceng gondok tumbuh sangat lebat dan tidak terkendali hingga menutupi hampir seluruh permukaan perairan. Peristiwa masuknya nutrisi berlebih ke perairan ini dikenal dengan istilah eutrofikasi. Dampak lanjutan paling fatal yang akan dialami oleh ekosistem danau tersebut adalah...",
            opsi: [
                "populasi ikan bertambah pesat karena mendapatkan banyak sumber makanan dari daun eceng gondok",
                "air danau menjadi lebih jernih karena akar eceng gondok berfungsi sebagai penyaring alami kotoran",
                "fitoplankton tumbuh subur karena terlindung dari sengatan panas matahari",
                "banyak hewan air yang mati akibat penurunan drastis kadar oksigen terlarut di dalam air"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 15,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Di sebuah ekosistem sawah, terdapat jaring-jaring makanan dengan aliran energi sebagai berikut: tanaman padi dimakan oleh ulat dan belalang; ulat dimakan oleh burung pipit; belalang dimakan oleh katak; burung pipit dan katak dimakan oleh ular sawah; serta ular sawah dimakan oleh burung elang. Suatu hari, para petani melakukan perburuan besar-besaran terhadap burung pipit dan katak. Dampak langsung yang paling mungkin terjadi pada keseimbangan ekosistem tersebut adalah...",
            opsi: [
                "populasi ulat dan belalang meningkat tajam karena hilangnya hewan pemangsa",
                "hasil panen tanaman padi meningkat pesat karena tidak ada burung pipit yang memakannya",
                "populasi ular sawah bertambah banyak karena sumber makanannya melimpah",
                "populasi burung elang langsung punah karena kehilangan sumber energi utamanya"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 16,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Pabrik-pabrik industri berskala besar sering kali menggunakan bahan bakar fosil seperti batu bara untuk menggerakkan mesinnya. Pembakaran batu bara berkualitas rendah tersebut melepaskan suatu gas berbahaya ke atmosfer. Gas ini kemudian bereaksi dengan uap air di awan dan turun kembali ke bumi sebagai hujan asam yang dapat mematikan tumbuhan dan membuat korosi (perkaratan) pada jembatan besi. Gas utama yang menjadi pemicu utama fenomena tersebut adalah...",
            opsi: [
                "karbon dioksida",
                "sulfur dioksida",
                "klorofluorokarbon (CFC)",
                "gas metana"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 17,
            tipe: 'pg',
            poin: 1.50,
            stimulus: { tampil: false },
            pertanyaan: "Hutan hujan tropis yang membentang di wilayah Indonesia dikenal sebagai salah satu ekosistem dengan tingkat keanekaragaman hayati tertinggi di dunia. Hipotesis utama yang paling tepat untuk menjelaskan mengapa daerah tropis memiliki spesies tumbuhan dan hewan yang jauh lebih beragam dibandingkan daerah beriklim sedang atau kutub adalah...",
            opsi: [
                "tidak adanya keberadaan hewan pemangsa puncak yang mendominasi jaring-jaring makanan",
                "tanah di daerah tropis sangat tebal dan kaya akan unsur hara akibat endapan vulkanik di seluruh daratan",
                "intensitas cahaya matahari dan curah hujan yang tinggi dan stabil sepanjang tahun",
                "fluktuasi suhu udara yang sangat ekstrem untuk memicu laju evolusi dan mutasi pada hewan"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 18,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Penemuan antibiotik merupakan salah satu lompatan teknologi medis terbesar dalam sejarah manusia. Namun saat ini, dunia menghadapi isu kesehatan lingkungan yang serius berupa \"resistensi antibiotik\" (bakteri menjadi kebal terhadap obat). Hal ini sering terjadi karena masyarakat sembarangan mengonsumsi antibiotik untuk mengobati penyakit yang sebenarnya disebabkan oleh virus. Berdasarkan prinsip medis tersebut, penyakit menular di bawah ini yang paling tepat diobati menggunakan resep antibiotik adalah...",
            opsi: [
                "COVID-19",
                "tuberkulosis (TBC)",
                "demam berdarah dengue (DBD)",
                "cacar air"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 19,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Program imunisasi nasional menggunakan teknologi vaksinasi untuk mencegah wabah penyakit menular yang berbahaya seperti polio, campak, dan difteri. Saat seorang tenaga medis menyuntikkan vaksin ke dalam tubuh seorang anak yang sehat, zat utama yang sebenarnya dimasukkan ke dalam tubuh anak tersebut adalah...",
            opsi: [
                "cairan antibiotik dosis tinggi untuk membunuh semua kuman yang akan masuk",
                "tambahan sel darah putih buatan untuk memperkuat daya tahan tubuh secara langsung",
                "vitamin dan suplemen super untuk membuat sel tubuh kebal terhadap segala penyakit",
                "virus atau bakteri penyebab penyakit yang sudah dilemahkan atau dimatikan"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 20,
            tipe: 'pg',
            poin: 1.50,
            stimulus: { tampil: false },
            pertanyaan: "Petugas kesehatan lingkungan mengimbau warga untuk rutin melakukan kerja bakti membersihkan selokan mampet dan tumpukan barang bekas. Tujuannya adalah untuk memutus rantai perkembangbiakan hewan dari kelompok Arthropoda yang sering menjadi vektor (perantara) wabah penyakit mematikan. Penyakit di bawah ini yang penularannya mutlak membutuhkan gigitan vektor dari kelompok hewan Arthropoda adalah ....",
            opsi: [
                "malaria",
                "leptospirosis",
                "kolera",
                "tuberkulosis (TBC)"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 21,
            tipe: 'pg',
            poin: 1.00,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan grafik pemanasan sebongkah es $(H_{2}O)$ dari wujud padat hingga menjadi uap berikut ini.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-ipa-2026-soal21.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Berdasarkan grafik tersebut, kombinasi proses yang menunjukkan terjadinya penyerapan kalor laten untuk merubah wujud zat dan penyerapan kalor sensibel untuk menaikkan suhu zat secara berturut-turut yang paling tepat ditunjukkan pada label...",
            opsi: [
                "perubahan wujud: A; kenaikan suhu: B",
                "perubahan wujud: B; kenaikan suhu: C",
                "perubahan wujud: C; kenaikan suhu: D",
                "perubahan wujud: D; kenaikan suhu: B"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 22,
            tipe: 'pg',
            poin: 1.50,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan tabel data kalor jenis dari beberapa bahan berikut.<br><br><table><tr><th>Bahan</th><th>Kalor jenis (J/(kg K))</th></tr><tr><td>Timah</td><td>227</td></tr><tr><td>Besi</td><td>450</td></tr><tr><td>Aluminium</td><td>900</td></tr><tr><td>Alkohol</td><td>2400</td></tr></table><br><br>Empat buah wadah masing-masing berisi bahan di atas dengan massa yang sama besar. Jika keempat wadah tersebut dipanaskan menggunakan pemanas yang identik dan diberikan jumlah panas yang sama persis, bahan manakah yang akan mengalami kenaikan suhu paling kecil?",
            opsi: [
                "Timah",
                "Besi",
                "Aluminium",
                "Alkohol"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 23,
            tipe: 'pg',
            poin: 1.50,
            stimulus: { tampil: false },
            pertanyaan: "Seorang turis asing sedang berlibur di Indonesia dan merasa kurang enak badan. Ketika diperiksa di klinik, termometer digital milik turis tersebut yang menggunakan skala Fahrenheit menunjukkan angka $104^{\\circ}F$. Jika perawat klinik ingin mencatat suhu tubuh turis tersebut ke dalam skala Celcius, Reamur, dan Kelvin secara berturut-turut, maka nilai yang tepat adalah...",
            opsi: [
                "$72^{\\circ}C$, $57,6^{\\circ}R$, dan 345 K",
                "$32^{\\circ}C$, $40^{\\circ}R$, dan 305 K",
                "$40^{\\circ}C$, $32^{\\circ}R$, dan 313 K",
                "$40^{\\circ}C$, $32^{\\circ}R$, dan 233 K"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 24,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Pada tahun 1971, komandan misi luar angkasa Apollo 15, David Scott, melakukan eksperimen fisika klasik di permukaan Bulan. Ia menjatuhkan sebuah palu geologi dari besi (massa 1,32 kg) dan sehelai bulu burung elang (massa 0,03 kg) secara bersamaan dari ketinggian yang sama. Diketahui bahwa Bulan sama sekali tidak memiliki atmosfer (ruang hampa udara). Pernyataan yang paling tepat menggambarkan hasil pergerakan kedua benda tersebut adalah ....",
            opsi: [
                "palu besi jatuh menyentuh permukaan Bulan lebih dulu karena memiliki massa dan gaya berat yang lebih besar",
                "bulu burung jatuh lebih lambat karena gaya gravitasi Bulan terlalu lemah untuk menarik benda ringan",
                "kedua benda menyentuh permukaan Bulan secara bersamaan karena mengalami percepatan yang sama",
                "palu besi jatuh lebih cepat karena hambatan yang dialaminya di ruang hampa lebih kecil daripada bulu burung"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 25,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan gambar tuas dalam keadaan seimbang berikut ini.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-ipa-2026-soal25.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Seorang siswa sedang melakukan eksperimen tuas. Awalnya, tuas berada dalam keadaan seimbang sempurna seperti pada gambar di atas. Tiba-tiba, siswa tersebut mengganti balok P dengan balok lain yang massanya hanya 50 gram. Agar tuas tersebut dapat kembali seimbang mendatar, langkah paling tepat yang harus dilakukan pada balok Q adalah...",
            opsi: [
                "digeser 2,5 cm mendekati titik tumpu",
                "digeser 2,5 cm menjauhi titik tumpu",
                "digeser 7,5 cm mendekati titik tumpu",
                "digeser 7,5 cm menjauhi titik tumpu"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 26,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Budi meluncurkan sebuah mobil mainan di atas lantai keramik yang sangat licin. Mobil tersebut meluncur bebas dengan kecepatan tinggi, lalu tiba-tiba melintasi sebuah karpet yang permukaannya kasar. Mobil mainan itu terlihat semakin melambat dan akhirnya berhenti total setelah menempuh jarak 2 meter di atas karpet. Berdasarkan prinsip gaya dan energi mekanik, kesimpulan yang paling tepat untuk menjelaskan peristiwa tersebut adalah...",
            opsi: [
                "mobil mainan berhenti karena gaya gravitasi bumi secara bertahap meniadakan kecepatan awalnya",
                "gaya gesek karpet melakukan usaha yang berlawanan arah gerak sehingga menghabiskan energi kinetik mobil",
                "energi kinetik mobil mainan tidak hilang, melainkan seluruhnya berubah wujud menjadi energi potensial",
                "percepatan mobil mainan bernilai positif karena mobil masih sempat bergerak maju sejauh 2 meter"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 27,
            tipe: 'pg',
            poin: 1.50,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan gambar dua buah bidang miring berikut.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-ipa-2026-soal27.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Seorang pekerja bangunan ingin menaikkan sebuah drum berisi semen yang sangat berat ke atas lantai dua setinggi 2 meter. Ia dapat memilih menggunakan papan kayu A yang memiliki jarak mendatar 5 meter, atau papan kayu B yang jarak mendatarnya 6 meter. Jika gaya gesek antara drum dan papan diabaikan, pernyataan yang paling tepat mengenai gaya dorong dan usaha yang dibutuhkan pekerja tersebut adalah...",
            opsi: [
                "Papan A membutuhkan gaya dorong yang lebih kecil karena lintasannya lebih pendek",
                "Kedua papan membutuhkan gaya dorong yang sama besar karena ketinggian akhirnya sama",
                "Papan B membutuhkan usaha (energi) yang lebih kecil dibandingkan dengan papan A",
                "Papan B membutuhkan gaya dorong yang lebih kecil karena memiliki keuntungan mekanis yang lebih besar"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 28,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan data perambatan seberkas cahaya monokromatik pada beberapa medium yang berbeda berikut ini.<br><br><table><tr><th>Medium</th><th>Indeks Bias (n)</th><th>Panjang Gelombang ($\\lambda$)</th><th>Frekuensi (f)</th></tr><tr><td>Udara</td><td>1,00</td><td>600 nm</td><td>500 THz</td></tr><tr><td>Air</td><td>1,33</td><td>450 nm</td><td>500 THz</td></tr><tr><td>Kaca</td><td>1,50</td><td>400 nm</td><td>500 THz</td></tr></table><br><br>Seorang siswa kelas VI sedang mempelajari sifat-sifat gelombang dengan menembakkan sinar laser dari udara ke dalam balok kaca. Berdasarkan analisis data pada tabel di atas, kesimpulan siswa di bawah ini yang TIDAK TEPAT mengenai sifat perambatan gelombang cahaya adalah...",
            opsi: [
                "frekuensi gelombang cahaya akan mengalami perubahan saat memasuki medium yang lebih rapat",
                "panjang gelombang cahaya berbanding terbalik dengan nilai indeks bias mediumnya",
                "kecepatan rambat cahaya di dalam balok kaca lebih lambat dibandingkan saat di udara",
                "frekuensi cahaya selalu konstan karena hanya bergantung pada sumber pemancarnya"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 29,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan grafik simpangan terhadap waktu dari sebuah ayunan sederhana berikut.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-ipa-2026-soal29.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Seorang anak didorong satu kali saat bermain ayunan, kemudian dibiarkan berayun tanpa tambahan dorongan. Sesuai dengan pola grafik di atas, simpangan ayunan lama-kelamaan semakin mengecil hingga akhirnya berhenti. Kesimpulan yang paling tepat untuk menjelaskan peristiwa tersebut adalah...",
            opsi: [
                "frekuensi getaran ayunan semakin menurun seiring berjalannya waktu",
                "gaya tarik gravitasi bumi yang bekerja pada ayunan berangsur membesar",
                "periode ayunan semakin bertambah panjang karena gerak ayunan melambat",
                "energi mekanik berkurang akibat gesekan dengan udara dan engsel ayunan"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 30,
            tipe: 'pg',
            poin: 1.50,
            stimulus: { tampil: false },
            pertanyaan: "Sebuah kereta api cepat melaju meninggalkan stasiun dengan kecepatan tinggi. Saat mulai menjauh, masinis membunyikan peluit kereta yang memiliki frekuensi tetap sebesar 700 Hz. Di peron stasiun, seorang petugas pemeriksa tiket sedang berdiri diam mengawasi kereta tersebut. Sesuai dengan prinsip Efek Doppler pada gelombang bunyi, frekuensi bunyi peluit yang didengar oleh petugas tersebut adalah...",
            opsi: [
                "sama dengan 700 Hz",
                "lebih besar dari 700 Hz",
                "lebih kecil dari 700 Hz",
                "kadang lebih besar dan kadang lebih kecil"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 31,
            tipe: 'pg',
            poin: 1.50,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan grafik hubungan antara amplitudo dan intensitas sebuah gelombang cahaya berikut ini.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-ipa-2026-soal31.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Berdasarkan prinsip fisika, intensitas gelombang berbanding lurus dengan kuadrat amplitudonya, yang ditunjukkan oleh bentuk kurva melengkung ke atas pada grafik. Jika sebuah alat ukur menunjukkan bahwa intensitas gelombang cahaya tiba-tiba melonjak menjadi 9 kali lipat dari intensitas semula, maka dapat disimpulkan bahwa amplitudo gelombang tersebut telah diperbesar sebanyak...",
            opsi: [
                "2 kali lipat",
                "3 kali lipat",
                "4,5 kali lipat",
                "9 kali lipat"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 32,
            tipe: 'pg',
            poin: 1.00,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan bagan rantai transformasi energi yang berasal dari matahari berikut.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-ipa-2026-soal32.png\" style=\"width:100%; max-width:500px; border-radius:5px;\"></div><br>Bagan di atas menggambarkan proses panjang bagaimana energi matahari disimpan dalam bahan bakar fosil hingga akhirnya dapat digunakan untuk keperluan rumah tangga. Jika energi listrik yang dihasilkan digunakan untuk menyalakan sebuah kipas angin di ruang tamu, urutan transformasi energi yang paling tepat untuk menyalakan kipas angin berdasarkan bagan tersebut adalah...",
            opsi: [
                "energi surya → energi kinetik → energi kimia",
                "energi cahaya matahari → energi kimia → energi listrik → energi gerak",
                "energi cahaya matahari → energi panas → energi surya → energi listrik",
                "energi kimia → energi listrik → energi cahaya → energi surya"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 33,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan ilustrasi cara kerja panel surya berikut ini.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-ipa-2026-soal33.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Teknologi sel fotovoltaik pada panel surya merupakan salah satu penerapan konversi energi terbarukan. Namun, spesifikasi panel surya komersial yang beredar di pasaran umumnya mencantumkan nilai efisiensi yang relatif kecil, misalnya 20%. Makna fisis yang paling tepat dari nilai efisiensi 20% pada panel surya tersebut adalah...",
            opsi: [
                "hanya 20% dari total energi cahaya matahari yang mengenai panel yang berhasil diubah menjadi energi listrik",
                "panel surya tersebut akan menghasilkan energi listrik sebesar 20% lebih banyak ketika cuaca sangat panas dan terik",
                "sebesar 20% dari energi listrik yang dihasilkan oleh panel surya akan otomatis terbuang menjadi energi panas ke lingkungan",
                "panel surya memerlukan daya listrik tambahan sebesar 20% dari kapasitas totalnya agar dapat mulai menyerap cahaya matahari"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 34,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan ilustrasi eksperimen listrik statis menggunakan penggaris plastik berikut.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-ipa-2026-soal34.png\" style=\"width:100%; max-width:500px; border-radius:5px;\"></div><br>Seorang siswa menggosokkan penggaris plastik ke rambutnya yang kering selama beberapa saat. Setelah itu, penggaris tersebut didekatkan ke serpihan kertas kecil yang tidak bermuatan (netral) di atas meja. Serpihan kertas tersebut kemudian melompat dan menempel pada ujung penggaris. Berdasarkan konsep listrik statis, penjelasan yang paling tepat mengapa kertas netral dapat ditarik oleh penggaris adalah...",
            opsi: [
                "elektron dari penggaris berpindah ke kertas sehingga kertas berubah menjadi bermuatan positif",
                "proton pada kertas berpindah ke penggaris untuk menetralkan muatan negatif dari rambut",
                "gesekan dengan udara pada saat kertas melompat menimbulkan muatan listrik secara spontan",
                "terjadi polarisasi pada kertas, di mana elektron di dalam kertas tertolak menjauh sehingga permukaan yang dekat penggaris menjadi positif"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 35,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Sebuah eksperimen klasik dalam sejarah ilmu fisika menggunakan instrumen yang disebut sebagai neraca puntir (torsion balance). Alat tersebut dilengkapi dengan bola-bola kecil yang dapat diberi muatan listrik statis. Instrumen ini dirancang dengan tingkat sensitivitas yang sangat tinggi untuk mengukur besarnya gaya tolak-menolak atau tarik-menarik antara dua benda bermuatan yang terpisah pada jarak tertentu. Eksperimen bersejarah ini pertama kali dilakukan untuk membuktikan hukum dasar kelistrikan yang dirumuskan oleh ....",
            opsi: [
                "Charles-Augustin de Coulomb",
                "Alessandro Volta",
                "Hans Christian Oersted",
                "Michael Faraday"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 36,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan gambar rangkaian hambatan listrik berikut ini.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-ipa-2026-soal36.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Jika nilai masing-masing hambatan pada rangkaian di atas adalah sama besar yaitu R, maka besar hambatan total dari ujung kiri ke ujung kanan rangkaian tersebut adalah...",
            opsi: [
                "1,5 R",
                "2,5 R",
                "3 R",
                "6 R"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 37,
            tipe: 'pg',
            poin: 1.50,
            stimulus: { tampil: false },
            pertanyaan: "Perhatikan gambar rangkaian listrik tertutup berikut ini.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-ipa-2026-soal37.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Berdasarkan nilai komponen pada gambar rangkaian di atas, kuat arus listrik yang mengalir khusus pada hambatan 6,0 $\\Omega$ adalah...",
            opsi: [
                "0,25 A",
                "0,50 A",
                "0,75 A",
                "1,00 A"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 38,
            tipe: 'pg',
            poin: 1.25,
            stimulus: { tampil: false },
            pertanyaan: "Pada malam hari yang cerah, sesekali tampak kilatan cahaya melesat cepat di langit yang sering disebut oleh masyarakat sebagai fenomena \"bintang jatuh\". Berdasarkan ilmu astronomi, penjelasan yang paling tepat mengenai peristiwa tersebut adalah...",
            opsi: [
                "komet yang sedang melintasi orbit Bumi dan memancarkan cahaya terang dari ekornya",
                "batuan angkasa yang terbakar dan berpijar akibat gesekan hebat dengan atmosfer Bumi",
                "serpihan sabuk asteroid yang telah menembus atmosfer dan menabrak permukaan Bumi",
                "peristiwa pelepasan energi akibat partikel badai matahari yang masuk ke medan magnet Bumi"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 39,
            tipe: 'pg',
            poin: 1.50,
            stimulus: { tampil: false },
            pertanyaan: "Kepulauan Indonesia merupakan salah satu wilayah di dunia yang memiliki tingkat aktivitas seismik (gempa bumi) yang sangat tinggi. Secara geologis, fenomena ini terjadi karena wilayah Indonesia terletak di zona pertemuan tiga lempeng tektonik utama dunia, yaitu Lempeng Eurasia, Lempeng Pasifik, dan Lempeng Indo-Australia. Gempa bumi tektonik yang paling sering terjadi dan menimbulkan getaran kuat di daratan umumnya dipicu oleh peristiwa...",
            opsi: [
                "pemuaian volume material batuan di dalam kerak bumi akibat peningkatan suhu global yang ekstrem",
                "runtuhnya langit-langit gua berukuran raksasa yang berada jauh di bawah permukaan tanah",
                "pelepasan energi secara tiba-tiba akibat adanya patahan atau pergeseran pada batas pertemuan lempeng",
                "penurunan permukaan tanah secara drastis akibat pengambilan air tanah yang berlebihan di kawasan perkotaan"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 40,
            tipe: 'pg',
            poin: 1.00,
            stimulus: { tampil: false },
            pertanyaan: "Dalam melakukan eksperimen fisika, seorang peneliti harus memastikan bahwa data yang diperoleh memiliki tingkat akurasi yang tinggi. Oleh karena itu, alat ukur yang akan digunakan harus melalui proses kalibrasi secara berkala di laboratorium standar yang terakreditasi. Makna yang paling tepat dari proses kalibrasi pada alat ukur tersebut adalah...",
            opsi: [
                "proses memutar sekrup pengatur agar jarum alat ukur menunjukkan angka nol tepat sebelum mulai digunakan",
                "proses verifikasi untuk memastikan nilai penunjukan alat ukur sesuai dengan standar nasional atau internasional",
                "proses penambahan nilai koreksi tertentu pada hasil pengukuran agar data terlihat lebih rapi dan konsisten",
                "proses penghitungan rata-rata dari beberapa kali hasil pengukuran untuk mengurangi nilai ketidakpastian"
            ],
            kunci: 'B',
            ragu: false
        }
    ]
});
