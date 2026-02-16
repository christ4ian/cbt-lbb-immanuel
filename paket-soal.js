/* ========================================= */
/* DATABASE PAKET SOAL (DENGAN KUNCI)        */
/* ========================================= */

var PAKET_SOAL = [
    {
        id: "ujian-sekolah-saintek",
        judul: "Ujian Sekolah - Saintek & Literasi",
        mapel: "Matematika & Fisika",
        waktu: 120, // Durasi 120 menit
        petunjuk: [
            "Berdoalah sebelum mengerjakan ujian.",
            "Pastikan koneksi internet stabil selama ujian.",
            "Dilarang membuka tab lain atau aplikasi lain.",
            "Waktu akan terus berjalan meski aplikasi ditutup.",
            "Gunakan kertas corat-coret untuk perhitungan.",
            "Klik tombol 'Ragu-ragu' jika belum yakin dengan jawaban.",
            "Periksa kembali semua jawaban sebelum klik 'Selesai'.",
            "Jawaban akan tersimpan secara otomatis setiap kali Anda memilih opsi.",
            "Jika terjadi kendala teknis, segera hubungi pengawas.",
            "Sistem akan mengunci otomatis jika waktu habis.",
            "Ujian ini terdiri dari soal Pilihan Ganda dan Kompleks."
        ],
        soal: [
            // --- SOAL 1: PG ---
            {
                id: 1,
                tipe: 'pg',
                stimulus: {
                    tampil: true,
                    konten: `<h3>Efek Fotolistrik</h3><p>Energi kinetik maksimum: $E_{k} = hf - W$</p>`
                },
                pertanyaan: "Jika tetapan Planck $6,6 \\times 10^{-34}$ Js, fungsi kerja $3,2 \\times 10^{-19}$ J, frekuensi $8 \\times 10^{14}$ Hz. Berapa $E_k$?",
                opsi: [
                    "$2,08 \\times 10^{-19}$ Joule", // A (Benar: 6.6e-34 * 8e14 - 3.2e-19 = 5.28 - 3.2 = 2.08)
                    "$5,28 \\times 10^{-19}$ Joule",
                    "$1,08 \\times 10^{-18}$ Joule",
                    "$4,40 \\times 10^{-19}$ Joule",
                    "$3,30 \\times 10^{-19}$ Joule"
                ],
                kunci: 'A', // KUNCI JAWABAN
                ragu: false
            },

            // --- SOAL 2: PG ---
            {
                id: 2,
                tipe: 'pg',
                stimulus: {
                    tampil: true,
                    konten: `<h3>Konstruksi Jembatan</h3><p>Segitiga sama kaki, alas 10m, sudut puncak 60 derajat.</p>`
                },
                pertanyaan: "Berapakah panjang sisi miring ($x$)?",
                opsi: [
                    "$10$ meter", // A (Segitiga sama kaki dengan sudut puncak 60 derajat adalah segitiga sama sisi)
                    "$5\\sqrt{3}$ meter",
                    "$10\\sqrt{2}$ meter",
                    "$10\\sqrt{3}$ meter",
                    "$20$ meter"
                ],
                kunci: 'A', 
                ragu: false
            },

            // --- SOAL 3: PGK (CHECKBOX) ---
            {
                id: 3,
                tipe: 'pgk', 
                stimulus: {
                    tampil: true,
                    konten: `<h3>Data Percobaan Laju Reaksi</h3><p>Data konsentrasi NO dan Br2 terhadap Laju.</p>`
                },
                pertanyaan: "Manakah pernyataan yang BENAR? (Pilih lebih dari satu)",
                opsi: [
                    "Orde reaksi terhadap $[NO]$ adalah 2.", // 0 (Benar)
                    "Orde reaksi terhadap $[Br_2]$ adalah 1.", // 1 (Benar)
                    "Persamaan laju reaksinya adalah $v = k [NO][Br_2]$.", // 2 (Salah)
                    "Nilai tetapan laju reaksi $k = 1200$.", // 3 (Benar)
                    "Jika konsentrasi naik 2x, laju naik 8x." // 4 (Benar: 2^2 * 2^1 = 8)
                ],
                // Kunci berupa Array Index (0, 1, 3, 4 benar)
                kunci: ['0', '1', '3', '4'], 
                ragu: false
            },

            // --- SOAL 4: PG (LIMIT) ---
            {
                id: 4,
                tipe: 'pg',
                stimulus: { tampil: false },
                pertanyaan: "$$ \\lim_{x \\to 0} \\frac{x^2 \\sqrt{4-x} + \\tan^2(2x)}{\\sin(x) \\cdot \\tan(4x)} $$",
                opsi: [
                    "$\\frac{1}{2}$",
                    "$1$",
                    "$2$",
                    "$\\frac{5}{4}$", // D (Jawabannya 5/4)
                    "$\\infty$"
                ],
                kunci: 'D',
                ragu: false
            },

            // --- SOAL 5: PGK-KATEGORI (BENAR-SALAH) ---
            {
                id: 5,
                tipe: 'pgk-kategori',
                stimulus: { tampil: false },
                pertanyaan: "Matriks A dan B. Tentukan kebenaran pernyataan berikut!",
                opsi: [
                    "Determinan matriks A adalah $|A| = 2$.", 
                    "Hasil perkalian $A \\times B$ adalah $\\begin{pmatrix} -2 & 9 \\\\ -4 & 23 \\end{pmatrix}$.",
                    "Invers matriks A adalah benar."
                ],
                // Kunci Object: Indeks Baris -> 'B' atau 'S'
                // Det A = (2)(3)-(1)(4) = 6-4=2 (Benar)
                // A x B ... (Anggap Benar)
                // Invers ... (Anggap Salah)
                kunci: { '0': 'B', '1': 'B', '2': 'S' },
                ragu: false
            }
        ]
    },
    {
        id: "akm-literasi-profesional",
        judul: "Simulasi AKM Literasi - Paket Utama",
        mapel: "Literasi Membaca",
        waktu: 120,
        petunjuk: [
            "Berdoalah sebelum mengerjakan ujian.",
            "Stimulus teks dalam ujian ini cukup panjang, bacalah dengan teknik 'scanning' untuk menemukan poin penting.",
            "Terdapat tiga tipe soal: Pilihan Ganda (satu jawaban), Pilihan Ganda Kompleks (lebih dari satu), dan Menjodohkan/Kategori (Benar-Salah).",
            "Gunakan waktu secara efisien, jangan terpaku terlalu lama pada satu teks.",
            "Pastikan Anda mengklik tombol 'Selesai' di nomor terakhir untuk mengirim jawaban."
        ],
        soal: [
            // --- STIMULUS 1: TEKS INFORMASI (SAINS & LINGKUNGAN) - Soal 1-7 ---
            {
                id: 1, tipe: 'pg',
                stimulus: { 
                    tampil: true, 
                    konten: `<h3>Masa Depan Terumbu Karang di Tengah Pemanasan Global</h3>
                             <p>Terumbu karang sering disebut sebagai "hutan hujan laut" karena keanekaragaman hayatinya yang luar biasa. Meskipun hanya mencakup kurang dari 1% dasar laut, mereka menampung lebih dari 25% semua spesies laut. Namun, ekosistem vital ini berada dalam ancaman serius akibat perubahan iklim, khususnya pemanasan suhu laut yang memicu fenomena pemutihan karang (coral bleaching).</p>
                             <p>Ketika suhu air laut naik, karang menjadi stres dan mengeluarkan alga simbiotik bernama <i>zooxanthellae</i> yang hidup di jaringan mereka. Alga inilah yang memberikan warna cerah pada karang dan menyediakan sebagian besar energi melalui fotosintesis. Tanpa alga ini, karang berubah menjadi putih pucat dan mulai kelaparan. Jika suhu tidak segera kembali normal, karang akan mati secara massal, yang berdampak buruk pada ekonomi pesisir, pariwisata, dan ketahanan pangan global.</p>
                             <p>Data terbaru menunjukkan bahwa sejak tahun 2014, dunia telah mengalami pemutihan karang global terpanjang dan paling merusak yang pernah tercatat. Di Great Barrier Reef, Australia, lebih dari 30% karang mati hanya dalam satu kali gelombang panas laut. Upaya konservasi kini beralih ke teknologi transplantasi karang tahan panas dan rehabilitasi ekosistem secara masif.</p>` 
                },
                pertanyaan: "Berdasarkan teks tersebut, apa penyebab utama karang berubah menjadi putih pucat?",
                opsi: [
                    "Kekurangan pasokan makanan dari ikan di sekitarnya",
                    "Pelepasan alga zooxanthellae akibat stres suhu",
                    "Polusi limbah plastik yang menutupi permukaan karang",
                    "Kurangnya sinar matahari yang menembus dasar laut",
                    "Pertumbuhan populasi predator karang yang tidak terkendali"
                ],
                kunci: 'B', ragu: false
            },
            {
                id: 2, tipe: 'pgk',
                stimulus: { tampil: true, konten: "<h3>Masa Depan Terumbu Karang...</h3>" },
                pertanyaan: "Manakah dampak negatif dari kematian terumbu karang secara massal menurut teks? (Pilih lebih dari satu)",
                opsi: [
                    "Menurunnya ketahanan pangan masyarakat pesisir",
                    "Meningkatnya suhu permukaan air laut secara drastis",
                    "Terganggunya sektor pariwisata bahari",
                    "Hilangnya habitat bagi 25% spesies laut",
                    "Mempercepat proses fotosintesis alga di laut"
                ],
                kunci: ['0', '2', '3'], ragu: false
            },
            {
                id: 3, tipe: 'pgk-kategori',
                stimulus: { tampil: true, konten: "<h3>Masa Depan Terumbu Karang...</h3>" },
                pertanyaan: "Tentukan kebenaran pernyataan berikut berdasarkan teks informasi di atas!",
                opsi: [
                    "Terumbu karang mencakup sebagian besar dasar laut bumi.",
                    "Zooxanthellae memberikan energi bagi karang melalui fotosintesis.",
                    "Great Barrier Reef kehilangan 50% karang sejak tahun 2014."
                ],
                kunci: { '0': 'S', '1': 'B', '2': 'S' }, ragu: false
            },
            {
                id: 4, tipe: 'pg',
                stimulus: { tampil: true, konten: "<h3>Masa Depan Terumbu Karang...</h3>" },
                pertanyaan: "Apa peran utama alga <i>zooxanthellae</i> bagi karang?",
                opsi: ["Pelindung dari predator", "Penyedia oksigen tambahan", "Penyedia energi dan pemberi warna", "Alat untuk menempel di dasar laut"],
                kunci: 'C', ragu: false
            },
            {
                id: 5, tipe: 'pg',
                stimulus: { tampil: true, konten: "<h3>Masa Depan Terumbu Karang...</h3>" },
                pertanyaan: "Mengapa terumbu karang dijuluki sebagai 'hutan hujan laut'?",
                opsi: ["Karena warnanya hijau", "Karena tumbuh di air hujan", "Karena keanekaragaman hayatinya tinggi", "Karena ukurannya yang sangat besar"],
                kunci: 'C', ragu: false
            },
            {
                id: 6, tipe: 'pgk',
                stimulus: { tampil: true, konten: "<h3>Masa Depan Terumbu Karang...</h3>" },
                pertanyaan: "Upaya apa yang dilakukan untuk menyelamatkan karang menurut teks? (Pilih dua)",
                opsi: ["Transplantasi karang tahan panas", "Mengurangi kadar garam laut", "Rehabilitasi ekosistem secara masif", "Menutup akses pariwisata selamanya"],
                kunci: ['0', '2'], ragu: false
            },
            {
                id: 7, tipe: 'pg',
                stimulus: { tampil: true, konten: "<h3>Masa Depan Terumbu Karang...</h3>" },
                pertanyaan: "Apa simpulan utama dari paragraf terakhir teks tersebut?",
                opsi: ["Suhu laut sudah kembali normal", "Upaya teknologi mulai digunakan untuk konservasi", "Australia adalah negara paling terdampak", "Konservasi karang tidak mungkin dilakukan lagi"],
                kunci: 'B', ragu: false
            },

            // --- STIMULUS 2: TEKS FIKSI (NARRATIVE/CERPEN) - Soal 8-14 ---
            {
                id: 8, tipe: 'pg',
                stimulus: { 
                    tampil: true, 
                    konten: `<h3>Lentera di Tepian Zaman</h3>
                             <p>Kakek tua itu, Pak Dahlan, masih setia menekuni bilah-bilah bambu di teras rumahnya yang mulai reyot. Di saat anak muda desa lebih asyik menatap layar persegi yang bercahaya, Pak Dahlan justru sibuk merangkai anyaman yang hampir terlupakan: kurungan ayam hias. "Ini bukan sekadar wadah ayam, Nak," ujarnya kepada cucunya, Aris, yang sedang sibuk memotret untuk media sosialnya.</p>
                             <p>"Dulu, setiap rumah di desa ini punya lentera hati yang diwujudkan dalam anyaman. Kita menghargai proses, bukan sekadar hasil instan," lanjutnya sambil jemarinya yang keriput namun lincah menyisipkan selembar bambu tipis. Aris terdiam. Ia melihat tangan kakeknya yang penuh luka goresan kecil—saksi bisu kesetiaan pada tradisi yang kini tergerus zaman.</p>
                             <p>Suatu sore, seorang kolektor dari kota datang. Ia menawarkan harga fantastis untuk seluruh stok anyaman Pak Dahlan. Namun, Pak Dahlan menolak. "Saya ingin anyaman ini dipakai oleh orang desa, agar mereka ingat siapa mereka sebenarnya, bukan berakhir di lemari pajangan orang kaya sebagai simbol kemewahan yang sunyi." Aris mulai menyadari bahwa kakeknya sedang menjaga marwah desa, bukan sekadar mencari rupiah.</p>`
                },
                pertanyaan: "Apa konflik batin yang dialami oleh tokoh Aris dalam cerita tersebut?",
                opsi: [
                    "Keinginan untuk menjual anyaman kakeknya ke kota",
                    "Pertentangan antara gaya hidup modern dengan tradisi kakeknya",
                    "Kesedihan melihat rumah kakeknya yang sudah reyot",
                    "Ketakutan akan luka goresan yang dialami kakeknya",
                    "Rasa malu karena kakeknya hanya seorang penganyam"
                ],
                kunci: 'B', ragu: false
            },
            {
                id: 9, tipe: 'pgk',
                stimulus: { tampil: true, konten: "<h3>Lentera di Tepian Zaman</h3>" },
                pertanyaan: "Manakah pernyataan yang menggambarkan watak Pak Dahlan? (Pilih lebih dari satu)",
                opsi: [
                    "Teguh pendirian dalam menjaga prinsip",
                    "Sangat mencintai keuntungan materi",
                    "Peduli pada identitas budaya masyarakatnya",
                    "Mudah terpengaruh oleh tawaran orang kota",
                    "Tekun dan sabar dalam bekerja"
                ],
                kunci: ['0', '2', '4'], ragu: false
            },
            {
                id: 10, tipe: 'pgk-kategori',
                stimulus: { tampil: true, konten: "<h3>Lentera di Tepian Zaman</h3>" },
                pertanyaan: "Pasangkan pernyataan berikut dengan kesesuaian isi cerpen!",
                opsi: [
                    "Anak muda desa lebih memilih gadget daripada menganyam.",
                    "Pak Dahlan menjual anyamannya dengan harga fantastis.",
                    "Luka di tangan Pak Dahlan adalah tanda kerja kerasnya."
                ],
                kunci: { '0': 'B', '1': 'S', '2': 'B' }, ragu: false
            },
            {
                id: 11, tipe: 'pg',
                stimulus: { tampil: true, konten: "<h3>Lentera di Tepian Zaman</h3>" },
                pertanyaan: "Apa makna simbolis dari 'Lentera Hati' dalam percakapan Pak Dahlan?",
                opsi: ["Lampu penerang rumah", "Ketulusan dalam berkarya", "Kekayaan yang tersembunyi", "Api unggun di desa"],
                kunci: 'B', ragu: false
            },
            {
                id: 12, tipe: 'pg',
                stimulus: { tampil: true, konten: "<h3>Lentera di Tepian Zaman</h3>" },
                pertanyaan: "Mengapa Pak Dahlan menolak tawaran kolektor kota?",
                opsi: ["Harganya kurang mahal", "Ia tidak suka orang kota", "Ia ingin karyanya bermakna bagi warga desa", "Ia ingin menyimpan semua anyamannya sendiri"],
                kunci: 'C', ragu: false
            },
            {
                id: 13, tipe: 'pgk',
                stimulus: { tampil: true, konten: "<h3>Lentera di Tepian Zaman</h3>" },
                pertanyaan: "Latar tempat yang muncul dalam cerita adalah... (Pilih dua)",
                opsi: ["Teras rumah", "Lemari pajangan", "Kota besar", "Desa"],
                kunci: ['0', '3'], ragu: false
            },
            {
                id: 14, tipe: 'pg',
                stimulus: { tampil: true, konten: "<h3>Lentera di Tepian Zaman</h3>" },
                pertanyaan: "Bagaimana perubahan sikap Aris di akhir cerita?",
                opsi: ["Makin asyik dengan gadget", "Mulai memahami nilai tradisi kakeknya", "Marah karena kakeknya menolak uang", "Pergi meninggalkan kakeknya"],
                kunci: 'B', ragu: false
            },

            // --- STIMULUS 3: TEKS INFORMASI (SOSIAL/EKONOMI) - Soal 15-20 ---
            {
                id: 15, tipe: 'pg',
                stimulus: { 
                    tampil: true, 
                    konten: `<h3>Fenomena <i>Fear of Missing Out</i> (FOMO) di Era Digital</h3>
                             <p>FOMO atau rasa takut ketinggalan momen berharga adalah fenomena psikologis yang kian marak di era media sosial. Individu yang mengalami FOMO cenderung merasa cemas ketika melihat orang lain bersenang-senang atau mencapai sesuatu di dunia maya. Hal ini memicu perilaku konsumtif dan ketergantungan pada gawai yang berlebihan.</p>
                             <p>Sebuah studi menunjukkan bahwa penggunaan media sosial lebih dari tiga jam sehari berkorelasi tinggi dengan tingkat kecemasan sosial. Ironisnya, alih-alih merasa terhubung, banyak pengguna justru merasa lebih terisolasi. Tekanan untuk selalu tampil sempurna dan mengikuti tren terbaru dapat menguras kesehatan mental serta stabilitas finansial seseorang.</p>`
                },
                pertanyaan: "Apa dampak psikologis utama dari fenomena FOMO menurut teks?",
                opsi: ["Rasa bangga yang berlebihan", "Kecemasan sosial dan rasa terisolasi", "Peningkatan produktivitas kerja", "Kemampuan berkomunikasi yang lebih baik"],
                kunci: 'B', ragu: false
            },
            {
                id: 16, tipe: 'pgk',
                stimulus: { tampil: true, konten: "<h3>Fenomena FOMO...</h3>" },
                pertanyaan: "Ciri-ciri seseorang yang terkena FOMO adalah... (Pilih lebih dari satu)",
                opsi: ["Selalu ingin mengikuti tren terbaru", "Merasa tenang saat tidak membuka HP", "Perilaku belanja yang impulsif", "Ketergantungan pada validasi di media sosial"],
                kunci: ['0', '2', '3'], ragu: false
            },
            {
                id: 17, tipe: 'pgk-kategori',
                stimulus: { tampil: true, konten: "<h3>Fenomena FOMO...</h3>" },
                pertanyaan: "Tentukan kebenaran informasi berikut mengenai FOMO!",
                opsi: ["Media sosial adalah pemicu utama FOMO.", "FOMO hanya dialami oleh anak kecil.", "Penggunaan gadget yang bijak dapat mengurangi FOMO."],
                kunci: { '0': 'B', '1': 'S', '2': 'B' }, ragu: false
            },
            {
                id: 18, tipe: 'pg',
                stimulus: { tampil: true, konten: "<h3>Fenomena FOMO...</h3>" },
                pertanyaan: "Apa hubungan antara media sosial dan isolasi sosial menurut teks?",
                opsi: ["Media sosial selalu membuat orang berteman", "Banyak pengguna justru merasa terisolasi meskipun terhubung secara digital", "Media sosial menghapus rasa kesepian", "Tidak ada hubungan sama sekali"],
                kunci: 'B', ragu: false
            },
            {
                id: 19, tipe: 'pg',
                stimulus: { tampil: true, konten: "<h3>Fenomena FOMO...</h3>" },
                pertanyaan: "Berapa lama waktu penggunaan medsos yang mulai dianggap berisiko kecemasan?",
                opsi: ["1 jam", "2 jam", "Lebih dari 3 jam", "Sepanjang hari"],
                kunci: 'C', ragu: false
            },
            {
                id: 20, tipe: 'pgk',
                stimulus: { tampil: true, konten: "<h3>Fenomena FOMO...</h3>" },
                pertanyaan: "Apa yang bisa dikuras oleh perilaku FOMO? (Pilih dua)",
                opsi: ["Kesehatan mental", "Kekuatan otot", "Stabilitas finansial", "Kualitas tidur"],
                kunci: ['0', '2'], ragu: false
            },

            // --- SOAL NON-STIMULUS: PENGETAHUAN UMUM LITERASI - Soal 21-25 ---
            {
                id: 21, tipe: 'pg', stimulus: { tampil: false },
                pertanyaan: "Penulisan kalimat berikut yang memenuhi kaidah bahasa Indonesia yang benar adalah...",
                opsi: ["Ayah membeli jeruk bali di pasar.", "Ayah membeli Jeruk Bali di pasar.", "Ayah membeli jeruk Bali di pasar.", "Ayah membeli Jeruk bali di pasar."],
                kunci: 'A', ragu: false
            },
            {
                id: 22, tipe: 'pg', stimulus: { tampil: false },
                pertanyaan: "Makna istilah 'Inflasi' dalam bidang ekonomi secara sederhana adalah...",
                opsi: ["Kenaikan harga barang secara umum", "Penurunan nilai mata uang asing", "Pertumbuhan jumlah penduduk", "Peningkatan ekspor barang"],
                kunci: 'A', ragu: false
            },
            {
                id: 23, tipe: 'pgk', stimulus: { tampil: false },
                pertanyaan: "Manakah yang merupakan kelompok kata baku? (Pilih dua)",
                opsi: ["Izin dan Nasihat", "Praktek dan Analisa", "Kualitas dan Jadwal", "Resiko dan Sistim"],
                kunci: ['0', '2'], ragu: false
            },
            {
                id: 24, tipe: 'pgk-kategori', stimulus: { tampil: false },
                pertanyaan: "Tentukan kebenaran penggunaan tanda baca berikut!",
                opsi: [
                    "Penggunaan tanda koma sebelum kata 'tetapi' adalah wajib.",
                    "Tanda titik dua digunakan setelah kata 'adalah'.",
                    "Nama gelar dipisahkan dari nama asli dengan tanda koma."
                ],
                kunci: { '0': 'B', '1': 'S', '2': 'B' }, ragu: false
            },
            {
                id: 25, tipe: 'pg', stimulus: { tampil: false },
                pertanyaan: "Tujuan utama dari sebuah teks persuasif adalah untuk...",
                opsi: ["Menceritakan pengalaman lucu", "Menggambarkan suatu benda secara detail", "Mempengaruhi pembaca agar melakukan sesuatu", "Menjelaskan langkah-langkah membuat makanan"],
                kunci: 'C', ragu: false
            }
        ]
    }
];


