/**
 * ============================================================
 *  DEALER CONFIG — the ONE file to edit for each new dealer.
 * ============================================================
 * Everything dealer-specific (name, contact info, colors, hours,
 * socials, SEO) lives here. Components read from this object only.
 */

export type VeteranConfig = {
  veteranOwned?: boolean;
  militaryDiscount?: string;
  branchesServed?: string[];
  perks?: string[];
  disclaimer?: string;
};

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

  /** Homepage hero copy. */
  hero: {
    eyebrow: "Veteran-Owned • Locally Operated",
    heading: "Proudly Serving Those Who Served",
    subheading:
      "Quality pre-owned cars, trucks and SUVs with straight-talk pricing, and real thanks for the men and women who've worn the uniform.",
  },

  /**
   * Veteran & military benefits. Every field is optional:
   * set veteranOwned=false, militaryDiscount="" and branchesServed=[]
   * (or the whole block to null) and the section + badges disappear.
   */
  veteran: {
    veteranOwned: true,
    /** Short offer text shown in the badge and benefits section; "" hides it. */
    militaryDiscount: "$500 off any vehicle for active duty, veterans, and military families",
    /** Owner/staff service branches, plain text (no insignia). [] hides the line. */
    branchesServed: ["U.S. Army", "U.S. Marine Corps"],
    /** Extra benefit bullets. [] hides the list. */
    perks: [
      "Flexible financing help for first-time and deployment-affected buyers",
      "Priority test drives and appointments around drill and duty schedules",
      "Fair trade-in offers, no haggling, no pressure",
    ],
    /** Fine print under the section; "" hides it. */
    disclaimer: "Valid military, veteran, or dependent ID required. Cannot be combined with other offers.",
  } as VeteranConfig | null,

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
    heading: "Veteran-owned. Built on trust.",
    body: [
      "Sample Motors was founded by a U.S. Army veteran who came home and found that buying a reliable car was harder than it should be. We set out to run the kind of dealership we'd want to buy from: straight answers, fair prices, and no games.",
      "Every vehicle on our lot is inspected before it's listed, and we post real prices online so you know what to expect before you visit.",
      "We're proud to serve our neighbors, and especially the service members, veterans and military families of our community. Whether you're PCSing, transitioning out, or just need dependable wheels, we'll treat you the way you've earned.",
    ],
  },

  /** Contact form: "mailto" opens the visitor's mail app; swap for an API later. */
  contactForm: { mode: "mailto" as "mailto" | "placeholder" },

  seo: {
    /** Canonical production URL — no trailing slash. Used by sitemap, robots, OG. */
    siteUrl: "https://www.example.com",
    title: "Sample Motors | Veteran-Owned Used Car Dealer in Springfield, ST",
    description:
      "Browse quality used cars, trucks and SUVs at Sample Motors in Springfield. Transparent pricing, inspected vehicles, friendly local service.",
    keywords: ["used cars", "pre-owned", "Springfield", "car dealer", "veteran-owned", "military discount"],
    /** Optional 1200x630 image in /public, e.g. "/brand/og.jpg". Empty = none. */
    ogImage: "",
    locale: "en_US",
  },
};

export type Dealer = typeof dealer;

export const fullAddress = (d: Dealer = dealer) =>
  `${d.address.street}, ${d.address.city}, ${d.address.region} ${d.address.postalCode}`;

/** True when the dealer has any veteran/military content to show. */
export const hasVeteranBenefits = (d: Dealer = dealer) => {
  const v = d.veteran;
  return !!v && (!!v.veteranOwned || !!v.militaryDiscount || !!v.branchesServed?.length || !!v.perks?.length);
};
