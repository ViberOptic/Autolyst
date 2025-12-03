// src/components/navbar/MobileNavbar.jsx
import { Home, Zap, Crown, Info, Heart } from 'lucide-react';

export default function MobileNavbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ev', label: 'EV', icon: Zap },
    { id: 'recommendation', label: 'Sultan', icon: Crown },
    { id: 'favorite', label: 'Favorit', icon: Heart },
    { id: 'about', label: 'About', icon: Info }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-5 gap-1 px-1 pb-2 w-full">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <IconComponent 
                size={20} 
                className={`mb-1 transition-transform duration-200 ${isActive ? 'scale-110 fill-current' : ''}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-semibold tracking-wide w-full text-center truncate px-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}