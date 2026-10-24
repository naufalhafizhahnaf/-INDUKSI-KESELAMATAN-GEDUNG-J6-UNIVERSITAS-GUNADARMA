// ==========================================================================
// I-HSSE Gedung J6 — Server lokal + perantara OpenRouter
// ==========================================================================
// Tugas server ini:
//   1. Menyajikan file website (HTML, CSS, JS, video) — seperti http.server
//   2. Meneruskan pertanyaan chat ke OpenRouter TANPA membocorkan API key
//
// Jalankan dengan:  node server.js
// Atau lewat:       MULAI DI SINI - Buka Website.bat
// ==========================================================================

import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --------------------------------------------------------------------------
// Baca konfigurasi dari .env (tanpa dependensi tambahan)
// --------------------------------------------------------------------------
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  const config = { ...process.env };
  try {
    const raw = fs.readFileSync(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (key && !(key in process.env)) config[key] = value;
    }
  } catch {
    // .env tidak ada -> pakai variabel lingkungan saja
  }
  return config;
}

const ENV = loadEnv();
const PORT = Number(ENV.PORT) || 8000;
const API_KEY = ENV.OPENROUTER_API_KEY || '';
const MODEL = ENV.OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct:free';
const APP_TITLE = ENV.APP_TITLE || 'I-HSSE Gedung J6 Assistant';
const APP_URL = ENV.APP_URL || `http://localhost:${PORT}`;

// --------------------------------------------------------------------------
// Jenis file
// --------------------------------------------------------------------------
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

// --------------------------------------------------------------------------
// Panggil OpenRouter
// --------------------------------------------------------------------------
const SYSTEM_PROMPT = [
  'Anda adalah "I-HSSE Assistant", asisten ramah untuk website induksi keselamatan',
  'Gedung J6 Universitas Gunadarma (I-HSSE = Integrated Health, Safety, Security & Environment).',
  '',
  'Konteks gedung:',
  '- Alamat: Gedung J6 Universitas Gunadarma, Jl. KH. Noer Ali, Jakasampurna, Kec. Bekasi Barat, Kota Bekasi.',
  '- Jam operasional: Senin-Sabtu, 08.00-21.00 WIB. Pos keamanan lantai 1 siaga 24 jam.',
  '- Titik kumpul evakuasi: lapangan parkir depan Gedung J6.',
  '- Nomor darurat: Ambulans 119, Kebakaran 113, Polisi 110.',
  '- Satpam Gunadarma J6: Aris +62 812-8608-4411, Warsito +62 821-2409-9560, Topik +62 813-8669-9062,',
  '  Sahrul +62 857-1869-8056, Atang +62 811-1094-467.',
  '- Klinik dr. Aidah: 0812-1064-0450 (Jl. Al Amin, Jakamulya, Bekasi Selatan).',
  '- Klinik Pondok Pengobatan Jagad Buana: (021) 9553-325 (Jatibening, Pondok Gede).',
  '- Polsek Bekasi Selatan: (021) 8240-2647.',
  '',
  'Aturan menjawab:',
  '- Jawab dalam Bahasa Indonesia yang ramah, jelas, dan ringkas (maksimal 4-6 kalimat).',
  '- Boleh memakai format HTML sederhana: <strong>, <em>, <a href="tel:...">, <br>, dan daftar bernomor.',
  '- JANGAN memakai markdown seperti ** atau ## — gunakan HTML bila perlu penekanan.',
  '- Sapaan (hi, hai, halo, hello) balas dengan ramah dan tawarkan bantuan.',
  '- Bila pertanyaan di luar topik keselamatan/kampus, arahkan kembali dengan sopan.',
  '- Bila informasi tidak diketahui, sarankan menghubungi pos keamanan lantai 1.'
].join('\n');

async function askOpenRouter(messages) {
  if (!API_KEY) {
    const err = new Error('API key OpenRouter belum diisi di file .env');
    err.code = 'NO_KEY';
    throw err;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': APP_URL,
        'X-Title': APP_TITLE
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.6,
        // Model reasoning (mis. minimax-m3.1-flash, nemotron) memakai sebagian
        // besar token untuk penalaran; token terlalu kecil membuat "content"
        // bernilai null sehingga jawaban kosong despite model berjalan.
        max_tokens: 2000
      }),
      signal: controller.signal
    });

    const text = await response.text();
    let data = null;
    try { data = JSON.parse(text); } catch { /* respons bukan JSON */ }

    if (!response.ok) {
      const detail = data?.error?.message || text.slice(0, 300);
      const err = new Error(`OpenRouter menolak permintaan (${response.status}): ${detail}`);
      err.code = 'API_ERROR';
      err.status = response.status;
      throw err;
    }

    const raw = data?.choices?.[0]?.message?.content;
    // Sebagian penyedia mengembalikan content sebagai array berisi bagian teks.
    let content = raw;
    if (Array.isArray(content)) {
      content = content.map(p => (typeof p === 'string' ? p : p?.text || '')).join('');
    }
    if (typeof content !== 'string') content = '';

    if (!content.trim()) {
      // Fallback: model reasoning kadang menulis jawaban pada field "reasoning".
      const reasoning = data?.choices?.[0]?.message?.reasoning;
      if (typeof reasoning === 'string' && reasoning.trim()) {
        return reasoning.trim();
      }
      const err = new Error('OpenRouter tidak mengembalikan jawaban.');
      err.code = 'EMPTY';
      throw err;
    }
    return content.trim();
  } finally {
    clearTimeout(timeout);
  }
}

