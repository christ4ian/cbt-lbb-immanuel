/* ========================================================== */
/* DATABASE SOAL DEMO FITUR POIN KHUSUS                       */
/* ========================================================== */

PAKET_SOAL.push({
    id: "demo-saja",
    judul: "Demo Ujian Sistem Poin Custom",
    mapel: "Simulasi Sistem",
    waktu: 15,
    
    // Konfigurasi fitur baru
    sistem_poin: true,
    base_poin: 100,
    
    petunjuk: [
        "Perhatikan bahwa setiap soal memiliki bobot poin yang berbeda.",
        "Total poin maksimal yang bisa didapatkan pada paket ini adalah 120.",
        "Kerjakan soal dengan teliti untuk melihat hasil skor akhir."
    ],
    soal: [
        // --- SOAL 1 (Pilihan Ganda Biasa) ---
        {
            id: 1,
            tipe: 'pg',
            poin: 20,
            stimulus: {
                tampil: false
            },
            pertanyaan: "Berapakah hasil dari operasi hitung 25 + 15 x 2?",
            opsi: [
                "55",
                "80",
                "40",
                "50"
            ],
            kunci: 'A',
            ragu: false
        },

        // --- SOAL 2 (Pilihan Ganda Kompleks) ---
        {
            id: 2,
            tipe: 'pgk',
            poin: 40,
            stimulus: {
                tampil: true,
                konten: "Sebuah toko sedang mengadakan diskon perlengkapan alat tulis. Buku tulis mendapatkan diskon 20%, sedangkan tas sekolah mendapatkan diskon 30%."
            },
            pertanyaan: "Berdasarkan informasi tersebut, manakah pernyataan berikut yang benar? (Pilih lebih dari satu)",
            opsi: [
                "Jika harga awal buku tulis adalah Rp10.000, maka harga setelah diskon adalah Rp8.000.",
                "Diskon buku tulis lebih besar persentasenya daripada tas sekolah.",
                "Jika harga awal tas sekolah adalah Rp100.000, maka potongan harganya adalah Rp30.000."
            ],
            kunci: ['0', '2'],
            ragu: false
        },

        // --- SOAL 3 (Benar/Salah atau Kategori) ---
        {
            id: 3,
            tipe: 'pgk-kategori',
            poin: 60,
            stimulus: {
                tampil: true,
                konten: "Diberikan beberapa pernyataan mengenai sifat-sifat dasar bangun ruang."
            },
            pertanyaan: "Tentukan apakah pernyataan berikut Benar atau Salah!",
            opsi: [
                "Kubus memiliki 6 sisi yang semuanya berbentuk persegi.",
                "Balok memiliki 12 rusuk yang semuanya berukuran sama panjang.",
                "Kerucut memiliki dua buah titik sudut."
            ],
            kunci: { '0': 'L1', '1': 'L2', '2': 'L2' },
            ragu: false
        }
    ]
});
