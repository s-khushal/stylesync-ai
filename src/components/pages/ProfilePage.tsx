import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StyleTag } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { 
  User, 
  Layers, 
  Sparkles, 
  Calendar, 
  Heart, 
  ShoppingBag, 
  Clock, 
  LogOut,
  ArrowRight
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { 
    wardrobe, 
    savedOutfits, 
    outfitPlans, 
    favourites, 
    cartCount, 
    userProfile, 
    updateUserProfile, 
    activityLog, 
    products, 
    navigateTo,
    currentUser,
    signOut
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [collegeOrProfession, setCollegeOrProfession] = useState(userProfile.collegeOrProfession);
  const [bio, setBio] = useState(userProfile.bio);
  const [budgetMax, setBudgetMax] = useState(userProfile.budgetMax);
  const [selectedStyles, setSelectedStyles] = useState<StyleTag[]>(userProfile.preferredStyles);
  const [selectedColors, setSelectedColors] = useState<string[]>(userProfile.favoriteColors);

  const availableStyles: StyleTag[] = [
    'Smart casual',
    'Casual',
    'Minimalist',
    'Streetwear',
    'Formal',
    'Traditional fusion'
  ];

  const colorOptions = ['Ivory', 'Terracotta', 'Sage Green', 'Charcoal', 'Beige', 'Blue'];

  const toggleStyle = (st: StyleTag) => {
    setSelectedStyles(prev => 
      prev.includes(st) ? prev.filter(s => s !== st) : [...prev, st]
    );
  };

  const toggleColor = (c: string) => {
    setSelectedColors(prev => 
      prev.includes(c) ? prev.filter(col => col !== c) : [...prev, c]
    );
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      collegeOrProfession,
      bio,
      budgetMax,
      preferredStyles: selectedStyles,
      favoriteColors: selectedColors
    });
    setIsEditing(false);
  };

  // Get full products favourited
  const favouritedProducts = products.filter(p => favourites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] text-xs font-semibold text-[#8C533E]">
          <User className="w-3.5 h-3.5" />
          <span>Personalization Dashboard</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
          User Profile & Live Analytics
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5E50]">
          All dashboard analytics below are calculated live from your actual wardrobe, saved looks, and calendar records.
        </p>
      </div>

      {/* 1. REAL DYNAMIC STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            label: 'Wardrobe Items',
            value: wardrobe.length,
            icon: <Layers className="w-5 h-5 text-[#C86D51]" />,
            page: 'wardrobe' as const
          },
          {
            label: 'Saved Outfits',
            value: savedOutfits.length,
            icon: <Sparkles className="w-5 h-5 text-[#C86D51]" />,
            page: 'builder' as const
          },
          {
            label: 'Scheduled Plans',
            value: outfitPlans.length,
            icon: <Calendar className="w-5 h-5 text-[#C86D51]" />,
            page: 'planner' as const
          },
          {
            label: 'Favourited Items',
            value: favourites.length,
            icon: <Heart className="w-5 h-5 text-[#C86D51]" />,
            page: null
          },
          {
            label: 'Items in Bag',
            value: cartCount,
            icon: <ShoppingBag className="w-5 h-5 text-[#C86D51]" />,
            page: null
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            onClick={() => stat.page && navigateTo(stat.page)}
            className={`bg-white rounded-2xl p-5 border border-[#EDE8E0] shadow-sm flex flex-col justify-between transition-all ${
              stat.page ? 'cursor-pointer hover:border-[#1A1A1A] hover:-translate-y-0.5' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-[#FAF8F5] border border-[#EAE3D8]">
                {stat.icon}
              </span>
              <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
                {stat.value}
              </span>
            </div>
            <span className="text-xs font-semibold text-[#8C7E6D]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* 2. PROFILE & PREFERENCES (Grid layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: User Identity & Preferences */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E0] shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center font-serif text-xl font-bold">
                {(currentUser?.fullName || userProfile.name || currentUser?.email || 'M').charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                  {currentUser?.fullName || userProfile.name || (currentUser ? currentUser.email.split('@')[0] : 'StyleSync Member')}
                </h3>
                <p className="text-xs text-[#8C7E6D]">
                  {userProfile.collegeOrProfession || (currentUser ? currentUser.email : 'Personal Capsule Wardrobe')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="py-1.5 px-3.5 rounded-xl border border-[#DDD5CB] hover:bg-[#FAF8F5] text-xs font-semibold text-[#1A1A1A] transition-colors"
              >
                {isEditing ? 'Cancel Edit' : 'Edit Preferences'}
              </button>
              {currentUser && (
                <button
                  onClick={signOut}
                  className="py-1.5 px-3 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Profession / Lifestyle Context
                </label>
                <input
                  type="text"
                  value={collegeOrProfession}
                  onChange={(e) => setCollegeOrProfession(e.target.value)}
                  placeholder="e.g. Design Strategist, Consultant, Architect"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Personal Style Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-[#1A1A1A]">Default Budget Ceiling</label>
                  <span className="text-xs font-bold text-[#C86D51]">₹{budgetMax.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="10000"
                  step="500"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-full accent-[#C86D51]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                  Preferred Aesthetics
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableStyles.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => toggleStyle(st)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                        selectedStyles.includes(st)
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-[#FAF8F5] text-[#5C5245] border-[#EAE3D8]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                  Favorite Color Accents
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {colorOptions.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleColor(c)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                        selectedColors.includes(c)
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-[#FAF8F5] text-[#5C5245] border-[#EAE3D8]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#333333] shadow-md"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-xs">
              <p className="text-[#5C5245] leading-relaxed italic bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#EAE3D8]">
                "{userProfile.bio}"
              </p>

              <div>
                <span className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px] block mb-1">
                  Active Style Preferences
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {userProfile.preferredStyles.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-[#FAF6F0] border border-[#EAE0D2] font-semibold text-[#8C533E]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px] block mb-1">
                  Harmonizing Palette
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {userProfile.favoriteColors.map((c) => (
                    <span key={c} className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#EDE8E0] font-medium text-[#4A4237]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#F5F2EB] flex justify-between">
                <span className="text-[#8C7E6D]">Target Wardrobe Budget Ceiling:</span>
                <span className="font-bold text-[#1A1A1A]">₹{userProfile.budgetMax.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Studio Quick Actions & Recent Activity Log */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Styling Studio Navigation */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE8E0] shadow-sm space-y-4">
            <div className="pb-3 border-b border-[#F5F2EB]">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C86D51]" />
                Styling Studio
              </h3>
              <p className="text-[11px] text-[#8C7E6D] mt-0.5">
                Quick actions for your digital wardrobe & outfit planner
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => navigateTo('stylist')}
                className="p-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6F0] border border-[#EDE8E0] hover:border-[#1A1A1A] transition-all text-left flex flex-col justify-between group"
              >
                <Sparkles className="w-4 h-4 text-[#C86D51] mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[#1A1A1A] block">AI Stylist</span>
                <span className="text-[10px] text-[#8C7E6D]">Generate looks</span>
              </button>

              <button
                onClick={() => navigateTo('wardrobe')}
                className="p-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6F0] border border-[#EDE8E0] hover:border-[#1A1A1A] transition-all text-left flex flex-col justify-between group"
              >
                <Layers className="w-4 h-4 text-[#C86D51] mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[#1A1A1A] block">My Wardrobe</span>
                <span className="text-[10px] text-[#8C7E6D]">{wardrobe.length} items logged</span>
              </button>

              <button
                onClick={() => navigateTo('builder')}
                className="p-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6F0] border border-[#EDE8E0] hover:border-[#1A1A1A] transition-all text-left flex flex-col justify-between group"
              >
                <Sparkles className="w-4 h-4 text-[#C86D51] mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[#1A1A1A] block">Outfit Canvas</span>
                <span className="text-[10px] text-[#8C7E6D]">{savedOutfits.length} saved looks</span>
              </button>

              <button
                onClick={() => navigateTo('planner')}
                className="p-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#FAF6F0] border border-[#EDE8E0] hover:border-[#1A1A1A] transition-all text-left flex flex-col justify-between group"
              >
                <Calendar className="w-4 h-4 text-[#C86D51] mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[#1A1A1A] block">Weekly Planner</span>
                <span className="text-[10px] text-[#8C7E6D]">{outfitPlans.length} dates mapped</span>
              </button>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE8E0] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F2EB]">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C86D51]" />
                Recent Styling Activity
              </h3>
              <span className="text-[11px] text-[#8C7E6D]">Live Log</span>
            </div>

            <div className="space-y-3">
              {activityLog.length === 0 ? (
                <p className="text-xs text-[#8C7E6D] italic">No activity recorded yet.</p>
              ) : (
                activityLog.slice(0, 5).map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3D8] flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#C86D51] mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-[#1A1A1A] font-medium">{log.text}</p>
                      <span className="text-[10px] text-[#8C7E6D] mt-0.5 block">{log.timestamp}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. FAVOURITES SHOWCASE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8E0] shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51]">
              Saved Wishlist
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              My Favourites ({favouritedProducts.length})
            </h3>
          </div>
          <button
            onClick={() => navigateTo('discover')}
            className="text-xs font-semibold text-[#8C533E] hover:underline"
          >
            Explore Catalogue
          </button>
        </div>

        {favouritedProducts.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#8C7E6D]">
            No items in your favourites list yet. Click the heart icon on any product in Discover or Stylist.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favouritedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
