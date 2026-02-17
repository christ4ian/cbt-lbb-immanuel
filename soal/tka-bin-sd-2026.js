/* ========================================================== */
/* DATABASE SOAL TKA BAHASA INDONESIA SD 2026                 */
/* ========================================================== */

// --- VARIABEL STIMULUS ---

const STIM_BATIK = `
    <h3>Warisan Batik Eyang Putri</h3>
    <p>Laras memandang kain mori putih yang terbentang di gawangan kayu. Aroma lilin malam yang dipanaskan menyeruak memenuhi beranda belakang rumah Eyang Putri. Sudah seminggu liburan sekolah ini Laras habiskan untuk belajar membatik. Tangannya masih kaku memegang canting. Tetesan lilin panas sering meluber ke luar garis pola, membuat gambar bunga kawung terlihat <i>benjol</i>.</p>
    <p>"Jangan takut salah, <i>Nduk</i>. Batik itu seperti hidup. Kalau ada noda, kita bisa menutupnya dengan motif lain yang lebih indah," ujar Eyang Putri lembut sambil mengusap kepala Laras. Eyang tidak pernah marah, meski Laras sudah menghabiskan banyak kain untuk latihan. Bagi Eyang, kesabaran Laras jauh lebih berharga daripada kain mori itu.</p>
    <p>Laras kembali mencelupkan canting ke wajan kecil di atas anglo. Ia meniup ujung canting pelan-pelan agar lilin tidak terlalu panas. Kali ini, ia menarik garis dengan menahan napas. Hasilnya lebih rapi. Senyum merekah di bibirnya. Ia sadar, membatik bukan sekadar menggambar, melainkan melatih ketenangan hati.</p>
    <small>Sumber: Cerpen Budaya (2025)</small>
`;

const STIM_PUTRI_MALU = `
    <h3>Misteri Putri Malu</h3>
    <p>Tanaman putri malu (<i>Mimosa pudica</i>) memiliki pertahanan diri yang unik. Jika daunnya disentuh, ditiup, atau dipanaskan, ia akan segera menguncup. Gerakan ini disebut <i>seismonasti</i>. Hal ini terjadi karena adanya perubahan tekanan air pada bantal daun (pulvinus). Saat disentuh, air di bantal daun mengalir ke batang, sehingga daun menjadi layu seketika.</p>
    <p>Tujuan utama gerakan ini adalah untuk mengelabui pemangsa. Hewan herbivora yang hendak memakan daunnya akan mengira tanaman tersebut sudah layu atau mati, sehingga mereka enggan memakannya. Selain itu, dengan menguncup, putri malu memperlihatkan duri-duri tajam di batangnya untuk menakuti musuh.</p>
    <p>Putri malu juga menutup daunnya saat matahari terbenam dan membukanya kembali saat matahari terbit. Respons ini membantu tanaman menghemat air dan melindungi diri dari suhu malam yang dingin. Meskipun dianggap gulma atau tanaman pengganggu, akar putri malu ternyata bermanfaat untuk menyembuhkan luka dan meredakan demam.</p>
    <small>Sumber: Ensiklopedia Flora (2025)</small>
`;

const STIM_SEMUT = `
    <h3>Semut Merah dan Merpati</h3>
    <p>Di tepi sungai yang deras, seekor Semut Merah tergelincir saat hendak minum. Ia berteriak minta tolong, namun suaranya tenggelam oleh gemuruh air. Seekor Merpati yang bertengger di dahan pohon melihat kejadian itu. Tanpa berpikir panjang, Merpati memetik sehelai daun dan menjatuhkannya ke dekat Semut. Semut segera naik ke atas daun dan selamat sampai ke tepian.</p>
    <p>Beberapa hari kemudian, seorang pemburu burung mengendap-endap mendekati pohon tempat Merpati tinggal. Ia mengarahkan senapannya ke arah Merpati yang sedang tertidur. Semut Merah melihat bahaya itu. Ia teringat kebaikan Merpati. Dengan sekuat tenaga, Semut menggigit kaki pemburu itu.</p>
    <p>"Aduuuh!" teriak pemburu kaget sambil menjatuhkan senapannya. Suara itu membangunkan Merpati, yang langsung terbang menjauh. "Terima kasih, Semut sahabatku!" seru Merpati dari angkasa. Semut tersenyum puas. Ia belajar bahwa tubuh kecil bukan penghalang untuk melakukan hal besar.</p>
    <small>Sumber: Fabel Klasik (2024)</small>
`;

