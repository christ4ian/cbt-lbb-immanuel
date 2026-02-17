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
    }
];



