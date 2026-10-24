import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { AuthModal } from './components/common/AuthModal';
import { ProductDetailModal } from './components/pages/ProductDetailModal';
import { CartModal } from './components/pages/CartModal';
import { CheckoutModal } from './components/pages/CheckoutModal';

// Pages
import { HomePage } from './components/pages/HomePage';
import { StylistPage } from './components/pages/StylistPage';
import { DiscoverPage } from './components/pages/DiscoverPage';
import { WardrobePage } from './components/pages/WardrobePage';
import { OutfitBuilderPage } from './components/pages/OutfitBuilderPage';
import { OutfitPlannerPage } from './components/pages/OutfitPlannerPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { AboutPage } from './components/pages/AboutPage';
import { BusinessPlanPage } from './components/pages/BusinessPlanPage';
import { TeamOrgPage } from './components/pages/TeamOrgPage';
import { ContactPage } from './components/pages/ContactPage';
import { AuthPage } from './components/pages/AuthPage';
import { PageId } from './types';

const PROTECTED_PAGES: PageId[] = ['profile', 'wardrobe', 'builder', 'planner'];

const MainLayout: React.FC = () => {
  const { 
    activePage, 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode,
    currentUser,
    isAuthLoading 
  } = useApp();

  // Loading state while restoring session from localStorage/Supabase
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] text-[#1A1A1A]">
        <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-lg animate-pulse">
          S
        </div>
        <p className="font-serif text-sm font-semibold mt-4 text-[#8C7E6D]">
          Restoring StyleSync Session...
        </p>
      </div>
    );
  }

  // Route Gating: If unauthenticated user attempts to view a protected private page
  const isProtected = PROTECTED_PAGES.includes(activePage);
  if (!currentUser && isProtected) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#E8D8C8]">
        <Navbar />
        <main className="flex-1">
          <AuthPage redirectTarget={activePage} />
        </main>
        <Footer />
        <Toast />
      </div>
    );
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'stylist':
        return <StylistPage />;
      case 'discover':
        return <DiscoverPage />;
      case 'wardrobe':
        return <WardrobePage />;
      case 'builder':
        return <OutfitBuilderPage />;
      case 'planner':
        return <OutfitPlannerPage />;
      case 'profile':
        return <ProfilePage />;
      case 'about':
        return <AboutPage />;
      case 'business-plan':
        return <BusinessPlanPage />;
      case 'team':
        return <TeamOrgPage />;
      case 'contact':
        return <ContactPage />;
      case 'auth':
        return <AuthPage redirectTarget="profile" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#E8D8C8]">
      <Navbar />
      <main className="flex-1">
        {renderActivePage()}
      </main>
      <Footer />

      {/* Global Modals & Notifications */}
      <ProductDetailModal />
      <CartModal />
      <CheckoutModal />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultMode={authModalMode}
      />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
