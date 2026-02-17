/* ========================================================== */
/* DATABASE SOAL TKA MATEMATIKA SD 2026                     */
/* ========================================================== */

// --- VARIABEL STIMULUS (Untuk Soal Berkelompok) ---

// Stimulus Soal 2 & 3 (Resep Kue)
const STIMULUS_DUBAI_COOKIES = `
    <h3>Dubai Chewy Cookies</h3>
    <p>Belakangan ini, perpaduan rasa khas Timur Tengah sedang menjadi tren di dunia kuliner, salah satunya adalah cokelat Dubai yang viral.</p>
    <p>Terinspirasi dari hal tersebut, seorang pembuat kue mencoba mengkreasikan resep "Dubai Chewy Cookies". Camilan ini menggabungkan gurihnya isian <i>pistachio kataifi</i> dengan lapisan <i>marshmallow</i> cokelat yang kenyal dan legit.</p>
    <p>Untuk menjaga kualitas rasa dan tekstur, takaran bahan harus sangat presisi. Berikut adalah rincian bahan yang dibutuhkan untuk membuat <b>satu loyang besar</b> <i>Dubai Chewy Cookies</i>:</p>
    <p><b>Bahan Isian (Filling):</b><br>
    • $\\frac{3}{20}$ kg <i>kataifi</i>, dicincang halus<br>
    • $\\frac{1}{50}$ kg mentega tawar<br>
    • 200 gram selai <i>pistachio</i><br>
    • Stroberi utuh secukupnya (opsional)</p>
    <p><b>Bahan Lapisan Luar:</b><br>
    • 2 ons <i>marshmallow</i> putih<br>
    • $\\frac{3}{10}$ ons mentega tawar<br>
    • 2 sdm bubuk kakao tanpa gula<br>
    • $1\\frac{1}{2}$ sdm susu bubuk</p>
`;

// Stimulus Soal 12 & 13 (Renovasi Ruang Tamu)
const STIMULUS_RENOVASI = `
    <h3>Renovasi Ruang Tamu</h3>
    <p>Pak Alvin sedang merenovasi ruang tamu di rumahnya. Gambaran ruang tamu Pak Alvin terdapat pada gambar berikut ini.</p>
    <p>Selain itu, ia bingung memilih tiga jenis keramik yang tersedia pada toko. Oleh karena itu, ia hendak membandingkan dan memutuskan keramik mana yang akan ia gunakan.</p>
    <div style="text-align:center; margin: 10px 0;">
        <img src="assets/tka-sd-mtk-2026-stimulus12.png" style="width:100%; max-width:600px; border-radius:5px;">
    </div>
`;

// Stimulus Soal 17 & 18 (Dispenser Soda)
const STIMULUS_DISPENSER = `
    <h3>Dispenser Minuman</h3>
    <p>Lily mengunjungi sebuah restoran cepat saji (<i>fast food</i>) dan melihat mesin dispenser soda seperti pada gambar di bawah ini.</p>
    <div style="text-align:center; margin: 10px 0;">
        <img src="assets/tka-sd-mtk-2026-stimulus17.png" style="width:100%; max-width:500px; border-radius:5px;">
    </div>
`;


