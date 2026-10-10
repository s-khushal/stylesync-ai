import { Product, OccasionTag, StyleTag, SeasonTag, OutfitPiece } from '../types';

export interface StylistCriteria {
  occasion: OccasionTag;
  style: StyleTag;
  budgetMax: number;
  preferredColors: string[];
  season: SeasonTag;
  includeCategories: {
    top: boolean;
    bottom: boolean;
    footwear: boolean;
    outerwear: boolean;
    accessory: boolean;
  };
}

export interface ScoredCandidate {
  product: Product;
  score: number;
  reason: string;
}

export function rankCandidatesForSlot(
  products: Product[],
  slot: 'top' | 'bottom' | 'footwear' | 'outerwear' | 'accessory',
  criteria: StylistCriteria,
  seedOffset: number = 0
): ScoredCandidate[] {
  const slotCandidates = products.filter(p => p.slot === slot && p.inStock);

  const scored = slotCandidates.map(product => {
    let score = 0;
    const reasons: string[] = [];

    // Occasion affinity (+35)
    if (product.occasions.includes(criteria.occasion)) {
      score += 35;
      reasons.push(`Curated specifically for ${criteria.occasion}`);
    }

    // Style affinity (+30)
    if (product.styles.includes(criteria.style)) {
      score += 30;
      reasons.push(`Embodies ${criteria.style} silhouette`);
    }

    // Color affinity (+20)
    const hasColorMatch = product.colors.some(c => 
      criteria.preferredColors.some(pc => c.toLowerCase().includes(pc.toLowerCase()) || pc.toLowerCase().includes(c.toLowerCase()))
    );
    if (hasColorMatch) {
      score += 20;
      reasons.push('Harmonizes with preferred color palette');
    }

    // Season affinity (+15)
    if (product.season === criteria.season || product.season === 'All-Season') {
      score += 15;
      reasons.push(`Optimized for ${criteria.season} weather`);
    }

    // Rating quality bonus
    score += Math.round(product.rating * 2);

    // Random jitter for diversity on "Generate Another Look"
    const jitter = Math.sin(product.id.charCodeAt(product.id.length - 1) + seedOffset) * 12;
    score += jitter;

    // Craft synthesized reason string
    const finalReason = reasons.length > 0 
      ? reasons.join('. ') + '.'
      : `Versatile ${product.category.toLowerCase()} pairing for clean silhouette balance.`;

    return {
      product,
      score,
      reason: finalReason
    };
  });

  return scored.sort((a, b) => b.score - a.score);
}

export function generateOutfitRecommendation(
  products: Product[],
  criteria: StylistCriteria,
  seedOffset: number = 0
): {
  top?: OutfitPiece;
  bottom?: OutfitPiece;
  footwear?: OutfitPiece;
  outerwear?: OutfitPiece;
  accessory?: OutfitPiece;
  totalPrice: number;
} {
  const result: {
    top?: OutfitPiece;
    bottom?: OutfitPiece;
    footwear?: OutfitPiece;
    outerwear?: OutfitPiece;
    accessory?: OutfitPiece;
    totalPrice: number;
  } = { totalPrice: 0 };

  const slots: ('top' | 'bottom' | 'footwear' | 'outerwear' | 'accessory')[] = [
    'top', 'bottom', 'footwear', 'outerwear', 'accessory'
  ];

  slots.forEach(slot => {
    if (criteria.includeCategories[slot]) {
      const candidates = rankCandidatesForSlot(products, slot, criteria, seedOffset);
      if (candidates.length > 0) {
        // Pick best candidate or cycle by seed
        const pickIndex = seedOffset % Math.min(candidates.length, 3);
        const selected = candidates[pickIndex] || candidates[0];
        
        result[slot] = {
          id: selected.product.id,
          name: selected.product.name,
          category: selected.product.category,
          slot: selected.product.slot,
          image: selected.product.image,
          price: selected.product.price,
          source: 'catalogue',
          reason: selected.reason
        };
        result.totalPrice += selected.product.price;
      }
    }
  });

  return result;
}
