# Progress — Le Passage Saint-Honoré

## Lessons
- **Horizontal scroll section** (Menu/Brunch/Cocktails): use `position: sticky` outer + GSAP scrub on x-translation. **Do NOT** use GSAP `pin: true` — the generated `.pin-spacer` has no z-index and subsequent cream-bg sections paint over the pinned dark wrap, causing a blank cream mid-scroll. Full pattern + the rabbit-hole story: `vibe-coding/vibe-coding-instructions/02-animation-patterns/horizontal-scroll-sticky.md`.

## Done ✅
- [x] Project scaffold (Next.js 16.2.4 + Tailwind v4 + GSAP + Lenis)
- [x] lib/brand.ts — fully filled with all client data
- [x] lib/utils.ts, styles/figma-tokens.css (real brand tokens)
- [x] LenisProvider + AnimationInit wired in layout.tsx
- [x] Page routes: home + privatisation only
- [x] Directory structure: components/, public/images/, docs/
- [x] Image audit: 29 photos selected, compressed, categorized in public/images/
- [x] docs/image-manifest.md written
- [x] GitHub: git init + push to Softbird-Web/le-passage-saint-honore
- [x] Vercel: linked, NEXT_PUBLIC_SITE_URL env var set
- [x] npm install resend swiper

### Homepage — all 14 sections built ✅
- [x] Navbar (Osmo glass effect + GSAP scroll color-switch + mobile overlay)
- [x] HeroSection (full viewport, parallax, booking CTA)
- [x] InfiniteScrollBanner (GSAP RAF marquee)
- [x] BrunchSection (split layout, parallax photo, signature items)
- [x] TerrasseSection (full-width parallax photo + overlay text)
- [x] HistoireSection (static layout — ⚠️ user has scroll-driven idea, share to upgrade)
- [x] EnvironnementSection (split layout, callout stats)
- [x] GallerySection (Osmo Lightbox — GSAP Flip, Lenis stop/start, keyboard nav)
- [x] PrivatisationTeaser (room cards → /privatisation CTA)
- [x] PlaylistSection (Spotify embed, placeholder state until URL received)
- [x] TestimonialsSection (Swiper carousel, placeholder reviews)
- [x] InstagramSection (static 6-photo grid fallback, Curator.io ready)
- [x] CareersSection (dark bg, mailto CTA, perks list)
- [x] ContactSection (hours, address, phone, Google Maps iframe)
- [x] FinalCTA (full-width dark section + booking CTA)
- [x] Footer (dark navy, nav links, hours, CTA)

### Build checks ✅
- [x] npx tsc --noEmit → 0 errors
- [x] npx next build → clean (3 routes: /, /privatisation, /not-found)

## Client data status
- [x] Name, address, phone, email
- [x] Opening hours: tous les jours 6h30 – 2h00
- [x] Booking URL: https://lepassagesainthonore.fr/fr/booking
- [x] Instagram: @lepassagesthonore
- [ ] TheFork widget ID (pending — using URL link as fallback)
- [ ] Spotify playlist URL (client to provide — placeholder state shown)
- [ ] Menu PDF (client to provide — button hidden until ready)
- [ ] Private hire room photos — Salle 1 + Salle 2 (using set-tables-row.jpg as temp)
- [ ] Private hire room capacity (showing "Sur demande")
- [ ] Instagram Curator.io embed ID (static grid shown as fallback)
- [ ] Real testimonials (3 placeholder reviews active)

## Pending — Next session
### Privatisation page
- [ ] /privatisation page — hero, room cards, inquiry form
- [ ] PrivateHireForm + Server Action → Resend → lepassage01@gmail.com

### HistoireSection upgrade
- [ ] ⚠️ User has a scroll-driven idea — share it so we can build the real version

### Design system
- [ ] Run HUE on lecafeblanc.com → docs/design-system/
- [ ] Refine figma-tokens.css with HUE output (spacing, motion easing)

### Infrastructure
- [ ] RESEND_API_KEY → vercel env add (needs Resend account setup)

## Pending — QA & Launch
- [ ] Mobile QA (390px, 768px, 1280px)
- [ ] Forms test end-to-end (once /privatisation form is built)
- [ ] Custom domain lepassagesainthonore.fr (Vercel → Domains)
