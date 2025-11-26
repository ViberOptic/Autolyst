import { useCars } from '../hooks/useCars';
import HeroSection from '../components/home/HeroSection';
import FeaturedCarsSection from '../components/home/FeaturedCarsSection';

export default function HomePage({ onNavigate, onCarClick }) {
  const { cars: newArrivals } = useCars({ limit: 3 });
  const { cars: electricCars } = useCars({ category: 'Electric', limit: 3 });

  return (
    // PERBAIKAN: Hapus min-h-screen, bg-slate-50, dan pb-20.
    // Cukup div biasa karena main.jsx sudah mengatur layout.
    <div> 
      <HeroSection onNavigate={onNavigate} />
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <FeaturedCarsSection 
          title="Koleksi Terbaru" 
          cars={newArrivals} 
          onCarClick={onCarClick}
          linkLabel="Lihat Semua Katalog"
          onLinkClick={() => onNavigate('ev')} 
        />

        <FeaturedCarsSection 
          title="Masa Depan Listrik" 
          cars={electricCars} 
          onCarClick={onCarClick}
          linkLabel="Lihat Mobil Listrik"
          onLinkClick={() => onNavigate('ev')}
        />
      </div>
    </div>
  );
}