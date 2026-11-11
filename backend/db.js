const { DatabaseSync } = require('node:sqlite');
const path = require('path');

// Membuat atau membuka file database SQLite
const dbPath = path.join(__dirname, 'siswa.db');
const db = new DatabaseSync(dbPath);

// Inisialisasi tabel siswa jika belum ada
db.exec(`
  CREATE TABLE IF NOT EXISTS siswa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kode_siswa TEXT UNIQUE NOT NULL,
    nama TEXT NOT NULL,
    alamat_siswa TEXT NOT NULL,
    jenis_kelamin TEXT NOT NULL,
    tanggal_lahir TEXT,
    alamat TEXT,
    jurusan TEXT
  )
`);

// PASTIKAN MENG-EXPORT KONEKSI DATABASE LANGSUNG
module.exports = db;