PAKET_SOAL.push({
    id: "tka-mtk-sd-2026",
    judul: "Try Out TKA Matematika SD 2026",
    mapel: "Matematika",
    waktu: 65, // Sesuai dokumen sumber
    petunjuk: [
        "Berdoalah sebelum mengerjakan soal.",
        "Kerjakan soal yang dianggap mudah terlebih dahulu.",
        "Periksa kembali jawaban sebelum mengirim."
    ],
    soal: [
        // --- SOAL 1 (PGK) ---
        {
            id: 1,
            tipe: 'pgk',
            stimulus: {
                tampil: true,
                konten: `
                    <h3>Pemesanan Pizza</h3>
                    <p>Tiga orang anak yakni Ana, Bima, dan Chatra memesan <i>delivery pizza</i> dengan ukuran yang sama tetapi memiliki varian rasa dan jumlah potongan yang berbeda.</p>
                    <p>Setelah selesai makan, masing-masing pizza mereka memiliki sisa yang digambarkan sebagai berikut.</p>
                    <div style="text-align:center; margin: 10px 0;">
                        <img src="assets/tka-sd-mtk-2026-soal1.png" style="width:100%; max-width:500px; border-radius:5px;">
                    </div>
                `
            },
            pertanyaan: "Berilah tanda centang ( ✓ ) pada kotak yang menunjukkan pernyataan yang tepat.",
            opsi: [
                "Sisa pizza Chatra lebih banyak daripada sisa pizza Ana.",
                "Bagian pizza yang dimakan Bima lebih sedikit daripada bagian pizza yang dimakan Ana.",
                "Di antara ketiganya, Ana adalah orang yang memakan pizza paling sedikit."
            ],
            kunci: ['0', '2'], // Berdasarkan kunci jawaban: Hanya pernyataan a (0) yang Benar
            ragu: false
        },

        // --- SOAL 2 (PG) ---
        {
            id: 2,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: `
                    ${STIMULUS_DUBAI_COOKIES}
                    <hr>
                    <p>Heidi ingin membuat “Dubai Chewy Cookies” tersebut menggunakan bahan-bahan yang ada di rumahnya. Ia melihat bahan yang tersisa di lemari sebagai berikut:</p>
                    <ul>
                        <li>5 pcs <i>sachet</i> mentega mini ukuran 15 gram.</li>
                        <li>30 pcs <i>marshmallow</i> putih, dengan 1 pcs memiliki berat 5 gram.</li>
                        <li>Kataifi sebanyak 1,6 ons.</li>
                        <li>1 toples sachet pistachio berukuran 1 kg, tetapi hanya tersisa $\\frac{1}{5}$.</li>
                    </ul>
                `
            },
            pertanyaan: "Pernyataan di bawah ini yang <b>salah</b> adalah ....",
            opsi: [
                "Selai <i>pistachio</i> yang dimiliki Heidi sudah pas dengan takaran yang dibutuhkan resep.",
                "Persediaan mentega Heidi masih tersisa 25 gram setelah digunakan untuk membuat satu loyang <i>cookies</i>.",
                "Setelah mengambil <i>kataifi</i> sesuai kebutuhan resep, Heidi masih memiliki sisa 10 gram <i>kataifi</i> di lemarinya.",
                "Persediaan <i>marshmallow</i> di lemari Heidi sudah mencukupi untuk membuat satu loyang besar <i>cookies</i> sesuai resep."
            ],
            kunci: 'D',
            ragu: false
        },

        // --- SOAL 3 (PGK-Kategori / Benar-Salah) ---
        {
            id: 3,
            tipe: 'pgk-kategori',
            stimulus: {
                tampil: true,
                konten: `
                    ${STIMULUS_DUBAI_COOKIES}
                    <hr>
                    <p>Bu Ida akan berbelanja ke toko bahan kue untuk memenuhi pesanan <b>5 loyang besar</b> <i>Dubai Chewy Cookies</i>. Berikut adalah daftar harga bahan di toko tersebut:</p>
                    <ul>
                        <li>Kataifi : Rp20.000 per $\\frac{1}{4}$ kg</li>
                        <li>Selai Pistachio : Rp150.000 per $\\frac{1}{2}$ kg</li>
                        <li>Marshmallow : Rp15.000 per 2 ons</li>
                    </ul>
                `
            },
            pertanyaan: "Berdasarkan kebutuhan untuk <b>5 loyang besar</b>, tentukan apakah pernyataan berikut <b>Benar</b> atau <b>Salah</b> dengan memberikan tanda centang ( ✓ ).",
            opsi: [
                "Total biaya yang harus dikeluarkan Bu Ida untuk membeli seluruh kebutuhan selai <i>pistachio</i> adalah Rp300.000.",
                "Untuk membeli 750 gram <i>kataifi</i>, Bu Ida cukup membayar sebesar Rp40.000.",
                "Jika Bu Ida membayar total belanjaan ketiga bahan tersebut dengan selembar uang Rp500.000, maka ia akan menerima kembalian sebesar Rp65.000."
            ],
            kunci: { '0': 'B', '1': 'S', '2': 'B' },
            ragu: false
        },

        // --- SOAL 4 (PG) ---
        {
            id: 4,
            tipe: 'pg',
            stimulus: { tampil: false },
            pertanyaan: "Diberikan lima buah bilangan sebagai berikut:<br><br>$\\frac{13}{10}$ ; 1,2 ; 0,7 ; $1\\frac{1}{2}$ ; dan 140%.<br><br>Urutan bilangan tersebut mulai dari yang terkecil ke yang terbesar adalah ....",
            opsi: [
                "0,7 ; 1,2 ; $\\frac{13}{10}$ ; 140% ; $1\\frac{1}{2}$",
                "0,7 ; 1,2 ; 140% ; $\\frac{13}{10}$ ; $1\\frac{1}{2}$",
                "0,7 ; $\\frac{13}{10}$ ; 1,2 ; 140% ; $1\\frac{1}{2}$",
                "1,2 ; 0,7 ; $\\frac{13}{10}$ ; 140% ; $1\\frac{1}{2}$"
            ],
            kunci: 'A',
            ragu: false
        },

        // --- SOAL 5 (PGK) ---
        {
            id: 5,
            tipe: 'pgk',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Dina memiliki 2,5 liter susu di dalam kulkas. Ia menggunakan 0,75 liter susu tersebut untuk membuat puding.</p>
                    <p>Keesokan harinya, ia membeli lagi $1\\frac{1}{2}$ liter susu.</p>
                `
            },
            pertanyaan: "Berdasarkan cerita tersebut, berilah tanda centang ( ✓ ) pada setiap pernyataan yang benar (Jawaban dapat lebih dari satu).",
            opsi: [
                "Susu yang digunakan Dina untuk membuat puding setara dengan $\\frac{3}{4}$ liter.",
                "Sisa susu Dina setelah digunakan membuat puding sebelum membeli lagi adalah 1,25 liter.",
                "Total seluruh susu yang dimiliki Dina sekarang adalah $3\\frac{1}{4}$ liter."
            ],
            kunci: ['0', '2'],
            ragu: false
        },

        // --- SOAL 6 (PGK-Kategori / Benar-Salah) ---
        {
            id: 6,
            tipe: 'pgk-kategori',
            stimulus: {
                tampil: true,
                konten: `
                    <h3>Jadwal Perawatan Green House</h3>
                    <p>Untuk menjaga kesegaran tanaman di <i>Green House</i> sekolah, pengurus OSIS membuat jadwal perawatan rutin. Berikut adalah jadwal tiga tindakan perawatan utama:</p>
                    <ul>
                        <li><b>Pemberian Nutrisi</b> : Dilakukan setiap <b>2 hari sekali</b>, dimulai pada tanggal <b>3 Februari 2026</b>.</li>
                        <li><b>Pengecekan Kelembapan</b> : Dilakukan setiap <b>3 hari sekali</b>, dimulai pada tanggal <b>1 Februari 2026</b>.</li>
                        <li><b>Pembersihan Rak</b> : Dilakukan setiap <b>4 hari sekali</b>, dimulai pada tanggal <b>1 Februari 2026</b>.</li>
                    </ul>
                `
            },
            pertanyaan: "Berdasarkan jadwal tersebut, tentukan apakah pernyataan berikut <b>Benar</b> atau <b>Salah</b> dengan memberikan tanda centang ( ✓ ).",
            opsi: [
                "Pemberian Nutrisi dan Pengecekan Kelembapan akan dilakukan secara bersamaan untuk pertama kalinya pada tanggal 7 Februari 2026.",
                "Pengecekan Kelembapan dan Pembersihan Rak akan dilakukan secara bersamaan untuk kedua kalinya pada tanggal 9 Februari 2026.",
                "Ketiga tindakan perawatan tersebut akan dilakukan secara bersamaan untuk ketiga kalinya pada tanggal 9 Maret 2026."
            ],
            kunci: { '0': 'B', '1': 'S', '2': 'B' },
            ragu: false
        },

        // --- SOAL 7 (PGK) ---
        {
            id: 7,
            tipe: 'pgk',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Di hari ulang tahun Nenek, Lia mencoba menghitung usia anggota keluarganya secara berurutan.</p>
                    <p>Nenek Lia saat ini berusia tepat 8 windu. Ibu Lia memiliki usia 2 dasawarsa lebih 5 tahun lebih muda daripada Nenek.</p>
                    <p>Sementara itu, Lia sendiri berusia 3 windu lebih muda daripada Ibunya.</p>
                `
            },
            pertanyaan: "Berdasarkan teks di atas, berilah tanda centang ( ✓ ) pada setiap pernyataan yang benar (Jawaban dapat lebih dari satu).",
            opsi: [
                "Usia Ibu Lia jika dikonversi ke satuan windu adalah 4 windu lebih 7 tahun.",
                "Lia saat ini berusia 1,5 dasawarsa.",
                "Selisih usia antara Nenek dan Lia adalah 45 tahun."
            ],
            kunci: ['0', '1'],
            ragu: false
        },

        // --- SOAL 8 (PG) ---
        {
            id: 8,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Jarak dari rumah Anton ke sekolah adalah 5 km. Sekolah dimulai tepat pukul 07.30.</p>
                    <p>Pagi ini, Anton memiliki rencana dan kondisi perjalanan sebagai berikut:</p>
                    <ul>
                        <li><b>Target:</b> Anton ingin tiba di sekolah 5 menit lebih awal dari bel masuk.</li>
                        <li><b>Kondisi Nyata:</b> Anton berangkat dari rumah pukul 07.05 dengan kecepatan rata-rata sepeda 14,4 km/jam.</li>
                    </ul>
                `
            },
            pertanyaan: "Berdasarkan informasi di atas, manakah pernyataan di bawah ini yang <b>salah</b>?",
            opsi: [
                "Target waktu Anton sampai di sekolah adalah pukul 07.25.",
                "Kecepatan sepeda Anton agar sampai sesuai target adalah 16 km/jam.",
                "Kecepatan sepeda Anton sesuai kondisi nyata adalah 4 m/s.",
                "Anton akan sampai di sekolah pada kurang dari pukul 07.26."
            ],
            kunci: 'B',
            ragu: false
        },

        // --- SOAL 9 (PG) ---
        {
            id: 9,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Seorang anak bermain menyusun kubus seperti pada gambar di bawah ini.</p>
                    <div style="text-align:center; margin: 10px 0;">
                        <img src="assets/tka-sd-mtk-2026-soal9.png" style="width:100%; max-width:400px; border-radius:5px;">
                    </div>
                `
            },
            pertanyaan: "Apabila anak tersebut melihat susunan kubus dari atas, yang akan terlihat oleh anak tersebut adalah ....",
            opsi: [
                "<img src='assets/tka-sd-mtk-2026-soal9a.png' style='max-width:100px;'>",
                "<img src='assets/tka-sd-mtk-2026-soal9b.png' style='max-width:100px;'>",
                "<img src='assets/tka-sd-mtk-2026-soal9c.png' style='max-width:100px;'>",
                "<img src='assets/tka-sd-mtk-2026-soal9d.png' style='max-width:100px;'>"
            ],
            kunci: 'A',
            ragu: false
        },

        // --- SOAL 10 (PGK-Kategori / Benar-Salah) ---
        {
            id: 10,
            tipe: 'pgk-kategori',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Tiga orang siswa, yaitu Clement, Mimin, dan Jima, masing-masing memikirkan satu jenis bangun datar segi empat yang berbeda. Mereka menuliskan 4 sifat dari bangun tersebut sebagai berikut:</p>
                    <table border="1" cellpadding="5" cellspacing="0" style="width:100%; border-collapse: collapse;">
                        <tr style="background-color: #f2f2f2;">
                            <th>No</th><th>Clement</th><th>Mimin</th><th>Jima</th>
                        </tr>
                        <tr>
                            <td>1</td><td>Memiliki 4 sisi sama panjang.</td><td>Memiliki 2 pasang sisi sejajar.</td><td>Memiliki 2 pasang sisi sejajar.</td>
                        </tr>
                        <tr>
                            <td>2</td><td>Memiliki 4 sudut siku-siku.</td><td>Keempat sisinya sama panjang.</td><td>Sisi-sisi berhadapan sama panjang.</td>
                        </tr>
                        <tr>
                            <td>3</td><td>Kedua diagonalnya sama panjang.</td><td>Sudut-sudut berhadapan sama besar.</td><td>Sudut-sudut berhadapan sama besar.</td>
                        </tr>
                        <tr>
                            <td>4</td><td>Diagonalnya berpotongan tegak lurus.</td><td>Diagonalnya tegak lurus, tapi tidak sama panjang.</td><td>Tidak memiliki simetri lipat sama sekali.</td>
                        </tr>
                    </table>
                `
            },
            pertanyaan: "Berdasarkan sifat-sifat di atas, tentukan apakah pernyataan berikut <b>Benar</b> atau <b>Salah</b> dengan memberikan tanda centang ( ✓ ).",
            opsi: [
                "Bangun datar yang sedang dipikirkan oleh Clement adalah persegi.",
                "Bangun datar yang dimaksud oleh Mimin adalah persegi panjang.",
                "Bangun datar yang digambarkan oleh Jima adalah jajargenjang."
            ],
            kunci: { '0': 'B', '1': 'S', '2': 'B' },
            ragu: false
        },

        // --- SOAL 11 (PGK) ---
        {
            id: 11,
            tipe: 'pgk',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Lika melihat dua buah teh kemasan pada minimarket.</p>
                    <div style="text-align:center; margin: 10px 0;">
                        <img src="assets/tka-sd-mtk-2026-soal11.png" style="width:100%; max-width:500px; border-radius:5px;">
                    </div>
                    <p><b>Kemasan Q (Teh Immanuel):</b> 8 x 6 x 5 cm</p>
                    <p><b>Kemasan P (Teh Pasti Segar):</b> 4 x 4 x 10 cm</p>
                `
            },
            pertanyaan: "Berilah tanda centang ( ✓ ) pada pernyataan yang tepat.",
            opsi: [
                "Volume teh kemasan P (Teh Pasti Segar) adalah 160 ml.",
                "Volume teh kemasan Q (Teh Immanuel) adalah 240 ml.",
                "Volume teh kemasan P lebih besar daripada volume teh kemasan Q."
            ],
            kunci: ['0', '1'],
            ragu: false
        },

        // --- SOAL 12 (PG) ---
        {
            id: 12,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Perhatikan orang yang sedang mengangkat beban berikut ini!</p>
                    <div style="text-align:center; margin: 10px 0;">
                        <img src="assets/tka-sd-mtk-2026-soal12.png" style="width:100%; max-width:300px; border-radius:5px;">
                    </div>
                `
            },
            pertanyaan: "Perkiraan besar sudut yang dibentuk oleh kaki atlet di samping adalah....",
            opsi: [
                "30 derajat",
                "60 derajat",
                "90 derajat",
                "120 derajat"
            ],
            kunci: 'B',
            ragu: false
        },

        // --- SOAL 13 (PG) ---
        {
            id: 13,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: STIMULUS_RENOVASI
            },
            pertanyaan: "Pak Alvin hendak menghitung pengeluaran apabila menggunakan Keramik A. Di toko tersebut, harga Keramik A dibanderol Rp 150.000 per m². Berapakah total biaya yang harus disiapkan Pak Alvin untuk merenovasi seluruh lantai ruang tamunya?",
            opsi: [
                "Rp 2.600.000",
                "Rp 3.000.000",
                "Rp 3.500.000",
                "Rp 4.000.000"
            ],
            kunci: 'B',
            ragu: false
        },

        // --- SOAL 14 (PGK) ---
        {
            id: 14,
            tipe: 'pgk',
            stimulus: {
                tampil: true,
                konten: STIMULUS_RENOVASI
            },
            pertanyaan: "Pak Alvin hendak menentukan mana yang lebih baik di antara keramik B dan C. Oleh karena itu, berilah tanda centang ( ✓ ) pada setiap pernyataan berikut yang dianggap benar (Jawaban dapat lebih dari satu).",
            opsi: [
                "Luas satu keping Keramik B adalah 0,16 m².",
                "Jika satu dus keramik B berisi 5 keping, maka Pak Alvin harus membeli 25 dus untuk menutupi seluruh lantai.",
                "Total keramik C yang dibutuhkan untuk seluruh ruangan adalah 400 keping."
            ],
            kunci: ['0', '1'],
            ragu: false
        },

        // --- SOAL 15 (PG) ---
        {
            id: 15,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Perhatikan bangun berikut.</p>
                    <div style="text-align:center; margin: 10px 0;">
                        <img src="assets/tka-sd-mtk-2026-soal15.png" style="width:100%; max-width:300px; border-radius:5px;">
                    </div>
                `
            },
            pertanyaan: "Luas bangun di atas adalah....",
            opsi: [
                "61 cm²",
                "106 cm²",
                "125 cm²",
                "210 cm²"
            ],
            kunci: 'C',
            ragu: false
        },

        // --- SOAL 16 (PG) ---
        {
            id: 16,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Sebuah truk pengangkut sembako membawa muatan awal sebesar 0,5 ton beras. Di pasar pertama, truk tersebut menurunkan beras sebanyak 1,5 kuintal. Kemudian, di pasar kedua, truk tersebut menambah muatan gula sebanyak 125 kg. </p>
                    `
                    },
            pertanyaan: "Berat total muatan truk sekarang adalah...",
            opsi: [
                "475 kg",
                "425 kg",
                "375 kg",
                "325 kg"
            ],
            kunci: 'A',
            ragu: false
        },

        // --- SOAL 17 (PG) ---
        {
            id: 17,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: STIMULUS_DISPENSER
            },
            pertanyaan: "Jika diisi hingga penuh, volume setiap wadah penyimpanan minuman tersebut adalah ....",
            opsi: [
                "0,21 liter",
                "21 liter",
                "210 liter",
                "2100 cc"
            ],
            kunci: 'B',
            ragu: false
        },

        // --- SOAL 18 (PGK-Kategori / Benar-Salah) ---
        {
            id: 18,
            tipe: 'pgk-kategori',
            stimulus: {
                tampil: true,
                konten: STIMULUS_DISPENSER
            },
            pertanyaan: "Manajer restoran ingin menghitung berapa banyak gelas yang dapat diisi dari sisa minuman Coca-Cola, Sprite, dan Fanta. Jika satu gelas berukuran 300 cc, berilah tanda centang ( ✓ ) pada setiap pernyataan berikut yang dianggap benar.",
            opsi: [
                "Dispenser Coca Cola dapat mengisi 60 gelas.",
                "Dispenser Sprite dapat mengisi 30 gelas.",
                "Dispenser Fanta dapat mengisi 40 gelas."
            ],
            kunci: { '0': 'B', '1': 'S', '2': 'B' },
            ragu: false
        },

        // --- SOAL 19 (PG) ---
        {
            id: 19,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Perhatikan bangun berikut.</p>
                    <div style="text-align:center; margin: 10px 0;">
                        <img src="assets/tka-sd-mtk-2026-soal19.png" style="width:100%; max-width:300px; border-radius:5px;">
                    </div>
                `
            },
            pertanyaan: "Keliling trapesium tersebut adalah...",
            opsi: [
                "24 cm",
                "25 cm",
                "26 cm",
                "27 cm"
            ],
            kunci: 'C',
            ragu: false
        },

        // --- SOAL 20 (PGK) ---
        {
            id: 20,
            tipe: 'pgk',
            stimulus: {
                tampil: true,
                konten: `
                    <h3>Proyeksi Penduduk Indonesia</h3>
                    <p>Indonesia merupakan negara dengan jumlah penduduk terbanyak ke-4 di dunia dan memiliki keberagaman usia yang luar biasa. Pada tahun 2030, diprediksi akan muncul generasi baru yang disebut Gen Beta (anak-anak balita), sementara Gen Alpha akan memasuki usia remaja sekolah.</p>
                    <p>Pemerintah memproyeksikan total penduduk Indonesia saat itu mencapai angka bulat <b>300 Juta Jiwa</b>. Berikut adalah diagram prediksi persentase penduduk Indonesia pada tahun 2030:</p>
                    <div style="text-align:center; margin: 10px 0;">
                        <img src="assets/tka-sd-mtk-2026-soal20.png" style="width:100%; max-width:500px; border-radius:5px;">
                    </div>
                `
            },
            pertanyaan: "Berdasarkan data proyeksi tahun 2030 di atas, berilah tanda centang ( ✓ ) pada setiap pernyataan berikut yang dianggap benar (Jawaban dapat lebih dari satu).",
            opsi: [
                "Penduduk Gen Alpha (usia sekolah) diprediksi sebanyak 60 juta jiwa.",
                "Penduduk Gen Beta (balita) diprediksi mencapai 30 juta jiwa.",
                "Penduduk Gen Z (dewasa muda) diprediksi sebanyak 80 juta jiwa."
            ],
            kunci: ['0', '1'],
            ragu: false
        },

        // --- SOAL 21 (PGK-Kategori / Benar-Salah) ---
        {
            id: 21,
            tipe: 'pgk-kategori',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Pak Yakub mendata pilihan SMP tujuan dari siswa kelas 6A dan 6B. Diketahui jumlah siswa di setiap kelas adalah 20 orang. Hasil pendataan tersebut disajikan dalam diagram batang berikut.</p>
                    <div style="text-align:center; margin: 10px 0;">
                        <img src="assets/tka-sd-mtk-2026-soal21.png" style="width:100%; max-width:500px; border-radius:5px;">
                    </div>
                `
            },
            pertanyaan: "Perhatikan diagram batang di atas dengan teliti! Berilah tanda centang (√) pada kolom Benar atau Salah untuk setiap pernyataan berikut!",
            opsi: [
                "Siswa kelas 6A yang memilih SMP Tunas Bangsa lebih banyak dibandingkan siswa kelas 6B.",
                "Jumlah seluruh siswa gabungan kelas 6A dan 6B yang memilih SMP Negeri 01 adalah 7 siswa.",
                "Peminat SMP Insan Mulia di kelas 6B lebih sedikit dibandingkan di kelas 6A."
            ],
            kunci: { '0': 'B', '1': 'B', '2': 'S' },
            ragu: false
        },

        // --- SOAL 22 (PG) ---
        {
            id: 22,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Koperasi Sekolah "Maju Jaya" mencatat data penjualan pensil selama satu minggu. Berikut adalah rincian hasil penjualan selama 5 hari kerja:</p>
                    <ul>
                        <li>Hari Senin terjual sebanyak $1\\frac{1}{6}$ lusin.</li>
                        <li>Hari Selasa terjual sebanyak 6 buah.</li>
                        <li>Hari Rabu terjual sebanyak $\\frac{4}{5}$ kodi.</li>
                        <li>Hari Kamis terjual 2 buah lebih sedikit daripada hari Rabu.</li>
                        <li>Hari Jumat terjual sebanyak tepat 1 lusin</li>
                    </ul>
                `
            },
            pertanyaan: "Piktogram yang tepat untuk menyajikan data penjualan di atas adalah ....",
            opsi: [
                "<img src='assets/tka-sd-mtk-2026-soal22a.png' style='max-width:100%;'>",
                "<img src='assets/tka-sd-mtk-2026-soal22b.png' style='max-width:100%;'>",
                "<img src='assets/tka-sd-mtk-2026-soal22c.png' style='max-width:100%;'>",
                "<img src='assets/tka-sd-mtk-2026-soal22d.png' style='max-width:100%;'>"
            ],
            kunci: 'B',
            ragu: false
        },

        // --- SOAL 23 (PGK) ---
        {
            id: 23,
            tipe: 'pgk',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Bu Guru melakukan survei kepada seluruh siswa kelas 6 SD Merdeka yang berjumlah 50 orang untuk menentukan kegiatan ekstrakurikuler tambahan.</p>
                    <p>Dari hasil pendataan, ditemukan 6 jenis kegemaran utama. Peminat terbanyak adalah Game Online dengan jumlah 15 siswa.</p>
                    <p>Di urutan kedua, terdapat 12 siswa yang sangat gemar bermain Sepak Bola. Kegiatan seni seperti Menari diminati oleh 8 siswa.</p>
                    <p>Sisanya, siswa memiliki kegemaran Membaca Komik, Bersepeda, dan Melukis dengan jumlah siswa yang sama banyak untuk ketiga kegiatan tersebut.</p>
                `
            },
            pertanyaan: "Berdasarkan data kegemaran siswa di atas, berilah tanda centang (√) pada setiap pernyataan yang <b>BENAR</b>! (Jawaban benar lebih dari satu)",
            opsi: [
                "Jumlah siswa yang gemar Melukis adalah 5 orang.",
                "Siswa yang gemar Membaca Komik lebih banyak daripada siswa yang gemar Menari.",
                "Gabungan siswa yang gemar Sepak Bola dan Bersepeda adalah 17 orang."
            ],
            kunci: ['0', '2'],
            ragu: false
        },

        // --- SOAL 24 (PGK-Kategori / Benar-Salah) ---
        {
            id: 24,
            tipe: 'pgk-kategori',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Pak Dengklek mencatat hasil panen telur bebek di peternakannya selama 5 hari. Berikut adalah data penjualan bebek Pak Dengklek selama 1 minggu.</p>
                    <div style="text-align:center; margin: 10px 0;">
                        <img src="assets/tka-sd-mtk-2026-soal24.png" style="width:100%; max-width:500px; border-radius:5px;">
                    </div>
                `
            },
            pertanyaan: "Perhatikan data diagram garis hasil panen telur di atas! Berilah tanda centang (√) pada kolom <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan berikut!",
            opsi: [
                "Jumlah total hasil panen telur pada tiga hari pertama (Senin, Selasa, Rabu) adalah 440 butir.",
                "Kenaikan hasil panen tertinggi terjadi dari hari Rabu ke hari Kamis.",
                "Jika seluruh telur pada hari Kamis dijual dengan harga Rp2.500,00 per butir, maka uang yang diperoleh adalah Rp500.000,00."
            ],
            kunci: { '0': 'B', '1': 'S', '2': 'B' },
            ragu: false
        },

        // --- SOAL 25 (PG) ---
        {
            id: 25,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: `
                    <p>Pada musim liburan sekolah, Edo dan keluarganya berencana mengunjungi Candi Borobudur.</p>
                    <p>Sebelum berangkat, Edo membuka peta digital di tablet ayahnya untuk melihat rute perjalanan dari kota Yogyakarta menuju Magelang.</p>
                    <p>Pada pojok peta tersebut, tertulis informasi Skala 1 : 400.000. Edo penasaran dan mengambil penggaris untuk mengukur jarak kedua kota tersebut pada layar tablet. Ternyata, hasil ukurannya menunjukkan angka 8 cm.</p>
                    <div style="text-align:center; margin: 10px 0;">
                        <img src="assets/tka-sd-mtk-2026-soal25.png" style="width:100%; max-width:500px; border-radius:5px;">
                    </div>
                `
            },
            pertanyaan: "Berdasarkan informasi di atas, jarak sebenarnya antara kota Yogyakarta dan Magelang adalah ....",
            opsi: [
                "3,2 km",
                "32 km",
                "50 km",
                "320 km"
            ],
            kunci: 'B',
            ragu: false
        }
    ]
});
