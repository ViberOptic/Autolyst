// src/main.jsx
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import EVPage from './pages/EVPage'; // Ini halaman katalog utama sekarang
import RecommendationPage from './pages/RecommendationPage';
import AboutPage from './pages/AboutPage';
import FavoritePage from './pages/FavoritePage';
import CarDetailPage from './pages/CarDetailPage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css'
import PWABadge from './PWABadge';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState('home'); 
  const [selectedCarId, setSelectedCarId] = useState(null);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleCarClick = (id) => {
    setSelectedCarId(id);
  };

  const handleBack = () => {
    setSelectedCarId(null);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const renderPage = () => {
    if (selectedCarId) return <CarDetailPage id={selectedCarId} onBack={handleBack} />;
    
    switch(page) {
      case 'home': return <HomePage onNavigate={setPage} onCarClick={handleCarClick} />;
      case 'ev': return <EVPage onCarClick={handleCarClick} />; // Menu EV -> EVPage
      case 'recommendation': return <RecommendationPage onCarClick={handleCarClick} />; // Menu Sultan
      case 'favorite': return <FavoritePage onCarClick={handleCarClick} onNavigate={setPage} />;
      case 'about': return <AboutPage />;
      default: return <HomePage />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {!selectedCarId && <DesktopNavbar currentPage={page} onNavigate={setPage} />}
      
      <main className="min-h-screen pb-20 md:pb-0">
        {renderPage()}
      </main>

      {!selectedCarId && <MobileNavbar currentPage={page} onNavigate={setPage} />}
      
      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)