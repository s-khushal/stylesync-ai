import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from './ImageWithFallback';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleFavourite, isFavourite, addToCart, setSelectedProductForModal } = useApp();
  const favourited = isFavourite(product.id);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl border border-[#EDE8E0] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F2EB]">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite(product.id);
          }}
          aria-label="Add to favourites"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1A1A1A] hover:bg-white hover:scale-110 transition-all shadow-sm"
        >
          <Heart className={`w-4 h-4 ${favourited ? 'fill-[#C86D51] text-[#C86D51]' : 'text-[#4A4A4A]'}`} />
        </button>

        {/* Quick View Overlay Button */}
        <button
          onClick={() => setSelectedProductForModal(product)}
          className="absolute bottom-3 left-3 right-3 bg-white/95 text-[#1A1A1A] text-xs font-semibold py-2.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5 shadow-md hover:bg-white"
        >
          <Eye className="w-3.5 h-3.5" /> Quick View
        </button>
      </div>

      {/* Info container */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-xs text-[#8C7E6D] mb-1.5">
            <span className="uppercase font-medium tracking-wider">{product.category}</span>
            <div className="flex items-center gap-1 text-[#1A1A1A] font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-[#8C7E6D]">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => setSelectedProductForModal(product)}
            className="text-sm font-semibold text-[#1A1A1A] hover:text-[#C86D51] cursor-pointer line-clamp-1 transition-colors"
          >
            {product.name}
          </h3>

          <div className="flex flex-wrap gap-1 my-2">
            {product.styles.slice(0, 2).map((s) => (
              <span key={s} className="text-[10px] bg-[#FAF6F0] text-[#7A6B5B] px-2 py-0.5 rounded-md font-medium border border-[#EFECE6]">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-[#F5F2EB] flex items-center justify-between mt-2">
          <div>
            <div className="text-base font-bold text-[#1A1A1A]">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.originalPrice && (
              <span className="text-xs text-[#9E9486] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 'M')}
            className="p-2.5 rounded-xl bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white border border-[#E8E2D8] hover:border-[#1A1A1A] transition-all flex items-center justify-center gap-1 shadow-sm"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
