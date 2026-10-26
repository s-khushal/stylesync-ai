import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  WardrobeItem, 
  Outfit, 
  OutfitPlan, 
  CartItem, 
  UserProfile, 
  FeedbackSubmission 
} from '../types';

export const cloudService = {
  // --------------------------------------------------------------------------
  // USER PROFILES
  // --------------------------------------------------------------------------
  async getProfile(userId: string): Promise<UserProfile | null> {
    if (!supabase || !isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) return null;

    return {
      name: data.full_name || '',
      email: data.email || '',
      collegeOrProfession: data.college_or_profession || 'Member / Professional',
      bio: data.bio || '',
      preferredStyles: data.preferred_styles || [],
      favoriteColors: data.favorite_colors || [],
      budgetMin: Number(data.budget_min) || 800,
      budgetMax: Number(data.budget_max) || 4000,
      preferredOccasions: data.preferred_occasions || [],
    };
  },

  async updateProfile(userId: string, profile: Partial<UserProfile>): Promise<boolean> {
    if (!supabase || !isSupabaseConfigured) return false;

    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (profile.name !== undefined) payload.full_name = profile.name;
    if (profile.collegeOrProfession !== undefined) payload.college_or_profession = profile.collegeOrProfession;
    if (profile.bio !== undefined) payload.bio = profile.bio;
    if (profile.preferredStyles !== undefined) payload.preferred_styles = profile.preferredStyles;
    if (profile.favoriteColors !== undefined) payload.favorite_colors = profile.favoriteColors;
    if (profile.budgetMin !== undefined) payload.budget_min = profile.budgetMin;
    if (profile.budgetMax !== undefined) payload.budget_max = profile.budgetMax;
    if (profile.preferredOccasions !== undefined) payload.preferred_occasions = profile.preferredOccasions;

    const { error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', userId);

    return !error;
  },

  // --------------------------------------------------------------------------
  // WARDROBE STORAGE & ITEMS
  // --------------------------------------------------------------------------
  async uploadWardrobeImage(userId: string, file: File): Promise<{ publicUrl: string; storagePath: string } | null> {
    if (!supabase || !isSupabaseConfigured) return null;

    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const storagePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('wardrobe-images')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('wardrobe-images')
      .getPublicUrl(storagePath);

    return {
      publicUrl: urlData.publicUrl,
      storagePath,
    };
  },

  async getWardrobe(userId: string): Promise<WardrobeItem[]> {
    if (!supabase || !isSupabaseConfigured) return [];

    const { data, error } = await supabase
      .from('wardrobe_items')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      slot: row.slot,
      color: row.color,
      season: row.season,
      tags: row.tags || [],
      image: row.image_url,
      createdAt: row.created_at ? row.created_at.split('T')[0] : '',
    }));
  },

  async addWardrobeItem(
    userId: string, 
    item: Omit<WardrobeItem, 'id' | 'createdAt'>, 
    storagePath?: string
  ): Promise<WardrobeItem | null> {
    if (!supabase || !isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('wardrobe_items')
      .insert({
        user_id: userId,
        name: item.name,
        category: item.category,
        slot: item.slot,
        color: item.color,
        season: item.season,
        tags: item.tags,
        image_url: item.image,
        storage_path: storagePath || null,
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Add wardrobe item error:', error);
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      category: data.category,
      slot: data.slot,
      color: data.color,
      season: data.season,
      tags: data.tags || [],
      image: data.image_url,
      createdAt: data.created_at.split('T')[0],
    };
  },

  async updateWardrobeItem(userId: string, item: WardrobeItem): Promise<boolean> {
    if (!supabase || !isSupabaseConfigured) return false;

    const { error } = await supabase
      .from('wardrobe_items')
      .update({
        name: item.name,
        category: item.category,
        slot: item.slot,
        color: item.color,
        season: item.season,
        tags: item.tags,
        image_url: item.image,
        updated_at: new Date().toISOString(),
      })
      .eq('id', item.id)
      .eq('user_id', userId);

    return !error;
  },

  async deleteWardrobeItem(userId: string, itemId: string, storagePath?: string): Promise<boolean> {
    if (!supabase || !isSupabaseConfigured) return false;

    const { error } = await supabase
      .from('wardrobe_items')
      .delete()
      .eq('id', itemId)
      .eq('user_id', userId);

    if (storagePath) {
      await supabase.storage.from('wardrobe-images').remove([storagePath]);
    }

    return !error;
  },

  // --------------------------------------------------------------------------
  // SAVED OUTFITS
  // --------------------------------------------------------------------------
  async getSavedOutfits(userId: string): Promise<Outfit[]> {
    if (!supabase || !isSupabaseConfigured) return [];

    const { data, error } = await supabase
      .from('saved_outfits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map((row) => ({
      id: row.id,
      name: row.name,
      occasion: row.occasion,
      style: row.style,
      top: row.top,
      bottom: row.bottom,
      footwear: row.footwear,
      outerwear: row.outerwear,
      accessory: row.accessory,
      totalPrice: Number(row.total_price) || 0,
      notes: row.notes || undefined,
      createdAt: row.created_at ? row.created_at.split('T')[0] : '',
    }));
  },

  async saveOutfit(userId: string, outfit: Omit<Outfit, 'id' | 'createdAt'>): Promise<Outfit | null> {
    if (!supabase || !isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('saved_outfits')
      .insert({
        user_id: userId,
        name: outfit.name,
        occasion: outfit.occasion,
        style: outfit.style,
        top: outfit.top || null,
        bottom: outfit.bottom || null,
        footwear: outfit.footwear || null,
        outerwear: outfit.outerwear || null,
        accessory: outfit.accessory || null,
        total_price: outfit.totalPrice || 0,
        notes: outfit.notes || null,
      })
      .select()
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      name: data.name,
      occasion: data.occasion,
      style: data.style,
      top: data.top,
      bottom: data.bottom,
      footwear: data.footwear,
      outerwear: data.outerwear,
      accessory: data.accessory,
      totalPrice: Number(data.total_price) || 0,
      notes: data.notes || undefined,
      createdAt: data.created_at.split('T')[0],
    };
  },

  async deleteOutfit(userId: string, outfitId: string): Promise<boolean> {
    if (!supabase || !isSupabaseConfigured) return false;

    const { error } = await supabase
      .from('saved_outfits')
      .delete()
      .eq('id', outfitId)
      .eq('user_id', userId);

    return !error;
  },

  // --------------------------------------------------------------------------
  // OUTFIT PLANS (CALENDAR)
  // --------------------------------------------------------------------------
  async getPlans(userId: string): Promise<OutfitPlan[]> {
    if (!supabase || !isSupabaseConfigured) return [];

    const { data, error } = await supabase
      .from('outfit_plans')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true });

    if (error || !data) return [];

    return data.map((row) => ({
      id: row.id,
      date: row.date,
      occasion: row.occasion,
      outfitId: row.outfit_id || '',
      outfitName: row.outfit_name,
      outfitPreviewImages: row.outfit_preview_images || [],
      notes: row.notes || undefined,
      createdAt: row.created_at ? row.created_at.split('T')[0] : '',
    }));
  },

  async addPlan(userId: string, plan: Omit<OutfitPlan, 'id' | 'createdAt'>): Promise<OutfitPlan | null> {
    if (!supabase || !isSupabaseConfigured) return null;

    const { data, error } = await supabase
      .from('outfit_plans')
      .insert({
        user_id: userId,
        date: plan.date,
        occasion: plan.occasion,
        outfit_id: plan.outfitId,
        outfit_name: plan.outfitName,
        outfit_preview_images: plan.outfitPreviewImages || [],
        notes: plan.notes || null,
      })
      .select()
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      date: data.date,
      occasion: data.occasion,
      outfitId: data.outfit_id || '',
      outfitName: data.outfit_name,
      outfitPreviewImages: data.outfit_preview_images || [],
      notes: data.notes || undefined,
      createdAt: data.created_at.split('T')[0],
    };
  },

  async updatePlan(userId: string, plan: OutfitPlan): Promise<boolean> {
    if (!supabase || !isSupabaseConfigured) return false;

    const { error } = await supabase
      .from('outfit_plans')
      .update({
        date: plan.date,
        occasion: plan.occasion,
        outfit_id: plan.outfitId,
        outfit_name: plan.outfitName,
        outfit_preview_images: plan.outfitPreviewImages,
        notes: plan.notes || null,
      })
      .eq('id', plan.id)
      .eq('user_id', userId);

    return !error;
  },

  async deletePlan(userId: string, planId: string): Promise<boolean> {
    if (!supabase || !isSupabaseConfigured) return false;

    const { error } = await supabase
      .from('outfit_plans')
      .delete()
      .eq('id', planId)
      .eq('user_id', userId);

    return !error;
  },

  // --------------------------------------------------------------------------
  // FAVOURITES
  // --------------------------------------------------------------------------
  async getFavourites(userId: string): Promise<string[]> {
    if (!supabase || !isSupabaseConfigured) return [];

    const { data, error } = await supabase
      .from('favourite_products')
      .select('product_id')
      .eq('user_id', userId);

    if (error || !data) return [];
    return data.map((r) => r.product_id);
  },

  async addFavourite(userId: string, productId: string): Promise<boolean> {
    if (!supabase || !isSupabaseConfigured) return false;

    const { error } = await supabase
      .from('favourite_products')
      .insert({
        user_id: userId,
        product_id: productId,
      });

    return !error;
  },

  async removeFavourite(userId: string, productId: string): Promise<boolean> {
    if (!supabase || !isSupabaseConfigured) return false;

    const { error } = await supabase
      .from('favourite_products')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    return !error;
  },

  // --------------------------------------------------------------------------
  // SHOPPING CART
  // --------------------------------------------------------------------------
  async getCart(userId: string): Promise<CartItem[]> {
    if (!supabase || !isSupabaseConfigured) return [];

    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId);

    if (error || !data) return [];

    return data
      .filter((row) => row.product_snapshot)
      .map((row) => ({
        product: row.product_snapshot,
        quantity: row.quantity,
        selectedSize: row.selected_size,
      }));
  },

  async syncCartItem(userId: string, item: CartItem): Promise<boolean> {
    if (!supabase || !isSupabaseConfigured) return false;

    const { error } = await supabase
      .from('cart_items')
      .upsert(
        {
          user_id: userId,
          product_id: item.product.id,
          selected_size: item.selectedSize,
          quantity: item.quantity,
          product_snapshot: item.product,
        },
        { onConflict: 'user_id,product_id,selected_size' }
      );

    return !error;
  },

  async removeCartItem(userId: string, productId: string, size?: string): Promise<boolean> {
    if (!supabase || !isSupabaseConfigured) return false;

    let query = supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (size) {
      query = query.eq('selected_size', size);
    }

    const { error } = await query;
    return !error;
  },

  async clearCart(userId: string): Promise<boolean> {
    if (!supabase || !isSupabaseConfigured) return false;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    return !error;
  },

  // --------------------------------------------------------------------------
  // DEMO ORDERS & FEEDBACK
  // --------------------------------------------------------------------------
  async recordDemoOrder(userId: string | null, orderData: {
    orderNumber: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pinCode: string;
    paymentMethod: string;
    items: CartItem[];
    totalAmount: number;
  }): Promise<boolean> {
    if (!supabase || !isSupabaseConfigured) return false;

    const { error } = await supabase.from('demo_orders').insert({
      user_id: userId || null,
      order_number: orderData.orderNumber,
      full_name: orderData.fullName,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
      pin_code: orderData.pinCode,
      payment_method: orderData.paymentMethod,
      items: orderData.items,
      total_amount: orderData.totalAmount,
    });

    return !error;
  },

  async recordFeedback(userId: string | null, feedback: Omit<FeedbackSubmission, 'id' | 'createdAt'>): Promise<boolean> {
    if (!supabase || !isSupabaseConfigured) return false;

    const { error } = await supabase.from('feedback_submissions').insert({
      user_id: userId || null,
      name: feedback.name,
      email: feedback.email,
      category: feedback.category,
      message: feedback.message,
    });

    return !error;
  },

  // --------------------------------------------------------------------------
  // DATA MIGRATION FROM LOCALSTORAGE TO SUPABASE CLOUD
  // --------------------------------------------------------------------------
  async migrateLocalDataToCloud(userId: string, localData: {
    wardrobe: WardrobeItem[];
    outfits: Outfit[];
    plans: OutfitPlan[];
    favourites: string[];
  }): Promise<{ migratedItems: number }> {
    if (!supabase || !isSupabaseConfigured) return { migratedItems: 0 };

    let count = 0;

    // Migrate Wardrobe
    for (const item of localData.wardrobe) {
      const { error } = await supabase.from('wardrobe_items').insert({
        user_id: userId,
        name: item.name,
        category: item.category,
        slot: item.slot,
        color: item.color,
        season: item.season,
        tags: item.tags,
        image_url: item.image,
      });
      if (!error) count++;
    }

    // Migrate Outfits
    for (const outfit of localData.outfits) {
      const { error } = await supabase.from('saved_outfits').insert({
        user_id: userId,
        name: outfit.name,
        occasion: outfit.occasion,
        style: outfit.style,
        top: outfit.top || null,
        bottom: outfit.bottom || null,
        footwear: outfit.footwear || null,
        outerwear: outfit.outerwear || null,
        accessory: outfit.accessory || null,
        total_price: outfit.totalPrice || 0,
        notes: outfit.notes || null,
      });
      if (!error) count++;
    }

    // Migrate Plans
    for (const plan of localData.plans) {
      const { error } = await supabase.from('outfit_plans').insert({
        user_id: userId,
        date: plan.date,
        occasion: plan.occasion,
        outfit_id: plan.outfitId,
        outfit_name: plan.outfitName,
        outfit_preview_images: plan.outfitPreviewImages,
        notes: plan.notes || null,
      });
      if (!error) count++;
    }

    // Migrate Favourites
    for (const fav of localData.favourites) {
      await supabase.from('favourite_products').insert({
        user_id: userId,
        product_id: fav,
      });
    }

    return { migratedItems: count };
  },
};
