// Brand config — the single source of truth for every site spawned from this archetype.
// All components read from here. NEVER hardcode business-specific data in components.
//
// To spin up a new mockup or production site, edit ONLY this file (and swap images
// under public/images/). The component layer should not need changes.

export const brand = {
  // ── Identity ────────────────────────────────────────────────────────────────
  identity: {
    name: "{{BUSINESS_NAME}}",
    legalName: "{{BUSINESS_LEGAL_NAME}}",  // for footer / mentions légales — defaults to name if empty
    tagline: "{{TAGLINE}}",
    description: "{{LONG_DESCRIPTION}}",   // used for SEO meta description
    established: "MMXX",                   // roman numerals shown in hero corner badge — e.g. MMXXIV for 2024
    coordinates: {                         // hero corner badge geographic stamp (optional, hide if both empty)
      lat: "",                             // e.g. "48° 51′ 56″ N"
      lng: "",                             // e.g. "02° 19′ 51″ E"
    },
    locale: "en" as "en" | "fr" | "de" | "es" | "it",   // drives default UI strings — phase-1 only English+French wired
  },

  // ── Productization metadata ─────────────────────────────────────────────────
  // These fields drive conditional copy/sections/styling across the template.
  businessType: "restaurant" as "restaurant" | "winery" | "bakery",
  archetype: "atelier" as "editorial" | "maison" | "atelier",
  // Theme variant for Editorial — flips dark surfaces to white via the
  // [data-theme="light"] CSS overlay in styles/claude-design.css. Set to
  // 'light' for bakeries / juice bars / brunch leads where a bright canvas
  // suits the brand better. Default 'dark' (atmospheric, photo-led).
  theme: "dark" as "dark" | "light",

  // ── Contact ─────────────────────────────────────────────────────────────────
  contact: {
    phone: "",
    email: "",
    address: "",
    cityShort: "",            // e.g. "Paris · 1er" — used in hero corner stamp
    googleMapsUrl: "",
    googleMapsEmbedSrc: "",
  },

  // ── Hours ───────────────────────────────────────────────────────────────────
  // Free-form strings — components don't parse, they display verbatim.
  hours: {
    full: "",                 // e.g. "Daily 6:30am – 2:00am"
    lunch: "",
    dinner: "",
    featured: "",             // brunch / tasting hours / bakery early hours — labelled per businessType
    closedOn: "",
  },

  // ── Booking / reservation ───────────────────────────────────────────────────
  booking: {
    system: "url" as "thefork" | "resy" | "opentable" | "tock" | "phone" | "url" | "none",
    widgetId: "",
    url: "",
    ctaLabel: "Book a table",
  },

  // ── Social ──────────────────────────────────────────────────────────────────
  social: {
    instagram: "",            // handle without @
    instagramUrl: "",
    facebook: "",
    tripadvisor: "",
    yelp: "",
  },

  // ── Section flags ───────────────────────────────────────────────────────────
  // Toggle homepage sections on/off without touching components.
  // Names are business-agnostic; the *label* shown to the visitor adapts based on businessType.
  // Lead-gen scope: only the homepage matters. Private hire / careers were stripped from this archetype.
  sections: {
    featuredOffering: true,   // brunch (restaurant) / wine list (winery) / pastries (bakery)
    locationShowcase: true,   // terrace / tasting room / café seating / vineyard
    about: true,              // "Our story" — universal
    philosophy: true,         // "Approach" — universal
    playlist: false,          // restaurant ambiance audio — skip for most wineries/bakeries
    instagram: true,
    testimonials: true,
  },

  // ── Featured offering (signature/teaser section) ────────────────────────────
  // The headline product showcase. Adapt labels per businessType:
  //   restaurant → "Brunch" or "Signature menu"
  //   winery     → "Our wines" / "Tasting flights"
  //   bakery     → "Daily breads" / "Viennoiseries"
  featuredOffering: {
    sectionLabel: "Featured",   // eyebrow label
  },

  // ── Menu / catalog ──────────────────────────────────────────────────────────
  menu: {
    type: "pdf" as "pdf" | "photo" | "url",
    src: "",                  // hidden in UI when empty
  },

  // ── Instagram feed ──────────────────────────────────────────────────────────
  instagram: {
    handle: "",
    embedId: "",              // Curator.io widget ID
  },

  // ── Meta / analytics ────────────────────────────────────────────────────────
  meta: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
    gaId: "",
    metaPixelId: "",
  },
} as const

// Convenience derived value — components import this when they need a localized
// "featured offering" label rather than hardcoding "Brunch" / "Wines" / etc.
export const FEATURED_OFFERING_LABEL: Record<typeof brand.businessType, string> = {
  restaurant: "Signature",
  winery: "Our wines",
  bakery: "Daily selection",
}

export const LOCATION_SHOWCASE_LABEL: Record<typeof brand.businessType, string> = {
  restaurant: "Terrace",
  winery: "Tasting room",
  bakery: "The café",
}
