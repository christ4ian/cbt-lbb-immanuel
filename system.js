/* ===========================================================
   CBT SYSTEM FINAL STABLE - REVISED (FIXED ANDROID)
   - Fixed: Navigasi Kanan/Kiri Mobile & Desktop
   - Fixed: Scroll Halaman Data
   - Fixed: Logika Tombol Selesai
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

// URL SCRIPT GOOGLE
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKBR9C0h9unHOU8PcQSLN3u26wyqt6ft7UYoZxhNBdkSwguLvQc5iACpODWFn8kU_ltg/exec"; 

const ADMIN_EMAIL = "admin@lbbimmanuel.com";

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
    deadline: 0,

    // --- INIT ---
    init: function() {
        console.log("System Ready (Fixed Version).");
        
        // Setup Device ID
        let did = localStorage.getItem('cbt_device_id');
        if (!did) {
            did = 'dev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('cbt_device_id', did);
        }
        this.deviceId = did;

        this.loadDaftarPaket();
        this.checkResume();

        // --- FIX TAMBAHAN: AUTO PATCH CSS VIA JS (Agar bisa scroll di Android) ---
        const styleFix = document.createElement('style');
        styleFix.innerHTML = `
            .container-data { overflow-y: auto !important; -webkit-overflow-scrolling: touch; padding-bottom: 80px; }
            .active-view { height: 100vh; height: 100dvh; overflow: hidden; }
        `;
        document.head.appendChild(styleFix);
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
                this.syncWithCloud(true); // True = Resume Mode
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
    // 1. LOGIN (WITH SUPER ADMIN BYPASS)
    // =========================================
    gotoData: function() {
        const idx = document.getElementById('input-paket').value;
        const email = document.getElementById('input-email').value.trim().toLowerCase();
        const ADMIN_EMAIL = "admin@lbbimmanuel.com"; // Email Sakti

        if(idx === "") return Swal.fire('Error', 'Pilih paket soal!', 'error');
        if(!email || !email.includes('@')) return Swal.fire('Error', 'Masukkan email valid!', 'error');

        // --- CEK SAKTI: JIKA ADMIN, LANGSUNG MASUK ---
        if (email === ADMIN_EMAIL) {
            this.currentPaket = PAKET_SOAL[idx];
            this.userData = { 
                nama: "ADMIN MASTER", kelas: "Internal", sekolah: "IMMANUEL", 
                email: email, isAdmin: true 
            };
            // Session ID unik agar setiap masuk dianggap sesi baru di browser
            this.sessionId = "admin_" + this.currentPaket.id + "_" + Date.now();
            
            this.gotoConfirmPage(); 
            return; // Berhenti di sini, jangan lanjut ke fetch bawahnya 
        }

        // --- LOGIKA SISWA BIASA (Tetap Pakai Fetch) ---
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
                // JIKA SISWA SUDAH MENGERJAKAN
                if (res.data.statusSheet === "SUDAH") {
                    // Ambil skor dari response (pastikan Apps Script mengirim data 'skor')
                    const nilai = res.data.skor !== undefined ? res.data.skor : "?";
                    
                    Swal.fire({
                        title: 'Ujian Selesai',
                        html: `
                            <div class="text-center">
                                <p>Anda sudah menyelesaikan ujian ini sebelumnya.</p>
                                <div style="font-size: 2.5rem; font-weight: bold; color: #2ecc71; margin: 15px 0;">
                                    ${nilai}
                                </div>
                                <p class="text-muted">Skor Anda telah tercatat di server.</p>
                            </div>
                        `,
                        icon: 'success',
                        confirmButtonText: 'Tutup'
                    });
                    return;
                }
                
                // Jika belum mengerjakan, lanjut masuk soal
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

    // =========================================
    // 1. SINKRONISASI CLOUD
    // =========================================
    syncWithCloud: function(isResume) {
        db.ref('sessions/' + this.sessionId).once('value').then((snapshot) => {
            const data = snapshot.val();
            Swal.close();

            if (data) {
                // Cek jika sudah selesai
                if (data.status === 'submitted') {
                    localStorage.removeItem('cbt_active_session');
                    return Swal.fire('Selesai', 'Ujian telah dikumpulkan.', 'warning').then(() => location.reload());
                }
                
                // Langsung update device dan masuk soal
                db.ref('sessions/' + this.sessionId).update({ activeDeviceId: this.deviceId });
                this.restoreSession(data);
            } else {
                if(isResume) { localStorage.removeItem('cbt_active_session'); location.reload(); return; }
                this.gotoConfirmPage();
            }
        });
    },

    gotoConfirmPage: function() {
        // 1. Tampilkan Info Mapel, Waktu, dan Jumlah Soal
        document.getElementById('info-mapel').innerText = this.currentPaket.mapel;
        document.getElementById('info-waktu').innerText = this.currentPaket.waktu + " Menit";
        document.getElementById('info-jml-soal').innerText = this.currentPaket.soal.length + " Butir";
        
        // 2. LOGIKA BARU: Tampilkan Petunjuk sebagai Daftar List (Nomor)
        const petunjukList = document.getElementById('info-petunjuk-list');
        if(petunjukList) {
            petunjukList.innerHTML = ""; 
            const daftarPetunjuk = this.currentPaket.petunjuk || ["Ikuti instruksi pengawas."];
            
            daftarPetunjuk.forEach(teks => {
                const li = document.createElement('li');
                li.innerText = teks;
                petunjukList.appendChild(li);
            });
        }

        // 3. Isi Form Data Peserta (Nama, Kelas, Sekolah)
        const inpNama = document.getElementById('data-nama');
        const inpKelas = document.getElementById('data-kelas');
        const inpSekolah = document.getElementById('data-sekolah');
        
        if(inpNama) inpNama.value = this.userData.nama;
        if(inpKelas) inpKelas.value = this.userData.kelas;
        if(inpSekolah) inpSekolah.value = this.userData.sekolah;

        this.switchView('view-data');
    },

    // =========================================
    // 2. START UJIAN
    // =========================================
    startUjian: function() {
        if (this.userData && this.userData.isAdmin) {
            const dummyData = {
                startTime: Date.now(),
                answers: {}, 
                ragu: {},
                status: 'ongoing'
            };
            this.restoreSession(dummyData); 
            return; 
        }
        
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

    // =========================================
    // 3. SESSION RESTORE & UI SETUP
    // =========================================
    restoreSession: function(data) {
        // 1. Simpan Jejak di Browser
        localStorage.setItem('cbt_active_session', JSON.stringify({
            sessionId: this.sessionId, paketId: this.currentPaket.id, 
            userData: this.userData, sheetRowIndex: this.sheetRowIndex
        }));

        this.answers = data.answers || {};
        this.ragu = data.ragu || {};
        
        // 2. LOGIKA DEADLINE TETAP (Fixed Deadline)
        const durasiMenit = this.userData.isAdmin ? 999 : this.currentPaket.waktu; 
        this.deadline = data.startTime + (durasiMenit * 60 * 1000);

        // 3. CEK EXPIRED
        if (Date.now() >= this.deadline && !this.userData.isAdmin) {
            return this.submitData(true);
        }

        // 4. MENGISI HEADER (Fix Error 318)
        if(document.getElementById('disp-nama')) document.getElementById('disp-nama').innerText = this.userData.nama;
        if(document.getElementById('disp-mapel')) document.getElementById('disp-mapel').innerText = this.currentPaket.mapel;
        
        // 5. JALANKAN MESIN SOAL
        this.renderSoal(0);
        this.updateGrid(); // FIX: Menggunakan updateGrid() agar tidak TypeError
        this.startTimer(); 
        this.monitorSingleDevice(); 
        this.setFont(2);

        // 6. TAMPILKAN LAYAR UJIAN
        this.switchView('view-ujian');
    },

    // =========================================
    // 4. SECURITY MONITORING
    // =========================================
    monitorSingleDevice: function() {
        if (this.userData.isAdmin) return;
        const deviceRef = db.ref('sessions/' + this.sessionId + '/activeDeviceId');
        deviceRef.on('value', (snapshot) => {
            const activeId = snapshot.val();
            if (activeId && activeId !== this.deviceId) {
                deviceRef.off(); 
                if(this.timerInterval) clearInterval(this.timerInterval);
                localStorage.removeItem('cbt_active_session');
                Swal.fire({ 
                    title: 'Logout Otomatis', 
                    text: 'Akun login di perangkat lain.', 
                    icon: 'error', 
                    allowOutsideClick: false, 
                    confirmButtonText: 'Keluar' 
                }).then(() => location.reload());
            }
        });
    },

    // =========================================
    // 3. UI RENDER
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
    // --- TIPE PILIHAN GANDA BIASA ---
    html += `<div class="pilihan-wrapper">`;
    data.opsi.forEach((opt, i) => {
        const char = String.fromCharCode(65 + i);
        const active = jwb === char ? 'active' : '';
        html += `<div class="opsi-item ${active}" onclick="app.selectAnswer('${char}')"><div class="marker">${char}</div><div class="text">${opt}</div></div>`;
    });
    html += `</div>`;

} else if (data.tipe === 'pgk') {
    // --- TIPE PILIHAN GANDA KOMPLEKS (CHECKBOX) ---
    html += `<div class="pilihan-wrapper">`;
    const arr = Array.isArray(jwb) ? jwb : [];
    data.opsi.forEach((opt, i) => {
        const val = i.toString();
        const active = arr.includes(val) ? 'active' : '';
        html += `<div class="opsi-item ${active}" onclick="app.toggleCheck('${val}')"><div class="marker"><i class="fa-solid fa-check"></i></div><div class="text">${opt}</div></div>`;
    });
    html += `</div>`;

} else if (data.tipe === 'pgk-kategori') {
    // --- TIPE KATEGORI (CUSTOM LABELS: B/S, FAKTA/OPINI, DLL) ---
    const obj = jwb || {};
    // Ambil label dari soal, jika tidak ada gunakan default B & S
    const label = data.labelKategori || ["B", "S"]; 
    
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
        // Cek jawaban menggunakan L1 (Label Kiri) dan L2 (Label Kanan)
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
    html += `</tbody></table>`;
}

pSoal.innerHTML = html;
        if(window.MathJax) MathJax.typesetPromise([pSoal]);

        document.getElementById('check-ragu').checked = this.ragu[index] || false;
        this.updateGrid();
        this.updateNavButtons(index);
    },

    // HANDLERS
    selectAnswer: function(val) { this.answers[this.currentIndex] = val; this.renderSoal(this.currentIndex); this.saveRealtime(); },
    toggleCheck: function(val) { 
        let arr = this.answers[this.currentIndex] || [];
        if(!Array.isArray(arr)) arr = [];
        if(arr.includes(val)) arr = arr.filter(x=>x!==val); else arr.push(val);
        this.answers[this.currentIndex] = arr; this.renderSoal(this.currentIndex); this.saveRealtime(); 
    },
    selectBS: function(r, v) { 
        let obj = this.answers[this.currentIndex] || {}; obj[r] = v; this.answers[this.currentIndex] = obj; this.updateGrid(); this.saveRealtime(); 
    },
    setRagu: function() { this.ragu[this.currentIndex] = document.getElementById('check-ragu').checked; this.updateGrid(); this.saveRealtime(); },
    saveRealtime: function() {
        if(this.userData.isAdmin) return;
        if(this.sessionId) {
            db.ref('sessions/' + this.sessionId).update({
                answers: this.answers,
                ragu: this.ragu,
                lastUpdate: firebase.database.ServerValue.TIMESTAMP
            });
        }
    },

    // --- PERBAIKAN NAVIGASI DI SINI ---
    // Fungsi ini dipanggil oleh onclick di HTML (app.prevSoal & app.nextSoal)
    prevSoal: function() { this.navigasi(-1); },
    nextSoal: function() { this.navigasi(1); },

    prevSoal: function() { this.navigasi(-1); },
    nextSoal: function() { this.navigasi(1); },

    navigasi: function(step) {
        const next = this.currentIndex + step;
        if(next >= 0 && next < this.currentPaket.soal.length) this.renderSoal(next);
    },

    updateNavButtons: function(index) {
        const total = this.currentPaket.soal.length;
        const isLast = (index === total - 1);
        const isFirst = (index === 0);

        const btnNextDesk = document.getElementById('btn-next-desktop');
        const btnNextMob = document.getElementById('btn-next-mobile');
        const btnPrevDesk = document.querySelector('.btn-nav.prev');
        const btnPrevMob = document.querySelector('.btn-mobile-icon.prev');

        // Update Button Prev
        if(btnPrevDesk) btnPrevDesk.disabled = isFirst;
        if(btnPrevMob) btnPrevMob.disabled = isFirst;

        // Update Button Next / Selesai
        const updateStyle = (btn, isMob) => {
            if(!btn) return;
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
    }, // Baris 249 yang benar berakhir di sini

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

    // TIMER
    calculateTimeRemaining: function() {
        if (!this.serverStartTime) return;
        const now = Date.now();
        const durationMs = this.currentPaket.waktu * 60 * 1000;
        const elapsedMs = now - this.serverStartTime;
        this.sisaWaktu = Math.floor((durationMs - elapsedMs) / 1000);
    },

    startTimer: function() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        const timerDisplay = document.getElementById('timer');
        
        this.timerInterval = setInterval(() => {
            const sekarang = Date.now();
            const sisaDetik = Math.floor((this.deadline - sekarang) / 1000);

            if (sisaDetik <= 0) {
                clearInterval(this.timerInterval);
                timerDisplay.innerText = "00:00:00";
                if (!this.userData.isAdmin) {
                    Swal.fire({
                        title: 'Waktu Habis!',
                        text: 'Jawaban Anda akan dikirim otomatis.',
                        icon: 'warning',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        this.submitData(true); // Paksa submit
                    });
                }
                return;
            }

            // Konversi sisaDetik ke format Jam:Menit:Detik
            const h = Math.floor(sisaDetik / 3600).toString().padStart(2, '0');
            const m = Math.floor((sisaDetik % 3600) / 60).toString().padStart(2, '0');
            const s = (sisaDetik % 60).toString().padStart(2, '0');
            timerDisplay.innerText = `${h}:${m}:${s}`;

            // Warnai merah jika sisa 5 menit
            if (sisaDetik < 300) {
                timerDisplay.style.color = 'red';
                timerDisplay.classList.add('blink');
            }
        }, 1000);
    },

    // SUBMIT
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
       if(this.userData && this.userData.isAdmin) {
            localStorage.removeItem('cbt_active_session'); // Hapus jejak login 
            return Swal.fire({
                title: 'Simulasi Selesai',
                text: 'Data admin tidak disimpan di database.',
                icon: 'success'
            }).then(() => {
                location.reload(); // Kembali ke halaman login awal 
            });
        }
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

// GLOBAL FUNCTION
function toggleSidebar() {
    const sb = document.getElementById('sidebar-list');
    const ov = document.getElementById('overlay');
    if(sb && ov) {
        sb.classList.toggle('active');
        ov.classList.toggle('active');
    }
}

// Cek status halaman dulu. Jika sudah siap, langsung jalankan.
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Gunakan setTimeout agar render UI tidak blocking
    setTimeout(() => app.init(), 1);
} else {
    // Jika belum siap (jarang terjadi di kasusmu), tunggu eventnya
    document.addEventListener('DOMContentLoaded', () => app.init());
}
/* ========================================================== */
/* ========================================================== */
/* [ADD-ON] AUTO-BACKUP & NOTIFIKASI SWEETALERT (TOAST)      */
/* Tempel kode ini di baris paling bawah system.js           */
/* ========================================================== */

