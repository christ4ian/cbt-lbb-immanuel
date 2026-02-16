/* ===========================================================
   CBT SYSTEM V7 - PRODUCTION READY (FULL FEATURES)
   Fitur: 
   1. Cloud Timer (Anti-Reset & Device Sync)
   2. Offline Detection (Notifikasi Realtime)
   3. Auto Grading (Kunci Jawaban PG, PGK, Teks)
   4. Hybrid Sync (LocalStorage + Firebase)
   =========================================================== */

// 1. KONFIGURASI FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyC04h_Aaz9I9WncNeEWc8A5cEKajmIEDVs",
    authDomain: "cbt-lbb-immanuel.firebaseapp.com",
    databaseURL: "https://cbt-lbb-immanuel-default-rtdb.firebaseio.com",
    projectId: "cbt-lbb-immanuel",
    storageBucket: "cbt-lbb-immanuel.firebasestorage.app",
    messagingSenderId: "79589552415",
    appId: "1:79589552415:web:20fb83aa055ec156cfc02a"
};

// 2. URL GOOGLE SCRIPT (Pastikan sudah Deploy New Version)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKBR9C0h9unHOU8PcQSLN3u26wyqt6ft7UYoZxhNBdkSwguLvQc5iACpODWFn8kU_ltg/exec"; 

