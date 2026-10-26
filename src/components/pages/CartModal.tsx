import React from 'react';
import { useApp } from '../../context/AppContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartModal: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    cartCount, 
    setIsCheckoutOpen,
    navigateTo 
  } = useApp();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-[#EDE8E0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EFECE6] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C86D51]" />
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">Shopping Bag</h2>
            <span className="text-xs bg-[#EFECE6] text-[#5C5245] px-2 py-0.5 rounded-full font-semibold">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#EAE4DC] flex items-center justify-center text-[#1A1A1A] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F5F2EB]">
          {cart.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D8] flex items-center justify-center text-[#8C7E6D] mb-4">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-1">
                Your Bag is Empty
              </h3>
              <p className="text-xs text-[#8C7E6D] max-w-xs mb-6">
                Explore our curated fashion catalogue to build your seasonal capsule wardrobe.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('discover');
                }}
                className="py-2.5 px-5 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#333333] transition-all flex items-center gap-2 shadow-sm"
              >
                Explore Catalogue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}`} className="py-4 flex gap-4">
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#F5F2EB] shrink-0 border border-[#EDE8E0]">
                  <ImageWithFallback
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-semibold text-[#1A1A1A] line-clamp-1 pr-2">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#A89F93] hover:text-rose-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[#8C7E6D]">
                      <span>Size: <strong className="text-[#1A1A1A]">{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>{item.product.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-[#1A1A1A]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    <div className="flex items-center border border-[#E0D7CC] rounded-lg bg-[#FAF8F5]">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#EAE4DC] text-[#4A4237] rounded-l-md transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-[#1A1A1A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-[#EAE4DC] text-[#4A4237] rounded-r-md transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#EFECE6] bg-[#FAF8F5] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#5C5245]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#1A1A1A]">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#5C5245]">
              <span className="flex items-center gap-1">
                Estimated Delivery <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 rounded">COMPLIMENTARY</span>
              </span>
              <span className="font-semibold text-emerald-700">₹0</span>
            </div>

            <div className="pt-2 border-t border-[#E8E2D8] flex items-center justify-between">
              <span className="font-serif text-sm font-bold text-[#1A1A1A]">Total Payable</span>
              <span className="text-lg font-bold text-[#1A1A1A]">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="bg-[#FFFDF9] border border-[#E8DFC8] rounded-xl p-2.5 flex items-start gap-2 text-[11px] text-[#7A6B54]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Secure Checkout Guarantee:</strong> Encrypted order flow with complimentary doorstep exchange.
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
            >
              Proceed to Express Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={clearCart}
              className="w-full text-center text-[11px] text-[#8C7E6D] hover:text-rose-600 transition-colors pt-1"
            >
              Empty Shopping Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
