import React, { useState } from 'react';
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
  Heart,
  Sliders,
  ArrowUpRight,
  X
} from 'lucide-react';

interface CuratedLook {
  id: string;
  category: 'work' | 'brunch' | 'evening' | 'travel';
  categoryLabel: string;
  badge: string;
  title: string;
  desc: string;
  price: string;
  score: string;
  image: string;
}

const CURATED_LOOKS: CuratedLook[] = [
  {
    id: 'look-1',
    category: 'work',
    categoryLabel: 'Work & Creative Meetings',
    badge: 'Tailored Ease',
    title: 'Structured Sand Blazer & Ivory Knit',
    desc: 'Relaxed double-breasted silhouette balanced with breathable ribbed knit and tapered wool trousers.',
    price: '₹6,890',
    score: '98% Fit Score',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-2',
    category: 'brunch',
    categoryLabel: 'Weekend Social & Brunch',
    badge: 'Weekend Casual',
    title: 'Warm Ochre & Relaxed Ecru Denim',
    desc: 'Effortless sunshine tone layered over high-waisted ecru wide-leg jeans with minimal leather slides.',
    price: '₹4,450',
    score: '95% Fit Score',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-3',
    category: 'evening',
    categoryLabel: 'Cocktail & Evening Chic',
    badge: 'Evening Sleek',
    title: 'Charcoal Wool Long Coat & Heeled Boots',
    desc: 'Monochrome elegance with sharp lapels, brushed brass jewelry accents, and structured leather crossbody bag.',
    price: '₹8,990',
    score: '97% Fit Score',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-4',
    category: 'travel',
    categoryLabel: 'Resort & Travel Getaway',
    badge: 'Resort Minimal',
    title: 'Organic Linen Co-Ord & Woven Tote',
    desc: 'Breezy natural fibers in terracotta and sand hues engineered for tropical getaways and seaside afternoons.',
    price: '₹5,200',
    score: '93% Fit Score',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-5',
    category: 'work',
    categoryLabel: 'Work & Creative Meetings',
    badge: 'Quiet Luxury',
    title: 'Camel Wool Trench & Silk Slip',
    desc: 'Timeless outerwear over flowing midi silk, paired with handcrafted leather mules and structured eyewear.',
    price: '₹9,450',
    score: '99% Fit Score',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'look-6',
    category: 'brunch',
    categoryLabel: 'Weekend Social & Brunch',
    badge: 'City Streetwear',
    title: 'Clean Neutral Streetwear Set',
    desc: 'Boxy crewneck fleece combined with relaxed utility cargo pants and vintage white leather runners.',
    price: '₹3,890',
    score: '92% Fit Score',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80'
  }
];

