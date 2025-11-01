# E-Commerce Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern e-commerce leaders (Shopify, Vercel Commerce, Stripe Shop) with emphasis on product-first presentation, clean information hierarchy, and frictionless shopping experience.

## Core Design Principles
1. **Product-First**: Products are the heroes; let imagery breathe with generous whitespace
2. **Clarity Over Cleverness**: Prioritize intuitive navigation and clear CTAs
3. **Trust Through Detail**: Rich product information builds confidence
4. **Speed Perception**: Skeleton loaders and smooth transitions maintain engagement

---

## Typography System

**Font Stack**: 
- Primary: Inter (Google Fonts) - clean, modern sans-serif for UI and body text
- Accent: Space Grotesk (Google Fonts) - for headings and brand elements

**Hierarchy**:
- Hero/Display: text-5xl to text-6xl, font-bold (Space Grotesk)
- Section Headings: text-3xl to text-4xl, font-semibold (Space Grotesk)
- Product Titles: text-xl, font-medium (Inter)
- Body Text: text-base, font-normal, leading-relaxed (Inter)
- UI Elements: text-sm to text-base, font-medium (Inter)
- Captions/Meta: text-xs to text-sm, font-normal (Inter)

---

## Layout System

**Spacing Primitives**: Consistent use of Tailwind units 2, 4, 6, 8, 12, 16, 20, 24
- Micro spacing: p-2, gap-4 (component internals)
- Standard spacing: p-6, py-8, gap-6 (cards, sections)
- Macro spacing: py-16, py-20, py-24 (page sections)

**Container Strategy**:
- Max-width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Product grids: `max-w-screen-2xl` for wider layouts
- Content areas: `max-w-4xl` for forms and detailed text

**Grid Systems**:
- Product Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
- Category Grid: `grid-cols-2 md:grid-cols-4 gap-4`
- Cart Layout: Two-column on desktop `lg:grid-cols-3` (2/3 items, 1/3 summary)

---

## Component Library

### Navigation Header
- **Desktop**: Horizontal nav with logo left, category links center, search/cart/auth right
- **Mobile**: Hamburger menu with slide-out drawer, sticky header on scroll
- Height: `h-16` on mobile, `h-20` on desktop
- Elements: Logo, Category dropdowns, Search icon (expands to bar), Cart badge, User avatar
- Sticky behavior: `sticky top-0 z-50` with subtle shadow on scroll

### Homepage Hero Section
**Large Hero Image: YES**
- Full-width hero with overlay gradient for text readability
- Image: Lifestyle product photography showing diverse items in styled setting
- Height: `h-[60vh] md:h-[70vh]` - impactful but not overwhelming
- Content overlay: Centered with blurred background (backdrop-blur-md bg-white/10)
- CTA buttons on image: Primary and secondary with backdrop-blur-sm bg-white/20
- Typography: Large heading (text-5xl md:text-6xl) with subtitle (text-xl md:text-2xl)

### Featured Products Section
- Section padding: `py-20`
- Grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- "Shop Now" CTA below grid: centered, prominent

### Product Cards
- Aspect ratio: `aspect-square` for product images
- Structure: Image → Title → Price → Rating → Quick Add button
- Padding: `p-4` internal spacing
- Border: Subtle border with hover elevation (shadow-md on hover)
- Image: Object-cover with loading skeleton
- Quick view icon: Top-right on hover (desktop only)
- Rating: Star icons (Heroicons) with count `text-sm`

### Product Detail Page
**Layout**: Two-column on desktop (lg:grid-cols-2)
- **Left Column**: 
  - Main image: `aspect-square` with zoom on click capability
  - Thumbnail strip below: `grid-cols-4 gap-2`
- **Right Column**: 
  - Breadcrumb navigation
  - Product title (text-3xl)
  - Star rating with review count
  - Price (text-4xl font-bold) with strikethrough if discounted
  - Description (max-w-prose, leading-relaxed)
  - Quantity selector + Add to Cart (full-width button, h-12)
  - Product specifications accordion
  - Trust badges (Free Shipping, Returns, etc.)

