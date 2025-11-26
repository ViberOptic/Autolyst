// src/pages/CarDetailPage.jsx
import { ArrowLeft, Calendar, Gauge, Fuel, Banknote, Zap } from 'lucide-react';
import { useCarDetail } from '../hooks/useCars';
import FavoriteButton from '../components/common/FavoriteButton';

export default function CarDetailPage({ id, onBack }) {
  // Mengambil data mobil berdasarkan ID menggunakan hook custom
  const { car, loading } = useCarDetail(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-500">Memuat spesifikasi...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Mobil tidak ditemukan</p>
          <button onClick={onBack} className="text-blue-600 font-medium hover:underline">
            Kembali ke Katalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header Gambar Full Width */}
      <div className="relative h-72 md:h-96 bg-slate-200">
        <img 
          src={car.image_url} 
          alt={car.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Tombol Kembali & Favorite di atas gambar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="p-2 bg-black/20 backdrop-blur-md hover:bg-black/30 text-white rounded-full transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          {/* Favorite Button */}
          <div className="p-2 bg-black/20 backdrop-blur-md rounded-full">
             <FavoriteButton recipeId={car.id} size="md" />
          </div>
        </div>

        {/* Judul & Harga di bagian bawah gambar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <span className="px-3 py-1 bg-blue-600 text-xs font-bold rounded-full uppercase tracking-wider mb-2 inline-block">
              {car.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-1">{car.name}</h1>
            <p className="text-slate-200 text-lg">{car.brand}</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 -mt-6 relative z-10">
        {/* Kartu Harga */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-slate-500 text-sm mb-1">Harga OTR (Estimasi)</p>
            <h2 className="text-3xl font-bold text-blue-700">{car.price}</h2>
          </div>
          <button className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors">
            Hubungi Dealer
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri: Deskripsi */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Tentang Kendaraan</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {car.description}
              </p>
            </section>

            {/* Spesifikasi Grid */}
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Spesifikasi Utama</h3>
              <div className="grid grid-cols-2 gap-4">
                <SpecItem 
                  icon={<Fuel className="w-5 h-5 text-blue-500" />}
                  label="Tipe Mesin"
                  value={car.engine}
                />
                <SpecItem 
                  icon={<Zap className="w-5 h-5 text-yellow-500" />}
                  label="Tenaga"
                  value={car.horsepower}
                />
                <SpecItem 
                  icon={<Gauge className="w-5 h-5 text-red-500" />}
                  label="Transmisi"
                  value="Automatic" // Contoh data statis tambahan
                />
                <SpecItem 
                  icon={<Calendar className="w-5 h-5 text-green-500" />}
                  label="Tahun Model"
                  value="2025"
                />
              </div>
            </section>
          </div>

          {/* Kolom Kanan: Informasi Tambahan (Simulasi) */}
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Highlights</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Garansi Resmi 5 Tahun
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Gratis Service 50.000 KM
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Asuransi All Risk 1 Tahun
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Komponen kecil untuk item spesifikasi agar kode lebih rapi
function SpecItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        <p className="font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}