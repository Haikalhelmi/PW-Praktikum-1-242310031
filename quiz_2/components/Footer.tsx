export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white border-t-8 border-yellow-400 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-12 text-sm">
        <div>
          <div className="text-2xl font-black italic mb-4 uppercase text-yellow-400">DAMRI FUTURE</div>
          <p className="text-blue-200">Kantor Pusat: Gedung Inovasi Mobilitas, Jakarta Pusat.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase">Informasi</h4>
          <ul className="space-y-2 text-blue-100">
            <li>Syarat & Ketentuan</li>
            <li>Kebijakan Privasi</li>
            <li>Panduan Tiket Online</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase">Kontak</h4>
          <p>Call Center: 1500-825</p>
          <p>Email: cs@damrifuture.co.id</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center text-[10px] uppercase tracking-widest font-bold text-blue-300">
        © 2026 DAMRI Future Industries. Haikal Helmi 242310031 Quiz 1 UTS Pemrograman Web. All rights reserved.
      </div>
    </footer>
  );
}