#!/usr/bin/env bash
# Fetch Kettmeir's image sequence WebPs into public/sequence/ for DEV USE ONLY.
#
# ⚠️  These frames are Kettmeir.com property. They must NEVER be:
#     - committed to git (the `public/sequence/` folder is gitignored)
#     - shipped to a client domain or public marketing URL
#     - distributed outside the *.vercel.app private staging URL
#
# Replace with our own renders before any client delivery.
#
# Usage:
#   bash scripts/fetch-kettmeir-frames.sh
#
# Re-run to fix gaps — the script skips already-downloaded files.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DESKTOP_DIR="$ROOT/public/sequence/desktop"
MOBILE_DIR="$ROOT/public/sequence/mobile"
mkdir -p "$DESKTOP_DIR" "$MOBILE_DIR"

DESKTOP_BASE="https://www.kettmeir.com/image-sequence/desktop"
MOBILE_BASE="https://www.kettmeir.com/image-sequence/mobile"

DESKTOP_COUNT=94
MOBILE_COUNT=118

echo "→ Desktop: $DESKTOP_COUNT frames"
for i in $(seq -f "%05g" 1 "$DESKTOP_COUNT"); do
  out="$DESKTOP_DIR/kett_desktop_${i}.webp"
  if [ ! -f "$out" ]; then
    curl -sSL -o "$out" "$DESKTOP_BASE/kett_desktop_${i}.webp"
    printf "."
  fi
done
echo

echo "→ Mobile:  $MOBILE_COUNT frames"
for i in $(seq -f "%05g" 1 "$MOBILE_COUNT"); do
  out="$MOBILE_DIR/kett_mobile_${i}.webp"
  if [ ! -f "$out" ]; then
    curl -sSL -o "$out" "$MOBILE_BASE/kett_mobile_${i}.webp"
    printf "."
  fi
done
echo

D_COUNT=$(ls "$DESKTOP_DIR"/*.webp 2>/dev/null | wc -l | tr -d ' ')
M_COUNT=$(ls "$MOBILE_DIR"/*.webp 2>/dev/null | wc -l | tr -d ' ')
D_SIZE=$(du -sh "$DESKTOP_DIR" | awk '{print $1}')
M_SIZE=$(du -sh "$MOBILE_DIR" | awk '{print $1}')

echo
echo "✓ Done. Desktop: $D_COUNT frames ($D_SIZE) — Mobile: $M_COUNT frames ($M_SIZE)"
echo "  These files are gitignored. Do not commit. Replace before client delivery."
