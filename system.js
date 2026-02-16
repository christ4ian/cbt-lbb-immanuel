/* ===========================================================
   CBT SYSTEM V8 - STABLE PRODUCTION
   Fitur: 
   1. Single Device Enforcement (Auto Logout device lama)
   2. Auto Resume saat Refresh (Tidak keluar paket)
   3. Absolute Server Timestamp (Waktu Masuk)
   4. Android Layout Safety
   =========================================================== */

// 1. CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyC04h_Aaz9I9WncNeEWc8A5cEKajmIEDVs",
    authDomain: "cbt-lbb-immanuel.firebaseapp.com",
    databaseURL: "https://cbt-lbb-immanuel-default-rtdb.firebaseio.com",
    projectId: "cbt-lbb-immanuel",
    storageBucket: "cbt-lbb-immanuel.firebasestorage.app",
    messagingSenderId: "79589552415",
    appId: "1:79589552415:web:20fb83aa055ec156cfc02a"
};

// 2. URL GOOGLE SCRIPT (Pastikan Deployment sudah 'New Version')
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
    userData: {},     
    sessionId: null,
    deviceId: null,   // ID Unik Perangkat ini
    sheetRowIndex: null,
    serverStartTime: null, // TIMESTAMP MASUK (ABSOLUT)

    // Config (3 Jam)
    MAX_SESSION_TIME: 3 * 60 * 60 * 1000, 

    // --- INIT ---
    init: function() {
        console.log("System V8: Stable & Single Device");
        
        // 1. Setup Device ID (Biar tau ini HP siapa)
        this.setupDeviceId();
        
        // 2. Load Dropdown
        this.loadDaftarPaket();

        // 3. Cek apakah user habis refresh? (Auto Resume)
        this.checkActiveSession();
    },

    setupDeviceId: function() {
        let did = localStorage.getItem('cbt_device_id');
        if (!did) {
            did = 'dev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('cbt_device_id', did);
        }
        this.deviceId = did;
    },

    checkActiveSession: function() {
        // Ambil data sesi terakhir dari LocalStorage
        const savedSession = JSON.parse(localStorage.getItem('cbt_active_session'));
        
        if (savedSession && savedSession.sessionId) {
            console.log("Sesi aktif ditemukan, mencoba resume...");
            
            // Restore data penting ke Memory
            this.sessionId = savedSession.sessionId;
            this.userData = savedSession.userData;
            this.sheetRowIndex = savedSession.sheetRowIndex;
            
            // Cari paket soal berdasarkan ID
            const paket = PAKET_SOAL.find(p => p.id === savedSession.paketId);
            if (paket) {
                this.currentPaket = paket;
                // Langsung sync ke cloud tanpa login ulang
                this.syncWithCloud(true); 
            }
        }
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
    // 1. LOGIN FLOW
    // =========================================
    gotoData: function() {
        const idx = document.getElementById('input-paket').value;
        const emailInput = document.getElementById('input-password');
        const email = emailInput ? emailInput.value.trim().toLowerCase() : "";

        if(idx === "") return Swal.fire('Error', 'Pilih paket soal!', 'error');
        if(!email || !email.includes('@')) return Swal.fire('Error', 'Masukkan email valid!', 'error');
        
        if(!navigator.onLine) return Swal.fire('Offline', 'Wajib online untuk login.', 'error');

        this.currentPaket = PAKET_SOAL[idx];
        
        Swal.fire({ title: 'Verifikasi...', didOpen: () => Swal.showLoading() });

        // Cek Sheet (Whitelist)
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST", body: JSON.stringify({
                action: "check_user", paketId: this.currentPaket.id, email: email
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.status === "found") {
                if (res.data.statusSheet === "SUDAH") {
                    Swal.fire('Selesai', 'Anda sudah menyelesaikan ujian ini.', 'warning');
                    return;
                }
                
                this.userData = { 
                    nama: res.data.nama, kelas: res.data.kelas, sekolah: res.data.sekolah, email: email 
                };
                this.sheetRowIndex = res.data.rowIndex;
                
                // Buat Session ID
                const safeEmail = email.replace(/\./g, '_');
                this.sessionId = this.currentPaket.id + "_" + safeEmail;

                // Lanjut ke Sinkronisasi Cloud
                this.syncWithCloud(false);

            } else {
                Swal.fire('Gagal', 'Email tidak terdaftar.', 'error');
            }
        })
        .catch(err => {
            console.error(err);
            Swal.fire('Error', 'Gagal koneksi server.', 'error');
        });
    },

    syncWithCloud: function(isResume) {
        db.ref('sessions/' + this.sessionId).once('value').then((snapshot) => {
            const data = snapshot.val();
            Swal.close();

            if (data) {
                // --- USER LAMA / PINDAH DEVICE ---
                if (data.status === 'submitted') {
                    localStorage.removeItem('cbt_active_session'); // Bersihkan sisa
                    return Swal.fire('Selesai', 'Ujian telah dikumpulkan.', 'warning')
                        .then(() => location.reload());
                }

                // Cek 3 Jam (Dari startTime server)
                const now = Date.now();
                if (now - data.startTime > this.MAX_SESSION_TIME) {
                    return Swal.fire('Waktu Habis', 'Batas 3 jam sesi Anda sudah habis.', 'error');
                }

                // Jika Resume (Refresh) langsung masuk, jika Login baru tanya dulu
                if (isResume) {
                    this.restoreSession(data);
                } else {
                    Swal.fire({
                        title: 'Lanjutkan?',
                        text: 'Melanjutkan sesi dari server...',
                        icon: 'info',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => this.restoreSession(data));
                }

            } else {
                // --- USER BARU ---
                if (isResume) {
                    // Kasus aneh: di lokal ada tapi di server gak ada (mungkin database dihapus)
                    localStorage.removeItem('cbt_active_session');
                    location.reload();
                } else {
                    this.gotoConfirmPage();
                }
            }
        });
    },

    gotoConfirmPage: function() {
        document.getElementById('info-mapel').innerText = this.currentPaket.mapel;
        document.getElementById('info-waktu').innerText = this.currentPaket.waktu + " Menit";
        
        const inpNama = document.getElementById('data-nama');
        const inpSekolah = document.getElementById('data-sekolah');
        if(inpNama) { inpNama.value = this.userData.nama; inpNama.disabled = true; }
        if(inpSekolah) { inpSekolah.value = this.userData.sekolah; inpSekolah.disabled = true; }

        this.switchView('view-data');
    },

    // =========================================
    // 2. START & SINGLE DEVICE MONITORING
    // =========================================
    startUjian: function() {
        if(!navigator.onLine) return Swal.fire('Offline', 'Koneksi internet diperlukan.', 'warning');
        
        Swal.fire({ title: 'Memulai...', didOpen: () => Swal.showLoading() });

        // Data Awal - HANYA SET JIKA BELUM ADA
        // Kita pakai update() supaya tidak menimpa startTime jika sudah ada (race condition prevention)
        
        db.ref('sessions/' + this.sessionId).once('value').then(snap => {
            let updates = {};
            
            // Jika data belum ada, set StartTime (TIMESTAMP MASUK)
            if (!snap.exists()) {
                updates.startTime = firebase.database.ServerValue.TIMESTAMP;
                updates.paketId = this.currentPaket.id;
                updates.userData = this.userData;
                updates.sheetRowIndex = this.sheetRowIndex;
                updates.status = 'ongoing';
            }
            
            // Selalu update Device ID aktif (Kick device lama)
            updates.activeDeviceId = this.deviceId; 

            return db.ref('sessions/' + this.sessionId).update(updates);
        }).then(() => {
            // Ambil data terbaru untuk sinkronisasi
            return db.ref('sessions/' + this.sessionId).once('value');
        }).then((snap) => {
            Swal.close();
            this.restoreSession(snap.val());
        });
    },

    restoreSession: function(data) {
        // 1. Simpan Session ke LocalStorage (Biar kalau refresh aman)
        localStorage.setItem('cbt_active_session', JSON.stringify({
            sessionId: this.sessionId,
            paketId: this.currentPaket.id,
            userData: this.userData,
            sheetRowIndex: this.sheetRowIndex
        }));

        // 2. Load Data
        this.answers = data.answers || {};
        this.ragu = data.ragu || {};
        this.serverStartTime = data.startTime; // WAKTU MASUK (ABSOLUT)

        // 3. Monitor Single Device (Anti Joki)
        this.monitorSingleDevice();

        // 4. Hitung Waktu
        this.calculateTimeRemaining();
        if (this.sisaWaktu <= 0) {
            Swal.fire('Waktu Habis', 'Waktu ujian telah habis.', 'error').then(() => this.submitData(true));
            return;
        }

        // 5. Render UI
        document.getElementById('disp-nama').innerText = this.userData.nama;
        document.getElementById('disp-mapel').innerText = this.currentPaket.mapel;
        
        this.switchView('view-ujian');
        this.startTimer();
        this.renderSoal(0);
        this.setFont(2);
    },

    monitorSingleDevice: function() {
        // Dengar perubahan di Firebase
        const deviceRef = db.ref('sessions/' + this.sessionId + '/activeDeviceId');
        deviceRef.on('value', (snapshot) => {
            const activeId = snapshot.val();
            // Jika ID di server beda dengan ID browser ini -> Logout paksa
            if (activeId && activeId !== this.deviceId) {
                // Matikan listener biar gak looping
                deviceRef.off(); 
                clearInterval(this.timerInterval);
                localStorage.removeItem('cbt_active_session');
                
                Swal.fire({
                    title: 'Login Terdeteksi di Perangkat Lain',
                    text: 'Akun Anda telah login di perangkat lain. Sesi ini dihentikan.',
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonText: 'Keluar'
                }).then(() => {
                    location.reload();
                });
            }
        });
    },

    // --- TIMER & SYNC ---
    calculateTimeRemaining: function() {
        if (!this.serverStartTime) return;
        const now = Date.now();
        const durationMs = this.currentPaket.waktu * 60 * 1000;
        const elapsedMs = now - this.serverStartTime;
        this.sisaWaktu = Math.floor((durationMs - elapsedMs) / 1000);
    },

    startTimer: function() {
        clearInterval(this.timerInterval);
        const display = document.getElementById('time-val');
        const displayMob = document.getElementById('timer-mobile');

        this.timerInterval = setInterval(() => {
            this.calculateTimeRemaining(); // Recalculate from server time
            
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
        }, 1000);
    },

    syncAnswer: function() {
        if(navigator.onLine && this.sessionId) {
            db.ref('sessions/' + this.sessionId).update({
                answers: this.answers,
                ragu: this.ragu,
                lastUpdate: firebase.database.ServerValue.TIMESTAMP
            });
        }
    },

    // =========================================
    // 3. UI RENDERING & HANDLERS (BUG FIXES)
    // =========================================
    switchView: function(viewId) {
        document.querySelectorAll('section').forEach(el => {
            el.classList.remove('active-view');
            el.classList.add('hidden-view');
        });
        const target = document.getElementById(viewId);
        if(target) { 
            target.classList.remove('hidden-view'); 
            target.classList.add('active-view'); 
        }
    },

    renderSoal: function(index) {
        this.currentIndex = index;
        const data = this.currentPaket.soal[index];
        const numElem = document.getElementById('nomor-soal');
        if(numElem) numElem.innerText = index + 1;
        
        // Stimulus logic
        const pStim = document.getElementById('panel-stimulus');
        if (pStim) {
            if (data.stimulus && data.stimulus.tampil) {
                pStim.innerHTML = data.stimulus.konten;
                pStim.classList.add('active');
                if(window.MathJax) MathJax.typesetPromise([pStim]);
            } else {
                pStim.classList.remove('active');
            }
        }

        const pSoal = document.getElementById('panel-soal');
        if(!pSoal) return;

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
            html += `<table class="table-bs"><thead><tr><th>Pernyataan</th><th width="50">B</th><th width="50">S</th></tr></thead><tbody>`;
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
        
        const checkRagu = document.getElementById('check-ragu');
        if(checkRagu) checkRagu.checked = this.ragu[index] || false;
        
        this.updateGrid();
        this.updateNavButtons(index);
    },

    // --- SAFE HANDLERS ---
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
    setRagu: function() { 
        const chk = document.getElementById('check-ragu');
        if(chk) { this.ragu[this.currentIndex] = chk.checked; this.updateGrid(); this.syncAnswer(); }
    },
    
    // Navigasi
    navigasi: function(step) {
        const next = this.currentIndex + step;
        if(next >= 0 && next < this.currentPaket.soal.length) this.renderSoal(next);
    },

    updateGrid: function() {
        const c = document.getElementById('grid-container');
        if(!c) return;
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

    // SAFETY UPDATE NAV BUTTONS
    updateNavButtons: function(index) {
        const total = this.currentPaket.soal.length;
        const isLast = index === total - 1;
        
        // Prev Button
        const btnPrev = document.getElementById('btn-prev');
        if(btnPrev) {
            btnPrev.disabled = (index === 0);
            // Pastikan event listener jalan
            btnPrev.onclick = () => this.navigasi(-1);
        }

        // Next Button (Desktop/Mobile Shared ID Logic or Class)
        const btnNext = document.getElementById('btn-next');
        const deskText = document.getElementById('desk-next-text'); // Text di desktop
        const deskIcon = document.getElementById('desk-next-icon'); // Icon di desktop

        if (btnNext) {
            if (isLast) {
                // Ubah jadi Selesai
                btnNext.innerHTML = 'SELESAI <i class="fa-solid fa-check"></i>';
                btnNext.classList.add('btn-finish');
                btnNext.onclick = () => this.confirmSubmit();
            } else {
                // Ubah jadi Selanjutnya
                btnNext.innerHTML = 'SELANJUTNYA <i class="fa-solid fa-chevron-right"></i>';
                btnNext.classList.remove('btn-finish');
                btnNext.onclick = () => this.navigasi(1);
            }
        }
    },

    setFont: function(size) {
        const s = ['14px', '16px', '20px'];
        document.documentElement.style.setProperty('--base-size', s[size-1]);
    },

    // =========================================
    // 4. SCORING & SUBMIT
    // =========================================
    calculateResult: function() {
        let detail = [];
        let benarCount = 0;
        const totalSoal = this.currentPaket.soal.length;

        this.currentPaket.soal.forEach((soal, i) => {
            const jwb = this.answers[i];
            const kunci = soal.kunci;
            let status = "SALAH";

            if (!jwb) { detail.push("KOSONG"); return; }

            if (soal.tipe === 'pg') {
                if (jwb === kunci) status = "BENAR";
            } else if (soal.tipe === 'pgk') {
                const jwbSorted = JSON.stringify(jwb.sort());
                const kunciSorted = JSON.stringify(kunci.sort());
                if (jwbSorted === kunciSorted) status = "BENAR";
            } else if (soal.tipe === 'pgk-kategori') {
                let isPerfect = true;
                const rows = Object.keys(kunci);
                for (let r of rows) { if (jwb[r] !== kunci[r]) { isPerfect = false; break; } }
                if (isPerfect) status = "BENAR";
            }

            if (status === "BENAR") benarCount++;
            detail.push(status);
        });

        const skorAkhir = (benarCount / totalSoal) * 100;
        return { skor: skorAkhir.toFixed(2), detail: detail };
    },

    confirmSubmit: function() {
        Swal.fire({
            title: 'Konfirmasi',
            text: "Yakin ingin mengakhiri ujian?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            confirmButtonText: 'Ya, Kumpulkan'
        }).then((res) => {
            if (res.isConfirmed) this.submitData(false);
        });
    },

    submitData: function(force) {
        if(!navigator.onLine) return Swal.fire('Error', 'Tidak ada koneksi internet.', 'error');
        
        Swal.fire({ title: 'Menyimpan...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        const result = this.calculateResult();

        // 1. Firebase Finish
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
            localStorage.removeItem('cbt_active_session'); // Bersihkan sesi lokal
            Swal.fire({ title: 'Sukses!', text: `Nilai: ${result.skor}`, icon: 'success' })
                .then(() => location.reload());
        })
        .catch(err => {
            console.error(err);
            localStorage.removeItem('cbt_active_session');
            Swal.fire('Tersimpan', 'Data aman di server cadangan.', 'success').then(() => location.reload());
        });
    },

    logout: function() { this.confirmSubmit(); }
};

document.addEventListener('DOMContentLoaded', () => { app.init(); });
