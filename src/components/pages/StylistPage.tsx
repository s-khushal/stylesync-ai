import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OccasionTag, StyleTag, SeasonTag, OutfitPiece } from '../../types';
import { StylistCriteria, generateOutfitRecommendation, rankCandidatesForSlot } from '../../utils/stylistEngine';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { 
  Sparkles, 
  RotateCcw, 
  Bookmark, 
  RefreshCw, 
  Check, 
  ShoppingBag, 
  Info, 
  ArrowRight,
  Sliders,
  DollarSign
} from 'lucide-react';

export const StylistPage: React.FC = () => {
  const { products, saveOutfit, addToCart, showToast, navigateTo, userProfile } = useApp();

  // Criteria state
  const [occasion, setOccasion] = useState<OccasionTag>('Casual outing');
  const [style, setStyle] = useState<StyleTag>('Smart casual');
  const [budgetMax, setBudgetMax] = useState<number>(6500);
  const [preferredColors, setPreferredColors] = useState<string[]>(['Ivory', 'Terracotta', 'Beige']);
  const [season, setSeason] = useState<SeasonTag>('All-Season');
  const [includeCategories, setIncludeCategories] = useState({
    top: true,
    bottom: true,
    footwear: true,
    outerwear: true,
    accessory: true,
  });

  const [seedOffset, setSeedOffset] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedOutfit, setGeneratedOutfit] = useState<{
    top?: OutfitPiece;
    bottom?: OutfitPiece;
    footwear?: OutfitPiece;
    outerwear?: OutfitPiece;
    accessory?: OutfitPiece;
    totalPrice: number;
  } | null>(() => {
    // Generate initial look on first render
    const initialCriteria: StylistCriteria = {
      occasion: 'Casual outing',
      style: 'Smart casual',
      budgetMax: 6500,
      preferredColors: ['Ivory', 'Terracotta', 'Beige'],
      season: 'All-Season',
      includeCategories: {
        top: true,
        bottom: true,
        footwear: true,
        outerwear: true,
        accessory: true,
      }
    };
    return generateOutfitRecommendation(products, initialCriteria, 0);
  });

  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [customOutfitName, setCustomOutfitName] = useState('My AI Curated Ensemble');

  const occasions: OccasionTag[] = [
    'College',
    'Casual outing',
    'Party',
    'Formal meeting',
    'Wedding or celebration',
    'Travel',
    'Everyday wear'
  ];

  const styles: StyleTag[] = [
    'Smart casual',
    'Casual',
    'Minimalist',
    'Streetwear',
    'Formal',
    'Traditional fusion'
  ];

  const seasons: SeasonTag[] = ['All-Season', 'Summer', 'Winter', 'Monsoon', 'Spring'];

  const colorOptions = [
    { label: 'Ivory / Off-White', value: 'Ivory' },
    { label: 'Terracotta / Rust', value: 'Terracotta' },
    { label: 'Beige / Tan', value: 'Beige' },
    { label: 'Charcoal / Black', value: 'Charcoal' },
    { label: 'Sky / Navy Blue', value: 'Blue' },
    { label: 'Sage / Olive Green', value: 'Olive' },
  ];

  const handleGenerate = (newSeed = 0) => {
    setIsGenerating(true);
    setSeedOffset(newSeed);

    setTimeout(() => {
      const criteria: StylistCriteria = {
        occasion,
        style,
        budgetMax,
        preferredColors,
        season,
        includeCategories
      };

      const result = generateOutfitRecommendation(products, criteria, newSeed);
      setGeneratedOutfit(result);
      setCustomOutfitName(`${style} look for ${occasion}`);
      setIsGenerating(false);
      showToast('AI Stylist generated a fresh outfit!', 'success');
    }, 400);
  };

  const handleReplacePiece = (slot: 'top' | 'bottom' | 'footwear' | 'outerwear' | 'accessory') => {
    if (!generatedOutfit) return;
    const criteria: StylistCriteria = {
      occasion,
      style,
      budgetMax,
      preferredColors,
      season,
      includeCategories
    };

    const candidates = rankCandidatesForSlot(products, slot, criteria, seedOffset + 1);
    if (candidates.length <= 1) {
      showToast(`No alternative ${slot} found in catalogue`, 'info');
      return;
    }

    // Pick candidate different from current
    const currentId = generatedOutfit[slot]?.id;
    const nextCandidate = candidates.find(c => c.product.id !== currentId) || candidates[0];

    const updatedPiece: OutfitPiece = {
      id: nextCandidate.product.id,
      name: nextCandidate.product.name,
      category: nextCandidate.product.category,
      slot: nextCandidate.product.slot,
      image: nextCandidate.product.image,
      price: nextCandidate.product.price,
      source: 'catalogue',
      reason: nextCandidate.reason
    };

    const oldPrice = generatedOutfit[slot]?.price || 0;
    const newTotal = generatedOutfit.totalPrice - oldPrice + nextCandidate.product.price;

    setGeneratedOutfit({
      ...generatedOutfit,
      [slot]: updatedPiece,
      totalPrice: newTotal
    });

    showToast(`Swapped ${slot} with ${nextCandidate.product.name}`, 'info');
  };

  const handleSaveCompleteOutfit = () => {
    if (!generatedOutfit) return;
    saveOutfit({
      name: customOutfitName.trim() || `${style} for ${occasion}`,
      occasion,
      style,
      top: generatedOutfit.top,
      bottom: generatedOutfit.bottom,
      footwear: generatedOutfit.footwear,
      outerwear: generatedOutfit.outerwear,
      accessory: generatedOutfit.accessory,
      totalPrice: generatedOutfit.totalPrice,
      notes: `Generated by StyleSync recommendation engine for ₹${generatedOutfit.totalPrice.toLocaleString('en-IN')}`
    });
    setSaveModalOpen(false);
  };

  const handleAddAllToCart = () => {
    if (!generatedOutfit) return;
    const pieces = [
      generatedOutfit.top,
      generatedOutfit.bottom,
      generatedOutfit.footwear,
      generatedOutfit.outerwear,
      generatedOutfit.accessory,
    ].filter(Boolean) as OutfitPiece[];

    pieces.forEach(piece => {
      const prod = products.find(p => p.id === piece.id);
      if (prod) addToCart(prod, 'M', 1);
    });

    showToast(`Added ${pieces.length} outfit items to shopping bag!`, 'success');
  };

  const toggleColor = (cVal: string) => {
    setPreferredColors(prev => 
      prev.includes(cVal) ? prev.filter(c => c !== cVal) : [...prev, cVal]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] text-xs font-semibold text-[#8C533E]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Algorithmic Styling Engine</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A]">
          AI Fashion Stylist
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5E50] leading-relaxed">
          Select your destination occasion, style aesthetic, and spending ceiling. Our recommendation scoring engine will assemble a harmonized ensemble from our catalogue.
        </p>
      </div>

      {/* Main Stylist Workspace: Configurator (Left) + Outfit Output (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Criteria Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE8E0] shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#C86D51]" />
              Styling Parameters
            </h2>
            <span className="text-[11px] font-medium text-[#8C7E6D]">
              Step 1 of 2
            </span>
          </div>

          {/* 1. Occasion */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
              1. Occasion
            </label>
            <div className="flex flex-wrap gap-1.5">
              {occasions.map((occ) => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => setOccasion(occ)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                    occasion === occ
                      ? 'bg-[#1A1A1A] text-white shadow-sm'
                      : 'bg-[#FAF8F5] text-[#5C5245] hover:bg-[#F0EBE2] border border-[#EAE3D8]'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Preferred Style */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
              2. Preferred Style Aesthetic
            </label>
            <div className="grid grid-cols-2 gap-2">
              {styles.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStyle(st)}
                  className={`text-xs p-2.5 rounded-xl font-medium text-left transition-all border ${
                    style === st
                      ? 'bg-[#FAF6F0] border-[#C86D51] text-[#C86D51] font-semibold'
                      : 'bg-[#FAF8F5] border-[#EAE3D8] text-[#5C5245] hover:bg-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Budget Ceiling */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                3. Maximum Budget Ceiling
              </label>
              <span className="text-sm font-bold text-[#C86D51]">
                ₹{budgetMax.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="15000"
              step="500"
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              className="w-full accent-[#C86D51] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8C7E6D] mt-1 font-medium">
              <span>₹2,000 (Budget Student)</span>
              <span>₹8,500</span>
              <span>₹15,000 (Luxury Ensemble)</span>
            </div>
          </div>

          {/* 4. Preferred Colours */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
              4. Preferred Color Palette
            </label>
            <div className="flex flex-wrap gap-1.5">
              {colorOptions.map((c) => {
                const selected = preferredColors.includes(c.value);
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => toggleColor(c.value)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                      selected
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-[#FAF8F5] text-[#5C5245] border-[#EAE3D8] hover:bg-white'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 text-[#E07A5F]" />}
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Season */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
              5. Weather / Season Context
            </label>
            <div className="flex flex-wrap gap-1.5">
              {seasons.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeason(s)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                    season === s
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-[#FAF8F5] text-[#5C5245] border border-[#EAE3D8] hover:bg-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Included Categories */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
              6. Outfit Layers to Include
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(['top', 'bottom', 'footwear', 'outerwear', 'accessory'] as const).map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-xs text-[#4A4237] capitalize cursor-pointer select-none bg-[#FAF8F5] p-2 rounded-xl border border-[#EAE3D8]"
                >
                  <input
                    type="checkbox"
                    checked={includeCategories[cat]}
                    onChange={(e) => setIncludeCategories({ ...includeCategories, [cat]: e.target.checked })}
                    className="accent-[#C86D51] rounded"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={() => handleGenerate(seedOffset + 1)}
            disabled={isGenerating}
            className="w-full py-4 rounded-2xl bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#E07A5F]" />
            ) : (
              <Sparkles className="w-4 h-4 text-[#E07A5F] group-hover:rotate-12 transition-transform" />
            )}
            <span>{isGenerating ? 'Synthesizing Look...' : 'Generate My Outfit'}</span>
          </button>
        </div>

        {/* Right: Recommendation Result Output */}
        <div className="lg:col-span-7 space-y-6">
          {generatedOutfit ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E0] shadow-sm space-y-6">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F5F2EB]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-[#F5ECE4] text-[#8C533E] px-2.5 py-0.5 rounded-full">
                      Curated Look
                    </span>
                    <span className="text-xs text-[#8C7E6D]">
                      {style} • {occasion}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-1">
                    {customOutfitName}
                  </h3>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-[#8C7E6D]">Combined Estimated Cost</span>
                  <div className="text-2xl font-bold text-[#1A1A1A]">
                    ₹{generatedOutfit.totalPrice.toLocaleString('en-IN')}
                  </div>
                  <span className={`text-[11px] font-semibold ${
                    generatedOutfit.totalPrice <= budgetMax ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    {generatedOutfit.totalPrice <= budgetMax ? '✓ Within Allocated Budget' : '⚠ Slightly Above Ceiling'}
                  </span>
                </div>
              </div>

              {/* Action Buttons Top */}
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => handleGenerate(seedOffset + 1)}
                  className="py-2.5 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFE8] text-[#1A1A1A] border border-[#DDD5CB] text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#C86D51]" />
                  Generate Another Look
                </button>

                <button
                  onClick={() => setSaveModalOpen(true)}
                  className="py-2.5 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#E07A5F]" />
                  Save This Outfit
                </button>

                <button
                  onClick={handleAddAllToCart}
                  className="py-2.5 px-4 rounded-xl bg-[#FAF6F0] hover:bg-[#F5ECE4] text-[#8C533E] border border-[#E8DFC8] text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add All To Bag
                </button>
              </div>

              {/* Recommended Items Grid */}
              <div className="space-y-4 pt-2">
                {(['top', 'bottom', 'outerwear', 'footwear', 'accessory'] as const).map((slotKey) => {
                  const piece = generatedOutfit[slotKey];
                  if (!piece) return null;

                  return (
                    <div
                      key={slotKey}
                      className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D8] flex flex-col sm:flex-row gap-4 items-center justify-between hover:border-[#1A1A1A] transition-all"
                    >
                      {/* Image & Main Info */}
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#EFECE6] shrink-0 border border-[#DDD5CB]">
                          <ImageWithFallback
                            src={piece.image}
                            alt={piece.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7E6D]">
                              {slotKey} • {piece.category}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-[#1A1A1A]">
                            {piece.name}
                          </h4>
                          <p className="text-xs text-[#5C5245] max-w-sm line-clamp-2">
                            <strong className="text-[#8C533E]">AI Match Reason:</strong> {piece.reason}
                          </p>
                          <div className="text-xs font-bold text-[#1A1A1A] pt-1">
                            ₹{piece.price?.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      {/* Replace / Swap Button */}
                      <button
                        onClick={() => handleReplacePiece(slotKey)}
                        className="w-full sm:w-auto py-2 px-3 rounded-xl bg-white hover:bg-[#F0EBE2] text-[#4A4237] border border-[#DDD5CB] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shrink-0"
                        title="Swap with another candidate"
                      >
                        <RefreshCw className="w-3 h-3 text-[#C86D51]" />
                        <span>Replace Item</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#EDE8E0]">
              <Sparkles className="w-8 h-8 text-[#C86D51] mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                Configure and Generate Your Look
              </h3>
              <p className="text-xs text-[#8C7E6D] mt-1">
                Select criteria on the left and click "Generate My Outfit".
              </p>
            </div>
          )}

          {/* Styling Architecture Rationale */}
          <div className="bg-white rounded-2xl p-5 border border-[#EDE8E0] space-y-2 text-xs text-[#5C5245] shadow-sm">
            <div className="flex items-center gap-2 text-[#1A1A1A] font-bold">
              <Sparkles className="w-4 h-4 text-[#C86D51] shrink-0" />
              <span>Algorithmic Styling Architecture</span>
            </div>
            <p className="leading-relaxed text-[11px] text-[#6B5E50]">
              StyleSync computes optimal outfits using multi-factor constraint satisfaction: matching color temperatures, occasion dress codes, proportional layering, and budget thresholds. Every suggested piece includes transparent reasoning so you understand why it complements your look.
            </p>
          </div>
        </div>
      </div>

      {/* Save Outfit Modal */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#EDE8E0]">
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              Save Curated Outfit
            </h3>
            <p className="text-xs text-[#6B5E50]">
              Give this ensemble a memorable name so you can plan it in your calendar or reopen it later.
            </p>
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                Outfit Title
              </label>
              <input
                type="text"
                value={customOutfitName}
                onChange={(e) => setCustomOutfitName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                placeholder="e.g. Saturday Social Ensemble"
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setSaveModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B5E50] hover:bg-[#FAF8F5]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCompleteOutfit}
                className="px-5 py-2 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#333333]"
              >
                Save to My Outfits
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
