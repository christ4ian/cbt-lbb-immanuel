import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

// Firebase Realtime Database URL
const FIREBASE_DB_URL = "https://lbb-immanuel-cbt-default-rtdb.firebaseio.com";

/**
 * Helper to sanitize email for Firebase keys
 */
function sanitizeEmail(email) {
  return String(email).trim().toLowerCase().replace(/\./g, '_dot_').replace(/[@#$\[\]]/g, '_');
}

/**
 * Helper to find local PDF file across standard project asset locations
 */
function findLocalPdf(filenameOrPath) {
  const cleanName = path.basename(filenameOrPath);
  const possiblePaths = [
    filenameOrPath,
    path.join(process.cwd(), filenameOrPath),
    path.join(process.cwd(), 'public', 'pdf', cleanName),
    path.join(process.cwd(), 'public', cleanName),
    path.join(process.cwd(), cleanName)
  ];

  for (const p of possiblePaths) {
    if (p && typeof p === 'string' && fs.existsSync(p) && fs.statSync(p).isFile()) {
      return fs.readFileSync(p);
    }
  }
  return null;
}

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
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

    // Allow instant testing for default, main, or main_pembahasan if DB record not set yet
    if (!isAuthorized && (bookId === 'default' || bookId === 'main' || bookId === 'main_pembahasan')) {
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
    let pdfSourceUrl = null;

    // Fetch book metadata from Firebase if available
    try {
      const bookRes = await fetch(`${FIREBASE_DB_URL}/pdf_books/${bookId}.json`);
      if (bookRes.ok) {
        const bookData = await bookRes.json();
        if (bookData) {
          if (bookData.filename) targetFilename = bookData.filename;
          if (bookData.pdfUrl) pdfSourceUrl = bookData.pdfUrl;
        }
      }
    } catch (bookErr) {
      console.warn('Book Metadata Fetch Warning:', bookErr);
    }

    // Attempt loading from remote URL if specified
    if (pdfSourceUrl && (pdfSourceUrl.startsWith('http://') || pdfSourceUrl.startsWith('https://'))) {
      try {
        const pdfFetchRes = await fetch(pdfSourceUrl);
        if (pdfFetchRes.ok) {
          const arrayBuf = await pdfFetchRes.arrayBuffer();
          masterPdfBuffer = Buffer.from(arrayBuf);
        }
      } catch (remoteErr) {
        console.warn('Remote PDF Fetch Failed, trying local fallback:', remoteErr);
      }
    }

    // Attempt loading from relative path or local PDF files
    if (!masterPdfBuffer && pdfSourceUrl) {
      masterPdfBuffer = findLocalPdf(pdfSourceUrl);
    }

    // Try finding local PDF matching bookId (e.g. main.pdf, main_pembahasan.pdf, sample.pdf)
    if (!masterPdfBuffer) {
      masterPdfBuffer = findLocalPdf(`${bookId}.pdf`) || findLocalPdf(`public/pdf/${bookId}.pdf`);
    }

    // Default fallback to sample.pdf if still not found
    if (!masterPdfBuffer) {
      masterPdfBuffer = findLocalPdf('public/pdf/sample.pdf') || findLocalPdf('sample.pdf');
    }

    if (!masterPdfBuffer) {
      return res.status(404).json({ error: 'Master file PDF tidak ditemukan di server.' });
    }

    // Adjust targetFilename if default
    if (bookId === 'main') targetFilename = 'Modul_Utama.pdf';
    if (bookId === 'main_pembahasan') targetFilename = 'Pembahasan_Modul.pdf';

    // 3. Process Watermark Injection using pdf-lib
    const pdfDoc = await PDFDocument.load(masterPdfBuffer);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const pages = pdfDoc.getPages();
    
    const watermarkText = `Modul Eksklusif untuk ${email}`;
    const fontSize = 12;

    for (const page of pages) {
      const { height } = page.getSize();
      page.drawText(watermarkText, {
        x: 30,
        y: height - 35,
        size: fontSize,
        font: font,
        color: rgb(1, 0, 0), // Merah pekat (RGB 1, 0, 0)
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
