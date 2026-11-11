# CRUD Data Siswa (versi MySQL)

Stack: **Node.js + Express + MySQL (mysql2)** untuk backend dan **React (Vite)** untuk frontend.

## Persiapan
1. Node.js 18 atau lebih baru.
2. Server MySQL/MariaDB yang menyala. Cara termudah: pasang **XAMPP** atau **Laragon**, lalu Start MySQL.
3. Cek user dan password di `backend/db.js` (default: user `root`, tanpa password).
   Database `db_siswa` dan tabel `siswa` dibuat otomatis saat backend dijalankan.

## Menjalankan (dua terminal)

**Terminal 1 – backend (port 5000)**
```bash
cd backend
npm install
npm start
```

**Terminal 2 – frontend (port 5173)**
```bash
cd frontend
npm install
npm run dev
```
Buka http://localhost:5173

Untuk password MySQL tanpa mengedit file, pakai environment variable, contoh:
`DB_PASSWORD=rahasia npm start` (Linux/macOS) atau `set DB_PASSWORD=rahasia && npm start` (Windows CMD).

## Endpoint API
| Method | URL               | Fungsi                              |
|--------|-------------------|-------------------------------------|
| GET    | /api/siswa?q=kata | Daftar siswa (opsional pencarian)   |
| GET    | /api/siswa/:id    | Detail satu siswa                   |
| POST   | /api/siswa        | Tambah siswa                        |
| PUT    | /api/siswa/:id    | Ubah siswa                          |
| DELETE | /api/siswa/:id    | Hapus siswa                         |
