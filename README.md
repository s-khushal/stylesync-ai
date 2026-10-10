# StyleSync AI — Fashion Technology Startup

> **"Your Wardrobe. Your Style. Smarter Choices."**  
> *Coursework: Essentials of Management | College Business Project Demonstration*

---

## 📌 Executive Summary

**StyleSync AI** is a fully functioning fashion-technology web platform combining:
1. **AI Fashion Stylist**: Multi-factor scoring recommendation engine mapping occasions, aesthetics, weather, and budget ceilings to coordinated ensembles.
2. **Digital Wardrobe**: Private client-side inventory cataloging for clothing items with image uploads, categories, color, and season tagging.
3. **Interactive Outfit Builder**: Visual composition canvas to combine owned wardrobe staples with curated catalogue items.
4. **Outfit Calendar Planner**: Scheduling tool to prepare outfits for college presentations, campus festivals, and casual events.
5. **E-Commerce Catalogue & Demo Bag**: 28 Indian fashion essentials with realistic ₹ (INR) pricing, multi-filter search, wishlists, and simulated checkout.
6. **Management Strategy Suite**: 6-pillar business plan, 12-person startup organizational hierarchy chart, risk contingency matrix, and live personalization dashboard.

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
To generate an optimized production bundle:
```bash
npm run build
```
Production assets are generated inside the `dist/` directory and can be previewed locally with:
```bash
npm run preview
```

---

## 🏗️ Technology Architecture

- **Frontend Framework**: React 19 with TypeScript
- **Bundler & Tooling**: Vite 8
- **Styling**: Tailwind CSS v4 with custom luxury editorial palette (Warm ivory `#FAF8F5`, Charcoal `#1A1A1A`, Muted Terracotta `#C86D51`)
- **Typography**: Google Fonts (*Playfair Display* for serif editorial headings & *Plus Jakarta Sans* for UI body copy)
- **Icons**: Lucide React
- **Persistence Layer**: Browser `localStorage` with resilient initial seed fallbacks and one-click demo reset.

---

## 📂 Project Structure

```
stylesync-ai/
├── src/
│   ├── types.ts                    # Domain interfaces (Product, Outfit, Wardrobe, Plan, etc.)
│   ├── data/
│   │   ├── products.ts             # 28 realistic Indian fashion items in INR
│   │   ├── initialWardrobe.ts      # Seeded digital wardrobe items
│   │   ├── initialOutfits.ts       # Sample saved ensembles
│   │   └── initialPlans.ts         # Calendar schedules
│   ├── utils/
│   │   └── stylistEngine.ts        # Multi-factor algorithmic scoring engine
│   ├── context/
│   │   └── AppContext.tsx          # Global state, persistence, cart, & notifications
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx          # Responsive navigation & category dropdown
│   │   │   ├── Footer.tsx          # Academic disclosures & reset demo state
│   │   │   ├── ProductCard.tsx     # Reusable card with wishlist and bag triggers
│   │   │   ├── ImageWithFallback.tsx # Resilient image loader with error boundaries
│   │   │   └── Toast.tsx           # Feedback notifications
│   │   └── pages/
│   │       ├── HomePage.tsx        # Hero, value proposition, 4-step workflow
│   │       ├── StylistPage.tsx     # Interactive AI recommendation generator & swapper
│   │       ├── DiscoverPage.tsx    # Multi-filter searchable catalogue (28 items)
│   │       ├── WardrobePage.tsx    # Digital closet with image uploads & editing
│   │       ├── OutfitBuilderPage.tsx # Visual mannequin composition canvas
│   │       ├── OutfitPlannerPage.tsx # Calendar scheduler
│   │       ├── ProfilePage.tsx     # Live calculated metrics dashboard
│   │       ├── AboutPage.tsx       # Mission, business model, problem/solution
│   │       ├── BusinessPlanPage.tsx # 6 Management components (Objectives, Target, etc.)
│   │       ├── TeamOrgPage.tsx     # 12-person org chart & governance decisions
│   │       ├── ContactPage.tsx     # Validated feedback form
│   │       ├── ProductDetailModal.tsx # Deep inspection modal
│   │       └── CheckoutModal.tsx   # Simulated order checkout & confirmation
│   ├── App.tsx                     # Top-level view router
│   ├── index.css                   # Custom styles & fonts
│   └── main.tsx                    # React DOM entry point
├── package.json
└── vite.config.ts
```

---

## 💾 Where Demo Data is Stored

All application modifications persist within your browser's **`localStorage`**:
- `stylesync_wardrobe`: User's uploaded and edited clothing items
- `stylesync_outfits`: Ensembles saved from the Stylist or Outfit Builder
- `stylesync_plans`: Calendar date commitments
- `stylesync_favourites`: Product ID wishlist array
- `stylesync_cart`: Shopping bag items and quantities
- `stylesync_profile`: User preferences and styling bio
- `stylesync_activity`: Real-time session activity feed
- `stylesync_feedback`: Feedback submissions

### Evaluator Demo Reset
If your professor or evaluator wants to restart the presentation test journey from a clean state, click **"Reset Demo State"** located in:
1. The **Footer** on any page
2. The **Evaluator Reset Tools** section in the **User Profile** page (`PAGE H`)

---

## 🔒 Safety, Privacy & Academic Honesty

1. **No Hidden Paid APIs**: The application is 100% self-contained and does not require paid OpenAI/Gemini secret keys to run or demonstrate.
2. **Local Image Privacy**: Wardrobe photos uploaded via the file picker are read as local Data URLs in the browser. Zero images are transmitted to external surveillance or cloud endpoints.
3. **Simulated Commerce**: The checkout experience validates name, campus hostel address, and payment method without capturing real credit card numbers or processing actual banking transactions.
4. **Transparent Stylist Engine**: The recommendation engine is explicitly documented as an implemented multi-factor algorithmic scoring engine. We do not make false claims that a large language model is connected when it is running client-side rules.

---

## 🤖 Connecting a Production AI Model (Future Roadmap)

To transition from the current deterministic rule-based engine to a multimodal foundation AI model:
1. **Backend Integration**: Deploy a lightweight FastAPI / Node.js proxy server.
2. **Gemini 2.5 Flash / Vision API**: Pass uploaded wardrobe images and context criteria to the vision model:
   ```json
   {
     "occasion": "Campus Placement Interview",
     "wardrobe_images": ["data:image/jpeg;base64,..."],
     "catalogue_items": [...],
     "budget_inr": 4000
   }
   ```
3. **Structured Outputs**: Request JSON responses matching the existing `OutfitPiece` schema so the frontend UI requires zero modifications.

---

## 🌐 Deployment Options

- **Vercel / Netlify**: Connect the repository or drag-and-drop the `dist/` folder for instant global HTTPS hosting.
- **GitHub Pages**: Build with relative base path and deploy via GitHub Actions.
