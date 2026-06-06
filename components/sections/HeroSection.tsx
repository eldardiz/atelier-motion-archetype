'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { PHOTOS } from '@/lib/placeholders'

// Sesta hero — slice 00.
// Full-bleed photo. Italic display headline bottom-left. Subtle parallax:
// the background image translates up slowly as the user scrolls (yPercent
// 0 → -18) via GSAP ScrollTrigger.

export default function HeroSection() {
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
          { yPercent: 0 },
          {
            yPercent: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
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
    <section className="sesta-hero" id="hero" ref={sectionRef}>
      <div className="sesta-hero__bg" aria-hidden="true" ref={bgRef}>
        <Image
          src={PHOTOS.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="sesta-hero__veil" />
      </div>

      <div className="sesta-hero__inner">
        <h1 className="sesta-hero__headline">
          Aromas of the<br />Mediterranean
        </h1>
        <a href="#finca" className="sesta-hero__scroll" aria-label="Scroll to next section">
          ↓
        </a>
      </div>
    </section>
  )
}
