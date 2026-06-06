'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { PHOTOS } from '@/lib/placeholders'

declare global {
  interface Window {
    __lenis?: { stop: () => void; start: () => void }
  }
}

export default function Preloader() {
  const [done, setDone] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true

    async function run() {
      const { default: gsap } = await import('gsap')

      window.__lenis?.stop()

      const counter = counterRef.current
      const mask = maskRef.current
      const content = contentRef.current
      const root = rootRef.current
      if (!root) return

      const obj = { v: 0 }
      gsap.to(obj, {
        v: 100,
        duration: 1.6,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (counter) counter.textContent = String(Math.floor(obj.v)).padStart(3, '0')
        },
        onComplete: () => {
          if (!mounted) return

          gsap.to(content, { opacity: 0, duration: 0.4, ease: 'power2.out' })
          gsap.to(mask, {
            clipPath: 'circle(0% at 50% 50%)',
            duration: 1.6,
            ease: 'power3.inOut',
            delay: 0.15,
            onComplete: () => {
              if (!mounted) return
              root.style.pointerEvents = 'none'
              gsap.to(root, {
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                  if (!mounted) return
                  window.__lenis?.start()
                  document.querySelector('.underlay-nav__header')?.classList.add('is-visible')
                  setDone(true)
                  window.dispatchEvent(new CustomEvent('preloader-done'))
                },
              })
            },
          })

          const heroImg = document.querySelector('.hero-image')
          if (heroImg) {
            gsap.fromTo(
              heroImg,
              { scale: 1.4, filter: 'brightness(0.5)' },
              { scale: 1, filter: 'brightness(1)', duration: 2.4, ease: 'power3.out', delay: 0.3 }
            )
          }

          const innerWords = document.querySelectorAll('.hero-headline .word .inner')
          if (innerWords.length) {
            gsap.fromTo(
              Array.from(innerWords),
              { yPercent: 110 },
              { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.06, delay: 0.9 }
            )
          }

          gsap.fromTo(
            '.hero-headline .above',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.4 }
          )
          gsap.fromTo(
            '.hero-top, .hero-bottom',
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.6 }
          )
        },
      })
    }

    run()
    return () => { mounted = false }
  }, [])

  if (done) return null

  return (
    <div className="preloader" ref={rootRef}>
      <div className="preloader-bg" aria-hidden="true">
        <Image src={PHOTOS.hero} alt="" fill className="object-cover" priority sizes="100vw" />
      </div>
      <div className="preloader-mask" ref={maskRef}></div>
      <div className="preloader-content" ref={contentRef}>
        <span className="mark">Le Passage</span>
        <span className="lead">Saint Honore · Paris I</span>
      </div>
      <div className="preloader-counter" ref={counterRef}>000</div>
      <svg className="noise" preserveAspectRatio="none">
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  )
}
