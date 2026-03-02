'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '@/components/products/ProductGrid';
import { products, getProductsByFamily } from '@/lib/data/products';

/* ── GPU-friendly animation presets ────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 12, willChange: 'transform, opacity' as const },
  visible: {
    opacity: 1,
    y: 0,
    willChange: 'auto' as const,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const viewportConfig = { once: true, margin: '-60px' as const };

const scentFamilies = ['ALL', 'FRESH', 'WOODY', 'FLORAL', 'DARK & SMOKY', 'CITRUS'] as const;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [email, setEmail] = useState('');

  const featuredProducts = products.filter((p) => p.badge === 'BESTSELLER' || p.badge === 'LIMITED').slice(0, 3);
  const filteredProducts = activeTab === 'ALL' ? products : getProductsByFamily(activeTab);

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[100vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a1f14] via-[#3d2e1f] to-[#1a1510]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(200,169,126,0.15),transparent_60%)]" />

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <motion.div
            className="max-w-xl"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p variants={fadeUp} className="text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.2em] text-white/50 mb-4">
              Solid Perfume, Redefined
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-[clamp(48px,8vw,88px)] font-bold leading-[1.05] text-white">
              Wear your scent.
              <br />
              <span className="font-serif italic font-normal">Anywhere.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 text-[15px] sm:text-[17px] text-white/60 leading-relaxed max-w-[440px]">
              Pocket-sized solid perfumes that melt into your skin wherever the day takes you.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href="/shop"
                className="inline-block bg-white text-melt-text text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.08em] px-8 sm:px-10 py-3.5 sm:py-4 rounded-lg hover:bg-melt-accent hover:text-melt-text transition-colors duration-200 active:animate-micro-bounce"
              >
                Shop MELT
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── MARQUEE TICKER ───────────────────────────────────────── */}
      <section className="bg-melt-bg-alt border-y border-melt-border py-3.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mr-8">
              {['POCKET-SIZED', 'NO SPILLS', 'TRAVEL-READY', 'SKIN-SAFE', 'LONG-LASTING', 'SOLID FORMAT'].map((text) => (
                <span key={text} className="text-[13px] font-medium uppercase tracking-[0.1em] text-melt-text flex items-center gap-8">
                  {text}
                  <span className="text-melt-accent text-lg">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ────────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportConfig}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.15em] text-melt-text-muted mb-3">
              Bestsellers
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-[clamp(28px,4vw,48px)] font-semibold text-melt-text mb-10 lg:mb-14">
              Scents made to <span className="font-serif italic font-normal">move</span> with you.
            </motion.h2>
          </motion.div>

          <ProductGrid products={featuredProducts} />

          <div className="mt-10 text-right">
            <Link href="/shop" className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-melt-text hover:text-melt-accent-dark transition-colors group">
              View All
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="bg-melt-bg-alt py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16"
            initial="hidden" whileInView="visible" viewport={viewportConfig}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {[
              { emoji: '🫰', title: 'Swipe', desc: 'Glide the balm across your pulse points.' },
              { emoji: '🌡️', title: 'Melt', desc: 'Your body heat activates the fragrance.' },
              { emoji: '✨', title: 'Linger', desc: 'Long-lasting scent that stays close to your skin.' },
            ].map((step) => (
              <motion.div key={step.title} variants={fadeUp} className="text-center">
                <span className="text-4xl mb-4 block">{step.emoji}</span>
                <h3 className="text-lg font-semibold text-melt-text mb-2">{step.title}</h3>
                <p className="text-sm text-melt-text-muted leading-relaxed max-w-[280px] mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── EDITORIAL SPLIT ──────────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }} viewport={viewportConfig}
              className="aspect-4/5 rounded-2xl overflow-hidden bg-linear-to-br from-[#d4c5a9] via-[#e8dcc8] to-[#f0e8d8]"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif text-3xl text-melt-text/10 tracking-widest">MELT</span>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewportConfig}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.15em] text-melt-text-muted mb-3">
                Why Solid?
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-[clamp(28px,4vw,44px)] font-semibold text-melt-text mb-6 leading-tight">
                No liquid. No spillage.
                <br />
                <span className="font-serif italic font-normal">Just scent.</span>
              </motion.h2>
              <motion.ul variants={fadeUp} className="space-y-3 text-[15px] text-melt-text-muted leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-melt-accent mt-0.5">✓</span>
                  <span>TSA-friendly — flies with you, <span className="font-serif italic text-melt-text">no questions asked</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-melt-accent mt-0.5">✓</span>
                  <span>Fits in your pocket — <span className="font-serif italic text-melt-text">touch up anytime</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-melt-accent mt-0.5">✓</span>
                  <span>Clean, skin-safe formula — <span className="font-serif italic text-melt-text">melts into you</span></span>
                </li>
              </motion.ul>
              <motion.div variants={fadeUp} className="mt-8">
                <Link
                  href="/our-story"
                  className="inline-block border-[1.5px] border-melt-text text-melt-text text-[12px] font-medium uppercase tracking-[0.08em] px-8 py-3.5 rounded-lg hover:bg-melt-text hover:text-melt-inverse-text transition-colors duration-200"
                >
                  Our Story
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── COLLECTION TABS ──────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-melt-bg-alt">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={viewportConfig} variants={fadeUp}
            className="text-[clamp(28px,4vw,48px)] font-semibold text-melt-text mb-10 text-center"
          >
            Shop by <span className="font-serif italic font-normal">mood</span>
          </motion.h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {scentFamilies.map((family) => (
              <button
                key={family}
                onClick={() => setActiveTab(family)}
                className={`text-[11px] font-medium uppercase tracking-[0.1em] px-5 py-2 rounded-full border transition-all duration-200 ${
                  activeTab === family
                    ? 'bg-melt-text text-melt-inverse-text border-melt-text'
                    : 'bg-transparent text-melt-text-muted border-melt-border hover:border-melt-text hover:text-melt-text'
                }`}
              >
                {family}
              </button>
            ))}
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </section>

      {/* ─── SOCIAL PROOF / UGC ───────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportConfig}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="text-center mb-10"
          >
            <motion.h2 variants={fadeUp} className="text-[clamp(28px,4vw,48px)] font-semibold text-melt-text">
              Scent on the <span className="font-serif italic font-normal">go.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-melt-text-muted mt-2">
              Tag us @wearemelt
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
            initial="hidden" whileInView="visible" viewport={viewportConfig}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i} variants={fadeUp}
                className="aspect-square rounded-xl overflow-hidden bg-linear-to-br from-melt-bg-alt to-melt-border"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[10px] text-melt-text-muted/30 uppercase tracking-widest">@wearemelt</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── EMAIL CAPTURE ────────────────────────────────────────── */}
      <section className="bg-melt-inverse-bg py-20 lg:py-24">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportConfig}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.h2 variants={fadeUp} className="text-[clamp(28px,4vw,44px)] font-semibold text-melt-inverse-text leading-tight">
              <span className="font-serif italic font-normal">Get 10%</span> off your first order.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-melt-inverse-text/50 mt-3">
              Join the MELT family. No spam, just scent.
            </motion.p>
            <motion.form variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white text-melt-text text-sm px-6 py-3.5 rounded-full outline-none focus:ring-2 focus:ring-melt-accent placeholder:text-melt-text-muted/50"
                required
              />
              <button
                type="submit"
                className="bg-melt-accent text-melt-text text-[12px] font-medium uppercase tracking-[0.08em] px-8 py-3.5 rounded-full hover:bg-melt-accent-dark hover:text-white transition-colors duration-200"
              >
                Subscribe
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
