# 🐾 R3 Petshop — Quiz 1, 2 & 3 Pemrograman Web

Dokumentasi lengkap proyek tugas **Quiz 1**, **Quiz 2**, dan **Quiz 3** mata kuliah Pemrograman Web. Proyek ini mengintegrasikan Landing Page Company Profile modern (Frontend Next.js) dengan REST API Backend (Node.js/Express.js) dan Basis Data Relasional MySQL.

---

## 📌 Ringkasan Pengerjaan Tugas PDF

| Quiz | Status | Deskripsi Implementasi |
|---|---|---|
| **Quiz 1** | ✅ **Selesai** | Merancang antarmuka *Frontend Landing Page* modular (`Navbar`, `Hero`, `Features`, `ProductCatalog`, `About`, `Footer`) menggunakan **Next.js (App Router)** dan **Tailwind CSS**. |
| **Quiz 2** | ✅ **Selesai** | Membangun **Backend REST API** dengan Node.js/Express.js & MySQL database (`db_r3petshop`), mencakup arsitektur MVC (Model, Controller, Route), serta endpoint **CRUD** lengkap untuk modul produk. |
| **Quiz 3** | ✅ **Selesai** | Mengintegrasikan Frontend dengan Backend API via **Fetch API** secara dinamis, menampilkan *loading indicator (Skeleton Loader)*, *error handling (pemberitahuan error & tombol retry)*, pencarian, dan filter kategori. |

---

## 📁 Struktur Direktori Proyek

```text
quiz_2/
├── app/
│   ├── globals.css         # Styling global & Tailwind setup
│   ├── layout.tsx          # Layout utama aplikasi
│   └── page.tsx            # Halaman utama menyatukan komponen modular (Quiz 1)
├── components/             # Komponen Modular Frontend (Quiz 1 & Quiz 3)
│   ├── Navbar.tsx          # Bilah navigasi utama
│   ├── Hero.tsx            # Banner promo & CTA
│   ├── Features.tsx        # Fitur unggulan petshop
│   ├── ProductCatalog.tsx  # Katalog produk dinamis (Fetch API & state handling Quiz 3)
│   ├── About.tsx           # Sekilas tentang R3 Petshop
│   └── Footer.tsx          # Hak cipta & link sosial media
├── backend/                # Server Backend REST API (Quiz 2)
│   ├── config/
│   │   └── db.js           # Koneksi MySQL pool (mysql2)
│   ├── controllers/
│   │   └── productController.js  # Logika bisnis CRUD (GET, POST, PUT, DELETE)
│   ├── models/
│   │   └── productModel.js       # Query database MySQL (tb_produk)
│   ├── routes/
│   │   └── productRoutes.js      # Definisi endpoint Express router
│   ├── .env                # Konfigurasi environment backend (PORT, DB_HOST, DB_USER, etc.)
│   └── server.js           # Entrypoint Express server (Port 5000)
├── database/
│   └── products.sql        # Script SQL pembuat database db_r3petshop & tb_produk + seed data
├── postman_collection.json # File koleksi Postman untuk pengujian REST API CRUD (Quiz 2)
├── package.json
└── README.md
```

---

## 🛠️ Prasyarat & Instalasi

### 1. Prasyarat Sistem
* **Node.js**: v18.x atau lebih baru
* **MySQL Server** (XAMPP / Laragon / MySQL Service)
* **Postman** (Opsional, untuk testing API)

### 2. Persiapan Database MySQL (Quiz 2)
1. Buka **phpMyAdmin** atau MySQL CLI.
2. Impor file SQL yang terdapat di folder `database/products.sql`:
   ```sql
   -- File: database/products.sql
   CREATE DATABASE IF NOT EXISTS `db_r3petshop`;
   USE `db_r3petshop`;
   ```
3. Script akan otomatis membuat database `db_r3petshop`, tabel `tb_produk`, dan mengisi data awal (seed data).

### 3. Instalasi Dependencies
Jalankan perintah berikut pada terminal proyek:
```bash
npm install
```

---

## 🚀 Cara Menjalankan Aplikasi

### Step 1: Jalankan Server Backend API (Quiz 2)
Buka terminal 1 dan jalankan:
```bash
npm run dev:backend
```
* Backend API akan berjalan di: `http://localhost:5000`
* Test Health Check: `http://localhost:5000/`

### Step 2: Jalankan Server Frontend Next.js (Quiz 1 & 3)
Buka terminal 2 dan jalankan:
```bash
npm run dev
```
* Aplikasi Frontend akan berjalan di: `http://localhost:3000`

---

## 🔌 Spesifikasi REST API Backend (Quiz 2)

Base URL: `http://localhost:5000/api/products`

| No | Method | Endpoint | Deskripsi | Status Code |
|---|---|---|---|---|
| 1 | `GET` | `/api/products` | Mengambil seluruh daftar produk | `200 OK` |
| 2 | `GET` | `/api/products/:id` | Mengambil detail 1 produk berdasarkan ID | `200 OK` / `404 Not Found` |
| 3 | `POST` | `/api/products` | Menambahkan produk baru | `201 Created` / `400 Bad Request` |
| 4 | `PUT` | `/api/products/:id` | Memperbarui data produk berdasarkan ID | `200 OK` / `404 Not Found` |
| 5 | `DELETE` | `/api/products/:id` | Menghapus produk berdasarkan ID | `200 OK` / `404 Not Found` |

### Contoh Payload JSON (POST / PUT)
```json
{
  "nama_produk": "Whiskas Junior Ocean Fish 450gr",
  "kategori": "Cat Food",
  "berat_varian": "450gr",
  "harga": 28000,
  "url_gambar": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=300"
}
```

---

## 🧪 Pengujian API dengan Postman (Quiz 2)

1. Buka aplikasi **Postman**.
2. Klik tombol **Import** lalu pilih file `postman_collection.json` di direktori proyek ini.
3. Jalankan pengujian request `1. GET All Products`, `2. GET By ID`, `3. POST Create`, `4. PUT Update`, dan `5. DELETE`.

---

## 📸 Panduan Screenshot untuk Pengumpulan (Submission Checklist)

Sesuai instruksi PDF Quiz 1, Quiz 2, dan Quiz 3, berikut screenshot yang perlu Anda persiapkan:

1. **Quiz 1 (Frontend)**:
   * 📷 Screenshot Struktur Komponen Kode (`app/page.tsx` & folder `components/`).
   * 📷 Screenshot Tampilan UI Landing Page di Browser (`http://localhost:3000`).

2. **Quiz 2 (Backend API)**:
   * 📷 Screenshot Hasil Testing API di Postman (menampilkan respon JSON sukses `200 OK` / `201 Created`).
   * 📷 Screenshot Tabel `tb_produk` di phpMyAdmin.

3. **Quiz 3 (Integrasi)**:
   * 📷 Screenshot Tampilan Katalog Produk yang memuat data dinamis dari Backend.
   * 📷 Screenshot Indikator Pemuatan (*Loading Skeleton*) & Pesan Kesalahan (*Error Message* saat backend mati).

---

## 📤 Pengumpulan Tugas

1. **GitHub Repository**: Push seluruh kode ini ke repositori GitHub publik Anda.
2. **Link Repository**: Kumpulkan URL repositori GitHub Anda pada platform/DFA kuliah.
