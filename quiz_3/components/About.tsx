export default function About() {
  return (
    <section id="about" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 uppercase italic border-l-8 border-yellow-400 pl-4">
            Jejak Langkah DAMRI Future
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Sejak dahulu, kami telah menjadi tulang punggung transportasi Indonesia. 
            Kini, di era 2077, kami bertransformasi menjadi penyedia layanan mobilitas 
            pintar berbasis energi terbarukan, menjangkau seluruh pelosok negeri hingga 
            wilayah perbatasan terjauh.
          </p>
        </div>
        <div className="flex-1 h-64 relative overflow-hidden rounded-3xl border-b-8 border-yellow-400 shadow-2xl group">
          <img 
            src="https://imgx.gridoto.com/crop/0x0:0x0/700x465/photo/gridoto/2018/05/07/3771064653.jpg" 
            alt="Sejarah DAMRI" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay Teks Visi */}
          <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center p-8 backdrop-blur-[2px]">
            <p className="text-white italic text-center font-bold text-lg leading-relaxed">
              &quot;Menjadi Perusahaan Transportasi Jalan Kelas Dunia yang Unggul dan Terintegrasi&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}