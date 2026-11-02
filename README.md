# Used Car Dealer Website Template

A reusable website template for small independent used car dealerships, built with Next.js 15 (App Router, TypeScript), Tailwind CSS v4 and shadcn/ui.

**What's included:** a homepage with a hero and an inventory grid you can filter and sort, vehicle detail pages, About and Contact pages, SEO (metadata, sitemap, robots, JSON-LD), and a mobile-first, accessible layout with a click-to-call button in the header.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

Requires Node 18.18 or newer (tested on Node 24).

## Set it up for a new dealer, step by step

### 1. Edit the dealer config: `src/config/dealer.ts`
Every dealer-specific value lives in this one file:

| Field | What it controls |
|---|---|
| `name`, `legalName`, `tagline` | Header, hero, footer, copyright, JSON-LD |
| `logo` | Header logo and favicon (path under `/public`) |
| `colors.primary` / `primaryForeground` | Buttons, links, hero background, focus ring |
| `colors.accent` / `accentForeground` | Hero "Browse inventory" button and "Sample" badges |
| `phone.display` / `phone.tel` | Click-to-call everywhere (`tel` should be in E.164 format, e.g. `+15551234567`) |
| `email` | Contact form (mailto), footer, and the email link on vehicle pages |
| `address`, `mapUrl`, `geo` | Footer, About, Contact, AutoDealer JSON-LD |
| `hours` | Hours tables and `openingHours` in JSON-LD (24h `"HH:MM"`, `null` = closed) |
| `social` | Footer links (leave a link as `""` to hide it) |
| `about` | About page heading and paragraphs |
| `contactForm.mode` | `"mailto"` (opens the visitor's email app) or `"placeholder"` (shows a success message only) |
| `seo.siteUrl` | **Required.** Production URL, used for canonical links, the sitemap, robots and OG tags |
| `seo.title`, `description`, `keywords`, `ogImage`, `locale` | Default metadata |

Brand colors are injected as CSS variables (`--primary`, `--brand-accent`, …) in `src/app/layout.tsx`. Tailwind classes such as `bg-primary`, `text-primary` and `bg-brand-accent` pick them up automatically, so you don't have to edit any CSS.

### 2. Replace the brand assets
- Replace `public/brand/logo.svg` with the dealer's logo, or change `dealer.logo` to point to a different file.
- (Optional) Add a 1200×630 social sharing image, e.g. `public/brand/og.jpg`, and set `seo.ogImage`.
- (Optional) Replace `src/app/favicon.ico`.

### 3. Load the real inventory
Replace `data/inventory.json` with the dealer's vehicles. All 8 sample vehicles have `"sample": true` and stock numbers starting with `SAMPLE-`, so they're easy to spot (they also show a "Sample" badge on the site). Remove all of them before launch.

Each vehicle follows the `Vehicle` type in `src/lib/vehicle.ts`. The required fields are `id`, `stockNumber`, `vin`, `year`, `make`, `model`, `price`, `mileage`, `images`, `features` and `description`. Vehicles with `"status": "sold"` are hidden. Page URLs (slugs) are generated automatically from year, make, model and stock number.

**Photos:** if the images are hosted on a CDN or DMS, add that hostname to `images.remotePatterns` in `next.config.ts` (the template currently allows only `placehold.co`). You can also put the photos in `/public` and use paths like `/vehicles/abc-1.jpg`.

### 4. (Later) Switch to a CSV or API feed
`src/lib/inventory.ts` defines an `InventoryProvider` interface. To use a different source, write a provider whose `list()` returns `Vehicle[]` (for example, fetch a DMS feed, or parse a CSV with `papaparse`), then set `activeProvider` to it. A commented example is included. Pages call only `getAllVehicles()` and `getVehicleBySlug()`, so nothing else needs to change. If you use a remote feed, add `export const revalidate = 3600` to the pages (or rely on `fetch` revalidation) so inventory updates without a redeploy.

### 5. Hook up the contact form (optional)
`src/components/contact-form.tsx` contains the UI only. By default it opens a pre-filled `mailto:`. To send leads to a CRM or email service, replace the `TODO` in `handleSubmit` with a `fetch` to your endpoint, such as a Route Handler at `src/app/api/lead/route.ts` or Formspree.

### 6. Check and deploy
```bash
npm run lint && npm run build
```
Deploy to Vercel or any Node host. Before launch, make sure `seo.siteUrl` matches the live domain, then submit `https://<domain>/sitemap.xml` to Google Search Console.

## Project layout
```
data/inventory.json            Sample inventory (replace)
public/brand/logo.svg          Placeholder logo (replace)
src/config/dealer.ts           Dealer config: the main file to edit
src/lib/inventory.ts           Server-only inventory loader and provider swap point
src/lib/vehicle.ts             Vehicle type and helpers (slug, title, formatting), safe to use in client components
src/lib/seo.ts                 JSON-LD builders (AutoDealer, Car)
src/app/layout.tsx             Global metadata, brand CSS variables, header and footer, AutoDealer JSON-LD
src/app/page.tsx               Hero and inventory browser
src/app/inventory/[slug]/      Vehicle detail page (SSG, generateMetadata, Car JSON-LD)
src/app/about, src/app/contact Static pages
src/app/sitemap.ts, robots.ts  SEO routes
src/components/                Header, footer, inventory card, filter, gallery, contact form
src/components/ui/             shadcn/ui primitives
```

## SEO features
- A title template (`%s | Dealer Name`), default description and Open Graph tags from the config
- Canonical URLs for each page; detail pages get their title, description and OG image from `generateMetadata`
- `AutoDealer` JSON-LD on every page, and `Car` + `Offer` JSON-LD on vehicle pages
- `sitemap.xml` that includes every vehicle, plus `robots.txt`

## Accessibility
The template includes a skip link, semantic landmarks, labeled form controls, `aria-live` result counts, keyboard-accessible gallery thumbnails, visible focus rings, and descriptive labels on call and menu buttons.
