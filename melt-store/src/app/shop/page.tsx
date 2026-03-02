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

  const filtered = getProductsByFamily(activeFilter);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    return 0;
  });

  return (
    <div className="pb-20 lg:pb-24">
      {/* Header */}
      <section className="py-16 lg:py-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.h1 variants={fadeUp} className="font-serif text-[clamp(40px,6vw,64px)] font-bold text-melt-text">
            All Scents
          </motion.h1>
          <motion.p variants={fadeUp} className="text-sm text-melt-text-muted mt-3 max-w-md mx-auto">
            Solid perfumes for every mood, made to live in your pocket.
          </motion.p>
        </motion.div>
      </section>

      {/* Filters & Sort */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-[11px] font-medium uppercase tracking-[0.1em] px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-melt-text text-melt-inverse-text border-melt-text'
                    : 'bg-transparent text-melt-text-muted border-melt-border hover:border-melt-text hover:text-melt-text'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-[12px] text-melt-text-muted bg-transparent border border-melt-border rounded-lg px-4 py-2 outline-none focus:border-melt-text transition-colors cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
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
