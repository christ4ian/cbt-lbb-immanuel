/* ========================================================== */
/* DATABASE SOAL DEMO TRY OUT MATEMATIKA UMUM 2026            */
/* ========================================================== */

// --- VARIABEL STIMULUS ---

const STIMULUS_TAMAN_KOTA = `
    <h3>Proyek Revitalisasi Taman Kota</h3>
    <p>Pemerintah daerah berencana melakukan revitalisasi sebuah taman kota yang sudah lama terbengkalai. Taman tersebut berbentuk persegi panjang dengan ukuran panjang <b>25 meter</b> dan lebar <b>15 meter</b>.</p>
    <p>Di dalam taman tersebut, akan dibangun beberapa fasilitas baru dengan rincian sebagai berikut:</p>
    <ul>
        <li>Sebuah kolam ikan hias berbentuk lingkaran tepat di tengah taman dengan jari-jari $3\\frac{1}{2}$ meter.</li>
        <li>Area bermain anak berbentuk persegi dengan panjang sisi 6 meter.</li>
        <li>Sisa area taman yang tidak dibangun fasilitas akan ditanami rumput sintetis jenis premium.</li>
    </ul>
    <p>Diketahui bahwa biaya pemasangan rumput sintetis (termasuk bahan dan jasa pekerja) adalah <b>Rp45.000,00 per meter persegi</b>. Pemerintah daerah telah menyiapkan anggaran sebesar Rp15.000.000,00 khusus untuk penanaman rumput sintetis tersebut.</p>
    <p><i>(Gunakan nilai $\\pi = \\frac{22}{7}$)</i></p>
`;

const STIMULUS_POLA_BILANGAN = `
    <h3>Sandi Rahasia Agen Rahasia</h3>
    <p>Seorang agen rahasia harus membuka sebuah brankas yang dikunci menggunakan kata sandi numerik. Untuk mendapatkan kata sandi tersebut, ia harus memecahkan sebuah pesan rahasia yang berbentuk deret pecahan berpola.</p>
    <p>Petunjuk yang tertulis di atas brankas adalah sebagai berikut:</p>
    <div style="background-color: #f4f4f4; padding: 15px; border-left: 5px solid #333; font-family: monospace; font-size: 16px; margin: 15px 0;">
        Kata Sandi = Nilai $X$ dari persamaan berikut:<br><br>
        $$X = \\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\frac{1}{3 \\times 4} + \\dots + \\frac{1}{49 \\times 50}$$
    </div>
    <p>Agen tersebut juga mengetahui bahwa formula umum untuk memecahkan pecahan teleskopik semacam itu adalah:<br>
    $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$</p>
`;

const STIMULUS_DATA_PANEN = `
    <h3>Laporan Hasil Panen Desa Makmur</h3>
    <p>Kepala Desa Makmur mendata hasil panen tiga jenis komoditas utama (Padi, Jagung, dan Kedelai) selama empat bulan berturut-turut pada awal tahun 2026. Data tersebut disajikan dalam tabel berikut (dalam satuan ton):</p>
    <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse; text-align: center;">
        <tr style="background-color: #e0f7fa;">
            <th>Bulan</th><th>Padi</th><th>Jagung</th><th>Kedelai</th>
        </tr>
        <tr><td>Januari</td><td>45</td><td>30</td><td>15</td></tr>
        <tr><td>Februari</td><td>50</td><td>35</td><td>20</td></tr>
        <tr><td>Maret</td><td>40</td><td>45</td><td>25</td></tr>
        <tr><td>April</td><td>60</td><td>40</td><td>30</td></tr>
    </table>
`;

