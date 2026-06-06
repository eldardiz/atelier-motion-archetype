"use client"

interface Props {
  preset: "hero" | "dark-section"
  id: string
}

export default function NoiseOverlay({ preset, id }: Props) {
  const isHero = preset === "hero"
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        opacity: isHero ? 0.7 : 0.08,
        mixBlendMode: isHero ? "overlay" : "normal",
        zIndex: isHero ? 2 : 1,
      }}
    >
      <filter id={id}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency={isHero ? "0.85" : "0.9"}
          numOctaves={isHero ? 3 : 4}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  )
}
