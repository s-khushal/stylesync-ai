import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, resetAllDemoData } = useApp();

  return (
    <footer className="bg-[#1C1A18] text-[#E5DFD7] border-t border-[#332F2A] mt-24">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-[#1C1A18] flex items-center justify-center font-serif text-lg font-bold">
                S
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                StyleSync <span className="text-[#E07A5F] font-sans text-xs uppercase px-1.5 py-0.5 bg-white/10 rounded">AI</span>
              </span>
            </div>
            <p className="text-xs text-[#A89F93] leading-relaxed max-w-sm">
              An intelligent fashion-tech platform combining AI-driven styling algorithms, personal wardrobe digital cataloging, outfit planning, and budget-conscious discovery for Indian college students and young professionals.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#2C2621] text-[#D8A47F] border border-[#3E342B]">
                <Sparkles className="w-3 h-3 text-[#E07A5F]" /> Essentials of Management • College Business Project
              </span>
            </div>
          </div>

          {/* Platform Pages */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase mb-3 text-[11px]">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs text-[#B5ABA0]">
              {[
                { label: 'AI Fashion Stylist', page: 'stylist' as PageId },
                { label: 'Discover Catalogue', page: 'discover' as PageId },
                { label: 'Digital Wardrobe', page: 'wardrobe' as PageId },
                { label: 'Interactive Outfit Builder', page: 'builder' as PageId },
                { label: 'Calendar Outfit Planner', page: 'planner' as PageId },
                { label: 'Profile & Live Stats', page: 'profile' as PageId },
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

          {/* Business & Management */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase mb-3 text-[11px]">
              Business Framework
            </h4>
            <ul className="space-y-2 text-xs text-[#B5ABA0]">
              {[
                { label: 'Business Plan (6 Pillars)', page: 'business-plan' as PageId },
                { label: 'Organizational Structure', page: 'team' as PageId },
                { label: 'Business Model & Vision', page: 'about' as PageId },
                { label: 'Customer Feedback & Contact', page: 'contact' as PageId },
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

          {/* Project Details & Reset Option */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase text-[11px]">
              Evaluator Tools
            </h4>
            <p className="text-xs text-[#9E9486] leading-relaxed">
              All wardrobe items, cart additions, generated outfits, and calendar plans persist in your browser's LocalStorage.
            </p>
            <button
              onClick={resetAllDemoData}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#2E2822] hover:bg-[#3D352E] text-xs font-semibold text-[#E5DFD7] border border-[#473D34] transition-all hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#E07A5F]" />
              Reset Demo State
            </button>
          </div>
        </div>
      </div>

      {/* Lower Bar */}
      <div className="border-t border-[#2D2824] bg-[#141210] py-6 px-4 text-center text-xs text-[#82786D]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © 2026 StyleSync AI — Built for College Business Presentation (Essentials of Management).
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Client-Side Local Rule-Based Recommendation Engine</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#E07A5F] fill-[#E07A5F]" /> React & Vite
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
