'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, Star, Leaf, Plane, Recycle, ShieldCheck, PawPrint } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { getProductBySlug, products } from '@/lib/data/products';
import { reviews } from '@/lib/data/reviews';
import ProductGrid from '@/components/products/ProductGrid';


const sizes = ['5g', '10g', '15g'];

const fadeUp = {
  hidden: { opacity: 0, y: 12, willChange: 'transform, opacity' as const },
  visible: {
    opacity: 1,
    y: 0,
    willChange: 'auto' as const,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState('10g');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-melt-text-muted">Product not found.</p>
      </div>
    );
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const recommended = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="pb-20 lg:pb-24">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4">
        <nav className="text-[11px] text-melt-text-muted tracking-wide">
          <Link href="/shop" className="hover:text-melt-text transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-melt-text-muted">{product.scentFamily}</span>
          <span className="mx-2">/</span>
          <span className="text-melt-text">{product.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }} 
            className="lg:sticky lg:top-24 lg:self-start space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square rounded-3xl overflow-hidden bg-melt-bg-alt relative group cursor-zoom-in">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-melt-text shadow-sm border border-white/20">
                Hover to Zoom
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-1 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 relative ${
                    activeImage === i 
                      ? 'border-melt-accent scale-95 shadow-lg' 
                      : 'border-transparent hover:border-melt-border'
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} angle ${i + 1}`}
                    fill
                    className={`object-cover ${i === 0 ? '' : 'opacity-40 grayscale'}`}
                  />
                  {i !== 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <span className="text-[10px] font-bold text-white uppercase">Angle {i + 1}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>


          {/* Right — Product Info */}
          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {/* Badge */}
            {product.badge && (
              <motion.span variants={fadeUp} className="inline-block bg-melt-text text-melt-inverse-text text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                {product.badge}
              </motion.span>
            )}

            {/* Name */}
            <motion.h1 variants={fadeUp} className="font-serif text-[clamp(28px,4vw,36px)] font-bold text-melt-text">
              {product.name}
            </motion.h1>

            {/* Scent Family Tag */}
            <div className="flex items-center gap-3 mt-3">
              <motion.span variants={fadeUp} className="inline-block bg-melt-bg-alt text-melt-text-muted text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-melt-border">
                {product.scentFamily}
              </motion.span>
              <div className="h-1 w-1 rounded-full bg-melt-accent/40" />
              <motion.span variants={fadeUp} className="text-[11px] font-bold uppercase tracking-widest text-melt-accent">
                Medium Intensity
              </motion.span>
            </div>


            {/* Price */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mt-4">
              <span className="text-2xl font-semibold text-melt-text">₹{product.price}</span>
              {product.comparePrice && (
                <span className="text-base text-melt-text-muted line-through">₹{product.comparePrice}</span>
              )}
            </motion.div>

            {/* Rating */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} size={14} className={star <= Math.round(avgRating) ? 'fill-melt-accent text-melt-accent' : 'text-melt-border'} />
                ))}
              </div>
              <span className="text-[12px] text-melt-text-muted">{avgRating.toFixed(1)} · {reviews.length} reviews</span>
            </motion.div>

            {/* Description */}
            <motion.p variants={fadeUp} className="text-[15px] sm:text-[16px] text-melt-text-muted leading-relaxed mt-6 italic font-serif">
              &quot;A sophisticated, travel-friendly olfactory experience that lingers like a warm memory.&quot;
            </motion.p>
            <motion.p variants={fadeUp} className="text-[14px] text-melt-text-muted leading-relaxed mt-4">
              {product.description}
            </motion.p>

            {/* Intensity Bar */}
            <motion.div variants={fadeUp} className="mt-8 pt-8 border-t border-melt-border">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-melt-text">Fragrance Intensity</span>
                <span className="text-[11px] font-bold text-melt-accent uppercase tracking-widest">Moderate</span>
              </div>
              <div className="h-2 w-full bg-melt-bg-alt rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '65%' }}
                  transition={{ duration: 1, ease: "circOut" }}
                  className="h-full bg-melt-accent"
                />
              </div>
            </motion.div>


            {/* Scent Notes */}
            <motion.div variants={fadeUp} className="mt-6">
              <Accordion type="single" collapsible className="border border-melt-border rounded-xl overflow-hidden">
                <AccordionItem value="scent-notes" className="border-none">
                  <AccordionTrigger className="px-4 py-3 text-[13px] font-medium uppercase tracking-[0.08em] hover:no-underline">
                    Scent Notes
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-3">
                    <div>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-melt-accent-dark">Top Notes</span>
                      <p className="text-sm text-melt-text-muted mt-0.5">{product.topNotes.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-melt-accent-dark">Heart Notes</span>
                      <p className="text-sm text-melt-text-muted mt-0.5">{product.heartNotes.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-melt-accent-dark">Base Notes</span>
                      <p className="text-sm text-melt-text-muted mt-0.5">{product.baseNotes.join(', ')}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {/* Size Selector */}
            <motion.div variants={fadeUp} className="mt-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-melt-text-muted mb-2">Size</p>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-[12px] font-medium px-5 py-2.5 rounded-full border transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-melt-text text-melt-inverse-text border-melt-text'
                        : 'bg-transparent text-melt-text border-melt-border hover:border-melt-text'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quantity & CTA */}
            <motion.div variants={fadeUp} className="mt-6 flex flex-col sm:flex-row gap-3">
              {/* Qty Stepper */}
              <div className="flex items-center border border-melt-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3.5 text-melt-text-muted hover:text-melt-text transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 text-sm font-medium text-melt-text min-w-[40px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3.5 text-melt-text-muted hover:text-melt-text transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addItem(product, selectedSize);
                }}
                className="flex-1 bg-melt-text text-melt-inverse-text text-[13px] font-medium uppercase tracking-[0.08em] py-4 rounded-lg hover:bg-melt-accent hover:text-melt-text transition-colors duration-200 active:animate-micro-bounce"
              >
                Add to Bag
              </button>
            </motion.div>

            {/* Wishlist */}
            <motion.button variants={fadeUp} className="flex items-center gap-2 text-[12px] text-melt-text-muted hover:text-melt-text transition-colors mt-3">
              <Heart size={14} />
              Add to Wishlist
            </motion.button>

            {/* Trust Badges */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 py-5 border-y border-melt-border">
              {[
                { icon: <Leaf size={16} />, label: 'Clean Ingredients' },
                { icon: <Plane size={16} />, label: 'TSA-Friendly' },
                { icon: <PawPrint size={16} />, label: 'Cruelty-Free' },
                { icon: <Recycle size={16} />, label: 'Recyclable Tin' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-[11px] text-melt-text-muted">
                  <span className="text-melt-accent">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </motion.div>

            {/* Accordions */}
            <motion.div variants={fadeUp} className="mt-6">
              <Accordion type="multiple" className="space-y-2">
                <AccordionItem value="ingredients" className="border border-melt-border rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-[13px] font-medium uppercase tracking-[0.08em] hover:no-underline">
                    Ingredients
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm text-melt-text-muted leading-relaxed">
                    {product.ingredients}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-to-use" className="border border-melt-border rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-[13px] font-medium uppercase tracking-[0.08em] hover:no-underline">
                    How to Use
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm text-melt-text-muted leading-relaxed">
                    {product.howToUse}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Floating Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-melt-border p-4 z-50 lg:hidden flex items-center justify-between gap-4"
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-melt-text-muted uppercase tracking-widest">{product.name}</span>
          <span className="text-lg font-bold text-melt-text">₹{product.price}</span>
        </div>
        <button
          onClick={() => addItem(product, selectedSize)}
          className="flex-1 bg-melt-text text-white text-[12px] font-bold uppercase tracking-widest py-4 rounded-xl shadow-2xl active:scale-95 transition-transform"
        >
          Add to Bag
        </button>
      </motion.div>


      {/* Reviews */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.h2 variants={fadeUp} className="text-2xl font-semibold text-melt-text mb-8">
            Reviews
          </motion.h2>
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-melt-card border border-melt-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} size={12} className={star <= review.rating ? 'fill-melt-accent text-melt-accent' : 'text-melt-border'} />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="text-[9px] font-medium uppercase tracking-wider text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Verified</span>
                  )}
                </div>
                <h4 className="text-sm font-medium text-melt-text">{review.title}</h4>
                <p className="text-[13px] text-melt-text-muted mt-1 leading-relaxed">{review.body}</p>
                <p className="text-[11px] text-melt-text-muted/60 mt-3">{review.author} · {review.date}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* You May Also Like */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-20">
        <h2 className="text-2xl font-semibold text-melt-text mb-8">
          You May Also Like
        </h2>
        <ProductGrid products={recommended} columns={4} />
      </section>
    </div>
  );
}
