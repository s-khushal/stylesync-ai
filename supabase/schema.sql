-- ==============================================================================
-- STYLESYNC AI — PRODUCTION SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================
-- Description: Complete PostgreSQL database setup for StyleSync AI Fashion Tech.
-- Run this script in the Supabase Dashboard SQL Editor (or via Supabase CLI).
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. USER PROFILES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  college_or_profession TEXT DEFAULT 'Student / Professional',
  bio TEXT DEFAULT 'Building my capsule wardrobe with StyleSync AI.',
  preferred_styles TEXT[] DEFAULT ARRAY['Smart casual', 'Minimalist'],
  favorite_colors TEXT[] DEFAULT ARRAY['Ivory', 'Terracotta', 'Beige', 'Charcoal'],
  budget_min NUMERIC DEFAULT 800,
  budget_max NUMERIC DEFAULT 4000,
  preferred_occasions TEXT[] DEFAULT ARRAY['College', 'Casual outing', 'Formal meeting'],
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Automatically create profile row when user signs up in Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 2. WARDROBE ITEMS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.wardrobe_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  slot TEXT NOT NULL CHECK (slot IN ('top', 'bottom', 'footwear', 'outerwear', 'accessory')),
  color TEXT NOT NULL,
  season TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT NOT NULL,
  storage_path TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.wardrobe_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own wardrobe items" 
  ON public.wardrobe_items FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own wardrobe items" 
  ON public.wardrobe_items FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wardrobe items" 
  ON public.wardrobe_items FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own wardrobe items" 
  ON public.wardrobe_items FOR DELETE 
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_wardrobe_user_id ON public.wardrobe_items(user_id);
CREATE INDEX IF NOT EXISTS idx_wardrobe_slot ON public.wardrobe_items(slot);

-- ==============================================================================
-- 3. SAVED OUTFITS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.saved_outfits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  occasion TEXT NOT NULL,
  style TEXT NOT NULL,
  top JSONB,
  bottom JSONB,
  footwear JSONB,
  outerwear JSONB,
  accessory JSONB,
  total_price NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.saved_outfits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved outfits" 
  ON public.saved_outfits FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved outfits" 
  ON public.saved_outfits FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved outfits" 
  ON public.saved_outfits FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved outfits" 
  ON public.saved_outfits FOR DELETE 
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_saved_outfits_user_id ON public.saved_outfits(user_id);

-- ==============================================================================
-- 4. OUTFIT PLANS TABLE (Calendar)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.outfit_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  occasion TEXT NOT NULL,
  outfit_id TEXT,
  outfit_name TEXT NOT NULL,
  outfit_preview_images TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.outfit_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own outfit plans" 
  ON public.outfit_plans FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own outfit plans" 
  ON public.outfit_plans FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own outfit plans" 
  ON public.outfit_plans FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own outfit plans" 
  ON public.outfit_plans FOR DELETE 
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_outfit_plans_user_date ON public.outfit_plans(user_id, date);

-- ==============================================================================
-- 5. FAVOURITE PRODUCTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.favourite_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, product_id)
);

ALTER TABLE public.favourite_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favourite products" 
  ON public.favourite_products FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add favourite products" 
  ON public.favourite_products FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove favourite products" 
  ON public.favourite_products FOR DELETE 
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_favourites_user_id ON public.favourite_products(user_id);

-- ==============================================================================
-- 6. SHOPPING CART ITEMS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  selected_size TEXT NOT NULL DEFAULT 'M',
  product_snapshot JSONB,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, product_id, selected_size)
);

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart items" 
  ON public.cart_items FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into own cart" 
  ON public.cart_items FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart item" 
  ON public.cart_items FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items" 
  ON public.cart_items FOR DELETE 
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_cart_user_id ON public.cart_items(user_id);

-- ==============================================================================
-- 7. DEMO ORDERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.demo_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_number TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  pin_code TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.demo_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create demo order" 
  ON public.demo_orders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view own demo orders" 
  ON public.demo_orders FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- ==============================================================================
-- 8. FEEDBACK & CONTACT SUBMISSIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.feedback_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.feedback_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback" 
  ON public.feedback_submissions FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view own feedback submissions" 
  ON public.feedback_submissions FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- ==============================================================================
-- 9. SHARED PUBLIC CATALOGUE TABLE (Optional Read-Only Mirror)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.catalogue_products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  slot TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  description TEXT,
  image TEXT NOT NULL,
  colors TEXT[] DEFAULT '{}',
  styles TEXT[] DEFAULT '{}',
  occasions TEXT[] DEFAULT '{}',
  season TEXT,
  in_stock BOOLEAN DEFAULT true,
  rating NUMERIC DEFAULT 4.5,
  reviews_count INTEGER DEFAULT 0,
  material TEXT
);

ALTER TABLE public.catalogue_products ENABLE ROW LEVEL SECURITY;

-- Shared public catalogue is readable by all visitors (authenticated or anonymous)
CREATE POLICY "Public can read catalogue products" 
  ON public.catalogue_products FOR SELECT 
  USING (true);

-- Ordinary users cannot modify the shared catalogue
-- (Only service role or migrations can insert/update/delete)

-- ==============================================================================
-- 10. STORAGE BUCKET: wardrobe-images
-- ==============================================================================
-- Create the storage bucket for user wardrobe images if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'wardrobe-images',
  'wardrobe-images',
  true,
  5242880, -- 5 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Storage RLS: Users can only upload and modify within their own user folder
DROP POLICY IF EXISTS "Authenticated users can upload wardrobe images" ON storage.objects;
CREATE POLICY "Authenticated users can upload wardrobe images" 
  ON storage.objects FOR INSERT 
  WITH CHECK (
    bucket_id = 'wardrobe-images' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "Users can update own wardrobe images" ON storage.objects;
CREATE POLICY "Users can update own wardrobe images" 
  ON storage.objects FOR UPDATE 
  USING (
    bucket_id = 'wardrobe-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can delete own wardrobe images" ON storage.objects;
CREATE POLICY "Users can delete own wardrobe images" 
  ON storage.objects FOR DELETE 
  USING (
    bucket_id = 'wardrobe-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Public can view wardrobe images with valid URL" ON storage.objects;
CREATE POLICY "Public can view wardrobe images with valid URL" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'wardrobe-images');