export const HomePage: React.FC = () => {
  const { navigateTo, products, showToast } = useApp();
  const [occasionFilter, setOccasionFilter] = useState<'all' | 'work' | 'brunch' | 'evening' | 'travel'>('all');
  const [likedLooks, setLikedLooks] = useState<string[]>([]);
  const [selectedLook, setSelectedLook] = useState<CuratedLook | null>(null);

  const featuredProducts = products.slice(0, 4);

  const toggleLookLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedLooks.includes(id)) {
      setLikedLooks(prev => prev.filter(l => l !== id));
      showToast('Removed look from favorites', 'info');
    } else {
      setLikedLooks(prev => [...prev, id]);
      showToast('Look saved to your curated inspirations!', 'success');
    }
  };

  const filteredLooks = occasionFilter === 'all' 
    ? CURATED_LOOKS 
    : CURATED_LOOKS.filter(l => l.category === occasionFilter);

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] text-xs font-semibold text-[#8C533E]">
                <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>Intelligent Wardrobe Architecture • Fall / Winter '26</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.12]">
                Your Closet, Curated. <br />
                <span className="italic font-normal text-[#C86D51]">Smarter Choices Every Day.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#5C5245] leading-relaxed max-w-xl font-normal">
                StyleSync bridges the gap between physical wardrobes and algorithmic styling. Digitize what you own, discover versatile essentials, and eliminate daily outfit decision fatigue.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => navigateTo('stylist')}
                  className="py-4 px-7 rounded-2xl bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-xl hover:-translate-y-0.5 flex items-center gap-2.5 group"
                >
                  <Sparkles className="w-4 h-4 text-[#E07A5F] group-hover:rotate-12 transition-transform" />
                  <span>Launch AI Stylist</span>
                  <ArrowRight className="w-4 h-4 text-[#A89F93] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigateTo('wardrobe')}
                  className="py-4 px-7 rounded-2xl bg-white hover:bg-[#FAF8F5] text-[#1A1A1A] text-xs font-bold tracking-wider uppercase border border-[#DDD5CB] hover:border-[#1A1A1A] transition-all flex items-center gap-2 shadow-sm"
                >
                  <Layers className="w-4 h-4 text-[#C86D51]" />
                  <span>Open Digital Closet</span>
                </button>
              </div>

              {/* Startup Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#EAE3D8] max-w-lg">
                <div>
                  <div className="text-2xl font-serif font-bold text-[#1A1A1A]">10,000+</div>
                  <div className="text-xs text-[#8C7E6D] mt-0.5">Outfits Generated</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#C86D51]">94%</div>
                  <div className="text-xs text-[#8C7E6D] mt-0.5">Color Harmony Avg.</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#1A1A1A]">3.5x</div>
                  <div className="text-xs text-[#8C7E6D] mt-0.5">More Wear Per Item</div>
                </div>
              </div>
            </div>

            {/* Right Fashion Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#EDE8E0] bg-white aspect-[4/5]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
                    alt="StyleSync editorial styling"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Floating Stylist Recommendation Pill */}
                <div className="absolute -bottom-6 -left-6 sm:bottom-6 sm:-left-8 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-[#EAE3D8] max-w-[270px] space-y-2 animate-in slide-in-from-bottom-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51] bg-[#FDF2EC] px-2 py-0.5 rounded-full border border-[#F6D8C8]">
                      AI Match 96%
                    </span>
                    <span className="text-[11px] text-[#8C7E6D]">Smart Casual</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#1A1A1A]">Parisian Minimalist Look</h4>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#E5D7C5] border border-black/10" title="Warm Sand"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#342E28] border border-black/10" title="Espresso"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#FAF7F2] border border-black/10" title="Ivory Linen"></span>
                    <span className="text-[10px] text-[#8C7E6D] ml-auto font-medium">3 Owned • 1 New</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OCCASION MOOD CURATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
            Occasion Intelligence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            Curated For How You Actually Live
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6B5D]">
            Whether leading high-stakes meetings or relaxing over Sunday brunch, discover outfits tailored to the mood and dress code.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Curations' },
            { id: 'work', label: 'Work & Creative Meetings' },
            { id: 'brunch', label: 'Weekend Social & Brunch' },
            { id: 'evening', label: 'Cocktail & Evening Chic' },
            { id: 'travel', label: 'Resort & Travel Getaway' },
          ].map(chip => (
            <button
              key={chip.id}
              onClick={() => setOccasionFilter(chip.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                occasionFilter === chip.id
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-white hover:bg-[#FAF8F5] border border-[#EDE8E0] text-[#6B5E50]'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Curated Lookbook Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLooks.map((look) => (
            <div 
              key={look.id}
              onClick={() => setSelectedLook(look)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EDE8E0] shadow-sm hover:shadow-xl transition-all flex flex-col cursor-pointer"
            >
              <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden">
                <ImageWithFallback 
                  src={look.image} 
                  alt={look.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#1A1A1A] uppercase tracking-wider border border-[#EDE8E0]">
                  {look.badge}
                </div>
                <button 
                  onClick={(e) => toggleLookLike(look.id, e)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1A1A1A] hover:text-[#C86D51] transition-colors shadow-sm"
                >
                  <Heart className={`w-4 h-4 ${likedLooks.includes(look.id) ? 'fill-[#C86D51] text-[#C86D51]' : ''}`} />
                </button>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C7E6D] mb-1">
                    <span>{look.categoryLabel}</span>
                    <span className="text-[#C86D51] font-semibold">{look.score}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A] group-hover:text-[#C86D51] transition-colors">
                    {look.title}
                  </h3>
                  <p className="text-xs text-[#6B5E50] mt-1 leading-relaxed">
                    {look.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F5F2EB] flex items-center justify-between">
                  <span className="font-serif text-base font-bold text-[#1A1A1A]">
                    {look.price} <span className="text-xs font-normal text-[#8C7E6D]">look total</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] group-hover:bg-[#F3ECE4] border border-[#EDE8E0] text-xs font-bold text-[#1A1A1A] transition-colors flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C86D51]" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 4-STEP ALGORITHMIC FLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#EDE8E0] shadow-sm space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
              Algorithmic Wardrobe Flow
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              How StyleSync Works
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6B5D] leading-relaxed">
              Transforming scattered clothes and impulse shopping into an intentional, highly versatile personal aesthetic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Digitize What You Own',
                desc: 'Snap or upload items from your closet. Our smart catalog automatically tags color palettes, fit, and seasonality.'
              },
              {
                step: '02',
                title: 'Define Your Occasion',
                desc: 'Select where you\'re headed—work conference, weekend escape, or dinner—with your target budget.'
              },
              {
                step: '03',
                title: 'Color & Harmony Scoring',
                desc: 'Our algorithmic engine matches pieces using real color temperature, silhouette balance, and texture contrast.'
              },
              {
                step: '04',
                title: 'Schedule & Wear',
                desc: 'Assign curated looks to your weekly calendar. Step out every morning in 2 minutes with absolute style confidence.'
              }
            ].map((item) => (
              <div 
                key={item.step}
                className="space-y-3 p-5 rounded-2xl bg-[#FAF8F5] border border-[#EDE8E0] hover:border-[#C86D51] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>
                <h3 className="font-serif text-base font-bold text-[#1A1A1A]">{item.title}</h3>
                <p className="text-xs text-[#6B5E50] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED CATALOGUE PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
              Curated Wardrobe Drops
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mt-1">
              Featured Trend Staples
            </h2>
            <p className="text-xs text-[#7A6B5D] mt-1">
              High-utility, versatile essentials designed to mix-and-match across work and weekend settings.
            </p>
          </div>

          <button
            onClick={() => navigateTo('discover')}
            className="mt-4 md:mt-0 text-xs font-semibold text-[#1A1A1A] hover:text-[#C86D51] flex items-center gap-1.5 transition-colors"
          >
            View Complete Catalogue ({products.length} Items) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. CAPSULE PHILOSOPHY EDITORIAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#221F1C] text-white rounded-3xl overflow-hidden shadow-2xl border border-[#3E342B] p-8 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C86D51] text-white text-[10px] font-bold uppercase tracking-wider">
                <Leaf className="w-3 h-3" /> Conscious Fashion Technology
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-white">
                Wear More. Buy Smarter. <br />
                <span className="text-[#D8A47F] font-normal italic">The Capsule Wardrobe Algorithm.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#C8BCAC] leading-relaxed max-w-xl">
                The average person wears only 20% of their closet 80% of the time. StyleSync optimizes item reusability, proving that 12 intentional, well-coordinated pieces can generate over 48 distinct, elevated looks.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button 
                  onClick={() => navigateTo('stylist')} 
                  className="py-3 px-6 rounded-xl bg-white text-[#1A1A1A] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF8F5] transition-colors"
                >
                  Try AI Capsule Generator
                </button>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="py-3 px-6 rounded-xl bg-[#3D352E] text-white text-xs font-bold uppercase tracking-wider border border-[#52463B] hover:bg-[#4D4238] transition-colors"
                >
                  Read Our Philosophy
                </button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#52463B] shadow-2xl aspect-[4/3]">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80" 
                  alt="Capsule Wardrobe rack" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Look Inspection Modal */}
      {selectedLook && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedLook(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#EDE8E0] shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedLook(null)} 
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EAE4DC] flex items-center justify-center text-[#1A1A1A] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF8F5]">
                <ImageWithFallback src={selectedLook.image} alt={selectedLook.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#C86D51] font-bold">{selectedLook.categoryLabel}</span>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-0.5">{selectedLook.title}</h3>
                  <p className="font-serif text-lg font-bold text-[#1A1A1A] mt-1">{selectedLook.price} <span className="text-xs font-normal text-[#8C7E6D]">(Full Look Investment)</span></p>
                </div>
                <p className="text-xs text-[#6B5E50] leading-relaxed">
                  Curated as a versatile capsule coordination. Every piece can be styled individually with staple wardrobe items.
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE8E0] text-xs space-y-1">
                  <span className="font-bold text-[#1A1A1A] block">Stylist Pairing Score: {selectedLook.score}</span>
                  <span className="text-[#8C7E6D]">Occasion fit: High • Versatility rating: 9.4/10</span>
                </div>
                <button 
                  onClick={() => {
                    setSelectedLook(null);
                    navigateTo('stylist');
                  }} 
                  className="w-full py-3.5 rounded-2xl bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Load Into AI Styling Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
