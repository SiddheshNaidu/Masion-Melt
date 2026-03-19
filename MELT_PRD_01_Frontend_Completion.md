# PRD 01 — MELT Frontend Completion
**Document Type:** Product Requirements Document  
**Version:** 1.0  
**Status:** Ready for Development  
**Prepared for:** Antigravity  
**Stack:** Next.js 16, Tailwind CSS v4, Framer Motion, Radix UI, shadcn/ui  

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Current State Analysis](#2-current-state-analysis)
3. [Design System Reference](#3-design-system-reference)
4. [Global Layout & Components](#4-global-layout--components)
5. [Page-by-Page Completion Spec](#5-page-by-page-completion-spec)
6. [Missing Pages to Build](#6-missing-pages-to-build)
7. [Micro-interactions & Animation](#7-micro-interactions--animation)
8. [Responsive Design Requirements](#8-responsive-design-requirements)
9. [Acceptance Criteria](#9-acceptance-criteria)

---

## 1. Executive Summary

MELT is a solid perfume D2C brand. The frontend has been scaffolded with correct color tokens, routing, product data, cart logic, and component structure — but visually reads as incomplete. Pages look bare because:

- Product images are empty gradient placeholders with no art direction
- Typography hierarchy is inconsistent across pages
- Several critical pages are missing entirely (Checkout, Order Confirmation, 404, Loading states)
- The homepage hero and editorial sections lack visual weight
- The cart drawer works but feels unstyled in parts
- No skeleton loaders or empty states exist

**Goal of this PRD:** Give Antigravity a precise, actionable spec to make MELT look and feel like a premium indie perfume brand — without changing any business logic, routing, or data structures already in place.

---

## 2. Current State Analysis

### What Exists (Do Not Break)
| File | Status |
|---|---|
| `src/app/layout.tsx` | ✅ Complete — fonts, providers, global layout |
| `src/app/globals.css` | ✅ Complete — all color tokens, animations defined |
| `src/app/page.tsx` | ⚠️ Exists but visually incomplete |
| `src/app/shop/page.tsx` | ⚠️ Exists but visually incomplete |
| `src/app/products/[slug]/page.tsx` | ⚠️ Exists but visually incomplete |
| `src/app/how-it-works/page.tsx` | ⚠️ Exists but visually incomplete |
| `src/app/our-story/page.tsx` | ⚠️ Exists but visually incomplete |
| `src/components/layout/Navbar.tsx` | ⚠️ Functional but needs polish |
| `src/components/layout/Footer.tsx` | ⚠️ Functional but needs polish |
| `src/components/layout/CartDrawer.tsx` | ⚠️ Functional but needs polish |
| `src/components/layout/AnnouncementBar.tsx` | ✅ Complete |
| `src/components/products/ProductCard.tsx` | ⚠️ Functional but visually weak |
| `src/components/products/ProductGrid.tsx` | ✅ Complete |
| `src/context/CartContext.tsx` | ✅ Complete — do not touch |
| `src/lib/data/products.ts` | ✅ Complete — do not touch |
| `src/lib/data/reviews.ts` | ✅ Complete — do not touch |
| `src/lib/types.ts` | ✅ Complete — do not touch |

### What's Missing Entirely
- `/checkout` page
- `/order-confirmation` page
- `/404` custom page
- Loading skeleton components
- Toast/notification system for cart actions
- Wishlist UI (button exists in product detail, but no functionality)
- Search overlay/drawer
- Size guide modal (referenced on product page)

---

## 3. Design System Reference

> **Important for Antigravity:** All color tokens are already defined in `globals.css`. Use ONLY the CSS variables below. Do not use raw hex values anywhere in components.

### Color Tokens
```css
/* Backgrounds */
--color-melt-bg: #FAF7F2        /* Main page background — warm off-white */
--color-melt-bg-alt: #F0EBE1    /* Section alternating background */
--color-melt-card: #FFFFFF      /* Card backgrounds */
--color-melt-border: #E2DDD6    /* All borders */

/* Text */
--color-melt-text: #111111      /* Primary text */
--color-melt-text-muted: #6B6560 /* Secondary/caption text */
--color-melt-inverse-bg: #111111 /* Dark section background */
--color-melt-inverse-text: #FAF7F2 /* Text on dark backgrounds */

/* Brand Accent */
--color-melt-accent: #C8A97E    /* Gold — use for highlights, icons, hover states */
--color-melt-accent-dark: #8C6A3F /* Deeper gold — hover on accent */
```

### Typography
```
Font Serif   → Playfair Display → used for: hero headlines, italic callouts, product names
Font Sans    → DM Sans          → used for: all body text, labels, CTAs, navigation
Font Mono    → not used in UI
```

### Type Scale
| Usage | Class | Size |
|---|---|---|
| Hero Headline | `font-serif text-[clamp(48px,8vw,88px)] font-bold` | Responsive |
| Section Heading | `text-[clamp(28px,4vw,48px)] font-semibold` | Responsive |
| Product Name | `font-serif text-[clamp(28px,4vw,36px)] font-bold` | Responsive |
| Body Text | `text-[15px] leading-relaxed` | Fixed |
| Caption / Label | `text-[11px] uppercase tracking-[0.15em] font-medium` | Fixed |
| Button Text | `text-[12px] uppercase tracking-[0.08em] font-medium` | Fixed |

### Spacing System
Use Tailwind spacing throughout. Key breakpoints:
- Mobile: `px-6`
- Desktop: `px-10`
- Max container: `max-w-[1400px] mx-auto`
- Section vertical padding: `py-20 lg:py-24`

### Border Radius
- Cards: `rounded-xl` or `rounded-2xl`
- Buttons: `rounded-lg` or `rounded-full` (pill style)
- Tags/badges: `rounded-full`
- Inputs: `rounded-full` or `rounded-lg`

---

## 4. Global Layout & Components

### 4.1 Announcement Bar — Minor Polish Needed
**File:** `src/components/layout/AnnouncementBar.tsx`

Current state is acceptable. Only change needed:
- Add a subtle left-to-right scroll animation on the text on mobile so it reads fully (marquee on small screens only)
- Ensure dismiss state persists properly (already uses localStorage — verify it works)

### 4.2 Navbar — Polish Required
**File:** `src/components/layout/Navbar.tsx`

#### Current Issues
- Logo "MELT" on dark hero pages disappears because text is `text-melt-text` (#111) which is dark
- No visual active state on nav links for current page
- Search button opens nothing (search overlay missing)
- Mobile sheet looks basic

#### Required Changes

**Logo Color Adaptation:**
The navbar sits over the dark hero on the homepage. Implement a `isDarkHero` detection or use CSS blend mode so the logo text appears white when over dark hero sections and dark when scrolled past.

**Implementation approach:**
```tsx
// Detect scroll position. If scrolled < hero height AND on homepage, use inverse colors
const isOverDarkHero = !scrolled && pathname === '/';

// Apply conditionally:
className={isOverDarkHero ? 'text-white' : 'text-melt-text'}
```

**Active Link State:**
Use `usePathname()` from `next/navigation`. If current route matches link href, add:
```
border-b border-melt-accent text-melt-text (underline style)
```

**Cart Icon Badge:**
Already exists. Ensure it animates (scale bounce) when count increments:
```tsx
// Wrap badge in:
<motion.span key={totalItems} initial={{ scale: 0.8 }} animate={{ scale: 1 }} />
```

**Mobile Nav Sheet:**
- Add brand tagline under the logo: *"Solid Perfume, Anytime."*
- Add a thin horizontal divider between nav links and bottom
- Add Instagram icon link at the bottom of the sheet

### 4.3 Footer — Polish Required
**File:** `src/components/layout/Footer.tsx`

#### Current Issues
- Looks functional but visually flat
- No social links
- No newsletter input in footer (there's one on homepage but footer should have a compact version too)

#### Required Changes

**Brand Column:**
- Keep the MELT logo and tagline
- Add social icon row below tagline: Instagram, Twitter/X (use lucide-react icons or simple SVGs)
  ```tsx
  <div className="flex items-center gap-4 mt-4">
    <a href="#" aria-label="Instagram"> <InstagramIcon size={18} /> </a>
  </div>
  ```

**Bottom Bar:**
- Add payment method icons (simple text labels are fine: "Razorpay · UPI · Cards")
- Center the copyright and links

**Visual separator:**
- Add a thin `border-t border-melt-border` between the link columns and the bottom bar — already implied but confirm it renders visually

### 4.4 Cart Drawer — Polish Required
**File:** `src/components/layout/CartDrawer.tsx`

#### Current Issues
- Product thumbnail in cart is just a gradient box — needs a consistent styled placeholder with product name initial
- "Free shipping" progress bar is missing (text shows but no visual bar)
- No animation on item add/remove

#### Required Changes

**Product Thumbnail:**
Replace the plain gradient with a styled placeholder:
```tsx
<div className="w-20 h-20 rounded-lg bg-gradient-to-br from-melt-bg-alt to-melt-border flex items-center justify-center flex-shrink-0">
  <span className="font-serif text-xl text-melt-text/20">
    {item.product.name.charAt(0)}
  </span>
</div>
```

**Free Shipping Progress Bar:**
```tsx
const progressPercent = Math.min((subtotal / 999) * 100, 100);

<div className="w-full bg-melt-border rounded-full h-1.5 mt-2">
  <div
    className="bg-melt-accent h-1.5 rounded-full transition-all duration-500"
    style={{ width: `${progressPercent}%` }}
  />
</div>
```

**Item Removal Animation:**
Wrap each cart item `<li>` in a Framer Motion `AnimatePresence`:
```tsx
<AnimatePresence>
  {items.map(item => (
    <motion.li
      key={`${item.product.id}-${item.selectedSize}`}
      layout
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      ...
    </motion.li>
  ))}
</AnimatePresence>
```

### 4.5 Toast Notification — New Component Required
**File to create:** `src/components/ui/toast-notification.tsx`

When an item is added to the cart, show a small toast at the bottom-right (or top-right on mobile):

```
┌────────────────────────────────┐
│  ✓  Forest Whisper added       │
│     View Bag →                 │
└────────────────────────────────┘
```

**Spec:**
- Background: `bg-melt-text` text: `text-melt-inverse-text`
- Appears from bottom, slides up, auto-dismisses after 3s
- "View Bag" link opens the cart drawer
- Use Framer Motion for enter/exit animation
- Max 1 toast visible at a time (replace previous)
- Wire this into `CartContext.addItem()` — add a `lastAdded` state and expose it

---

## 5. Page-by-Page Completion Spec

### 5.1 Homepage (`/`)

**File:** `src/app/page.tsx`

#### Section: Hero
**Current state:** Works but the hero image area is purely CSS gradient — feels empty.

**Required changes:**
- The right half of the hero (desktop) should have a large decorative product tin illustration or a styled typographic lockup, not just gradient
- Add a subtle floating/parallax effect on the right-side decorative element using Framer Motion `useScroll` + `useTransform`
- Add a scroll indicator at the bottom center of the hero:
  ```tsx
  <motion.div
    animate={{ y: [0, 8, 0] }}
    transition={{ repeat: Infinity, duration: 1.5 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
  >
    <ChevronDown size={24} />
  </motion.div>
  ```
- The subheadline `"Pocket-sized solid perfumes..."` needs a higher contrast — use `text-white/75` instead of `text-white/60`

#### Section: Marquee Ticker
**Current state:** CSS animation exists. Works.

**Required changes:**
- Add a left and right fade mask using CSS so the marquee text fades at edges:
  ```css
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  ```
- Increase marquee gap between items slightly for breathing room

#### Section: Featured Products (Bestsellers)
**Current state:** ProductGrid renders but cards look flat.

**Required changes:** See ProductCard spec in section 5.7.

#### Section: How It Works (3-step)
**Current state:** Three centered cards with emoji. Looks minimal but acceptable.

**Required changes:**
- Replace emoji with lucide-react icons styled in the accent color
- Add a thin horizontal connecting line between the three steps (desktop only):
  ```tsx
  // Position relative on container, absolute line between steps
  <div className="hidden md:block absolute top-7 left-[16%] right-[16%] h-px bg-melt-border z-0" />
  ```
- Wrap each step number/icon in a `w-14 h-14 rounded-full bg-melt-bg border border-melt-border` circle

#### Section: Editorial Split (Why Solid?)
**Current state:** Layout is correct. Image placeholder is a plain gradient.

**Required changes:**
- The image placeholder should have art direction: a large italic serif "MELT" overlaid with the circle tin shape behind it (pure CSS/SVG — no actual image required for now)
- Create a reusable `<ProductTinPlaceholder />` component for use across the site:
  ```tsx
  // Renders a centered tin illustration using pure CSS shapes
  // Outer circle (tin lid), inner content with product name
  ```

#### Section: Collection Tabs (Shop by Mood)
**Current state:** Tab filter + ProductGrid. Works but tab active state styling could be stronger.

**Required changes:**
- Active tab: add a subtle `shadow-sm` and ensure `bg-melt-text` is clearly contrasting
- Add a count badge next to each family label showing number of products:
  ```tsx
  FRESH (1) · WOODY (1) · FLORAL (2) ...
  ```
- Animate the grid re-render when tab changes: wrap ProductGrid output in `AnimatePresence` with `mode="wait"`

#### Section: UGC / Social Proof
**Current state:** 5 placeholder boxes with "@wearemelt" text.

**Required changes:**
- Style the grid more intentionally — vary the aspect ratios slightly for visual interest:
  - Items 1, 4: `aspect-square`
  - Items 2, 5: `aspect-[4/5]`
  - Item 3: `aspect-[4/3]` (wider)
- Add a hover state on each box that shows a faux "view on Instagram" overlay with the Instagram icon

#### Section: Email Capture
**Current state:** Exists on dark background. Functional.

**Required changes:**
- Input field border on focus should glow with accent: `focus:ring-2 focus:ring-melt-accent/40`
- Add success state: after submit, replace the form with:
  ```tsx
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
    <p className="text-white text-lg font-serif italic">You're in. Welcome to MELT. 🤍</p>
  </motion.div>
  ```
- Validate email client-side before showing success (basic regex check)

---

### 5.2 Shop Page (`/shop`)

**File:** `src/app/shop/page.tsx`

#### Section Header
**Required changes:**
- Add a product count display: `Showing {sorted.length} scents`
- On mobile, the filters should collapse into a horizontal scrollable pill row (already done) — add `-webkit-overflow-scrolling: touch` for iOS momentum scrolling

#### Filter/Sort Bar
**Required changes:**
- On mobile, move the sort dropdown below the filter pills in a separate row to prevent cramping
- The select dropdown should use a custom styled wrapper:
  ```tsx
  <div className="relative">
    <select className="appearance-none ...">
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={14} />
  </div>
  ```

#### Empty State
If a filter returns 0 products, show:
```tsx
<div className="text-center py-24">
  <p className="font-serif text-2xl italic text-melt-text-muted">
    No scents in this family yet.
  </p>
  <p className="text-sm text-melt-text-muted mt-2">Try a different mood.</p>
  <button onClick={() => setActiveFilter('ALL')} className="mt-6 ...">
    View All Scents
  </button>
</div>
```

---

### 5.3 Product Detail Page (`/products/[slug]`)

**File:** `src/app/products/[slug]/page.tsx`

#### Gallery (Left Column)
**Current state:** Main image is a gradient box. Thumbnails are tiny gradient boxes.

**Required changes:**
- Replace the plain gradient main image with `<ProductTinPlaceholder />` component (see 5.1)
- Make the component accept a `productName` and `scentFamily` prop to tint/label it differently per product
- Thumbnails should show different "views" — label them: Front, Side, Open, Lifestyle
- Add a zoom-on-hover effect on the main image area:
  ```css
  /* On hover, slightly scale the inner content */
  group-hover:scale-105 transition-transform duration-500
  ```

#### Product Info (Right Column)
**Current state:** Works. Needs minor polish.

**Required changes:**

**Scent Mood Tags:**
Below the scent family badge, add a row of mood descriptor tags (derive from `scentFamily`):
```tsx
const moodTags: Record<string, string[]> = {
  'Woody': ['Grounding', 'Earthy', 'Calm'],
  'Floral': ['Romantic', 'Fresh', 'Feminine'],
  'Fresh': ['Energising', 'Clean', 'Airy'],
  'Dark & Smoky': ['Seductive', 'Bold', 'Mysterious'],
  'Citrus': ['Bright', 'Zesty', 'Uplifting'],
};
```
Render as small pill tags in `bg-melt-bg-alt text-melt-text-muted` style.

**Size Selector — Size Guide Link:**
Add a small "Size Guide" link next to the "Size" label that opens a simple modal:
- 5g = ~3 months daily use, pocket tin
- 10g = ~6 months daily use, signature slider
- 15g = ~9 months daily use, refill format

Use Radix UI `Dialog` (already available via radix-ui package) for the modal.

**Scent Intensity Indicator:**
Add a visual intensity bar below the description, before the size selector:
```
Intensity  ●●●○○  Moderate
```
- Map intensity to a number per product (add `intensity: 1|2|3|4|5` to Product type OR derive from scentFamily: Woody=3, Floral=2, Dark=5, Fresh=2, Citrus=2)
- Render as 5 filled/unfilled dots using `melt-accent` color

**Add to Bag — Loading State:**
When the button is clicked, briefly show a loading state before confirming:
```tsx
const [adding, setAdding] = useState(false);
// On click: setAdding(true) → wait 600ms → setAdding(false) → show toast
```
Button text changes: "Add to Bag" → "Adding..." → returns to "Add to Bag"

#### Reviews Section
**Current state:** Grid of review cards. Looks acceptable.

**Required changes:**
- Add an aggregate rating summary at the top of the section:
  ```
  ★★★★★  4.8 out of 5
  Based on 6 reviews
  [=====] 5 star (4)
  [====·] 4 star (2)
  [·····] 3 star (0)
  ```
- The horizontal bar for each star count should be a styled progress bar using `bg-melt-accent`

#### You May Also Like
**Current state:** `ProductGrid` with 4 products. Works.

**Required changes:**
- Add a horizontal scroll on mobile instead of wrapping to new rows:
  ```tsx
  <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible">
  ```
- Each card in scroll mode: `snap-start min-w-[260px]`

---

### 5.4 How It Works Page (`/how-it-works`)

**File:** `src/app/how-it-works/page.tsx`

#### Current Issues
- Step emoji icons (🫰, 🌡️, ✨) look childish for a premium brand
- Image placeholder areas are just gradients with emoji — no art direction

#### Required Changes
- Replace emoji with lucide-react icons: `Hand`, `Thermometer`, `Sparkles` — styled in `text-melt-accent bg-melt-bg-alt rounded-full p-3`
- Each step section alternates background correctly (already done) — confirm it renders on build
- The step number `01/02/03` in large muted text is a nice detail — keep it, but ensure the color is `text-melt-border` (already `text-melt-border/60`)
- Image placeholder areas: replace with styled product illustration placeholders (use `<ProductTinPlaceholder />`) — one tin in each section

#### FAQ Section
**Current state:** Uses Accordion component. Works.

**Required changes:**
- First FAQ should be expanded by default (use `defaultValue="faq-0"` on the Accordion)
- Add a contact CTA below the FAQ: "Still have questions? Chat with us on WhatsApp →" (link to WhatsApp number, use `https://wa.me/91XXXXXXXXXX`)

---

### 5.5 Our Story Page (`/our-story`)

**File:** `src/app/our-story/page.tsx`

#### Current Issues
- Hero section has a dark gradient — looks okay but headline could be bigger and more dramatic
- Image placeholder areas are plain

#### Required Changes
- Hero headline: Increase line-height spacing. Add a thin decorative line element above it:
  ```tsx
  <span className="block w-12 h-px bg-melt-accent mx-auto mb-6" />
  ```
- Values section: The three icons (Leaf, Plane, Recycle) should use the existing treatment but add a thin top border accent line above each icon circle to create a visual "card" feel:
  ```tsx
  <div className="pt-8 border-t border-melt-border text-center">
    <span className="w-14 h-14 rounded-full bg-melt-bg-alt text-melt-accent ...">
  ```
- Image placeholders: Use `<ProductTinPlaceholder />` in each

---

### 5.6 ProductCard Component — Major Polish Required

**File:** `src/components/products/ProductCard.tsx`

This is the most visible component on the site and currently the weakest point.

#### Current Issues
- The card image area is a gradient with overlaid text — looks like a developer placeholder
- No hover elevation effect with shadow
- The "Add to Bag" button text is very small
- Compare price strikethrough is present but the sale styling isn't prominent enough

#### Required Changes

**Card Structure — Full Rewrite:**
```
┌─────────────────────────┐
│                         │  ← Image area (aspect-[3/4])
│   [BESTSELLER badge]    │     Art-directed placeholder
│                         │     ProductTinPlaceholder component
│   Hover: overlay shows  │     On hover: subtle scale(1.02)
│   "Quick View →" link   │
└─────────────────────────┘
│  Forest Whisper          │  ← Product name (font-serif, 16px)
│  Woody · Pocket Tin      │  ← Scent family + format (muted, 12px)
│                          │
│  ₹399  ~~₹499~~          │  ← Price row
│  [★★★★☆ 4.8]            │  ← Star rating (small, accent color)
│  [     Add to Bag     ] │  ← Full-width button, rounded-lg
└─────────────────────────┘
```

**Image Area:**
```tsx
<div className="relative aspect-[3/4] overflow-hidden bg-melt-bg-alt rounded-xl">
  {/* Art-directed tin placeholder */}
  <ProductTinPlaceholder name={product.name} family={product.scentFamily} />
  
  {/* Hover overlay */}
  <div className="absolute inset-0 bg-melt-text/0 group-hover:bg-melt-text/5 transition-colors duration-300" />
  
  {/* Quick View — appears on hover */}
  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
    <Link href={`/products/${product.slug}`}
      className="block text-center bg-white/90 backdrop-blur-sm text-melt-text text-[11px] font-medium uppercase tracking-[0.08em] py-2 rounded-md">
      Quick View
    </Link>
  </div>
  
  {/* Badge */}
  {product.badge && <BadgeComponent />}
</div>
```

**Bottom Section:**
- Product name: `font-serif text-[16px] font-bold text-melt-text mt-3`
- Family + format: `text-[11px] text-melt-text-muted mt-0.5`
- Star rating row: Show product's average based on shared reviews data (hardcode 4.8 for all for now, until backend is live)
- Price: `text-[18px] font-semibold` for current price, strikethrough `text-[14px]` for compare price
- Sale badge: If `comparePrice` exists, show a small `SAVE ₹{diff}` tag in `bg-melt-accent/20 text-melt-accent-dark`
- Add to Bag button: `w-full` and more prominent (`py-2.5` instead of `py-2`)

**Hover State on Card:**
```tsx
// On the outer wrapper div:
className="group ... hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
```

---

### 5.7 ProductTinPlaceholder Component — New Component

**File to create:** `src/components/products/ProductTinPlaceholder.tsx`

This is the art-directed placeholder that replaces all raw gradient boxes until real product images are added.

```tsx
interface Props {
  name: string;
  family: ScentFamily;
  size?: 'sm' | 'md' | 'lg';
}

// Color mapping per scent family
const familyColors: Record<string, { from: string; to: string; textColor: string }> = {
  'Woody':       { from: '#d4c5a9', to: '#8C6A3F', textColor: '#4a3728' },
  'Floral':      { from: '#f0d9e8', to: '#C8A97E', textColor: '#7a4060' },
  'Fresh':       { from: '#d0e8f0', to: '#7ab5c8', textColor: '#2a5a70' },
  'Dark & Smoky':{ from: '#2a1f14', to: '#4a3020', textColor: '#C8A97E' },
  'Citrus':      { from: '#f0e8d0', to: '#d4a840', textColor: '#7a5020' },
};
```

**Renders:**
- A full-bleed gradient background (family-specific colors)
- Centered circular tin shape (CSS, `rounded-full border-4 border-white/20`)
- Product name in serif font inside the circle
- Brand mark "MELT" in small caps at the bottom

This makes every empty image slot look intentional and beautiful rather than like a developer placeholder.

---

## 6. Missing Pages to Build

### 6.1 Checkout Page (`/checkout`)

> **Note:** For Phase 1 (frontend-only), this page redirects to WhatsApp. For Phase 2 (full backend), it becomes a real checkout flow. Build the UI for both states.

**Route:** `src/app/checkout/page.tsx`

**Layout:**
```
┌─────────────────────────────────────────────┐
│  MELT Navbar                                │
├─────────────────────────────────────────────┤
│                                             │
│  Your Order              Order Summary      │
│  ─────────               ────────────────   │
│  [Cart items listed]     Subtotal: ₹XXX    │
│                          Shipping: Free     │
│                          ─────────────────  │
│  Your Details            Total: ₹XXX       │
│  ─────────────                             │
│  Name: [_________]       [Place Order via  │
│  Phone:[_________]        WhatsApp →]      │
│  Email:[_________]                         │
│                          ─────────────────  │
│  Delivery Address         ✓ TSA-Friendly   │
│  ──────────────────       ✓ Clean Formula  │
│  Address: [_______]       ✓ Free Shipping  │
│  City:    [_______]       ✓ Easy Returns   │
│  PIN:     [_______]                        │
└─────────────────────────────────────────────┘
```

**WhatsApp Order Button — Phase 1:**

When the user fills in the form and clicks "Place Order via WhatsApp", generate a pre-filled WhatsApp message and open it:

```tsx
const generateWhatsAppMessage = (items: CartItem[], details: CustomerDetails) => {
  const itemLines = items
    .map(i => `• ${i.product.name} (${i.selectedSize}) × ${i.quantity} = ₹${i.product.price * i.quantity}`)
    .join('\n');
  
  return encodeURIComponent(
    `Hi MELT! 🤍 I'd like to place an order:\n\n` +
    `*Order Details:*\n${itemLines}\n\n` +
    `*Total: ₹${subtotal}*\n\n` +
    `*My Details:*\n` +
    `Name: ${details.name}\n` +
    `Phone: ${details.phone}\n` +
    `Address: ${details.address}, ${details.city} - ${details.pin}\n\n` +
    `Please confirm availability and payment details. Thank you!`
  );
};

// Button action:
window.open(`https://wa.me/91XXXXXXXXXX?text=${message}`, '_blank');
```

> Replace `91XXXXXXXXXX` with the owner's WhatsApp number.

**Form Validation:**
- Name: required, min 2 chars
- Phone: required, Indian mobile (10 digits, starts with 6-9)
- Address, City, PIN: required
- Show inline validation errors in `text-red-500 text-[12px]`

**Page States:**
- Default: form visible
- Submitting: button shows spinner
- Success: redirect to `/order-confirmation?method=whatsapp`

---

### 6.2 Order Confirmation Page (`/order-confirmation`)

**Route:** `src/app/order-confirmation/page.tsx`

**Content:**
```
┌───────────────────────────────┐
│                               │
│         ✓  (animated check)  │
│                               │
│    Thank you, [Name]!         │
│                               │
│    Your order has been sent   │
│    via WhatsApp. We'll        │
│    confirm within 2 hours.    │
│                               │
│    Order Reference: #MELT-    │
│    [timestamp-based ID]       │
│                               │
│    [Continue Shopping →]      │
│    [Track on WhatsApp →]      │
│                               │
└───────────────────────────────┘
```

**Animated check mark:** Use Framer Motion to draw an SVG checkmark with `pathLength` animation.

**Clear cart:** On mount, call `clearCart()` from CartContext.

**Order reference ID:** Generate client-side as `MELT-${Date.now().toString(36).toUpperCase()}`

---

### 6.3 404 Page (`/not-found.tsx`)

**Route:** `src/app/not-found.tsx` (Next.js 13+ convention)

**Content:**
```
┌───────────────────────────────┐
│                               │
│   404                         │  ← Large muted number
│                               │
│   This scent has drifted      │  ← Serif italic headline
│   away.                       │
│                               │
│   The page you're looking     │
│   for doesn't exist or has   │
│   moved.                      │
│                               │
│   [← Back Home]  [Shop All]   │
│                               │
└───────────────────────────────┘
```

---

### 6.4 Loading States

**File to create:** `src/components/ui/skeleton.tsx`

Create a reusable `<Skeleton />` component:
```tsx
// Usage: <Skeleton className="h-4 w-32 rounded" />
// Renders a shimmer animation placeholder
```

CSS shimmer animation:
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #F0EBE1 25%, #E2DDD6 50%, #F0EBE1 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

**Use on:**
- ProductCard while loading: skeleton for image area, name, price
- Product detail page while slug resolves

---

### 6.5 Search Overlay — New Component

**File to create:** `src/components/layout/SearchOverlay.tsx`

The search icon in the navbar currently has no action. Build a simple overlay:

```
┌─────────────────────────────────────────────┐
│  [X]                                        │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  🔍  Search for a scent...          │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  Popular Searches:                          │
│  Woody · Vanilla · Fresh · Oud             │
│                                             │
│  [Results render here as user types]        │
│                                             │
└─────────────────────────────────────────────┘
```

**Implementation:**
- Full-screen overlay with `fixed inset-0 bg-melt-bg/95 backdrop-blur-sm z-50`
- Auto-focus input on open
- Filter `products` array client-side using `product.name.toLowerCase().includes(query)` or matching `topNotes/heartNotes/baseNotes`
- Show results as product mini-cards (horizontal layout: image placeholder + name + price)
- Close on Escape key or clicking outside

---

## 7. Micro-interactions & Animation

All animations should use Framer Motion (already installed). No CSS keyframes for motion — CSS keyframes only for `shimmer` and `marquee` which are already defined.

### Animation Principles
- **Duration:** 0.3–0.5s for most UI animations. Never exceed 0.7s.
- **Easing:** Use `[0.25, 0.1, 0.25, 1]` for entrances, `[0.4, 0, 1, 1]` for exits
- **`willChange`:** Set `willChange: 'transform, opacity'` on initial state, reset to `'auto'` after animation completes (already done in existing code — replicate this pattern)
- **`viewport: { once: true }`:** All scroll-triggered animations should only play once

### Interaction Map
| Interaction | Animation |
|---|---|
| Page load | `fade + translateY(12px)` staggered per section |
| Scroll into view | `fade + translateY(12px) → 0` |
| Button hover | No Framer needed — CSS `transition-colors` |
| Button click | `scale(0.97)` via `active:scale-[0.97]` Tailwind |
| Add to cart | Cart icon badge scale bounce + toast slide up |
| Cart item remove | `opacity: 0, x: 20, height: 0` exit animation |
| Tab switch | Product grid `fade in/out` with `AnimatePresence mode="wait"` |
| Cart drawer open | Already handled by Radix Sheet — verify slide-in works |
| Mobile nav open | Already handled by Radix Sheet — verify slide-in works |

---

## 8. Responsive Design Requirements

### Breakpoints (Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Critical Responsive Rules

| Component | Mobile | Desktop |
|---|---|---|
| Hero | Full-height, text only, no right-side element | Two-column with decorative right element |
| ProductGrid | 1 column | 3 or 4 columns |
| ProductCard | Full width, image shorter | Standard aspect ratio |
| Navbar | Logo centered, hamburger left, icons right | Logo center, links left, icons right |
| Product Detail | Stacked (image then info) | Two-column sticky image |
| Checkout | Single column | Two-column (form left, summary right) |
| Footer | Single column stacked | Four-column grid |

### Touch Targets
- All interactive elements: minimum `44px × 44px` touch target
- Cart item quantity buttons: ensure `px-3 py-3` minimum

### Font Sizes
- Never below `12px` on mobile for any readable text
- Use `clamp()` for all hero/section headings (already done in existing code — replicate)

---

## 9. Acceptance Criteria

The frontend is considered complete when all the following are true:

### Visual Quality
- [ ] No raw gradient boxes visible anywhere without art direction (ProductTinPlaceholder used everywhere)
- [ ] All pages feel premium — consistent typography hierarchy, spacing, and color usage
- [ ] ProductCard hover state works smoothly with shadow elevation
- [ ] Cart drawer shipping progress bar renders and animates correctly

### Functional Completeness
- [ ] Navbar logo color adapts correctly on homepage dark hero vs. other pages
- [ ] Search overlay opens, filters products, and closes on Escape
- [ ] Checkout form validates all fields and generates correct WhatsApp message
- [ ] Order confirmation page clears cart and shows animated checkmark
- [ ] 404 page renders on unknown routes
- [ ] Toast notification shows when item added to cart

### Animations
- [ ] All scroll-triggered sections animate in smoothly (no jank)
- [ ] Cart item remove plays exit animation
- [ ] Collection tab switch animates product grid transition
- [ ] Homepage email form shows success state after submission

### Responsive
- [ ] All pages render correctly at 375px (iPhone SE), 768px (iPad), 1440px (desktop)
- [ ] ProductGrid switches correctly: 1 → 2 → 3 columns
- [ ] Product detail page stacks correctly on mobile
- [ ] Checkout form is single-column on mobile, two-column on desktop

### Performance
- [ ] No layout shift (CLS) on page load
- [ ] Images (when added) should use `next/image` with proper `width`, `height`, and `alt` attributes
- [ ] Animations do not cause dropped frames (test on mid-range Android)

---

*End of PRD 01 — Frontend Completion*
