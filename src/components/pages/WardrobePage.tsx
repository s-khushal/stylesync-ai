import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WardrobeItem, Category, SeasonTag } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Upload, 
  X, 
  Filter, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';

export const WardrobePage: React.FC = () => {
  const { wardrobe, addWardrobeItem, updateWardrobeItem, deleteWardrobeItem, showToast } = useApp();

  // Filter & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WardrobeItem | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Category>('Shirts');
  const [formSlot, setFormSlot] = useState<'top' | 'bottom' | 'footwear' | 'outerwear' | 'accessory'>('top');
  const [formColor, setFormColor] = useState('White');
  const [formSeason, setFormSeason] = useState<SeasonTag>('All-Season');
  const [formTags, setFormTags] = useState('Campus, Casual');
  const [formImage, setFormImage] = useState('');
  const [imageError, setImageError] = useState('');

  const categories: Category[] = [
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

  const seasons: SeasonTag[] = ['All-Season', 'Summer', 'Winter', 'Monsoon', 'Spring'];

  // Quick preset sample images if user doesn't want to upload their own file right now
  const samplePresets = [
    { label: 'White Shirt', url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80', slot: 'top' as const, cat: 'Shirts' as Category },
    { label: 'Denim Pants', url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80', slot: 'bottom' as const, cat: 'Jeans' as Category },
    { label: 'Leather Sneaker', url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80', slot: 'footwear' as const, cat: 'Footwear' as Category },
    { label: 'Beige Blazer', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80', slot: 'outerwear' as const, cat: 'Jackets' as Category },
    { label: 'Classic Tote', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80', slot: 'accessory' as const, cat: 'Accessories' as Category },
  ];

  // Open modal for new item
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormName('');
    setFormCategory('Shirts');
    setFormSlot('top');
    setFormColor('White');
    setFormSeason('All-Season');
    setFormTags('Campus, Casual');
    setFormImage(samplePresets[0].url);
    setImageError('');
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleOpenEdit = (item: WardrobeItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormSlot(item.slot);
    setFormColor(item.color);
    setFormSeason(item.season);
    setFormTags(item.tags.join(', '));
    setFormImage(item.image);
    setImageError('');
    setIsModalOpen(true);
  };

  // Handle local file upload with FileReader and size validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2.5 * 1024 * 1024) {
      setImageError('File size is too large (max 2.5MB allowed for localStorage safety).');
      return;
    }

    setImageError('');
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      setFormImage(base64Url);
    };
    reader.readAsDataURL(file);
  };

  // Save or Update
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast('Please provide a name for your clothing item.', 'error');
      return;
    }

    if (!formImage.trim()) {
      showToast('Please upload an image or choose a preset.', 'error');
      return;
    }

    const tagsArray = formTags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingItem) {
      updateWardrobeItem({
        ...editingItem,
        name: formName.trim(),
        category: formCategory,
        slot: formSlot,
        color: formColor.trim(),
        season: formSeason,
        tags: tagsArray,
        image: formImage
      });
    } else {
      addWardrobeItem({
        name: formName.trim(),
        category: formCategory,
        slot: formSlot,
        color: formColor.trim(),
        season: formSeason,
        tags: tagsArray,
        image: formImage
      });
    }

    setIsModalOpen(false);
  };

  // Map category to slot helper
  const handleCategoryChange = (cat: Category) => {
    setFormCategory(cat);
    if (['Tops', 'Shirts', 'T-shirts', 'Dresses'].includes(cat)) setFormSlot('top');
    else if (['Trousers', 'Jeans'].includes(cat)) setFormSlot('bottom');
    else if (['Footwear'].includes(cat)) setFormSlot('footwear');
    else if (['Jackets'].includes(cat)) setFormSlot('outerwear');
    else if (['Accessories'].includes(cat)) setFormSlot('accessory');
  };

  // Filtered wardrobe
  const filteredWardrobe = wardrobe.filter(item => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = item.name.toLowerCase().includes(term);
      const matchTag = item.tags.some(t => t.toLowerCase().includes(term));
      const matchColor = item.color.toLowerCase().includes(term);
      if (!matchName && !matchTag && !matchColor) return false;
    }
    if (categoryFilter !== 'All' && item.category !== categoryFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] text-xs font-semibold text-[#8C533E] mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Digital Wardrobe Management</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            My Digital Wardrobe
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5E50] mt-1">
            Catalog what you already own. All uploads stay strictly private on your device via LocalStorage.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="py-3 px-5 rounded-2xl bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#E07A5F]" /> Add Clothing Item
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 border border-[#EDE8E0] flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search wardrobe by item name, tag, or color..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setCategoryFilter('All')}
            className={`text-xs px-3 py-1.5 rounded-xl font-medium shrink-0 transition-colors ${
              categoryFilter === 'All'
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-[#FAF8F5] text-[#5C5245] border border-[#EAE3D8] hover:bg-white'
            }`}
          >
            All ({wardrobe.length})
          </button>
          {categories.map((c) => {
            const count = wardrobe.filter(w => w.category === c).length;
            if (count === 0 && categoryFilter !== c) return null;
            return (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium shrink-0 transition-colors ${
                  categoryFilter === c
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-[#FAF8F5] text-[#5C5245] border border-[#EAE3D8] hover:bg-white'
                }`}
              >
                {c} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Wardrobe Items Grid */}
      {filteredWardrobe.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-[#EDE8E0] p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D8] flex items-center justify-center text-[#8C7E6D] mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
            No Wardrobe Items Found
          </h3>
          <p className="text-xs text-[#8C7E6D] leading-relaxed">
            {wardrobe.length === 0 
              ? 'Your digital closet is empty! Add your staple shirts, trousers, jackets, or sneakers to start building combinations.'
              : 'No items match your active search filter.'}
          </p>
          <button
            onClick={handleOpenAdd}
            className="py-2.5 px-5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#333333] transition-all"
          >
            Add Your First Item Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredWardrobe.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#EDE8E0] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] bg-[#F5F2EB] overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 bg-[#1A1A1A]/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.slot}
                </div>

                {/* Edit & Delete Actions */}
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="w-8 h-8 rounded-full bg-white text-[#1A1A1A] hover:bg-[#FAF8F5] flex items-center justify-center shadow-md transition-colors"
                    title="Edit Item"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteWardrobeItem(item.id)}
                    className="w-8 h-8 rounded-full bg-white text-rose-600 hover:bg-rose-50 flex items-center justify-center shadow-md transition-colors"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Item Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#8C7E6D]">
                  <span className="font-semibold uppercase">{item.category}</span>
                  <span>{item.season}</span>
                </div>

                <h3 className="text-sm font-bold text-[#1A1A1A] line-clamp-1">
                  {item.name}
                </h3>

                <div className="text-xs text-[#5C5245]">
                  <span>Color: </span>
                  <span className="font-semibold text-[#1A1A1A]">{item.color}</span>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-[#FAF6F0] text-[#7A6B5B] px-2 py-0.5 rounded-md border border-[#EFECE6] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-[#EDE8E0] relative animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F2EB]">
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                {editingItem ? 'Edit Wardrobe Piece' : 'Add New Clothing Item'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EAE4DC] flex items-center justify-center text-[#1A1A1A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Garment Name *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Vintage Wash Denim Jacket, Linen Shirt"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                  required
                />
              </div>

              {/* Category & Slot */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => handleCategoryChange(e.target.value as Category)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                    Outfit Layer Slot *
                  </label>
                  <select
                    value={formSlot}
                    onChange={(e) => setFormSlot(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                  >
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="outerwear">Outerwear / Jacket</option>
                    <option value="footwear">Footwear</option>
                    <option value="accessory">Accessory</option>
                  </select>
                </div>
              </div>

              {/* Color & Season */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                    Dominant Color *
                  </label>
                  <input
                    type="text"
                    value={formColor}
                    onChange={(e) => setFormColor(e.target.value)}
                    placeholder="e.g. Ivory, Olive, Navy"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                    Seasonality
                  </label>
                  <select
                    value={formSeason}
                    onChange={(e) => setFormSeason(e.target.value as SeasonTag)}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                  >
                    {seasons.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="e.g. Casual, Formal, Favorite, Heavyweight"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Image Upload or Preset Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Item Image (Upload Local File or Select Preset) *
                </label>
                
                <div className="flex gap-3 items-center mb-3">
                  <label className="cursor-pointer py-2 px-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDD5CB] hover:bg-[#F0EBE2] text-xs font-semibold flex items-center gap-2 text-[#1A1A1A]">
                    <Upload className="w-3.5 h-3.5 text-[#C86D51]" />
                    Upload Photo from Computer
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-[#8C7E6D]">Max 2.5MB</span>
                </div>

                {imageError && (
                  <p className="text-[11px] text-rose-600 mb-2">{imageError}</p>
                )}

                {/* Quick Presets */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7E6D]">
                    Or quick-pick realistic demo photo:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {samplePresets.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => {
                          setFormImage(p.url);
                          setFormSlot(p.slot);
                          setFormCategory(p.cat);
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium ${
                          formImage === p.url
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-[#FAF8F5] text-[#5C5245] border-[#EAE3D8] hover:bg-white'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                {formImage && (
                  <div className="mt-3 flex items-center gap-3 p-2 bg-[#FAF8F5] rounded-xl border border-[#EAE3D8]">
                    <div className="w-12 h-14 rounded-lg overflow-hidden bg-white shrink-0">
                      <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Image attached and ready
                    </span>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2 justify-end pt-3 border-t border-[#F5F2EB]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#6B5E50] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold shadow-md"
                >
                  {editingItem ? 'Save Modifications' : 'Add to Digital Wardrobe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
