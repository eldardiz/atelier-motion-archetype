'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Motion hero — clone of kettmeir.com's pinned scroll-scrubbed image sequence.
 *
 * Mechanics:
 *  1. Preload 94 desktop WebP frames (or 118 mobile) via Image() + Promise.all
 *  2. Paint the active frame onto a <canvas> with object-fit: cover math
 *  3. Pin the section for +=300% scroll (250% on mobile), advance frame via
 *     GSAP ScrollTrigger scrub
 *  4. SplitText-style line-by-line title reveal masked by overflow:hidden
 *     wrappers, sub-line fades in around frame 80
 *
 * Real <h1> stays in the DOM for SEO/a11y; <canvas> is aria-hidden.
 */

const DESKTOP_FRAMES = 94
const MOBILE_FRAMES = 118
const DESKTOP_PATH = (i: number) =>
  `/sequence/desktop/kett_desktop_${String(i + 1).padStart(5, '0')}.webp`
const MOBILE_PATH = (i: number) =>
  `/sequence/mobile/kett_mobile_${String(i + 1).padStart(5, '0')}.webp`

export default function MotionHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const subRef = useRef<HTMLParagraphElement | null>(null)
  const [loadPct, setLoadPct] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cleanup = () => {}
    let cancelled = false

    ;(async () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      const total = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES
      const urlFor = isMobile ? MOBILE_PATH : DESKTOP_PATH

      const images: HTMLImageElement[] = []
      let loaded = 0
      await Promise.all(
        Array.from({ length: total }, (_, i) => {
          return new Promise<void>((resolve) => {
            const img = new Image()
            img.src = urlFor(i)
            img.onload = () => {
              images[i] = img
              loaded += 1
              if (!cancelled) setLoadPct(Math.round((loaded / total) * 100))
              resolve()
            }
            img.onerror = () => {
              loaded += 1
              if (!cancelled) setLoadPct(Math.round((loaded / total) * 100))
              resolve()
            }
          })
        }),
      )

      if (cancelled) return
      setReady(true)

      const canvas = canvasRef.current
      const section = sectionRef.current
      if (!canvas || !section) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      let cssW = window.innerWidth
      let cssH = window.innerHeight

      const resize = () => {
        cssW = window.innerWidth
        cssH = window.innerHeight
        canvas.width = Math.round(cssW * dpr)
        canvas.height = Math.round(cssH * dpr)
        canvas.style.width = `${cssW}px`
        canvas.style.height = `${cssH}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        render(state.frame)
      }

      const state = { frame: 0 }

      const render = (raw: number) => {
        const idx = Math.max(0, Math.min(total - 1, Math.round(raw)))
        const img = images[idx]
        if (!img) return
        ctx.clearRect(0, 0, cssW, cssH)
        const imgRatio = img.width / img.height
        const boxRatio = cssW / cssH
        let dw = cssW
        let dh = cssH
        let dx = 0
        let dy = 0
        if (imgRatio > boxRatio) {
          dh = cssH
          dw = dh * imgRatio
          dx = (cssW - dw) / 2
        } else {
          dw = cssW
          dh = dw / imgRatio
          dy = (cssH - dh) / 2
        }
        ctx.drawImage(img, dx, dy, dw, dh)
      }

      resize()
      window.addEventListener('resize', resize)

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      const ctxGsap = gsap.context(() => {
        gsap.to(state, {
          frame: total - 1,
          snap: 'frame',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top top',
            end: isMobile ? '+=250%' : '+=300%',
            scrub: 0.5,
            onUpdate: () => render(state.frame),
          },
        })

        gsap.from('.motion-hero__title .line > span', {
          yPercent: 110,
          stagger: 0.08,
          duration: 0.95,
          ease: 'expo.out',
          delay: 0.2,
        })

        if (subRef.current) {
          gsap.fromTo(
            subRef.current,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top+=60% top',
                end: 'top+=80% top',
                scrub: true,
              },
            },
          )
        }

        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(() => {
            ScrollTrigger.refresh()
          })
        }
      }, section)

      cleanup = () => {
        window.removeEventListener('resize', resize)
        ctxGsap.revert()
      }
    })()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <section className="motion-hero" id="hero" ref={sectionRef}>
      <canvas className="motion-hero__canvas" ref={canvasRef} aria-hidden="true" />

      {!ready && (
        <div className="motion-hero__loader" aria-hidden="true">
          <span>{String(loadPct).padStart(3, '0')}</span>
        </div>
      )}

      <div className="motion-hero__copy">
        <h1 className="motion-hero__title">
          <span className="line"><span>Progressio</span></span>
          <span className="line"><span>in traditione</span></span>
        </h1>
        <p className="motion-hero__sub" ref={subRef}>
          <span>With our wines, </span>
          <em>we tell</em>
          <span> all of it.</span>
        </p>
      </div>

      <a href="#finca" className="motion-hero__arrow" aria-label="Scroll to next section">↓</a>
    </section>
  )
}
