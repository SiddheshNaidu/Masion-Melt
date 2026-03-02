'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const fadeUp = {
  hidden: { opacity: 0, y: 12, willChange: 'transform, opacity' as const },
  visible: {
    opacity: 1,
    y: 0,
    willChange: 'auto' as const,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const steps = [
  {
    number: '01',
    title: 'Swipe',
    desc: 'Glide the balm across your pulse points — wrists, behind ears, neck, and inner elbows. The solid format means no mess, no drips, and precise application.',
    bg: 'bg-melt-bg',
  },
  {
    number: '02',
    title: 'Melt',
    desc: 'Your body heat gently warms the wax blend, activating the concentrated fragrance oils. The scent unfolds gradually — top notes first, then the heart, and finally the long-lasting base.',
    bg: 'bg-melt-bg-alt',
  },
  {
    number: '03',
    title: 'Last All Day',
    desc: 'Because the balm sits on your skin rather than evaporating in a spray cloud, the scent stays close and intimate. Touch up anytime, anywhere — it lives in your pocket.',
    bg: 'bg-melt-bg',
  },
];

const faqs = [
  {
    q: 'Is it TSA-friendly?',
    a: 'Yes! MELT solid perfumes are 100% non-liquid, which means they bypass all liquid restrictions at airport security. Fly with your fragrance without a second thought.',
  },
  {
    q: 'How long does the scent last?',
    a: 'Depending on the fragrance and your skin chemistry, MELT perfumes typically last 4–8 hours. Because they sit on your skin as a balm, they release scent gradually and stay close — perfect for intimate, personal fragrance.',
  },
  {
    q: 'Is it safe for sensitive skin?',
    a: 'All MELT formulas are dermatologically tested, free from parabens, sulfates, and synthetic dyes. We use natural beeswax, fractionated coconut oil, shea butter, and phthalate-free fragrance oils. If you have specific allergies, please check the full ingredients list on each product page.',
  },
  {
    q: 'How do I store my MELT?',
    a: "Store in a cool, dry place away from direct sunlight. The tin is designed to be pocket-friendly — it won\u0027t melt in normal conditions. In extreme heat (above 45°C), store indoors.",
  },
  {
    q: 'Can I layer different scents?',
    a: 'Absolutely! One of the joys of solid perfume is layering. Try combining Forest Whisper (woody) with Vanilla Veil (warm floral) for a unique personal blend.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="pb-20 lg:pb-24">
      {/* Header */}
      <section className="py-16 lg:py-24 text-center max-w-3xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
          className="font-serif text-[clamp(36px,6vw,64px)] font-bold text-melt-text"
        >
          It&apos;s as easy as it <span className="italic">melts.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-melt-text-muted mt-4 max-w-md mx-auto"
        >
          Three simple steps to wearing your favourite scent — no spraying, no spilling, no fuss.
        </motion.p>
      </section>

      {/* Steps */}
      {steps.map((step, i) => (
        <section key={step.number} className={`${step.bg} py-20 lg:py-24`}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? 'direction-rtl' : ''}`}>
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }} viewport={{ once: true }}
                className={`aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-melt-bg-alt to-melt-border ${i % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">{['🫰', '🌡️', '✨'][i]}</span>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className={i % 2 === 1 ? 'lg:order-1' : ''}
              >
                <motion.span variants={fadeUp} className="text-[64px] lg:text-[80px] font-bold text-melt-border/60 leading-none block mb-2">
                  {step.number}
                </motion.span>
                <motion.h2 variants={fadeUp} className="text-[clamp(28px,4vw,44px)] font-semibold text-melt-text mb-4">
                  {step.title}
                </motion.h2>
                <motion.p variants={fadeUp} className="text-[15px] text-melt-text-muted leading-relaxed max-w-lg">
                  {step.desc}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[700px] mx-auto px-6 lg:px-10">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-serif text-[clamp(28px,4vw,40px)] font-bold text-melt-text text-center mb-10"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="border border-melt-border rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-5 py-4 text-[14px] font-medium text-melt-text hover:no-underline text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 text-[14px] text-melt-text-muted leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-[clamp(28px,4vw,44px)] font-semibold text-melt-text mb-6">
            Ready to find <span className="font-serif italic font-normal">your</span> scent?
          </h2>
          <Link
            href="/shop"
            className="inline-block bg-melt-text text-melt-inverse-text text-[13px] font-medium uppercase tracking-[0.08em] px-10 py-4 rounded-lg hover:bg-melt-accent hover:text-melt-text transition-colors duration-200 active:animate-micro-bounce"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
