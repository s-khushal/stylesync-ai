import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OutfitPlan, OccasionTag } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  Edit3, 
  Clock, 
  Sparkles, 
  X, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const OutfitPlannerPage: React.FC = () => {
  const { outfitPlans, savedOutfits, addOutfitPlan, updateOutfitPlan, deleteOutfitPlan, showToast, navigateTo } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<OutfitPlan | null>(null);

  // Form State
  const [formDate, setFormDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [formOccasion, setFormOccasion] = useState<string>('Casual outing');
  const [formOutfitId, setFormOutfitId] = useState<string>(() => savedOutfits[0]?.id || '');
  const [formNotes, setFormNotes] = useState<string>('');

  const occasions: OccasionTag[] = [
    'Work & Office',
    'Casual outing',
    'Party',
    'Formal meeting',
    'Wedding or celebration',
    'Travel',
    'Everyday wear'
  ];

  const handleOpenAdd = () => {
    if (savedOutfits.length === 0) {
      showToast('Please create or save at least one outfit in Outfit Builder first.', 'error');
      return;
    }
    setEditingPlan(null);
    const today = new Date();
    today.setDate(today.getDate() + 1);
    setFormDate(today.toISOString().split('T')[0]);
    setFormOccasion('Casual outing');
    setFormOutfitId(savedOutfits[0]?.id || '');
    setFormNotes('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (plan: OutfitPlan) => {
    setEditingPlan(plan);
    setFormDate(plan.date);
    setFormOccasion(plan.occasion);
    setFormOutfitId(plan.outfitId);
    setFormNotes(plan.notes || '');
    setIsModalOpen(true);
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDate) {
      showToast('Please select a valid date.', 'error');
      return;
    }

    const selectedOutfit = savedOutfits.find(o => o.id === formOutfitId) || savedOutfits[0];
    if (!selectedOutfit) {
      showToast('Please select a valid saved outfit.', 'error');
      return;
    }

    const previewThumbnails = [
      selectedOutfit.top?.image,
      selectedOutfit.bottom?.image,
      selectedOutfit.outerwear?.image,
      selectedOutfit.footwear?.image,
    ].filter(Boolean) as string[];

    if (editingPlan) {
      updateOutfitPlan({
        ...editingPlan,
        date: formDate,
        occasion: formOccasion,
        outfitId: selectedOutfit.id,
        outfitName: selectedOutfit.name,
        outfitPreviewImages: previewThumbnails,
        notes: formNotes.trim()
      });
    } else {
      addOutfitPlan({
        date: formDate,
        occasion: formOccasion,
        outfitId: selectedOutfit.id,
        outfitName: selectedOutfit.name,
        outfitPreviewImages: previewThumbnails,
        notes: formNotes.trim()
      });
    }

    setIsModalOpen(false);
  };

  // Format date readable
  const formatDateFriendly = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return d.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] text-xs font-semibold text-[#8C533E] mb-2">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Weekly Wardrobe Scheduling</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            Outfit Calendar Planner
          </h1>
          <p className="text-xs sm:text-sm text-[#6B5E50] mt-1">
            Map out what to wear for strategy reviews, dinners, and weekend getaways. Eliminate morning dressing friction.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="py-3 px-5 rounded-2xl bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#E07A5F]" /> Schedule New Outfit
        </button>
      </div>

      {/* Planned Outfits List */}
      {outfitPlans.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-[#EDE8E0] p-8 space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D8] flex items-center justify-center text-[#8C7E6D] mx-auto">
            <CalendarIcon className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
            No Upcoming Outfit Plans
          </h3>
          <p className="text-xs text-[#8C7E6D] leading-relaxed">
            Stay ahead of your weekly schedule. Plan your Monday executive meeting or Friday dinner attire ahead of time.
          </p>
          <button
            onClick={handleOpenAdd}
            className="py-2.5 px-5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#333333] transition-all"
          >
            Create Your First Schedule
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outfitPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-3xl border border-[#EDE8E0] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div>
                {/* Date Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F5F2EB]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]">
                    <Clock className="w-4 h-4 text-[#C86D51]" />
                    <span>{formatDateFriendly(plan.date)}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(plan)}
                      className="p-1.5 text-[#8C7E6D] hover:text-[#1A1A1A] transition-colors"
                      title="Edit Plan"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteOutfitPlan(plan.id)}
                      className="p-1.5 text-[#8C7E6D] hover:text-rose-600 transition-colors"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Occasion Badge & Title */}
                <div className="pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FDF8F5] text-[#8C533E] px-2.5 py-0.5 rounded-full border border-[#F3E2D8]">
                    {plan.occasion}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mt-1.5">
                    {plan.outfitName}
                  </h3>
                </div>

                {/* Optional Note */}
                {plan.notes && (
                  <p className="text-xs text-[#6B5E50] mt-2 italic bg-[#FAF8F5] p-3 rounded-xl border border-[#EFECE6]">
                    "{plan.notes}"
                  </p>
                )}

                {/* Thumbnails of planned pieces */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {plan.outfitPreviewImages.map((imgUrl, i) => (
                    <div key={i} className="w-14 h-16 rounded-xl overflow-hidden bg-[#FAF8F5] shrink-0 border border-[#EAE3D8]">
                      <ImageWithFallback src={imgUrl} alt="Garment preview" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#F5F2EB] flex items-center justify-between text-xs text-[#8C7E6D]">
                <span>Scheduled in Calendar</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Synchronized
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-[#EDE8E0] relative animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5F2EB]">
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
                {editingPlan ? 'Edit Outfit Schedule' : 'Schedule Outfit in Calendar'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EAE4DC] flex items-center justify-center text-[#1A1A1A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4">
              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Date of Event *
                </label>
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                  required
                />
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Occasion Type *
                </label>
                <select
                  value={formOccasion}
                  onChange={(e) => setFormOccasion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                >
                  {occasions.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Outfit Choice */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Select Outfit from Library *
                </label>
                <select
                  value={formOutfitId}
                  onChange={(e) => setFormOutfitId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                >
                  {savedOutfits.map(o => (
                    <option key={o.id} value={o.id}>{o.name} ({o.style})</option>
                  ))}
                </select>
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Optional Notes (Room number, weather check, accessories)
                </label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. Evening outdoor terrace; bring light layer if temperature drops."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none"
                />
              </div>

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
                  {editingPlan ? 'Update Plan' : 'Save Plan to Calendar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
