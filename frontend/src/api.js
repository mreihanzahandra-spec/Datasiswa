const BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Mengambil daftar siswa (dengan opsi pencarian)
  list: async (query = '') => {
    const res = await fetch(`${BASE_URL}/siswa?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Gagal mengambil data dari server');
    return await res.json();
  },

  // Menambah siswa baru
  create: async (data) => {
    const res = await fetch(`${BASE_URL}/siswa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Gagal menambah siswa');
    }
    return await res.json();
  },

  // Mengubah data siswa
  // Mengubah data siswa
update: async (id, data) => {
  const res = await fetch(`${BASE_URL}/siswa/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Gagal memperbarui data siswa');
  }
  return await res.json();
},
  // Menghapus siswa berdasarkan ID
  remove: async (id) => {
    const res = await fetch(`${BASE_URL}/siswa/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Gagal menghapus data siswa');
    }
    return await res.json();
  },
};

export default api;