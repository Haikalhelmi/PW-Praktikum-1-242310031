export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 bg-white shadow-md border-b-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        
        <div className="flex items-center gap-3 min-w-[200px]">
          <img 
            src="https://api-damri-dashboard.bisku.id/public/image/5cafda20fdbe6c3a18d6f1f7d7195280?option=thumbnail&size=50" 
            alt="Logo DAMRI" 
            className="w-12 h-12 object-contain"
          />
          <span className="text-2xl font-black text-blue-900 tracking-tighter uppercase italic">
            DAMRI <span className="text-yellow-500">FUTURE</span>
          </span>
        </div>

        
        <div className="hidden md:flex flex-1 justify-center gap-8 font-bold text-blue-900 text-sm uppercase">
          <a href="#hero" className="hover:text-blue-700 transition-all hover:scale-105">Beranda</a>
          <a href="#features" className="hover:text-blue-700 transition-all hover:scale-105">Layanan Tiket</a>
          <a href="#katalog" className="hover:text-blue-700 transition-all hover:scale-105 text-yellow-600">Katalog Produk</a>
          <a href="#about" className="hover:text-blue-700 transition-all hover:scale-105">Tentang Kami</a>
        </div>

        
        <div className="hidden md:flex justify-end min-w-[200px]">
          <a 
            href="#" 
            className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-all font-bold shadow-md uppercase text-sm"
          >
            Pesan Tiket
          </a>
        </div>
        
      </div>
    </nav>
  )
}