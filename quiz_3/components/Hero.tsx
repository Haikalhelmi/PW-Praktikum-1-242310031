export default function Hero() {
  return (
    <section id="hero" className="pt-40 pb-24 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            Menghubungkan Negeri <br/> <span className="text-yellow-400">Dengan Teknologi Otonom</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-lg">
            Hadir melayani bangsa dengan armada bus listrik pintar yang menghubungkan bandara, antar kota, dan lintas batas negara di era masa depan.
          </p>
          <button className="px-8 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg shadow-lg hover:bg-yellow-300 transition-all">
            Cek Jadwal Keberangkatan
          </button>
        </div>
        <div className="flex-1 h-80 relative overflow-hidden rounded-3xl border-2 border-blue-400/50 shadow-2xl shadow-blue-500/20">
          <img 
            src="https://cdn.antaranews.com/cache/1200x800/2021/11/25/IMG_20211125_125605.jpg" 
            alt="Armada Bus Listrik DAMRI" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/20 hover:bg-transparent transition-all duration-500"></div>
        </div>
      </div>
    </section>
  )
}