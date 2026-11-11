import React, { useEffect, useState } from 'react';
import { api } from './api';
import SiswaTable from './components/SiswaTable.jsx';
import SiswaForm from './components/SiswaForm.jsx';

export default function App() {
  const [siswa, setSiswa] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formAwal, setFormAwal] = useState(null); // null = tertutup, {} = tambah, objek = ubah
  const [pesan, setPesan] = useState('');

  async function muat(kata = q) {
    try {
      setError('');
      setSiswa(await api.list(kata));
    } catch (e) {
      setError('Gagal memuat data. Pastikan server backend sudah berjalan.');
    } finally {
      setLoading(false);
    }
  }

  // Muat ulang saat kata kunci berubah (dengan jeda singkat)
  useEffect(() => {
    const t = setTimeout(() => muat(q), 250);
    return () => clearTimeout(t);
  }, [q]);

  function tampilkanPesan(teks) {
    setPesan(teks);
    setTimeout(() => setPesan(''), 2500);
  }

  async function simpan(data) {
    try {
      if (formAwal?.id) {
        await api.update(formAwal.id, data);
        tampilkanPesan('Data siswa berhasil diperbarui.');
      } else {
        await api.create(data);
        tampilkanPesan('Siswa berhasil ditambahkan.');
      }
      setFormAwal(null);
      muat();
    } catch (e) {
      setError(e.message);
    }
  }

  async function hapus(s) {
    if (!window.confirm(`Hapus data ${s.nama}? Tindakan ini tidak bisa dibatalkan.`)) return;
    try {
      await api.remove(s.id);
      tampilkanPesan('Siswa dihapus.');
      muat();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="halaman">
      <header className="kepala">
        <div className="judul-wrapper">
          <div className="ikon-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <div>
            <h1>Data Siswa</h1>
            <p className="sub">
              <span className="badge-jumlah">{siswa.length} Siswa</span>
              {q && <span>untuk pencarian “{q}”</span>}
            </p>
          </div>
        </div>
        <button className="tombol utama" onClick={() => setFormAwal({})}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Tambah Siswa</span>
        </button>
      </header>

      <div className="cari-wrapper">
        <svg className="cari-ikon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          className="cari"
          type="search"
          placeholder="Cari berdasarkan nama, kode siswa, atau jurusan..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Cari siswa"
        />
        {q && (
          <button className="cari-bersihkan" onClick={() => setQ('')} aria-label="Bersihkan pencarian">
            &times;
          </button>
        )}
      </div>

      {error && <div className="galat" role="alert">{error}</div>}

      {loading ? (
        <div className="kosong">Memuat data siswa…</div>
      ) : siswa.length === 0 ? (
        <div className="kosong">
          {q ? 'Tidak ada siswa yang cocok dengan pencarian.' : 'Belum ada data siswa. Klik “Tambah Siswa” untuk memulai.'}
        </div>
      ) : (
        <SiswaTable data={siswa} onUbah={setFormAwal} onHapus={hapus} />
      )}

      {formAwal && (
        <SiswaForm awal={formAwal} onSimpan={simpan} onBatal={() => setFormAwal(null)} />
      )}

      {pesan && <div className="toast" role="status">{pesan}</div>}
    </div>
  );
}
