/* ===========================================================
   CBT SYSTEM FINAL STABLE - REVISED (ULTIMATE VERSION V2)
   - FIXED: Peringatan Login Dipertegas (Minim Literasi)
   - FIXED: Analisis & Pembahasan Tampil SETELAH Waktu Tutup
   - FIXED: Tombol Pembahasan Lenyap Jika Dibatasi Role
   - FIXED: Pesan Notifikasi Siswa Lebih Profesional
   - NEW FIXED: Admin Bypass Submit Stuck & LocalStorage Camera Cache
   - NEW FIXED: Real-cam CSS & Mobile Minimize Clean UI
   =========================================================== */

// 1. CONFIG & ANTI-CHEAT
let cheatCount = 0;
const firebaseConfig = {
    apiKey: "AIzaSyDu2LuvfDm_NCTd_xZBSPQiUkjtoM65xCs",
    authDomain: "lbb-immanuel-cbt.firebaseapp.com",
    databaseURL: "https://lbb-immanuel-cbt-default-rtdb.firebaseio.com",
    projectId: "lbb-immanuel-cbt",
    storageBucket: "lbb-immanuel-cbt.firebasestorage.app",
    messagingSenderId: "594873579300",
    appId: "1:594873579300:web:20fb83aa055ec156cfc02a"
};

// URL SCRIPT GOOGLE
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKBR9C0h9unHOU8PcQSLN3u26wyqt6ft7UYoZxhNBdkSwguLvQc5iACpODWFn8kU_ltg/exec";

// CONFIG CLOUDINARY UNTUK SOAL ESAI (UNSIGNED UPLOAD)
const CLOUDINARY_CONFIG = {
    cloudName: "z3dyeir1",
    uploadPreset: "CBT-Esai"
};

// HELPER: Kompresi Gambar Client-side via Canvas (menghemat kuota & upload super cepat)
function compressImageClient(file, maxDimension = 1600, quality = 0.8) {
    return new Promise((resolve) => {
        if (!file.type.startsWith('image/')) return resolve(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;
                if (width > maxDimension || height > maxDimension) {
                    if (width > height) {
                        height = Math.round((height * maxDimension) / width);
                        width = maxDimension;
                    } else {
                        width = Math.round((width * maxDimension) / height);
                        height = maxDimension;
                    }
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    resolve(blob || file);
                }, 'image/jpeg', quality);
            };
            img.onerror = () => resolve(file);
            img.src = e.target.result;
        };
        reader.onerror = () => resolve(file);
        reader.readAsDataURL(file);
    });
}

const ADMIN_EMAIL = "admin@lbbimmanuel.com";

// Init Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let serverTimeOffset = 0;
db.ref('.info/serverTimeOffset').on('value', snap => {
    serverTimeOffset = snap.val() || 0;
});
function getServerTime() {
    return Date.now() + serverTimeOffset;
}

