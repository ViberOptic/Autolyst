// src/components/splash/FloatingElements.jsx
export default function FloatingElements({ fadeOut }) {
  return (
    <>
      {/* Cahaya Sorot Kiri Atas (Headlight effect) */}
      <div className={`absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
        fadeOut ? 'opacity-0 -translate-y-4' : 'opacity-100'
      }`} />
      
      {/* Cahaya Sorot Kanan Bawah */}
      <div className={`absolute bottom-0 right-0 w-40 sm:w-56 h-40 sm:h-56 bg-indigo-500/10 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
        fadeOut ? 'opacity-0 translate-y-4' : 'opacity-100'
      }`} style={{ animationDelay: '1s' }} />

      {/* Elemen Garis Kecepatan (Speed Lines) */}
      <div className={`absolute top-1/3 right-8 w-24 h-1 bg-gradient-to-l from-blue-200/30 to-transparent rounded-full blur-sm transition-all duration-1000 ${
        fadeOut ? 'opacity-0 translate-x-4' : 'opacity-100'
      }`} style={{ animationDelay: '0.5s' }} />
      
      <div className={`absolute bottom-1/3 left-8 w-32 h-1 bg-gradient-to-r from-indigo-200/30 to-transparent rounded-full blur-sm transition-all duration-1000 ${
        fadeOut ? 'opacity-0 -translate-x-4' : 'opacity-100'
      }`} style={{ animationDelay: '1.5s' }} />
    </>
  );
}