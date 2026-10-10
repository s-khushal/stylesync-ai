import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { X, Heart, ShoppingBag, Star, Check, Sparkles } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForModal, setSelectedProductForModal, addToCart, toggleFavourite, isFavourite } = useApp();
  const [selectedSize, setSelectedSize] = useState<string>('M');

  if (!selectedProductForModal) return null;
  const product = selectedProductForModal;
  const favourited = isFavourite(product.id);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#EDE8E0] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1A1A1A] hover:bg-[#F3EFE8] transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-[#F5F2EB]">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl text-[11px] text-[#5C5245] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C86D51] shrink-0" />
              <span>AI Match: Suitable for {product.occasions.slice(0, 2).join(' & ')}</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#8C7E6D] mb-2">
                <span className="uppercase font-semibold tracking-wider">{product.category}</span>
                <div className="flex items-center gap-1 text-[#1A1A1A] font-semibold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-[#8C7E6D]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1A1A1A] mb-3 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-[#1A1A1A]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-[#9E9486] line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs text-[#5C5245] leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Material info */}
              {product.material && (
                <div className="mb-4 text-xs">
                  <span className="text-[#8C7E6D] font-medium">Fabric & Material: </span>
                  <span className="text-[#1A1A1A] font-semibold">{product.material}</span>
                </div>
              )}

              {/* Colors */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-[#1A1A1A] block mb-1.5">
                  Available Shades:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {product.colors.map((c) => (
                    <span key={c} className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#EAE4DC] text-[#4A4237] font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#1A1A1A]">Select Size:</label>
                  <span className="text-[11px] text-[#8C7E6D]">True to Indian Standard Size</span>
                </div>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                        selectedSize === size
                          ? 'bg-[#1A1A1A] text-white shadow-md'
                          : 'bg-[#FAF8F5] text-[#4A4237] border border-[#E0D7CC] hover:bg-[#F3EFE8]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-[#F0EAE0]">
              <button
                onClick={() => {
                  addToCart(product, selectedSize);
                  setSelectedProductForModal(null);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-white font-semibold text-xs tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add To Shopping Bag
              </button>

              <button
                onClick={() => toggleFavourite(product.id)}
                className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
                  favourited
                    ? 'border-[#C86D51] bg-[#FDF8F5] text-[#C86D51]'
                    : 'border-[#E0D7CC] bg-[#FAF8F5] text-[#4A4237] hover:bg-white'
                }`}
                title="Add to Favourites"
              >
                <Heart className={`w-5 h-5 ${favourited ? 'fill-[#C86D51]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
