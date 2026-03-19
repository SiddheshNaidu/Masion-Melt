'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function OrderConfirmationPage() {
  const { clearCart } = useCart();
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Generate a random reference ID
    const ref = `MELT-${Math.floor(100000 + Math.random() * 900000)}`;
    let timeoutId = setTimeout(() => {
      setOrderId(ref);
    }, 0);
    
    // Clear the cart on successful order
    clearCart();
    return () => clearTimeout(timeoutId);
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-melt-bg flex items-center justify-center pt-20 px-6">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 text-green-600"
        >
          <CheckCircle2 size={48} />
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-melt-text mb-4 tracking-tight">Order Initiated</h1>
          <p className="text-melt-text-muted text-[15px] leading-relaxed mb-8">
            Your order details have been sent to us via WhatsApp. We will contact you shortly to confirm payment and shipping.
          </p>

          <div className="bg-white border border-melt-border rounded-2xl p-6 mb-10 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-melt-text-muted block mb-2">Your Reference ID</span>
            <span className="text-xl font-bold text-melt-text font-mono tracking-widest">{orderId}</span>
          </div>

          <div className="space-y-4">
            <Link 
              href="/shop" 
              className="w-full bg-melt-text text-white py-5 rounded-xl font-bold uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 hover:bg-melt-accent transition-colors shadow-lg"
            >
              <ShoppingBag size={16} />
              Return to Shop
            </Link>
            
            <Link 
              href="/" 
              className="w-full text-melt-text-muted py-2 font-bold uppercase tracking-[0.2em] text-[10px] hover:text-melt-text transition-colors flex items-center justify-center gap-2"
            >
              Go to Homepage
              <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
