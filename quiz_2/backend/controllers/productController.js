const ProductModel = require('../models/productModel');

// GET /api/products - Ambil semua produk
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.getAll();
    return res.status(200).json({
      success: true,
      message: 'Berhasil mengambil daftar produk R3 Petshop',
      total: products.length,
      data: products
    });
  } catch (error) {
    console.error('[getAllProducts Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data produk',
      error: error.message
    });
  }
};

// GET /api/products/:id - Ambil detail 1 produk
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.getById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Produk dengan ID ${id} tidak ditemukan`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Berhasil mengambil detail produk',
      data: product
    });
  } catch (error) {
    console.error('[getProductById Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail produk',
      error: error.message
    });
  }
};

// POST /api/products - Tambah produk baru
const createProduct = async (req, res) => {
  try {
    const { nama_produk, kategori, berat_varian, harga, url_gambar } = req.body;

    // Validasi input
    if (!nama_produk || !kategori || !berat_varian || harga === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Field nama_produk, kategori, berat_varian, dan harga wajib diisi'
      });
    }

    const newProduct = await ProductModel.create({
      nama_produk,
      kategori,
      berat_varian,
      harga: Number(harga),
      url_gambar
    });

    return res.status(201).json({
      success: true,
      message: 'Produk berhasil ditambahkan',
      data: newProduct
    });
  } catch (error) {
    console.error('[createProduct Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menambahkan produk baru',
      error: error.message
    });
  }
};

// PUT /api/products/:id - Update produk
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_produk, kategori, berat_varian, harga, url_gambar } = req.body;

    // Cek keberadaan produk
    const existingProduct = await ProductModel.getById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: `Produk dengan ID ${id} tidak ditemukan`
      });
    }

    // Validasi input
    if (!nama_produk || !kategori || !berat_varian || harga === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Field nama_produk, kategori, berat_varian, dan harga wajib diisi'
      });
    }

    await ProductModel.update(id, {
      nama_produk,
      kategori,
      berat_varian,
      harga: Number(harga),
      url_gambar
    });

    const updatedProduct = await ProductModel.getById(id);

    return res.status(200).json({
      success: true,
      message: `Produk dengan ID ${id} berhasil diperbarui`,
      data: updatedProduct
    });
  } catch (error) {
    console.error('[updateProduct Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui data produk',
      error: error.message
    });
  }
};

// DELETE /api/products/:id - Hapus produk
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await ProductModel.getById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: `Produk dengan ID ${id} tidak ditemukan`
      });
    }

    await ProductModel.delete(id);

    return res.status(200).json({
      success: true,
      message: `Produk "${existingProduct.nama_produk}" (ID: ${id}) berhasil dihapus`,
      data: existingProduct
    });
  } catch (error) {
    console.error('[deleteProduct Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus produk',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
