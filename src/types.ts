export type Category = 
  | 'Tops'
  | 'Shirts'
  | 'T-shirts'
  | 'Trousers'
  | 'Jeans'
  | 'Dresses'
  | 'Jackets'
  | 'Footwear'
  | 'Accessories';

export type StyleTag = 
  | 'Casual'
  | 'Minimalist'
  | 'Streetwear'
  | 'Formal'
  | 'Smart casual'
  | 'Traditional fusion';

export type OccasionTag = 
  | 'College'
  | 'Casual outing'
  | 'Party'
  | 'Formal meeting'
  | 'Wedding or celebration'
  | 'Travel'
  | 'Everyday wear';

export type SeasonTag = 'All-Season' | 'Summer' | 'Winter' | 'Monsoon' | 'Spring';

export interface Product {
  id: string;
  name: string;
  category: Category;
  slot: 'top' | 'bottom' | 'footwear' | 'outerwear' | 'accessory';
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  colors: string[];
  styles: StyleTag[];
  occasions: OccasionTag[];
  season: SeasonTag;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  material?: string;
}

export interface WardrobeItem {
  id: string;
  name: string;
  category: Category;
  slot: 'top' | 'bottom' | 'footwear' | 'outerwear' | 'accessory';
  color: string;
  season: SeasonTag;
  tags: string[];
  image: string;
  createdAt: string;
}

export interface OutfitPiece {
  id: string;
  name: string;
  category: Category;
  slot: 'top' | 'bottom' | 'footwear' | 'outerwear' | 'accessory';
  image: string;
  price?: number;
  source: 'catalogue' | 'wardrobe';
  reason?: string;
}

export interface Outfit {
  id: string;
  name: string;
  occasion: OccasionTag;
  style: StyleTag;
  top?: OutfitPiece;
  bottom?: OutfitPiece;
  footwear?: OutfitPiece;
  outerwear?: OutfitPiece;
  accessory?: OutfitPiece;
  totalPrice: number;
  createdAt: string;
  notes?: string;
}

export interface OutfitPlan {
  id: string;
  date: string; // YYYY-MM-DD
  occasion: OccasionTag | string;
  outfitId: string;
  outfitName: string;
  outfitPreviewImages: string[];
  notes?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface UserProfile {
  name: string;
  email: string;
  preferredStyles: StyleTag[];
  favoriteColors: string[];
  budgetMin: number;
  budgetMax: number;
  preferredOccasions: OccasionTag[];
  collegeOrProfession: string;
  bio: string;
}

export interface FeedbackSubmission {
  id: string;
  name: string;
  email: string;
  category: 'Stylist Feedback' | 'Feature Request' | 'Catalogue Bug' | 'Business Inquiry' | 'General';
  message: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  text: string;
  timestamp: string;
  iconType: 'outfit' | 'cart' | 'wardrobe' | 'plan' | 'stylist';
}

export type PageId = 
  | 'home'
  | 'stylist'
  | 'discover'
  | 'wardrobe'
  | 'builder'
  | 'planner'
  | 'profile'
  | 'about'
  | 'business-plan'
  | 'team'
  | 'contact';
