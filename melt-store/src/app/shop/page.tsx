'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from '@/components/products/ProductGrid';
import { products, getProductsByFamily } from '@/lib/data/products';

const filters = ['ALL', 'FRESH', 'WOODY', 'FLORAL', 'DARK & SMOKY', 'CITRUS'] as const;
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 12, willChange: 'transform, opacity' as const },
  visible: {
    opacity: 1,
    y: 0,
    willChange: 'auto' as const,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('Featured');

  const filtered = activeFilter === 'ALL' ? products : getProductsByFamily(activeFilter);
  const featuredTitle = activeFilter === 'ALL' ? 'All Scents' : `${activeFilter} Collection`;
  
  const sorted = [...filtered].sort((a, b) => {


    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    return 0;
  });

  return (
    <div className="pb-20 lg:pb-24">
      {/* Header */}
      <section className="py-16 lg:py-20 text-center">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="relative z-10"
        >
          <motion.h1 variants={fadeUp} className="font-serif text-[clamp(48px,8vw,80px)] font-bold text-melt-text tracking-tight">
            {featuredTitle}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[15px] text-melt-text-muted mt-5 max-w-md mx-auto leading-relaxed">
            Pocket-sized solid perfumes for every mood, made to live in your pocket and linger on your skin.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex justify-center">
            <div className="h-px w-12 bg-melt-accent/30" />
          </motion.div>
        </motion.div>

      </section>

      {/* Filters & Sort */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-melt-border pb-8">
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-melt-text-muted">Filter by family</span>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 no-scrollbar">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-[11px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full border-2 transition-all duration-300 whitespace-nowrap ${
                    activeFilter === filter
                      ? 'bg-melt-text text-white border-melt-text shadow-lg'
                      : 'bg-transparent text-melt-text-muted border-melt-border hover:border-melt-text hover:text-melt-text'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-6 md:pt-0 border-melt-border">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-melt-text-muted">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-[12px] font-bold text-melt-text bg-transparent outline-none cursor-pointer hover:text-melt-accent transition-colors py-1"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div className="h-10 w-px bg-melt-border hidden md:block" />
            
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-melt-text-muted">Count</span>
              <p className="text-[14px] font-bold text-melt-text">{sorted.length} Scents</p>
            </div>
          </div>
        </div>

      </section>

      {/* Product Grid */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {sorted.length > 0 ? (
          <ProductGrid products={sorted} />
        ) : (
          <p className="text-center text-melt-text-muted py-20">No scents found in this family.</p>
        )}
      </section>
    </div>
  );
}
