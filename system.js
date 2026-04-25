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

    // Config
    deadline: 0,

    // --- PENYIMPANAN FOTO INTEL ---
    capturedImages: { start: null, mid: null, end: null },

    captureSnapshot: function(momentType) {
        if (this.capturedImages[momentType]) return; 
        if (this.userData && this.userData.isAdmin) return;

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
    init: function() {
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
        const email = document.getElementById('input-email').value.trim().toLowerCase();

        if(idx === "") return Swal.fire('Error', 'Pilih paket soal!', 'error');
        if(!email || !email.includes('@')) return Swal.fire('Error', 'Masukkan email valid!', 'error');

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

        if(!navigator.onLine) return Swal.fire('Offline', 'Wajib online untuk login.', 'error');
        this.currentPaket = PAKET_SOAL[idx];
        Swal.fire({ title: 'Verifikasi...', didOpen: () => Swal.showLoading() });

        db.ref('pendaftaran').orderByChild('email').equalTo(email).once('value').then(snap => {
            if (snap.exists()) {
                let studentData = null;
                let studentKey = null;
                
                snap.forEach(child => {
                    let data = child.val();
                    if(data.id_paket === this.currentPaket.id) {
                        studentData = data;
                        studentKey = child.key;
                    }
                });

                if (studentData) {
                    const safeEmail = email.replace(/\./g, '_');
                    const tempSessionId = this.currentPaket.id + "_" + safeEmail;

                    db.ref('sessions/' + tempSessionId).once('value').then(sesSnap => {
                        let sessionData = sesSnap.val();
                        
                        if (sessionData && sessionData.status === 'finished') {
                            Swal.close();
                            this.userData = { nama: studentData.nama_siswa, email: email, role: studentData.role };
                            this.sessionId = tempSessionId;
                            
                            let durasiStr = sessionData.durasi_teks || "-";
                            if(durasiStr === "-" && sessionData.startTime && sessionData.finishTime) {
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
                                    </div>
                                `,
                                icon: 'success', confirmButtonText: 'Mengerti', confirmButtonColor: '#007bff'
                            });
                            return;
                        }

                        if (waktuTutup && now > waktuTutup) {
                            Swal.fire({
                                title: 'Akses Ditutup',
                                html: `
                                    <div style="margin-top: 10px;">
                                        <p style="color: #666;">Mohon maaf, batas waktu akses/login untuk paket soal ini telah berakhir pada:</p>
                                        <p style="font-weight: bold; color: #dc3545; font-size: 1.1rem; margin-top: 10px;">
                                            ${waktuTutup.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })} WIB
                                        </p>
                                    </div>
                                `,
                                icon: 'error', confirmButtonText: 'Tutup', confirmButtonColor: '#dc3545'
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
                                    role: studentData.role || 'Default'
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
        }).catch(err => {
            console.error(err);
            Swal.fire('Error', 'Gagal koneksi ke server database.', 'error');
        });
    },

    syncWithCloud: function(isResume) {
        db.ref('sessions/' + this.sessionId).once('value').then((snapshot) => {
            const data = snapshot.val();
            Swal.close();

            if (data) {
                if (data.status === 'finished') {
                    localStorage.removeItem('cbt_active_session');
                    this.userData = data.userData || this.userData; 
                    
                    let durasiStr = data.durasi_teks || "-";
                    if(durasiStr === "-" && data.startTime && data.finishTime) {
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
                if(isResume) { localStorage.removeItem('cbt_active_session'); location.reload(); return; }
                this.gotoConfirmPage();
            }
        });
    },

    gotoConfirmPage: function() {
        document.getElementById('info-mapel').innerText = this.currentPaket.mapel;
        document.getElementById('info-waktu').innerText = this.currentPaket.waktu + " Menit";
        document.getElementById('info-jml-soal').innerText = this.currentPaket.soal.length + " Butir";
        
        const petunjukList = document.getElementById('info-petunjuk-list');
        if(petunjukList) {
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
        
        if(inpNama) inpNama.value = this.userData.nama;
        if(inpKelas) inpKelas.value = this.userData.kelas;
        if(inpSekolah) inpSekolah.value = this.userData.sekolah;
        this.startSecurityProctor();
        this.switchView('view-data');
    },

    startUjian: function() {
        if (this.userData && this.userData.isAdmin) {
            const dummyData = { startTime: Date.now(), answers: {}, ragu: {}, status: 'ongoing' };
            this.restoreSession(dummyData); 
            return; 
        }
        
        if(!navigator.onLine) return Swal.fire('Offline', 'Koneksi internet diperlukan.', 'warning');
        Swal.fire({ title: 'Memulai Ujian...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        const currentTime = Date.now();
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

    restoreSession: function(data) {
        localStorage.setItem('cbt_active_session', JSON.stringify({
            sessionId: this.sessionId, paketId: this.currentPaket.id, 
            userData: this.userData, sheetRowIndex: this.sheetRowIndex
        }));

        // MUAT CACHE FOTO KALAU HABIS REFRESH
        const savedImages = localStorage.getItem('cbt_images_' + this.sessionId);
        if (savedImages) {
            try { this.capturedImages = JSON.parse(savedImages); } catch(e) {}
        } else {
            this.capturedImages = { start: null, mid: null, end: null };
        }

        this.answers = data.answers || {};
        this.ragu = data.ragu || {};
        
        const durasiMenit = this.userData.isAdmin ? 999 : this.currentPaket.waktu; 
        this.deadline = data.startTime + (durasiMenit * 60 * 1000);

        if (Date.now() >= this.deadline && !this.userData.isAdmin) {
            return this.submitData(true);
        }

        if(document.getElementById('disp-nama')) document.getElementById('disp-nama').innerText = this.userData.nama;
        if(document.getElementById('disp-mapel')) document.getElementById('disp-mapel').innerText = this.currentPaket.mapel;
        
        this.renderSoal(0);
        this.updateGrid(); 
        this.startTimer(); 
        this.monitorSingleDevice(); 
        this.setFont(2);
        this.startSecurityProctor();
        
        this.switchView('view-ujian');
    },

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
                    title: 'Logout Otomatis', text: 'Akun login di perangkat lain.', 
                    icon: 'error', allowOutsideClick: false, confirmButtonText: 'Keluar' 
                }).then(() => location.reload());
            }
        });
    },

    renderSoal: function(index) {
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
                    if (MathJax.typesetPromise) MathJax.typesetPromise([pStim]).catch(err => console.error(err));
                    else if (MathJax.Hub && MathJax.Hub.Queue) MathJax.Hub.Queue(["Typeset", MathJax.Hub, pStim]);
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
            html += `</tbody></table>`;
        }

        pSoal.innerHTML = html;
        
        if (window.MathJax) {
            if (MathJax.typesetPromise) MathJax.typesetPromise([pSoal]).catch(err => console.error(err));
            else if (MathJax.Hub && MathJax.Hub.Queue) MathJax.Hub.Queue(["Typeset", MathJax.Hub, pSoal]);
        }

        document.getElementById('check-ragu').checked = this.ragu[index] || false;
        this.updateGrid();
        this.updateNavButtons(index);
    },

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
            }).catch(err => console.error(err));
        }
    },

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

        if(btnPrevDesk) btnPrevDesk.disabled = isFirst;
        if(btnPrevMob) btnPrevMob.disabled = isFirst;

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

    startTimer: function() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        const timerDisplay = document.getElementById('time-val');
        
        this.timerInterval = setInterval(() => {
            if (!timerDisplay) return; 

            const sekarang = Date.now();
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

    confirmSubmit: function() {
        this.captureSnapshot('end');
        Swal.fire({ title: 'Konfirmasi', text: "Yakin ingin mengakhiri ujian?", icon: 'question', showCancelButton: true, confirmButtonColor: '#28a745', confirmButtonText: 'Ya, Kumpulkan'
        }).then((res) => { if (res.isConfirmed) this.submitData(false); });
    },

    calculateResult: function() {
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
            }

            if (status === "BENAR") {
                benarCount++;
                if (isSistemPoin) totalPoinDiperoleh += poinMaksSoalIni;
            }
            detail.push(status);
        });

        let skorAkhir = 0;
        if (isSistemPoin) {
            let pembagi = this.currentPaket.base_poin || totalPoinMaksimal;
            skorAkhir = (totalPoinDiperoleh / pembagi) * 100;
        } else {
            skorAkhir = (benarCount / totalSoal) * 100;
        }
        
        return { skor: skorAkhir.toFixed(2), detail: detail };
    },

    submitData: function(force) {
        this.captureSnapshot('end'); 
        this.stopSecurityProctor();
        
        Swal.fire({ title: 'Memproses Nilai...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        const result = this.calculateResult();

        let teksDurasi = "Tidak diketahui";
        if (this.currentPaket && this.deadline) {
            const sisaDetik = Math.floor((this.deadline - Date.now()) / 1000);
            const totalWaktuDetik = this.userData.isAdmin ? 999 * 60 : this.currentPaket.waktu * 60;
            let durasiDetik = totalWaktuDetik - sisaDetik;
            if (durasiDetik < 0) durasiDetik = totalWaktuDetik; 
            const menit = Math.floor(durasiDetik / 60);
            const detik = durasiDetik % 60;
            teksDurasi = `${menit} Menit ${detik} Detik`;
        }

        // --- BYPASS ADMIN LOGIC: Tidak nunggu Firebase agar tidak stuck! ---
        if(this.userData && this.userData.isAdmin) {
            localStorage.removeItem('cbt_active_session');
            localStorage.removeItem('cbt_images_' + this.sessionId); // bersihkan cache foto
            Swal.close();
            this.tampilkanHalamanHasil(result.skor, teksDurasi, result.detail);
            Swal.fire({ title: 'Simulasi Selesai', text: 'Data admin tidak dikirim ke database. Menampilkan hasil...', icon: 'success', timer: 2500, showConfirmButton: false });
            return;
        }
        
        if(!navigator.onLine) return Swal.fire('Error', 'Tidak ada koneksi internet. Pastikan jaringan stabil.', 'error');

        db.ref('sessions/' + this.sessionId).update({
            status: 'finished',         
            skor_akhir: result.skor,    
            answers: this.answers,      
            finishTime: firebase.database.ServerValue.TIMESTAMP,
            durasi_teks: teksDurasi,
            detail: result.detail,
            cheat_count: cheatCount 
        }).then(() => {
            localStorage.removeItem('cbt_active_session');
            localStorage.removeItem('cbt_images_' + this.sessionId); // Hapus cache foto setelah beres kirim
            Swal.close();
            this.tampilkanHalamanHasil(result.skor, teksDurasi, result.detail);

            const statusUpload = document.getElementById('status-upload-intel');
            if(statusUpload) statusUpload.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="color: #f59e0b;"></i> Memverifikasi bukti keamanan proctoring...';

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
                if(res.status === 'success') {
                    db.ref('sessions/' + this.sessionId).update({ ss_url: "Tersimpan di Telegram" });
                    if(statusUpload) statusUpload.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Bukti keamanan berhasil diverifikasi dan diamankan oleh sistem.';
                } else {
                    console.error("Error dari GAS:", res.message);
                    if(statusUpload) statusUpload.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color: #ef4444;"></i> Server Error: ${res.message}`;
                }
            })
            .catch(err => {
                console.error("Fetch API error:", err);
                if(statusUpload) statusUpload.innerHTML = '<i class="fa-solid fa-wifi" style="color: #ef4444;"></i> Koneksi terputus saat memverifikasi bukti keamanan.';
            });

        }).catch(err => {
            console.error("Firebase Update Error:", err);
            Swal.fire('Error', 'Gagal menyimpan nilai ke database.', 'error');
        });
    },

    // =========================================
    // ROLE PRIVILEGE & LOGIKA DEADLINE HASIL
    // =========================================
    tampilkanHalamanHasil: async function(skor, teksDurasi, detailJawaban) {
        this.switchView('view-hasil'); 
        
        document.getElementById('hasil-nama').innerText = this.userData.nama || this.userData.nama_siswa || "Siswa";
        document.getElementById('hasil-durasi').innerText = teksDurasi;

        let statusBox = document.getElementById('status-upload-intel');
        if (!statusBox) {
            const containerSkor = document.getElementById('hasil-skor-wrapper');
            if (containerSkor) {
                statusBox = document.createElement('div');
                statusBox.id = 'status-upload-intel';
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
        
        try {
            let snap = await db.ref(`paket_ujian/${this.currentPaket.id}/roles/${roleSiswa}`).once('value');
            if(snap.exists()) priv = snap.val();
        } catch(e) { console.error("Gagal menarik Role Privilege", e); }

        // --- CEK DEADLINE UJIAN ---
        const now = Date.now();
        const strTutup = this.currentPaket.waktu_tutup ? this.currentPaket.waktu_tutup.replace(' ', 'T') : null;
        const waktuTutupMs = strTutup ? new Date(strTutup).getTime() : 0;
        const isWaktuTutupLewat = (waktuTutupMs === 0 || now >= waktuTutupMs);

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

        if (isWaktuTutupLewat || this.userData.isAdmin) { // Admin bebas buka
            // WAKTU UJIAN SUDAH DITUTUP
            if (priv.lihat_kunci || this.userData.isAdmin) {
                areaRincian.style.display = 'block';
                areaRincian.innerHTML = `<button class="btn-login" style="background:#2563eb; color:white; width:100%; border:none; padding:14px; border-radius:8px; font-weight:bold; cursor:pointer; box-shadow: 0 4px 6px rgba(37,99,235,0.2);" onclick="app.bukaPopUpAnalisis()"> <i class="fa-solid fa-table-list"></i> Lihat Analisis Benar/Salah </button>`;
                this.dataAnalisisDetail = detailJawaban;
            }

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

            if(boxNotif) {
                boxNotif.className = 'alert-info success';
                boxNotif.style.background = '#dcfce7'; boxNotif.style.color = '#166534'; boxNotif.style.borderColor = '#bbf7d0';
                boxNotif.innerHTML = '<i class="fa-solid fa-circle-check"></i> <strong>Sesi Ujian Selesai:</strong><br>Sistem menerapkan kebijakan hak akses (Role) Anda untuk melihat hasil dan pembahasan.';
            }

        } else {
            // WAKTU UJIAN BELUM DITUTUP (HANYA MENUNGGU)
            if (priv.akses_pembahasan && btnBahas) {
                btnBahas.style.display = 'block';
                btnBahas.disabled = true;
                btnBahas.style.background = '#94a3b8';
                btnBahas.innerHTML = '<i class="fa-solid fa-clock"></i> Pembahasan Terbuka Setelah Ujian Ditutup';
            }

            if(boxNotif) {
                boxNotif.className = 'alert-info';
                boxNotif.style.background = '#fff3cd'; boxNotif.style.color = '#856404'; boxNotif.style.borderColor = '#ffeeba';
                boxNotif.innerHTML = '<i class="fa-solid fa-clock"></i> <strong>Menunggu Waktu Ujian Ditutup:</strong><br>Analisis jawaban dan akses pembahasan (jika Role mengizinkan) baru dapat dilihat setelah batas waktu ujian berakhir. Silakan login kembali nanti.';
            }
        }

        // LOGIKA PERINGKAT (TETAP)
        if (!this.userData.isAdmin) {
            try {
                const snap = await db.ref('sessions').orderByChild('paketId').equalTo(this.currentPaket.id).once('value');
                let allSessions = [];
                if(snap.exists()) {
                    snap.forEach(child => {
                        let d = child.val();
                        if(d.status === 'finished') {
                            let dMs = (d.finishTime && d.startTime) ? (d.finishTime - d.startTime) : 99999999;
                            allSessions.push({ skor: parseFloat(d.skor_akhir || 0), durasi: dMs, id: child.key });
                        }
                    });
                }
                allSessions.sort((a,b) => {
                    if(b.skor !== a.skor) return b.skor - a.skor;
                    return a.durasi - b.durasi;
                });
                let myRank = allSessions.findIndex(x => x.id === this.sessionId) + 1;
                document.getElementById('hasil-rank').innerText = myRank ? `#${myRank} dari ${allSessions.length}` : '-';
            } catch(e) {
                console.error("Gagal hitung rank", e);
                document.getElementById('hasil-rank').innerText = "-";
            }
        } else {
            document.getElementById('hasil-rank').innerText = "SIMULASI ADMIN";
        }
    },

    // POP-UP TABEL ANALISIS TANPA KUNCI JAWABAN
    bukaPopUpAnalisis: function() {
        if(!this.dataAnalisisDetail) return;
        
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
                    if(lines.length > 0) jwbStr = lines.join('<br>');
                }
            }

            let color = stat === 'BENAR' ? '#166534' : (stat === 'KOSONG' ? '#475569' : '#991b1b');
            let bg = stat === 'BENAR' ? '#dcfce7' : (stat === 'KOSONG' ? '#f1f5f9' : '#fee2e2');
            let bobotSoal = soal.poin || 1;
            
            tHTML += `<tr>
                <td style="padding: 12px 10px; border-bottom: 1px solid #e2e8f0; text-align:center; font-weight:bold;">${i+1}</td>
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

function toggleSidebar() {
    const sb = document.getElementById('sidebar-list');
    const ov = document.getElementById('overlay');
    if(sb && ov) {
        sb.classList.toggle('active');
        ov.classList.toggle('active');
    }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') { setTimeout(() => app.init(), 1); } 
else { document.addEventListener('DOMContentLoaded', () => app.init()); }

(function() {
    const Toast = Swal.mixin({
        toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, timerProgressBar: true,
        didOpen: (toast) => { toast.addEventListener('mouseenter', Swal.stopTimer); toast.addEventListener('mouseleave', Swal.resumeTimer); }
    });

    function handleConnectionChange() {
        if (!navigator.onLine) {
            Toast.fire({ icon: 'error', title: 'Koneksi Terputus!', text: 'Tenang, jawabanmu aman disimpan di HP ini.' });
        } else {
            Toast.fire({ icon: 'success', title: 'Koneksi Kembali!', text: 'Mencoba sinkronisasi data ke server...' });
            if(typeof app !== 'undefined' && app.saveRealtime) app.saveRealtime();
        }
    }

    window.addEventListener('offline', handleConnectionChange);
    window.addEventListener('online', handleConnectionChange);
    if (!navigator.onLine) handleConnectionChange();

    if (typeof app !== 'undefined') {
        const originalSave = app.saveRealtime; 
        const originalRestore = app.restoreSession; 

        app.saveRealtime = function() {
            originalSave.call(app); 
            if(app.sessionId) {
                const backupData = { answers: app.answers, ragu: app.ragu, timestamp: Date.now() };
                localStorage.setItem('CBT_BACKUP_' + app.sessionId, JSON.stringify(backupData));
            }
        };

        app.restoreSession = function(data) {
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
        fullOverlay.onclick = function() { fullOverlay.remove(); };
    }
});

// EVENT LISTENER ANTI-CHEAT TAB SWITCHING
document.addEventListener("visibilitychange", function() {
    const viewUjian = document.getElementById('view-ujian');
    const isLagiUjian = viewUjian && viewUjian.classList.contains('active-view');
    if (document.visibilityState === 'hidden' && isLagiUjian) {
        cheatCount++;
        Swal.fire({ title: 'Hayo Ketahuan! 👀', text: 'Kamu terdeteksi pindah tab atau keluar dari layar ujian. Jangan nyontek ya, kerjakan dengan jujur!', icon: 'warning', confirmButtonColor: '#d33', confirmButtonText: 'Iya, janji jujur 🙏' });
    }
});

// --- PERBAIKAN UI KAMERA: ANTI OFF-SCREEN & MINIMIZE BERSIH ---
app.startSecurityProctor = function() {
    if (document.getElementById('proctor-container')) return;
    Swal.fire({
        title: 'Verifikasi Pengawas 👁️',
        html: 'Ujian ini diawasi oleh <b>Sistem Kamera Keamanan</b>.<br><br>Mohon klik <b>"Allow" / "Izinkan"</b> pada notifikasi browser di atas layar untuk melanjutkan ke halaman identitas.',
        icon: 'info', confirmButtonText: 'Siap, Izinkan! 🚀', confirmButtonColor: '#007bff', allowOutsideClick: false
    }).then((res) => {
        if(res.isConfirmed) {
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
                
                div.checkBoundary = function() {
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
                document.getElementById('proctor-resize-btn').onclick = function() {
                    currentSizeLevel = (currentSizeLevel + 1) % 3;
                    const sizes = ['180px', '240px', '140px'];
                    div.style.width = sizes[currentSizeLevel];
                    setTimeout(div.checkBoundary, 350); 
                };
                
                // Logika minimize lebih bersih
                document.getElementById('proctor-min').onclick = function() { 
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
                    if(timerEl) timerEl.innerText = `${h}:${m}:${s}`;
                }, 1000);
            }).catch(err => {
                Swal.fire({ title: 'Akses Ditolak! ❌', html: `<div style="text-align:left; font-size: 14px;">Kamu <b>TIDAK BISA</b> mengikuti ujian tanpa menyalakan kamera & mikrofon pengawas.<br><br><b>Cara Memperbaiki:</b><br>1. Klik ikon <b>Gembok 🔒 / Kamera 📷</b> di bilah alamat browser.<br>2. Pilih <b>Site Settings (Setelan Situs)</b> atau <b>Permissions</b>.<br>3. Ubah Izin Kamera & Mikrofon menjadi <b>Allow (Izinkan)</b>.<br>4. Ulangi proses masuk ujian.</div>`, icon: 'error', confirmButtonText: 'Mengerti & Ulangi', confirmButtonColor: '#d33', allowOutsideClick: false }).then(() => { location.reload(); });
            });
        }
    });
};

app.stopSecurityProctor = function() {
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
        if(e.type === 'touchstart') { pos3 = e.touches[0].clientX; pos4 = e.touches[0].clientY; } 
        else { e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY; }
        document.onmouseup = closeDragElement; document.ontouchend = closeDragElement;
        document.addEventListener('touchmove', elementDrag, { passive: false });
        document.onmousemove = elementDrag; 
    }
    
    function elementDrag(e) {
        e = e || window.event;
        var clientX, clientY;
        if(e.type === 'touchmove') { 
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
