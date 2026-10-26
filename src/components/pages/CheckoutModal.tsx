import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    clearCart, 
    showToast, 
    navigateTo,
    recordCheckoutOrder,
    currentUser
  } = useApp();

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    pinCode: '',
    paymentMethod: 'cod' // 'cod' | 'upi'
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit mobile number required';
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pinCode.trim() || formData.pinCode.length < 6) newErrors.pinCode = '6-digit PIN code required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please correct form validation errors.', 'error');
      return;
    }

    const orderId = `SS-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(orderId);
    setOrderConfirmed(true);

    recordCheckoutOrder({
      orderNumber: orderId,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      pinCode: formData.pinCode,
      paymentMethod: formData.paymentMethod,
      items: cart,
      totalAmount: cartSubtotal,
    });

    clearCart();
    showToast(`Order #${orderId} placed successfully!`, 'success');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EDE8E0] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-[#EFECE6] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">
              {orderConfirmed ? 'Order Confirmation' : 'Express Checkout'}
            </h2>
            <p className="text-xs text-[#8C7E6D]">
              {orderConfirmed ? 'Your capsule items are reserved' : 'Complimentary shipping & 100% verified order processing'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#EAE4DC] flex items-center justify-center text-[#1A1A1A] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {orderConfirmed ? (
          /* Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#C86D51] bg-[#FDF8F5] px-3 py-1 rounded-full border border-[#F3E2D8]">
                Order Confirmed
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-3">
                Order #{confirmedOrderId}
              </h3>
              <p className="text-xs text-[#5C5245] max-w-md mx-auto mt-2 leading-relaxed">
                Your capsule items have been reserved. Confirmation receipt and dispatch tracking have been dispatched to <strong className="text-[#1A1A1A]">{formData.email}</strong>.
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EAE3D8] rounded-2xl p-5 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between text-[#8C7E6D]">
                <span>Recipient:</span>
                <span className="font-semibold text-[#1A1A1A]">{formData.fullName}</span>
              </div>
              <div className="flex justify-between text-[#8C7E6D]">
                <span>Shipping Destination:</span>
                <span className="font-semibold text-[#1A1A1A]">{formData.city}, {formData.pinCode}</span>
              </div>
              <div className="flex justify-between text-[#8C7E6D]">
                <span>Payment Mode:</span>
                <span className="font-semibold text-[#1A1A1A]">
                  {formData.paymentMethod === 'cod' ? 'Cash / UPI on Delivery' : 'Instant UPI Transfer'}
                </span>
              </div>
              <div className="flex justify-between text-[#8C7E6D] pt-2 border-t border-[#EAE3D8]">
                <span>Total Amount:</span>
                <span className="font-bold text-sm text-[#1A1A1A]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={() => {
                  handleClose();
                  navigateTo('planner');
                }}
                className="py-3 px-6 rounded-xl bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#333333] transition-all flex items-center justify-center gap-2"
              >
                Schedule in Weekly Planner <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleClose}
                className="py-3 px-6 rounded-xl border border-[#DCD5CB] text-[#1A1A1A] text-xs font-semibold hover:bg-[#FAF8F5] transition-all"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            {/* Guarantee Badge */}
            <div className="bg-[#FAF6F0] border border-[#E5DACD] rounded-2xl p-3.5 flex items-start gap-3 text-xs text-[#5C5245]">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1A1A1A]">StyleSync Guarantee:</strong> Verified high-quality natural fabrics, complimentary 7-day doorstep size exchanges, and 100% secure processing.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] ${
                    errors.fullName ? 'border-rose-400' : 'border-[#DDD5CB]'
                  }`}
                  placeholder="e.g. Sarah Jenkins"
                />
                {errors.fullName && <p className="text-[10px] text-rose-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] ${
                    errors.email ? 'border-rose-400' : 'border-[#DDD5CB]'
                  }`}
                  placeholder="name@example.com"
                />
                {errors.email && <p className="text-[10px] text-rose-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] ${
                    errors.phone ? 'border-rose-400' : 'border-[#DDD5CB]'
                  }`}
                  placeholder="10-digit mobile number"
                />
                {errors.phone && <p className="text-[10px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] ${
                    errors.city ? 'border-rose-400' : 'border-[#DDD5CB]'
                  }`}
                  placeholder="Mumbai, Bengaluru, Delhi, etc."
                />
                {errors.city && <p className="text-[10px] text-rose-600 mt-1">{errors.city}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] ${
                    errors.address ? 'border-rose-400' : 'border-[#DDD5CB]'
                  }`}
                  placeholder="Flat / House No., Building, Street, Landmark"
                />
                {errors.address && <p className="text-[10px] text-rose-600 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  PIN Code *
                </label>
                <input
                  type="text"
                  value={formData.pinCode}
                  onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] ${
                    errors.pinCode ? 'border-rose-400' : 'border-[#DDD5CB]'
                  }`}
                  placeholder="6-digit PIN code"
                />
                {errors.pinCode && <p className="text-[10px] text-rose-600 mt-1">{errors.pinCode}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1">
                  Payment Method
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5CB] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
                >
                  <option value="cod">Cash / UPI on Delivery (Doorstep)</option>
                  <option value="upi">Instant UPI simulator</option>
                </select>
              </div>
            </div>

            {/* Mini Summary */}
            <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#8C7E6D]">Total Look Investment</span>
                <div className="text-lg font-bold text-[#1A1A1A]">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-[#1A1A1A] hover:bg-[#333333] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Place Confirmed Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