PAKET_SOAL.push({
    id: "paket-soal-tryout",
    judul: "Demo Try Out Matematika Terpadu 2026",
    mapel: "Matematika",
    waktu: 90,
    petunjuk: [
        "Bacalah setiap stimulus dan pertanyaan dengan saksama.",
        "Soal terdiri dari Pilihan Ganda (PG), Pilihan Ganda Kompleks (PGK) centang lebih dari satu, dan format Benar/Salah.",
        "Untuk soal perhitungan, siapkan kertas buram coret-coretan.",
        "Pastikan semua jawaban telah terisi sebelum menekan tombol kumpulkan."
    ],
    soal: [
        // --- SOAL 1 (PG - Berdasarkan Stimulus 1) ---
        {
            id: 1,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: STIMULUS_TAMAN_KOTA
            },
            pertanyaan: "Berapakah luas area yang akan ditanami rumput sintetis premium?",
            opsi: [
                "300,5 m²",
                "336,5 m²",
                "375,0 m²",
                "380,5 m²"
            ],
            kunci: 'A', // 375 - 38.5 (kolam) - 36 (bermain) = 300.5
            ragu: false
        },

        // --- SOAL 2 (PGK Kategori / Benar-Salah - Berdasarkan Stimulus 1) ---
        {
            id: 2,
            tipe: 'pgk-kategori',
            stimulus: {
                tampil: true,
                konten: STIMULUS_TAMAN_KOTA
            },
            pertanyaan: "Berdasarkan rincian proyek revitalisasi taman, tentukan apakah pernyataan berikut <b>Benar</b> atau <b>Salah</b>!",
            opsi: [
                "Luas kolam ikan hias yang akan dibangun adalah 38,5 m².",
                "Total biaya yang dibutuhkan untuk memasang rumput sintetis mencapai lebih dari Rp14.000.000,00.",
                "Anggaran yang disiapkan oleh pemerintah daerah mencukupi untuk membiayai pemasangan rumput sintetis."
            ],
            kunci: { '0': 'L1', '1': 'L2', '2': 'L1' }, // L1 = Benar, L2 = Salah
            ragu: false
        },

        // --- SOAL 3 (PGK - Berdasarkan Stimulus 1) ---
        {
            id: 3,
            tipe: 'pgk',
            stimulus: {
                tampil: true,
                konten: STIMULUS_TAMAN_KOTA
            },
            pertanyaan: "Jika pemerintah daerah ingin memagari area bermain anak dengan pagar kayu, manakah pernyataan berikut yang tepat? (Pilih semua yang benar)",
            opsi: [
                "Keliling area bermain anak yang akan dipagari adalah 24 meter.",
                "Jika harga pagar kayu Rp50.000,00 per meter, biaya pembuatan pagar adalah Rp1.200.000,00.",
                "Luas pagar kayu sama dengan luas area bermain."
            ],
            kunci: ['0', '1'],
            ragu: false
        },

        // --- SOAL 4 (PG - MathJax Kompleks - Berdasarkan Stimulus 2) ---
        {
            id: 4,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: STIMULUS_POLA_BILANGAN
            },
            pertanyaan: "Kata sandi ($X$) yang benar untuk membuka brankas tersebut adalah ....",
            opsi: [
                "$\\frac{49}{50}$",
                "$\\frac{50}{51}$",
                "$\\frac{1}{50}$",
                "$1$"
            ],
            kunci: 'A',
            ragu: false
        },

        // --- SOAL 5 (PGK Kategori - MathJax - Berdasarkan Stimulus 2) ---
        {
            id: 5,
            tipe: 'pgk-kategori',
            stimulus: {
                tampil: true,
                konten: STIMULUS_POLA_BILANGAN
            },
            pertanyaan: "Agen tersebut mengamati pola pecahan lain. Tentukan nilai kebenaran dari pernyataan matematis berikut:",
            opsi: [
                "Nilai dari $\\frac{1}{2 \\times 3}$ sama dengan $\\frac{1}{2} - \\frac{1}{3}$.",
                "Pola rumus $X$ tersebut dapat dituliskan sebagai $X = 1 - \\frac{1}{50}$.",
                "Jika deret diteruskan hingga $\\frac{1}{99 \\times 100}$, maka nilai $X = 1$."
            ],
            kunci: { '0': 'L1', '1': 'L1', '2': 'L2' },
            ragu: false
        },

        // --- SOAL 6 (PG - TANPA STIMULUS) ---
        {
            id: 6,
            tipe: 'pg',
            stimulus: { tampil: false },
            pertanyaan: "Bentuk paling sederhana dari operasi bentuk akar $\\sqrt{75} + 2\\sqrt{12} - \\sqrt{27}$ adalah ....",
            opsi: [
                "$2\\sqrt{3}$",
                "$4\\sqrt{3}$",
                "$6\\sqrt{3}$",
                "$8\\sqrt{3}$"
            ],
            kunci: 'C', // 5√3 + 4√3 - 3√3 = 6√3
            ragu: false
        },

        // --- SOAL 7 (PGK - TANPA STIMULUS) ---
        {
            id: 7,
            tipe: 'pgk',
            stimulus: { tampil: false },
            pertanyaan: "Sebuah bak mandi memiliki volume 240 liter. Bak tersebut diisi air menggunakan selang dengan debit 15 liter/menit. Berilah tanda centang (✓) pada pernyataan yang bernilai BENAR terkait pengisian bak air tersebut!",
            opsi: [
                "Bak mandi akan terisi penuh dalam waktu 16 menit.",
                "Setelah 10 menit, volume air di dalam bak adalah 150 liter.",
                "Dibutuhkan waktu lebih dari 20 menit untuk memenuhkan bak mandi tersebut."
            ],
            kunci: ['0', '1'],
            ragu: false
        },

        // --- SOAL 8 (PG - Berdasarkan Stimulus 3) ---
        {
            id: 8,
            tipe: 'pg',
            stimulus: {
                tampil: true,
                konten: STIMULUS_DATA_PANEN
            },
            pertanyaan: "Rata-rata hasil panen Kedelai di Desa Makmur dari bulan Januari hingga April adalah ....",
            opsi: [
                "20,5 ton",
                "22,5 ton",
                "25,0 ton",
                "30,0 ton"
            ],
            kunci: 'B', // (15+20+25+30)/4 = 90/4 = 22.5
            ragu: false
        },

        // --- SOAL 9 (PGK Kategori / Benar-Salah - Berdasarkan Stimulus 3) ---
        {
            id: 9,
            tipe: 'pgk-kategori',
            stimulus: {
                tampil: true,
                konten: STIMULUS_DATA_PANEN
            },
            pertanyaan: "Perhatikan tren data hasil panen. Tentukan apakah pernyataan analisis di bawah ini <b>Benar</b> atau <b>Salah</b>!",
            opsi: [
                "Hasil panen Jagung selalu mengalami kenaikan setiap bulannya.",
                "Total keseluruhan hasil panen Padi selama empat bulan adalah 195 ton.",
                "Pada bulan Maret, hasil panen Jagung lebih tinggi dibandingkan hasil panen Padi."
            ],
            kunci: { '0': 'L2', '1': 'L1', '2': 'L1' },
            ragu: false
        },

        // --- SOAL 10 (PGK - Berdasarkan Stimulus 3) ---
        {
            id: 10,
            tipe: 'pgk',
            stimulus: {
                tampil: true,
                konten: STIMULUS_DATA_PANEN
            },
            pertanyaan: "Pemerintah akan memberikan subsidi pupuk khusus untuk komoditas yang total panennya selama 4 bulan kurang dari 100 ton. Berdasarkan aturan tersebut, pilih pernyataan yang tepat!",
            opsi: [
                "Komoditas Padi berhak mendapatkan subsidi pupuk.",
                "Komoditas Kedelai akan mendapatkan subsidi pupuk karena total panennya hanya 90 ton.",
                "Total hasil panen Jagung adalah 150 ton sehingga tidak mendapatkan subsidi."
            ],
            kunci: ['1', '2'],
            ragu: false
        }
    ]
});
