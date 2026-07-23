const db = require('../config/db');

class ProductModel {
  // Ambil semua produk
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM tb_produk ORDER BY id DESC');
    return rows;
  }

  // Ambil produk berdasarkan ID
  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM tb_produk WHERE id = ?', [id]);
    return rows[0] || null;
  }

  // Tambah produk baru (Create)
  static async create(data) {
    const { nama_produk, kategori, berat_varian, harga, url_gambar } = data;
    const [result] = await db.query(
      'INSERT INTO tb_produk (nama_produk, kategori, berat_varian, harga, url_gambar) VALUES (?, ?, ?, ?, ?)',
      [nama_produk, kategori, berat_varian, harga, url_gambar || null]
    );
    return { id: result.insertId, ...data };
  }

  // Update produk berdasarkan ID (Update)
  static async update(id, data) {
    const { nama_produk, kategori, berat_varian, harga, url_gambar } = data;
    const [result] = await db.query(
      'UPDATE tb_produk SET nama_produk = ?, kategori = ?, berat_varian = ?, harga = ?, url_gambar = ? WHERE id = ?',
      [nama_produk, kategori, berat_varian, harga, url_gambar || null, id]
    );
    return result.affectedRows > 0;
  }

  // Hapus produk berdasarkan ID (Delete)
  static async delete(id) {
    const [result] = await db.query('DELETE FROM tb_produk WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = ProductModel;
