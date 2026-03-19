'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, ShoppingBag, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-melt-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-melt-accent/20 flex justify-center"
        >
          <Compass size={120} strokeWidth={1} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-serif text-6xl font-bold text-melt-text mb-4 tracking-tighter">404</h1>
          <h2 className="text-xl font-bold text-melt-text mb-4 uppercase tracking-[0.2em]">The scent has faded.</h2>
          <p className="text-melt-text-muted text-[15px] leading-relaxed mb-10 max-w-[280px] mx-auto">
            It seems the page you are looking for has evaporated into thin air.
          </p>

          <div className="flex flex-col gap-4">
            <Link 
              href="/shop" 
              className="w-full bg-melt-text text-white py-5 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-melt-accent transition-all shadow-lg active:scale-95"
            >
              <ShoppingBag size={14} />
              Continue Shopping
            </Link>
            
            <Link 
              href="/" 
              className="w-full text-melt-text font-bold uppercase tracking-[0.2em] text-[10px] hover:text-melt-accent transition-colors flex items-center justify-center gap-2 py-2"
            >
              <Home size={14} />
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
