'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { PHOTOS } from '@/lib/placeholders'

// Sesta "The Terroir / In harmony with nature" — slice 05.
// Full-bleed sunset vineyard photo with left-to-right dark gradient.
// Subtle parallax on the background (yPercent 8 → -8 across scroll).

export default function TerroirSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let cleanup = () => {}
    let cancelled = false

    ;(async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const bg = bgRef.current
      if (!section || !bg) return

      const ctx = gsap.context(() => {
        gsap.fromTo(
          bg,
          { yPercent: 10 },
          {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }, section)

      cleanup = () => ctx.revert()
    })()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <section className="sesta-terroir" id="terroir" ref={sectionRef}>
      <div className="sesta-terroir__bg" aria-hidden="true" ref={bgRef}>
        <Image
          src={PHOTOS.terroir}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="sesta-terroir__veil" />
      </div>

      <div className="sesta-terroir__inner">
        <div className="sesta-terroir__title">
          <p className="sesta-eyebrow" style={{ color: 'var(--color-bg)' }}>
            The Terroir
          </p>
          <h2 className="sesta-terroir__display">
            In harmony<br />with nature
          </h2>
        </div>
        <div className="sesta-terroir__copy">
          <p className="sesta-terroir__body">
            It took courage to plant the vines facing the sea in the jumbled foothills of the
            Llevant mountains, a rather unusual planting practice, at least in this part of
            Mallorca, and a feature unique to Ses Talaioles.
          </p>
          <a href="#bodega" className="sesta-btn sesta-terroir__btn">
            Discover more
          </a>
        </div>
      </div>
    </section>
  )
}
