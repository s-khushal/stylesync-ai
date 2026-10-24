# StyleSync AI — Fashion Technology Startup (Full-Stack Edition)

> **"Your Wardrobe. Your Style. Smarter Choices."**  
> *Coursework: Essentials of Management | College Business Project Demonstration*

---

## 📌 Executive Summary

**StyleSync AI** is a responsive, full-stack fashion-technology web platform combining:
1. **AI Fashion Stylist**: Deterministic multi-factor scoring recommendation engine mapping occasions, aesthetics, weather, and budget ceilings to coordinated ensembles with item swapping.
2. **Digital Wardrobe**: Private cloud & local inventory cataloging with photo uploads, silhouette slots, color, and season tagging.
3. **Interactive Outfit Builder**: Visual composition mannequin layer canvas to combine owned wardrobe staples with curated catalogue items.
4. **Outfit Calendar Planner**: Scheduling tool to prepare outfits for college presentations, campus festivals, and casual events.
5. **E-Commerce Catalogue & Demo Bag**: 28 Indian fashion essentials with realistic ₹ (INR) pricing, multi-filter search, wishlists, and simulated checkout.
6. **Management Strategy Suite**: 6-pillar business plan, 12-person startup organizational hierarchy chart, risk contingency matrix, and live personalization dashboard.
7. **Supabase Full-Stack Architecture**: PostgreSQL database with Row Level Security (RLS), Supabase Auth session management, and Supabase Cloud Storage for user wardrobe photos.
8. **Hybrid Resilience**: When Supabase is connected, users get real-time cloud persistence and multi-device access. When unconfigured or offline, it seamlessly falls back to local browser `localStorage` so evaluation is never blocked!

---

## 🏗️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Bundler & Tooling**: Vite 8
- **Backend-as-a-Service**: Supabase (`@supabase/supabase-js`)
  - **Database**: PostgreSQL with UUID keys, foreign key cascades, and Row Level Security (RLS)
  - **Authentication**: Supabase Auth (Email & Password, Session tokens)
  - **Storage**: Supabase Cloud Storage (Private `wardrobe-images` bucket)
- **Styling**: Tailwind CSS v4 with custom luxury editorial palette (Warm ivory `#FAF8F5`, Charcoal `#1A1A1A`, Muted Terracotta `#C86D51`)
- **Typography**: Google Fonts (*Playfair Display* for serif editorial headings & *Plus Jakarta Sans* for UI body copy)
- **Icons**: Lucide React
- **Local Fallback**: Browser `localStorage` with initial seeds and one-click demo reset.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) installed on your system.

### 2. Installation
Open your terminal in the project directory and run:
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173`. Open this URL in any modern browser (Chrome, Edge, Safari, Firefox).

### 4. Build for Production
To verify compilation and generate an optimized production bundle:
```bash
npm run build
```
Production assets are generated inside the `dist/` directory and can be previewed locally with:
```bash
npm run preview
```

---

## ☁️ Full-Stack Supabase Setup Guide

If you want to connect live cloud authentication, PostgreSQL persistence, and cloud photo storage, follow these 5 steps:

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Click **"New Project"**, choose an organization, name it `stylesync-ai`, set a strong database password, and select your preferred region (e.g. `ap-south-1` for Mumbai / India).
3. Wait ~1-2 minutes for the database cluster to provision.

### Step 2: Configure Environment Variables
1. In your Supabase Project Dashboard, navigate to **Project Settings** (gear icon) -> **API**.
2. Locate:
   - **Project URL** (e.g. `https://xyzcompany.supabase.co`)
   - **Project API Keys** -> `anon` / `public` (publishable key safe for client-side use)