### Search & Filter Panel
**Desktop**: Sticky sidebar (w-64) on product listing page
**Mobile**: Slide-up drawer with filter chips at top

Filter Components:
- Category checkboxes with product counts
- Price range: Dual-handle slider component
- Rating filter: Star-based selection
- Apply/Clear buttons at bottom (sticky on mobile)

Active filters: Chip badges above product grid with X to remove

### Shopping Cart
**Cart Drawer**: Slide-in from right (w-full sm:w-96)
- Header: "Shopping Cart" with close button
- Items list: Each item with thumbnail, title, quantity controls, remove button
- Empty state: Icon (Heroicons shopping-bag) with "Start Shopping" CTA
- Footer (sticky): Subtotal, "View Cart" and "Checkout" buttons

**Cart Page**: 
- Two-column layout (items list 2/3, summary 1/3)
- Item cards: Horizontal layout with image, details, quantity, subtotal
- Order summary: Sticky on scroll, includes subtotal, shipping estimate, total
- "Proceed to Checkout" button: Full-width, prominent

### Admin Panel (/admin)
**Login Page**: Centered card (max-w-md) with:
- Logo/brand
- "Admin Access" heading
- OAuth button: "Sign in with Replit" with icon
- Security badge/trust indicator

**Admin Dashboard**:
- Sidebar navigation: Products, Add Product, Orders (simulated)
- Product table: Sortable columns, edit/delete actions
- Add Product Form: Multi-step or single-page
  - Image upload dropzone (drag-and-drop)
  - Title, Description (textarea), Price, Category (select)
  - Validation messages inline
  - Submit button with loading state

### Loading States
**Skeleton Screens**: Match actual component structure
- Product card: Rectangle for image, 3 lines for text
- Product grid: Multiple skeleton cards
- Detail page: Two-column skeleton matching final layout

**Loading Spinner**: Centered with logo animation or simple circular spinner

### Pagination
- Position: Bottom of product grid, centered
- Structure: Previous | 1 2 3 ... 10 | Next
- Active page: Prominent styling, disabled state for boundary pages
- Mobile: Show fewer page numbers (1 ... 5 6 7 ... 20)

### Dark Mode Toggle
- Position: Header utility area (near cart/user)
- Control: Sun/Moon icon toggle (Heroicons)
- Smooth transition: All elements transition color over 200ms

---

## Responsive Breakpoints

- Mobile: `< 640px` - Single column, stacked navigation, full-width elements
- Tablet: `640px - 1024px` - 2 columns for products, simplified filtering
- Desktop: `> 1024px` - Full multi-column layouts, sidebar filters, hover states

---

## Animations (Subtle & Purposeful)

**Framer Motion Usage**:
1. Page transitions: Fade + slight slide (y: 10 to 0)
2. Cart drawer: Slide in from right
3. Product card hover: Slight scale (1.02) + shadow elevation
4. Add to cart: Quick scale pulse on button click
5. Filter panel: Slide down for mobile drawer

**No Animations**:
- Scroll-triggered effects (avoid distraction)
- Parallax scrolling
- Complex page transitions

---

## Icon Library
**Heroicons** (via CDN): Shopping cart, search, user, heart, star, filter, menu, close, chevrons

---

## Images

**Hero Section**: 
- High-quality lifestyle photography featuring arranged products in aspirational setting
- Dimensions: 1920x1080 minimum, optimized for web
- Style: Modern, bright, authentic (not overly staged)

**Product Images**: 
- Clean white/neutral backgrounds for consistency
- Square format (800x800px minimum)
- Multiple angles available on detail page

**Category Banners**: 
- Lifestyle images representing each category (electronics, jewelry, clothing, etc.)
- Aspect ratio: 16:9 or 3:2

**Empty States**: 
- Illustrative graphics for empty cart, no results, no products

---

## Accessibility
- All interactive elements: min-height/width of 44px
- Form inputs: Clear labels, error states with descriptive text
- Focus indicators: Visible keyboard navigation with focus rings
- Image alt text: Descriptive product names
- ARIA labels: Cart count badge, navigation, modals