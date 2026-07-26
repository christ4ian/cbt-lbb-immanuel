# 🚀 Panduan Menghubungkan Backend Vercel API dengan Cloudflare Pages

Dokumen ini khusus menjelaskan cara kerja arsitektur **Hybrid**:
- **Frontend Web & Admin** -> Tetap di-host di **Cloudflare Pages** (`download.html`, `admin/admin-buku.html`).
- **Backend API Watermark PDF** -> Di-host di **Vercel** (`api/download-pdf.js` & file master PDF).

---

## 📌 Alur Kerja Arsitektur

```
[ Frontend Cloudflare Pages ]           [ Backend Serverless Vercel ]
     download.html               --->        api/download-pdf.js
 (Form Input Email & Buku)       <---     (Watermark PDF Return Buffer)
```

Karena backend Vercel sudah dilengkapi **CORS** (`Access-Control-Allow-Origin: *`), request dari Cloudflare Pages ke Vercel dijamin **100% lancar tanpa error CORS**.

---

## 🛠️ Langkah-Langkah Setup (Hanya 2 Menit)

### Langkah 1: Deploy Backend API ke Vercel

1. Buka [https://vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik **"Add New..."** -> **"Project"**.
3. Import repository GitHub `cbt-lbb-immanuel` ini.
4. Klik **Deploy**.
5. Setelah selesai, Vercel akan memberikan **URL Backend** Anda, misalnya:  
   `https://cbt-lbb-immanuel.vercel.app` (atau nama project Vercel Anda).

---

### Langkah 2: Hubungkan `download.html` di Cloudflare Pages dengan Backend Vercel

1. Buka file `download.html` di folder project ini.
2. Cari baris berikut di bagian bawah script (sekitar baris 266):
   ```javascript
   // URL Backend Vercel Serverless API
   const VERCEL_BACKEND_URL = '';
   ```
3. Masukkan URL Vercel yang Anda dapatkan di Langkah 1:
   ```javascript
   const VERCEL_BACKEND_URL = 'https://cbt-lbb-immanuel.vercel.app';
   ```
4. Simpan file `download.html` dan push ke GitHub agar **Cloudflare Pages** otomatis meng-update aplikasinya!

---

## 📖 Cara Penggunaan & Uji Coba

1. **Buka Halaman Admin (Cloudflare Pages):**  
   Buka `https://[DOMAIN-CLOUDFLARE-ANDA]/admin/admin-buku.html`
   - Buat judul buku baru & **Copy-Paste daftar email kelas** sekaligus ke kotak yang tersedia.
   - Klik **Simpan Email ke Database**.

2. **Buka Halaman Download User (Cloudflare Pages):**  
   Buka `https://[DOMAIN-CLOUDFLARE-ANDA]/download.html`
   - Pilih modul buku.
   - Masukkan email terdaftar.
   - Klik **Download PDF Sekarang**.
   - Sistem akan memanggil API Vercel di background, membuat watermark teks merah **`Modul Eksklusif untuk [email]`** di pojok kiri atas di seluruh halaman, dan mendownload PDF ke HP/Laptop user secara instan!

---

*Dengan cara ini, Anda tidak perlu memindahkan hosting utama Anda dari Cloudflare Pages, Vercel murni hanya dipakai sebagai Serverless Engine pemroses watermark PDF secara cepat!* 🎉
