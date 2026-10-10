import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  WardrobeItem, 
  Outfit, 
  OutfitPlan, 
  CartItem, 
  UserProfile, 
  FeedbackSubmission, 
  ActivityLog, 
  PageId 
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_WARDROBE } from '../data/initialWardrobe';
import { INITIAL_OUTFITS } from '../data/initialOutfits';
import { INITIAL_PLANS } from '../data/initialPlans';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Aanya Sharma',
  email: 'aanya.sharma@campus.ac.in',
  collegeOrProfession: 'Student, Management & Media Studies (21)',
  bio: 'Balancing presentation elegance with everyday street minimalism on a student budget.',
  preferredStyles: ['Smart casual', 'Minimalist', 'Traditional fusion'],
  favoriteColors: ['Ivory', 'Terracotta', 'Sage Green', 'Charcoal'],
  budgetMin: 800,
  budgetMax: 3500,
  preferredOccasions: ['College', 'Casual outing', 'Formal meeting']
};

interface AppContextType {
  // Navigation & modals
  activePage: PageId;
  navigateTo: (page: PageId) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Products & catalogue
  products: Product[];

  // Wardrobe
  wardrobe: WardrobeItem[];
  addWardrobeItem: (item: Omit<WardrobeItem, 'id' | 'createdAt'>) => void;
  updateWardrobeItem: (item: WardrobeItem) => void;
  deleteWardrobeItem: (id: string) => void;

  // Outfits
  savedOutfits: Outfit[];
  saveOutfit: (outfit: Omit<Outfit, 'id' | 'createdAt'>) => string;
  deleteOutfit: (id: string) => void;

  // Plans
  outfitPlans: OutfitPlan[];
  addOutfitPlan: (plan: Omit<OutfitPlan, 'id' | 'createdAt'>) => void;
  updateOutfitPlan: (plan: OutfitPlan) => void;
  deleteOutfitPlan: (id: string) => void;

  // Favourites
  favourites: string[];
  toggleFavourite: (productId: string) => void;
  isFavourite: (productId: string) => boolean;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Activity & Feedback
  activityLog: ActivityLog[];
  feedbackList: FeedbackSubmission[];
  submitFeedback: (feedback: Omit<FeedbackSubmission, 'id' | 'createdAt'>) => void;