3. In your project root, create a file named `.env` (or copy from `.env.example`):
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
   ```
4. Restart your Vite development server (`npm run dev`) to pick up the new environment variables. The top bar in the web app will now display **"Supabase Cloud Connected"**!

### Step 3: Run Database Migrations (SQL Schema)
1. In your Supabase Dashboard, click on **SQL Editor** on the left menu.
2. Click **"New query"**.
3. Open the file `supabase/schema.sql` from this repository, copy its entire contents, and paste it into the Supabase SQL editor.
4. Click **"Run"** (or press Ctrl+Enter).
5. This creates all 8 application tables with automated UUIDs, foreign keys, triggers, and Row Level Security (RLS) policies:
   - `public.profiles`
   - `public.wardrobe_items`
   - `public.saved_outfits`
   - `public.outfit_plans`
   - `public.favourite_products`
   - `public.cart_items`
   - `public.demo_orders`
   - `public.feedback_submissions`
   - `public.catalogue_products`

### Step 4: Configure Authentication
1. In Supabase Dashboard, go to **Authentication** -> **Providers**.
2. Ensure **Email** is enabled.
3. *(Optional for testing)* Under **Authentication** -> **URL Configuration**, ensure your local URL `http://localhost:5173` is in **Redirect URLs**.
4. *(Optional for instant testing without waiting for confirmation emails)* Go to **Authentication** -> **Providers** -> **Email** -> Disable **"Confirm email"** if you want new signups to log in immediately.

### Step 5: Configure Storage Bucket (`wardrobe-images`)
1. In Supabase Dashboard, go to **Storage**.
2. The `schema.sql` script creates the bucket `wardrobe-images` automatically.
3. If it does not appear, click **"New bucket"**, name it `wardrobe-images`, enable **Public bucket**, and set allowed MIME types to image formats (`image/jpeg`, `image/png`, `image/webp`).
4. User upload RLS policies are already pre-configured in `supabase/schema.sql`.

---

## 🔒 Security & Row Level Security (RLS)

1. **No Secret Keys in Client Code**: The frontend only uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. The `service_role` secret key is never exposed.
2. **Strict RLS Isolation**:
   - `auth.uid() = user_id`: Users can only read, insert, update, and delete their own private wardrobe garments, outfits, calendar schedules, and favourites.
   - Cross-user data leaks are blocked directly at the database engine level.
3. **Storage Isolation**: Photos uploaded by a user are stored in `${user_id}/${filename}`, with RLS policies restricting write and delete operations strictly to the file owner.
4. **Local Fallback Privacy**: In demo/guest mode, all uploaded wardrobe photos remain strictly within the user's browser memory/localStorage; zero photos are sent across the network.

---

## 🔄 Guest Demo Data Migration

When a user uses the app in guest mode and then clicks **"Sign Up"**, they can check **"Sync Guest Data"**. The app automatically copies:
- Existing guest wardrobe pieces
- Saved custom outfits
- Calendar plans
- Favourites
into their new Supabase cloud database, avoiding any silent data loss!

---

## 🌐 Deploying to Vercel

To deploy StyleSync AI to Vercel for public demonstration:

### Method A: Via Vercel Dashboard (Recommended)
1. Push your repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `stylesync-ai` repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase publishable anon key
6. Click **"Deploy"**. Your application will be live on a custom `.vercel.app` HTTPS domain in ~45 seconds!

### Method B: Via Vercel CLI
```bash
npm install -g vercel
vercel
# Follow on-screen prompts and input your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY when asked.
```

---

## 🧪 Testing Summary

### Features Successfully Tested & Verified:
- [x] Full production TypeScript and Vite compilation (`npm run build` succeeds in <500ms).
- [x] Resilient dual-mode execution (works seamlessly in Local Demo mode when unconfigured, and in Cloud mode when keys are present).
- [x] Dynamic dashboard metrics calculated live from user assets (no static hardcoding).
- [x] Multi-factor outfit scoring recommendation engine with item swapping and budget ceiling enforcement.
- [x] 28-item Indian fashion catalogue with multi-filter search, color, and price sorting.
- [x] Digital wardrobe photo uploads with FileReader conversion and Supabase Cloud Storage routing.
- [x] Interactive Outfit Builder mannequin canvas.
- [x] Calendar-inspired Outfit Planner with formatted dates.
- [x] Bag subtotal calculations and validated demo checkout with order ID generation.
- [x] 6-Pillar Business Plan and 12-person visual organizational hierarchy chart for Essentials of Management coursework.
- [x] Evaluator Demo Reset button in footer and profile page.

### Features Requiring Manual Supabase Credentials:
- Live email confirmation emails (requires active Supabase project with SMTP or disabled email verification).
- Cloud database persistence across different browsers (requires providing valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`).
