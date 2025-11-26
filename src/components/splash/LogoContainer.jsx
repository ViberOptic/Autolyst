// src/components/splash/LogoContainer.jsx
import logoUrl from '../../assets/LOGORN.png'; // Pastikan ini sudah logo Autolys

export default function LogoContainer() {
  return (
    <div className="mb-10 sm:mb-12 relative group">
      {/* Efek Glow di belakang logo */}
      <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-700" />
      
      <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-900/10 transform transition-all duration-700 group-hover:rotate-3 group-hover:scale-105 relative z-10">
        <img 
          src={logoUrl} 
          alt="Autolys Logo"
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter drop-shadow-md transform transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Aksen Metalik/Kilau */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />
    </div>
  );
}