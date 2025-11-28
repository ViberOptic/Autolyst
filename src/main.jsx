// src/main.jsx
import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider, useAuth } from './context/AuthContext'; 
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import EVPage from './pages/EVPage';
import RecommendationPage from './pages/RecommendationPage';
import AboutPage from './pages/AboutPage';
import FavoritePage from './pages/FavoritePage';
import CarDetailPage from './pages/CarDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ManageCarsPage from './pages/ManageCarsPage'; 
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css'
import PWABadge from './PWABadge';

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState('home'); 
  const [selectedCarId, setSelectedCarId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    if (!showSplash && !authLoading) {
      if (!user) {
        if (page !== 'register') {
          setPage('login');
        }
      } else {
        if (page === 'login' || page === 'register') {
          setPage('home');
        }
      }
    }
  }, [user, authLoading, showSplash, page]);

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

  if (authLoading) {
    return <div className="min-h-screen bg-white" />;
  }

  const renderPage = () => {
    if (selectedCarId) return <CarDetailPage id={selectedCarId} onBack={handleBack} />;
    
    switch(page) {
      case 'home': return <HomePage onNavigate={setPage} onCarClick={handleCarClick} />;
      case 'ev': return <EVPage onCarClick={handleCarClick} />;
      case 'recommendation': return <RecommendationPage onCarClick={handleCarClick} />;
      case 'favorite': return <FavoritePage onCarClick={handleCarClick} onNavigate={setPage} />;
      case 'manage': return <ManageCarsPage />;
      case 'about': return <AboutPage onNavigate={setPage} />;
      case 'login': return <LoginPage onNavigate={setPage} />;
      case 'register': return <RegisterPage onNavigate={setPage} />;
      default: return <LoginPage onNavigate={setPage} />;
    }
  }

  const hideNavbar = selectedCarId || page === 'login' || page === 'register';

  return (
    <div className="min-h-screen bg-slate-50">
      {!hideNavbar && <DesktopNavbar currentPage={page} onNavigate={setPage} />}
      
      <main className={`min-h-screen ${!hideNavbar ? 'pb-24 md:pb-0' : ''}`}>
        {renderPage()}
      </main>

      {!hideNavbar && <MobileNavbar currentPage={page} onNavigate={setPage} />}
      
      <PWABadge />
    </div>
  );
}

function AppRoot() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)