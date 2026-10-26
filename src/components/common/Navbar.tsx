import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Compass, 
  Layers, 
  Calendar, 
  Briefcase, 
  Users, 
  Info, 
  MessageSquare,
  Cloud,
  LogOut,
  LogIn,
  Palette
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    navigateTo, 
    cartCount, 
    favourites, 
    setIsCartOpen,
    currentUser,
    isCloudConnected,
    setIsAuthModalOpen,
    setAuthModalMode,
    signOut
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNav = (page: PageId) => {
    navigateTo(page);
    setMobileMenuOpen(false);
    setCompanyDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  const navLinks: { label: string; page: PageId; icon: React.ReactNode }[] = [
    { label: 'Discover', page: 'home', icon: <Compass className="w-4 h-4 text-[#C86D51]" /> },
    { label: 'AI Stylist', page: 'stylist', icon: <Sparkles className="w-4 h-4 text-[#C86D51]" /> },
    { label: 'Curated Shop', page: 'discover', icon: <ShoppingBag className="w-4 h-4" /> },
    { label: 'My Wardrobe', page: 'wardrobe', icon: <Layers className="w-4 h-4" /> },
    { label: 'Outfit Canvas', page: 'builder', icon: <Palette className="w-4 h-4" /> },
    { label: 'Weekly Planner', page: 'planner', icon: <Calendar className="w-4 h-4" /> },
  ];

  const companyLinks: { label: string; page: PageId; icon: React.ReactNode }[] = [
    { label: 'Our Philosophy', page: 'about', icon: <Info className="w-4 h-4 text-[#C86D51]" /> },
    { label: 'Leadership & Team', page: 'team', icon: <Users className="w-4 h-4" /> },
    { label: 'Business Model', page: 'business-plan', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Concierge & Feedback', page: 'contact', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const isCompanyActive = ['about', 'team', 'business-plan', 'contact'].includes(activePage);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE4DC] transition-all">
      {/* Top Startup Announcement Bar */}
      <div className="bg-[#1A1A1A] text-[#EDE7DF] text-xs py-2 px-4 sm:px-8 border-b border-[#332C26] flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#C86D51] text-white font-bold text-[10px] tracking-wider uppercase">
            Early Access
          </span>
          <span className="hidden sm:inline text-[#D4C9BC] text-xs">
            Experience algorithmic capsule wardrobe curation & personal styling.
          </span>
          <span className="sm:hidden text-[11px] text-[#D4C9BC]">
            Smart Wardrobe & AI Styling Studio
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-[#B8ACA0] shrink-0">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Styling Studio Live
          </span>
          {isCloudConnected ? (
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
              <Cloud className="w-3 h-3 text-emerald-400" />
              <span>Supabase Cloud Connected</span>
            </span>
          ) : (
            <span className="hidden md:inline-flex items-center gap-1 text-amber-300 text-[10px] bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800">
              <Cloud className="w-3 h-3 text-amber-400" />
              <span>Guest Session</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('home')} 
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#38332E] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <span className="font-serif text-2xl italic font-bold">S</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
              StyleSync
            </span>
            <span className="text-[10px] tracking-wider text-[#8C7E6D] uppercase font-semibold">
              Your Wardrobe. Your Style. Smarter Choices.
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navLinks.map((link) => {
            const isActive = activePage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-[#1A1A1A] shadow-sm border border-[#E2DAD0] font-semibold'
                    : 'text-[#5C5245] hover:text-[#1A1A1A] hover:bg-[#F3EFE8]'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            );
          })}

          {/* Company Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                isCompanyActive
                  ? 'bg-white text-[#C86D51] shadow-sm border border-[#E2DAD0] font-semibold'
                  : 'text-[#5C5245] hover:text-[#1A1A1A] hover:bg-[#F3EFE8]'
              }`}
            >
              <span>Company</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {companyDropdownOpen && (
              <div 
                className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#EDE8E0] p-2 z-50 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setCompanyDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#9E9080] border-b border-[#F5F2EB] mb-1">
                  StyleSync Ecosystem
                </div>
                {companyLinks.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => handleNav(item.page)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                      activePage === item.page
                        ? 'bg-[#FDF8F5] text-[#C86D51] font-semibold'
                        : 'text-[#4A4237] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span className="text-[#8C7E6D]">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Icons (Favourites, Cart, Profile/Auth, Mobile Menu) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Favourites / Wishlist */}
          <button
            onClick={() => handleNav('profile')}
            aria-label="Favourites"
            className="p-2.5 rounded-xl text-[#4A4237] hover:bg-[#F0EBE2] transition-colors relative"
            title="Saved Favourites"
          >
            <Heart className="w-5 h-5 text-[#5C5245]" />
            {favourites.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#C86D51] text-white text-[10px] font-bold flex items-center justify-center">
                {favourites.length}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            className="flex items-center gap-2 py-2 px-3.5 rounded-xl bg-[#1A1A1A] text-white hover:bg-[#333333] transition-all shadow-sm group"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold hidden sm:inline">Bag</span>
            <span className="bg-[#C86D51] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          </button>

          {/* Authentication & User Badge */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE4] border border-[#E2DAD0] text-[#1A1A1A] transition-all text-xs font-semibold"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#C86D51] to-[#E07A5F] text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline max-w-[100px] truncate">
                  {currentUser.fullName || currentUser.email.split('@')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-[#8C7E6D]" />
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#EDE8E0] p-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-[#F5F2EB]">
                    <p className="text-xs font-bold text-[#1A1A1A] truncate">{currentUser.fullName || 'Member'}</p>
                    <p className="text-[10px] text-[#8C7E6D] truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => handleNav('profile')}
                    className="w-full text-left px-3 py-2 text-xs text-[#4A4237] hover:bg-[#FAF8F5] rounded-xl flex items-center gap-2 mt-1"
                  >
                    <User className="w-4 h-4 text-[#C86D51]" /> Dashboard & Wardrobe
                  </button>
                  <button
                    onClick={() => {
                      signOut();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalMode('signin');
                  setIsAuthModalOpen(true);
                }}
                className="hidden sm:flex items-center gap-1.5 py-2 px-3 rounded-xl border border-[#DDD5CB] hover:bg-[#FAF8F5] text-[#1A1A1A] text-xs font-semibold transition-all shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => {
                  setAuthModalMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="hidden md:flex items-center gap-1.5 py-2 px-3 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
                <span>Get Started</span>
              </button>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-xl text-[#1A1A1A] hover:bg-[#EAE4DC]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E0D7CC] px-4 pt-2 pb-6 max-h-[85vh] overflow-y-auto shadow-2xl">
          {/* Auth Bar inside Mobile menu */}
          <div className="p-3 mb-3 bg-white rounded-2xl border border-[#EAE3D8] flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">{currentUser.fullName || currentUser.email}</p>
                  <p className="text-[10px] text-emerald-700 flex items-center gap-1">
                    <Cloud className="w-3 h-3" /> Cloud Member
                  </p>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-rose-600 px-3 py-1.5 rounded-xl border border-rose-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-[#6B5E50]">Welcome to StyleSync</span>
                <button
                  onClick={() => {
                    setAuthModalMode('signin');
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold bg-[#1A1A1A] text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" /> Sign In
                </button>
              </div>
            )}
          </div>

          <div className="space-y-1 mb-4">
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#8C7E6D]">
              Platform Navigation
            </div>
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 ${
                  activePage === link.page
                    ? 'bg-white shadow-sm border border-[#E0D7CC] text-[#C86D51] font-semibold'
                    : 'text-[#3D352E] hover:bg-[#F0EAE0]'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>

          <div className="border-t border-[#EAE3D8] pt-3 space-y-1">
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#8C7E6D]">
              Company & Philosophy
            </div>
            {companyLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 ${
                  activePage === item.page
                    ? 'bg-white shadow-sm border border-[#E0D7CC] text-[#C86D51] font-semibold'
                    : 'text-[#3D352E] hover:bg-[#F0EAE0]'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