const app = {
    // STATE
    currentPaket: null,
    currentIndex: 0,
    answers: {},
    ragu: {},
    timerInterval: null,
    sisaWaktu: 0,
    userData: {},
    sessionId: null,
    deviceId: null,
    sheetRowIndex: null,
    serverStartTime: 0,

    // Config
    deadline: 0,

    // --- PENYIMPANAN BUKTI KEAMANAN ---
    capturedImages: { start: null, mid: null, end: null },

    captureSnapshot: function (momentType) {
        if (this.capturedImages[momentType]) return;
        if (this.userData && (this.userData.isAdmin || this.userData.email === ADMIN_EMAIL)) return;

        const video = document.getElementById('proctor-video');
        if (!video || !video.srcObject) return;

        const canvas = document.createElement('canvas');
        canvas.width = 320;
        canvas.height = 240;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const base64Data = canvas.toDataURL('image/jpeg', 0.5);

        this.capturedImages[momentType] = base64Data;

        // SIMPAN KE CACHE BROWSER AGAR TIDAK HILANG SAAT REFRESH
        if (this.sessionId) {
            localStorage.setItem('cbt_images_' + this.sessionId, JSON.stringify(this.capturedImages));
        }
    },

    // --- INIT ---
    init: function () {
        console.log("System Ready (Role Sync & Deadline Logic Version).");

        let did = localStorage.getItem('cbt_device_id');
        if (!did) {
            did = 'dev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('cbt_device_id', did);
        }
        this.deviceId = did;

        this.loadDaftarPaket();
        this.checkResume();

        const styleFix = document.createElement('style');
        styleFix.innerHTML = `
            .container-data { overflow-y: auto !important; -webkit-overflow-scrolling: touch; padding-bottom: 80px; }
            #view-hasil { overflow-y: auto !important; -webkit-overflow-scrolling: touch; padding-bottom: 50px; height: 100vh; display: flex; flex-direction: column; }
            .active-view { height: 100vh; height: 100dvh; overflow: hidden; }
        `;
        document.head.appendChild(styleFix);
    },

    checkResume: function () {
        const saved = JSON.parse(localStorage.getItem('cbt_active_session'));
        if (saved && saved.sessionId) {
            this.sessionId = saved.sessionId;
            this.userData = saved.userData;
            this.sheetRowIndex = saved.sheetRowIndex;

            const paket = PAKET_SOAL.find(p => p.id === saved.paketId);
            if (paket) {
                this.currentPaket = paket;
                this.syncWithCloud(true);
            }
        }
    },

    loadDaftarPaket: function () {
        const select = document.getElementById('input-paket');
        if (typeof PAKET_SOAL !== 'undefined' && select) {
            select.innerHTML = '<option value="">-- Pilih Paket Soal --</option>';
            PAKET_SOAL.forEach((p, i) => {
                const opt = document.createElement('option');
                opt.value = i; opt.text = p.judul;
                select.add(opt);
            });
        }
    },

    unduhKartuDariCBT: function () {
        if (!window.jspdf) {
            return Swal.fire("Error", "Library PDF belum termuat, silakan tunggu sebentar.", "error");
        }
        const dataPeserta = window.tempKartuCBT;
        if (!dataPeserta) return;

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a5' });

        doc.setFillColor(248, 250, 252); doc.rect(0, 0, 210, 148, 'F');
        doc.setFillColor(30, 58, 138); doc.rect(0, 0, 210, 35, 'F');
        doc.setFillColor(239, 68, 68); doc.rect(0, 35, 210, 3, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22); doc.setFont("helvetica", "bold");
        doc.text("KARTU PESERTA UJIAN", 105, 18, { align: "center" });
        doc.setFontSize(11); doc.setFont("helvetica", "normal");
        doc.text("LBB IMMANUEL - COMPUTER BASED TEST (CBT)", 105, 26, { align: "center" });

        doc.setFillColor(255, 255, 255);
        doc.roundedRect(10, 45, 190, 90, 5, 5, 'F');
        doc.setDrawColor(200, 200, 200); doc.setLineWidth(0.3);
        doc.roundedRect(10, 45, 190, 90, 5, 5, 'S');

        doc.setTextColor(30, 58, 138); doc.setFontSize(12); doc.setFont("helvetica", "bold");
        doc.text("DATA PESERTA", 15, 55);
        doc.setDrawColor(30, 58, 138); doc.setLineWidth(0.5); doc.line(15, 58, 60, 58);

        doc.setTextColor(0, 0, 0); doc.setFontSize(10); const colLeft = 50;
        doc.setFont("helvetica", "normal"); doc.text("Nama Lengkap", 15, 68); doc.text(":", 45, 68);
        doc.setFont("helvetica", "bold"); doc.text(dataPeserta.nama, colLeft, 68);

        doc.setFont("helvetica", "normal"); doc.text("Asal Sekolah", 15, 78); doc.text(":", 45, 78);
        doc.setFont("helvetica", "bold");
        let sekolahText = doc.splitTextToSize(dataPeserta.sekolah, 48); doc.text(sekolahText, colLeft, 78);

        doc.setFont("helvetica", "normal"); doc.text("Kelas / Kota", 15, 88); doc.text(":", 45, 88);
        doc.setFont("helvetica", "bold");
        let kelasKotaText = doc.splitTextToSize(`${dataPeserta.kelas} / ${dataPeserta.kota}`, 48); doc.text(kelasKotaText, colLeft, 88);

        doc.setFont("helvetica", "normal"); doc.text("Email", 15, 98); doc.text(":", 45, 98);
        doc.setFont("helvetica", "bold");
        let emailText = doc.splitTextToSize(dataPeserta.email, 48); doc.text(emailText, colLeft, 98);

        doc.setFont("helvetica", "normal"); let nextLeftY = 98 + ((emailText.length - 1) * 5) + 10;
        doc.text("Jalur Daftar", 15, nextLeftY); doc.text(":", 45, nextLeftY);
        doc.setFont("helvetica", "bold"); doc.text(dataPeserta.role, colLeft, nextLeftY);

        doc.setDrawColor(220, 220, 220); doc.setLineWidth(0.3); doc.line(105, 52, 105, 128);

        doc.setTextColor(30, 58, 138); doc.setFontSize(12); doc.setFont("helvetica", "bold");
        doc.text("INFORMASI UJIAN", 110, 55);
        doc.setDrawColor(30, 58, 138); doc.setLineWidth(0.5); doc.line(110, 58, 155, 58);

        doc.setTextColor(0, 0, 0); doc.setFontSize(10); const colRight = 145;
        doc.setFont("helvetica", "normal"); doc.text("Event Daftar", 110, 68); doc.text(":", 140, 68);
        doc.setFont("helvetica", "bold");
        let eventText = doc.splitTextToSize(dataPeserta.event, 50); doc.text(eventText, colRight, 68);

        let nextY = 68 + ((eventText.length - 1) * 5) + 10;
        doc.setFont("helvetica", "normal"); doc.text("Mata Pelajaran", 110, nextY); doc.text(":", 140, nextY);
        doc.setFont("helvetica", "bold");
        let mapelText = doc.splitTextToSize(dataPeserta.paket, 50); doc.text(mapelText, colRight, nextY);

        nextY = nextY + ((mapelText.length - 1) * 5) + 10;
        doc.setFont("helvetica", "normal"); doc.text("Durasi Waktu", 110, nextY); doc.text(":", 140, nextY);
        doc.setFont("helvetica", "bold"); doc.text(`${dataPeserta.durasi} Menit`, colRight, nextY);

        doc.setFont("helvetica", "normal"); nextY += 10;
        doc.text("Jumlah Soal", 110, nextY); doc.text(":", 140, nextY);
        doc.setFont("helvetica", "bold"); doc.text(`${dataPeserta.jumlahSoal} Butir`, colRight, nextY);

        doc.setFontSize(8); doc.setFont("helvetica", "italic"); doc.setTextColor(150, 150, 150);
        doc.text("Simpan kartu ujian ini sebagai bukti pendaftaran. Segala instruksi teknis akan diumumkan melalui Grup WhatsApp.", 105, 142, { align: "center" });

        doc.save(`Kartu_Peserta_${dataPeserta.nama.replace(/\s+/g, '_')}.pdf`);
    },

    // =========================================
    // 1. LOGIN
    // =========================================
    gotoData: async function () {
        const idx = document.getElementById('input-paket').value;
        const email = document.getElementById('input-email').value.trim().toLowerCase();

        if (idx === "") return Swal.fire('Error', 'Pilih paket soal!', 'error');
        if (!email || !email.includes('@')) return Swal.fire('Error', 'Masukkan email valid!', 'error');

        // --- CEK ADMIN ---
        if (email === ADMIN_EMAIL) {
            this.currentPaket = PAKET_SOAL[idx];
            this.userData = {
                nama: "ADMIN MASTER", kelas: "Internal", sekolah: "IMMANUEL",
                email: email, isAdmin: true, role: "Admin"
            };
            this.sessionId = "admin_" + this.currentPaket.id + "_" + Date.now();
            this.gotoConfirmPage();
            return;
        }

        if (!navigator.onLine) return Swal.fire('Offline', 'Wajib online untuk login.', 'error');
        this.currentPaket = PAKET_SOAL[idx];
        Swal.fire({ title: 'Verifikasi...', didOpen: () => Swal.showLoading() });

        try {
            let snap = await db.ref('pendaftaran').orderByChild('email').equalTo(email).once('value');
            let emailFound = false;
            let studentData = null;
            let studentKey = null;

            if (snap.exists()) {
                snap.forEach(child => {
                    let data = child.val();
                    if (data.email && data.email.toLowerCase() === email) {
                        emailFound = true;
                        if (data.id_paket === this.currentPaket.id) {
                            studentData = data;
                            studentKey = child.key;
                        }
                    }
                });
            }

            // CEK CLASS_USERS JIKA TERDAPAT LINKED_CLASS
            if (!studentData && this.currentPaket.linked_class) {
                let classSnap = await db.ref('class_users/' + this.currentPaket.linked_class + '/profil_siswa').once('value');
                if (classSnap.exists()) {
                    classSnap.forEach(child => {
                        let data = child.val();
                        if (data.email && data.email.toLowerCase() === email) {
                            emailFound = true;
                            // mapping data class ke studentData
                            studentData = {
                                nama_siswa: data.nama,
                                email: data.email,
                                sekolah: data.asal_sekolah || "-",
                                kelas: data.kelas || "-",
                                kota: data.asal_kota || "-",
                                id_paket: this.currentPaket.id,
                                role: 'Kelas' // Role = 'Kelas' untuk mendapatkan privilege penuh
                            };
                            studentKey = child.key;
                        }
                    });
                }
            }

            if (emailFound) {
                if (studentData) {
                    // SEKARANG KITA BARU MENDOWNLOAD FULL SOAL HANYA UNTUK PAKET INI
                    let soalSnap = await db.ref('published_soal/' + this.currentPaket.id).once('value');
                    if (soalSnap.exists()) {
                        this.currentPaket = soalSnap.val();
                        this.currentPaket.id = soalSnap.key;
                    } else {
                        Swal.fire('Error', 'Soal belum dipublish oleh Admin.', 'error');
                        return;
                    }

                    const safeEmail = email.replace(/\./g, '_');
                    const tempSessionId = this.currentPaket.id + "_" + safeEmail;

                    db.ref('sessions/' + tempSessionId).once('value').then(sesSnap => {
                        let sessionData = sesSnap.val();

                        if (sessionData && sessionData.status === 'finished') {
                            Swal.close();
                            this.userData = { nama: studentData.nama_siswa, email: email, role: studentData.role || studentData.jalur };
                            this.sessionId = tempSessionId;

                            this.answers = sessionData.answers || {};

                            Swal.close();
                            let durasiStr = sessionData.durasi_teks || "-";
                            if (durasiStr === "-" && sessionData.startTime && sessionData.finishTime) {
                                let dMs = sessionData.finishTime - sessionData.startTime;
                                let menit = Math.floor(dMs / 60000);
                                let detik = Math.floor((dMs % 60000) / 1000);
                                durasiStr = `${menit} Menit ${detik} Detik`;
                            }

                            this.tampilkanHalamanHasil(sessionData.skor_akhir || 0, durasiStr, sessionData.detail || []);
                            return;
                        }

                        const now = new Date();
                        const strBuka = this.currentPaket.waktu_buka ? this.currentPaket.waktu_buka.replace(' ', 'T') : null;
                        const strTutup = this.currentPaket.waktu_tutup ? this.currentPaket.waktu_tutup.replace(' ', 'T') : null;

                        const waktuBuka = strBuka ? new Date(strBuka) : null;
                        const waktuTutup = strTutup ? new Date(strTutup) : null;

                        if (waktuBuka && now < waktuBuka) {
                            window.tempKartuCBT = {
                                nama: studentData.nama_siswa || "-",
                                email: email,
                                sekolah: studentData.sekolah || "-",
                                kelas: studentData.kelas || "-",
                                kota: studentData.kota || "-",
                                role: studentData.role || "-",
                                event: "Try Out CBT",
                                paket: this.currentPaket.judul || "-",
                                durasi: this.currentPaket.waktu || 120,
                                jumlahSoal: this.currentPaket.soal ? this.currentPaket.soal.length : 0
                            };

                            Swal.fire({
                                title: 'Anda Terdaftar!',
                                html: `
                                    <div style="margin-top: 10px;">
                                        <p style="color: #666; font-size: 0.95rem;">Status peserta Anda <strong>AKTIF</strong>, namun sesi ujian untuk paket ini belum dimulai.</p>
                                        <div style="background: #eaf6ff; border-left: 4px solid #007bff; padding: 12px; margin: 15px 0; border-radius: 6px; text-align: left;">
                                            <strong style="color: #0056b3; font-size: 0.9rem;">Ujian dapat dikerjakan mulai:</strong><br>
                                            <span style="font-size: 1.1rem; font-weight: bold; color: #333;">
                                                ${waktuBuka.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })} WIB
                                            </span>
                                        </div>
                                        <button onclick="app.unduhKartuDariCBT()" style="margin-top:5px; background:#2563eb; color:white; border:none; padding:10px 15px; border-radius:6px; cursor:pointer; width:100%; font-weight:bold; font-size:1rem;">
                                            <i class="fa-solid fa-file-pdf"></i> Download Kartu Peserta
                                        </button>
                                    </div>
                                `,
                                icon: 'success', showConfirmButton: false, showCloseButton: true
                            });
                            return;
                        }

                        if (waktuTutup && now > waktuTutup) {
                            Swal.fire({
                                title: 'Akses Ujian Ditutup',
                                html: `
                                    <div style="margin-top: 10px;">
                                        <p style="color: #666;">Batas waktu akses/login untuk mengerjakan paket soal ini telah berakhir pada:</p>
                                        <p style="font-weight: bold; color: #dc3545; font-size: 1.1rem; margin-top: 10px;">
                                            ${waktuTutup.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })} WIB
                                        </p>
                                        <p style="color: #666; margin-top:10px;">Anda akan diarahkan ke halaman Pembahasan (jika hak akses Anda mengizinkan).</p>
                                    </div>
                                `,
                                icon: 'info', confirmButtonText: 'Lanjut ke Pembahasan', confirmButtonColor: '#007bff'
                            }).then(() => {
                                this.userData = { nama: studentData.nama_siswa, email: email, role: studentData.role || studentData.jalur };
                                this.answers = {};
                                this.tampilkanHalamanHasil(0, "Tidak Mengerjakan", []);
                            });
                            return;
                        }

                        const formatWaktu = (date) => date ? date.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : 'Tidak dibatasi';
                        const rentangWaktu = `${formatWaktu(waktuBuka)} WIB - ${formatWaktu(waktuTutup)} WIB`;

                        Swal.fire({
                            title: 'Status: Terdaftar! ✅',
                            html: `
                                <div style="text-align: left; font-size: 0.95rem; color: #444; margin-top: 10px;">
                                    <p>Ujian untuk paket ini sudah dapat dikerjakan saat ini.</p>
                                    <div style="background: #f8f9fa; border: 1px solid #ddd; padding: 10px; border-radius: 6px; margin: 15px 0;">
                                        <strong style="color: #007bff;"><i class="fa-regular fa-clock"></i> Rentang Waktu Ujian:</strong><br>
                                        <span style="font-size: 0.9rem; font-weight: bold;">${rentangWaktu}</span>
                                    </div>
                                    <div style="background: #fff3cd; border: 2px dashed #dc3545; padding: 12px; border-radius: 8px; margin-top: 15px;">
                                        <strong style="color: #dc3545; font-size: 1.1rem;"><i class="fa-solid fa-triangle-exclamation"></i> PERINGATAN PENTING:</strong><br>
                                        <span style="font-size: 0.95rem; color: #333; font-weight: bold;">
                                            Jika kamu mengklik tombol "Mulai Ujian", kamu akan masuk ke layar soal dan <u>waktu akan langsung berjalan</u>! Kamu tidak bisa kembali atau pindah tab. Pastikan alat tulis sudah siap!
                                        </span>
                                    </div>
                                </div>
                            `,
                            icon: 'info', showCancelButton: true, confirmButtonColor: '#28a745', cancelButtonColor: '#6c757d',
                            confirmButtonText: 'Mulai Ujian 🚀', cancelButtonText: 'Kembali', reverseButtons: true, allowOutsideClick: false
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({ title: 'Memuat Data...', didOpen: () => Swal.showLoading() });

                                this.userData = {
                                    nama: studentData.nama_siswa,
                                    kelas: studentData.kelas,
                                    sekolah: studentData.sekolah,
                                    email: email,
                                    role: studentData.role || studentData.jalur || 'Default'
                                };
                                this.sheetRowIndex = studentKey;
                                this.sessionId = tempSessionId;
                                this.syncWithCloud(false);
                            }
                        });
                    });
                } else {
                    Swal.fire('Gagal', 'Email terdaftar, tapi tidak mempunyai akses untuk Paket Try Out ini.', 'error');
                }
            } else {
                Swal.fire('Gagal', 'Email tidak terdaftar di database.', 'error');
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Gagal koneksi ke server database.', 'error');
        }
    },

    syncWithCloud: function (isResume) {
        db.ref('sessions/' + this.sessionId).once('value').then((snapshot) => {
            const data = snapshot.val();
            Swal.close();

            if (data) {
                if (data.status === 'finished') {
                    localStorage.removeItem('cbt_active_session');
                    this.userData = data.userData || this.userData;

                    let durasiStr = data.durasi_teks || "-";
                    if (durasiStr === "-" && data.startTime && data.finishTime) {
                        let dMs = data.finishTime - data.startTime;
                        let menit = Math.floor(dMs / 60000);
                        let detik = Math.floor((dMs % 60000) / 1000);
                        durasiStr = `${menit} Menit ${detik} Detik`;
                    }
                    this.tampilkanHalamanHasil(data.skor_akhir, durasiStr, data.detail || []);
                    return;
                }

                db.ref('sessions/' + this.sessionId).update({ activeDeviceId: this.deviceId });
                this.restoreSession(data);
            } else {
                if (isResume) { localStorage.removeItem('cbt_active_session'); location.reload(); return; }
                this.gotoConfirmPage();
            }
        });
    },

    gotoConfirmPage: function () {
        document.getElementById('info-mapel').innerText = this.currentPaket.mapel;
        document.getElementById('info-waktu').innerText = this.currentPaket.waktu + " Menit";
        document.getElementById('info-jml-soal').innerText = this.currentPaket.soal.length + " Butir";

        const petunjukList = document.getElementById('info-petunjuk-list');
        if (petunjukList) {
            petunjukList.innerHTML = "";
            const daftarPetunjuk = this.currentPaket.petunjuk || ["Ikuti instruksi pengawas."];
            daftarPetunjuk.forEach(teks => {
                const li = document.createElement('li');
                li.innerHTML = teks;
                petunjukList.appendChild(li);
            });
        }

        const inpNama = document.getElementById('data-nama');
        const inpKelas = document.getElementById('data-kelas');
        const inpSekolah = document.getElementById('data-sekolah');

        if (inpNama) inpNama.value = this.userData.nama;
        if (inpKelas) inpKelas.value = this.userData.kelas;
        if (inpSekolah) inpSekolah.value = this.userData.sekolah;
        this.startSecurityProctor();
        this.switchView('view-data');
    },

    startUjian: function () {
        if (this.userData && this.userData.isAdmin) {
            const dummyData = { startTime: getServerTime(), answers: {}, ragu: {}, status: 'ongoing' };
            this.restoreSession(dummyData);
            return;
        }

        if (!navigator.onLine) return Swal.fire('Offline', 'Koneksi internet diperlukan.', 'warning');
        Swal.fire({ title: 'Memulai Ujian...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        const currentTime = getServerTime();
        db.ref('sessions/' + this.sessionId).once('value').then(snap => {
            if (!snap.exists()) {
                const newSession = {
                    startTime: currentTime,
                    paketId: this.currentPaket.id,
                    userData: this.userData,
                    sheetRowIndex: this.sheetRowIndex,
                    status: 'ongoing',
                    activeDeviceId: this.deviceId
                };
                db.ref('sessions/' + this.sessionId).set(newSession).catch(err => console.error("Firebase Set Error:", err));

                Swal.close();
                this.restoreSession(newSession);
            } else {
                let existingData = snap.val();
                if (typeof existingData.startTime === 'object' || !existingData.startTime) {
                    existingData.startTime = currentTime;
                    db.ref('sessions/' + this.sessionId).update({ startTime: currentTime });
                }

                db.ref('sessions/' + this.sessionId).update({ activeDeviceId: this.deviceId }).catch(err => console.error(err));
                existingData.activeDeviceId = this.deviceId;

                Swal.close();
                this.restoreSession(existingData);
            }
        }).catch(err => {
            console.error(err);
            Swal.fire('Error', 'Gagal membuat sesi ujian. Pastikan aturan database sudah benar.', 'error');
        });
    },

    restoreSession: function (data) {
        localStorage.setItem('cbt_active_session', JSON.stringify({
            sessionId: this.sessionId, paketId: this.currentPaket.id,
            userData: this.userData, sheetRowIndex: this.sheetRowIndex
        }));

        // MUAT CACHE FOTO KALAU HABIS REFRESH
        const savedImages = localStorage.getItem('cbt_images_' + this.sessionId);
        if (savedImages) {
            try { this.capturedImages = JSON.parse(savedImages); } catch (e) { }
        } else {
            this.capturedImages = { start: null, mid: null, end: null };
        }

        this.answers = data.answers || {};
        this.ragu = data.ragu || {};
        cheatCount = data.cheatCount || 0;

        const durasiMenit = this.userData.isAdmin ? 999 : this.currentPaket.waktu;
        this.deadline = data.startTime + (durasiMenit * 60 * 1000);

        if (getServerTime() >= this.deadline && !this.userData.isAdmin) {
            return this.submitData(true);
        }

        if (document.getElementById('disp-nama')) document.getElementById('disp-nama').innerText = this.userData.nama;
        if (document.getElementById('disp-mapel')) document.getElementById('disp-mapel').innerText = this.currentPaket.mapel;

        this.renderSoal(0);
        this.updateGrid();
        this.startTimer();
        this.monitorSingleDevice();
        this.setFont(2);
        this.startSecurityProctor();

        this.switchView('view-ujian');
    },

    monitorSingleDevice: function () {
        if (this.userData.isAdmin) return;
        const deviceRef = db.ref('sessions/' + this.sessionId + '/activeDeviceId');
        deviceRef.on('value', (snapshot) => {
            const activeId = snapshot.val();
            if (activeId && activeId !== this.deviceId) {
                deviceRef.off();
                if (this.timerInterval) clearInterval(this.timerInterval);
                localStorage.removeItem('cbt_active_session');
                Swal.fire({
                    title: 'Logout Otomatis', text: 'Akun login di perangkat lain.',
                    icon: 'error', allowOutsideClick: false, confirmButtonText: 'Keluar'
                }).then(() => location.reload());
            }
        });
    },

    renderSoal: function (index) {
        this.currentIndex = index;
        const totalSoal = this.currentPaket.soal.length;
        const midPoint = Math.floor(totalSoal / 2);

        if (index === 0) { setTimeout(() => this.captureSnapshot('start'), 3000); }
        else if (index === midPoint) { setTimeout(() => this.captureSnapshot('mid'), 1000); }

        const data = this.currentPaket.soal[index];
        document.getElementById('nomor-soal').innerText = index + 1;

        const pStim = document.getElementById('panel-stimulus');
        if (data.stimulus && data.stimulus.tampil) {
            if (this.lastStimulusContent !== data.stimulus.konten) {
                pStim.innerHTML = data.stimulus.konten;
                this.lastStimulusContent = data.stimulus.konten;
                if (window.MathJax) {
                    if (MathJax.typesetPromise) {
                        MathJax.typesetPromise([pStim])
                            .then(() => this.applyDragScrollToMath(pStim))
                            .catch(err => console.error(err));
                    } else if (MathJax.Hub && MathJax.Hub.Queue) {
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub, pStim]);
                        MathJax.Hub.Queue(() => this.applyDragScrollToMath(pStim));
                    }
                }
            }
            pStim.classList.add('active');
        } else {
            pStim.classList.remove('active');
            this.lastStimulusContent = null;
        }

        const pSoal = document.getElementById('panel-soal');
        let html = `<div class="soal-text">${data.pertanyaan}</div>`;
        const jwb = this.answers[index];

        if (data.tipe === 'isian') {
            let textPertanyaan = data.pertanyaan;
            const ansObj = typeof jwb === 'object' && jwb !== null ? jwb : {};

            data.opsi.forEach((opsiStr, i) => {
                const placeholder = `[isian:${i + 1}]`;
                let isianData = { tipe: 'teks' };
                try { isianData = JSON.parse(opsiStr); } catch (e) { }
                let inputType = isianData.tipe === 'jam' ? 'time' : (isianData.tipe === 'angka' ? 'number' : 'text');
                const stepAttr = isianData.tipe === 'jam' ? 'step="1"' : '';
                const val = ansObj[i] || '';

                let boxWidth = 200;
                if (isianData.tipe === 'teks' && isianData.kunci) {
                    const longestKey = isianData.kunci.split('|').reduce((a, b) => a.length > b.length ? a : b, "");
                    boxWidth = Math.max(150, Math.ceil((longestKey.length * 12) / 50) * 50);
                }

                let extraOnInput = "";
                if (this.currentPaket.force_isian_angka) {
                    inputType = "tel"; // type="tel" memunculkan keyboard angka di HP tapi tetap bisa terima simbol.
                    extraOnInput = "this.value=this.value.replace(new RegExp('[^0-9.,+*()^:=/ -]', 'g'), ''); ";
                }

                const inputHtml = `<input type="${inputType}" ${stepAttr} value="${val.replace(/"/g, '&quot;')}" oninput="${extraOnInput}app.inputIsian('${i}', this.value)" style="border:2px solid #cbd5e1; background:#f8fafc; padding:8px 15px; border-radius:8px; font-weight:bold; font-size:1.1rem; color:var(--primary); width:${boxWidth}px; max-width:100%; text-align:center; display:inline-block; transition: all 0.2s ease; outline:none;" onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(37,99,235,0.2)';" onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='none';">`;

                textPertanyaan = textPertanyaan.split(placeholder).join(inputHtml);
            });
            html = `<div class="soal-text">${textPertanyaan}</div>`;
        } else if (data.tipe === 'pg') {
            html += `<div class="pilihan-wrapper">`;
            data.opsi.forEach((opt, i) => {
                const char = String.fromCharCode(65 + i);
                const active = jwb === char ? 'active' : '';
                html += `<div class="opsi-item ${active}" onclick="app.selectAnswer('${char}')"><div class="marker">${char}</div><div class="text">${opt}</div></div>`;
            });
            html += `</div>`;
        } else if (data.tipe === 'pgk') {
            html += `<div class="pilihan-wrapper">`;
            const arr = Array.isArray(jwb) ? jwb : [];
            data.opsi.forEach((opt, i) => {
                const val = i.toString();
                const active = arr.includes(val) ? 'active' : '';
                html += `<div class="opsi-item ${active}" onclick="app.toggleCheck('${val}')"><div class="marker"><i class="fa-solid fa-check"></i></div><div class="text">${opt}</div></div>`;
            });
            html += `</div>`;
        } else if (data.tipe === 'pgk-kategori') {
            const obj = jwb || {};
            const label = data.label_pgk || ["B", "S"];

            html += `<table class="table-bs">
                        <thead>
                            <tr>
                                <th>Pernyataan</th>
                                <th width="80">${label[0]}</th>
                                <th width="80">${label[1]}</th>
                            </tr>
                        </thead>
                        <tbody>`;

            data.opsi.forEach((row, i) => {
                const val = i.toString();
                const opt1 = obj[val] === 'L1' ? 'checked' : '';
                const opt2 = obj[val] === 'L2' ? 'checked' : '';

                html += `<tr>
                            <td>${row}</td>
                            <td class="text-center">
                                <label class="custom-radio-container">
                                    <input type="radio" name="bs-${i}" ${opt1} onchange="app.selectBS('${val}','L1')">
                                    <span class="radio-style"></span>
                                </label>
                            </td>
                            <td class="text-center">
                                <label class="custom-radio-container">
                                    <input type="radio" name="bs-${i}" ${opt2} onchange="app.selectBS('${val}','L2')">
                                    <span class="radio-style"></span>
                                </label>
                            </td>
                        </tr>`;
            });
        } else if (data.tipe === 'esai') {
            let imgList = [];
            if (jwb && typeof jwb === 'object') {
                if (Array.isArray(jwb.images)) {
                    imgList = jwb.images;
                } else if (jwb.imageUrl) {
                    imgList = [{ url: jwb.imageUrl, publicId: jwb.publicId || '' }];
                }
            }

            let cardsHtml = '';
            if (imgList.length > 0) {
                cardsHtml += `<div class="esai-gallery-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); gap:15px; margin-top:15px;">`;
                imgList.forEach((img, fIdx) => {
                    cardsHtml += `
                        <div class="esai-card" style="background:#f8fafc; border:2px solid #e2e8f0; border-radius:12px; padding:10px; display:flex; flex-direction:column; gap:8px; position:relative; box-shadow:0 2px 4px rgba(0,0,0,0.04);">
                            <div style="font-weight:700; font-size:0.85rem; color:var(--primary); display:flex; justify-content:space-between; align-items:center;">
                                <span><i class="fa-solid fa-file-image"></i> Lembar ${fIdx + 1}</span>
                                <button type="button" onclick="app.hapusFotoEsai(${index}, ${fIdx})" style="background:none; border:none; color:#ef4444; cursor:pointer; padding:2px 6px; font-size:0.9rem;" title="Hapus foto ini"><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                            <div style="width:100%; height:140px; border-radius:8px; overflow:hidden; background:#e2e8f0; cursor:pointer; position:relative;" onclick="app.previewFotoEsai('${img.url}', 'Lembar ${fIdx + 1}')">
                                <img src="${img.url}" alt="Lembar ${fIdx + 1}" style="width:100%; height:100%; object-fit:cover; display:block;">
                                <div style="position:absolute; bottom:0; left:0; right:0; background:rgba(0,0,0,0.6); color:white; font-size:0.75rem; text-align:center; padding:3px;"><i class="fa-solid fa-magnifying-glass-plus"></i> Klik Perbesar</div>
                            </div>
                        </div>
                    `;
                });
                cardsHtml += `</div>`;

                html += `
                    <div class="esai-answer-container" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:14px; padding:20px; margin-top:20px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; border-bottom:1px solid #e2e8f0; padding-bottom:12px;">
                            <div>
                                <span class="badge" style="background:#dcfce7; color:#15803d; font-weight:700; padding:6px 12px; border-radius:20px; font-size:0.85rem;">
                                    <i class="fa-solid fa-circle-check"></i> ${imgList.length} Lembar Jawaban Terunggah
                                </span>
                            </div>
                            <div style="display:flex; gap:8px;">
                                <button type="button" class="btn btn-primary" onclick="document.getElementById('input-esai-add-${index}').click()" style="padding:8px 14px; font-size:0.85rem;">
                                    <i class="fa-solid fa-plus"></i> Tambah Foto Lembar Lain
                                </button>
                                <input type="file" id="input-esai-add-${index}" accept="image/*" multiple style="display:none;" onchange="app.handleEsaiFileSelect(this, ${index})">
                            </div>
                        </div>
                        ${cardsHtml}
                    </div>
                `;
            } else {
                html += `
                    <div class="esai-upload-zone" style="background:#f8fafc; border:2px dashed #94a3b8; border-radius:16px; padding:35px 20px; margin-top:25px; text-align:center; transition:all 0.2s ease;">
                        <div style="width:64px; height:64px; background:#e0f2fe; color:var(--primary); border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:1.8rem; margin-bottom:15px;">
                            <i class="fa-solid fa-camera"></i>
                        </div>
                        <h4 style="font-size:1.15rem; font-weight:800; color:var(--text-dark); margin-bottom:6px;">Unggah Lembar Jawaban Tulisan Tangan</h4>
                        <p style="font-size:0.9rem; color:var(--text-muted); max-width:500px; margin:0 auto 20px auto;">
                            Tuliskan jawaban Anda di kertas, lalu ambil foto menggunakan kamera HP atau pilih dari berkas galeri. (Bisa memilih lebih dari 1 foto sekaligus).
                        </p>
                        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
                            <button type="button" class="btn btn-primary" onclick="document.getElementById('input-esai-${index}').click()" style="padding:12px 22px; font-size:0.95rem; font-weight:700; border-radius:10px;">
                                <i class="fa-solid fa-images"></i> Pilih Foto dari Perangkat
                            </button>
                            <button type="button" class="btn btn-outline" onclick="document.getElementById('input-esai-cam-${index}').click()" style="padding:12px 22px; font-size:0.95rem; font-weight:700; border-radius:10px; border-color:var(--primary); color:var(--primary); background:white;">
                                <i class="fa-solid fa-camera"></i> Buka Kamera Langsung
                            </button>
                        </div>
                        <input type="file" id="input-esai-${index}" accept="image/*" multiple style="display:none;" onchange="app.handleEsaiFileSelect(this, ${index})">
                        <input type="file" id="input-esai-cam-${index}" accept="image/*" capture="environment" style="display:none;" onchange="app.handleEsaiFileSelect(this, ${index})">
                    </div>
                `;
            }
        }

        pSoal.innerHTML = html;

        if (window.MathJax) {
            if (MathJax.typesetPromise) {
                MathJax.typesetPromise([pSoal])
                    .then(() => this.applyDragScrollToMath(pSoal))
                    .catch(err => console.error(err));
            } else if (MathJax.Hub && MathJax.Hub.Queue) {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, pSoal]);
                MathJax.Hub.Queue(() => this.applyDragScrollToMath(pSoal));
            }
        }

        document.getElementById('check-ragu').checked = this.ragu[index] || false;
        this.updateGrid();
        this.updateNavButtons(index);
    },

    handleEsaiFileSelect: async function(input, index) {
        if (!input.files || input.files.length === 0) return;
        const files = Array.from(input.files);
        input.value = '';
        await this.uploadJawabanEsai(files, index);
    },

    uploadJawabanEsai: async function(files, index) {
        if (!files || files.length === 0) return;

        Swal.fire({
            title: `Mengunggah ${files.length} Lembar Jawaban...`,
            html: `<div style="margin-top:10px;"><i class="fa-solid fa-spinner fa-spin" style="font-size:2.2rem; color:var(--primary);"></i><p style="margin-top:12px; font-size:0.9rem; color:#64748b;">Mengompresi dan mengunggah foto ke Cloudinary...</p></div>`,
            allowOutsideClick: false,
            showConfirmButton: false
        });

        try {
            let uploadedList = [];
            for (let i = 0; i < files.length; i++) {
                const f = files[i];
                const compressedBlob = await compressImageClient(f);
                
                const formData = new FormData();
                formData.append('file', compressedBlob, `esai_${this.sessionId || 'siswa'}_soal_${index + 1}_${Date.now()}_${i}.jpg`);
                formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

                const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`, {
                    method: 'POST',
                    body: formData
                });

                const data = await res.json();
                if (data.secure_url) {
                    uploadedList.push({
                        url: data.secure_url,
                        publicId: data.public_id || '',
                        uploadedAt: Date.now()
                    });
                } else {
                    throw new Error(data.error?.message || 'Gagal mengunggah foto ke Cloudinary.');
                }
            }

            let cur = this.answers[index];
            let existingImages = [];
            if (cur && typeof cur === 'object') {
                if (Array.isArray(cur.images)) existingImages = [...cur.images];
                else if (cur.imageUrl) existingImages = [{ url: cur.imageUrl, publicId: cur.publicId || '' }];
            }

            existingImages.push(...uploadedList);

            this.answers[index] = {
                tipe: 'esai',
                images: existingImages,
                imageUrl: existingImages[0]?.url || '',
                nilai_esai: (cur && cur.nilai_esai !== undefined) ? cur.nilai_esai : null,
                catatan_guru: (cur && cur.catatan_guru) ? cur.catatan_guru : ''
            };

            this.saveRealtime();
            this.renderSoal(index);
            this.updateGrid();

            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: `${uploadedList.length} foto lembar jawaban berhasil diunggah.`,
                timer: 2000,
                showConfirmButton: false
            });
        } catch (err) {
            console.error("Cloudinary Upload Error:", err);
            Swal.fire('Gagal Upload', 'Terjadi kesalahan saat mengunggah: ' + err.message, 'error');
        }
    },

    hapusFotoEsai: function(soalIdx, fotoIdx) {
        Swal.fire({
            title: 'Hapus Foto Ini?',
            text: `Lembar foto ${fotoIdx + 1} akan dihapus dari jawaban Anda.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Ya, Hapus'
        }).then(res => {
            if (res.isConfirmed) {
                let cur = this.answers[soalIdx];
                if (cur && typeof cur === 'object') {
                    let list = Array.isArray(cur.images) ? [...cur.images] : (cur.imageUrl ? [{ url: cur.imageUrl }] : []);
                    list.splice(fotoIdx, 1);
                    if (list.length > 0) {
                        this.answers[soalIdx] = {
                            ...cur,
                            images: list,
                            imageUrl: list[0].url
                        };
                    } else {
                        delete this.answers[soalIdx];
                    }
                    this.saveRealtime();
                    this.renderSoal(soalIdx);
                    this.updateGrid();
                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Foto terhapus', timer: 1500, showConfirmButton: false });
                }
            }
        });
    },

    previewFotoEsai: function(url, title = 'Lembar Jawaban') {
        let rotation = 0;
        let zoomLevel = 1;
        Swal.fire({
            title: title,
            html: `
                <div style="overflow:hidden; max-height:65vh; display:flex; justify-content:center; align-items:center; background:#0f172a; border-radius:10px; padding:10px; position:relative;">
                    <img id="swal-preview-img" src="${url}" style="max-width:100%; max-height:60vh; object-fit:contain; transition:transform 0.2s ease; transform:rotate(0deg) scale(1);">
                </div>
                <div style="display:flex; justify-content:center; gap:10px; margin-top:15px; flex-wrap:wrap;">
                    <button type="button" class="btn btn-outline" onclick="(() => { rotation = (rotation + 90) % 360; document.getElementById('swal-preview-img').style.transform = 'rotate(' + rotation + 'deg) scale(' + zoomLevel + ')'; })()"><i class="fa-solid fa-rotate-right"></i> Putar 90°</button>
                    <button type="button" class="btn btn-outline" onclick="(() => { zoomLevel = Math.min(zoomLevel + 0.25, 3); document.getElementById('swal-preview-img').style.transform = 'rotate(' + rotation + 'deg) scale(' + zoomLevel + ')'; })()"><i class="fa-solid fa-magnifying-glass-plus"></i> Zoom In</button>
                    <button type="button" class="btn btn-outline" onclick="(() => { zoomLevel = Math.max(zoomLevel - 0.25, 0.5); document.getElementById('swal-preview-img').style.transform = 'rotate(' + rotation + 'deg) scale(' + zoomLevel + ')'; })()"><i class="fa-solid fa-magnifying-glass-minus"></i> Zoom Out</button>
                    <a href="${url}" target="_blank" class="btn btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Tab Baru</a>
                </div>
            `,
            width: '800px',
            showCloseButton: true,
            showConfirmButton: false
        });
    },

    applyDragScrollToMath: function (container) {
        if (!container) return;
        const mathContainers = container.querySelectorAll('mjx-container');
        mathContainers.forEach(el => {
            if (el.dataset.dragScrollApplied) return;
            el.dataset.dragScrollApplied = "true";

            let isDown = false;
            let startX;
            let scrollLeft;

            const checkCursor = () => {
                if (el.scrollWidth > el.clientWidth) {
                    el.style.cursor = 'grab';
                } else {
                    el.style.cursor = '';
                }
            };

            el.addEventListener('mouseenter', checkCursor);
            el.addEventListener('mouseover', checkCursor);

            el.addEventListener('mousedown', (e) => {
                if (el.scrollWidth <= el.clientWidth) return;
                isDown = true;
                el.style.cursor = 'grabbing';
                el.style.userSelect = 'none';
                startX = e.pageX - el.offsetLeft;
                scrollLeft = el.scrollLeft;
            });

            el.addEventListener('mouseleave', () => {
                isDown = false;
                checkCursor();
            });

            el.addEventListener('mouseup', () => {
                isDown = false;
                checkCursor();
            });

            el.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - el.offsetLeft;
                const walk = (x - startX) * 1.5;
                el.scrollLeft = scrollLeft - walk;
            });
        });
    },

    inputIsian: function (idx, val) {
        let obj = this.answers[this.currentIndex] || {};
        obj[idx] = val;
        this.answers[this.currentIndex] = obj;
        this.updateGrid();
        this.saveRealtime();
    },
    selectAnswer: function (val) { this.answers[this.currentIndex] = val; this.renderSoal(this.currentIndex); this.saveRealtime(); },
    toggleCheck: function (val) {
        let arr = this.answers[this.currentIndex] || [];
        if (!Array.isArray(arr)) arr = [];
        if (arr.includes(val)) arr = arr.filter(x => x !== val); else arr.push(val);
        this.answers[this.currentIndex] = arr; this.renderSoal(this.currentIndex); this.saveRealtime();
    },
    selectBS: function (r, v) {
        let obj = this.answers[this.currentIndex] || {}; obj[r] = v; this.answers[this.currentIndex] = obj; this.updateGrid(); this.saveRealtime();
    },
    setRagu: function () { this.ragu[this.currentIndex] = document.getElementById('check-ragu').checked; this.updateGrid(); this.saveRealtime(); },

    saveRealtime: function () {
        if (this.userData.isAdmin) return;
        if (this.sessionId) {
            const cleanAnswers = {};
            const totalSoal = this.currentPaket.soal.length;
            for (let i = 0; i < totalSoal; i++) {
                if (this.answers[i] !== undefined && this.answers[i] !== null) {
                    cleanAnswers[i] = this.answers[i];
                }
            }
            if (Object.keys(cleanAnswers).length === 0) cleanAnswers["empty"] = true;
            db.ref('sessions/' + this.sessionId).update({
                answers: cleanAnswers,
                ragu: this.ragu,
                cheatCount: cheatCount,
                lastUpdate: firebase.database.ServerValue.TIMESTAMP
            }).catch(err => console.error(err));
        }
    },

    prevSoal: function () { this.navigasi(-1); },
    nextSoal: function () { this.navigasi(1); },
    navigasi: function (step) {
        const next = this.currentIndex + step;
        if (next >= 0 && next < this.currentPaket.soal.length) this.renderSoal(next);
    },

    updateNavButtons: function (index) {
        const total = this.currentPaket.soal.length;
        const isLast = (index === total - 1);
        const isFirst = (index === 0);

        const btnNextDesk = document.getElementById('btn-next-desktop');
        const btnNextMob = document.getElementById('btn-next-mobile');
        const btnPrevDesk = document.querySelector('.btn-nav.prev');
        const btnPrevMob = document.querySelector('.btn-mobile-icon.prev');

        if (btnPrevDesk) btnPrevDesk.disabled = isFirst;
        if (btnPrevMob) btnPrevMob.disabled = isFirst;

        const updateStyle = (btn, isMob) => {
            if (!btn) return;
            btn.classList.remove('btn-selesai');
            if (isLast) {
                btn.innerHTML = isMob ? '<i class="fa-solid fa-check"></i>' : 'SELESAI <i class="fa-solid fa-check"></i>';
                btn.classList.add('btn-selesai');
                btn.onclick = () => app.confirmSubmit();
            } else {
                btn.innerHTML = isMob ? '<i class="fa-solid fa-chevron-right"></i>' : 'SELANJUTNYA <i class="fa-solid fa-chevron-right"></i>';
                btn.onclick = () => app.nextSoal();
            }
        };

        updateStyle(btnNextDesk, false);
        updateStyle(btnNextMob, true);
    },

    updateGrid: function () {
        const c = document.getElementById('grid-container');
        if (!c) return;
        let h = '';
        this.currentPaket.soal.forEach((_, i) => {
            let cls = '';
            const ans = this.answers[i];
            const isAns = ans && (
                (Array.isArray(ans) && ans.length > 0) || 
                (typeof ans === 'object' && ((ans.images && ans.images.length > 0) || ans.imageUrl || Object.keys(ans).length > 0)) || 
                (typeof ans === 'string' && ans.length > 0)
            );
            if (i === this.currentIndex) cls += ' current';
            if (isAns) cls += ' answered';
            if (this.ragu[i]) cls += ' ragu';
            h += `<div class="grid-item ${cls}" onclick="app.renderSoal(${i})">${i + 1}</div>`;
        });
        c.innerHTML = h;
    },

    startTimer: function () {
        if (this.timerInterval) clearInterval(this.timerInterval);
        const timerDisplay = document.getElementById('time-val');

        this.timerInterval = setInterval(() => {
            if (!timerDisplay) return;

            const sekarang = getServerTime();
            const sisaDetik = Math.floor((this.deadline - sekarang) / 1000);

            if (sisaDetik <= 0) {
                clearInterval(this.timerInterval);
                timerDisplay.innerText = "00:00:00";
                if (!this.userData.isAdmin) {
                    Swal.fire({
                        title: 'Waktu Habis!', text: 'Jawaban Anda akan dikirim otomatis.', icon: 'warning', timer: 2000, showConfirmButton: false
                    }).then(() => { this.submitData(true); });
                }
                return;
            }

            const h = Math.floor(sisaDetik / 3600).toString().padStart(2, '0');
            const m = Math.floor((sisaDetik % 3600) / 60).toString().padStart(2, '0');
            const s = (sisaDetik % 60).toString().padStart(2, '0');
            timerDisplay.innerText = `${h}:${m}:${s}`;

            if (sisaDetik < 300) { timerDisplay.style.color = 'red'; timerDisplay.classList.add('blink'); }
        }, 1000);
    },

    confirmSubmit: function () {
        this.captureSnapshot('end');
        Swal.fire({
            title: 'Konfirmasi', text: "Yakin ingin mengakhiri ujian?", icon: 'question', showCancelButton: true, confirmButtonColor: '#28a745', confirmButtonText: 'Ya, Kumpulkan'
        }).then((res) => { if (res.isConfirmed) this.submitData(false); });
    },

    calculateResult: function () {
        let detail = [];
        let benarCount = 0;
        let totalPoinDiperoleh = 0;
        let totalPoinMaksimal = 0;

        const totalSoal = this.currentPaket.soal.length;
        const isSistemPoin = this.currentPaket.sistem_poin === true;

        this.currentPaket.soal.forEach((soal, i) => {
            const jwb = this.answers[i];
            const kunci = soal.kunci;
            let status = "SALAH";
            let poinMaksSoalIni = soal.poin !== undefined ? soal.poin : 1;

            if (isSistemPoin) totalPoinMaksimal += poinMaksSoalIni;

            if (!jwb) { detail.push("KOSONG"); return; }

            if (soal.tipe === 'pg') {
                if (jwb === kunci) status = "BENAR";
            } else if (soal.tipe === 'pgk') {
                if (Array.isArray(jwb) && Array.isArray(kunci)) {
                    if (JSON.stringify([...jwb].sort()) === JSON.stringify([...kunci].sort())) status = "BENAR";
                }
            } else if (soal.tipe === 'pgk-kategori') {
                let isPerfect = true;
                for (let r of Object.keys(kunci)) {
                    if (!jwb[r] || jwb[r] !== kunci[r]) { isPerfect = false; break; }
                }
                if (isPerfect) status = "BENAR";
            } else if (soal.tipe === 'isian') {
                let isPerfect = true;
                const jwbObj = typeof jwb === 'object' && jwb !== null ? jwb : {};

                if (soal.opsi && Array.isArray(soal.opsi)) {
                    soal.opsi.forEach((opsiStr, blankIdx) => {
                        try {
                            const isianData = JSON.parse(opsiStr);
                            const jwbSiswa = (jwbObj[blankIdx] || "").trim();

                            const keys = (isianData.kunci || "").split('|').map(k => k.trim().toLowerCase());
                            let matched = jwbSiswa && keys.includes(jwbSiswa.toLowerCase());

                            if (!matched && isianData.ai && isianData.tipe === 'teks') {
                                if (app.aiResults && app.aiResults[i] && app.aiResults[i][blankIdx] === true) {
                                    matched = true;
                                }
                            }

                            if (!matched) isPerfect = false;
                        } catch (e) { isPerfect = false; }
                    });
                } else {
                    isPerfect = false;
                }

                if (isPerfect) status = "BENAR";
            } else if (soal.tipe === 'esai') {
                const imgList = (jwb && Array.isArray(jwb.images)) ? jwb.images : (jwb && jwb.imageUrl ? [{ url: jwb.imageUrl }] : []);
                if (imgList.length > 0) {
                    if (jwb.nilai_esai !== null && jwb.nilai_esai !== undefined) {
                        let nVal = parseFloat(jwb.nilai_esai) || 0;
                        if (isSistemPoin) totalPoinDiperoleh += nVal;
                        if (nVal >= poinMaksSoalIni) status = "BENAR";
                        else if (nVal > 0) status = "SEBAGIAN";
                        else status = "SALAH";
                    } else {
                        status = "MENUNGGU_KOREKSI";
                    }
                } else {
                    status = "KOSONG";
                }
            }

            if (status === "BENAR") {
                benarCount++;
                if (isSistemPoin) totalPoinDiperoleh += poinMaksSoalIni;
            }
            detail.push(status);
        });

        let skorAkhir = 0;

        let poinDidapat = isSistemPoin ? totalPoinDiperoleh : benarCount;
        let poinMaksimal = isSistemPoin ? totalPoinMaksimal : totalSoal;

        if (this.currentPaket.mode_skor === 'asli') {
            skorAkhir = poinDidapat;
        } else {
            let maxScore = parseFloat(this.currentPaket.base_poin) || 100;
            let pembagi = poinMaksimal > 0 ? poinMaksimal : 1;
            skorAkhir = (poinDidapat / pembagi) * maxScore;
        }

        return { skor: skorAkhir.toFixed(2), detail: detail };
    },

    submitData: async function (force) {
        if (this.isSubmitting) return;
        this.isSubmitting = true;
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.captureSnapshot('end');
        this.stopSecurityProctor();

        Swal.fire({ title: 'Memproses Nilai...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        let aiPayload = [];
        if (this.currentPaket && this.currentPaket.soal) {
            this.currentPaket.soal.forEach((soal, i) => {
                if (soal.tipe === 'isian' && soal.opsi) {
                    const jwbObj = this.answers[i] || {};
                    soal.opsi.forEach((opsiStr, blankIdx) => {
                        try {
                            const isianData = JSON.parse(opsiStr);
                            if (isianData.ai && isianData.tipe === 'teks') {
                                const jwbSiswa = (jwbObj[blankIdx] || "").trim();
                                const keys = (isianData.kunci || "").split('|').map(k => k.trim().toLowerCase());
                                if (jwbSiswa && !keys.includes(jwbSiswa.toLowerCase())) {
                                    aiPayload.push({
                                        id_soal: i,
                                        id_blank: blankIdx,
                                        jawaban_siswa: jwbSiswa,
                                        kunci: isianData.kunci
                                    });
                                }
                            }
                        } catch (e) { }
                    });
                }
            });
        }

        if (aiPayload.length > 0 && navigator.onLine) {
            Swal.fire({ title: 'Jawabanmu sedang kami koreksi...', text: 'Mohon tunggu sebentar...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            try {
                const res = await fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    headers: { "Content-Type": "text/plain;charset=utf-8" },
                    body: JSON.stringify({ action: "evaluasi_isian", answers: aiPayload })
                });
                const jsonRes = await res.json();
                if (jsonRes.status === 'success' && Array.isArray(jsonRes.data)) {
                    this.aiResults = this.aiResults || {};
                    aiPayload.forEach((req, idx) => {
                        if (!this.aiResults[req.id_soal]) this.aiResults[req.id_soal] = {};
                        let isBenar = jsonRes.data[idx] === true || jsonRes.data[idx] === "true" || jsonRes.data[idx] === "True" || jsonRes.data[idx] === "TRUE";
                        this.aiResults[req.id_soal][req.id_blank] = isBenar;
                    });
                }
            } catch (e) { console.error("AI Eval Error", e); }
            Swal.fire({ title: 'Menyelesaikan Pemrosesan...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        }

        const result = this.calculateResult();

        let teksDurasi = "Tidak diketahui";
        let durasiDetikVal = 999999;
        if (this.currentPaket && this.deadline) {
            const sisaDetik = Math.floor((this.deadline - getServerTime()) / 1000);
            const totalWaktuDetik = this.userData.isAdmin ? 999 * 60 : this.currentPaket.waktu * 60;
            let durasiDetik = totalWaktuDetik - sisaDetik;
            if (durasiDetik < 0) durasiDetik = 0;
            if (durasiDetik > totalWaktuDetik) durasiDetik = totalWaktuDetik;
            const menit = Math.floor(durasiDetik / 60);
            const detik = durasiDetik % 60;
            teksDurasi = `${menit} Menit ${detik} Detik`;
            durasiDetikVal = durasiDetik;
        }

        // --- BYPASS ADMIN LOGIC: Tidak nunggu Firebase agar tidak stuck! ---
        if (this.userData && this.userData.isAdmin) {
            localStorage.removeItem('cbt_active_session');
            localStorage.removeItem('cbt_images_' + this.sessionId); // bersihkan cache foto
            Swal.close();
            this.tampilkanHalamanHasil(result.skor, teksDurasi, result.detail);
            Swal.fire({ title: 'Simulasi Selesai', text: 'Data admin tidak dikirim ke database. Menampilkan hasil...', icon: 'success', timer: 2500, showConfirmButton: false });
            return;
        }

        if (!navigator.onLine) return Swal.fire('Error', 'Tidak ada koneksi internet. Pastikan jaringan stabil.', 'error');

        const cleanAnswers = {};
        const totalSoal = this.currentPaket.soal.length;
        for (let i = 0; i < totalSoal; i++) {
            if (this.answers[i] !== undefined && this.answers[i] !== null) {
                cleanAnswers[i] = this.answers[i];
            }
        }
        if (Object.keys(cleanAnswers).length === 0) cleanAnswers["empty"] = true;

        let rootUpdates = {};
        rootUpdates['sessions/' + this.sessionId + '/status'] = 'finished';
        rootUpdates['sessions/' + this.sessionId + '/skor_akhir'] = result.skor;
        rootUpdates['sessions/' + this.sessionId + '/answers'] = cleanAnswers;
        rootUpdates['sessions/' + this.sessionId + '/finishTime'] = firebase.database.ServerValue.TIMESTAMP;
        rootUpdates['sessions/' + this.sessionId + '/durasi_teks'] = teksDurasi;
        rootUpdates['sessions/' + this.sessionId + '/detail'] = result.detail;
        rootUpdates['sessions/' + this.sessionId + '/cheatCount'] = cheatCount;
        
        rootUpdates['leaderboard/' + this.currentPaket.id + '/' + this.sessionId] = {
            skor: result.skor,
            durasiMs: durasiDetikVal * 1000
        };

        db.ref().update(rootUpdates).then(() => {
            localStorage.removeItem('cbt_active_session');
            localStorage.removeItem('cbt_images_' + this.sessionId); // Hapus cache foto setelah beres kirim
            Swal.close();
            this.tampilkanHalamanHasil(result.skor, teksDurasi, result.detail);

            const statusUpload = document.getElementById('status-upload-keamanan');
            if (statusUpload) statusUpload.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="color: #f59e0b;"></i> Memverifikasi bukti keamanan proctoring...';

            fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                redirect: "follow",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({
                    action: "submit_score",
                    paketId: this.currentPaket.id,
                    namaSiswa: this.userData.nama || this.userData.nama_siswa || "Anonim",
                    email: this.userData.email,
                    rowIndex: this.sheetRowIndex,
                    skor: result.skor,
                    detailJawaban: result.detail,
                    pelanggaran: cheatCount,
                    durasi: teksDurasi,
                    fotoIntel: this.capturedImages
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === 'success') {
                        db.ref('sessions/' + this.sessionId).update({ ss_url: "Tersimpan di Telegram" });
                        if (statusUpload) statusUpload.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Bukti keamanan berhasil diverifikasi dan diamankan oleh sistem.';
                    } else {
                        console.error("Error dari GAS:", res.message);
                        if (statusUpload) statusUpload.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color: #ef4444;"></i> Server Error: ${res.message}`;
                    }
                })
                .catch(err => {
                    console.error("Fetch API error:", err);
                    if (statusUpload) statusUpload.innerHTML = '<i class="fa-solid fa-wifi" style="color: #ef4444;"></i> Koneksi terputus saat memverifikasi bukti keamanan.';
                });

        }).catch(err => {
            console.error("Firebase Update Error:", err);
            Swal.fire('Error', 'Gagal menyimpan nilai ke database.', 'error');
        });
    },

    // =========================================
    // ROLE PRIVILEGE & LOGIKA DEADLINE HASIL
    // =========================================
    tampilkanHalamanHasil: async function (skor, teksDurasi, detailJawaban) {
        this.switchView('view-hasil');

        document.getElementById('hasil-nama').innerText = this.userData.nama || this.userData.nama_siswa || "Siswa";
        document.getElementById('hasil-durasi').innerText = teksDurasi;

        let statusBox = document.getElementById('status-upload-keamanan');
        if (!statusBox) {
            const containerSkor = document.getElementById('hasil-skor-wrapper');
            if (containerSkor) {
                statusBox = document.createElement('div');
                statusBox.id = 'status-upload-keamanan';
                statusBox.style.marginTop = '15px';
                statusBox.style.fontSize = '0.85rem';
                statusBox.style.fontWeight = 'bold';
                statusBox.style.color = '#64748b';
                containerSkor.appendChild(statusBox);
            }
        }

        // --- TARIK ROLE DARI FIREBASE ---
        let roleSiswa = this.userData.role || 'Default';
        let priv = { lihat_skor: true, lihat_kunci: false, akses_pembahasan: false };

        // [FITUR BARU] Siswa jalur Kelas otomatis Bypass (Unlock Semua)
        if (roleSiswa.toLowerCase() === 'kelas') {
            priv = { lihat_skor: true, lihat_kunci: true, akses_pembahasan: true };
        } else {
            try {
                let snap = await db.ref(`paket_ujian/${this.currentPaket.id}/roles/${roleSiswa}`).once('value');
                if (snap.exists()) priv = snap.val();
            } catch (e) { console.error("Gagal menarik Role Privilege", e); }
        }

        // --- CEK DEADLINE UJIAN ---
        const now = Date.now();
        const strTutup = this.currentPaket.waktu_tutup ? this.currentPaket.waktu_tutup.replace(' ', 'T') : null;
        const waktuTutupMs = strTutup ? new Date(strTutup).getTime() : 0;
        const isWaktuTutupLewat = (waktuTutupMs === 0 || now >= waktuTutupMs);

        // ATUR LABEL PERINGKAT
        const labelPeringkat = document.getElementById('label-peringkat');
        if (labelPeringkat) {
            labelPeringkat.innerText = isWaktuTutupLewat ? "Ranking Anda" : "Peringkat Sementara";
        }

        // 1. ATUR SKOR AKHIR
        const divSkor = document.getElementById('hasil-skor');
        if (!priv.lihat_skor) {
            divSkor.innerHTML = '<i class="fa-solid fa-lock"></i>';
            divSkor.style.fontSize = '3.5rem';
            divSkor.style.color = '#94a3b8';
            if (!document.getElementById('msg-skor-lock')) {
                divSkor.insertAdjacentHTML('afterend', '<div id="msg-skor-lock" style="font-size:0.85rem; color:#ef4444; margin-top:10px; font-weight:bold;">Skor disembunyikan karena pengaturan hak akses Role Anda.</div>');
            }
        } else {
            divSkor.innerText = skor;
        }

        // 2 & 3. ATUR TOMBOL PEMBAHASAN & ANALISIS (LOGIKA DEADLINE & ROLE)
        const btnBahas = document.getElementById('btn-pembahasan');
        const areaRincian = document.getElementById('area-rincian');
        const boxNotif = document.getElementById('box-notif-hasil');

        // Reset display
        if (btnBahas) btnBahas.style.display = 'none';
        if (areaRincian) areaRincian.style.display = 'none';

        // PEMBAHASAN LANGSUNG BISA DIAKSES JIKA ROLE MENGIZINKAN (TANPA NUNGGU DEADLINE)
        if ((priv.akses_pembahasan || this.userData.isAdmin) && btnBahas) {
            btnBahas.style.display = 'block'; // Munculkan tombolnya
            if (this.currentPaket.url_pembahasan) {
                btnBahas.disabled = false;
                btnBahas.style.background = '#10b981';
                btnBahas.style.cursor = 'pointer';
                btnBahas.innerHTML = '<i class="fa-solid fa-download"></i> Download File Pembahasan';
                btnBahas.onclick = () => { window.open(this.currentPaket.url_pembahasan, '_blank'); };
            } else {
                btnBahas.disabled = true;
                btnBahas.style.background = '#94a3b8';
                btnBahas.innerHTML = '<i class="fa-solid fa-file-excel"></i> Pembahasan Belum Diunggah Admin';
            }
        }

        // LOGIKA BARU: Tampilkan langsung setelah ujian selesai jika Role mengizinkan
        if (priv.lihat_kunci || priv.lihat_skor || this.userData.isAdmin) {
            areaRincian.style.display = 'block';
            areaRincian.innerHTML = `<button class="btn-login" style="background:#2563eb; color:white; width:100%; border:none; padding:14px; border-radius:8px; font-weight:bold; cursor:pointer; box-shadow: 0 4px 6px rgba(37,99,235,0.2);" onclick="app.bukaPopUpAnalisis()"> <i class="fa-solid fa-table-list"></i> Lihat Analisis Benar/Salah </button>`;
            this.dataAnalisisDetail = detailJawaban;
        }

        if (boxNotif) {
            boxNotif.className = 'alert-info success';
            boxNotif.style.background = '#dcfce7'; boxNotif.style.color = '#166534'; boxNotif.style.borderColor = '#bbf7d0';
            boxNotif.innerHTML = '<i class="fa-solid fa-circle-check"></i> <strong>Sesi Ujian Selesai:</strong><br>Sistem menerapkan kebijakan hak akses (Role) Anda untuk melihat hasil dan pembahasan.';
        }

        // LOGIKA PERINGKAT (TETAP)
        if (!this.userData.isAdmin) {
            try {
                const snap = await db.ref('leaderboard/' + this.currentPaket.id).once('value');
                let allSessions = [];
                if (snap.exists()) {
                    snap.forEach(child => {
                        let d = child.val();
                        allSessions.push({ skor: parseFloat(d.skor || 0), durasi: parseFloat(d.durasiMs || 99999999), id: child.key });
                    });
                }
                allSessions.sort((a, b) => {
                    if (b.skor !== a.skor) return b.skor - a.skor;
                    return a.durasi - b.durasi;
                });
                let myRank = allSessions.findIndex(x => x.id === this.sessionId) + 1;
                document.getElementById('hasil-rank').innerText = myRank ? `#${myRank} dari ${allSessions.length}` : '-';
            } catch (e) {
                console.error("Gagal hitung rank", e);
                document.getElementById('hasil-rank').innerText = "-";
            }
        } else {
            document.getElementById('hasil-rank').innerText = "SIMULASI ADMIN";
        }
    },

    // POP-UP TABEL ANALISIS TANPA KUNCI JAWABAN
    bukaPopUpAnalisis: function () {
        if (!this.dataAnalisisDetail) return;

        let tHTML = `<div style="overflow-x:auto; margin-top:10px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left; min-width: 450px;">
                <thead>
                    <tr style="background: #f8fafc;">
                        <th style="padding: 12px 10px; border-bottom: 2px solid #cbd5e1; text-align:center;">No</th>
                        <th style="padding: 12px 10px; border-bottom: 2px solid #cbd5e1;">Jawaban Kamu</th>
                        <th style="padding: 12px 10px; border-bottom: 2px solid #cbd5e1; text-align:center;">Bobot</th>
                        <th style="padding: 12px 10px; border-bottom: 2px solid #cbd5e1; text-align:center;">Status</th>
                    </tr>
                </thead>
                <tbody>`;

        this.dataAnalisisDetail.forEach((stat, i) => {
            let jwb = this.answers[i];
            let soal = this.currentPaket.soal[i];
            let jwbStr = '<span style="color:#ef4444; font-style:italic;">Tidak dijawab</span>';

            if (jwb !== undefined && jwb !== null && jwb !== "") {
                if (soal.tipe === 'pg') {
                    jwbStr = `<strong>${jwb}</strong>`;
                } else if (soal.tipe === 'pgk') {
                    if (Array.isArray(jwb) && jwb.length > 0) {
                        jwbStr = jwb.map(v => "Pernyataan " + (parseInt(v) + 1)).join('<br>');
                    }
                } else if (soal.tipe === 'pgk-kategori') {
                    let lbl = soal.label_pgk || ["Benar", "Salah"];
                    let lines = [];
                    Object.keys(jwb).forEach(k => {
                        let textPernyataan = "Pernyt. " + (parseInt(k) + 1);
                        let textJawaban = jwb[k] === 'L1' ? lbl[0] : lbl[1];
                        lines.push(`<strong>${textPernyataan}</strong>: <span style="color:#2563eb">${textJawaban}</span>`);
                    });
                    if (lines.length > 0) jwbStr = lines.join('<br>');
                } else if (soal.tipe === 'isian') {
                    let lines = [];
                    let jwbObj = typeof jwb === 'object' && jwb !== null ? jwb : {};
                    let totalBlank = soal.opsi ? soal.opsi.length : 0;
                    let anyAnswer = false;
                    for (let b = 0; b < totalBlank; b++) {
                        let ans = (jwbObj[b] || '').trim();
                        if (ans !== '') {
                            anyAnswer = true;
                            lines.push(`<span style="color:#2563eb; font-weight:bold;">${ans}</span>`);
                        } else {
                            lines.push(`<span style="color:#ef4444; font-style:italic;">Kosong</span>`);
                        }
                    }
                    if (lines.length > 0) jwbStr = lines.join('; ');
                    if (!anyAnswer) jwbStr = '<span style="color:#ef4444; font-style:italic;">Tidak dijawab</span>';
                } else if (soal.tipe === 'esai') {
                    let imgList = [];
                    if (jwb && typeof jwb === 'object') {
                        if (Array.isArray(jwb.images)) imgList = jwb.images;
                        else if (jwb.imageUrl) imgList = [{ url: jwb.imageUrl }];
                    }
                    if (imgList.length > 0) {
                        jwbStr = `<span style="color:#059669; font-weight:bold;"><i class="fa-solid fa-file-image"></i> ${imgList.length} Lembar Foto Diunggah</span>`;
                        if (jwb.nilai_esai !== null && jwb.nilai_esai !== undefined) {
                            jwbStr += `<br><span style="font-size:0.8rem; color:#64748b;">Nilai Esai: <b>${jwb.nilai_esai}</b> / ${soal.poin || 10}</span>`;
                            if (jwb.catatan_guru) {
                                jwbStr += `<br><span style="font-size:0.75rem; color:#475569; font-style:italic;">Catatan: "${jwb.catatan_guru}"</span>`;
                            }
                        }
                    } else {
                        jwbStr = '<span style="color:#ef4444; font-style:italic;">Tidak mengunggah lembar foto</span>';
                    }
                }
            } else if (soal.tipe === 'isian') {
                // Handle the case where jwb is undefined but we still want to show all blanks as 'Kosong'
                let lines = [];
                let totalBlank = soal.opsi ? soal.opsi.length : 0;
                for (let b = 0; b < totalBlank; b++) {
                    lines.push(`<span style="color:#ef4444; font-style:italic;">Kosong</span>`);
                }
                if (lines.length > 0) jwbStr = lines.join('; ');
            }

            let color = stat === 'BENAR' ? '#166534' : (stat === 'KOSONG' ? '#475569' : (stat === 'MENUNGGU_KOREKSI' ? '#854d0e' : (stat === 'SEBAGIAN' ? '#0369a1' : '#991b1b')));
            let bg = stat === 'BENAR' ? '#dcfce7' : (stat === 'KOSONG' ? '#f1f5f9' : (stat === 'MENUNGGU_KOREKSI' ? '#fef9c3' : (stat === 'SEBAGIAN' ? '#e0f2fe' : '#fee2e2')));
            let bobotSoal = soal.poin || 1;

            tHTML += `<tr>
                <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; text-align:center; font-weight:bold;">${i + 1}</td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; word-break: break-word;">${jwbStr}</td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; text-align:center; font-weight:bold; color:#64748b;">${bobotSoal}</td>
                <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; text-align:center;">
                    <span style="background:${bg}; color:${color}; padding:6px 10px; border-radius:6px; font-weight:bold; font-size:0.75rem;">${stat}</span>
                </td>
            </tr>`;
        });

        tHTML += `</tbody></table></div>
        <div style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 8px; font-size: 0.8rem; margin-top: 15px; text-align: left; border-left: 4px solid #ffeeba;">
            <i class="fa-solid fa-circle-info"></i> <strong>Kunci Jawaban Disembunyikan.</strong><br>Silakan unduh file pembahasan untuk melihat penjelasan lengkap.
        </div>`;

        Swal.fire({
            title: 'Analisis Jawaban', html: tHTML, width: '800px', showCloseButton: true, showConfirmButton: false
        });
    },

    // Utils
    switchView: function (viewId) {
        document.querySelectorAll('section').forEach(el => {
            el.classList.remove('active-view');
            el.classList.add('hidden-view');
        });
        const target = document.getElementById(viewId);
        if (target) { target.classList.remove('hidden-view'); target.classList.add('active-view'); }
    },
    setFont: function (size) {
        const s = ['14px', '16px', '20px'];
        document.documentElement.style.setProperty('--base-size', s[size - 1]);
        document.querySelectorAll('.font-resizer span').forEach((el, i) => { i === size - 1 ? el.classList.add('active') : el.classList.remove('active'); });
    },
    logout: function () { this.confirmSubmit(); }
};

function toggleSidebar() {
    const sb = document.getElementById('sidebar-list');
    const ov = document.getElementById('overlay');
    if (sb && ov) {
        sb.classList.toggle('active');
        ov.classList.toggle('active');
    }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') { setTimeout(() => app.init(), 1); }
else { document.addEventListener('DOMContentLoaded', () => app.init()); }

(function () {
    const Toast = Swal.mixin({
        toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, timerProgressBar: true,
        didOpen: (toast) => { toast.addEventListener('mouseenter', Swal.stopTimer); toast.addEventListener('mouseleave', Swal.resumeTimer); }
    });

    function handleConnectionChange() {
        if (!navigator.onLine) {
            Toast.fire({ icon: 'error', title: 'Koneksi Terputus!', text: 'Tenang, jawabanmu aman disimpan di HP ini.' });
        } else {
            Toast.fire({ icon: 'success', title: 'Koneksi Kembali!', text: 'Mencoba sinkronisasi data ke server...' });
            if (typeof app !== 'undefined' && app.saveRealtime) app.saveRealtime();
        }
    }

    window.addEventListener('offline', handleConnectionChange);
    window.addEventListener('online', handleConnectionChange);
    if (!navigator.onLine) handleConnectionChange();

    if (typeof app !== 'undefined') {
        const originalSave = app.saveRealtime;
        const originalRestore = app.restoreSession;

        app.saveRealtime = function () {
            originalSave.call(app);
            if (app.sessionId) {
                const backupData = { answers: app.answers, ragu: app.ragu, timestamp: Date.now() };
                localStorage.setItem('CBT_BACKUP_' + app.sessionId, JSON.stringify(backupData));
            }
        };

        app.restoreSession = function (data) {
            const backupKey = 'CBT_BACKUP_' + app.sessionId;
            const localBackup = JSON.parse(localStorage.getItem(backupKey));

            if (localBackup && (!data.answers || Object.keys(localBackup.answers).length > Object.keys(data.answers || {}).length)) {
                data.answers = localBackup.answers; data.ragu = localBackup.ragu;
                Toast.fire({ icon: 'info', title: 'Data Dipulihkan', text: 'Mengambil jawaban terakhir dari memori HP.' });
            }
            originalRestore.call(app, data);
        };
    }
})();

document.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG' && !e.target.closest('.zoomed')) {
        const fullOverlay = document.createElement('div');
        fullOverlay.className = 'zoomed';
        const imgClone = e.target.cloneNode();
        fullOverlay.appendChild(imgClone);
        document.body.appendChild(fullOverlay);
        fullOverlay.onclick = function () { fullOverlay.remove(); };
    }
});

