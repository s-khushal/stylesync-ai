import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Product, 
  WardrobeItem, 
  Outfit, 
  OutfitPlan, 
  CartItem, 
  UserProfile, 
  FeedbackSubmission, 
  ActivityLog, 
  AuthUserState,
  PageId 
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { cloudService } from '../services/cloudService';

const EMPTY_PROFILE: UserProfile = {
  name: '',
  email: '',
  collegeOrProfession: '',
  bio: '',
  preferredStyles: ['Minimalist', 'Smart casual'],
  favoriteColors: ['Ivory', 'Terracotta', 'Charcoal'],
  budgetMin: 1500,
  budgetMax: 6000,
  preferredOccasions: ['Casual outing', 'Formal meeting', 'Party']
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

  // Authentication & Cloud State
  currentUser: AuthUserState | null;
  isAuthLoading: boolean;
  isCloudConnected: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'signin' | 'signup' | 'forgot';
  setAuthModalMode: (mode: 'signin' | 'signup' | 'forgot') => void;
  signInWithEmail: (email: string, pass: string) => Promise<{ error?: string }>;
  signUpWithEmail: (email: string, pass: string, fullName?: string, migrateData?: boolean) => Promise<{ error?: string; message?: string }>;
  sendPasswordResetEmail: (email: string) => Promise<{ error?: string; message?: string }>;
  resendConfirmationEmail: (email: string) => Promise<{ error?: string; message?: string }>;
  signOut: () => Promise<void>;
  syncLocalDataToCloud: () => Promise<{ success: boolean; count: number }>;

  // Products & catalogue
  products: Product[];

  // Wardrobe
  wardrobe: WardrobeItem[];
  addWardrobeItem: (item: Omit<WardrobeItem, 'id' | 'createdAt'>, fileToUpload?: File) => Promise<void>;
  updateWardrobeItem: (item: WardrobeItem) => Promise<void>;
  deleteWardrobeItem: (id: string) => Promise<void>;

  // Outfits
  savedOutfits: Outfit[];
  saveOutfit: (outfit: Omit<Outfit, 'id' | 'createdAt'>) => Promise<string>;
  deleteOutfit: (id: string) => Promise<void>;

  // Plans
  outfitPlans: OutfitPlan[];
  addOutfitPlan: (plan: Omit<OutfitPlan, 'id' | 'createdAt'>) => Promise<void>;
  updateOutfitPlan: (plan: OutfitPlan) => Promise<void>;
  deleteOutfitPlan: (id: string) => Promise<void>;

  // Favourites
  favourites: string[];
  toggleFavourite: (productId: string) => Promise<void>;
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
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;

  // Activity & Feedback
  activityLog: ActivityLog[];
  feedbackList: FeedbackSubmission[];
  submitFeedback: (feedback: Omit<FeedbackSubmission, 'id' | 'createdAt'>) => Promise<void>;
  recordCheckoutOrder: (orderData: any) => Promise<boolean>;

  // Utilities & Demo Reset
  resetAllDemoData: () => void;
  toast: { text: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Modals
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Auth & Cloud State
  const [currentUser, setCurrentUser] = useState<AuthUserState | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'forgot'>('signin');

  // Products
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Private User State (empty for visitors; loaded from Supabase upon login)
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);
  const [outfitPlans, setOutfitPlans] = useState<OutfitPlan[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(EMPTY_PROFILE);

  const [activityLog, setActivityLog] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem('stylesync_activity');
      return saved ? JSON.parse(saved) : [
        { id: '1', text: 'Stylist generated "Smart Casual Capsule Look"', timestamp: '2 hours ago', iconType: 'stylist' },
        { id: '2', text: 'Added Linen Resort Shirt to Favourites', timestamp: 'Yesterday', iconType: 'outfit' },
        { id: '3', text: 'Scheduled outfit for Saturday Social', timestamp: '2 days ago', iconType: 'plan' }
      ];
    } catch {
      return [];
    }
  });

  const [feedbackList, setFeedbackList] = useState<FeedbackSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('stylesync_feedback');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Local storage synchronization (used for guest cache and offline preservation)
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
  const showToast = useCallback((text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  }, []);

  const logActivity = useCallback((text: string, iconType: ActivityLog['iconType']) => {
    const newEntry: ActivityLog = {
      id: Date.now().toString(),
      text,
      timestamp: 'Just now',
      iconType
    };
    setActivityLog(prev => [newEntry, ...prev.slice(0, 19)]);
  }, []);

  // --------------------------------------------------------------------------
  // SUPABASE AUTHENTICATION & CLOUD DATA HYDRATION
  // --------------------------------------------------------------------------
  const loadUserDataFromCloud = useCallback(async (userId: string) => {
    try {
      const [cloudWardrobe, cloudOutfits, cloudPlans, cloudFavs, cloudProfile] = await Promise.all([
        cloudService.getWardrobe(userId),
        cloudService.getSavedOutfits(userId),
        cloudService.getPlans(userId),
        cloudService.getFavourites(userId),
        cloudService.getProfile(userId),
      ]);

      // Strictly isolate user records: overwrite state with this user's cloud records
      setWardrobe(cloudWardrobe);
      setSavedOutfits(cloudOutfits);
      setOutfitPlans(cloudPlans);
      setFavourites(cloudFavs);
      if (cloudProfile) {
        setUserProfile(cloudProfile);
      }

      logActivity('Synchronized user assets with Supabase Cloud', 'stylist');
    } catch (err) {
      console.error('Failed to load user data from Supabase:', err);
    }
  }, [logActivity]);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      setIsAuthLoading(false);
      return;
    }

    // Check existing Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser({
          id: session.user.id,
          email: session.user.email || '',
          fullName: session.user.user_metadata?.full_name,
        });
        loadUserDataFromCloud(session.user.id);
      }
      setIsAuthLoading(false);
    });

    // Listen for auth state changes (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setCurrentUser({
          id: session.user.id,
          email: session.user.email || '',
          fullName: session.user.user_metadata?.full_name,
        });
        loadUserDataFromCloud(session.user.id);
      } else {
        setCurrentUser(null);
      }
      setIsAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadUserDataFromCloud]);

  // Auth Operations
  const signInWithEmail = async (email: string, pass: string) => {
    if (!supabase || !isSupabaseConfigured) {
      return { 
        error: 'Supabase authentication is not configured. Please supply VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable authentication.' 
      };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) return { error: error.message };
    if (data.user) {
      setCurrentUser({
        id: data.user.id,
        email: data.user.email || '',
        fullName: data.user.user_metadata?.full_name,
      });
      await loadUserDataFromCloud(data.user.id);
    }
    return {};
  };

  const signUpWithEmail = async (email: string, pass: string, fullName?: string, migrateData = true) => {
    if (!supabase || !isSupabaseConfigured) {
      return { 
        error: 'Supabase authentication is not configured. Please supply VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable authentication.' 
      };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: { full_name: fullName || email.split('@')[0] },
      },
    });
    if (error) return { error: error.message };

    // Supabase can either automatically sign in or require email confirmation
    if (data.user) {
      if (data.session) {
        setCurrentUser({
          id: data.user.id,
          email: data.user.email || '',
          fullName: fullName || data.user.email?.split('@')[0],
        });

        // Migrate existing local data if requested
        if (migrateData) {
          try {
            await cloudService.migrateLocalDataToCloud(data.user.id, {
              wardrobe,
              outfits: savedOutfits,
              plans: outfitPlans,
              favourites,
            });
            showToast('Guest wardrobe migrated to your cloud account!', 'success');
          } catch (mErr) {
            console.error('Migration error:', mErr);
          }
        }
        return { message: 'Account registered successfully!' };
      } else {
        // Confirmation email required
        return { 
          message: 'Account created! We sent a confirmation link to your email. Please verify before signing in.' 
        };
      }
    }
    return {};
  };

  const sendPasswordResetEmail = async (email: string) => {
    if (!supabase || !isSupabaseConfigured) {
      return { error: 'Supabase authentication is not configured.' };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    if (error) return { error: error.message };
    return { message: 'Password reset link sent to your email! Please check your inbox.' };
  };

  const resendConfirmationEmail = async (email: string) => {
    if (!supabase || !isSupabaseConfigured) {
      return { error: 'Supabase authentication is not configured.' };
    }
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });
    if (error) return { error: error.message };
    return { message: 'Confirmation email resent! Please check your inbox.' };
  };

  const signOut = async () => {
    if (supabase && isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setCurrentUser(null);
    // Securely clear private user records from memory and local cache
    setWardrobe([]);
    setSavedOutfits([]);
    setOutfitPlans([]);
    setFavourites([]);
    localStorage.removeItem('stylesync_wardrobe');
    localStorage.removeItem('stylesync_outfits');
    localStorage.removeItem('stylesync_plans');
    localStorage.removeItem('stylesync_favourites');
    setActivePage('home');
    showToast('Signed out successfully. Session ended.', 'info');
  };

  const syncLocalDataToCloud = async () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return { success: false, count: 0 };
    }
    const result = await cloudService.migrateLocalDataToCloud(currentUser.id, {
      wardrobe,
      outfits: savedOutfits,
      plans: outfitPlans,
      favourites,
    });
    showToast(`Synced ${result.migratedItems} items to your cloud database!`, 'success');
    return { success: true, count: result.migratedItems };
  };

  // --------------------------------------------------------------------------
  // NAVIGATION & TOAST
  // --------------------------------------------------------------------------
  const navigateTo = (page: PageId) => {
    const PROTECTED_LIST: PageId[] = ['profile', 'wardrobe', 'builder', 'planner'];
    if (!currentUser && PROTECTED_LIST.includes(page)) {
      setActivePage('auth');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --------------------------------------------------------------------------
  // FAVOURITES ACTIONS
  // --------------------------------------------------------------------------
  const toggleFavourite = async (productId: string) => {
    const exists = favourites.includes(productId);
    const prod = products.find(p => p.id === productId);

    if (exists) {
      setFavourites(prev => prev.filter(id => id !== productId));
      showToast('Removed from favourites', 'info');
      if (currentUser && isSupabaseConfigured) {
        await cloudService.removeFavourite(currentUser.id, productId);
      }
    } else {
      setFavourites(prev => [...prev, productId]);
      showToast(`Added ${prod?.name || 'item'} to favourites!`, 'success');
      logActivity(`Favourited ${prod?.name || 'an item'}`, 'outfit');
      if (currentUser && isSupabaseConfigured) {
        await cloudService.addFavourite(currentUser.id, productId);
      }
    }
  };

  const isFavourite = (productId: string) => favourites.includes(productId);

  // --------------------------------------------------------------------------
  // CART ACTIONS
  // --------------------------------------------------------------------------
  const addToCart = (product: Product, size: string = 'M', quantity: number = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedSize === size);
      let updatedCart: CartItem[];
      if (existingIndex > -1) {
        updatedCart = [...prev];
        updatedCart[existingIndex].quantity += quantity;
      } else {
        updatedCart = [...prev, { product, quantity, selectedSize: size }];
      }

      if (currentUser && isSupabaseConfigured) {
        const targetItem = updatedCart.find(i => i.product.id === product.id && i.selectedSize === size);
        if (targetItem) cloudService.syncCartItem(currentUser.id, targetItem);
      }
      return updatedCart;
    });

    logActivity(`Added ${product.name} to bag`, 'cart');
    showToast(`Added ${product.name} (Size ${size}) to shopping bag!`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => {
      const updated = prev.map(item => item.product.id === productId ? { ...item, quantity } : item);
      if (currentUser && isSupabaseConfigured) {
        const target = updated.find(i => i.product.id === productId);
        if (target) cloudService.syncCartItem(currentUser.id, target);
      }
      return updated;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    if (currentUser && isSupabaseConfigured) {
      cloudService.removeCartItem(currentUser.id, productId);
    }
    showToast('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
    if (currentUser && isSupabaseConfigured) {
      cloudService.clearCart(currentUser.id);
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // --------------------------------------------------------------------------
  // WARDROBE ACTIONS (STORAGE & DB)
  // --------------------------------------------------------------------------
  const addWardrobeItem = async (itemData: Omit<WardrobeItem, 'id' | 'createdAt'>, fileToUpload?: File) => {
    let finalImageUrl = itemData.image;
    let storagePath: string | undefined = undefined;

    // If user is logged in with Supabase and provided a File, upload to Supabase Storage
    if (currentUser && isSupabaseConfigured && fileToUpload) {
      showToast('Uploading wardrobe image to cloud storage...', 'info');
      const uploadRes = await cloudService.uploadWardrobeImage(currentUser.id, fileToUpload);
      if (uploadRes) {
        finalImageUrl = uploadRes.publicUrl;
        storagePath = uploadRes.storagePath;
      }
    }

    // Cloud DB insert if logged in
    if (currentUser && isSupabaseConfigured) {
      const cloudItem = await cloudService.addWardrobeItem(currentUser.id, {
        ...itemData,
        image: finalImageUrl,
      }, storagePath);

      if (cloudItem) {
        setWardrobe(prev => [cloudItem, ...prev]);
        logActivity(`Saved "${cloudItem.name}" to Cloud Wardrobe`, 'wardrobe');
        showToast(`"${cloudItem.name}" saved to your cloud wardrobe!`, 'success');
        return;
      }
    }

    // Local / Guest fallback
    const newItem: WardrobeItem = {
      ...itemData,
      image: finalImageUrl,
      storagePath,
      id: `wardrobe-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setWardrobe(prev => [newItem, ...prev]);
    logActivity(`Added "${newItem.name}" to Digital Wardrobe`, 'wardrobe');
    showToast(`"${newItem.name}" saved to your wardrobe!`, 'success');
  };

  const updateWardrobeItem = async (item: WardrobeItem) => {
    setWardrobe(prev => prev.map(w => w.id === item.id ? item : w));
    if (currentUser && isSupabaseConfigured) {
      await cloudService.updateWardrobeItem(currentUser.id, item);
    }
    showToast(`Updated "${item.name}"`, 'success');
  };

  const deleteWardrobeItem = async (id: string) => {
    const item = wardrobe.find(w => w.id === id);
    setWardrobe(prev => prev.filter(w => w.id !== id));
    if (currentUser && isSupabaseConfigured) {
      await cloudService.deleteWardrobeItem(currentUser.id, id, item?.storagePath);
    }
    showToast(`Removed "${item?.name || 'item'}" from wardrobe`, 'info');
  };

  // --------------------------------------------------------------------------
  // OUTFITS ACTIONS
  // --------------------------------------------------------------------------
  const saveOutfit = async (outfitData: Omit<Outfit, 'id' | 'createdAt'>): Promise<string> => {
    if (currentUser && isSupabaseConfigured) {
      const cloudOutfit = await cloudService.saveOutfit(currentUser.id, outfitData);
      if (cloudOutfit) {
        setSavedOutfits(prev => [cloudOutfit, ...prev]);
        logActivity(`Saved look "${cloudOutfit.name}" to Cloud`, 'outfit');
        showToast(`Outfit "${cloudOutfit.name}" synced to cloud!`, 'success');
        return cloudOutfit.id;
      }
    }

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

  const deleteOutfit = async (id: string) => {
    const outfit = savedOutfits.find(o => o.id === id);
    setSavedOutfits(prev => prev.filter(o => o.id !== id));
    if (currentUser && isSupabaseConfigured) {
      await cloudService.deleteOutfit(currentUser.id, id);
    }
    showToast(`Deleted outfit "${outfit?.name || ''}"`, 'info');
  };

  // --------------------------------------------------------------------------
  // OUTFIT PLANS ACTIONS
  // --------------------------------------------------------------------------
  const addOutfitPlan = async (planData: Omit<OutfitPlan, 'id' | 'createdAt'>) => {
    if (currentUser && isSupabaseConfigured) {
      const cloudPlan = await cloudService.addPlan(currentUser.id, planData);
      if (cloudPlan) {
        setOutfitPlans(prev => [...prev, cloudPlan].sort((a, b) => a.date.localeCompare(b.date)));
        logActivity(`Scheduled look for ${cloudPlan.date}`, 'plan');
        showToast(`Outfit scheduled in cloud calendar for ${cloudPlan.date}!`, 'success');
        return;
      }
    }

    const newPlan: OutfitPlan = {
      ...planData,
      id: `plan-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setOutfitPlans(prev => [...prev, newPlan].sort((a, b) => a.date.localeCompare(b.date)));
    logActivity(`Scheduled look for ${newPlan.date}`, 'plan');
    showToast(`Outfit scheduled for ${newPlan.date}!`, 'success');
  };

  const updateOutfitPlan = async (plan: OutfitPlan) => {
    setOutfitPlans(prev => prev.map(p => p.id === plan.id ? plan : p));
    if (currentUser && isSupabaseConfigured) {
      await cloudService.updatePlan(currentUser.id, plan);
    }
    showToast(`Updated plan for ${plan.date}`, 'success');
  };

  const deleteOutfitPlan = async (id: string) => {
    setOutfitPlans(prev => prev.filter(p => p.id !== id));
    if (currentUser && isSupabaseConfigured) {
      await cloudService.deletePlan(currentUser.id, id);
    }
    showToast('Plan removed from calendar', 'info');
  };

  // --------------------------------------------------------------------------
  // PROFILE, FEEDBACK & CHECKOUT ORDERS
  // --------------------------------------------------------------------------
  const updateUserProfile = async (patch: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...patch }));
    if (currentUser && isSupabaseConfigured) {
      await cloudService.updateProfile(currentUser.id, patch);
    }
    showToast('Profile preferences updated!', 'success');
  };

  const submitFeedback = async (fb: Omit<FeedbackSubmission, 'id' | 'createdAt'>) => {
    const submission: FeedbackSubmission = {
      ...fb,
      id: `fb-${Date.now()}`,
      createdAt: new Date().toLocaleString()
    };
    setFeedbackList(prev => [submission, ...prev]);

    if (isSupabaseConfigured) {
      await cloudService.recordFeedback(currentUser?.id || null, fb);
    }
    showToast('Thank you! Your feedback has been recorded.', 'success');
  };

  const recordCheckoutOrder = async (orderData: any) => {
    if (isSupabaseConfigured) {
      return await cloudService.recordDemoOrder(currentUser?.id || null, orderData);
    }
    return true;
  };

  // --------------------------------------------------------------------------
  // CLEAN RESET
  // --------------------------------------------------------------------------
  const resetAllDemoData = () => {
    localStorage.removeItem('stylesync_wardrobe');
    localStorage.removeItem('stylesync_outfits');
    localStorage.removeItem('stylesync_plans');
    localStorage.removeItem('stylesync_favourites');
    localStorage.removeItem('stylesync_cart');
    localStorage.removeItem('stylesync_profile');
    localStorage.removeItem('stylesync_activity');
    localStorage.removeItem('stylesync_feedback');

    setWardrobe([]);
    setSavedOutfits([]);
    setOutfitPlans([]);
    setFavourites([]);
    setCart([]);
    setUserProfile(EMPTY_PROFILE);
    setActivityLog([]);
    setFeedbackList([]);

    showToast('Guest workspace cleared.', 'info');
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
        currentUser,
        isAuthLoading,
        isCloudConnected: isSupabaseConfigured,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        signInWithEmail,
        signUpWithEmail,
        sendPasswordResetEmail,
        resendConfirmationEmail,
        signOut,
        syncLocalDataToCloud,
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
        recordCheckoutOrder,
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
