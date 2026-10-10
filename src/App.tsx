import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
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

const MainLayout: React.FC = () => {
  const { activePage } = useApp();

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