// EVENT LISTENER ANTI-CHEAT TAB SWITCHING
document.addEventListener("visibilitychange", function () {
    const viewUjian = document.getElementById('view-ujian');
    const isLagiUjian = viewUjian && viewUjian.classList.contains('active-view');
    if (document.visibilityState === 'hidden' && isLagiUjian) {
        cheatCount++;
        if (typeof app !== 'undefined' && app.saveRealtime) app.saveRealtime();
        Swal.fire({ title: 'Peringatan Sistem ⚠️', text: 'Anda terdeteksi berpindah tab atau keluar dari layar ujian. Aktivitas ini telah dicatat sebagai pelanggaran oleh sistem.', icon: 'warning', confirmButtonColor: '#d33', confirmButtonText: 'Saya Mengerti' });
    }
});

// --- PERBAIKAN UI KAMERA: ANTI OFF-SCREEN & MINIMIZE BERSIH ---
app.startSecurityProctor = function () {
    const user = this.userData || app.userData || {};
    if (user.isAdmin || user.email === ADMIN_EMAIL) return;
    if (document.getElementById('proctor-container')) return;
    Swal.fire({
        title: 'Verifikasi Pengawas 👁️',
        html: 'Ujian ini diawasi oleh <b>Sistem Kamera Keamanan</b>.<br><br>Mohon klik <b>"Allow" / "Izinkan"</b> pada notifikasi browser di atas layar untuk melanjutkan ke halaman identitas.',
        icon: 'info', confirmButtonText: 'Siap, Izinkan! 🚀', confirmButtonColor: '#007bff', allowOutsideClick: false
    }).then((res) => {
        if (res.isConfirmed) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
                const style = document.createElement('style');
                style.innerHTML = `
                    #proctor-container { position: fixed; bottom: 80px; left: 20px; width: 180px; background: #000; border: 2px solid #333; border-radius: 12px; z-index: 9999; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.6); resize: horizontal; min-width: 140px; max-width: 300px; transition: width 0.3s ease; }
                    #proctor-container.minimized { width: auto !important; min-width: 90px; resize: none; border-radius: 20px; border: 1px solid #555; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); }
                    #proctor-container.minimized #proctor-video { display: none; }
                    #proctor-container.minimized .cam-header { border-bottom: none; padding: 6px 12px; justify-content: center; background: transparent; }
                    #proctor-container.minimized #proctor-resize-btn { display: none; }
                    .cam-header { background: rgba(0,0,0,0.85); color: white; font-size: 11px; font-family: monospace; padding: 6px 8px; display: flex; justify-content: space-between; align-items: center; cursor: move; user-select: none; border-bottom: 1px solid #444; touch-action: none; }
                    .cam-controls { display: flex; gap: 8px; align-items: center; }
                    .btn-minimize { cursor: pointer; font-weight: bold; padding: 0 5px; color: #aaa; font-size: 16px; line-height: 1; transition: 0.2s; display: flex; align-items: center; justify-content: center; }
                    .btn-minimize:hover { color: white; transform: scale(1.1); }
                    .blink-red { color: #ff4757; animation: blinker 1s linear infinite; font-weight: bold; }
                    @keyframes blinker { 50% { opacity: 0; } }
                    #proctor-video { width: 100%; aspect-ratio: 4/3; display: block; transform: scaleX(-1); object-fit: cover; background: #111; }
                    @media(max-width: 768px) { 
                        #proctor-container { width: 140px; min-width: 120px; bottom: 85px; left: 10px; resize: horizontal; border-radius: 10px; } 
                        .cam-header { font-size: 10px; padding: 5px; }
                        #proctor-container.minimized { min-width: 80px; }
                        #proctor-container.minimized .cam-header { padding: 5px 10px; }
                    }
                `;
                document.head.appendChild(style);

                const div = document.createElement('div');
                div.id = 'proctor-container';
                div.innerHTML = `<div class="cam-header" id="proctor-header"><div class="cam-controls"><span class="blink-red">🔴 REC</span><span id="proctor-timer">00:00:00</span></div><div class="cam-controls"><div class="btn-minimize" id="proctor-resize-btn" title="Ubah Ukuran">⛶</div><div class="btn-minimize" id="proctor-min" title="Toggle Size">−</div></div></div><video id="proctor-video" autoplay muted playsinline disablePictureInPicture></video>`;
                document.body.appendChild(div);

                document.getElementById('proctor-video').srcObject = stream;

                div.checkBoundary = function () {
                    if (!document.body.contains(div)) return;
                    const winWidth = window.innerWidth;
                    const winHeight = window.innerHeight;
                    const elWidth = div.offsetWidth;
                    const elHeight = div.offsetHeight;

                    let currentLeft = div.offsetLeft;
                    let currentTop = div.offsetTop;

                    if (currentLeft < 10) currentLeft = 10;
                    if (currentLeft + elWidth > winWidth - 10) currentLeft = Math.max(10, winWidth - elWidth - 10);
                    if (currentTop < 10) currentTop = 10;
                    if (currentTop + elHeight > winHeight - 10) currentTop = Math.max(10, winHeight - elHeight - 10);

                    div.style.left = currentLeft + "px";
                    div.style.top = currentTop + "px";
                    div.style.bottom = "auto";
                    div.style.right = "auto";
                };

                window.addEventListener('resize', div.checkBoundary);

                let currentSizeLevel = 0;
                document.getElementById('proctor-resize-btn').onclick = function () {
                    currentSizeLevel = (currentSizeLevel + 1) % 3;
                    const sizes = ['180px', '240px', '140px'];
                    div.style.width = sizes[currentSizeLevel];
                    setTimeout(div.checkBoundary, 350);
                };

                // Logika minimize lebih bersih
                document.getElementById('proctor-min').onclick = function () {
                    div.classList.toggle('minimized');
                    this.innerHTML = div.classList.contains('minimized') ? '<i class="fa-solid fa-camera"></i>' : '−';
                    const recText = document.querySelector('.blink-red');
                    if (recText) recText.style.display = div.classList.contains('minimized') ? 'none' : 'inline';
                };

                dragElement(div);

                let sec = 0;
                app.proctorTimer = setInterval(() => {
                    sec++;
                    const h = Math.floor(sec / 3600).toString().padStart(2, '0');
                    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
                    const s = (sec % 60).toString().padStart(2, '0');
                    const timerEl = document.getElementById('proctor-timer');
                    if (timerEl) timerEl.innerText = `${h}:${m}:${s}`;
                }, 1000);
            }).catch(err => {
                Swal.fire({ title: 'Akses Ditolak! ❌', html: `<div style="text-align:left; font-size: 14px;">Kamu <b>TIDAK BISA</b> mengikuti ujian tanpa menyalakan kamera & mikrofon pengawas.<br><br><b>Cara Memperbaiki:</b><br>1. Klik ikon <b>Gembok 🔒 / Kamera 📷</b> di bilah alamat browser.<br>2. Pilih <b>Site Settings (Setelan Situs)</b> atau <b>Permissions</b>.<br>3. Ubah Izin Kamera & Mikrofon menjadi <b>Allow (Izinkan)</b>.<br>4. Ulangi proses masuk ujian.</div>`, icon: 'error', confirmButtonText: 'Mengerti & Ulangi', confirmButtonColor: '#d33', allowOutsideClick: false }).then(() => { location.reload(); });
            });
        }
    });
};