// Init Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const app = {
    // --- STATE ---
    currentPaket: null,
    currentIndex: 0,
    answers: {},            
    ragu: {},               
    timerInterval: null,
    sisaWaktu: 0,
    serverStartTime: 0, // Waktu mulai absolut dari server
    userData: {},     
    sessionId: null,  
    sheetRowIndex: null,
    isOffline: false, // Status koneksi

    // Config (3 Jam)
    MAX_SESSION_TIME: 3 * 60 * 60 * 1000, 

    // --- INIT ---
    init: function() {
        console.log("System V7 Online: Connectivity Aware");
        this.loadDaftarPaket();
        this.monitorConnection(); // Aktifkan pemantau internet

        // Restore jawaban lokal jika ada sisa (untuk case refresh pas offline)
        const localData = localStorage.getItem('cbt_backup_answers');
        if(localData) {
            this.answers = JSON.parse(localData);
        }
    },

    // =========================================
    // 0. FITUR KONEKSI (OFFLINE/ONLINE)
    // =========================================
    monitorConnection: function() {
        // Cek status awal
        if (!navigator.onLine) this.showOfflineStatus();

        // Event Listener: Internet Putus
        window.addEventListener('offline', () => {
            this.isOffline = true;
            this.showOfflineStatus();
        });

        // Event Listener: Internet Nyambung
        window.addEventListener('online', () => {
            this.isOffline = false;
            Swal.fire({
                toast: true, position: 'top-end', icon: 'success', 
                title: 'Koneksi Kembali Stabil', showConfirmButton: false, timer: 3000
            });
            // Sync data yang tertunda saat offline
            if(this.sessionId) this.syncAnswer();
        });
    },

    showOfflineStatus: function() {
        Swal.fire({
            toast: true, position: 'top-end', icon: 'warning',
            title: 'Koneksi Terputus!',
            text: 'Jawaban disimpan di perangkat sementara.',
            showConfirmButton: false, timer: 5000,
            background: '#fff3cd', color: '#856404'
        });
    },

    loadDaftarPaket: function() {
        const select = document.getElementById('input-paket');
        if(typeof PAKET_SOAL !== 'undefined' && select) {
            select.innerHTML = '<option value="">-- Pilih Paket Soal --</option>';
            PAKET_SOAL.forEach((p, i) => {
                const opt = document.createElement('option');
                opt.value = i; opt.text = p.judul;
                select.add(opt);
            });
        }
    },

    // =========================================
    // 1. LOGIN & RESTORE
    // =========================================
    gotoData: function() {
        const idx = document.getElementById('input-paket').value;
        const emailInput = document.getElementById('input-password');
        const email = emailInput ? emailInput.value.trim().toLowerCase() : "";

        if(idx === "") return Swal.fire('Error', 'Pilih paket soal!', 'error');
        if(!email || !email.includes('@')) return Swal.fire('Error', 'Masukkan email valid!', 'error');
        
        if(!navigator.onLine) return Swal.fire('Offline', 'Anda harus online untuk login awal.', 'error');

        this.currentPaket = PAKET_SOAL[idx];
        
        Swal.fire({ title: 'Verifikasi...', didOpen: () => Swal.showLoading() });

        // Step 1: Cek Sheet
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST", body: JSON.stringify({
                action: "check_user", paketId: this.currentPaket.id, email: email
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.status === "found") {
                if (res.data.statusSheet === "SUDAH") {
                    Swal.fire('Selesai', 'Anda sudah mengerjakan ujian ini.', 'warning');
                    return;
                }
                this.userData = { 
                    nama: res.data.nama, kelas: res.data.kelas, sekolah: res.data.sekolah, email: email 
                };
                this.sheetRowIndex = res.data.rowIndex;
                
                // Step 2: Cek Firebase (Pindah Device)
                this.syncWithCloud(email);
            } else {
                Swal.fire('Gagal', 'Email tidak terdaftar.', 'error');
            }
        })
        .catch(err => {
            console.error(err);
            Swal.fire('Error', 'Gagal koneksi server.', 'error');
        });
    },

    syncWithCloud: function(email) {
        const safeEmail = email.replace(/\./g, '_');
        this.sessionId = this.currentPaket.id + "_" + safeEmail;

        db.ref('sessions/' + this.sessionId).once('value').then((snapshot) => {
            const data = snapshot.val();
            Swal.close();

            if (data) {
                // --- ADA SESI LAMA ---
                if (data.status === 'submitted') {
                    return Swal.fire('Selesai', 'Anda sudah mengumpulkan ujian ini.', 'warning');
                }

                // Cek Timer Server (3 Jam)
                const now = Date.now();
                if (now - data.startTime > this.MAX_SESSION_TIME) {
                    return Swal.fire('Waktu Habis', 'Batas 3 jam sesi Anda sudah habis.', 'error');
                }

                Swal.fire({
                    title: 'Lanjutkan Sesi?',
                    text: 'Melanjutkan progres dari perangkat sebelumnya.',
                    icon: 'info',
                    confirmButtonText: 'Lanjut'
                }).then(() => {
                    this.restoreSession(data);
                });
            } else {
                // --- BARU MULAI ---
                this.gotoConfirmPage();
            }
        });
    },

    gotoConfirmPage: function() {
        document.getElementById('info-mapel').innerText = this.currentPaket.mapel;
        document.getElementById('info-waktu').innerText = this.currentPaket.waktu + " Menit";
        document.getElementById('info-jml-soal').innerText = this.currentPaket.soal.length + " Butir";
        
        document.getElementById('data-nama').value = this.userData.nama;
        document.getElementById('data-nama').disabled = true;
        document.getElementById('data-sekolah').value = this.userData.sekolah;
        document.getElementById('data-sekolah').disabled = true;

        this.switchView('view-data');
    },

    // =========================================
    // 2. CORE: START & TIMER (ABSOLUTE SYNC)
    // =========================================
    startUjian: function() {
        if(!navigator.onLine) return Swal.fire('Offline', 'Koneksi internet diperlukan untuk memulai.', 'warning');
        
        Swal.fire({ title: 'Memulai...', didOpen: () => Swal.showLoading() });

        const startData = {
            startTime: firebase.database.ServerValue.TIMESTAMP, 
            status: 'ongoing',
            userData: this.userData,
            sheetRowIndex: this.sheetRowIndex,
            paketId: this.currentPaket.id
        };

        db.ref('sessions/' + this.sessionId).set(startData).then(() => {
            return db.ref('sessions/' + this.sessionId).once('value');
        }).then((snap) => {
            Swal.close();
            this.restoreSession(snap.val());
        });
    },

    restoreSession: function(data) {
        // 1. Ambil data penting
        this.answers = data.answers || {};
        this.ragu = data.ragu || {};
        this.sheetRowIndex = data.sheetRowIndex;
        this.serverStartTime = data.startTime; // INI KUNCINYA (Waktu server)

        // Backup lokal
        localStorage.setItem('cbt_backup_answers', JSON.stringify(this.answers));

        // 2. Tampilkan Info
        document.getElementById('disp-nama').innerText = this.userData.nama;
        document.getElementById('disp-mapel').innerText = this.currentPaket.mapel;

        // 3. Cek Sisa Waktu (Hitungan Absolut)
        this.calculateTimeRemaining();
        if (this.sisaWaktu <= 0) {
            Swal.fire('Waktu Habis', 'Waktu ujian telah habis.', 'error').then(() => this.submitData(true));
            return;
        }

        // 4. Masuk Ujian
        this.switchView('view-ujian');
        this.startTimer();
        this.renderSoal(0);
        this.setFont(2);
    },

    // --- FUNGSI TIMER PINTAR (DEVICE SYNC) ---
    calculateTimeRemaining: function() {
        const now = Date.now();
        const durationMs = this.currentPaket.waktu * 60 * 1000;
        const elapsedMs = now - this.serverStartTime; // Selisih Waktu Sekarang vs Waktu Mulai Server
        
        this.sisaWaktu = Math.floor((durationMs - elapsedMs) / 1000); // Konversi ke detik
    },

    startTimer: function() {
        clearInterval(this.timerInterval);
        const display = document.getElementById('time-val');
        const displayMob = document.getElementById('timer-mobile');

        this.timerInterval = setInterval(() => {
            // Hitung ulang setiap detik berdasarkan waktu server (Bukan sekedar --)
            this.calculateTimeRemaining();
            
            if(this.sisaWaktu <= 0) {
                this.sisaWaktu = 0;
                clearInterval(this.timerInterval);
                this.submitData(true);
                return;
            }

            const h = Math.floor(this.sisaWaktu / 3600);
            const m = Math.floor((this.sisaWaktu % 3600) / 60);
            const s = Math.floor(this.sisaWaktu % 60);
            const text = `${h<10?'0'+h:h}:${m<10?'0'+m:m}:${s<10?'0'+s:s}`;

            if(display) display.innerText = text;
            if(displayMob) displayMob.innerText = text;
            
            // Peringatan visual jika < 5 menit
            if(this.sisaWaktu < 300) {
                if(display) display.style.color = 'red';
            }
        }, 1000);
    },

    // --- SYNC JAWABAN (Hybrid: Local + Cloud) ---
    syncAnswer: function() {
        // 1. Simpan Lokal (Selalu berhasil meski offline)
        localStorage.setItem('cbt_backup_answers', JSON.stringify(this.answers));
        
        // 2. Simpan Cloud (Jika Online)
        if(navigator.onLine) {
            db.ref('sessions/' + this.sessionId).update({
                answers: this.answers,
                ragu: this.ragu,
                lastUpdate: firebase.database.ServerValue.TIMESTAMP
            });
        }
    },

    // =========================================
    // 3. SCORING (AUTO GRADING)
    // =========================================
    calculateResult: function() {
        let detail = [];
        let benarCount = 0;
        const totalSoal = this.currentPaket.soal.length;

        this.currentPaket.soal.forEach((soal, i) => {
            const jwb = this.answers[i];
            const kunci = soal.kunci;
            let status = "SALAH";

            if (!jwb) {
                detail.push("KOSONG");
                return;
            }

            // A. Logika PG (Huruf)
            if (soal.tipe === 'pg') {
                if (jwb === kunci) status = "BENAR";
            }
            // B. Logika PGK (Array Checkbox)
            else if (soal.tipe === 'pgk') {
                // Urutkan array agar perbandingan akurat (['0','1'] == ['1','0'])
                const jwbSorted = JSON.stringify(jwb.sort());
                const kunciSorted = JSON.stringify(kunci.sort());
                if (jwbSorted === kunciSorted) status = "BENAR";
            }
            // C. Logika Kategori (Object Benar/Salah)
            else if (soal.tipe === 'pgk-kategori') {
                let isPerfect = true;
                const rows = Object.keys(kunci);
                for (let r of rows) {
                    if (jwb[r] !== kunci[r]) { isPerfect = false; break; }
                }
                if (isPerfect) status = "BENAR";
            }

            if (status === "BENAR") benarCount++;
            detail.push(status);
        });

        const skorAkhir = (benarCount / totalSoal) * 100;
        return { skor: skorAkhir.toFixed(2), detail: detail };
    },

    // =========================================
    // 4. SUBMIT & RENDER
    // =========================================
    confirmSubmit: function() {
        const total = this.currentPaket.soal.length;
        const isi = Object.keys(this.answers).length;
        const kosong = total - isi;
        
        let msg = "Yakin ingin mengumpulkan?";
        if(kosong > 0) msg = `Masih ada ${kosong} soal belum diisi! Yakin?`;

        Swal.fire({
            title: 'Konfirmasi', text: msg, icon: 'warning',
            showCancelButton: true, confirmButtonColor: '#28a745', confirmButtonText: 'Ya, Kumpulkan'
        }).then((res) => {
            if (res.isConfirmed) this.submitData(false);
        });
    },

    submitData: function(force) {
        if(!navigator.onLine) {
            return Swal.fire('Gagal', 'Koneksi internet terputus. Mohon cari sinyal untuk mengumpulkan.', 'error');
        }

        Swal.fire({ title: 'Mengkoreksi...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        const result = this.calculateResult();

        // 1. Update Firebase (Finish)
        db.ref('sessions/' + this.sessionId).update({
            status: 'submitted',
            finalScore: result.skor,
            finishTime: firebase.database.ServerValue.TIMESTAMP
        });

        // 2. Kirim ke Sheet
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST", body: JSON.stringify({
                action: "submit_score",
                paketId: this.currentPaket.id,
                email: this.userData.email,
                rowIndex: this.sheetRowIndex,
                skor: result.skor,
                detailJawaban: result.detail
            })
        })
        .then(res => res.json())
        .then(res => {
            localStorage.removeItem('cbt_backup_answers'); // Bersihkan lokal setelah sukses
            Swal.fire({
                title: 'Ujian Selesai!',
                html: `Nilai Kamu: <b>${result.skor}</b><br>Tersimpan di database.`,
                icon: 'success'
            }).then(() => location.reload());
        })
        .catch(err => {
            console.error(err);
            Swal.fire('Tersimpan', `Nilai: ${result.skor}. (Backup Server)`, 'success').then(() => location.reload());
        });
    },

    // --- UI UTILS ---
    switchView: function(viewId) {
        document.querySelectorAll('section').forEach(el => {
            el.classList.remove('active-view');
            el.classList.add('hidden-view');
        });
        const target = document.getElementById(viewId);
        if(target) { target.classList.remove('hidden-view'); target.classList.add('active-view'); }
    },
    
    renderSoal: function(index) {
        this.currentIndex = index;
        const data = this.currentPaket.soal[index];
        document.getElementById('nomor-soal').innerText = index + 1;
        
        const pStim = document.getElementById('panel-stimulus');
        if (data.stimulus && data.stimulus.tampil) {
            if (this.lastStimulusContent !== data.stimulus.konten) {
                pStim.innerHTML = data.stimulus.konten;
                this.lastStimulusContent = data.stimulus.konten;
                if(window.MathJax) MathJax.typesetPromise([pStim]);
            }
            pStim.classList.add('active');
        } else {
            pStim.classList.remove('active');
            this.lastStimulusContent = null;
        }

        const pSoal = document.getElementById('panel-soal');
        let html = `<div class="soal-text">${data.pertanyaan}</div>`;
        const jwb = this.answers[index];

        if (data.tipe === 'pg') {
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
            html += `<table class="table-bs"><thead><tr><th>Pernyataan</th><th width="80">BENAR</th><th width="80">SALAH</th></tr></thead><tbody>`;
            data.opsi.forEach((row, i) => {
                const val = i.toString();
                const b = obj[val] === 'B' ? 'checked' : '';
                const s = obj[val] === 'S' ? 'checked' : '';
                html += `<tr><td>${row}</td><td class="text-center"><label class="custom-radio-container"><input type="radio" name="bs-${i}" ${b} onchange="app.selectBS('${val}','B')"><span class="radio-style"></span></label></td><td class="text-center"><label class="custom-radio-container"><input type="radio" name="bs-${i}" ${s} onchange="app.selectBS('${val}','S')"><span class="radio-style"></span></label></td></tr>`;
            });
            html += `</tbody></table>`;
        }
        pSoal.innerHTML = html;
        if(window.MathJax) MathJax.typesetPromise([pSoal]);
        
        document.getElementById('check-ragu').checked = this.ragu[index] || false;
        this.updateGrid();
        this.updateNavButtons(index);
    },

    // Handlers (Trigger Sync)
    selectAnswer: function(val) { this.answers[this.currentIndex] = val; this.renderSoal(this.currentIndex); this.syncAnswer(); },
    toggleCheck: function(val) { 
        let arr = this.answers[this.currentIndex] || [];
        if(!Array.isArray(arr)) arr = [];
        if(arr.includes(val)) arr = arr.filter(x=>x!==val); else arr.push(val);
        this.answers[this.currentIndex] = arr; this.renderSoal(this.currentIndex); this.syncAnswer(); 
    },
    selectBS: function(r, v) { 
        let obj = this.answers[this.currentIndex] || {}; obj[r] = v; this.answers[this.currentIndex] = obj; this.updateGrid(); this.syncAnswer(); 
    },
    setRagu: function() { this.ragu[this.currentIndex] = document.getElementById('check-ragu').checked; this.updateGrid(); this.syncAnswer(); },
    
    navigasi: function(step) { const next = this.currentIndex + step; if(next >= 0 && next < this.currentPaket.soal.length) this.renderSoal(next); },
    updateGrid: function() {
        const c = document.getElementById('grid-container');
        let h = '';
        this.currentPaket.soal.forEach((_, i) => {
            let cls = '';
            const ans = this.answers[i];
            const isAns = ans && ((Array.isArray(ans) && ans.length > 0) || (typeof ans === 'object' && Object.keys(ans).length > 0) || (typeof ans === 'string'));
            if(i === this.currentIndex) cls += ' current';
            if(isAns) cls += ' answered';
            if(this.ragu[i]) cls += ' ragu';
            h += `<div class="grid-item ${cls}" onclick="app.renderSoal(${i})">${i+1}</div>`;
        });
        c.innerHTML = h;
    },
    updateNavButtons: function(index) {
        const total = this.currentPaket.soal.length;
        const isLast = index === total - 1;
        document.querySelectorAll('.prev').forEach(btn => btn.disabled = (index === 0));

        const deskText = document.getElementById('desk-next-text');
        const deskIcon = document.getElementById('desk-next-icon');
        const btnNext = document.getElementById('btn-next');
        
        // Cek elemen ada atau tidak untuk menghindari error null
        if(btnNext) {
             if (isLast) {
                btnNext.innerHTML = 'SELESAI <i class="fa-solid fa-check"></i>';
                btnNext.classList.add('btn-finish');
                btnNext.onclick = () => this.confirmSubmit();
                if(deskText) deskText.innerText = "Selesai";
             } else {
                btnNext.innerHTML = 'SELANJUTNYA <i class="fa-solid fa-chevron-right"></i>';
                btnNext.classList.remove('btn-finish');
                btnNext.onclick = () => this.navigasi(1);
                if(deskText) deskText.innerText = "Selanjutnya";
             }
        }
    },
    setFont: function(size) {
        const s = ['14px', '16px', '20px'];
        document.documentElement.style.setProperty('--base-size', s[size-1]);
        document.querySelectorAll('.font-resizer span').forEach((el, i) => { i === size-1 ? el.classList.add('active') : el.classList.remove('active'); });
    },
    logout: function() { this.confirmSubmit(); }
};

document.addEventListener('DOMContentLoaded', () => { app.init(); });