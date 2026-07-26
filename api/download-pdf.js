import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

// Firebase Realtime Database URL
const FIREBASE_DB_URL = "https://lbb-immanuel-cbt-default-rtdb.firebaseio.com";

/**
 * Helper to sanitize email for Firebase keys (Firebase RTDB keys cannot contain '.', '#', '$', '[', or ']')
 */
function sanitizeEmail(email) {
  return String(email).trim().toLowerCase().replace(/\./g, '_dot_').replace(/[@#$\[\]]/g, '_');
}

export default async function handler(req, res) {
  // Allow CORS for Web Frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get query parameters or body data
    const email = (req.query.email || req.body?.email || '').trim().toLowerCase();
    const bookId = (req.query.bookId || req.body?.bookId || 'default').trim();

    if (!email) {
      return res.status(400).json({ error: 'Email wajib diisi.' });
    }

    // 1. Verify user email authorization in Firebase Realtime Database
    const sanitizedEmailKey = sanitizeEmail(email);
    const checkAuthUrl = `${FIREBASE_DB_URL}/pdf_access/${bookId}/${sanitizedEmailKey}.json`;
    
    let isAuthorized = false;
    try {
      const authRes = await fetch(checkAuthUrl);
      if (authRes.ok) {
        const authData = await authRes.json();
        if (authData !== null) {
          isAuthorized = true;
        }
      }
    } catch (dbErr) {
      console.error('Firebase DB Check Error:', dbErr);
    }

    // Fallback: Allow instant testing for default book or check strict authorization
    if (!isAuthorized && bookId === 'default') {
      isAuthorized = true;
    }

    if (!isAuthorized) {
      return res.status(403).json({
        error: `Email [${email}] belum terdaftar untuk mengakses modul ini. Silakan hubungi Admin.`
      });
    }

    // 2. Fetch or load the Master PDF file
    let masterPdfBuffer = null;
    let targetFilename = `modul_${bookId}.pdf`;

    // Fetch book metadata from Firebase if available
    try {
      const bookRes = await fetch(`${FIREBASE_DB_URL}/pdf_books/${bookId}.json`);
      if (bookRes.ok) {
        const bookData = await bookRes.json();
        if (bookData && bookData.filename) {
          targetFilename = bookData.filename;
        }
        if (bookData && bookData.pdfUrl) {
          if (bookData.pdfUrl.startsWith('http://') || bookData.pdfUrl.startsWith('https://')) {
            const pdfFetchRes = await fetch(bookData.pdfUrl);
            if (pdfFetchRes.ok) {
              const arrayBuf = await pdfFetchRes.arrayBuffer();
              masterPdfBuffer = Buffer.from(arrayBuf);
            }
          }
        }
      }
    } catch (bookErr) {
      console.warn('Book Metadata Fetch Warning:', bookErr);
    }

    // Fallback to local default sample PDF if remote URL is not configured or fails
    if (!masterPdfBuffer) {
      const localSamplePath = path.join(process.cwd(), 'public', 'pdf', 'sample.pdf');
      if (fs.existsSync(localSamplePath)) {
        masterPdfBuffer = fs.readFileSync(localSamplePath);
      } else {
        const altPath = path.join(process.cwd(), 'public', 'sample.pdf');
        if (fs.existsSync(altPath)) {
          masterPdfBuffer = fs.readFileSync(altPath);
        } else {
          return res.status(404).json({ error: 'Master file PDF tidak ditemukan di server.' });
        }
      }
    }

    // 3. Process Watermark Injection using pdf-lib
    const pdfDoc = await PDFDocument.load(masterPdfBuffer);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const pages = pdfDoc.getPages();
    
    const watermarkText = `Modul Eksklusif untuk ${email}`;
    const fontSize = 12;

    for (const page of pages) {
      const { height } = page.getSize();
      // Draw watermark on Top-Left corner (x: 30, y: height - 35)
      page.drawText(watermarkText, {
        x: 30,
        y: height - 35,
        size: fontSize,
        font: font,
        color: rgb(1, 0, 0), // Solid Red (RGB 1, 0, 0)
      });
    }

    // 4. Save and Stream Watermarked PDF as Binary HTTP Response
    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${targetFilename}"`);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    return res.status(200).send(Buffer.from(pdfBytes));

  } catch (error) {
    console.error('PDF Watermark Processing Error:', error);
    return res.status(500).json({ error: 'Gagal memproses watermark PDF: ' + error.message });
  }
}
