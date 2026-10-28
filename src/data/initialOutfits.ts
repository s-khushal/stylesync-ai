import { Outfit } from '../types';

export const INITIAL_OUTFITS: Outfit[] = [
  {
    id: 'outfit-1',
    name: 'Smart Executive Presentation Look',
    occasion: 'Work & Office',
    style: 'Smart casual',
    top: {
      id: 'prod-1',
      name: 'Oversized Linen Resort Shirt',
      category: 'Shirts',
      slot: 'top',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      price: 649,
      source: 'catalogue',
      reason: 'Breezy and modern linen balances relaxed elegance with executive authority.'
    },
    bottom: {
      id: 'prod-6',
      name: 'Pleated Straight-Leg Wide Trousers',
      category: 'Trousers',
      slot: 'bottom',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      price: 799,
      source: 'catalogue',
      reason: 'Fluid drape complements the linen shirt with clean architectural lines.'
    },
    footwear: {
      id: 'prod-18',
      name: 'Chunky Court Leather Sneakers',
      category: 'Footwear',
      slot: 'footwear',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      price: 899,
      source: 'catalogue',
      reason: 'Crisp white court sneaker grounds the silhouette with youthful comfort.'
    },
    accessory: {
      id: 'prod-22',
      name: 'Minimalist Vegetable-Tanned Leather Tote',
      category: 'Accessories',
      slot: 'accessory',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      price: 699,
      source: 'catalogue',
      reason: 'Carries work laptop and notebook without cluttering clean aesthetics.'
    },
    totalPrice: 3046,
    createdAt: '2026-10-01',
    notes: 'Selected for executive strategy presentation and stakeholder review.'
  },
  {
    id: 'outfit-2',
    name: 'Weekend Coffee & Street Minimal',
    occasion: 'Casual outing',
    style: 'Streetwear',
    top: {
      id: 'prod-3',
      name: 'Heavyweight Graphic Boxy Tee',
      category: 'T-shirts',
      slot: 'top',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      price: 449,
      source: 'catalogue',
      reason: 'Durable heavyweight cotton boxy cut gives modern relaxed proportion.'
    },
    bottom: {
      id: 'prod-9',
      name: 'Utility Cargo Pants with Parachute Cuffs',
      category: 'Trousers',
      slot: 'bottom',
      image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
      price: 899,
      source: 'catalogue',
      reason: 'Utility pocketing adds functional flair.'
    },
    footwear: {
      id: 'prod-18',
      name: 'Chunky Court Leather Sneakers',
      category: 'Footwear',
      slot: 'footwear',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      price: 899,
      source: 'catalogue',
      reason: 'Streetwear staple footwear.'
    },
    totalPrice: 2247,
    createdAt: '2026-10-04',
    notes: 'Comfortable fit for creative meetup.'
  }
];
