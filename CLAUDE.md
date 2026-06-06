# Atelier Motion Archetype — Template Brain (v2)

This is the **Atelier Motion archetype**, a variant of `atelier/` that copies the Kettmeir.com hero technique 1:1 — a pinned, scroll-scrubbed image-sequence hero painted onto a `<canvas>` via GSAP ScrollTrigger. Same Sesta-class brand DNA, but motion-first instead of photo-quiet.

The original `atelier/` archetype (paper-white + forest green, quiet/photographic hero) is unchanged. This folder lives side-by-side as a separate Vercel project so leads can A/B between the two.

## What's different from atelier/

- **Hero**: replaced `HeroSection.tsx` with `MotionHeroSection.tsx` — a `<canvas>`-based component that preloads a numbered WebP frame sequence and paints frames as the user scrolls
- **Palette**: cream `#EBE5D8` background + deep navy `#1A2B5F` serif headline (cloned from Kettmeir) instead of paper-white + forest green
- **Headline type**: giant uppercase Fraunces (clamps to `12vw / 240px`) — much louder than the restrained Atelier baseline
- **Navbar**: `mix-blend-mode: difference` on the logo so it auto-inverts across light/dark frames
- **Below-fold sections**: carry over from atelier/ with a palette swap pass. Non-blocking for the demo URL.

## ⚠️ Asset legal note — READ BEFORE COMMIT

The `public/sequence/` folder contains **Kettmeir's actual WebP frames**, downloaded via `scripts/fetch-kettmeir-frames.sh` for **internal development only**. These frames belong to Kettmeir and **MUST NOT** be:

- Pushed to GitHub (folder is in `.gitignore`)
- Used on any client delivery, custom domain, or production marketing URL
- Distributed beyond the `*.vercel.app` private staging URL

**Before any client work or public push**: replace with our own renders (Blender / Cinema 4D drone or 3D sequence, ~60-90 WebP frames at 1440px wide).

The fetch script is run once locally and the frames live outside of git.

## Stack

Same as `atelier/`:
- Next.js 16.2.4, TypeScript, Tailwind CSS v4
- Inter + Fraunces via next/font/google (Fraunces is now the load-bearing display)
- GSAP + ScrollTrigger + Lenis (all already installed)
- No new dependencies — the motion hero is hand-rolled `<canvas>` + ScrollTrigger
- Vercel deploy → `atelier-motion-archetype.vercel.app`

## How the motion hero works

`components/sections/MotionHeroSection.tsx`:
1. `useEffect` lazy-imports GSAP + ScrollTrigger (matches the existing `HeroSection.tsx` pattern in `atelier/`)
2. Preloads all 94 desktop WebPs (or 118 mobile) via `new Image()` + `Promise.all`
3. Resizes the canvas to `innerWidth * devicePixelRatio` and listens for resize
4. ScrollTrigger pins the section for `+=300%` (desktop) / `+=250%` (mobile) of scroll
5. A GSAP tween advances a `state.frame` value across the pinned scroll; `onUpdate` calls `ctx.drawImage()` to paint the active frame
6. A separate ScrollTrigger drives a SplitText-style line-by-line title reveal
7. `gsap.context().revert()` cleans up on unmount

The `<canvas>` is `aria-hidden="true"`; the real `<h1>` headline lives in the DOM for SEO + a11y.

## Critical pitfalls (specific to motion variant)

- **Pin jump on font load**: call `ScrollTrigger.refresh()` after fonts swap (use `document.fonts.ready` Promise inside the hero `useEffect`)
- **Lenis + ScrollTrigger drift**: `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add((t) => lenis.raf(t * 1000))` — without this, the canvas scrub stutters
- **Mobile sequence weight**: 3.5MB total — `<link rel="preload" as="image">` the first frame to avoid blank first paint
- **Asset hotlinking**: never reference `kettmeir.com` URLs at runtime. Load from `public/sequence/` always.
- All other pitfalls from `atelier/` (Lenis dynamic import, em-dash rule, Tailwind in dependencies) carry over.

## Git rules

Separate GitHub repo from `atelier/`. Commit prefix: `atelier-motion: …`. `public/sequence/` is gitignored.

## Reference

- Original Kettmeir scan: `/tmp/kettmeir-scan.md`
- Plan file for the v2 build: `/Users/eldardizdarevic/.claude/plans/1-this-section-hovering-magical-deer.md`