const STIM_INFOGRAFIK = `
    <h3>Infografis: Bijak Bermedia Sosial</h3>
    <div style="text-align:center; margin: 10px 0;">
        <img src="assets/tka-sd-bin-2026-stimulus11.jpg" style="width:100%; max-width:500px; border-radius:5px;">
    </div>
    <small>Sumber: Kementerian Komunikasi dan Digital (2025)</small>
`;

const STIM_EARTHING = `
    <h3>Manfaat Jalan Kaki Tanpa Alas (Earthing)</h3>
    <p>Pernahkah kamu mencoba berjalan kaki tanpa alas di atas rumput atau tanah? Aktivitas ini dikenal dengan istilah <i>earthing</i> atau <i>grounding</i>. Meski terlihat sederhana dan kadang dianggap kotor, bersentuhan langsung dengan bumi ternyata memiliki manfaat kesehatan.</p>
    <p>Saat telapak kaki menyentuh tanah, tubuh menyerap elektron negatif dari bumi. Elektron ini berfungsi sebagai antioksidan alami yang menetralkan radikal bebas dalam tubuh. Hasilnya, peradangan atau inflamasi di dalam tubuh bisa berkurang. Ini sangat baik bagi mereka yang sering merasa nyeri sendi.</p>
    <p>Selain itu, <i>earthing</i> dapat memperbaiki kualitas tidur. Kontak dengan alam membantu menurunkan hormon stres (kortisol) dan menenangkan sistem saraf. Namun, kita tetap harus berhati-hati. Pastikan area tempat berjalan bersih dari pecahan kaca, paku, atau kotoran hewan agar kaki tidak terluka.</p>
    <small>Sumber: Jurnal Kesehatan Holistik (2025)</small>
`;

const STIM_KOTAK_PENSIL = `
    <h3>Kotak Pensil yang Hilang</h3>
    <p>"Pasti kamu yang mengambilnya, kan? Cuma kamu yang tadi duduk di mejaku!" tuduh Riko dengan wajah merah padam. Jari telunjuknya mengarah tepat ke wajah Dani. Dani menggeleng kuat, matanya mulai berkaca-kaca. "Sumpah, Rik. Aku tadi cuma numpang mengikat tali sepatu. Aku tidak melihat kotak pensilmu."</p>
    <p>Suasana kelas menjadi tegang. Teman-teman lain hanya diam, tidak berani melerai. Tiba-tiba, Bu Guru masuk kelas. "Ada apa ini ribut-ribut?" tanyanya tegas. Riko segera mengadu. Bu Guru meminta semua tenang, lalu memeriksa laci meja Riko. Kosong. Bu Guru lalu memeriksa tas Riko. Di kantong bagian depan yang jarang dibuka, benda itu terselip.</p>
    <p>"Ini apa, Riko?" tanya Bu Guru sambil mengangkat kotak pensil bergambar robot. Wajah Riko berubah pucat, lalu menunduk dalam-dalam. Ia malu sekali. Ternyata ia sendiri yang lupa menaruhnya tadi pagi karena terburu-buru. Dani menghela napas lega, namun ia tidak mengejek Riko. Ia justru menepuk bahu Riko pelan.</p>
    <small>Sumber: Cerita Anak Sekolah (2024)</small>
`;

