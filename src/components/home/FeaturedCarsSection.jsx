// src/components/home/FeaturedCarsSection.jsx
import { useState, useEffect, useRef } from 'react';
import CarCard from '../CarCard'; // Pastikan import CarCard

export default function FeaturedCarsSection({ title, cars, onCarClick, linkLabel, onLinkClick }) {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef([]);

  // Logika Animasi: Mendeteksi saat elemen muncul di layar
  useEffect(() => {
    // Reset refs saat data cars berubah
    itemRefs.current = itemRefs.current.slice(0, cars.length);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          // Beri delay sedikit agar muncul berurutan (staggered effect)
          setTimeout(() => {
            setVisibleItems(prev => new Set(prev).add(index));
          }, (index % 3) * 150); 
        }
      });
    }, { threshold: 0.1 });

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [cars]);

  if (!cars || cars.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{title}</h2>
        {linkLabel && (
          <button 
            onClick={onLinkClick}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 hover:underline"
          >
            {linkLabel}
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <div 
            key={car.id} 
            ref={el => itemRefs.current[index] = el}
            className={`transform transition-all duration-700 ${
              visibleItems.has(index) 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-12 opacity-0'
            }`}
          >
            {/* Render component CarCard di sini */}
            <CarCard car={car} onClick={onCarClick} />
          </div>
        ))}
      </div>
    </section>
  );
}