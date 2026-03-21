/* ========================================================== */
/* DATABASE SOAL DEMO FITUR POIN KHUSUS                       */
/* ========================================================== */

PAKET_SOAL.push({
    id: "osn-mar-mtk-sd-26",
    judul: "Try Out OSN-K Matematika SD 2026",
    mapel: "Matematika",
    waktu: 60,
    
    // Konfigurasi fitur baru
    sistem_poin: true,
    
    petunjuk: [
        "Penilaian soal pilihan jamak mengikuti aturan sebagai berikut:<br><span style='margin-left: 15px; display: inline-block;'>i. Jika jawaban benar = poin + 1</span><br><span style='margin-left: 15px; display: inline-block;'>ii. Jika jawaban salah atau tidak menjawab = poin 0</span>",
        "Penilaian OSN-K juga menggunakan pembobotan berdasarkan tingkat kesulitan soal. Tabel bobot tingkat kesulitan sebagai berikut:<br><table><tr><th style='text-align:center;'>No.</th><th>Jenis Soal</th><th style='text-align:center;'>Jumlah</th><th style='text-align:center;'>Bobot</th></tr><tr><td style='text-align:center;'>1.</td><td>Mudah</td><td style='text-align:center;'>8 soal</td><td style='text-align:center;'>1,00</td></tr><tr><td style='text-align:center;'>2.</td><td>Sedang</td><td style='text-align:center;'>14 soal</td><td style='text-align:center;'>1,25</td></tr><tr><td style='text-align:center;'>3.</td><td>Sulit</td><td style='text-align:center;'>8 soal</td><td style='text-align:center;'>1,50</td></tr></table>",
        "Nilai akhir sama dengan jumlah dari jawaban benar tiap jenis soal dikali bobot. Nilai Akhir akan dijadikan dasar pemeringkatan untuk menentukan peserta yang akan lolos ke Tingkat Provinsi.",
        "Nilai akhir maksimum yang dapat diperoleh peserta adalah 37,5.",
        "Pemeringkatan didasarkan pada nilai akhir peserta.",
        "Jika pada tahap pemeringkatan masih terdapat nilai yang sama, maka penentuan pemenang didasarkan pada jawaban benar untuk soal sulit paling banyak.",
        "Jika masih terdapat nilai yang sama, maka penentuan pemenang didasarkan pada jawaban benar untuk soal sedang paling banyak.",
        "Jika masih terdapat nilai yang sama, maka penentuan pemenang didasarkan pada jawaban benar untuk soal mudah paling banyak.",
        "Jika masih terdapat total nilai yang sama, maka pemenang ditentukan berdasarkan kelas peserta yang paling rendah.",
        "Jika masih terdapat total nilai yang sama, maka pemenang ditentukan berdasarkan umur peserta yang paling muda.",
        "Keputusan juri bersifat mutlak dan tidak dapat diganggu gugat."
    ],

    soal: [
        {
            id: 1,
            tipe: 'pg',
            poin: 1,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Pada pukul 07.00, sebuah robot kapal selam berada pada kedalaman 120 meter di bawah permukaan laut. Dua jam kemudian, robot tersebut bergerak menyelam lebih dalam sejauh 40 meter. Tiga jam setelah pergerakan pertama, robot tersebut ditarik naik sejauh 55 meter. Waktu dan posisi robot kapal selam tersebut saat ini adalah...",
            opsi: [
                "Pukul 09.00 berada pada posisi 80 meter di bawah permukaan laut",
                "Pukul 10.00 berada pada posisi 105 meter di bawah permukaan laut",
                "Pukul 12.00 berada pada posisi 215 meter di bawah permukaan laut",
                "Pukul 12.00 berada pada posisi 105 meter di bawah permukaan laut"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 2,
            tipe: 'pg',
            poin: 1,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Jika $45\\%$ dari suatu bilangan adalah 135, maka nilai dari $\\frac{3}{5}$ bagian dari bilangan tersebut adalah...",
            opsi: [
                "81",
                "180",
                "225",
                "300"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 3,
            tipe: 'pg',
            poin: 1,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Seorang petani memanen biji kopi basah dari 3 petak kebun miliknya. Petak pertama dan petak kedua masing-masing menghasilkan 4,15 ton biji kopi basah. Petak ketiga menghasilkan 5,2 ton biji kopi basah. Setelah melalui proses penjemuran hingga kering, berat total biji kopi tersebut mengalami penyusutan sebesar $16\\%$. Berat biji kopi kering yang diperoleh petani tersebut adalah .... kg.",
            opsi: [
                "1.134",
                "2.160",
                "7.854",
                "11.340"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 4,
            tipe: 'pg',
            poin: 1,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Bima adalah seorang kolektor kelereng yang sangat rapi. Ia menyimpan seluruh koleksi kelereng kesayangannya ke dalam tiga kotak kayu yang masing-masing berwarna merah, biru, dan hijau. Diketahui perbandingan banyak kelereng pada kotak merah, kotak biru, dan kotak hijau berturut-turut adalah $4:7:5$. Jika saat ini kotak biru berisi 84 butir kelereng, maka jumlah seluruh kelereng yang dimiliki oleh Bima dalam ketiga kotak tersebut adalah ... butir.",
            opsi: [
                "108",
                "132",
                "192",
                "336"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 5,
            tipe: 'pg',
            poin: 1,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Siska berbelanja kue di sebuah toko untuk acara keluarga. Ia membeli 3 kotak kue Lapis Surabaya seharga Rp80.000,00 per kotak, 4 bungkus kue Brownies seharga Rp45.000,00 per bungkus, dan 2 toples kue Putri Salju seharga Rp60.000,00 per toples. Toko tersebut sedang mengadakan promosi dengan memberikan diskon sebesar $25\\%$ khusus untuk kue Lapis Surabaya dan diskon $10\\%$ untuk kue Brownies. Kue Putri Salju tidak mendapatkan diskon. Total uang yang harus dibayar oleh Siska untuk seluruh belanjaannya adalah...",
            opsi: [
                "Rp462.000,00",
                "Rp472.000,00",
                "Rp482.000,00",
                "Rp542.000,00"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 6,
            tipe: 'pg',
            poin: 1,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Sebuah diagram batang menyajikan data berat sampah plastik yang berhasil dikumpulkan oleh siswa SD Pelita selama empat hari berturut-turut dalam rangka program peduli lingkungan.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-mtk-2026-soal6.png\" style=\"width:100%; max-width:500px; border-radius:5px;\"></div><br>Pernyataan yang tepat mengenai data pada diagram batang tersebut adalah...",
            opsi: [
                "Rata-rata berat sampah plastik yang dikumpulkan setiap harinya adalah 20 kg",
                "Selisih berat sampah plastik yang dikumpulkan pada hari Selasa dan Rabu adalah 20 kg",
                "Median dari data pengumpulan sampah plastik tersebut adalah 20 kg",
                "Jumlah seluruh sampah plastik yang dikumpulkan selama empat hari adalah 110 kg"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 7,
            tipe: 'pg',
            poin: 1,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Data nilai ulangan harian Matematika Bagas selama satu semester (sebanyak 12 kali ulangan) adalah sebagai berikut:<br>75, 82, 78, 85, 90, 70, 88, 76, 84, 80, 92, 60<br>Rata-rata nilai ulangan Matematika Bagas tersebut adalah...",
            opsi: [
                "80",
                "81",
                "82",
                "96"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 8,
            tipe: 'pg',
            poin: 1,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Tino memiliki uang sebesar Rp100.000,00 untuk membeli kue donat. Kue donat tersebut dijual dalam kemasan bungkus, di mana setiap bungkus berisi 8 biji kue donat. Harga satu bungkus kue donat tersebut adalah Rp12.000,00. Jumlah maksimal biji kue donat yang dapat dibeli oleh Tino dengan uang tersebut adalah...",
            opsi: [
                "8 biji",
                "56 biji",
                "64 biji",
                "72 biji"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 9,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Sebuah taman wisata memiliki area bermain berbentuk gabungan dari bangun datar belah ketupat dan persegi. Salah satu sisi belah ketupat tersebut berimpit secara sempurna dengan salah satu sisi persegi seperti tampak pada gambar di bawah ini.<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-mtk-2026-soal9.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Diketahui luas area taman yang berbentuk belah ketupat adalah $120~m^{2}$ dan panjang salah satu diagonalnya adalah 10 m. Keliling keseluruhan dari taman wisata tersebut adalah ....",
            opsi: [
                "52 m",
                "78 m",
                "91 m",
                "104 m"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 10,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Rina memiliki 4 buah pigura foto dengan warna bingkai yang berbeda, yaitu merah, kuning, hijau, dan biru. Ia akan memasang satu buah kartu angka ke dalam masing-masing pigura tersebut. Kartu angka yang dapat dipilih adalah kartu yang memuat bilangan faktor dari 48. Jika Rina ingin setiap pigura menampilkan kartu angka yang berbeda, banyak cara Rina menyusun kartu-kartu angka tersebut adalah...",
            opsi: [
                "210 cara",
                "1.680 cara",
                "5.040 cara",
                "10.000 cara"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 11,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Hasil pengerjaan dari $3\\frac{1}{2}\\times1,2-4\\frac{4}{5}\\div1,6+2\\frac{1}{4}$ adalah ....",
            opsi: [
                "1,95",
                "2,45",
                "3,45",
                "5,45"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 12,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Dua buah bangun datar, yaitu sebuah persegi panjang dan sebuah segitiga sama kaki, memiliki keliling yang sama. Diketahui panjang sisi-sisi segitiga tersebut adalah 13 cm, 13 cm, dan 10 cm. Jika panjang dari persegi panjang tersebut adalah 10 cm, maka selisih luas dari kedua bangun datar tersebut adalah...",
            opsi: [
                "$15~cm^{2}$",
                "$20~cm^{2}$",
                "$40~cm^{2}$",
                "$140~cm^{2}$"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 13,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Dimas mengendarai sepeda motor dari kota A ke kota B dengan kecepatan rata-rata $45~km/jam$. Jarak antara kota A dan kota B adalah 36 km. Jika Dimas tiba di kota B pada pukul 07.15, maka ia berangkat dari kota A pada pukul ....",
            opsi: [
                "06.00",
                "06.27",
                "06.39",
                "08.03"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 14,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Bilangan yang tidak dapat dinyatakan sebagai hasil penjumlahan dari dua bilangan kuadrat sempurna yang berbeda adalah...",
            opsi: [
                "34",
                "41",
                "45",
                "48"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 15,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Seorang pemilik toko buah ingin merangkai sebuah parsel spesial yang berisi tepat 3 jenis buah yang berbeda. Jika di toko tersebut tersedia 6 jenis buah pilihan (yaitu apel, jeruk, anggur, mangga, melon, dan pir), banyak susunan parsel berbeda yang dapat dibuat oleh pemilik toko tersebut adalah...",
            opsi: [
                "15 susunan",
                "18 susunan",
                "20 susunan",
                "120 susunan"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 16,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Misalkan sebuah pecahan memiliki pembilang dan penyebut. Jika pembilang dan penyebut pecahan tersebut masing-masing ditambah 2, maka nilai pecahannya menjadi $\\frac{1}{2}$. Namun, jika hanya pembilangnya saja yang dikurangi 1, sedangkan penyebutnya tetap, maka nilai pecahannya menjadi $\\frac{1}{3}$. Jumlah dari pembilang dan penyebut pecahan asli tersebut adalah...",
            opsi: [
                "17",
                "15",
                "13",
                "11"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 17,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diberikan sebuah barisan bilangan yang disusun dengan pola sebagai berikut:<br>3, 6, 11, 18, 27, 38,...<br>Jika angka-angka penyusun pada bilangan urutan ke-25 dalam pola tersebut dikalikan satu sama lain, maka hasil kalinya adalah...",
            opsi: [
                "15",
                "60",
                "84",
                "126"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 18,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Di dalam sebuah kantong terdapat beberapa kartu bilangan. Angka-angka pada kartu tersebut merupakan himpunan semua faktor dari 36. Jika dari dalam kantong tersebut diambil dua buah kartu secara bersamaan, banyaknya cara pengambilan agar jumlah kedua bilangan pada kartu tersebut bernilai ganjil adalah...",
            opsi: [
                "18 cara",
                "21 cara",
                "24 cara",
                "27 cara"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 19,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Angka satuan (digit terakhir) dari hasil pengerjaan $3^{2026}+7^{2026}$ adalah ....",
            opsi: [
                "0",
                "2",
                "6",
                "8"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 20,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Sebuah kubus kayu besar dengan panjang rusuk 5 cm dicat seluruh permukaannya dengan warna biru. Setelah cat mengering, kubus tersebut dipotong-potong menjadi kubus-kubus kecil dengan panjang rusuk 1 cm. Banyaknya kubus kecil yang sama sekali tidak memiliki sisi berwarna biru adalah...",
            opsi: [
                "8",
                "9",
                "27",
                "54"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 21,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diberikan empat buah bilangan dengan bentuk yang berbeda-beda sebagai berikut:<br>$\\frac{4}{5}$ ; $83\\%$ ; $0,835$ ; $\\frac{5}{6}$<br>Jika bilangan-bilangan tersebut diurutkan dari nilai yang paling kecil hingga yang paling besar, maka urutan yang benar adalah...",
            opsi: [
                "$\\frac{4}{5}$ ; $\\frac{5}{6}$ ; $83\\%$ ; $0,835$",
                "$\\frac{4}{5}$ ; $83\\%$ ; $\\frac{5}{6}$ ; $0,835$",
                "$83\\%$ ; $0,835$ ; $\\frac{4}{5}$ ; $\\frac{5}{6}$",
                "$83\\%$ ; $\\frac{4}{5}$ ; $\\frac{5}{6}$ ; $0,835$"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 22,
            tipe: 'pg',
            poin: 1.25,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diberikan enam buah data bilangan dengan berbagai bentuk sebagai berikut:<br>$\\frac{13}{20}$ ; $0,645$ ; $\\frac{5}{8}$ ; $66\\%$ ; $\\frac{27}{40}$ ; $64\\%$<br>Median dari data bilangan tersebut adalah...",
            opsi: [
                "0,6425",
                "0,645",
                "0,6475",
                "0,65"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 23,
            tipe: 'pg',
            poin: 1.5,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Disediakan 12 buah kubus kecil yang masing-masing memiliki panjang rusuk 1 cm. Seluruh kubus tersebut akan disusun dan direkatkan sisi-sisinya sehingga membentuk sebuah bangun ruang balok utuh. Selisih antara luas permukaan terbesar dan luas permukaan terkecil yang mungkin dari balok yang terbentuk adalah...",
            opsi: [
                "$12~cm^{2}$",
                "$16~cm^{2}$",
                "$18~cm^{2}$",
                "$32~cm^{2}$"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 24,
            tipe: 'pg',
            poin: 1.5,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Lima orang sahabat, yaitu Budi, Candra, Dita, Eka, dan Fikri, akan menonton film di bioskop. Mereka membeli tiket untuk lima kursi yang berada dalam satu baris. Karena sedang berselisih paham, Budi dan Candra tidak mau duduk saling berdampingan. Banyaknya cara mereka mengatur posisi tempat duduk tersebut adalah...",
            opsi: [
                "48 cara",
                "72 cara",
                "96 cara",
                "120 cara"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 25,
            tipe: 'pg',
            poin: 1.5,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Perhatikan gambar bangun datar persegi panjang ABCD di bawah ini!<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-mtk-2026-soal25.png\" style=\"width:100%; max-width:500px; border-radius:5px;\"></div><br>Diketahui panjang $AB=20$ cm dan lebar $AD=12$ cm. Titik P, Q, R, dan S terletak pada sisi CD. Jika jumlah panjang ruas garis $PQ+RS=8$ cm, maka luas total daerah yang diarsir adalah...",
            opsi: [
                "$144~cm^{2}$",
                "$96~cm^{2}$",
                "$84~cm^{2}$",
                "$72~cm^{2}$"
            ],
            kunci: 'D',
            ragu: false
        },
        {
            id: 26,
            tipe: 'pg',
            poin: 1.5,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Diberikan tiga bilangan bulat positif a, b, dan c yang memenuhi perbandingan bertingkat $a:b=3:4$ dan $b:c=2:5$. Hasil dari $\\frac{(200\\times a)+(150\\times b)+(30\\times c)}{(2\\times c)+b-(3\\times a)}$ adalah...",
            opsi: [
                "50",
                "100",
                "120",
                "150"
            ],
            kunci: 'B',
            ragu: false
        },
        {
            id: 27,
            tipe: 'pg',
            poin: 1.5,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Bima ingin menyetel kode kunci koper miliknya yang terdiri dari 3 angka berbeda. Ia hanya ingin menggunakan pilihan angka dari 1 hingga 9 (angka 0 tidak digunakan). Agar kodenya mudah diingat, Bima memberikan syarat khusus: ketiga angka tersebut harus selalu tersusun urut dari yang nilainya paling kecil ke yang paling besar dari kiri ke kanan (contoh kode yang sah: 138, 256, 479). Banyaknya kombinasi kode kunci berbeda yang dapat dibuat oleh Bima adalah...",
            opsi: [
                "84",
                "120",
                "504",
                "729"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 28,
            tipe: 'pg',
            poin: 1.5,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Perhatikan gambar bangun tak beraturan ABCDEFGH pada kisi-kisi berpetak di bawah ini!<br><br><div style=\"text-align:center; margin: 10px 0;\"><img src=\"assets/osk-sd-mtk-2026-soal28.png\" style=\"width:100%; max-width:400px; border-radius:5px;\"></div><br>Diberikan bangun datar tak beraturan ABCDEFGH pada kisi-kisi berpetak. Jika luas satu persegi kecil P adalah $3~cm^{2}$, berapakah luas keseluruhan bangun tersebut?",
            opsi: [
                "$36~cm^{2}$",
                "$42~cm^{2}$",
                "$45~cm^{2}$",
                "$54~cm^{2}$"
            ],
            kunci: 'C',
            ragu: false
        },
        {
            id: 29,
            tipe: 'pg',
            poin: 1.5,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Dalam sebuah simulasi OSN Matematika tingkat SD, nilai rata-rata gabungan dari 30 orang peserta adalah 86. Peserta tersebut terdiri dari 20 siswa perempuan dan 10 siswa laki-laki. Diketahui bahwa nilai rata-rata kelompok siswa perempuan saja adalah 81. Jika nilai maksimal yang dapat diraih pada simulasi tersebut adalah 100, maka nilai terendah yang mungkin diraih oleh seorang siswa laki-laki adalah...",
            opsi: [
                "60",
                "75",
                "86",
                "96"
            ],
            kunci: 'A',
            ragu: false
        },
        {
            id: 30,
            tipe: 'pg',
            poin: 1.5,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Sebuah sandi rahasia berbentuk bilangan ganjil 5-angka akan disusun menggunakan angka-angka pilihan: 2, 3, 4, dan 8. Karena hanya tersedia 4 pilihan angka, maka akan ada tepat satu angka yang digunakan sebanyak dua kali. Jika diketahui angka yang digunakan dua kali tersebut adalah bilangan genap, banyaknya susunan sandi rahasia berbeda yang mungkin dibuat adalah...",
            opsi: [
                "12 susunan",
                "24 susunan",
                "36 susunan",
                "72 susunan"
            ],
            kunci: 'C',
            ragu: false
        }
    ]
});
