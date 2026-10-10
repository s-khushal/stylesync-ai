import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Layers, 
  Calendar, 
  Leaf, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle,
  Briefcase
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, products } = useApp();

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE4] border border-[#E5DACD] text-xs font-semibold text-[#8C533E]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Fashion Technology Startup</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.15]">
                Discover Your Style. <br />
                <span className="italic font-normal text-[#C86D51]">Let AI Do the Thinking.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#5C5245] leading-relaxed max-w-xl font-normal">
                StyleSync AI combines personal rule-based styling, digital wardrobe cataloging, and smart budget recommendations. Built for college students and young professionals across India who want to look confident every day without morning outfit paralysis.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => navigateTo('stylist')}
                  className="py-4 px-8 rounded-2xl bg-[#1A1A1A] hover:bg-[#333333] text-white text-sm font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-[#E07A5F] group-hover:rotate-12 transition-transform" />
                  Get My Style
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigateTo('discover')}
                  className="py-4 px-8 rounded-2xl bg-white hover:bg-[#FAF8F5] text-[#1A1A1A] text-sm font-semibold tracking-wider uppercase border border-[#DDD5CB] hover:border-[#1A1A1A] transition-all flex items-center gap-2 shadow-sm"
                >
                  <Compass className="w-4 h-4 text-[#8C7E6D]" />
                  Explore Fashion
                </button>
              </div>

              {/* Metrics / Pillars */}
              <div className="pt-8 border-t border-[#EAE3D8] grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-2xl font-serif font-bold text-[#1A1A1A]">28+</div>
                  <div className="text-xs text-[#8C7E6D] mt-0.5">Curated Catalogue Items</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#1A1A1A]">₹800+</div>
                  <div className="text-xs text-[#8C7E6D] mt-0.5">Budget-Friendly Combos</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#1A1A1A]">100%</div>
                  <div className="text-xs text-[#8C7E6D] mt-0.5">Private Local Storage</div>
                </div>
              </div>
            </div>

            {/* Right Fashion Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#EDE8E0] bg-white aspect-[3/4]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                    alt="StyleSync editorial styling"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Stylist Recommendation Pill */}
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#EAE3D8] max-w-xs animate-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-bold text-[#C86D51] uppercase tracking-wider">
                      AI Stylist Match
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#1A1A1A]">
                    Campus Presentation • Smart Casual
                  </p>
                  <p className="text-[11px] text-[#8C7E6D] mt-0.5">
                    Linen shirt + Pleated slacks + Court sneakers
                  </p>
                </div>

                {/* Floating Tag */}
                <div className="absolute -top-4 -right-4 bg-[#1A1A1A] text-white py-2 px-3.5 rounded-xl shadow-lg text-xs font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
                  <span>College Capsule 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW THE PLATFORM WORKS */}
      <section className="bg-white py-20 border-y border-[#EDE8E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
              Intuitive 4-Step Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-2">
              How StyleSync AI Works
            </h2>
            <p className="text-sm text-[#7A6B5D] mt-3">
              Combining individual preferences with systematic wardrobe management to eliminate decision fatigue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Digitize Wardrobe',
                desc: 'Upload snaps of your existing shirts, jeans, and shoes. Tag colors and seasons with private local storage.',
                icon: <Layers className="w-6 h-6 text-[#C86D51]" />
              },
              {
                step: '02',
                title: 'Set Your Context',
                desc: 'Pick your occasion (presentation, college fest, party), desired aesthetic, and your maximum spending limit.',
                icon: <Sparkles className="w-6 h-6 text-[#C86D51]" />
              },
              {
                step: '03',
                title: 'Algorithmic Styling',
                desc: 'Our scoring engine matches complimentary colors, silhouettes, and pieces with transparent reasoning.',
                icon: <TrendingUp className="w-6 h-6 text-[#C86D51]" />
              },
              {
                step: '04',
                title: 'Plan & Synchronize',
                desc: 'Save complete outfits into your weekly calendar so you never have to think about what to wear in the morning.',
                icon: <Calendar className="w-6 h-6 text-[#C86D51]" />
              }
            ].map((item) => (
              <div 
                key={item.step}
                className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D8] hover:border-[#1A1A1A] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E0D7CC] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="font-serif text-3xl font-bold text-[#DCD4C8] group-hover:text-[#C86D51] transition-colors">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B5E50] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DUAL PILLARS: AI STYLIST & DIGITAL WARDROBE INTRO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Card 1: AI Stylist */}
          <div className="bg-[#FAF6F0] rounded-3xl p-8 sm:p-10 border border-[#E5DACD] flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-semibold text-[#C86D51] border border-[#E2D8CC]">
                <Sparkles className="w-3.5 h-3.5" /> Core Innovation
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                The AI Fashion Stylist
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5245] leading-relaxed">
                Tired of standing in front of an open closet wondering what matches? Our transparent rule-based algorithm pairs tops, bottoms, layers, and footwear based on occasion dress codes, color harmony, and budget.
              </p>
              <ul className="space-y-2 text-xs text-[#4A4237] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Occasion-aware matching (College, Presentations, Travel, Parties)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Budget threshold enforcement in INR (₹)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Transparent styling logic explained for every single item</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => navigateTo('stylist')}
                className="py-3 px-6 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 shadow-md"
              >
                Launch Recommendation Engine <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Digital Wardrobe */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EDE8E0] flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2EB] text-xs font-semibold text-[#5C5245] border border-[#E0D7CC]">
                <Layers className="w-3.5 h-3.5 text-[#C86D51]" /> Smart Inventory
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                My Digital Wardrobe
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5245] leading-relaxed">
                Take back control of clothes you already own. Catalog your collection, reduce impulse purchases that clash with your closet, and build capsule combinations effortlessly.
              </p>
              <ul className="space-y-2 text-xs text-[#4A4237] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Instant image uploads with browser localStorage persistence</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Categorize by silhouette, dominant color, and season</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Zero external tracking — privacy prioritized by design</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => navigateTo('wardrobe')}
                className="py-3 px-6 rounded-xl bg-[#FAF8F5] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white border border-[#DDD5CB] hover:border-[#1A1A1A] text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2"
              >
                Open My Wardrobe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED CATALOGUE PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
              Autumn / Campus 2026
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mt-1">
              Featured Trend Staples
            </h2>
            <p className="text-xs text-[#7A6B5D] mt-1">
              High-utility, versatile essentials designed to mix-and-match across college and casual settings.
            </p>
          </div>

          <button
            onClick={() => navigateTo('discover')}
            className="mt-4 md:mt-0 text-xs font-semibold text-[#1A1A1A] hover:text-[#C86D51] flex items-center gap-1.5 transition-colors"
          >
            View Complete Catalogue (28 Items) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. SUSTAINABILITY & SMART SHOPPING */}
      <section className="bg-[#FAF5EE] py-16 border-y border-[#EAE0D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#EFE4D6] flex items-center justify-center text-[#8C533E] shrink-0">
                <Leaf className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C533E]">
                  Responsible Fashion Tech
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                  Wear More. Buy Smarter.
                </h3>
              </div>
            </div>

            <div className="lg:col-span-8 text-xs sm:text-sm text-[#5C5245] leading-relaxed space-y-2">
              <p>
                Fast-fashion cycles create enormous textile waste and strain student budgets with impulse purchases worn only once. StyleSync AI advocates for the <strong>Capsule Wardrobe Philosophy</strong>—encouraging users to re-wear, restyle, and combine existing clothes before buying new items.
              </p>
              <p className="text-xs text-[#8C7E6D]">
                When new pieces are recommended, our scoring logic emphasizes timeless versatility and multi-occasion reusability over fleeting micro-trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COLLEGE PROJECT EVALUATION BANNER (ESSENTIALS OF MANAGEMENT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1A18] text-white rounded-3xl p-8 sm:p-12 border border-[#38332E] shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C86D51] text-white text-[11px] font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" /> College Project Documentation
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Prepared for Essentials of Management
            </h2>
            <p className="text-xs sm:text-sm text-[#B5ABA0] leading-relaxed">
              Explore the dedicated 6-pillar strategic business plan, 12-person startup organizational hierarchy, risk analysis, contingency matrix, and live interactive prototype ready for presentation to your professor.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('business-plan')}
                className="py-3 px-6 rounded-xl bg-white hover:bg-[#F5F2EB] text-[#1A1A1A] text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
              >
                View 6-Component Business Plan <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigateTo('team')}
                className="py-3 px-6 rounded-xl bg-[#2D2824] hover:bg-[#3D352E] text-white text-xs font-bold tracking-wider uppercase border border-[#4A423A] transition-all flex items-center gap-2"
              >
                View Organization Chart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
