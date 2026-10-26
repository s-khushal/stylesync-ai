import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { Sparkles, ShieldCheck, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <footer className="bg-[#1C1A18] text-[#E5DFD7] border-t border-[#332F2A] mt-24">
        {/* Upper Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white text-[#1C1A18] flex items-center justify-center font-serif text-lg font-bold">
                  S
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  StyleSync
                </span>
              </div>
              <p className="text-xs text-[#A89F93] leading-relaxed max-w-sm">
                Intelligent digital wardrobe management and algorithmic personal styling. Engineered to help you dress with confidence while maximizing closet versatility.
              </p>
              <div className="pt-1 text-xs text-[#D8A47F] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
                <span>Your Wardrobe. Your Style. Smarter Choices.</span>
              </div>
            </div>

            {/* Platform Features */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase text-[11px]">
                Platform Features
              </h4>
              <ul className="space-y-2 text-xs text-[#B5ABA0]">
                {[
                  { label: 'AI Styling Studio', page: 'stylist' as PageId },
                  { label: 'Digital Closet', page: 'wardrobe' as PageId },
                  { label: 'Outfit Canvas', page: 'builder' as PageId },
                  { label: 'Weekly Planner', page: 'planner' as PageId },
                  { label: 'Curated Drops', page: 'discover' as PageId },
                ].map((item) => (
                  <li key={item.page}>
                    <button
                      onClick={() => navigateTo(item.page)}
                      className="hover:text-white transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curated Aesthetics */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase text-[11px]">
                Curated Aesthetics
              </h4>
              <ul className="space-y-2 text-xs text-[#B5ABA0]">
                {[
                  'Quiet Luxury',
                  'Contemporary Street',
                  'Smart Casual Work',
                  'Weekend Social',
                  'Resort & Travel',
                ].map((aesthetic) => (
                  <li key={aesthetic}>
                    <button
                      onClick={() => navigateTo('discover')}
                      className="hover:text-white transition-colors text-left"
                    >
                      {aesthetic}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company & Trust */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase text-[11px]">
                Company & Trust
              </h4>
              <ul className="space-y-2 text-xs text-[#B5ABA0]">
                <li>
                  <button
                    onClick={() => navigateTo('about')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Our Philosophy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('team')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Leadership & Team
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('business-plan')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Business Model
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setLegalModalType('privacy')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setLegalModalType('terms')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('contact')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Concierge Support
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lower Copyright Bar */}
        <div className="border-t border-[#2D2824] bg-[#141210] py-6 px-4 text-center text-xs text-[#82786D]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>
              © 2026 StyleSync Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Conscious Fashion Technology</span>
              <span>•</span>
              <span>Algorithmic Wardrobe Coordination</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy / Terms Modal */}
      {legalModalType && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLegalModalType(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#EDE8E0] shadow-2xl relative max-h-[85vh] overflow-y-auto text-[#1A1A1A]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setLegalModalType(null)} 
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EAE4DC] flex items-center justify-center text-[#1A1A1A] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            {legalModalType === 'privacy' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-serif text-xl font-bold">Privacy Policy & Wardrobe Security</h3>
                </div>
                <p className="text-xs text-[#6B5E50] leading-relaxed">
                  At StyleSync, your wardrobe photographs, garment metadata, and personal style parameters belong strictly to you.
                </p>
                <ul className="text-xs text-[#6B5E50] space-y-2 list-disc pl-5">
                  <li><strong>Zero Commercial Data Selling:</strong> We never monetize or sell your clothing photos, purchase budgets, or size measurements to advertising networks.</li>
                  <li><strong>Row-Level Security (RLS):</strong> Every user record in PostgreSQL is isolated behind cryptographically signed JWT sessions via Supabase Auth.</li>
                  <li><strong>Private Image Storage:</strong> Cloud wardrobe uploads are placed in user-isolated storage buckets with private read/write permissions.</li>
                  <li><strong>Data Portability & Erasure:</strong> You can export or permanently delete your digitized wardrobe history at any moment.</li>
                </ul>
              </div>
            )}

            {legalModalType === 'terms' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold">Terms of Service</h3>
                <p className="text-xs text-[#6B5E50] leading-relaxed">
                  Welcome to StyleSync. By accessing our platform, you agree to our styling and platform guidelines:
                </p>
                <ul className="text-xs text-[#6B5E50] space-y-2 list-disc pl-5">
                  <li><strong>Personal Non-Commercial Use:</strong> StyleSync algorithmic outfit suggestions and canvas features are provided for individual wardrobe coordination.</li>
                  <li><strong>Fair Platform Usage:</strong> Automated crawling or scraping of curated catalogue items, pricing data, or photography is prohibited.</li>
                  <li><strong>Intellectual Property:</strong> StyleSync algorithms, visual interface design, brand identity, and curated assets are protected trademarks.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
