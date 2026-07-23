const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root Route (Health Check)
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Online',
    message: 'Backend API R3 Petshop (Quiz 2 Pemrograman Web) is running!',
    endpoints: {
      getAllProducts: 'GET /api/products',
      getProductById: 'GET /api/products/:id',
      createProduct: 'POST /api/products',
      updateProduct: 'PUT /api/products/:id',
      deleteProduct: 'DELETE /api/products/:id'
    }
  });
});

// Mount Routes
app.use('/api/products', productRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Internal Error]', err);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan internal server',
    error: err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Server Backend R3 Petshop aktif di http://localhost:${PORT}`);
  console.log(`📦 Endpoint CRUD Produk: http://localhost:${PORT}/api/products`);
  console.log(`=================================================`);
});
