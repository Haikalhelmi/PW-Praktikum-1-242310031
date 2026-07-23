-- Database: `db_r3petshop`
-- SQL Dump untuk Quiz 2 Pemrograman Web (R3 Petshop)

CREATE DATABASE IF NOT EXISTS `db_r3petshop`;
USE `db_r3petshop`;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_produk`
--

CREATE TABLE IF NOT EXISTS `tb_produk` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_produk` VARCHAR(255) NOT NULL,
  `kategori` VARCHAR(100) NOT NULL,
  `berat_varian` VARCHAR(100) NOT NULL,
  `harga` INT NOT NULL,
  `url_gambar` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Data awal (Seed Data) dari katalog R3 Petshop
--

INSERT INTO `tb_produk` (`id`, `nama_produk`, `kategori`, `berat_varian`, `harga`, `url_gambar`) VALUES
(1, 'Animal & Co Pouch 80gr rasa Chicken Adult', 'Cat Food', '80gr', 8000, 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300'),
(2, 'Dog Choize 800gr rasa Beef dan Lamb', 'Dog Food', '800gr', 20000, 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=300'),
(3, 'Kalung Kucing Aneka Warna Kalung 50gr', 'Accessories', '50gr', 10000, 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300'),
(4, 'Life Cat Dry Food 1kg Bonus Milk', 'Cat Food', '1kg', 35000, 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=300');