const STIM_FILTER = `
    <h3>Cara Membuat Filter Air Sederhana</h3>
    <p>Air keruh bisa dijernihkan dengan alat sederhana. Berikut cara membuatnya:</p>
    <p><b>Siapkan Botol:</b> Potong bagian bawah botol air mineral bekas ukuran 1,5 liter. Balikkan botol (tutup di bawah).</p>
    <p><b>Susun Lapisan (dari bawah ke atas):</b><br>
    1. <b>Kapas/Kain:</b> Letakkan di paling bawah (dekat tutup botol) untuk menyaring kotoran halus.<br>
    2. <b>Batu Kerikil:</b> Masukkan di atas kapas sebagai penyangga dan penyaring kotoran besar.<br>
    3. <b>Arang:</b> Tumbuk arang hingga berukuran sedang. Masukkan di atas kerikil. Arang berfungsi menyerap bau dan racun.<br>
    4. <b>Pasir Halus:</b> Masukkan di atas arang untuk menahan lumpur.<br>
    5. <b>Ijuk/Spons:</b> Letakkan di paling atas untuk menyaring sampah kasar (daun/ranting).</p>
    <p><b>Uji Coba:</b> Tuangkan air keruh perlahan. Tampung air yang keluar dari tutup botol. Lakukan penyaringan 2-3 kali hingga air benar-benar jernih.</p>
    <p><i>Catatan: Air hasil saringan ini harus direbus hingga mendidih sebelum diminum untuk mematikan kuman.</i></p>
    <small>Sumber: Proyek Sains SD (2025)</small>
`;

const STIM_DRAMA = `
    <h3>Percakapan Kakak dan Adik</h3>
    <p>(Di ruang tamu, Kakak dan Adik sedang berdebat)</p>
    <p><b>Adik:</b> "Kak, bantu aku kerjakan PR Matematika dong. Ini susah sekali, aku tidak mengerti."</p>
    <p><b>Kakak:</b> "Coba kamu kerjakan sendiri dulu. Baca contoh di buku paket halaman 45. Kalau Kakak langsung kasih jawaban, nanti kamu tidak pintar."</p>
    <p><b>Adik:</b> "Ah, Kakak pelit! Aku sudah baca tapi tetap bingung. Aku bilang Ibu lho kalau Kakak tidak mau bantu."</p>
    <p><b>Kakak:</b> (Menghela napas) "Bukan pelit, Dik. Ibu juga pasti setuju sama Kakak. Belajar itu proses, bukan cuma menyalin jawaban. Sini, mana yang bingung? Kakak ajarkan caranya, tapi kamu yang hitung sendiri ya."</p>
    <p><b>Adik:</b> (Cemberut, lalu membuka buku) "Ya sudah. Ini soal nomor 5. Kenapa rumusnya beda sama nomor 1?"</p>
    <p><b>Kakak:</b> "Nah, itu karena bentuk bangunnya beda. Lihat gambarnya teliti. Ini trapesium, bukan jajargenjang."</p>
    <p><b>Adik:</b> "Oh... iya ya. Wah, aku kurang teliti. Oke, aku coba hitung sekarang."</p>
    <small>Sumber: Drama Keluarga (2025)</small>
`;