app.stopSecurityProctor = function () {
    const video = document.getElementById('proctor-video');
    if (video && video.srcObject) video.srcObject.getTracks().forEach(track => track.stop());
    const container = document.getElementById('proctor-container');
    if (container) {
        if (container.checkBoundary) window.removeEventListener('resize', container.checkBoundary);
        container.remove();
    }
    if (app.proctorTimer) clearInterval(app.proctorTimer);
};

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var header = document.getElementById("proctor-header");
    header.onmousedown = dragMouseDown; header.ontouchstart = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.type === 'touchstart') { pos3 = e.touches[0].clientX; pos4 = e.touches[0].clientY; }
        else { e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY; }
        document.onmouseup = closeDragElement; document.ontouchend = closeDragElement;
        document.addEventListener('touchmove', elementDrag, { passive: false });
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        var clientX, clientY;
        if (e.type === 'touchmove') {
            if (e.cancelable) e.preventDefault();
            clientX = e.touches[0].clientX; clientY = e.touches[0].clientY;
        }
        else { e.preventDefault(); clientX = e.clientX; clientY = e.clientY; }
        pos1 = pos3 - clientX; pos2 = pos4 - clientY; pos3 = clientX; pos4 = clientY;

        let newTop = elmnt.offsetTop - pos2;
        let newLeft = elmnt.offsetLeft - pos1;

        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const elWidth = elmnt.offsetWidth;
        const elHeight = elmnt.offsetHeight;

        // BOUNDARY: Jangan biarkan keluar layar (diberi margin 10px agar tidak stuck di pojok)
        if (newLeft < 10) newLeft = 10;
        if (newLeft + elWidth > winWidth - 10) newLeft = Math.max(10, winWidth - elWidth - 10);
        if (newTop < 10) newTop = 10;
        if (newTop + elHeight > winHeight - 10) newTop = Math.max(10, winHeight - elHeight - 10);

        elmnt.style.top = newTop + "px";
        elmnt.style.left = newLeft + "px";
        elmnt.style.bottom = "auto";
        elmnt.style.right = "auto";
    }

    function closeDragElement() {
        document.onmouseup = null; document.onmousemove = null; document.ontouchend = null; document.ontouchmove = null;
        document.removeEventListener('touchmove', elementDrag);
    }
}