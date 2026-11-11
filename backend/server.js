const db = require('./db');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Log setiap request yang masuk
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// 1. GET ALL / SEARCH (Sudah disesuaikan dengan kode_siswa & alamat_siswa/jurusan)
app.get('/api/siswa', (req, res) => {
  try {
    const { q } = req.query;
    if (q) {
      const stmt = db.prepare(`
        SELECT * FROM siswa 
        WHERE nama LIKE ? OR kode_siswa LIKE ? OR jurusan LIKE ? OR alamat_siswa LIKE ?
        ORDER BY id DESC
      `);
      const param = `%${q}%`;
      const rows = stmt.all(param, param, param, param);
      return res.json(rows);
    }
    const stmt = db.prepare('SELECT * FROM siswa ORDER BY id DESC');
    const rows = stmt.all();
    res.json(rows);
  } catch (err) {
    console.error('Error GET /api/siswa:', err.message);
    res.status(500).json({ message: 'Gagal mengambil data siswa' });
  }
});

// 2. CREATE (POST)
app.post('/api/siswa', (req, res) => {
  try {
    const { kode_siswa, nama, alamat_siswa, jenis_kelamin, tanggal_lahir, alamat, jurusan } = req.body;
    
    // Validasi field wajib
    if (!kode_siswa || !nama || !jenis_kelamin) {
      return res.status(400).json({ message: 'Kode Siswa, Nama, dan Jenis Kelamin wajib diisi!' });
    }

    const stmt = db.prepare(`
      INSERT INTO siswa (kode_siswa, nama, alamat_siswa, jenis_kelamin, tanggal_lahir, alamat, jurusan)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      String(kode_siswa), 
      String(nama), 
      alamat_siswa ? String(alamat_siswa) : null, 
      String(jenis_kelamin), 
      tanggal_lahir ? String(tanggal_lahir) : null, 
      alamat ? String(alamat) : null, 
      jurusan ? String(jurusan) : null
    );
    
    res.status(201).json({ id: info.lastInsertRowid, message: 'Siswa berhasil ditambahkan' });
  } catch (err) {
    console.error('Error POST /api/siswa:', err.message);
    if (err.message.includes('UNIQUE')) {
      return res.status(400).json({ message: 'Kode Siswa sudah digunakan oleh siswa lain!' });
    }
    res.status(400).json({ message: `Gagal menambah siswa: ${err.message}` });
  }
});

// 3. UPDATE (PUT)
app.put('/api/siswa/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'ID siswa tidak valid' });
    }

    const { kode_siswa, nama, alamat_siswa, jenis_kelamin, tanggal_lahir, alamat, jurusan } = req.body;

    if (!kode_siswa || !nama || !jenis_kelamin) {
      return res.status(400).json({ message: 'Kode Siswa, Nama, dan Jenis Kelamin wajib diisi!' });
    }

    const stmt = db.prepare(`
      UPDATE siswa 
      SET kode_siswa = ?, nama = ?, alamat_siswa = ?, jenis_kelamin = ?, tanggal_lahir = ?, alamat = ?, jurusan = ?
      WHERE id = ?
    `);
    
    const info = stmt.run(
      String(kode_siswa), 
      String(nama), 
      alamat_siswa ? String(alamat_siswa) : null, 
      String(jenis_kelamin), 
      tanggal_lahir ? String(tanggal_lahir) : null, 
      alamat ? String(alamat) : null, 
      jurusan ? String(jurusan) : null, 
      id
    );

    if (info.changes === 0) {
      return res.status(404).json({ message: 'Data siswa tidak ditemukan' });
    }
    
    res.json({ message: 'Data siswa berhasil diperbarui' });
  } catch (err) {
    console.error('Error PUT /api/siswa/:id:', err.message);
    if (err.message.includes('UNIQUE')) {
      return res.status(400).json({ message: 'Kode Siswa sudah digunakan oleh siswa lain!' });
    }
    res.status(500).json({ message: `Gagal memperbarui data siswa: ${err.message}` });
  }
});

// 4. DELETE
app.delete('/api/siswa/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'ID siswa tidak valid' });
    }

    const stmt = db.prepare('DELETE FROM siswa WHERE id = ?');
    const info = stmt.run(id);

    if (info.changes === 0) {
      return res.status(404).json({ message: 'Data siswa tidak ditemukan' });
    }
    res.json({ message: 'Data siswa berhasil dihapus' });
  } catch (err) {
    console.error('Error DELETE /api/siswa/:id:', err.message);
    res.status(500).json({ message: 'Gagal menghapus data siswa' });
  }
});

app.listen(PORT, () => {
  console.log(`Server Backend berjalan di http://localhost:${PORT}`);
});