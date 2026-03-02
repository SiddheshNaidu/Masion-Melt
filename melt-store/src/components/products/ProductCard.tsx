'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className={`group bg-melt-card border border-melt-border rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-lg ${className}`}>
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-melt-bg-alt to-melt-border">
        {/* Placeholder gradient for product image */}
        <div className="absolute inset-0 bg-gradient-to-br from-melt-bg-alt via-melt-border/50 to-melt-accent/20 transition-opacity duration-300 group-hover:opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-tl from-melt-accent/30 via-melt-bg-alt to-melt-border/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Product name overlay for visual interest */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-serif text-2xl font-bold text-melt-text/10 tracking-wider">MELT</span>
          <span className="text-xs text-melt-text/15 mt-1 tracking-widest uppercase">{product.name}</span>
        </div>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-melt-text text-melt-inverse-text text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-[15px] font-medium text-melt-text hover:text-melt-accent-dark transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-[12px] text-melt-text-muted mt-0.5">
          {product.scentFamily} · {product.format}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-semibold text-melt-text">₹{product.price}</span>
            {product.comparePrice && (
              <span className="text-[13px] text-melt-text-muted line-through">₹{product.comparePrice}</span>
            )}
          </div>
          <button
            onClick={() => addItem(product, product.size)}
            className="text-[10px] font-medium uppercase tracking-[0.08em] bg-melt-text text-melt-inverse-text px-4 py-2 rounded-md hover:bg-melt-accent hover:text-melt-text transition-colors duration-200 active:animate-micro-bounce"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
