import React from 'react';

export default function SiswaTable({ data, onUbah, onHapus }) {
  return (
    <div className="tabel-wadah">
      <table className="tabel-siswa">
        <thead>
          <tr>
            <th>Kode Siswa</th>
            <th>Nama Lengkap</th>
            <th>Alamat</th>
            <th>JK</th>
            <th>Jurusan</th>
            <th style={{ textAlign: 'center' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <span className="badge-kode">{item.kode_siswa}</span>
              </td>
              <td>
                <span className="nama-siswa">{item.nama}</span>
              </td>
              <td>
                <span className="alamat-siswa" title={item.alamat_siswa}>
                  {item.alamat_siswa || '-'}
                </span>
              </td>
              <td>
                <span className={`badge-jk ${item.jenis_kelamin === 'L' ? 'jk-l' : 'jk-p'}`}>
                  {item.jenis_kelamin === 'L' ? '♂ Laki-laki' : '♀ Perempuan'}
                </span>
              </td>
              <td>
                <span className="badge-jurusan">{item.jurusan || '-'}</span>
              </td>
              <td>
                <div className="aksi-grup">
                  <button 
                    className="tombol-aksi tombol-edit" 
                    onClick={() => onUbah(item)}
                    title="Ubah data siswa"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <span>Edit</span>
                  </button>
                  <button 
                    className="tombol-aksi tombol-hapus" 
                    onClick={() => onHapus(item)}
                    title="Hapus data siswa"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    <span>Hapus</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