// Coba beberapa kali bila jawaban kosong/transien
async function askOpenRouterWithRetry(messages) {
  const attempts = 3;
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      return await askOpenRouter(messages);
    } catch (error) {
      lastError = error;
      // 401/403 (key salah) tidak perlu diulang
      if (error.status === 401 || error.status === 403) break;
      if (i < attempts - 1) await new Promise(r => setTimeout(r, 800 * (i + 1)));
    }
  }
  throw lastError;
}

// --------------------------------------------------------------------------
// Tangani permintaan chat
// --------------------------------------------------------------------------
async function handleChat(req, res) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 1e6) { // batas 1 MB
      sendJson(res, 413, { error: 'Pertanyaan terlalu panjang.' });
      return;
    }
  }

  let payload;
  try {
    payload = JSON.parse(body || '{}');
  } catch {
    sendJson(res, 400, { error: 'Format permintaan tidak valid.' });
    return;
  }

  const question = String(payload.question || '').trim();
  if (!question) {
    sendJson(res, 400, { error: 'Pertanyaan kosong.' });
    return;
  }

  // Riwayat percakapan (opsional, maksimal 10 pesan terakhir)
  const history = Array.isArray(payload.history) ? payload.history.slice(-10) : [];

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && m.content)
      .map(m => ({ role: m.role, content: String(m.content).slice(0, 2000) })),
    { role: 'user', content: question.slice(0, 2000) }
  ];

  try {
    const answer = await askOpenRouterWithRetry(messages);
    sendJson(res, 200, { answer, model: MODEL, source: 'openrouter' });
  } catch (error) {
    console.error('[chat] Gagal memanggil OpenRouter:', error.message);
    sendJson(res, 502, {
      error: 'Gagal menghubungi layanan AI.',
      detail: error.message,
      code: error.code || 'UNKNOWN'
    });
  }
}

// --------------------------------------------------------------------------
// Sajikan file statis
// --------------------------------------------------------------------------
async function serveStatic(req, res) {
  let urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (urlPath === '/') urlPath = '/index.html';

  // Cegah keluar dari folder proyek
  const filePath = path.join(__dirname, urlPath);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(__dirname))) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  // Jangan sajikan file sensitif
  const base = path.basename(resolved);
  if (base === '.env' || base === 'server.js' || base === 'package.json' && false) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  let stat;
  try {
    stat = await fsp.stat(resolved);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 — File tidak ditemukan');
    return;
  }

  if (stat.isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 — Bukan file');
    return;
  }

  const ext = path.extname(resolved).toLowerCase();
  const type = MIME[ext] || 'application/octet-stream';

  // Dukungan Range (penting untuk video)
  const range = req.headers.range;
  if (range && (ext === '.mp4' || ext === '.webm')) {
    const match = /bytes=(\d*)-(\d*)/.exec(range);
    let start = match && match[1] ? parseInt(match[1], 10) : 0;
    let end = match && match[2] ? parseInt(match[2], 10) : stat.size - 1;
    if (Number.isNaN(start)) start = 0;
    if (Number.isNaN(end) || end >= stat.size) end = stat.size - 1;
    if (start > end) {
      res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
      res.end();
      return;
    }
    res.writeHead(206, {
      'Content-Type': type,
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1
    });
    fs.createReadStream(resolved, { start, end }).pipe(res);
    return;
  }

  // Saat pengembangan, hampir semua file tidak di-cache, supaya perubahan
  // CSS/JS/gambar/logo langsung terlihat tanpa perlu hard refresh.
  // Hanya media besar (video) yang boleh di-cache agar pemutaran lancar.
  const noCache = ext !== '.mp4' && ext !== '.webm';

  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': stat.size,
    'Accept-Ranges': 'bytes',
    'Cache-Control': noCache ? 'no-store, must-revalidate' : 'public, max-age=3600'
  });
  fs.createReadStream(resolved).pipe(res);
}

// --------------------------------------------------------------------------
// Server
// --------------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/api/chat') {
    if (req.method !== 'POST') {
      sendJson(res, 405, { error: 'Gunakan metode POST.' });
      return;
    }
    await handleChat(req, res);
    return;
  }

  if (url.pathname === '/api/status') {
    sendJson(res, 200, { online: Boolean(API_KEY), model: MODEL });
    return;
  }

  await serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log('');
  console.log('  ============================================================');
  console.log('   I-HSSE GEDUNG J6 — Server siap');
  console.log('  ============================================================');
  console.log(`   Website : http://localhost:${PORT}`);
  console.log(`   Videos  : http://localhost:${PORT}/videos.html`);
  console.log(`   AI Chat : ${API_KEY ? 'OpenRouter aktif — ' + MODEL : 'API key belum diisi (.env)'}`);
  console.log('');
  console.log('   Tutup jendela ini untuk mematikan server.');
  console.log('');
});
