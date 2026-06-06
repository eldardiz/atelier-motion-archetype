'use client'

import { createContext, useContext, useEffect, useRef } from 'react'

interface LenisContextValue {
  stop: () => void
  start: () => void
  scrollTo: (target: number, options?: Record<string, unknown>) => void
}

export const LenisContext = createContext<LenisContextValue | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    let rafId: number
    let destroyed = false

    import('lenis').then(({ default: Lenis }) => {
      if (destroyed) return

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
        infinite: false,
      })
      lenisRef.current = lenis
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).__lenis = lenis

      lenis.on('scroll', () => {
        window.dispatchEvent(new CustomEvent('lenis-scroll'))
      })

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

      // Listen for transition events from PageTransitionProvider
      const handleStop = () => lenis.stop()
      const handleStart = () => {
        lenis.start()
        // After transition completes, scroll to hash anchor if present in URL
        requestAnimationFrame(() => {
          const hash = window.location.hash
          if (hash) {
            const el = document.querySelector(hash)
            if (el) lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 })
          }
        })
      }
      window.addEventListener('page-transition-stop', handleStop)
      window.addEventListener('page-transition-start', handleStart)

      return () => {
        window.removeEventListener('page-transition-stop', handleStop)
        window.removeEventListener('page-transition-start', handleStart)
      }
    })

    return () => {
      destroyed = true
      cancelAnimationFrame(rafId)
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).__lenis
      }
    }
  }, [])

  const contextValue: LenisContextValue = {
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
    scrollTo: (target, options) => lenisRef.current?.scrollTo(target, options),
  }

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  )
}
