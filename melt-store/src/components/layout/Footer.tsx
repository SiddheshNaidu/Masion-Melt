import Link from 'next/link';

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
            <Link href="/" className="font-serif text-[22px] font-bold text-melt-text">
              MELT
            </Link>
            <p className="mt-3 text-[13px] text-melt-text-muted leading-relaxed max-w-[260px]">
              Pocket-sized solid perfumes crafted to melt into your skin. Anytime. Anywhere.
            </p>
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

          {/* Help */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-melt-text mb-4">
              Help
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-melt-text-muted hover:text-melt-text transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-melt-border flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] text-melt-text-muted">
          <span>© 2025 MELT</span>
          <span className="hidden sm:inline">|</span>
          <Link href="#" className="hover:text-melt-text transition-colors">Terms</Link>
          <span className="hidden sm:inline">|</span>
          <Link href="#" className="hover:text-melt-text transition-colors">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
