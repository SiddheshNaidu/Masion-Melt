import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import LoadingSplashScreen from '@/components/ui/LoadingSplashScreen';
import ToastNotification from '@/components/ui/toast-notification';


const playfair = Playfair_Display({

  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'MELT — Solid Perfume, Anytime. Anywhere.',
  description: 'Pocket-sized solid perfumes that melt into your skin wherever the day takes you. Travel-ready, spill-proof, skin-safe.',
  keywords: ['solid perfume', 'pocket perfume', 'travel perfume', 'MELT', 'fragrance', 'wax perfume'],
  openGraph: {
    title: 'MELT — Solid Perfume, Anytime. Anywhere.',
    description: 'Pocket-sized solid perfumes that melt into your skin wherever the day takes you.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <LoadingSplashScreen />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <ToastNotification />
        </CartProvider>

      </body>

    </html>
  );
}
