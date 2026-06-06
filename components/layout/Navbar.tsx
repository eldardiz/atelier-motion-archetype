'use client'

import { useEffect, useState } from 'react'
import { brand } from '@/lib/brand'

const NAV = [
  { label: 'Finca', href: '#finca' },
  { label: 'Wine', href: '#wines' },
  { label: 'Terroir', href: '#terroir' },
  { label: 'Bodega', href: '#bodega' },
  { label: 'Tours', href: '#contact' },
] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const name: string = brand.identity.name
  const monogram = (name?.[0] ?? 'S').toUpperCase()

  return (
    <>
      <header className={`sesta-nav${scrolled ? ' is-scrolled' : ''}`}>
        <a href="#hero" className="sesta-nav__brand" aria-label={name}>
          <span className="mark">{monogram}</span>
          <span>{name}</span>
        </a>

        <nav className="sesta-nav__links" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.label} href={item.href} className="sesta-nav__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="sesta-nav__right">
          <span className="sesta-nav__lang">
            <span className="is-active">EN</span>
            <span className="sep">/</span>
            <span>DE</span>
            <span className="sep">/</span>
            <span>ES</span>
          </span>
          <button type="button" className="sesta-nav__icon" aria-label="Account">
            ◯
          </button>
          <button type="button" className="sesta-nav__icon" aria-label="Cart">
            ⌂
          </button>
          <button
            type="button"
            className="sesta-nav__toggle"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <div className={`sesta-mobile-sheet${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <ul>
          {NAV.map((item) => (
            <li key={item.label}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