PAKET_SOAL.push({
    id: "tka-bin-sd-2026",
    judul: "Try Out TKA Bahasa Indonesia SD 2026",
    mapel: "Bahasa Indonesia",
    waktu: 65,
    petunjuk: [
        "Bacalah setiap teks stimulus dengan teliti sebelum menjawab.",
        "Gunakan waktu 65 menit untuk menyelesaikan seluruh soal.",
        "Periksa kembali jawaban Anda sebelum mengirimkan."
    ],
    soal: [
        // --- STIMULUS 1 ---
        {
            id: 1, tipe: 'pg',
            stimulus: { tampil: true, konten: STIM_BATIK },
            pertanyaan: "Apa makna kata <i>benjol</i> dalam konteks paragraf pertama?",
            opsi: ["Bentuk garis yang menggembung tidak beraturan.", "Luka memar pada kulit akibat terkena benda tumpul.", "Gumpalan lilin yang mengeras dan sulit dihilangkan.", "Keadaan kain yang berkerut karena suhu panas."],
            kunci: 'A', ragu: false
        },
        {
            id: 2, tipe: 'pgk',
            stimulus: { tampil: true, konten: STIM_BATIK },
            pertanyaan: "Manakah pernyataan yang menggambarkan karakter Eyang Putri dalam teks? (Jawaban dapat lebih dari satu)",
            opsi: ["Lebih menghargai proses belajar dan kesabaran cucunya daripada hasil yang sempurna.", "Memiliki sifat bijaksana dalam mengajarkan filosofi hidup melalui kegiatan membatik.", "Bersikap tegas dan akan menegur jika Laras memboroskan kain mori untuk latihan."],
            kunci: ['0', '1'], ragu: false
        },
        {
            id: 3, tipe: 'pg',
            stimulus: { tampil: true, konten: STIM_BATIK },
            pertanyaan: "Apa pesan tersirat dari kalimat \"Batik itu seperti hidup. Kalau ada noda, kita bisa menutupnya dengan motif lain yang lebih indah\"?",
            opsi: ["Kesalahan dalam hidup sebaiknya segera dilupakan agar tidak menjadi beban pikiran.", "Setiap kesalahan bisa diperbaiki dan diubah menjadi sesuatu yang bermanfaat.", "Noda dalam hidup sulit dibersihkan seperti lilin batik yang menempel kuat.", "Kita harus menyembunyikan kesalahan agar terlihat sempurna di mata orang lain."],
            kunci: 'B', ragu: false
        },

        // --- STIMULUS 2 ---
        {
            id: 4, tipe: 'pgk',
            stimulus: { tampil: true, konten: STIM_PUTRI_MALU },
            pertanyaan: "Mengapa hewan pemakan tumbuhan (herbivora) sering membatalkan niat memakan putri malu? (Jawaban dapat lebih dari satu)",
            opsi: ["Tanaman terlihat tidak segar atau tampak mati setelah daunnya menguncup.", "Adanya duri tajam pada batang yang terekspos jelas saat daun menutup.", "Daun putri malu mengeluarkan aroma bau busuk saat disentuh oleh hewan."],
            kunci: ['0', '1'], ragu: false
        },
        {
            id: 5, tipe: 'pgk-kategori',
            stimulus: { tampil: true, konten: STIM_PUTRI_MALU },
            labelKategori: ["Fakta", "Opini"],
            pertanyaan: "Berdasarkan teks, tentukan Fakta atau Opini untuk setiap pernyataan berikut!",
            opsi: ["Gerakan menutup daun disebabkan perpindahan air dari bantal daun ke batang.", "Putri malu adalah tanaman paling cerdas di dunia karena bisa menipu musuh.", "Akar putri malu memiliki khasiat untuk kesehatan seperti meredakan demam."],
            kunci: { '0': 'L1', '1': 'L2', '2': 'L1' }, ragu: false
        },
        {
            id: 6, tipe: 'pg',
            stimulus: { tampil: true, konten: STIM_PUTRI_MALU },
            pertanyaan: "Apa fungsi respons putri malu menutup daun saat matahari terbenam?",
            opsi: ["Meningkatkan tekanan air pada bantal daun secara drastis untuk pertumbuhan.", "Membantu tanaman menghemat air dan melindungi diri dari suhu dingin.", "Melunakkan duri pada batang agar tidak melukai serangga malam.", "Mempercepat proses fotosintesis tanpa bantuan sinar matahari."],
            kunci: 'B', ragu: false
        },

        // --- STIMULUS 3 ---
        {
            id: 7, tipe: 'pgk',
            stimulus: { tampil: true, konten: STIM_SEMUT },
            pertanyaan: "Apa makna ungkapan <i>tanpa berpikir panjang</i> dalam paragraf pertama? (Jawaban dapat lebih dari satu)",
            opsi: ["Melakukan tindakan pertolongan secara spontan dan cepat.", "Tergerak hatinya untuk segera menolong karena naluri kebaikan.", "Bertindak gegabah dan ceroboh tanpa memperhitungkan risiko keselamatan."],
            kunci: ['0', '1'], ragu: false
        },
        {
            id: 8, tipe: 'pg',
            stimulus: { tampil: true, konten: STIM_SEMUT },
            pertanyaan: "Manakah ringkasan cerita yang paling tepat?",
            opsi: ["Semut Merah hampir tenggelam di sungai tetapi berhasil menyelamatkan diri dengan daun. Kemudian, Semut membalas dendam kepada pemburu yang mengganggunya.", "Merpati menyelamatkan Semut yang hampir tenggelam. Di lain waktu, Semut membalas budi dengan menggigit pemburu yang hendak menembak Merpati, sehingga keduanya selamat.", "Pemburu burung gagal menangkap Merpati karena digigit Semut. Merpati kemudian menolong Semut menyeberangi sungai menggunakan sehelai daun.", "Semut dan Merpati bersahabat baik. Mereka bekerja sama mengalahkan pemburu yang jahat di hutan dengan cara menjebaknya di tepi sungai."],
            kunci: 'B', ragu: false
        },
        {
            id: 9, tipe: 'pgk',
            stimulus: { tampil: true, konten: STIM_SEMUT },
            pertanyaan: "Apa amanat yang dapat diambil dari cerita tersebut? (Jawaban dapat lebih dari satu)",
            opsi: ["Kebaikan yang kita tanam pasti akan menuai balasan kebaikan pula di kemudian hari.", "Ukuran fisik bukanlah penghalang untuk memberikan pertolongan yang berdampak besar.", "Kita sebaiknya hanya menolong orang lain jika yakin tidak akan membahayakan diri sendiri."],
            kunci: ['0', '1'], ragu: false
        },
        {
            id: 10, tipe: 'pgk-kategori',
            stimulus: { tampil: true, konten: STIM_SEMUT },
            labelKategori: ["Benar", "Salah"],
            pertanyaan: "Berdasarkan cerita, tentukan Benar atau Salah untuk setiap pernyataan kejadian berikut!",
            opsi: ["Merpati menjatuhkan sehelai daun untuk menolong Semut yang tergelincir.", "Semut membangunkan Merpati dengan cara berteriak memanggil namanya.", "Pemburu kaget dan menjatuhkan senapannya karena kakinya digigit Semut."],
            kunci: { '0': 'L1', '1': 'L2', '2': 'L1' }, ragu: false
        },

        // --- STIMULUS 4 ---
        {
            id: 11, tipe: 'pg',
            stimulus: { tampil: true, konten: STIM_INFOGRAFIK },
            pertanyaan: "Apa tujuan utama pembuatan infografis tersebut?",
            opsi: ["Mengajarkan cara membuat konten viral agar cepat terkenal di media sosial.", "Memberikan panduan keamanan digital agar terhindar dari hoaks dan kejahatan siber.", "Melarang penggunaan <i>smartphone</i> secara total bagi anak-anak di bawah umur.", "Mempromosikan aplikasi antivirus baru untuk mengecek berita bohong."],
            kunci: 'B', ragu: false
        },
        {
            id: 12, tipe: 'pgk',
            stimulus: { tampil: true, konten: STIM_INFOGRAFIK },
            pertanyaan: "Berdasarkan infografis, manakah tindakan yang berisiko tinggi bagi keamanan data pengguna? (Jawaban dapat lebih dari satu)",
            opsi: ["Menuliskan nama lengkap ibu kandung saat mengikuti kuis/tantangan di kolom komentar publik.", "Membuka tautan (<i>link</i>) hadiah yang dikirimkan oleh nomor asing yang tidak dikenal.", "Melaporkan (<i>report</i>) komentar kasar yang mengandung unsur perundungan atau SARA."],
            kunci: ['0', '1'], ragu: false
        },
        {
            id: 13, tipe: 'pgk-kategori',
            stimulus: { tampil: true, konten: STIM_INFOGRAFIK },
            labelKategori: ["Melanggar", "Tidak Melanggar"],
            pertanyaan: "Tentukan kategori tindakan berikut berdasarkan prinsip \"Jaga Privasi\" dan \"Etika Komentar\" pada infografis!",
            opsi: ["Mengunggah foto tiket pesawat yang memperlihatkan kode <i>booking</i> dan nama lengkap.", "Mengkritik pelayanan toko <i>online</i> dengan bahasa yang sopan dan bukti jelas.", "Mengejek teman yang kalah lomba di grup kelas dengan sebutan memalukan."],
            kunci: { '0': 'L1', '1': 'L2', '2': 'L1' }, ragu: false
        },

        // --- STIMULUS 5 ---
        {
            id: 14, tipe: 'pgk',
            stimulus: { tampil: true, konten: STIM_EARTHING },
            pertanyaan: "Manakah manfaat kesehatan yang tertulis secara eksplisit dalam teks? (Jawaban dapat lebih dari satu)",
            opsi: ["Mengurangi peradangan (inflamasi) dan nyeri sendi.", "Membantu menurunkan hormon kortisol penyebab stres.", "Menyembuhkan luka terbuka pada telapak kaki dengan cepat."],
            kunci: ['0', '1'], ragu: false
        },
        {
            id: 15, tipe: 'pg',
            stimulus: { tampil: true, konten: STIM_EARTHING },
            pertanyaan: "Manakah kalimat utama paragraf kedua teks tersebut?",
            opsi: ["Saat telapak kaki menyentuh tanah, tubuh menyerap elektron negatif dari bumi.", "Hasilnya, peradangan atau inflamasi di dalam tubuh bisa berkurang.", "Elektron ini berfungsi sebagai antioksidan alami yang menetralkan radikal bebas.", "Ini sangat baik bagi mereka yang sering merasa nyeri sendi."],
            kunci: 'A', ragu: false
        },
        {
            id: 16, tipe: 'pgk-kategori',
            stimulus: { tampil: true, konten: STIM_EARTHING },
            labelKategori: ["Mitos", "Fakta"],
            pertanyaan: "Berdasarkan teks, tentukan Mitos atau Fakta untuk setiap pernyataan berikut!",
            opsi: ["Berjalan tanpa alas kaki di atas tanah dapat menurunkan hormon kortisol penyebab stres.", "<i>Earthing</i> aman dilakukan di sembarang tempat tanpa perlu memeriksa kondisi tanah.", "Elektron negatif dari bumi berperan menetralkan radikal bebas dalam tubuh manusia."],
            kunci: { '0': 'L2', '1': 'L1', '2': 'L2' }, ragu: false
        },

        // --- STIMULUS 6 ---
        {
            id: 17, tipe: 'pgk',
            stimulus: { tampil: true, konten: STIM_KOTAK_PENSIL },
            pertanyaan: "Apa makna tindakan Dani <i>menepuk bahu Riko pelan</i> di akhir cerita? (Jawaban dapat lebih dari satu)",
            opsi: ["Menunjukkan sikap berbesar hati memaafkan teman meskipun telah dituduh sembarangan.", "Memberikan dukungan moral kepada Riko agar tidak terlalu larut dalam rasa bersalah.", "Menyindir Riko secara halus karena telah bertindak ceroboh dan memalukan."],
            kunci: ['0', '1'], ragu: false
        },
        {
            id: 18, tipe: 'pg',
            stimulus: { tampil: true, konten: STIM_KOTAK_PENSIL },
            pertanyaan: "Sudut pandang yang digunakan penulis dalam cerita tersebut adalah ....",
            opsi: ["Orang pertama pelaku utama (menggunakan kata ganti \"Aku\").", "Orang ketiga serba tahu (penulis mengetahui perasaan dan kejadian semua tokoh).", "Orang ketiga pengamat terbatas (penulis hanya mengamati dari luar).", "Orang kedua (menggunakan kata ganti \"Kamu\")."],
            kunci: 'B', ragu: false
        },
        {
            id: 19, tipe: 'pgk',
            stimulus: { tampil: true, konten: STIM_KOTAK_PENSIL },
            pertanyaan: "Manakah fakta kejadian yang benar-benar terjadi dalam cerita? (Jawaban dapat lebih dari satu)",
            opsi: ["Riko menuduh Dani mengambil kotak pensilnya.", "Kotak pensil Riko ditemukan terselip di kantong depan tasnya sendiri.", "Dani membalas tuduhan Riko dengan cara berteriak marah."],
            kunci: ['0', '1'], ragu: false
        },

        // --- STIMULUS 7 ---
        {
            id: 20, tipe: 'pgk-kategori',
            stimulus: { tampil: true, konten: STIM_FILTER },
            labelKategori: ["Ada", "Tidak Ada"],
            pertanyaan: "Berdasarkan teks, tentukan Ada atau Tidak Ada untuk komponen berikut dalam alat filter air tersebut!",
            opsi: ["Arang yang ditumbuk untuk menyerap bau dan racun.", "Zat kimia klorin untuk memutihkan air.", "Kapas atau kain yang diletakkan di lapisan paling bawah."],
            kunci: { '0': 'L1', '1': 'L2', '2': 'L1' }, ragu: false
        },
        {
            id: 21, tipe: 'pgk',
            stimulus: { tampil: true, konten: STIM_FILTER },
            pertanyaan: "Mengapa susunan bahan penyaring harus berurutan (ijuk/spons di paling atas)? (Jawaban dapat lebih dari satu)",
            opsi: ["Agar sampah berukuran besar seperti daun tertahan lebih dulu di lapisan paling atas.", "Supaya aliran air tidak langsung tersumbat total jika sampah kasar masuk ke lapisan halus.", "Agar kerikil di bagian bawah dapat menyerap racun kimia sebelum air keluar."],
            kunci: ['0', '1'], ragu: false
        },
        {
            id: 22, tipe: 'pg',
            stimulus: { tampil: true, konten: STIM_FILTER },
            pertanyaan: "Untuk siapa teks prosedur ini kemungkinan besar ditujukan?",
            opsi: ["Peneliti laboratorium yang membutuhkan air dengan kemurnian tinggi.", "Siswa atau masyarakat yang membutuhkan solusi air bersih sederhana.", "Pengusaha air minum isi ulang yang menggunakan mesin canggih.", "Petani yang ingin membangun bendungan irigasi untuk sawah."],
            kunci: 'B', ragu: false
        },

        // --- STIMULUS 8 ---
        {
            id: 23, tipe: 'pg',
            stimulus: { tampil: true, konten: STIM_DRAMA },
            pertanyaan: "Apa inti permasalahan (konflik) yang terjadi dalam percakapan tersebut?",
            opsi: ["Adik marah karena Kakak tidak bisa mengerjakan soal Matematika yang sulit.", "Kakak menolak memberikan kunci jawaban langsung kepada Adik yang meminta bantuan instan.", "Ibu memarahi Kakak karena dianggap tidak mau membantu Adik belajar.", "Adik salah membawa buku pelajaran sehingga tidak bisa mengerjakan PR."],
            kunci: 'B', ragu: false
        },
        {
            id: 24, tipe: 'pgk',
            stimulus: { tampil: true, konten: STIM_DRAMA },
            pertanyaan: "Karakter seperti apa yang ditunjukkan oleh tokoh Kakak? (Jawaban dapat lebih dari satu)",
            opsi: ["Tegas dalam mendidik adiknya agar mandiri dan mau berusaha.", "Sabar dan telaten dalam membimbing adiknya memahami materi pelajaran.", "Bersikap acuh tak acuh dan tidak peduli pada kesulitan yang dialami adiknya."],
            kunci: ['0', '1'], ragu: false
        },
        {
            id: 25, tipe: 'pgk-kategori',
            stimulus: { tampil: true, konten: STIM_DRAMA },
            labelKategori: ["Setuju", "Tidak Setuju"],
            pertanyaan: "Mengapa Kakak akhirnya mau membantu Adik? Tentukan Setuju atau Tidak Setuju untuk setiap alasan berikut!",
            opsi: ["Kakak membantu karena takut dilaporkan kepada Ibu oleh Adik.", "Kakak ingin Adik memahami konsep/cara pengerjaan, bukan sekadar mendapat jawaban.", "Kakak menyadari bahwa Adik memang belum paham materi dan butuh bimbingan."],
            kunci: { '0': 'L2', '1': 'L1', '2': 'L1' }, ragu: false
        }
    ]
});
