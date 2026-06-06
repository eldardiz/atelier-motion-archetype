#!/usr/bin/env bash
# Encode source MP4(s) → numbered WebP frame sequence for the motion hero.
#
# Inputs (drop these in scripts/source/, both gitignored):
#   scripts/source/atelier-motion-desktop.mp4   16:9, 6s
#   scripts/source/atelier-motion-mobile.mp4    9:16, 6s  (optional)
#
# Outputs (committed to git):
#   public/sequence/desktop/desktop_NNNNN.webp  (90 frames at 1440px wide)
#   public/sequence/mobile/mobile_NNNNN.webp    (90 frames at 720px wide, if mobile source exists)
#
# Pipeline note: ffmpeg 8.x ships without a WebP encoder, so we extract PNGs
# first and convert to WebP via cwebp (brew install webp). Match the
# DESKTOP_FRAMES / MOBILE_FRAMES constants in MotionHeroSection.tsx to
# whatever this script emits.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_D="$ROOT/scripts/source/atelier-motion-desktop.mp4"
SRC_M="$ROOT/scripts/source/atelier-motion-mobile.mp4"
DST_D="$ROOT/public/sequence/desktop"
DST_M="$ROOT/public/sequence/mobile"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "✗ ffmpeg not installed. Install with: brew install ffmpeg"; exit 1
fi
if ! command -v cwebp >/dev/null 2>&1; then
  echo "✗ cwebp not installed. Install with: brew install webp"; exit 1
fi

encode_one() {
  local src="$1" dst_dir="$2" width="$3" prefix="$4"
  if [ ! -f "$src" ]; then
    echo "→ Skipping $prefix (no $src)"; return
  fi
  mkdir -p "$dst_dir"
  rm -f "$dst_dir"/*.webp 2>/dev/null || true
  local tmp; tmp=$(mktemp -d)
  echo "→ Extracting PNGs for $prefix (${width}px wide, fps=15)…"
  ffmpeg -y -hide_banner -loglevel error \
    -i "$src" \
    -vf "fps=15,scale=${width}:-2:flags=lanczos" \
    "$tmp/frame_%05d.png"
  echo "→ Converting to WebP q75…"
  for f in "$tmp"/frame_*.png; do
    local name num
    name=$(basename "$f" .png); num=${name#frame_}
    cwebp -q 75 -quiet "$f" -o "$dst_dir/${prefix}_${num}.webp"
  done
  rm -rf "$tmp"
  local count size
  count=$(ls "$dst_dir"/*.webp | wc -l | tr -d ' ')
  size=$(du -sh "$dst_dir" | awk '{print $1}')
  echo "✓ $prefix: $count frames ($size)"
}

encode_one "$SRC_D" "$DST_D" 1440 desktop
encode_one "$SRC_M" "$DST_M" 720 mobile

D=$(ls "$DST_D"/*.webp 2>/dev/null | wc -l | tr -d ' ' || echo 0)
M=$(ls "$DST_M"/*.webp 2>/dev/null | wc -l | tr -d ' ' || echo 0)

echo
echo "Next steps:"
echo "  1. Set DESKTOP_FRAMES = $D (and MOBILE_FRAMES = $M if mobile exists)"
echo "     in components/sections/MotionHeroSection.tsx"
echo "  2. npm run dev → verify at http://localhost:3011/"
echo "  3. git add public/sequence && git commit && git push"
