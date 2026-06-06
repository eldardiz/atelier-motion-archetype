# Motion-hero frame sequence

This folder holds the WebP frames used by `MotionHeroSection.tsx` for the
scroll-scrubbed canvas hero.

## Ownership + license

Frames are **owned by us**. Generated via **Google Veo 3 / Veo 3.1**
(image-to-video) from a still composition rendered through an AI image
model. Both endpoints of the asset pipeline are under commercial-use
terms.

- Veo terms: https://policies.google.com/terms/generative-ai
- Generated on: 2026-06-06
- Source still: `scripts/source/atelier-motion-still.jpg` (gitignored)
- Source MP4: `scripts/source/atelier-motion-desktop.mp4` (gitignored)
- Prompt: `scripts/asset-prompt.md`

The source still + MP4 are not committed to git (too heavy, and the WebP
sequence is the only artifact the runtime needs).

## Layout

```
public/sequence/
├── desktop/
│   ├── desktop_00001.webp   ← 1440px wide, q75, ~19KB each
│   └── … (90 frames total)
└── mobile/
    ├── mobile_00001.webp    ← 720px wide, q75
    └── … (when generated)
```

If `mobile/` is empty, `MotionHeroSection.tsx` falls back to the desktop
sequence on mobile viewports (slightly heavier than necessary but works).

## Regenerating

1. Edit `scripts/asset-prompt.md` if the brief changes.
2. Generate a new still + Veo video using the prompt.
3. Save the source MP4(s) into `scripts/source/`:
   - `atelier-motion-desktop.mp4` (16:9)
   - `atelier-motion-mobile.mp4` (9:16, optional)
4. Run from project root:
   ```
   bash scripts/encode-sequence.sh
   ```
5. If the frame count changes, update `DESKTOP_FRAMES` (and `MOBILE_FRAMES`)
   in `components/sections/MotionHeroSection.tsx` to match.
6. `npm run dev` to verify, then commit.

## Requirements

- `ffmpeg` (`brew install ffmpeg`) — 8.x is fine, no WebP encoder needed
- `cwebp` (`brew install webp`) — does the PNG → WebP conversion
