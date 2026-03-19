'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

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
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-melt-bg-alt">
        <motion.div 
          className="absolute inset-0 z-0 bg-gradient-to-br from-melt-bg-alt via-melt-border/30 to-melt-accent/10"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        />
        
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-melt-text/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
              {product.badge}
            </span>
          </div>
        )}

        {/* Hover action overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product, product.size);
            }}
            className="w-full bg-white/95 backdrop-blur-sm text-melt-text text-[11px] font-bold uppercase tracking-widest py-3 rounded-xl shadow-xl hover:bg-melt-accent hover:text-white transition-all active:scale-95"
          >
            Quick Add
          </button>
        </div>
      </Link>


      {/* Info */}
      <div className="p-5">
        <Link href={`/products/${product.slug}`} className="block group/title">
          <h3 className="text-[16px] font-semibold text-melt-text group-hover/title:text-melt-accent transition-colors">
            {product.name}
          </h3>
          <p className="text-[12px] text-melt-text-muted mt-1 uppercase tracking-wider">
            {product.scentFamily} · {product.format}
          </p>
        </Link>
        
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-2">
            <span className="text-[17px] font-bold text-melt-text tracking-tight">₹{product.price}</span>
            {product.comparePrice && (
              <span className="text-[13px] text-melt-text-muted/60 line-through font-medium">₹{product.comparePrice}</span>
            )}
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-melt-accent/30" />
        </div>
      </div>

    </div>
  );
}
