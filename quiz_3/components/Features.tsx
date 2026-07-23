export default function Features() {
  const items = [
    { title: "Angkutan Bandara", desc: "Koneksi cepat dari pusat kota ke pelabuhan antariksa.", icon: "✈️" },
    { title: "Antar Kota (AKAP)", desc: "Perjalanan lintas provinsi dengan kenyamanan kelas eksekutif.", icon: "🚌" },
    { title: "Kawasan Logistik", desc: "Pengiriman paket cepat terintegrasi sistem smart city.", icon: "📦" }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Layanan Unggulan Kami</h2>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mb-12"></div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-left">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}