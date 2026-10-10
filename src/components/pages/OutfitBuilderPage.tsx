import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OutfitPiece, OccasionTag, StyleTag, Outfit } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { 
  Sparkles, 
  Trash2, 
  Bookmark, 
  Plus, 
  Layers, 
  X, 
  ShoppingBag, 
  RotateCcw, 
  Calendar,
  Check,
  FolderOpen
} from 'lucide-react';

export const OutfitBuilderPage: React.FC = () => {
  const { products, wardrobe, savedOutfits, saveOutfit, deleteOutfit, showToast, navigateTo } = useApp();

  // Active outfit on canvas
  const [selectedTop, setSelectedTop] = useState<OutfitPiece | undefined>(() => {
    const item = products.find(p => p.slot === 'top');
    return item ? {
      id: item.id,
      name: item.name,
      category: item.category,
      slot: 'top',
      image: item.image,
      price: item.price,
      source: 'catalogue'
    } : undefined;
  });

  const [selectedBottom, setSelectedBottom] = useState<OutfitPiece | undefined>(() => {
    const item = products.find(p => p.slot === 'bottom');
    return item ? {
      id: item.id,
      name: item.name,
      category: item.category,
      slot: 'bottom',
      image: item.image,
      price: item.price,
      source: 'catalogue'
    } : undefined;
  });

  const [selectedFootwear, setSelectedFootwear] = useState<OutfitPiece | undefined>(() => {
    const item = products.find(p => p.slot === 'footwear');
    return item ? {
      id: item.id,
      name: item.name,
      category: item.category,
      slot: 'footwear',
      image: item.image,
      price: item.price,
      source: 'catalogue'
    } : undefined;
  });

  const [selectedOuterwear, setSelectedOuterwear] = useState<OutfitPiece | undefined>(undefined);
  const [selectedAccessory, setSelectedAccessory] = useState<OutfitPiece | undefined>(() => {
    const item = products.find(p => p.slot === 'accessory');
    return item ? {
      id: item.id,
      name: item.name,
      category: item.category,
      slot: 'accessory',
      image: item.image,
      price: item.price,
      source: 'catalogue'
    } : undefined;
  });

  // Outfit Meta
  const [outfitName, setOutfitName] = useState<string>('My Custom Capsule Look');
  const [outfitOccasion, setOutfitOccasion] = useState<OccasionTag>('College');
  const [outfitStyle, setOutfitStyle] = useState<StyleTag>('Smart casual');

  // Source drawer state
  const [activeSlotToSelect, setActiveSlotToSelect] = useState<'top' | 'bottom' | 'footwear' | 'outerwear' | 'accessory' | null>(null);
  const [drawerSource, setDrawerSource] = useState<'wardrobe' | 'catalogue'>('wardrobe');

  // Calculate combined price (only catalogue items have purchase prices; wardrobe items are owned ₹0)
  const totalPrice = [selectedTop, selectedBottom, selectedFootwear, selectedOuterwear, selectedAccessory]
    .reduce((sum, item) => sum + (item?.price || 0), 0);

  const handleClearCanvas = () => {
    setSelectedTop(undefined);
    setSelectedBottom(undefined);
    setSelectedFootwear(undefined);
    setSelectedOuterwear(undefined);
    setSelectedAccessory(undefined);
    showToast('Canvas cleared', 'info');
  };

  const handleSaveOutfit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTop && !selectedBottom && !selectedFootwear) {
      showToast('Please add at least one main piece (Top or Bottom) before saving.', 'error');
      return;
    }

    saveOutfit({
      name: outfitName.trim() || 'Custom Ensemble',
      occasion: outfitOccasion,
      style: outfitStyle,
      top: selectedTop,
      bottom: selectedBottom,
      footwear: selectedFootwear,
      outerwear: selectedOuterwear,
      accessory: selectedAccessory,
      totalPrice,
      notes: `Built manually in Outfit Canvas. Mix of wardrobe and catalogue pieces.`
    });
  };

  const handleLoadSavedOutfit = (outfit: Outfit) => {
    setSelectedTop(outfit.top);
    setSelectedBottom(outfit.bottom);
    setSelectedFootwear(outfit.footwear);
    setSelectedOuterwear(outfit.outerwear);
    setSelectedAccessory(outfit.accessory);
    setOutfitName(outfit.name);
    setOutfitOccasion(outfit.occasion);
    setOutfitStyle(outfit.style);
    showToast(`Loaded "${outfit.name}" onto canvas`, 'info');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const selectPiece = (piece: OutfitPiece) => {
    if (piece.slot === 'top') setSelectedTop(piece);
    if (piece.slot === 'bottom') setSelectedBottom(piece);
    if (piece.slot === 'footwear') setSelectedFootwear(piece);
    if (piece.slot === 'outerwear') setSelectedOuterwear(piece);
    if (piece.slot === 'accessory') setSelectedAccessory(piece);

    setActiveSlotToSelect(null);
    showToast(`Added ${piece.name} to canvas`, 'success');
  };

  // Get available candidates for currently active slot drawer
  const getDrawerItems = () => {
    if (!activeSlotToSelect) return [];

    if (drawerSource === 'wardrobe') {
      return wardrobe.filter(w => w.slot === activeSlotToSelect).map(w => ({
        id: w.id,
        name: w.name,
        category: w.category,
        slot: w.slot,
        image: w.image,
        price: 0, // Owned piece
        source: 'wardrobe' as const
      }));
    } else {
      return products.filter(p => p.slot === activeSlotToSelect).map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        slot: p.slot,
        image: p.image,
        price: p.price,
        source: 'catalogue' as const
      }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] text-xs font-semibold text-[#8C533E]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mix & Match Canvas</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          Interactive Outfit Builder
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5E50] leading-relaxed">
          Combine items you already own in your digital wardrobe with new pieces from our catalogue. Assemble balanced silhouettes and save them for your weekly calendar schedule.
        </p>
      </div>

      {/* Main Studio Area: Canvas (Left) + Meta/Controls (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Outfit Canvas Layer Board */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E0] shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7E6D]">
                Layer Composition
              </span>
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                Visual Canvas
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearCanvas}
                className="py-1.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFE8] text-[11px] font-semibold text-[#6B5E50] border border-[#DDD5CB] flex items-center gap-1 transition-all"
              >
                <RotateCcw className="w-3 h-3" /> Clear Canvas
              </button>
            </div>
          </div>

          {/* 5 Layer Slots */}
          <div className="space-y-4">
            {/* Slot: Outerwear */}
            <div className="p-3.5 rounded-2xl border border-[#EDE8E0] bg-[#FAF8F5] flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-20 rounded-xl overflow-hidden bg-white border border-[#E0D7CC] flex items-center justify-center shrink-0">
                  {selectedOuterwear ? (
                    <ImageWithFallback src={selectedOuterwear.image} alt={selectedOuterwear.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-[#A89F91] text-center font-medium px-1">Outerwear / Jacket</span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7E6D]">Outer Layer</span>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">
                    {selectedOuterwear ? selectedOuterwear.name : 'No Jacket Selected (Optional)'}
                  </h4>
                  {selectedOuterwear && (
                    <div className="text-[11px] font-semibold text-[#8C533E] mt-0.5">
                      {selectedOuterwear.price ? `₹${selectedOuterwear.price.toLocaleString('en-IN')} (Catalogue)` : 'Owned in Wardrobe'}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveSlotToSelect('outerwear');
                    setDrawerSource('wardrobe');
                  }}
                  className="py-2 px-3 rounded-xl bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#1A1A1A] border border-[#DDD5CB] transition-colors"
                >
                  {selectedOuterwear ? 'Change' : '+ Add Jacket'}
                </button>
                {selectedOuterwear && (
                  <button onClick={() => setSelectedOuterwear(undefined)} className="p-2 text-[#A89F91] hover:text-rose-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Slot: Top */}
            <div className="p-3.5 rounded-2xl border border-[#EDE8E0] bg-[#FAF8F5] flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-20 rounded-xl overflow-hidden bg-white border border-[#E0D7CC] flex items-center justify-center shrink-0">
                  {selectedTop ? (
                    <ImageWithFallback src={selectedTop.image} alt={selectedTop.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-[#A89F91] text-center font-medium px-1">Top / Shirt</span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7E6D]">Core Top</span>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">
                    {selectedTop ? selectedTop.name : 'Select a Top (Required)'}
                  </h4>
                  {selectedTop && (
                    <div className="text-[11px] font-semibold text-[#8C533E] mt-0.5">
                      {selectedTop.price ? `₹${selectedTop.price.toLocaleString('en-IN')} (Catalogue)` : 'Owned in Wardrobe'}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveSlotToSelect('top');
                    setDrawerSource('wardrobe');
                  }}
                  className="py-2 px-3 rounded-xl bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#1A1A1A] border border-[#DDD5CB] transition-colors"
                >
                  {selectedTop ? 'Change' : '+ Choose Top'}
                </button>
                {selectedTop && (
                  <button onClick={() => setSelectedTop(undefined)} className="p-2 text-[#A89F91] hover:text-rose-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Slot: Bottom */}
            <div className="p-3.5 rounded-2xl border border-[#EDE8E0] bg-[#FAF8F5] flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-20 rounded-xl overflow-hidden bg-white border border-[#E0D7CC] flex items-center justify-center shrink-0">
                  {selectedBottom ? (
                    <ImageWithFallback src={selectedBottom.image} alt={selectedBottom.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-[#A89F91] text-center font-medium px-1">Bottoms</span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7E6D]">Lower Garment</span>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">
                    {selectedBottom ? selectedBottom.name : 'Select Trousers / Jeans'}
                  </h4>
                  {selectedBottom && (
                    <div className="text-[11px] font-semibold text-[#8C533E] mt-0.5">
                      {selectedBottom.price ? `₹${selectedBottom.price.toLocaleString('en-IN')} (Catalogue)` : 'Owned in Wardrobe'}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveSlotToSelect('bottom');
                    setDrawerSource('wardrobe');
                  }}
                  className="py-2 px-3 rounded-xl bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#1A1A1A] border border-[#DDD5CB] transition-colors"
                >
                  {selectedBottom ? 'Change' : '+ Choose Bottom'}
                </button>
                {selectedBottom && (
                  <button onClick={() => setSelectedBottom(undefined)} className="p-2 text-[#A89F91] hover:text-rose-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Slot: Footwear */}
            <div className="p-3.5 rounded-2xl border border-[#EDE8E0] bg-[#FAF8F5] flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-20 rounded-xl overflow-hidden bg-white border border-[#E0D7CC] flex items-center justify-center shrink-0">
                  {selectedFootwear ? (
                    <ImageWithFallback src={selectedFootwear.image} alt={selectedFootwear.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-[#A89F91] text-center font-medium px-1">Shoes / Sneakers</span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7E6D]">Footwear</span>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">
                    {selectedFootwear ? selectedFootwear.name : 'Select Shoes (Optional)'}
                  </h4>
                  {selectedFootwear && (
                    <div className="text-[11px] font-semibold text-[#8C533E] mt-0.5">
                      {selectedFootwear.price ? `₹${selectedFootwear.price.toLocaleString('en-IN')} (Catalogue)` : 'Owned in Wardrobe'}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveSlotToSelect('footwear');
                    setDrawerSource('wardrobe');
                  }}
                  className="py-2 px-3 rounded-xl bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#1A1A1A] border border-[#DDD5CB] transition-colors"
                >
                  {selectedFootwear ? 'Change' : '+ Add Footwear'}
                </button>
                {selectedFootwear && (
                  <button onClick={() => setSelectedFootwear(undefined)} className="p-2 text-[#A89F91] hover:text-rose-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Slot: Accessory */}
            <div className="p-3.5 rounded-2xl border border-[#EDE8E0] bg-[#FAF8F5] flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-20 rounded-xl overflow-hidden bg-white border border-[#E0D7CC] flex items-center justify-center shrink-0">
                  {selectedAccessory ? (
                    <ImageWithFallback src={selectedAccessory.image} alt={selectedAccessory.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-[#A89F91] text-center font-medium px-1">Bag / Watch</span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7E6D]">Accessory Accent</span>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">
                    {selectedAccessory ? selectedAccessory.name : 'Select Bag / Watch (Optional)'}
                  </h4>
                  {selectedAccessory && (
                    <div className="text-[11px] font-semibold text-[#8C533E] mt-0.5">
                      {selectedAccessory.price ? `₹${selectedAccessory.price.toLocaleString('en-IN')} (Catalogue)` : 'Owned in Wardrobe'}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveSlotToSelect('accessory');
                    setDrawerSource('wardrobe');
                  }}
                  className="py-2 px-3 rounded-xl bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#1A1A1A] border border-[#DDD5CB] transition-colors"
                >
                  {selectedAccessory ? 'Change' : '+ Add Accent'}
                </button>
                {selectedAccessory && (
                  <button onClick={() => setSelectedAccessory(undefined)} className="p-2 text-[#A89F91] hover:text-rose-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Outfit Meta, Pricing, and Save Actions */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE8E0] shadow-sm space-y-6">
          <div className="pb-4 border-b border-[#F5F2EB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51]">
              Outfit Metadata
            </span>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              Save & Synchronize Look
            </h3>
          </div>

          <form onSubmit={handleSaveOutfit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                Outfit Title *
              </label>
              <input
                type="text"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                placeholder="e.g. Wednesday Campus Presentation"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Target Occasion
                </label>
                <select
                  value={outfitOccasion}
                  onChange={(e) => setOutfitOccasion(e.target.value as OccasionTag)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                >
                  <option value="College">College</option>
                  <option value="Casual outing">Casual outing</option>
                  <option value="Formal meeting">Formal meeting</option>
                  <option value="Party">Party</option>
                  <option value="Wedding or celebration">Wedding / celebration</option>
                  <option value="Travel">Travel</option>
                  <option value="Everyday wear">Everyday wear</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Style Aesthetic
                </label>
                <select
                  value={outfitStyle}
                  onChange={(e) => setOutfitStyle(e.target.value as StyleTag)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                >
                  <option value="Smart casual">Smart casual</option>
                  <option value="Casual">Casual</option>
                  <option value="Minimalist">Minimalist</option>
                  <option value="Streetwear">Streetwear</option>
                  <option value="Formal">Formal</option>
                  <option value="Traditional fusion">Traditional fusion</option>
                </select>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D8] space-y-2 text-xs">
              <div className="flex justify-between text-[#8C7E6D]">
                <span>Catalogue Pieces New Cost:</span>
                <span className="font-semibold text-[#1A1A1A]">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#8C7E6D]">
                <span>Wardrobe Owned Items:</span>
                <span className="font-semibold text-emerald-700">₹0 (Already Owned)</span>
              </div>
              <div className="pt-2 border-t border-[#E0D7CC] flex justify-between font-bold text-sm text-[#1A1A1A]">
                <span>Total New Investment:</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Bookmark className="w-4 h-4 text-[#E07A5F]" /> Save Outfit to Library
            </button>
          </form>

          {/* Realistic Try-On Disclosure */}
          <div className="bg-[#FFFDF9] border border-[#EAE0D2] rounded-2xl p-4 text-[11px] text-[#6B5E50] leading-relaxed">
            <strong>Honest Capability Notice:</strong> This canvas uses layer positioning rather than photorealistic 3D virtual try-on simulation, adhering directly to the project's academic authenticity guidelines.
          </div>
        </div>
      </div>

      {/* Piece Selection Drawer / Modal */}
      {activeSlotToSelect && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-[#EDE8E0] max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F2EB]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A] capitalize">
                  Select {activeSlotToSelect} Piece
                </h3>
                <p className="text-xs text-[#8C7E6D]">
                  Pick from your digital closet or discover a new piece from the catalogue.
                </p>
              </div>
              <button
                onClick={() => setActiveSlotToSelect(null)}
                className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EAE4DC] flex items-center justify-center text-[#1A1A1A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Source Tabs */}
            <div className="flex gap-2 border-b border-[#F5F2EB] pb-2">
              <button
                onClick={() => setDrawerSource('wardrobe')}
                className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  drawerSource === 'wardrobe'
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#5C5245] hover:bg-[#F0EBE2]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                From My Wardrobe ({wardrobe.filter(w => w.slot === activeSlotToSelect).length})
              </button>
              <button
                onClick={() => setDrawerSource('catalogue')}
                className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  drawerSource === 'catalogue'
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#5C5245] hover:bg-[#F0EBE2]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                From Fashion Catalogue ({products.filter(p => p.slot === activeSlotToSelect).length})
              </button>
            </div>

            {/* Items Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3 p-1">
              {getDrawerItems().length === 0 ? (
                <div className="col-span-full py-12 text-center text-xs text-[#8C7E6D]">
                  No items found in {drawerSource} for slot "{activeSlotToSelect}".
                </div>
              ) : (
                getDrawerItems().map((item) => (
                  <div
                    key={item.id}
                    onClick={() => selectPiece(item)}
                    className="cursor-pointer bg-[#FAF8F5] hover:bg-[#F5ECE4] border border-[#EDE8E0] hover:border-[#1A1A1A] rounded-2xl overflow-hidden p-2.5 transition-all text-left flex flex-col justify-between group"
                  >
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white mb-2">
                      <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-[#1A1A1A] line-clamp-1">{item.name}</h5>
                      <div className="text-[11px] font-bold text-[#8C533E] mt-0.5">
                        {item.price ? `₹${item.price.toLocaleString('en-IN')}` : 'Owned'}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Library of Saved Outfits */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E0] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7E6D]">
              Persistent Archive
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              My Saved Outfits Library ({savedOutfits.length})
            </h3>
          </div>
          <span className="text-xs text-[#8C7E6D]">
            Stored in LocalStorage
          </span>
        </div>

        {savedOutfits.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#8C7E6D]">
            No outfits saved yet. Build an ensemble on the canvas above and click "Save Outfit to Library".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedOutfits.map((outfit) => (
              <div
                key={outfit.id}
                className="bg-[#FAF8F5] border border-[#EAE3D8] hover:border-[#1A1A1A] rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-[#DDD5CB] text-[#8C533E]">
                      {outfit.occasion} • {outfit.style}
                    </span>
                    <button
                      onClick={() => deleteOutfit(outfit.id)}
                      className="text-[#A89F91] hover:text-rose-600 transition-colors"
                      title="Delete Outfit"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#1A1A1A]">
                    {outfit.name}
                  </h4>

                  {outfit.notes && (
                    <p className="text-xs text-[#6B5E50] mt-1 line-clamp-2">
                      {outfit.notes}
                    </p>
                  )}

                  {/* Thumbnail Row */}
                  <div className="flex gap-1.5 mt-3 overflow-x-auto py-1">
                    {[outfit.top, outfit.bottom, outfit.outerwear, outfit.footwear, outfit.accessory]
                      .filter(Boolean)
                      .map((p, idx) => (
                        <div key={idx} className="w-12 h-14 rounded-lg overflow-hidden bg-white shrink-0 border border-[#DDD5CB]">
                          <img src={p!.image} alt={p!.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EAE3D8] flex items-center justify-between">
                  <div className="text-xs font-bold text-[#1A1A1A]">
                    ₹{outfit.totalPrice.toLocaleString('en-IN')}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLoadSavedOutfit(outfit)}
                      className="py-1.5 px-3 rounded-xl bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#1A1A1A] border border-[#DDD5CB] flex items-center gap-1 transition-all"
                    >
                      <FolderOpen className="w-3 h-3 text-[#C86D51]" /> Reopen on Canvas
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
