'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, Instagram } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { motion, AnimatePresence } from 'framer-motion';


const navLinks = [
  { href: '/shop', label: 'SHOP' },
  { href: '/how-it-works', label: 'HOW IT WORKS' },
  { href: '/our-story', label: 'OUR STORY' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setCartOpen } = useCart();


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkHero = !scrolled && (pathname === '/' || pathname === '/our-story');


  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-melt-bg/95 backdrop-blur-sm shadow-[0_1px_0_#E2DDD6]'
          : 'bg-transparent'
      }`}

    >
      {/* Use a relative wrapper so the logo can be absolute-centered to the full nav width */}
      <nav className="relative max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-10 h-16 lg:h-[72px]">
        {/* Left — Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-200 relative group ${
                pathname === link.href ? 'text-melt-accent' : isDarkHero ? 'text-white' : 'text-melt-text'
              } hover:text-melt-accent`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-melt-accent"
                />
              )}
            </Link>
          ))}

        </div>

        {/* Left — Hamburger (Mobile) */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">

            <button aria-label="Open menu" className="p-1">
              <Menu size={22} className={isDarkHero ? 'text-white' : 'text-melt-text'} />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[300px] bg-melt-bg border-melt-border flex flex-col">
            <div className="p-4 pt-12 flex-grow">
              <SheetTitle className="font-serif text-3xl font-bold tracking-tight mb-1">MELT</SheetTitle>
              <p className="text-[10px] uppercase tracking-[0.2em] text-melt-text-muted mb-12">Solid Perfume, Anytime.</p>
              
              <nav className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-sans text-[14px] font-medium uppercase tracking-[0.1em] transition-colors ${
                      pathname === link.href ? 'text-melt-accent' : 'text-melt-text'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-8 border-t border-melt-border mt-auto">
              <div className="flex items-center gap-4">
                <a href="#" className="text-melt-text hover:text-melt-accent transition-colors">
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </SheetContent>

        </Sheet>

        {/* Center — Logo (absolutely centered relative to nav) */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group"
        >
          <span className={`font-serif text-[24px] lg:text-[28px] font-bold tracking-[0.08em] transition-colors duration-300 ${
            isDarkHero ? 'text-white' : 'text-melt-text'
          }`}>
            MELT
          </span>
        </Link>


        {/* Right — Icons */}
        <div className="flex items-center gap-4 lg:gap-5">
          <button aria-label="Search" className={`transition-colors duration-200 ${isDarkHero ? 'text-white/90 hover:text-white' : 'text-melt-text hover:text-melt-accent'}`}>
            <Search size={19} strokeWidth={1.5} />
          </button>
          <button aria-label="Account" className={`hidden sm:block transition-colors duration-200 ${isDarkHero ? 'text-white/90 hover:text-white' : 'text-melt-text hover:text-melt-accent'}`}>
            <User size={19} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
            className={`relative transition-colors duration-200 ${isDarkHero ? 'text-white/90 hover:text-white' : 'text-melt-text hover:text-melt-accent'}`}
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span 
                  key={totalItems}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-melt-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

      </nav>
    </header>
  );
}
