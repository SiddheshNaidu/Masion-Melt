'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScentFamily } from '@/lib/types';

interface Props {
  name: string;
  family: ScentFamily;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const familyColors: Record<ScentFamily, { from: string; to: string; textColor: string }> = {
  'Woody':       { from: '#d4c5a9', to: '#8C6A3F', textColor: '#4a3728' },
  'Floral':      { from: '#f0d9e8', to: '#C8A97E', textColor: '#7a4060' },
  'Fresh':       { from: '#d0e8f0', to: '#7ab5c8', textColor: '#2a5a70' },
  'Dark & Smoky':{ from: '#2a1f14', to: '#4a3020', textColor: '#C8A97E' },
  'Citrus':      { from: '#f0e8d0', to: '#d4a840', textColor: '#7a5020' },
};

const ProductTinPlaceholder = ({ name, family, size = 'md', className = '' }: Props) => {
  const colors = familyColors[family] || familyColors['Woody'];
  
  const sizeMap = {
    sm: 'w-16 h-16 text-[8px]',
    md: 'w-32 h-32 text-[12px]',
    lg: 'w-64 h-64 text-[24px]',
  };

  return (
    <div 
      className={`relative w-full h-full flex items-center justify-center overflow-hidden transition-colors duration-700 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
      }}
    >
      {/* Decorative Grain/Noise Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* The Tin Shape */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`${sizeMap[size]} rounded-full border-[1px] border-white/30 relative shadow-2xl flex items-center justify-center flex-col`}
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%), ${colors.to}`,
          boxShadow: `0 20px 50px -12px ${colors.textColor}50, inset 0 2px 4px rgba(255,255,255,0.3)`,
        }}
      >
        {/* Inner Label Area */}
        <div className="absolute inset-[10%] rounded-full border border-white/10 flex flex-col items-center justify-center p-4 text-center">
          <span className="font-serif font-bold tracking-tight mb-1" style={{ color: colors.textColor }}>
            {name}
          </span>
          <div className="w-8 h-px bg-current opacity-30 mb-1" style={{ backgroundColor: colors.textColor }} />
          <span className="uppercase tracking-[0.2em] font-medium text-[0.6em]" style={{ color: colors.textColor }}>
            {family}
          </span>
        </div>

        {/* Brand Mark at the bottom edge of tin */}
        <div className="absolute bottom-[15%] text-[0.4em] uppercase tracking-[0.4em] font-bold opacity-40" style={{ color: colors.textColor }}>
          MELT
        </div>
      </motion.div>

      {/* Subtle Shadow on the "ground" */}
      <div 
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-1/2 h-4 bg-black/20 blur-xl rounded-full"
      />
    </div>
  );
};

export default ProductTinPlaceholder;
