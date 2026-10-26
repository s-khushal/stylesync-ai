import { OutfitPlan } from '../types';

export const INITIAL_PLANS: OutfitPlan[] = [
  {
    id: 'plan-1',
    date: '2026-10-14',
    occasion: 'Work & Office',
    outfitId: 'outfit-1',
    outfitName: 'Smart Executive Presentation Look',
    outfitPreviewImages: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80'
    ],
    notes: 'Executive strategic pitch and leadership review. Don’t forget presentation notes and tablet.',
    createdAt: '2026-10-06'
  },
  {
    id: 'plan-2',
    date: '2026-10-18',
    occasion: 'Casual outing',
    outfitId: 'outfit-2',
    outfitName: 'Weekend Coffee & Street Minimal',
    outfitPreviewImages: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=400&q=80'
    ],
    notes: 'Coffee strategy session with design partners at Blue Tokai.',
    createdAt: '2026-10-08'
  }
];
