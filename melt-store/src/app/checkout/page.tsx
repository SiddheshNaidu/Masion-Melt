'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppOrder = () => {
    setIsSubmitting(true);
    
    // Construct WhatsApp message
    const orderItems = items.map(item => `- ${item.product.name} (${item.selectedSize}) x ${item.quantity}`).join('\n');
    const message = `*New Order Request from MELT*%0A%0A` +
      `*Client Details:*%0A` +
      `- Name: ${formData.firstName} ${formData.lastName}%0A` +
      `- Phone: ${formData.phone}%0A` +
      `- Email: ${formData.email}%0A` +
      `- Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}%0A%0A` +
      `*Order Details:*%0A${orderItems}%0A%0A` +
      `*Total Amount:* ₹${subtotal}%0A%0A` +
      `Please confirm the order and payment details. My reference: MELT-${Date.now().toString().slice(-6)}`;

    // Redirect to WhatsApp
    const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${message}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      window.location.href = '/order-confirmation';
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <h1 className="font-serif text-3xl font-bold text-melt-text mb-4">Your bag is empty.</h1>
        <p className="text-melt-text-muted mb-8">Add components to your bag before checking out.</p>
        <Link 
          href="/shop" 
          className="bg-melt-text text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-melt-accent transition-colors"
        >
          Shop Scents
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-melt-bg pt-24 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-2 mb-10 group">
          <Link href="/shop" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-melt-text-muted hover:text-melt-text transition-colors">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-melt-text mb-8">Shipping Details</h1>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-melt-text-muted ml-1">First Name</label>
                    <input 
                      type="text" name="firstName" required
                      value={formData.firstName} onChange={handleInputChange}
                      className="w-full bg-white border border-melt-border rounded-xl px-5 py-4 focus:border-melt-text outline-none transition-colors text-sm"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-melt-text-muted ml-1">Last Name</label>
                    <input 
                      type="text" name="lastName" required
                      value={formData.lastName} onChange={handleInputChange}
                      className="w-full bg-white border border-melt-border rounded-xl px-5 py-4 focus:border-melt-text outline-none transition-colors text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-melt-text-muted ml-1">Email Address</label>
                  <input 
                    type="email" name="email" required
                    value={formData.email} onChange={handleInputChange}
                    className="w-full bg-white border border-melt-border rounded-xl px-5 py-4 focus:border-melt-text outline-none transition-colors text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-melt-text-muted ml-1">Phone Number</label>
                  <input 
                    type="tel" name="phone" required
                    value={formData.phone} onChange={handleInputChange}
                    className="w-full bg-white border border-melt-border rounded-xl px-5 py-4 focus:border-melt-text outline-none transition-colors text-sm"
                    placeholder="+91 00000 00000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-melt-text-muted ml-1">Delivery Address</label>
                  <input 
                    type="text" name="address" required
                    value={formData.address} onChange={handleInputChange}
                    className="w-full bg-white border border-melt-border rounded-xl px-5 py-4 focus:border-melt-text outline-none transition-colors text-sm"
                    placeholder="Street name, House no."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-melt-text-muted ml-1">City</label>
                    <input 
                      type="text" name="city" required
                      value={formData.city} onChange={handleInputChange}
                      className="w-full bg-white border border-melt-border rounded-xl px-5 py-4 focus:border-melt-text outline-none transition-colors text-sm"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-melt-text-muted ml-1">Pincode</label>
                    <input 
                      type="text" name="pincode" required
                      value={formData.pincode} onChange={handleInputChange}
                      className="w-full bg-white border border-melt-border rounded-xl px-5 py-4 focus:border-melt-text outline-none transition-colors text-sm"
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white border border-melt-border rounded-2xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                  <Send size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-melt-text mb-1">Phase 1: WhatsApp Checkout</h3>
                  <p className="text-xs text-melt-text-muted leading-relaxed">
                    We are currently accepting orders exclusively via WhatsApp to ensure personalized service. Your details will be sent to us, and we&apos;ll confirm payment and shipping manually.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-5">
            <motion.div 
              initial="hidden" animate="visible" variants={fadeUp}
              className="bg-white border border-melt-border rounded-3xl p-8 sticky top-24 shadow-xl"
            >
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-melt-text-muted mb-8 pb-4 border-b border-melt-border">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto no-scrollbar">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="w-16 h-16 bg-melt-bg-alt rounded-lg overflow-hidden shrink-0 relative">
                      <Image 
                        src={item.product.image} 
                        alt={item.product.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-bold text-melt-text">{item.product.name}</h4>
                        <span className="text-sm font-bold text-melt-text">₹{item.product.price * item.quantity}</span>
                      </div>
                      <p className="text-[10px] text-melt-text-muted uppercase tracking-widest mt-1">{item.selectedSize} · Qty {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-melt-border">
                <div className="flex justify-between text-sm">
                  <span className="text-melt-text-muted">Subtotal</span>
                  <span className="text-melt-text font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-melt-text-muted">Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">Calculated on WhatsApp</span>
                </div>
                <div className="h-px bg-melt-border my-2" />
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-melt-text-muted">Total Amount</span>
                    <span className="text-sm text-melt-text-muted italic text-[10px]">Excl. final shipping</span>
                  </div>
                  <span className="text-2xl font-bold text-melt-text font-serif">₹{subtotal}</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                disabled={isSubmitting || !formData.firstName || !formData.phone}
                className="w-full mt-10 bg-green-600 text-white rounded-xl py-5 font-bold uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 hover:bg-green-700 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:grayscale disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    Place Order via WhatsApp
                  </>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-melt-text-muted uppercase tracking-widest font-bold">
                <Lock size={12} className="text-green-600" />
                Secure Checkout Powered by WhatsApp
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
