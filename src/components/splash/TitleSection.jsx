// src/components/splash/TitleSection.jsx
export default function TitleSection({ fadeIn }) {
  return (
    <div className="text-center mb-10 sm:mb-14 px-4 relative z-10">
      <h1 className={`text-5xl xs:text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent mb-2 tracking-tighter leading-tight transform transition-all duration-1000 ${
        !fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        Autolys
      </h1>
      
      <div className={`h-1 w-24 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 transform transition-all duration-1000 ${
        !fadeIn ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
      }`} style={{ transitionDelay: '200ms' }} />

      <p className={`text-slate-500 text-sm xs:text-base sm:text-lg font-medium tracking-wide max-w-xs mx-auto transform transition-all duration-1000 ${
        !fadeIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`} style={{ transitionDelay: '400ms' }}>
        Katalog Mobil Masa Depan<br />
        <span className="text-xs sm:text-sm text-blue-600/80 font-semibold mt-1 block">
          Spesifikasi • Harga • Favorit
        </span>
      </p>
    </div>
  );
}