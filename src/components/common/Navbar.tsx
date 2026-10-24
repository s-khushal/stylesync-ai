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
  LogIn
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
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNav = (page: PageId) => {
    navigateTo(page);
    setMobileMenuOpen(false);
    setBusinessDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  const navLinks: { label: string; page: PageId; icon: React.ReactNode }[] = [
    { label: 'AI Stylist', page: 'stylist', icon: <Sparkles className="w-4 h-4 text-[#C86D51]" /> },
    { label: 'Discover', page: 'discover', icon: <Compass className="w-4 h-4" /> },
    { label: 'My Wardrobe', page: 'wardrobe', icon: <Layers className="w-4 h-4" /> },
    { label: 'Outfit Builder', page: 'builder', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Planner', page: 'planner', icon: <Calendar className="w-4 h-4" /> },
  ];

  const businessLinks: { label: string; page: PageId; icon: React.ReactNode }[] = [
    { label: 'Business Plan (6 Components)', page: 'business-plan', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Team & Organization Chart', page: 'team', icon: <Users className="w-4 h-4" /> },
    { label: 'About Startup', page: 'about', icon: <Info className="w-4 h-4" /> },
    { label: 'Contact & Feedback', page: 'contact', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const isBusinessActive = ['business-plan', 'team', 'about', 'contact'].includes(activePage);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE4DC] transition-all">
      {/* Top Bar with Cloud Status indicator */}
      <div className="bg-[#1A1A1A] text-[#EBE5DE] text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 font-medium tracking-wide flex items-center justify-end">
        {/* Cloud Status indicator in top bar */}
        <div className="flex items-center gap-2">
          {isCloudConnected ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
              <Cloud className="w-3 h-3 text-emerald-400" />
              <span>Supabase Cloud Connected</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-amber-300 text-[10px] bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800">
              <Cloud className="w-3 h-3 text-amber-400" />
              <span>Local Demo Mode (Guest)</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('home')} 
          className="cursor-pointer flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#38332E] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <span className="font-serif text-xl italic font-bold">S</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
              StyleSync
            </span>
            <span className="text-[10px] tracking-wider text-[#8C7E6D] uppercase font-medium">
              Your Wardrobe. Your Style. Smarter Choices.
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
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

          {/* Business & College Project Dropdown */}
          <div className="relative">
            <button
              onClick={() => setBusinessDropdownOpen(!businessDropdownOpen)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                isBusinessActive
                  ? 'bg-white text-[#C86D51] shadow-sm border border-[#E2DAD0] font-semibold'
                  : 'text-[#5C5245] hover:text-[#1A1A1A] hover:bg-[#F3EFE8]'
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#C86D51]" />
              <span>Project & Strategy</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {businessDropdownOpen && (
              <div 
                className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#EDE8E0] p-2 py-2.5 z-50 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setBusinessDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#9E9080] border-b border-[#F5F2EB] mb-1">
                  Management Course Components
                </div>
                {businessLinks.map((item) => (
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
          {/* Favourites */}
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

          {/* Authentication & User Dropdown */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE4] border border-[#E2DAD0] text-[#1A1A1A] transition-all text-xs font-semibold"
              >
                <div className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.fullName?.charAt(0) || currentUser.email.charAt(0).toUpperCase()}
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
                    <p className="text-xs font-bold text-[#1A1A1A] truncate">{currentUser.fullName || 'User'}</p>
                    <p className="text-[10px] text-[#8C7E6D] truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => handleNav('profile')}
                    className="w-full text-left px-3 py-2 text-xs text-[#4A4237] hover:bg-[#FAF8F5] rounded-xl flex items-center gap-2 mt-1"
                  >
                    <User className="w-4 h-4 text-[#C86D51]" /> Dashboard & Profile
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
          )}

          {/* Profile Quick Link */}
          <button
            onClick={() => handleNav('profile')}
            aria-label="User Profile"
            className={`p-2.5 rounded-xl transition-colors ${
              activePage === 'profile'
                ? 'bg-white shadow-sm border border-[#E2DAD0] text-[#C86D51]'
                : 'text-[#4A4237] hover:bg-[#F0EBE2]'
            }`}
            title="My Dashboard & Profile"
          >
            <User className="w-5 h-5" />
          </button>

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
                    <Cloud className="w-3 h-3" /> Cloud Synced
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
                <span className="text-xs text-[#6B5E50]">Guest / Local Demo Mode</span>
                <button
                  onClick={() => {
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
              Management Project & Strategy
            </div>
            {businessLinks.map((item) => (
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
