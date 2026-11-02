/**
 * ============================================================
 *  DEALER CONFIG — the ONE file to edit for each new dealer.
 * ============================================================
 * Everything dealer-specific (name, contact info, colors, hours,
 * socials, SEO) lives here. Components read from this object only.
 */

export type DayHours = { day: string; open: string | null; close: string | null };

export const dealer = {
  /** Public business name */
  name: "Sample Motors",
  /** Legal name, used in footer copyright */
  legalName: "Sample Motors LLC",
  tagline: "Quality pre-owned vehicles. Honest prices. No pressure.",
  /** Path under /public. Replace public/brand/logo.svg or point elsewhere. */
  logo: "/brand/logo.svg",

  /**
   * Brand colors. Any valid CSS color (hex, rgb, oklch).
   * Injected as CSS variables in src/app/layout.tsx and consumed by
   * Tailwind/shadcn tokens (bg-primary, text-primary, bg-brand-accent, ...).
   */
  colors: {
    /** Navy */
    primary: "#1b2a4a",
    primaryForeground: "#ffffff",
    /** Deep red */
    accent: "#b22234",
    accentForeground: "#ffffff",
    /** Off-white page background */
    background: "#fbfaf7",
    /** Near-black navy body text */
    foreground: "#14213d",
  },

  /** Display format and tel: format */
  phone: { display: "(555) 123-4567", tel: "+15551234567" },
  email: "sales@example.com",
  address: {
    street: "123 Main Street",
    city: "Springfield",
    region: "ST",
    postalCode: "00000",
    country: "US",
  },
  /** Optional Google Maps link for "Get directions" */
  mapUrl: "https://maps.google.com/?q=123+Main+Street+Springfield",
  /** Optional lat/lng for JSON-LD */
  geo: null as { latitude: number; longitude: number } | null,

  /** 24h "HH:MM" strings; null = closed */
  hours: [
    { day: "Monday", open: "09:00", close: "18:00" },
    { day: "Tuesday", open: "09:00", close: "18:00" },
    { day: "Wednesday", open: "09:00", close: "18:00" },
    { day: "Thursday", open: "09:00", close: "18:00" },
    { day: "Friday", open: "09:00", close: "18:00" },
    { day: "Saturday", open: "10:00", close: "16:00" },
    { day: "Sunday", open: null, close: null },
  ] satisfies DayHours[],

  /** Leave a value empty ("") to hide that icon */
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    x: "",
    youtube: "",
  },

  about: {
    heading: "Family-owned since 2005",
    body: [
      "We're a small, independent dealership that believes buying a used car should be simple and transparent.",
      "Every vehicle on our lot is inspected, and we post real prices online so you know what to expect before you visit.",
    ],
  },

  /** Contact form: "mailto" opens the visitor's mail app; swap for an API later. */
  contactForm: { mode: "mailto" as "mailto" | "placeholder" },

  seo: {
    /** Canonical production URL — no trailing slash. Used by sitemap, robots, OG. */
    siteUrl: "https://www.example.com",
    title: "Sample Motors | Used Cars in Springfield, ST",
    description:
      "Browse quality used cars, trucks and SUVs at Sample Motors in Springfield. Transparent pricing, inspected vehicles, friendly local service.",
    keywords: ["used cars", "pre-owned", "Springfield", "car dealer"],
    /** Optional 1200x630 image in /public, e.g. "/brand/og.jpg". Empty = none. */
    ogImage: "",
    locale: "en_US",
  },
};

export type Dealer = typeof dealer;

export const fullAddress = (d: Dealer = dealer) =>
  `${d.address.street}, ${d.address.city}, ${d.address.region} ${d.address.postalCode}`;
