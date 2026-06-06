'use client'

import { useEffect, useState } from 'react'
import { brand } from '@/lib/brand'

/**
 * Bold Full Screen Navigation — adapted from Osmo Supply.
 * https://osmo.supply — markup, data-attributes, and class names preserved.
 *
 * What we ported into React:
 *  - `data-navigation-status` driven by component state instead of a global
 *    DOM toggle, so multiple navbar instances would each manage their own
 *    state correctly
 *  - ESC key to close, click anywhere on a link to close
 *  - Lenis stop/start hooked in so scroll is locked while the overlay is open
 *  - Body scroll lock as a fallback for browsers where Lenis isn't loaded yet
 *
 * Visual styling lives in styles/claude-design.css under the `.bold-nav-full`
 * block. Recolored to atelier-motion's dark/cream palette there.
 */

const NAV = [
  { label: 'Home', href: '#hero' },
  { label: 'Finca', href: '#finca' },
  { label: 'Wines', href: '#wines' },
  { label: 'Terroir', href: '#terroir' },
  { label: 'Visit', href: '#contact' },
] as const

declare global {
  interface Window {
    __lenis?: { stop: () => void; start: () => void }
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const name: string = brand.identity.name

  useEffect(() => {
    if (open) {
      window.__lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      window.__lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <nav
      data-navigation-status={open ? 'active' : 'not-active'}
      className="bold-nav-full"
      aria-label="Primary"
    >
      <div className="bold-nav-full__bar">
        <a href="#hero" className="bold-nav-full__logo" aria-label={name}>
          {name}
        </a>
        <button
          type="button"
          data-navigation-toggle="toggle"
          className="bold-nav-full__hamburger"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="bold-nav-full__hamburger-bar" />
          <div className="bold-nav-full__hamburger-bar" />
          <div className="bold-nav-full__hamburger-bar" />
        </button>
      </div>

      <div className="bold-nav-full__tile">
        <ul className="bold-nav-full__ul">
          {NAV.map((item, i) => (
            <li key={item.label} className="bold-nav-full__li">
              <a
                href={item.href}
                className={`bold-nav-full__link${i === 0 ? ' is--current' : ''}`}
                onClick={() => setOpen(false)}
              >
                <span className="bold-nav-full__link-text">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="bold-nav__bottom">
          <p className="bold-nav__word">Sesta Ses Talaioles</p>
          <p className="bold-nav__word">hello@sestalaioles.com</p>
        </div>
      </div>
    </nav>
  )
}
