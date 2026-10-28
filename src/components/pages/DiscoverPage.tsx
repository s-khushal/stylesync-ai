import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Category, StyleTag, OccasionTag } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { Search, RotateCcw, Compass, ArrowUpDown } from 'lucide-react';

export const DiscoverPage: React.FC = () => {
  const { products, searchQuery, setSearchQuery } = useApp();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionTag | 'All'>('All');
  const [selectedStyle, setSelectedStyle] = useState<StyleTag | 'All'>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [priceMax, setPriceMax] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');

  // Sync with global search query when it changes
  useEffect(() => {
    if (searchQuery !== undefined && searchQuery !== searchTerm) {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery]);

  const categories: (Category | 'All')[] = [
    'All',
    'Tops',
    'Shirts',
    'T-shirts',
    'Trousers',
    'Jeans',
    'Dresses',
    'Jackets',
    'Footwear',
    'Accessories'
  ];

  const occasions: (OccasionTag | 'All')[] = [
    'All',
    'Work & Office',
    'Casual outing',
    'Party',
    'Formal meeting',
    'Wedding or celebration',
    'Travel',
    'Everyday wear'
  ];

  const styles: (StyleTag | 'All')[] = [
    'All',
    'Smart casual',
    'Casual',
    'Minimalist',
    'Streetwear',
    'Formal',
    'Traditional fusion'
  ];

  const colors = [
    'All',
    'Ivory',
    'Beige',
    'Terracotta',
    'Charcoal',
    'Blue',
    'Olive',
    'Black',
    'White',
    'Rust'
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. Search term match
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(term);
        const matchesDesc = item.description.toLowerCase().includes(term);
        const matchesCat = item.category.toLowerCase().includes(term);
        const matchesStyle = item.styles.some(s => s.toLowerCase().includes(term));
        const matchesColor = item.colors.some(c => c.toLowerCase().includes(term));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesStyle && !matchesColor) return false;
      }

      // 2. Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // 3. Occasion match
      if (selectedOccasion !== 'All' && !item.occasions.includes(selectedOccasion)) {
        return false;
      }

      // 4. Style match
      if (selectedStyle !== 'All' && !item.styles.includes(selectedStyle)) {
        return false;
      }

      // 5. Color match
      if (selectedColor !== 'All') {
        const hasColor = item.colors.some(c => c.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!hasColor) return false;
      }

      // 6. Price Max match
      if (item.price > priceMax) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.rating * b.reviewsCount - a.rating * a.reviewsCount; // Relevance
    });
  }, [products, searchTerm, selectedCategory, selectedOccasion, selectedStyle, selectedColor, priceMax, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedOccasion('All');
    setSelectedStyle('All');
    setSelectedColor('All');
    setPriceMax(2000);
    setSortBy('relevance');
  };

  const isFiltered = searchTerm !== '' || selectedCategory !== 'All' || selectedOccasion !== 'All' || selectedStyle !== 'All' || selectedColor !== 'All' || priceMax < 2000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] text-xs font-semibold text-[#8C533E]">
          <Compass className="w-3.5 h-3.5" />
          <span>Curated Fashion Storefront</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Curated Shop & Catalog
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5E50] max-w-2xl leading-relaxed">
          Explore versatile fashion essentials designed to mix-and-match effortlessly. Filter by garment category, occasion, style aesthetic, color palette, and budget.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white rounded-3xl p-6 border border-[#EDE8E0] shadow-sm space-y-6">
        {/* Top Controls: Search + Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-[#8C7E6D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSearchQuery(e.target.value);
              }}
              placeholder="Search garments by name, linen, denim, blazer, sneakers, kurta..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-4 flex items-center gap-2">
            <span className="text-xs font-semibold text-[#8C7E6D] shrink-0 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none font-medium cursor-pointer"
            >
              <option value="relevance">Relevance & Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7E6D] block mb-2">
            Garment Category
          </span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#5C5245] hover:bg-[#F0EBE2] border border-[#EAE3D8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters: Occasion, Style, Color, Price Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#F5F2EB]">
          {/* Occasion Filter */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C7E6D] block mb-1.5">
              Occasion
            </label>
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none cursor-pointer"
            >
              {occasions.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* Style Filter */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C7E6D] block mb-1.5">
              Style Tag
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none cursor-pointer"
            >
              {styles.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Color Filter */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C7E6D] block mb-1.5">
              Dominant Color
            </label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none cursor-pointer"
            >
              {colors.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C7E6D]">
                Max Price
              </label>
              <span className="text-xs font-bold text-[#1A1A1A]">
                ₹{priceMax.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="300"
              max="2000"
              step="50"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-[#C86D51] cursor-pointer"
            />
          </div>
        </div>

        {/* Results Counter and Reset Button */}
        <div className="flex items-center justify-between pt-2 border-t border-[#F5F2EB] text-xs">
          <span className="text-[#5C5245] font-medium">
            Showing <strong className="text-[#1A1A1A]">{filteredProducts.length}</strong> of {products.length} products
          </span>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#C86D51] hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-[#EDE8E0] p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D8] flex items-center justify-center text-[#8C7E6D] mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
            No Products Match Your Filter
          </h3>
          <p className="text-xs text-[#8C7E6D] max-w-sm mx-auto">
            Try adjusting your price ceiling, search keyword, or selecting "All" categories.
          </p>
          <button
            onClick={handleResetFilters}
            className="py-2.5 px-5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#333333] transition-all"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
