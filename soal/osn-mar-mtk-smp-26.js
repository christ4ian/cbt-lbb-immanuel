/* ========================================================== */
/* DATABASE SOAL OSN-K MATEMATIKA SMP 2026                    */
/* ========================================================== */

PAKET_SOAL.push({
    id: "osn-mar-mtk-smp-26",
    judul: "Try Out OSN-K Matematika SMP 2026",
    mapel: "Matematika",
    waktu: 150,
    
    // Konfigurasi fitur poin
    sistem_poin: true,
    base_poin: 100,
    
    petunjuk: [
        "Soal penilaian OSN-K terdiri dari 25 (dua puluh lima) butir pilihan jamak dengan empat opsi jawaban.",
        "Setiap jawaban benar diberi nilai 4 (empat), setiap jawaban salah atau setiap soal yang tidak dijawab diberi nilai 0 (nol).",
        "Total nilai adalah empat kali banyak jawaban benar.",
        "Total nilai OSN-K maksimum adalah 100.",
        "Penilaian menggunakan sistem aplikasi yang sudah dibuat oleh panitia pusat.",
        "Penentuan peringkat mengacu pada mekanisme yang sudah ditetapkan.",
        "Peserta yang lolos ke OSN-P adalah peserta dengan skor tertinggi yang menduduki peringkat 1 (satu) sampai 5 (lima) di setiap Kabupaten/Kota dengan 1 sekolah maksimum 2 peserta yang lolos.",
        "Pemeringkatan didasarkan pada total nilai peserta.",
        "Jika pada tahap pemeringkatan masih terdapat nilai yang sama, maka penentuan pemenang didasarkan pada jumlah jawaban salah paling sedikit.",
        "Jika masih terdapat nilai yang sama, maka penentuan pemenang didasarkan pada jawaban benar untuk soal sulit paling banyak.",
        "Jika masih terdapat nilai yang sama, maka penentuan pemenang didasarkan pada jawaban benar untuk soal sedang paling banyak.",
        "Jika masih terdapat nilai yang sama, maka penentuan pemenang didasarkan pada kelas yang lebih rendah.",
        "Jika masih terdapat nilai yang sama, maka penentuan pemenang didasarkan pada usia yang lebih muda.",
        "Keputusan juri bersifat mutlak dan tidak dapat diganggu gugat."
    ],

    soal: [
        {
            id: 1,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diketahui $x$, $y$, dan $z$ adalah bilangan bulat positif yang memenuhi persamaan berikut:<br><br>$$x+\\frac{1}{y+\\frac{1}{z}}=\\frac{30}{7}$$<br><br>Nilai dari $x\\times y\\times z$ adalah ....",
            opsi: [
                "12",
                "18",
                "24",
                "30"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 2,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diketahui $p$ adalah suatu bilangan prima. Jika nilai dari $p^{2}+72$ merupakan kuadrat dari suatu bilangan asli, maka jumlah dari semua nilai $p$ yang mungkin memenuhi syarat tersebut adalah...",
            opsi: [
                "10",
                "17",
                "24",
                "27"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 3,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Sebuah kubus padat yang terbuat dari kayu memiliki panjang rusuk 12 cm. Kubus tersebut dipotong pada setiap titik sudutnya. Pemotongan dilakukan melalui sebuah bidang datar yang menghubungkan titik-titik tengah dari tiga rusuk yang bertemu pada titik sudut tersebut. Ilustrasi pemotongan untuk salah satu sudut dapat dilihat pada gambar di bawah ini.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-smp-mtk-2026-soal3.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Berapakah volume bangun ruang kayu yang tersisa setelah semua kedelapan sudutnya dipotong dengan cara yang sama?",
            opsi: [
                "$1.440~cm^{3}$",
                "$1.296~cm^{3}$",
                "$1.178~cm^{3}$",
                "$1.152~cm^{3}$"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 4,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Sebuah PIN koper terdiri dari 5 digit angka yang dipilih dari angka 0 hingga 9. Jika kombinasi angka tersebut ditebak secara acak, peluang bahwa PIN yang ditebak tersebut memuat setidaknya 3 angka genap yang posisinya saling berurutan adalah...",
            opsi: [
                "$\\frac{1}{8}$",
                "$\\frac{1}{4}$",
                "$\\frac{3}{16}$",
                "$\\frac{5}{16}$"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 5,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Dua buah bilangan bulat positif diketahui memiliki selisih 18 dan Kelipatan Persekutuan Terkecil (KPK) bernilai 168. Jumlah dari kedua bilangan bulat positif tersebut adalah...",
            opsi: [
                "54",
                "60",
                "66",
                "72"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 6,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diketahui sebuah fungsi $f(x)$ dirumuskan sebagai berikut:<br><br>$$f(x)=\\frac{3x^{5}-2x^{3}+x}{x^{2}+1}+\\frac{2026}{5^{x}+1}-13$$<br><br>Maka nilai dari $f(2)+f(1)+f(-1)+f(-2)$ adalah ....",
            opsi: [
                "2000",
                "2026",
                "4000",
                "4052"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 7,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diberikan sebuah segitiga PQR. Titik A, B, dan C terletak berturut-turut pada sisi QR, RP, dan PQ sedemikian rupa sehingga perbandingan $QA:AR=RB:BP=PC:CQ=2:5$. Titik K, M, dan N berturut-turut adalah titik potong antara garis PA dan QB, garis QB dan RC, serta garis RC dan PA. Jika luas segitiga KMN yang terbentuk di bagian dalam tersebut adalah 54 $cm^{2}$, berapakah luas segitiga PQR secara keseluruhan?",
            opsi: [
                "$234~cm^{2}$",
                "$196~cm^{2}$",
                "$156~cm^{2}$",
                "$144~cm^{2}$"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 8,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Sebuah sistem keamanan server komputer berlapis terdiri dari satu buah Firewall Utama dan dua buah Firewall Sekunder. Untuk dapat meretas sistem server tersebut, seorang hacker harus berhasil menembus Firewall Utama terlebih dahulu, dan dilanjutkan dengan berhasil menembus setidaknya satu dari dua Firewall Sekunder yang ada. Asumsikan peluang hacker tersebut untuk menembus sembarang satu buah firewall adalah sama, yaitu sebesar $p$, dan keberhasilan menembus masing-masing firewall adalah kejadian yang saling bebas. Diketahui bahwa peluang hacker tersebut berhasil menembus satu buah firewall adalah $\\frac{25}{16}$ kali lipat dari peluang ia berhasil meretas sistem server secara keseluruhan. Peluang hacker tersebut GAGAL meretas sistem server adalah...",
            opsi: [
                "$\\frac{32}{125}$",
                "$\\frac{3}{5}$",
                "$\\frac{93}{125}$",
                "$\\frac{108}{125}$"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 9,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diketahui tiga bilangan real $x$, $y$, dan $z$ memenuhi persamaan akar berikut:<br><br>$$\\sqrt{x-2024}+\\sqrt{y-2025}+\\sqrt{z-2026}=\\frac{x+y+z-6072}{2}$$<br><br>Berdasarkan persamaan tersebut, nilai dari $x+y-z$ adalah...",
            opsi: [
                "2023",
                "2024",
                "2025",
                "2026"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 10,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Jika $x$ adalah bilangan real positif yang memenuhi persamaan kuadrat $x^{2}-5x+1=0$, maka nilai dari $x^{5}+\\frac{1}{x^{5}}$ adalah...",
            opsi: [
                "3125",
                "2575",
                "2530",
                "2525"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 11,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diketahui sebuah segitiga sama sisi ABC dengan panjang sisi 12 cm. Sebuah setengah lingkaran digambar di dalam segitiga tersebut dengan sisi BC sebagai diameternya. Busur setengah lingkaran tersebut memotong sisi AB di titik D dan memotong sisi AC di titik E.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-smp-mtk-2026-soal11.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Luas daerah yang diarsir (daerah di dalam segitiga ADE yang dibatasi oleh busur DE) adalah...",
            opsi: [
                "$18\\sqrt{3}-6\\pi~cm^{2}$",
                "$18\\sqrt{3}-9\\pi~cm^{2}$",
                "$36\\sqrt{3}-6\\pi~cm^{2}$",
                "$36\\sqrt{3}-12\\pi~cm^{2}$"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 12,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Sebuah persegi panjang ABCD memiliki garis diagonal BD. Pada bangun tersebut, diletakkan 24 titik berbeda dengan rincian sebagai berikut: 4 titik sudut (A, B, C, D), 5 titik tambahan pada sisi AB, 4 titik tambahan pada sisi BC, 3 titik tambahan pada sisi CD, 2 titik tambahan pada sisi DA, dan 6 titik tambahan pada diagonal BD. Diasumsikan tidak ada tiga titik yang segaris selain titik-titik yang terletak pada ruas garis yang sama tersebut. Banyaknya segitiga yang dapat dibentuk dari ke-24 titik tersebut adalah...",
            opsi: [
                "1899",
                "1925",
                "2024",
                "2149"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 13,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diberikan sebuah bilangan real $x$ yang memenuhi persamaan:<br><br>$$x=\\frac{2\\sqrt{5}+3\\sqrt{2}}{2\\sqrt{5}-3\\sqrt{2}}$$<br><br>Nilai dari bentuk aljabar $x^{2}-38x+2026$ adalah ....",
            opsi: [
                "2024",
                "2025",
                "2026",
                "$2025+6\\sqrt{10}$"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 14,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Sebuah suku banyak berderajat tiga $P(x)$ diketahui memenuhi nilai $P(1)=1$, $P(2)=2$, $P(3)=15$, dan $P(4)=58$. Nilai dari $P(5)$ adalah...",
            opsi: [
                "112",
                "128",
                "149",
                "165"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 15,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Sebuah balok kayu berukuran panjang $p$, lebar $l$, dan tinggi $t$ memiliki volume awal $V$. Dari balok tersebut, seorang pengrajin melakukan dua rancangan modifikasi yang berbeda:<br>• Rancangan A: Panjangnya diperbesar 20%, lebarnya diperkecil 20%, dan tingginya diperbesar 25%, menghasilkan volume $V_{A}$.<br>• Rancangan B: Panjangnya diperkecil 20%, lebarnya diperbesar 20%, dan tingginya diperkecil 25%, menghasilkan volume $V_{B}$.<br>Berdasarkan kedua rancangan tersebut, perbandingan volume $V_{A}$ terhadap volume $V_{B}$ adalah...",
            opsi: [
                "4:3",
                "5:3",
                "16:9",
                "25:9"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 16,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Dari 200 siswa di sebuah SMP, dilakukan pendataan mengenai keikutsertaan pada tiga kegiatan ekstrakurikuler unggulan, yaitu Olimpiade Matematika, Robotika, dan Catur. Diperoleh data sebagai berikut:<br>• 90 siswa mengikuti klub Olimpiade Matematika.<br>• 80 siswa mengikuti klub Robotika.<br>• 65 siswa mengikuti klub Catur.<br>Jika diketahui terdapat tepat 35 siswa yang mengikuti tepat dua dari ketiga klub tersebut, dan 10 siswa mengikuti ketiga klub tersebut sekaligus, maka banyak siswa yang tidak mengikuti satu pun dari ketiga ekstrakurikuler tersebut adalah...",
            opsi: [
                "15 siswa",
                "20 siswa",
                "25 siswa",
                "35 siswa"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 17,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Banyaknya faktor pembagi positif dari bilangan $18^{2026}$ yang merupakan kelipatan 18, tetapi bukan kelipatan 54 adalah...",
            opsi: [
                "1013",
                "2025",
                "2026",
                "4052"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 18,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diketahui bilangan real $x, y, z \\neq 0$ yang memenuhi persamaan $x+y+z=0$. Nilai dari bentuk pecahan aljabar berikut adalah...<br><br>$$\\frac{x^{4}+y^{4}+z^{4}}{(x^{2}+y^{2}+z^{2})^{2}}$$",
            opsi: [
                "2",
                "1",
                "$\\frac{1}{4}$",
                "$\\frac{1}{2}$"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 19,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Berapa banyak tripel bilangan bulat $(x, y, z)$ yang memenuhi pertidaksamaan $x+y+z \\le 33$, jika disyaratkan bahwa $x \\ge 2$, $y \\ge 4$, dan $z \\ge 6$?",
            opsi: [
                "1771",
                "2024",
                "2025",
                "2300"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 20,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Sebuah kotak berisi 20 kartu yang masing-masing diberi nomor 1 hingga 20. Jika diambil dua kartu secara acak sekaligus dari dalam kotak tersebut, berapakah peluang selisih angka pada kedua kartu tersebut adalah bilangan kelipatan 3?",
            opsi: [
                "$\\frac{3}{10}$",
                "$\\frac{1}{3}$",
                "$\\frac{7}{20}$",
                "$\\frac{2}{5}$"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 21,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Bilangan bulat positif $n$ disebut sebagai bilangan \"PENTAGRAM\" jika $n^{2}$ dapat dinyatakan sebagai hasil penjumlahan dari lima bilangan ganjil positif yang berurutan. Banyaknya bilangan PENTAGRAM yang nilainya kurang dari 100 adalah...",
            opsi: [
                "10",
                "15",
                "20",
                "25"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 22,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diketahui $x$ dan $y$ adalah bilangan bulat positif yang memenuhi persamaan:<br><br>$$\\frac{3}{x}+\\frac{4}{y}=\\frac{1}{12}$$<br><br>Jika disyaratkan bahwa $x \\neq y$, maka nilai terkecil yang mungkin untuk hasil penjumlahan $x+y$ adalah...",
            opsi: [
                "166",
                "168",
                "170",
                "175"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 23,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diberikan sebuah setengah lingkaran besar dengan diameter $AB=60$ cm dan titik pusat O. Di dalam setengah lingkaran tersebut, digambar dua buah setengah lingkaran identik yang saling bersinggungan di titik O, dengan diameter masing-masing AO dan OB. Di ruang kosong yang terbentuk di antara ketiga busur setengah lingkaran tersebut, diletakkan sebuah lingkaran penuh kecil berwarna abu-abu yang bersinggungan dengan ketiga setengah lingkaran tersebut.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-smp-mtk-2026-soal23.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Jari-jari lingkaran kecil tersebut adalah...",
            opsi: [
                "5 cm",
                "7,5 cm",
                "10 cm",
                "12 cm"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 24,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Sebuah robot penjelajah bergerak pada bidang grid koordinat dari titik (0,0) menuju titik (4,4). Robot tersebut diprogram untuk hanya dapat bergerak dari titik $(x, y)$ menuju titik $(x+1,y)$, $(x,y+1)$, atau $(x+1,y+1)$ pada setiap langkahnya. Diketahui terdapat sebuah lubang hitam di koordinat (2, 2) sehingga robot sama sekali tidak boleh melewati titik tersebut. Banyaknya rute berbeda yang dapat ditempuh robot adalah...",
            opsi: [
                "152",
                "169",
                "286",
                "321"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 25,
            tipe: 'pg',
            poin: 4,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Sebuah himpunan data terdiri dari 11 bilangan bulat positif yang semuanya berbeda. Diketahui rata-rata (mean) dari himpunan data tersebut adalah 42 dan mediannya adalah 35. Berapakah nilai terkecil yang mungkin untuk jangkauan (range) dari himpunan data tersebut?",
            opsi: [
                "21",
                "24",
                "26",
                "28"
            ],
            kunci: 'C',
            ragu: false
        }
    ]
});
