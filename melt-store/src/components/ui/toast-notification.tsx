'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const ToastNotification = () => {
  const { lastAdded, setLastAdded, setCartOpen } = useCart();

  React.useEffect(() => {
    if (lastAdded) {
      const timer = setTimeout(() => setLastAdded(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [lastAdded, setLastAdded]);

  return (
    <AnimatePresence>
      {lastAdded && (
        <motion.div
          initial={{ opacity: 0, y: 100, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 100, x: '-50%' }}
          className="fixed bottom-8 left-1/2 z-[100] w-[90%] max-w-[400px]"
        >
          <div className="bg-melt-text text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-melt-accent flex items-center justify-center text-white">
                <Check size={16} strokeWidth={3} />
              </div>
              <div>
                <p className="text-[13px] font-medium">Added to bag</p>
                <p className="text-[11px] text-white/60">{lastAdded.name}</p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setCartOpen(true);
                setLastAdded(null);
              }}
              className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-melt-accent hover:text-white transition-colors pl-4 border-l border-white/10"
            >
              View Bag
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;
