'use client';

import { useState, useEffect, useCallback } from 'react';

interface Product {
  id: number;
  nama_produk: string;
  kategori: string;
  berat_varian: string;
  harga: number;
  url_gambar: string | null;
  created_at?: string;
}

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/products';

  const fetchProducts = useCallback(async (isManualRetry = false) => {
    if (isManualRetry) {
      setLoading(true);
    }
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Gagal mengambil data dari server (Status HTTP: ${response.status})`);
      }

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setProducts(result.data);
      } else {
        throw new Error(result.message || 'Respon API tidak sesuai format yang diharapkan');
      }
    } catch (err: unknown) {
      console.error('[ProductCatalog Fetch Error]', err);
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui';
      setError(
        message || 'Tidak dapat terhubung ke Backend API Server (http://localhost:5000). Pastikan server backend dan MySQL aktif.'
      );
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts(false);
  }, [fetchProducts]);

  // Format Angka ke Rupiah
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Filter Kategori Unik
  const categories = ['Semua', ...Array.from(new Set(products.map((p) => p.kategori)))];

  // Filter Produk berdasarkan pencarian dan kategori
  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    const matchesSearch =
      item.nama_produk.toLowerCase().includes(search.toLowerCase()) ||
      item.kategori.toLowerCase().includes(search.toLowerCase()) ||
      item.berat_varian.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="katalog" className="py-20 bg-slate-900 text-white px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="px-4 py-1.5 bg-yellow-400/10 text-yellow-400 text-xs font-bold uppercase tracking-widest rounded-full border border-yellow-400/20 inline-block mb-3">
            Integrasi Backend Dynamic API (Quiz 3)
          </span>
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">
            Katalog Produk & Layanan
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mb-4"></div>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Data produk di bawah dimuat secara real-time dari database Backend API (<code className="text-yellow-400 text-sm">tb_produk</code>).
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 shadow-xl backdrop-blur-md">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cari produk atau varian..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 text-white text-sm rounded-xl focus:outline-none focus:border-yellow-400 transition-colors placeholder-slate-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                  selectedCategory === cat
                    ? 'bg-yellow-400 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* STATE 1: LOADING STATE (Skeleton Cards) */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/50 animate-pulse flex flex-col justify-between h-[380px]"
              >
                <div>
                  <div className="w-full h-44 bg-slate-700/70 rounded-xl mb-4"></div>
                  <div className="h-4 bg-slate-700/70 rounded w-1/3 mb-3"></div>
                  <div className="h-6 bg-slate-700/70 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-700/70 rounded w-1/2"></div>
                </div>
                <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center">
                  <div className="h-6 bg-slate-700/70 rounded w-1/3"></div>
                  <div className="h-9 bg-slate-700/70 rounded-lg w-24"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STATE 2: ERROR STATE */}
        {!loading && error && (
          <div className="max-w-2xl mx-auto bg-red-950/40 border border-red-500/50 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl border border-red-500/20">
              ⚠️
            </div>
            <h3 className="text-xl font-bold text-red-200 mb-2">Gagal Memuat Data Produk</h3>
            <p className="text-red-300/80 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
              {error}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => fetchProducts(true)}
                className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                🔄 Coba Lagi (Retry Fetch)
              </button>
            </div>
          </div>
        )}

        {/* STATE 3: EMPTY STATE */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-slate-800/40 rounded-2xl border border-slate-700/40">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-lg font-bold text-slate-300 mb-1">Produk Tidak Ditemukan</h3>
            <p className="text-slate-500 text-sm mb-4">
              Tidak ada produk yang cocok dengan pencarian &quot;{search}&quot; atau kategori yang dipilih.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('Semua');
              }}
              className="px-4 py-2 bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-600 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* STATE 4: SUCCESS DYNAMIC DATA GRID */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700/70 hover:border-yellow-400/50 shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  {/* Product Image Container */}
                  <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                    {product.url_gambar ? (
                      <img
                        src={product.url_gambar}
                        alt={product.nama_produk}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback jika URL gambar broken
                          (e.target as HTMLElement).setAttribute('style', 'display: none;');
                          const parent = (e.target as HTMLElement).parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500">
                                <span class="text-4xl mb-1">🐾</span>
                                <span class="text-xs">Gambar Produk</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500">
                        <span className="text-4xl mb-1">🐾</span>
                        <span className="text-xs">Gambar Tidak Tersedia</span>
                      </div>
                    )}
                    {/* Badge Category */}
                    <div className="absolute top-3 left-3 bg-yellow-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                      {product.kategori}
                    </div>
                  </div>

                  {/* Product Content Info */}
                  <div className="p-5">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-bold text-white text-base leading-snug group-hover:text-yellow-400 transition-colors line-clamp-2">
                        {product.nama_produk}
                      </h3>
                    </div>

                    <div className="inline-flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700/50 text-slate-300 text-xs font-medium mb-3">
                      <span>⚖️ Varian:</span>
                      <span className="text-yellow-400 font-semibold">{product.berat_varian}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Card: Price & Action */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-700/50 flex justify-between items-center bg-slate-900/40">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Harga</span>
                    <span className="text-lg font-extrabold text-yellow-400">
                      {formatIDR(product.harga)}
                    </span>
                  </div>
                  <button className="px-3.5 py-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs font-bold rounded-xl shadow-md transition-all active:scale-95">
                    + Keranjang
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-12 text-center text-xs text-slate-500 border-t border-slate-800 pt-6">
          Total Produk Ditemukan: <span className="text-yellow-400 font-bold">{filteredProducts.length}</span> item | Diambil langsung dari REST API Backend
        </div>

      </div>
    </section>
  );
}
