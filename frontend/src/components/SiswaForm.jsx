import React, { useState, useEffect } from 'react';

export default function SiswaForm({ awal, onSimpan, onBatal }) {
  const [form, setForm] = useState({
    kode_siswa: '',
    nama: '',
    alamat_siswa: '',
    jenis_kelamin: 'L',
    tanggal_lahir: '',
    alamat: '',
    jurusan: '',
  });

  useEffect(() => {
    if (awal && awal.id) {
      setForm({
        kode_siswa: awal.kode_siswa || '',
        nama: awal.nama || '',
        alamat_siswa: awal.alamat_siswa || '',
        jenis_kelamin: awal.jenis_kelamin || 'L',
        tanggal_lahir: awal.tanggal_lahir || '',
        alamat: awal.alamat || '',
        jurusan: awal.jurusan || '',
      });
    } else {
      setForm({
        kode_siswa: '',
        nama: '',
        alamat_siswa: '',
        jenis_kelamin: 'L',
        tanggal_lahir: '',
        alamat: '',
        jurusan: '',
      });
    }
  }, [awal]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSimpan(form);
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onBatal(); }}>
      <div className="modal-konten">
        <div className="modal-header">
          <div>
            <h3>{awal?.id ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}</h3>
            <p className="modal-sub">
              {awal?.id ? 'Perbarui data siswa dengan akurat.' : 'Lengkapi informasi siswa untuk ditambahkan ke daftar.'}
            </p>
          </div>
          <button 
            type="button" 
            className="tombol-tutup" 
            onClick={onBatal}
            aria-label="Tutup form modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-siswa">
          <div className="form-grup">
            <label htmlFor="kode_siswa">
              Kode Siswa <span className="wajib">*</span>
            </label>
            <input 
              id="kode_siswa"
              type="text" 
              name="kode_siswa" 
              value={form.kode_siswa} 
              onChange={handleChange} 
              required 
              placeholder="Contoh: SIS-001" 
            />
          </div>

          <div className="form-grup">
            <label htmlFor="nama">
              Nama Lengkap <span className="wajib">*</span>
            </label>
            <input 
              id="nama"
              type="text" 
              name="nama" 
              value={form.nama} 
              onChange={handleChange} 
              required 
              placeholder="Masukkan nama lengkap siswa" 
            />
          </div>

          <div className="form-grid-2">
            <div className="form-grup">
              <label htmlFor="jenis_kelamin">
                Jenis Kelamin <span className="wajib">*</span>
              </label>
              <select 
                id="jenis_kelamin"
                name="jenis_kelamin" 
                value={form.jenis_kelamin} 
                onChange={handleChange}
              >
                <option value="L">Laki-laki (L)</option>
                <option value="P">Perempuan (P)</option>
              </select>
            </div>

            <div className="form-grup">
              <label htmlFor="jurusan">Jurusan</label>
              <input 
                id="jurusan"
                type="text" 
                name="jurusan" 
                value={form.jurusan} 
                onChange={handleChange} 
                placeholder="Contoh: RPL, TKJ, dll." 
              />
            </div>
          </div>

          <div className="form-grup">
            <label htmlFor="alamat_siswa">Alamat Domisili</label>
            <textarea 
              id="alamat_siswa"
              name="alamat_siswa" 
              value={form.alamat_siswa} 
              onChange={handleChange} 
              rows="3"
              placeholder="Masukkan alamat tinggal siswa..."
            ></textarea>
          </div>

          <div className="form-aksi">
            <button type="button" className="tombol tombol-batal" onClick={onBatal}>
              Batal
            </button>
            <button type="submit" className="tombol utama">
              {awal?.id ? 'Perbarui Data' : 'Simpan Siswa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