  // Utilities & Demo Reset
  resetAllDemoData: () => void;
  toast: { text: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Products
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Wardrobe state (LocalStorage)
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>(() => {
    try {
      const saved = localStorage.getItem('stylesync_wardrobe');
      return saved ? JSON.parse(saved) : INITIAL_WARDROBE;
    } catch {
      return INITIAL_WARDROBE;
    }
  });

  // Outfits state (LocalStorage)
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>(() => {
    try {
      const saved = localStorage.getItem('stylesync_outfits');
      return saved ? JSON.parse(saved) : INITIAL_OUTFITS;
    } catch {
      return INITIAL_OUTFITS;
    }
  });

  // Plans state (LocalStorage)
  const [outfitPlans, setOutfitPlans] = useState<OutfitPlan[]>(() => {
    try {
      const saved = localStorage.getItem('stylesync_plans');
      return saved ? JSON.parse(saved) : INITIAL_PLANS;
    } catch {
      return INITIAL_PLANS;
    }
  });

  // Favourites state (LocalStorage)
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('stylesync_favourites');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-6'];
    } catch {
      return ['prod-1', 'prod-6'];
    }
  });

  // Cart state (LocalStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('stylesync_cart');
      if (saved) return JSON.parse(saved);
      const initialItem = INITIAL_PRODUCTS[0];
      return [{ product: initialItem, quantity: 1, selectedSize: 'M' }];
    } catch {
      return [];
    }
  });

  // User Profile (LocalStorage)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('stylesync_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Activity Log (LocalStorage)
  const [activityLog, setActivityLog] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem('stylesync_activity');
      return saved ? JSON.parse(saved) : [
        { id: '1', text: 'Stylist generated "Smart Campus Presentation Look"', timestamp: '2 hours ago', iconType: 'stylist' },
        { id: '2', text: 'Added Linen Resort Shirt to Favourites', timestamp: 'Yesterday', iconType: 'outfit' },
        { id: '3', text: 'Scheduled outfit for 14th Oct presentation', timestamp: '2 days ago', iconType: 'plan' }
      ];
    } catch {
      return [];
    }
  });

  // Feedback list
  const [feedbackList, setFeedbackList] = useState<FeedbackSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('stylesync_feedback');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('stylesync_wardrobe', JSON.stringify(wardrobe));
  }, [wardrobe]);

  useEffect(() => {
    localStorage.setItem('stylesync_outfits', JSON.stringify(savedOutfits));
  }, [savedOutfits]);

  useEffect(() => {
    localStorage.setItem('stylesync_plans', JSON.stringify(outfitPlans));
  }, [outfitPlans]);

  useEffect(() => {
    localStorage.setItem('stylesync_favourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem('stylesync_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('stylesync_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('stylesync_activity', JSON.stringify(activityLog));
  }, [activityLog]);

  useEffect(() => {
    localStorage.setItem('stylesync_feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  // Toast helper
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast((prev) => (prev?.text === text ? null : prev));
    }, 3800);
  };

  // Activity logger helper
  const logActivity = (text: string, iconType: ActivityLog['iconType']) => {
    const newEntry: ActivityLog = {
      id: Date.now().toString(),
      text,
      timestamp: 'Just now',
      iconType
    };
    setActivityLog(prev => [newEntry, ...prev.slice(0, 19)]);
  };

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Favourites actions
  const toggleFavourite = (productId: string) => {
    setFavourites(prev => {
      const exists = prev.includes(productId);
      const prod = products.find(p => p.id === productId);
      if (exists) {
        showToast(`Removed from favourites`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Added ${prod?.name || 'item'} to favourites!`, 'success');
        logActivity(`Favourited ${prod?.name || 'an item'}`, 'outfit');
        return [...prev, productId];
      }
    });
  };

  const isFavourite = (productId: string) => favourites.includes(productId);

  // Cart actions
  const addToCart = (product: Product, size: string = 'M', quantity: number = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedSize === size);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, quantity, selectedSize: size }];
      }
    });
    logActivity(`Added ${product.name} to cart`, 'cart');
    showToast(`Added ${product.name} (Size ${size}) to cart!`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast(`Item removed from cart`, 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Wardrobe actions
  const addWardrobeItem = (itemData: Omit<WardrobeItem, 'id' | 'createdAt'>) => {
    const newItem: WardrobeItem = {
      ...itemData,
      id: `wardrobe-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setWardrobe(prev => [newItem, ...prev]);
    logActivity(`Added "${newItem.name}" to Digital Wardrobe`, 'wardrobe');
    showToast(`"${newItem.name}" saved to your wardrobe!`, 'success');
  };

  const updateWardrobeItem = (item: WardrobeItem) => {
    setWardrobe(prev => prev.map(w => w.id === item.id ? item : w));
    showToast(`Updated "${item.name}"`, 'success');
  };

  const deleteWardrobeItem = (id: string) => {
    const item = wardrobe.find(w => w.id === id);
    setWardrobe(prev => prev.filter(w => w.id !== id));
    showToast(`Removed "${item?.name || 'item'}" from wardrobe`, 'info');
  };

  // Outfit actions
  const saveOutfit = (outfitData: Omit<Outfit, 'id' | 'createdAt'>): string => {
    const newId = `outfit-${Date.now()}`;
    const newOutfit: Outfit = {
      ...outfitData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSavedOutfits(prev => [newOutfit, ...prev]);
    logActivity(`Saved outfit "${newOutfit.name}"`, 'outfit');
    showToast(`Outfit "${newOutfit.name}" saved!`, 'success');
    return newId;
  };

  const deleteOutfit = (id: string) => {
    const outfit = savedOutfits.find(o => o.id === id);
    setSavedOutfits(prev => prev.filter(o => o.id !== id));
    showToast(`Deleted outfit "${outfit?.name || ''}"`, 'info');
  };

  // Plan actions
  const addOutfitPlan = (planData: Omit<OutfitPlan, 'id' | 'createdAt'>) => {
    const newPlan: OutfitPlan = {
      ...planData,
      id: `plan-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setOutfitPlans(prev => [...prev, newPlan].sort((a, b) => a.date.localeCompare(b.date)));
    logActivity(`Scheduled look for ${newPlan.date}`, 'plan');
    showToast(`Outfit scheduled for ${newPlan.date}!`, 'success');
  };

  const updateOutfitPlan = (plan: OutfitPlan) => {
    setOutfitPlans(prev => prev.map(p => p.id === plan.id ? plan : p));
    showToast(`Updated plan for ${plan.date}`, 'success');
  };

  const deleteOutfitPlan = (id: string) => {
    setOutfitPlans(prev => prev.filter(p => p.id !== id));
    showToast(`Plan removed`, 'info');
  };

  // User Profile
  const updateUserProfile = (patch: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...patch }));
    showToast(`Profile preferences updated!`, 'success');
  };

  // Feedback
  const submitFeedback = (fb: Omit<FeedbackSubmission, 'id' | 'createdAt'>) => {
    const submission: FeedbackSubmission = {
      ...fb,
      id: `fb-${Date.now()}`,
      createdAt: new Date().toLocaleString()
    };
    setFeedbackList(prev => [submission, ...prev]);
    showToast(`Thank you! Your feedback has been recorded.`, 'success');
  };

  // Reset demo
  const resetAllDemoData = () => {
    localStorage.removeItem('stylesync_wardrobe');
    localStorage.removeItem('stylesync_outfits');
    localStorage.removeItem('stylesync_plans');
    localStorage.removeItem('stylesync_favourites');
    localStorage.removeItem('stylesync_cart');
    localStorage.removeItem('stylesync_profile');
    localStorage.removeItem('stylesync_activity');
    localStorage.removeItem('stylesync_feedback');

    setWardrobe(INITIAL_WARDROBE);
    setSavedOutfits(INITIAL_OUTFITS);
    setOutfitPlans(INITIAL_PLANS);
    setFavourites(['prod-1', 'prod-6']);
    setCart([{ product: INITIAL_PRODUCTS[0], quantity: 1, selectedSize: 'M' }]);
    setUserProfile(DEFAULT_PROFILE);
    setActivityLog([
      { id: '1', text: 'Stylist generated "Smart Campus Presentation Look"', timestamp: '2 hours ago', iconType: 'stylist' },
      { id: '2', text: 'Added Linen Resort Shirt to Favourites', timestamp: 'Yesterday', iconType: 'outfit' },
      { id: '3', text: 'Scheduled outfit for 14th Oct presentation', timestamp: '2 days ago', iconType: 'plan' }
    ]);
    setFeedbackList([]);

    showToast(`All demo data reset to default successfully!`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        navigateTo,
        selectedProductForModal,
        setSelectedProductForModal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        products,
        wardrobe,
        addWardrobeItem,
        updateWardrobeItem,
        deleteWardrobeItem,
        savedOutfits,
        saveOutfit,
        deleteOutfit,
        outfitPlans,
        addOutfitPlan,
        updateOutfitPlan,
        deleteOutfitPlan,
        favourites,
        toggleFavourite,
        isFavourite,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        userProfile,
        updateUserProfile,
        activityLog,
        feedbackList,
        submitFeedback,
        resetAllDemoData,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
