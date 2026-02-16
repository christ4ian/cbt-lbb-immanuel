/* ===========================================================
   CBT SYSTEM V10 - BUG FIX EDITION
   Fitur: 
   1. Cloud Timer & Single Device (V8 Logic)
   2. UI Buttons Restore (V5 Logic) - nextSoal/prevSoal is back
   3. Sidebar Toggle Fixed
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

// 2. URL GOOGLE SCRIPT (DEPLOYMENT TERBARU)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKBR9C0h9unHOU8PcQSLN3u26wyqt6ft7UYoZxhNBdkSwguLvQc5iACpODWFn8kU_ltg/exec"; 

// Init Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.database();

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

    // Config (3 Jam)
    MAX_SESSION_TIME: 3 * 60 * 60 * 1000, 

    // --- INIT ---
    init: function() {
        console.log("System V10 Ready: Fixed Navigation");
        
        let did = localStorage.getItem('cbt_device_id');
        if (!did) {
            did = 'dev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('cbt_device_id', did);
        }
        this.deviceId = did;

        this.loadDaftarPaket();
        this.checkResume();
    },

    checkResume: function() {
        const saved = JSON.parse(localStorage.getItem('cbt_active_session'));
        if (saved && saved.sessionId) {
            this.sessionId = saved.sessionId;
            this.userData = saved.userData;
            this.sheetRowIndex = saved.sheetRowIndex;
            
            const paket = PAKET_SOAL.find(p => p.id === saved.paketId);
            if(paket) {
                this.currentPaket = paket;
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
    // 1. LOGIN
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
                const safeEmail = email.replace(/\./g, '_');
                this.sessionId = this.currentPaket.id + "_" + safeEmail;
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
                if (data.status === 'submitted') {
                    localStorage.removeItem('cbt_active_session');
                    return Swal.fire('Selesai', 'Ujian telah dikumpulkan.', 'warning').then(() => location.reload());
                }
                const now = Date.now();
                if (now - data.startTime > this.MAX_SESSION_TIME) {
                    return Swal.fire('Waktu Habis', 'Batas 3 jam habis.', 'error');
                }
                if (isResume) this.restoreSession(data);
                else Swal.fire({ title: 'Lanjutkan?', text: 'Melanjutkan sesi...', icon: 'info', timer: 1500, showConfirmButton: false }).then(() => this.restoreSession(data));
            } else {
                if(isResume) { localStorage.removeItem('cbt_active_session'); location.reload(); return; }
                this.gotoConfirmPage();
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
    // 2. START & RESTORE
    // =========================================
    startUjian: function() {
        if(!navigator.onLine) return Swal.fire('Offline', 'Koneksi internet diperlukan.', 'warning');
        Swal.fire({ title: 'Memulai...', didOpen: () => Swal.showLoading() });

        db.ref('sessions/' + this.sessionId).once('value').then(snap => {
            let updates = {};
            if (!snap.exists()) {
                updates.startTime = firebase.database.ServerValue.TIMESTAMP;
                updates.paketId = this.currentPaket.id;
                updates.userData = this.userData;
                updates.sheetRowIndex = this.sheetRowIndex;
                updates.status = 'ongoing';
            }
            updates.activeDeviceId = this.deviceId; 
            return db.ref('sessions/' + this.sessionId).update(updates);
        }).then(() => {
            return db.ref('sessions/' + this.sessionId).once('value');
        }).then((snap) => {
            Swal.close();
            this.restoreSession(snap.val());
        });
    },

    restoreSession: function(data) {
        localStorage.setItem('cbt_active_session', JSON.stringify({
            sessionId: this.sessionId, paketId: this.currentPaket.id, userData: this.userData, sheetRowIndex: this.sheetRowIndex
        }));

        this.answers = data.answers || {};
        this.ragu = data.ragu || {};
        this.serverStartTime = data.startTime;

        this.monitorSingleDevice();
        this.calculateTimeRemaining();
        if (this.sisaWaktu <= 0) {
            Swal.fire('Waktu Habis', 'Waktu ujian telah habis.', 'error').then(() => this.submitData(true));
            return;
        }

        document.getElementById('disp-nama').innerText = this.userData.nama;
        document.getElementById('disp-mapel').innerText = this.currentPaket.mapel;
        
        this.switchView('view-ujian');
        this.startTimer();
        this.renderSoal(0);
        this.setFont(2);
    },

    monitorSingleDevice: function() {
        const deviceRef = db.ref('sessions/' + this.sessionId + '/activeDeviceId');
        deviceRef.on('value', (snapshot) => {
            const activeId = snapshot.val();
            if (activeId && activeId !== this.deviceId) {
                deviceRef.off(); clearInterval(this.timerInterval);
                localStorage.removeItem('cbt_active_session');
                Swal.fire({ title: 'Login Terdeteksi di Perangkat Lain', text: 'Sesi dihentikan.', icon: 'error', allowOutsideClick: false, confirmButtonText: 'Keluar' }).then(() => location.reload());
            }
        });
    },

    // =========================================
    // 3. CORE UI & RENDER (FIX BUTTONS)
    // =========================================
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

        document.getElementById('check-ragu').checked = this.ragu[index] || false;
        this.updateGrid();
        this.updateNavButtons(index);
    },

    // --- HANDLERS (SIMPLE & SAFE) ---
    selectAnswer: function(val) {
        this.answers[this.currentIndex] = val;
        this.renderSoal(this.currentIndex);
        this.saveRealtime();
    },
    toggleCheck: function(val) {
        let arr = this.answers[this.currentIndex] || [];
        if(!Array.isArray(arr)) arr = [];
        if(arr.includes(val)) arr = arr.filter(x=>x!==val); else arr.push(val);
        this.answers[this.currentIndex] = arr;
        this.renderSoal(this.currentIndex);
        this.saveRealtime();
    },
    selectBS: function(row, val) {
        let obj = this.answers[this.currentIndex] || {};
        obj[row] = val;
        this.answers[this.currentIndex] = obj;
        this.updateGrid();
        this.saveRealtime();
    },
    setRagu: function() {
        this.ragu[this.currentIndex] = document.getElementById('check-ragu').checked;
        this.updateGrid();
        this.saveRealtime();
    },
    
    saveRealtime: function() {
        if(this.sessionId) {
            db.ref('sessions/' + this.sessionId).update({
                answers: this.answers,
                ragu: this.ragu,
                lastUpdate: firebase.database.ServerValue.TIMESTAMP
            });
        }
    },

    // --- NAVIGASI FIX (nextSoal IS BACK!) ---
    // Saya kembalikan fungsi nextSoal dan prevSoal agar cocok dengan HTML
    nextSoal: function() {
        if (this.currentIndex === this.currentPaket.soal.length - 1) this.confirmSubmit();
        else this.renderSoal(this.currentIndex + 1);
    },
    
    prevSoal: function() {
        if (this.currentIndex > 0) this.renderSoal(this.currentIndex - 1);
    },

    // Fungsi Navigasi Generik (Untuk tombol di footer jika pake ID baru)
    navigasi: function(step) {
        const next = this.currentIndex + step;
        if (next >= 0 && next < this.currentPaket.soal.length) this.renderSoal(next);
    },

    updateNavButtons: function(index) {
        const total = this.currentPaket.soal.length;
        const isLast = index === total - 1;
        
        // Handle Tombol ID Lama (btn-prev, btn-next)
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        const deskText = document.getElementById('desk-next-text'); 
        const deskIcon = document.getElementById('desk-next-icon'); 

        if (btnPrev) {
            btnPrev.disabled = (index === 0);
            // Paksa onclick ke fungsi yang benar
            btnPrev.onclick = () => this.prevSoal();
        }

        if (btnNext) {
            if (isLast) {
                // Mode SELESAI
                btnNext.innerHTML = 'SELESAI <i class="fa-solid fa-check"></i>';
                btnNext.classList.add('btn-finish');
                btnNext.onclick = () => this.confirmSubmit();
                if(deskText) deskText.innerText = "Selesai";
                if(deskIcon) deskIcon.className = "fa-solid fa-check";
            } else {
                // Mode SELANJUTNYA
                btnNext.innerHTML = 'SELANJUTNYA <i class="fa-solid fa-chevron-right"></i>';
                btnNext.classList.remove('btn-finish');
                btnNext.onclick = () => this.nextSoal();
                if(deskText) deskText.innerText = "Selanjutnya";
                if(deskIcon) deskIcon.className = "fa-solid fa-chevron-right";
            }
        }
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

    // --- TIMER ---
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
        }, 1000);
    },

    // --- SUBMIT ---
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

    submitData: function(force) {
        if(!navigator.onLine) return Swal.fire('Error', 'Tidak ada koneksi internet.', 'error');
        
        Swal.fire({ title: 'Menyimpan...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        const result = this.calculateResult();

        db.ref('sessions/' + this.sessionId).update({
            status: 'submitted',
            finalScore: result.skor,
            finishTime: firebase.database.ServerValue.TIMESTAMP
        });

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
            localStorage.removeItem('cbt_active_session');
            Swal.fire({ title: 'Sukses!', text: `Nilai: ${result.skor}`, icon: 'success' })
                .then(() => location.reload());
        })
        .catch(err => {
            console.error(err);
            localStorage.removeItem('cbt_active_session');
            Swal.fire('Tersimpan', 'Data aman di server cadangan.', 'success').then(() => location.reload());
        });
    },

    // Utils
    switchView: function(viewId) {
        document.querySelectorAll('section').forEach(el => {
            el.classList.remove('active-view');
            el.classList.add('hidden-view');
        });
        const target = document.getElementById(viewId);
        if(target) { target.classList.remove('hidden-view'); target.classList.add('active-view'); }
    },
    setFont: function(size) {
        const s = ['14px', '16px', '20px'];
        document.documentElement.style.setProperty('--base-size', s[size-1]);
        document.querySelectorAll('.font-resizer span').forEach((el, i) => { i === size-1 ? el.classList.add('active') : el.classList.remove('active'); });
    },
    logout: function() { this.confirmSubmit(); }
};

// --- FUNGSI GLOBAL TOGGLE SIDEBAR (YANG TADI HILANG) ---
function toggleSidebar() {
    const sb = document.getElementById('sidebar-list');
    const ov = document.getElementById('overlay');
    if(sb && ov) {
        sb.classList.toggle('active');
        ov.classList.toggle('active');
    }
}

document.addEventListener('DOMContentLoaded', () => { app.init(); });
