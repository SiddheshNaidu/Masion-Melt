import Link from 'next/link';
import { Instagram, Twitter, ArrowRight } from 'lucide-react';


const footerLinks = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Bestsellers', href: '/shop?filter=bestsellers' },
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'Gift Sets', href: '/shop' },
  ],
  company: [
    { label: 'Our Story', href: '/our-story' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Sustainability', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  help: [
    { label: 'FAQ', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Track Order', href: '#' },
    { label: 'Return Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-melt-bg border-t border-melt-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="font-serif text-[24px] font-bold text-melt-text tracking-tight">
              MELT
            </Link>
            <p className="mt-4 text-[13px] text-melt-text-muted leading-relaxed max-w-[260px]">
              Pocket-sized solid perfumes crafted to melt into your skin. Anytime. Anywhere.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a href="#" className="w-8 h-8 rounded-full border border-melt-border flex items-center justify-center text-melt-text-muted hover:text-melt-accent hover:border-melt-accent transition-all duration-300">
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-melt-border flex items-center justify-center text-melt-text-muted hover:text-melt-accent hover:border-melt-accent transition-all duration-300">
                <Twitter size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>


          {/* Shop */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-melt-text mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-melt-text-muted hover:text-melt-text transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-melt-text mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-melt-text-muted hover:text-melt-text transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-melt-text mb-4">
              Newsletter
            </h4>
            <p className="text-[12px] text-melt-text-muted mb-4 leading-relaxed">
              Join the MELT list for new scent drops and exclusive access.
            </p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-transparent border-b border-melt-border py-2 text-[13px] focus:outline-none focus:border-melt-accent transition-colors pr-10"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-melt-text-muted hover:text-melt-accent transition-colors">
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-melt-border flex flex-col items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-melt-text-muted/60 font-medium">
            <span>Razorpay</span>
            <span>UPI</span>
            <span>Cards</span>
            <span>Netbanking</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-[11px] text-melt-text-muted">
            <span>© 2026 MELT</span>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-melt-text transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-melt-text transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-melt-text transition-colors">Shipping</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
