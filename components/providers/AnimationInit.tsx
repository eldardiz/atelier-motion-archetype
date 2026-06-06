'use client'

import { useEffect } from 'react'

export default function AnimationInit() {
  useEffect(() => {
    let mounted = true

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (!mounted) return

      // Sync Lenis smooth scroll with GSAP ScrollTrigger (direct bind — no CustomEvent hop)
      const lenisInst = (window as any).__lenis
      if (lenisInst?.on) {
        lenisInst.on('scroll', () => ScrollTrigger.update())
      } else {
        window.addEventListener('lenis-scroll', () => ScrollTrigger.update(), { passive: true })
      }

      // Theme
      const savedTheme = localStorage.getItem('lpsh-theme') ?? 'light'
      document.documentElement.dataset.theme = savedTheme

      // Helpers
      function splitWords(el: Element) {
        const text = el.textContent ?? ''
        el.textContent = ''
        const frag = document.createDocumentFragment()
        text.split(/(\s+)/).forEach((token) => {
          if (token.match(/^\s+$/)) frag.appendChild(document.createTextNode(token))
          else if (token.length) {
            const w = document.createElement('span')
            w.className = 'word'
            const inner = document.createElement('span')
            inner.className = 'inner'
            inner.textContent = token
            w.appendChild(inner)
            frag.appendChild(w)
          }
        })
        el.appendChild(frag)
        return el.querySelectorAll('.word .inner')
      }

      function splitChars(el: Element) {
        const walk = (node: Node) => {
          if (node.nodeType === 3) {
            const text = node.textContent ?? ''
            const frag = document.createDocumentFragment()
            for (const c of text) {
              if (c === ' ') frag.appendChild(document.createTextNode(' '))
              else {
                const span = document.createElement('span')
                span.className = 'char'
                span.textContent = c
                frag.appendChild(span)
              }
            }
            node.parentNode?.replaceChild(frag, node)
          } else if (node.nodeType === 1) Array.from(node.childNodes).forEach(walk)
        }
        walk(el)
        return el.querySelectorAll('.char')
      }

      function heroScroll() {
        const hero = document.querySelector('.hero')
        if (!hero) return
        const img = hero.querySelector('.hero-image')
        const headline = hero.querySelector('.hero-headline')
        if (img) gsap.to(img, { yPercent: 18, scale: 1.08, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
        if (headline) gsap.to(headline, { yPercent: -40, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
      }

      function wordsPullUp() {
        document.querySelectorAll('[data-words-pullup]').forEach((el) => {
          const words = splitWords(el)
          gsap.fromTo(words, { yPercent: 110, opacity: 0 }, {
            yPercent: 0, opacity: 1, duration: 1.0, ease: 'power4.out', stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })
        })
      }

      function animatedParagraphs() {
        document.querySelectorAll('[data-anim-para]').forEach((el) => {
          const chars = splitChars(el)
          el.classList.add('char-reveal')
          gsap.fromTo(chars, { opacity: 0.18 }, {
            opacity: 1, ease: 'none', stagger: { each: 0.02, from: 'start' as const },
            scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 60%', scrub: true },
          })
        })
      }

      function genericReveals() {
        document.querySelectorAll('[data-reveal]').forEach((el) => {
          gsap.fromTo(el, { opacity: 0, yPercent: 8, filter: 'blur(20px)' }, {
            opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })
        })
        document.querySelectorAll('[data-card-stagger]').forEach((container) => {
          const items = container.querySelectorAll('[data-card]')
          gsap.fromTo(items, { opacity: 0, scale: 0.95, y: 30 }, {
            opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: container, start: 'top 80%' },
          })
        })
      }

      function parallaxImages() {
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const speed = parseFloat((el as HTMLElement).dataset.parallax ?? '0.2') || 0.2
          gsap.to(el, { yPercent: speed * 100, ease: 'none', scrollTrigger: {
            trigger: (el as HTMLElement).closest('[data-parallax-trigger]') || el.parentElement,
            start: 'top bottom', end: 'bottom top', scrub: true,
          }})
        })
      }

      function marquees() {
        document.querySelectorAll('.marquee').forEach((m) => {
          const track = m.querySelector<HTMLElement>('.marquee-track')
          if (!track) return
          track.innerHTML += track.innerHTML
          const w = track.scrollWidth / 2
          gsap.set(track, { x: 0 })
          const speed = parseFloat((m as HTMLElement).dataset.speed ?? '60') || 60
          gsap.to(track, { x: -w, duration: w / speed, ease: 'none', repeat: -1 })
          const bias = gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3.out' })
          ScrollTrigger.create({
            trigger: m, start: 'top bottom', end: 'bottom top',
            onUpdate: (st) => bias(gsap.utils.clamp(-8, 8, st.getVelocity() / 200)),
          })
        })
      }

      function terrasseScroll() {
        const t = document.querySelector('.terrasse')
        if (!t) return
        const bg = t.querySelector('.terrasse-bg')
        if (bg) gsap.to(bg, { yPercent: 22, scale: 1.12, ease: 'none', scrollTrigger: { trigger: t, start: 'top bottom', end: 'bottom top', scrub: true } })
      }

      function finalCtaScroll() {
        const fc = document.querySelector('.final-cta')
        if (!fc) return
        const headline = fc.querySelector('.final-cta-headline h2')
        if (headline) {
          const words = splitWords(headline)
          gsap.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 1.0, stagger: 0.08, ease: 'power4.out', scrollTrigger: { trigger: fc, start: 'top 65%' } })
        }
        const bg = fc.querySelector('.final-cta-bg')
        if (bg) gsap.to(bg, { yPercent: 18, scale: 1.1, ease: 'none', scrollTrigger: { trigger: fc, start: 'top bottom', end: 'bottom top', scrub: true } })
      }

      function initHorizontalScrolling() {
        const mm = gsap.matchMedia()
        mm.add('(min-width:768px)', () => {
          const outers = document.querySelectorAll<HTMLElement>('[data-horizontal-scroll-outer]')
          if (!outers.length) return
          const ctx = gsap.context(() => {
            outers.forEach((outer) => {
              const panels = gsap.utils.toArray<HTMLElement>('[data-horizontal-scroll-panel]', outer)
              if (panels.length < 2) return
              const setOuterHeight = () => {
                outer.style.height = `${window.innerHeight + (panels.length - 1) * window.innerWidth}px`
              }
              setOuterHeight()
              gsap.to(panels, {
                x: () => -((panels.length - 1) * window.innerWidth),
                ease: 'none',
                scrollTrigger: {
                  trigger: outer,
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: true,
                  invalidateOnRefresh: true,
                  onRefresh: setOuterHeight,
                },
              })
            })
          })
          return () => {
            ctx.revert()
            outers.forEach((o) => { o.style.height = '' })
          }
        })
      }

      function testimonialsTicker() {
        const track = document.querySelector<HTMLElement>('.testi-track')
        if (!track) return
        track.innerHTML += track.innerHTML
        const items = track.children
        let half = 0
        Array.from(items).slice(0, items.length / 2).forEach((it) => {
          half += (it as HTMLElement).offsetWidth + 24
        })
        gsap.set(track, { x: 0 })
        gsap.to(track, { x: -half, duration: half / 40, ease: 'none', repeat: -1 })
      }

      function vinylSpin() {
        const v = document.querySelector('.playlist-vinyl')
        if (!v) return
        gsap.to(v, { rotation: 360, duration: 14, repeat: -1, ease: 'none' })
      }

      function initCursorMarquee() {
        const cursorEl = document.querySelector<HTMLElement>('[data-cursor-marquee-status]')
        if (!cursorEl) return
        const cursor = cursorEl
        const targets = cursor.querySelectorAll<HTMLElement>('[data-cursor-marquee-text-target]')
        const xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3' })
        const yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3' })
        let pauseTimeout: ReturnType<typeof setTimeout> | null = null
        let activeEl: Element | null = null
        let lastX = 0; let lastY = 0
        function playFor(el: Element) {
          if (pauseTimeout) clearTimeout(pauseTimeout)
          const text = (el as HTMLElement).dataset.cursorMarqueeText ?? ''
          const sec = (text.length || 1) / 5
          targets.forEach(t => { t.textContent = text; t.style.animationPlayState = 'running'; t.style.animationDuration = sec + 's' })
          cursor.setAttribute('data-cursor-marquee-status', 'active')
          activeEl = el
        }
        function pauseLater() {
          cursor.setAttribute('data-cursor-marquee-status', 'not-active')
          if (pauseTimeout) clearTimeout(pauseTimeout)
          pauseTimeout = setTimeout(() => { targets.forEach(t => { t.style.animationPlayState = 'paused' }) }, 400)
          activeEl = null
        }
        function checkTarget() {
          const el = document.elementFromPoint(lastX, lastY)
          const hit = el?.closest('[data-cursor-marquee-text]') ?? null
          if (hit !== activeEl) {
            if (activeEl) pauseLater()
            if (hit) playFor(hit)
          }
        }
        window.addEventListener('pointermove', e => { lastX = e.clientX; lastY = e.clientY; xTo(lastX); yTo(lastY); checkTarget() }, { passive: true })
        window.addEventListener('scroll', () => { xTo(lastX); yTo(lastY); checkTarget() }, { passive: true })
        setTimeout(() => cursor.setAttribute('data-cursor-marquee-status', 'not-active'), 500)
      }

      // Run immediately (no preloader dependency)
      vinylSpin()
      testimonialsTicker()
      initCursorMarquee()

      // Run after preloader completes
      function runScrollAnimations() {
        heroScroll()
        wordsPullUp()
        animatedParagraphs()
        genericReveals()
        parallaxImages()
        marquees()
        finalCtaScroll()
        initHorizontalScrolling()
        ScrollTrigger.refresh()
      }

      window.addEventListener('preloader-done', runScrollAnimations, { once: true })

      // Fallback: if preloader already ran or doesn't exist, run immediately after a tick
      const preloader = document.querySelector('.preloader')
      if (!preloader) {
        setTimeout(runScrollAnimations, 100)
      }
    }

    init()
    return () => { mounted = false }
  }, [])

  return null
}
