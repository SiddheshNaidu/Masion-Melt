'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, Plane, Recycle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 12, willChange: 'transform, opacity' as const },
  visible: {
    opacity: 1,
    y: 0,
    willChange: 'auto' as const,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function OurStoryPage() {
  return (
    <div className="pb-20 lg:pb-24">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a1f14] via-[#3d2e1f] to-[#1a1510]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,169,126,0.12),transparent_60%)]" />
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as const }}
          className="relative z-10 font-serif text-[clamp(36px,7vw,72px)] font-bold text-white text-center italic"
        >
          Scent is a feeling.
        </motion.h1>
      </section>

      {/* Origin Story — Section 1 */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#d4c5a9] via-[#e8dcc8] to-[#f0e8d8]"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif text-3xl text-melt-text/10 tracking-widest">MELT</span>
              </div>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.15em] text-melt-text-muted mb-3">
                The Beginning
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-[clamp(28px,4vw,44px)] font-semibold text-melt-text mb-6 leading-tight">
                Born from a <span className="font-serif italic font-normal">broken bottle</span>.
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-4 text-[15px] text-melt-text-muted leading-relaxed">
                <p>
                  It started with a shattered perfume bottle at the bottom of a carry-on bag. The frustration of losing a favourite scent — and ruining everything it touched — planted a question: <em className="font-serif text-melt-text">why does fragrance still come in glass?</em>
                </p>
                <p>
                  We set out to reimagine what perfume could be. Not a spray in a fragile bottle, but a solid — a concentrated balm pressed into a pocket-sized tin that goes wherever you go. No spillage. No waste. Just pure, intimate scent.
                </p>
                <p>
                  MELT was born from that simple idea: fragrance should fit your life, not the other way around.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Origin Story — Section 2 (reversed) */}
      <section className="py-20 lg:py-24 bg-melt-bg-alt">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="order-2 lg:order-1"
            >
              <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.15em] text-melt-text-muted mb-3">
                The Format
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-[clamp(28px,4vw,44px)] font-semibold text-melt-text mb-6 leading-tight">
                Zero liquid. <span className="font-serif italic font-normal">Zero mess.</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-4 text-[15px] text-melt-text-muted leading-relaxed">
                <p>
                  Every MELT formula is crafted from natural waxes, nourishing oils, and concentrated fragrance — pressed into a format that&apos;s designed for real life.
                </p>
                <p>
                  Our solid perfumes are <em className="font-serif text-melt-text">TSA-friendly</em>, <em className="font-serif text-melt-text">spill-proof</em>, and small enough to toss in a jacket pocket, a gym bag, or a clutch. They last all day because they melt into your skin — releasing fragrance slowly as your body warms the balm.
                </p>
                <p>
                  This isn&apos;t just a new format. It&apos;s a better way to wear scent.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="order-1 lg:order-2 aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-tl from-[#d4c5a9] via-[#e8dcc8] to-[#f0e8d8]"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif text-3xl text-melt-text/10 tracking-widest">MELT</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-[clamp(28px,4vw,48px)] font-semibold text-melt-text text-center mb-14"
          >
            Why <span className="font-serif italic font-normal">MELT</span>?
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {[
              { icon: <Leaf size={28} />, title: 'Clean Ingredients', desc: 'No parabens, no sulfates, no synthetic dyes. Just skin-safe formulas made with natural waxes and premium fragrance oils.' },
              { icon: <Plane size={28} />, title: 'TSA-Friendly', desc: 'Solid means no liquid restrictions. MELT flies with you — through every checkpoint, into every country.' },
              { icon: <Recycle size={28} />, title: 'Recyclable Packaging', desc: "Our tins are made from recyclable aluminium. When you\u0027re done, recycle. Or even better — refill." },
            ].map((value) => (
              <motion.div key={value.title} variants={fadeUp} className="text-center">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-melt-bg-alt text-melt-accent mb-5">
                  {value.icon}
                </span>
                <h3 className="text-lg font-semibold text-melt-text mb-2">{value.title}</h3>
                <p className="text-sm text-melt-text-muted leading-relaxed max-w-[300px] mx-auto">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-[clamp(28px,4vw,44px)] font-semibold text-melt-text mb-6">
            Find your <span className="font-serif italic font-normal">signature</span> scent.
          </h2>
          <Link
            href="/shop"
            className="inline-block bg-melt-text text-melt-inverse-text text-[13px] font-medium uppercase tracking-[0.08em] px-10 py-4 rounded-lg hover:bg-melt-accent hover:text-melt-text transition-colors duration-200 active:animate-micro-bounce"
          >
            Explore the Collection
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
