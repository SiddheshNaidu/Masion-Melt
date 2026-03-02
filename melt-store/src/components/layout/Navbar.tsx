'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const navLinks = [
  { href: '/shop', label: 'SHOP' },
  { href: '/how-it-works', label: 'HOW IT WORKS' },
  { href: '/our-story', label: 'OUR STORY' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ease-in-out ${
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
              className="font-sans text-[12px] font-medium uppercase tracking-[0.08em] text-melt-text hover:text-melt-accent-dark transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Left — Hamburger (Mobile) */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button aria-label="Open menu" className="p-1">
              <Menu size={22} className="text-melt-text" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] bg-melt-bg border-melt-border p-8">
            <SheetTitle className="font-serif text-2xl font-bold tracking-wide mb-8">MELT</SheetTitle>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-melt-text hover:text-melt-accent-dark transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Center — Logo (absolutely centered relative to nav) */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="font-serif text-[24px] lg:text-[28px] font-bold tracking-[0.04em] text-melt-text">
            MELT
          </span>
        </Link>

        {/* Right — Icons */}
        <div className="flex items-center gap-4 lg:gap-5">
          <button aria-label="Search" className="text-melt-text hover:text-melt-accent-dark transition-colors duration-200">
            <Search size={19} strokeWidth={1.8} />
          </button>
          <button aria-label="Account" className="hidden sm:block text-melt-text hover:text-melt-accent-dark transition-colors duration-200">
            <User size={19} strokeWidth={1.8} />
          </button>
          <button
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
            className="relative text-melt-text hover:text-melt-accent-dark transition-colors duration-200"
          >
            <ShoppingBag size={19} strokeWidth={1.8} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-melt-text text-melt-inverse-text text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
