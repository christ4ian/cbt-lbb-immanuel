/* ==========================================================================
   CBT BACKEND V7.5 - THE ULTIMATE TELEGRAM HUB
   - Action 1: submit_score (Ujian Selesai)
   - Action 2: register (Pendaftaran Siswa Baru)
   - Feature: Semuanya dikirim menggunakan Telegram Album (Media Group)
   ========================================================================== */

const TELEGRAM_TOKEN = "8236118560:AAHXzZ7hNcOZoLT9Dl2q_CqkIq6AlS96OnA";
const CHAT_IDS = ["6772560351", "149060929"]; 
const GEMINI_API_KEY = "AIzaSyC-OmFSlawBuoa6K4v03xa5F3Ku8EseybU";

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // Tunggu maksimal 30 detik jika ada antrian eksekusi
  } catch (err) {
    return responseJSON({ status: "error", message: "Sistem sedang sibuk memproses pendaftar lain secara bersamaan. Mohon tunggu 1 menit lalu coba lagi." });
  }

  try {
    var params = JSON.parse(e.postData.contents);
    var action = params.action; 

    // ==============================================================
    // ACTION 1: PENDAFTARAN SISWA BARU
    // ==============================================================
    if (action === "register") {
      var userData = params.userData || {};
      var paketId = params.paketId || "-";
      var jalur = params.jalur || "-";
      var files = params.files || [];

      var aiValid = true;
      var aiPesan = "Lolos otomatis (Tidak diuji AI)";
      var aiTerdeteksi = "-";

      // Jika Jalur Gratis, Uji dengan Gemini AI
      if (jalur === "gratis" && files.length > 0) {
        try {
          var imageParts = [];
          for (var idx = 0; idx < files.length; idx++) {
            if (files[idx].base64) {
              imageParts.push({
                "inlineData": {
                  "mimeType": files[idx].mimeType || "image/jpeg",
                  "data": files[idx].base64
                }
              });
            }
          }
          
          var promptText = "TUGAS: Analisis kumpulan gambar terlampir untuk pendaftaran gratis.\n" +
                           "Pendaftar WAJIB mengunggah 3 bukti berikut:\n" +
                           "1. Bukti WA (tangkapan layar membagikan poster LBB Immanuel ke WA).\n" +
                           "2. Bukti Komen IG (tangkapan layar komentar di Instagram yang berisi tag teman. Terima APA SAJA asalkan ada kumpulan tag di komentar, anggap itu milik pendaftar).\n" +
                           "3. Bukti Follow IG (tangkapan layar profil Instagram yang ADA tulisan 'lbbimmanuel').\n\n" +
                           "ATURAN MUTLAK:\n" +
                           "1. JANGAN MENGANALISIS SIAPA YANG BERKOMENTAR. Cukup pastikan ada foto komentar yg berisi tag.\n" +
                           "2. Jika gambar profil IG TIDAK ADA tulisan 'lbbimmanuel', tolak.\n" +
                           "3. Jika gambar WA TIDAK MENAMPILKAN poster LBB Immanuel, tolak.\n" +
                           "4. Jika SATU SAJA dari ketiga syarat di atas TIDAK ADA, Anda WAJIB MENOLAKNYA (valid: false).\n" +
                           "5. JANGAN BERPIKIR PANJANG. Langsung berikan JSON.\n\n" +
                           "Keluarkan HANYA JSON berformat persis seperti ini:\n" +
                           "{\"valid\": true, \"pesan\": \"Lolos verifikasi. Ketiga bukti valid.\", \"terdeteksi\": \"WA, Komen, Profil/Follow IG\"}\n" +
                           "atau jika ditolak:\n" +
                           "{\"valid\": false, \"pesan\": \"Ditolak. (Sebutkan alasan singkat, misal: Profil IG bukan LBB Immanuel / Tidak ada poster)\", \"terdeteksi\": \"(Sebutkan apa saja yg Anda lihat)\"}";

          var requestBody = {
            "contents": [{
              "parts": [
                { "text": promptText }
              ].concat(imageParts)
            }],
            "generationConfig": {
              "temperature": 0.0,
              "topK": 1,
              "topP": 0.1,
              "maxOutputTokens": 100
            }
          };

          var geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + GEMINI_API_KEY;
          var geminiOptions = {
            "method": "post",
            "contentType": "application/json",
            "payload": JSON.stringify(requestBody),
            "muteHttpExceptions": true
          };
          
          var geminiResponse = UrlFetchApp.fetch(geminiUrl, geminiOptions);
          var geminiData = JSON.parse(geminiResponse.getContentText());
          
          if (geminiResponse.getResponseCode() === 200 && geminiData.candidates && geminiData.candidates.length > 0) {
            var aiText = geminiData.candidates[0].content.parts[0].text;
            var match = aiText.match(/\{[\s\S]*\}/);
            if (match) {
              try {
                var resJSON = JSON.parse(match[0]);
                aiValid = resJSON.valid;
                aiPesan = resJSON.pesan;
                aiTerdeteksi = resJSON.terdeteksi || "Tidak diketahui";
              } catch (parseError) {
                // Fallback jika AI menghilangkan koma (error JSON.parse)
                var text = match[0];
                var validMatch = text.match(/"valid"\s*:\s*(true|false)/i);
                var pesanMatch = text.match(/"pesan"\s*:\s*"([^"]+)"/i);
                var terdeteksiMatch = text.match(/"terdeteksi"\s*:\s*"([^"]+)"/i);
                
                if (validMatch && pesanMatch) {
                   aiValid = validMatch[1].toLowerCase() === "true";
                   aiPesan = pesanMatch[1];
                   aiTerdeteksi = terdeteksiMatch ? terdeteksiMatch[1] : "Tidak diketahui";
                } else {
                   aiValid = false;
                   aiPesan = "Format teks AI tidak bisa dibaca sama sekali.";
                   aiTerdeteksi = "Murni Teks Tidak Beraturan";
                }
              }
            } else {
              aiValid = false;
              aiPesan = "Gagal mendeteksi format JSON. Balasan asli AI: " + aiText;
              aiTerdeteksi = "Format Error";
            }
          } else {
             aiValid = false;
             aiPesan = "Gagal terhubung ke layanan AI Verifikasi. " + (geminiData.error ? geminiData.error.message : "");
             aiTerdeteksi = "API Error";
          }
        } catch (aiError) {
          aiValid = false;
          aiPesan = "Terjadi kesalahan internal pada sistem AI: " + aiError.toString();
          aiTerdeteksi = "Internal Error";
        }
      }

      var pesanDaftar = "📝 <b>PENDAFTARAN SISWA BARU</b>\n\n" +
                        "👤 <b>NAMA:</b> " + (userData.nama || "-") + "\n" +
                        "🏫 <b>SEKOLAH:</b> " + (userData.sekolah || "-") + "\n" +
                        "🎓 <b>KELAS:</b> " + (userData.kelas || "-") + "\n" +
                        "✉️ <b>EMAIL:</b> " + (userData.email || "-") + "\n" +
                        "📱 <b>TELP:</b> " + (userData.telp || "-") + "\n" +
                        "📦 <b>PAKET:</b> " + paketId + "\n" +
                        "💳 <b>JALUR:</b> " + jalur.toUpperCase() + "\n\n" +
                        "🤖 <b>HASIL AI:</b> " + (jalur === "gratis" ? (aiValid ? "✅ LOLOS" : "❌ DITOLAK") : "N/A (Berbayar)") + "\n" +
                        "🔍 <b>TERDETEKSI:</b> " + (jalur === "gratis" ? aiTerdeteksi : "-") + "\n" +
                        "💬 <b>CATATAN AI:</b> " + (jalur === "gratis" ? aiPesan : "Melewati pengecekan AI");

      var photoBlobs = [];
      var safeName = String(userData.nama || "Siswa").replace(/[^a-zA-Z0-9 ]/g, "");

      // Convert Base64 (Bukti Transfer/Syarat) ke Blobs
      for (var i = 0; i < files.length; i++) {
        if (files[i].base64) {
          var blob = Utilities.newBlob(Utilities.base64Decode(files[i].base64), files[i].mimeType || "image/jpeg", safeName + "_Bukti_" + (i+1) + ".jpg");
          photoBlobs.push(blob);
        }
      }

      // Kirim ke Telegram Admin (Album jika lebih dari 1 foto)
      CHAT_IDS.forEach(function(chatId) {
        if (!chatId) return;

        if (photoBlobs.length > 1) {
          var mediaGroup = [];
          var payload = { "chat_id": chatId };

          for (var j = 0; j < photoBlobs.length; j++) {
            var fileKey = "photo" + j;
            mediaGroup.push({
              "type": "photo",
              "media": "attach://" + fileKey,
              "caption": (j === 0) ? pesanDaftar : "", 
              "parse_mode": "HTML"
            });
            payload[fileKey] = photoBlobs[j];
          }
          payload["media"] = JSON.stringify(mediaGroup);

          UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMediaGroup", {
            "method": "post", "payload": payload, "muteHttpExceptions": true
          });

        } else if (photoBlobs.length === 1) {
          UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendPhoto", {
            "method": "post", 
            "payload": { "chat_id": chatId, "photo": photoBlobs[0], "caption": pesanDaftar, "parse_mode": "HTML" },
            "muteHttpExceptions": true
          });
        } else {
          UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage", {
            "method": "post", "contentType": "application/json",
            "payload": JSON.stringify({ "chat_id": chatId, "text": pesanDaftar, "parse_mode": "HTML" }),
            "muteHttpExceptions": true
          });
        }
      });

      // ==============================================================
      // KIRIM NOTIFIKASI WHATSAPP KE SISWA VIA FONNTE
      // ==============================================================
      var fonnteToken = "iMv7gG9spcunYn1WwABV";
      var waTarget = userData.telp || "";
      var linkWA = params.linkWA || "-";
      
      if (waTarget) {
        var pesanWA = "Halo *" + (userData.nama || "Siswa") + "* 👋\n\n" +
                      "Terima kasih telah mendaftar. Berikut adalah rincian data pendaftaran kamu:\n\n" +
                      "👤 *Nama:* " + (userData.nama || "-") + "\n" +
                      "✉️ *Email:* " + (userData.email || "-") + "\n" +
                      "🏫 *Asal Sekolah:* " + (userData.sekolah || "-") + "\n" +
                      "🏙️ *Asal Kota:* " + (userData.kota || "-") + "\n" +
                      "📦 *Paket:* " + paketId + "\n" +
                      "💳 *Jalur:* " + jalur.toUpperCase() + "\n\n";

        if (jalur === "gratis") {
           pesanWA += "Status Verifikasi: *" + (aiValid ? "✅ LOLOS" : "❌ DITOLAK") + "*\n";
           if (!aiValid) {
             pesanWA += "Catatan: " + aiPesan + "\n\nSilakan daftar ulang dan perbaiki persyaratan pendaftaran kamu ya.";
           } else {
             pesanWA += "Selamat! Akun kamu sudah diverifikasi dan siap digunakan.\n\n" +
                        "🔗 *Grup WhatsApp Pendaftaran:* " + linkWA + "\n" +
                        "🌐 *Link CBT:* cbt.lbbimmanuel.com";
           }
        } else {
           pesanWA += "Silakan masuk ke Grup WhatsApp untuk info pembayaran dan instruksi ujian selanjutnya.\n\n" +
                      "🔗 *Grup WhatsApp Pendaftaran:* " + linkWA + "\n" +
                      "🌐 *Link CBT:* cbt.lbbimmanuel.com";
        }

        var fonntePayload = {
          "target": waTarget,
          "message": pesanWA,
          "countryCode": "62"
        };

        var fonnteOptions = {
          "method": "post",
          "payload": fonntePayload,
          "headers": {
            "Authorization": fonnteToken
          },
          "muteHttpExceptions": true
        };

        try {
          UrlFetchApp.fetch("https://api.fonnte.com/send", fonnteOptions);
        } catch (fonnteErr) {
          // Abaikan
        }
      }

      // Menentukan balasan ke Frontend
      if (jalur === "gratis" && !aiValid) {
        // Gagal, berikan respon error agar tidak lanjut simpan ke Firebase
        return responseJSON({ status: "error", message: aiPesan, terdeteksi: aiTerdeteksi });
      }

      return responseJSON({ status: "success", message: "Pendaftaran terkirim ke Telegram dan WhatsApp!" });
    }

    // ==============================================================
    // ACTION: EVALUASI ISIAN SINGKAT DENGAN AI
    // ==============================================================
    else if (action === "evaluasi_isian") {
      var answers = params.answers || []; 
      
      var promptText = "TUGAS: Evaluasi daftar jawaban siswa terhadap kunci jawaban berikut.\n" +
                       "Tentukan apakah jawaban siswa secara logis BENAR dan memiliki makna yang SAMA dengan kunci jawaban.\n" +
                       "Berikan toleransi untuk hal berikut:\n" +
                       "- Singkatan atau kepanjangan (contoh: 'DKI Jakarta' sama dengan 'Jakarta', atau 'UUD' sama dengan 'Undang-Undang Dasar').\n" +
                       "- Typo wajar atau kesalahan ejaan minor yang tidak mengubah arti.\n" +
                       "- Penggunaan sinonim yang tepat (termasuk istilah ilmiah/biologi/medis, contoh: 'bikuspid' sama dengan 'bikuspidalis').\n" +
                       "Kunci jawaban dapat berisi beberapa alternatif dipisah dengan '|'.\n\n" +
                       "DATA JAWABAN:\n" + JSON.stringify(answers) + "\n\n" +
                       "ATURAN MUTLAK:\n" +
                       "1. Jawab HANYA menggunakan format JSON Array of boolean persis seperti urutan jawaban yang diberikan. Contoh: [true, false, true]\n" +
                       "2. True jika benar secara logis/makna, False jika salah/makna berbeda.\n" +
                       "3. DILARANG menambahkan teks Markdown atau penjelasan apapun. JAWAB HANYA DENGAN ARRAY JSON VALID.";

      var requestBody = {
        "contents": [{ "parts": [{ "text": promptText }] }],
        "generationConfig": {
          "temperature": 0.1,
          "topK": 1,
          "topP": 0.1,
          "maxOutputTokens": 1000
        }
      };

      var geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=" + GEMINI_API_KEY;
      var geminiOptions = {
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(requestBody),
        "muteHttpExceptions": true
      };
      
      try {
        var geminiResponse = UrlFetchApp.fetch(geminiUrl, geminiOptions);
        var geminiData = JSON.parse(geminiResponse.getContentText());
        
        if (geminiResponse.getResponseCode() === 200 && geminiData.candidates && geminiData.candidates.length > 0) {
          var rawText = geminiData.candidates[0].content.parts[0].text;
          
          // Hapus tag <think>...</think> jika model memberikan thinking process
          var cleanText = rawText.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
          // Hapus blok markdown ```json ... ```
          cleanText = cleanText.replace(/```json/gi, '').replace(/```/gi, '').trim();
          
          var match = cleanText.match(/\[[\s\S]*\]/);
          if (match) {
            try {
              var results = JSON.parse(match[0]);
              return responseJSON({ status: "success", data: results });
            } catch(e) {
              return responseJSON({ status: "error", message: "Gagal mem-parsing hasil AI (JSON tidak valid): " + match[0] });
            }
          } else {
            // Fallback for truncated array
            if (cleanText.startsWith("[") && !cleanText.endsWith("]")) {
              try {
                var results = JSON.parse(cleanText + "]");
                return responseJSON({ status: "success", data: results });
              } catch(e) {}
            }
            return responseJSON({ status: "error", message: "Gagal menemukan format array pada AI: " + rawText });
          }
        } else {
           return responseJSON({ status: "error", message: "Error API Gemini: " + (geminiData.error ? geminiData.error.message : "") });
        }
      } catch (e) {
        return responseJSON({ status: "error", message: e.toString() });
      }
    }

    // ==============================================================
    // ACTION 2: SUBMIT SCORE (UJIAN SELESAI)
    // ==============================================================
    else if (action === "submit_score") {
      var namaSiswa = params.namaSiswa || "Anonim";
      var paketId = params.paketId || "Umum";
      var skor = params.skor || 0;
      var durasi = params.durasi || "-";
      var jumlahPelanggaran = params.pelanggaran || 0; 
      var statusPelanggaran = jumlahPelanggaran > 0 ? "⚠️ TERDETEKSI (" + jumlahPelanggaran + "x pindah tab)" : "✅ AMAN (Tidak ada pelanggaran)";
      var fotoIntel = params.fotoIntel || {}; 

      var pesanSelesai = "🏁 <b>LAPORAN UJIAN SELESAI</b>\n\n" +
                         "👤 <b>NAMA:</b> " + namaSiswa + "\n" +
                         "📝 <b>PAKET:</b> " + paketId + "\n" +
                         "🎯 <b>NILAI:</b> " + skor + "\n" +
                         "⏱️ <b>DURASI:</b> " + durasi + "\n" +
                         "🕵️♂️ <b>STATUS ANTI-CHEAT:</b> " + statusPelanggaran;

      var photoBlobsScore = []; 
      var types = ['start', 'mid', 'end'];
      var safeNameScore = String(namaSiswa).replace(/[^a-zA-Z0-9 ]/g, ""); 
      
      // Convert Base64 Kamera ke Blobs
      for (var k = 0; k < types.length; k++) {
        var type = types[k];
        if (fotoIntel[type]) {
          var base64Data = fotoIntel[type].split(",")[1];
          if (base64Data) {
              var blob = Utilities.newBlob(Utilities.base64Decode(base64Data), "image/jpeg", safeNameScore + "_" + type.toUpperCase() + ".jpg");
              photoBlobsScore.push(blob);
          }
        }
      }

      // Kirim ke Telegram
      CHAT_IDS.forEach(function(chatId) {
        if (!chatId) return;

        if (photoBlobsScore.length > 1) {
          var mediaGroup = [];
          var payload = { "chat_id": chatId };

          for (var i = 0; i < photoBlobsScore.length; i++) {
            var fileKey = "photo" + i;
            mediaGroup.push({
              "type": "photo",
              "media": "attach://" + fileKey,
              "caption": (i === 0) ? pesanSelesai : "", 
              "parse_mode": "HTML"
            });
            payload[fileKey] = photoBlobsScore[i];
          }
          payload["media"] = JSON.stringify(mediaGroup);

          UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMediaGroup", {
            "method": "post", "payload": payload, "muteHttpExceptions": true
          });

        } else if (photoBlobsScore.length === 1) {
          UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendPhoto", {
            "method": "post", 
            "payload": { "chat_id": chatId, "photo": photoBlobsScore[0], "caption": pesanSelesai, "parse_mode": "HTML" },
            "muteHttpExceptions": true
          });

        } else {
          UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage", {
            "method": "post", "contentType": "application/json",
            "payload": JSON.stringify({ "chat_id": chatId, "text": pesanSelesai, "parse_mode": "HTML" }),
            "muteHttpExceptions": true
          });
        }
      });
      
      return responseJSON({ status: "success", message: "Laporan skor terkirim sebagai album!" });
    }
    
    return responseJSON({ status: "error", message: "Action tidak dikenali." });
  } catch (e) { 
    return responseJSON({ status: "error", message: e.toString() }); 
  } finally {
    lock.releaseLock();
  }
}

function responseJSON(data) { 
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON); 
}