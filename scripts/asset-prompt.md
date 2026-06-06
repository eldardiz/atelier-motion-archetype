# Atelier Motion — locked creative brief

This is the source-of-truth prompt for the motion-hero sequence in
`atelier-motion-archetype`. Paste it (or its essence) into your preferred
AI video model. Generate **two** takes — one 16:9 desktop, one 9:16 mobile —
and drop both into `scripts/source/` as:

```
scripts/source/atelier-motion-desktop.mp4   # 16:9, 1920×1080
scripts/source/atelier-motion-mobile.mp4    # 9:16, 1080×1920
```

The encode script (`scripts/encode-sequence.sh`) handles the rest.

---

## The brief

**Subject.** A dark olive-green glass wine bottle (Bordeaux shape, **blank
label, no text, no logo**). The bottle is upright but tilted ~10° to the
right, balanced on top of a stacked composition.

**Composition** (bottom → top):
- **Base**: three sea-worn flat limestone slabs in cream and soft beige,
  stacked unevenly so the top slab leans
- **Middle**: a horizontal piece of weathered sun-bleached grey driftwood
  resting across the slabs, with a single small navy ceramic cylinder
  standing upright next to it
- **Top**: a smooth pale pebble, and the wine bottle balancing on the pebble
  + driftwood edge

**Backdrop.** Continuous warm cream paper sweep, gradient from `#EBE5D8`
(top) to `#DDD5C4` (bottom). No horizon line, no environment, no sky.

**Camera.** Slow continuous **180° orbit** from screen-left to
screen-right around the composition, with a subtle dolly-in at the midpoint
(ease-in-out). Full arc covers **6 seconds**. The composition itself does
NOT move — only the camera.

**Lighting.** Soft daylight key from the upper-left, neutral fill from the
right, a gentle warm shadow falling to the right of the composition.
Studio-clean. No film grain.

**Style.** Photoreal product photography. Hasselblad / 50mm lens, **f/4
shallow depth of field**, slight subject-isolation blur on the backdrop
edges. Editorial, premium, magazine-grade. Think *Kinfolk* meets *Vogue
Living*.

**Negative prompt (must not include).**
- text, letters, logos, words on the bottle or anywhere
- people, hands, arms
- liquid spilling, wine pouring, droplets
- the bottle falling, the composition collapsing
- any movement besides the camera
- vineyards, sky, ocean, landscape
- film grain, vignette, lens flare

**Duration.** 6 seconds.

**Aspect.**
- Desktop take: **1920×1080 (16:9)**
- Mobile take: **1080×1920 (9:16)** — regenerate with the same prompt; the
  composition must stay centered in the vertical frame, so re-frame rather
  than crop

---

## Model picks (mid-2026)

Pick one. Veo 3 leads on object physics; Sora 2 leads on prompt adherence;
Runway Gen-4 is the cheapest path with the best frame-extract UX.

| Model | Where | Cost / 6s take | Why pick it |
|---|---|---|---|
| **Veo 3** | labs.google.com/fx | ~$5 | Best object physics + camera moves. Output is buttery for product orbits. |
| **Sora 2** | sora.com | ~$5 | Best prompt adherence. Will respect "no text, no liquid, no people" rigidly. |
| **Runway Gen-4** | app.runwayml.com | ~$2-3 | Cheapest. Built-in frame export. Lower quality on glass refraction. |
| **Kling 2.0** | klingai.com | ~$3 | Strong cinematic feel. Less consistent across re-rolls. |

**Recommendation**: try **Veo 3** first. If the bottle balance reads unstable
or the orbit speed is off, fall back to **Sora 2** with the same prompt.

---

## Workflow

1. Generate **3-5 desktop takes** at 16:9, 6s. Pick the one where:
   - bottle stays balanced through the full orbit
   - backdrop stays cream (no environment bleed-in)
   - 180° arc reads continuous (no jump-cut)
2. Generate **2-3 mobile takes** at 9:16 with the same prompt.
3. Download MP4s. Rename + drop into `scripts/source/`.
4. Run `bash scripts/encode-sequence.sh` from project root.
5. Confirm frame count printed by the script. If it differs from 90, update
   `DESKTOP_FRAMES` / `MOBILE_FRAMES` in `components/sections/MotionHeroSection.tsx`.
6. `npm run dev` → scroll → verify the motion. Commit + push.

## License

Whichever model you pick, save the **commercial-use clause link** and paste
into `public/sequence/README.md`. As of 2026-06:
- Veo 3: https://policies.google.com/terms/generative-ai (commercial OK)
- Sora 2: https://openai.com/policies/terms-of-use (commercial OK)
- Runway: https://runwayml.com/terms-of-use (commercial OK on paid tier)
- Kling: https://klingai.com/terms (commercial OK on paid plan)

Document the chosen model + date of generation in the README. That's the
legal trail.