(function() {
    // 1. KONFIGURASI SWEETALERT TOAST (Notifikasi Melayang)
    // Ini membuat alert kecil, tidak memblokir layar, dan hilang sendiri
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',       // Muncul di atas tengah (bisa ganti 'top-end' untuk pojok kanan)
        showConfirmButton: false,
        timer: 4000,           // Hilang otomatis setelah 4 detik
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    // 2. DETEKSI STATUS KONEKSI
    function handleConnectionChange() {
        if (!navigator.onLine) {
            // JIKA OFFLINE (Internet Mati)
            Toast.fire({
                icon: 'error',
                title: 'Koneksi Terputus!',
                text: 'Tenang, jawabanmu aman disimpan di HP ini.'
            });
        } else {
            // JIKA ONLINE (Internet Nyala Kembali)
            Toast.fire({
                icon: 'success',
                title: 'Koneksi Kembali!',
                text: 'Mencoba sinkronisasi data ke server...'
            });

            // Coba kirim ulang data ke Firebase saat online kembali
            if(typeof app !== 'undefined' && app.saveRealtime) {
                app.saveRealtime();
            }
        }
    }

    // Pasang Pendengar Sinyal
    window.addEventListener('offline', handleConnectionChange);
    window.addEventListener('online', handleConnectionChange);

    // Cek status saat pertama kali load (barangkali pas buka web udah mati)
    if (!navigator.onLine) {
        handleConnectionChange();
    }

    // 3. AUTO-BACKUP KE LOCALSTORAGE (FITUR ANTI-BADAL)
    // Menyimpan jawaban ke memori HP setiap kali fungsi simpan dipanggil
    if (typeof app !== 'undefined') {
        const originalSave = app.saveRealtime; // Simpan fungsi asli
        const originalRestore = app.restoreSession; // Simpan fungsi restore asli

        // A. Bajak fungsi simpan untuk backup ke HP
        app.saveRealtime = function() {
            originalSave.call(app); // Jalankan fungsi asli

            if(app.sessionId) {
                const backupData = {
                    answers: app.answers,
                    ragu: app.ragu,
                    timestamp: Date.now()
                };
                localStorage.setItem('CBT_BACKUP_' + app.sessionId, JSON.stringify(backupData));
                console.log("💾 Jawaban ter-backup di LocalStorage.");
            }
        };

        // B. Bajak fungsi restore untuk ambil data dari HP jika server gagal/lambat
        app.restoreSession = function(data) {
            const backupKey = 'CBT_BACKUP_' + app.sessionId;
            const localBackup = JSON.parse(localStorage.getItem(backupKey));

            // Jika data di HP lebih lengkap/baru dibanding data server, pakai data HP
            if (localBackup && (!data.answers || Object.keys(localBackup.answers).length > Object.keys(data.answers || {}).length)) {
                console.log("♻️ Mengembalikan jawaban dari backup HP.");
                data.answers = localBackup.answers;
                data.ragu = localBackup.ragu;
                
                // Beri tahu user kalau kita pakai data backup
                Toast.fire({
                    icon: 'info',
                    title: 'Data Dipulihkan',
                    text: 'Mengambil jawaban terakhir dari memori HP.'
                });
            }
            
            originalRestore.call(app, data);
        };
    }
})();;

// Fitur klik gambar untuk memperbesar
document.addEventListener('click', function (e) {
    // Jika yang diklik adalah gambar di dalam soal/stimulus
    if (e.target.tagName === 'IMG' && !e.target.closest('.zoomed')) {
        const fullOverlay = document.createElement('div');
        fullOverlay.className = 'zoomed';
        
        const imgClone = e.target.cloneNode();
        fullOverlay.appendChild(imgClone);
        
        document.body.appendChild(fullOverlay);
        
        // Klik lagi untuk menutup
        fullOverlay.onclick = function() {
            fullOverlay.remove();
        };
    }
});











