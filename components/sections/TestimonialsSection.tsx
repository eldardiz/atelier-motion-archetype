'use client'

import Image from 'next/image'
import { CSSProperties, useEffect, useRef, useState } from 'react'

// Sesta testimonials — Cascaid-style layered Polaroid card collage.
//
// 6 visitor portrait cards arranged across a single row with subtle fixed
// rotations (Polaroid scatter). One card is "active" at any moment —
// scaled up, gets a dark gradient overlay + visitor detail block.
// Active card cycles every 5s via setInterval; pauses on hover-over the deck.

type Testimonial = {
  name: string
  age: number
  origin: string
  photo: string // Pexels portrait URL
  quote: string
  highlight: string // e.g. "Stayed 3 nights"
  picks: string[] // 2-3 tasted wines
}

const pex = (id: string, w = 800, q = 78) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&fit=crop&w=${w}&q=${q}`

const CARDS: Testimonial[] = [
  {
    name: 'Léa',
    age: 34,
    origin: 'Paris',
    photo: pex('1239288'),
    quote: 'I came for the wines, stayed for the silence between them.',
    highlight: 'Stayed three nights',
    picks: ['Terroir Line · Talvi', 'Manto Negro 2022'],
  },
  {
    name: 'Marcus',
    age: 58,
    origin: 'Berlin',
    photo: pex('1212984'),
    quote: 'The Tramuntana mountains read like a wine list of weather.',
    highlight: 'Returning guest',
    picks: ['Garnatxa · Vino di Vela'],
  },
  {
    name: 'Imane',
    age: 41,
    origin: 'Marrakech',
    photo: pex('1181686'),
    quote: 'A bodega that knows when to stop talking. Rare.',
    highlight: 'First visit, 2024',
    picks: ['Talvi Coastal White', 'Callet 2021'],
  },
  {
    name: 'Tomás',
    age: 67,
    origin: 'Buenos Aires',
    photo: pex('2379004'),
    quote: 'The light at Ses Talaioles will haunt every glass I pour at home.',
    highlight: 'Sommelier',
    picks: ['Terroir Reserve · Vintage 2018'],
  },
  {
    name: 'Yui',
    age: 29,
    origin: 'Kyoto',
    photo: pex('1681010'),
    quote: 'Wines that remember the sea air. I have never tasted that before.',
    highlight: 'Photographer-in-residence',
    picks: ['Talvi · Coastal White'],
  },
  {
    name: 'Adel',
    age: 47,
    origin: 'Beirut',
    photo: pex('1043471'),
    quote: 'I arrived skeptical. I left with a case in my trunk.',
    highlight: 'Importer',
    picks: ['Manto Negro 2022', 'Garnatxa Reserve'],
  },
]

// Fixed, hand-picked tilts so the scatter doesn't shift on hydration.
const TILTS = ['-4deg', '3deg', '-2.5deg', '4deg', '-3.5deg', '2.5deg']

const CYCLE_MS = 5000

export default function TestimonialsSection() {
  const [active, setActive] = useState(2)
  const [paused, setPaused] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (paused) return
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % CARDS.length)
    }, CYCLE_MS)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [paused])

  return (
    <section
      className="sesta-testi"
      id="testimonials"
      data-parallax-trigger
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="sesta-testi__head">
        <p className="sesta-eyebrow" data-reveal>Reflections from the bodega</p>
        <h2 className="sesta-testi__display" data-words-pullup>
          From those <span className="stress">who tasted</span>
        </h2>
        <p className="sesta-testi__sub" data-reveal>
          Six recent guests, six private chapters of the same finca.
        </p>
      </div>

      <ol className="sesta-testi__deck" data-card-stagger>
        {CARDS.map((c, i) => {
          const isActive = i === active
          return (
            <li
              key={c.name}
              className={`sesta-testi__card${isActive ? ' is-active' : ''}`}
              data-card
              style={{ '--tilt': TILTS[i] } as CSSProperties}
              onClick={() => setActive(i)}
              aria-label={`${c.name}, ${c.age}, ${c.origin}`}
            >
              <Image
                src={c.photo}
                alt={`${c.name}, ${c.age}, ${c.origin}`}
                fill
                sizes="(max-width: 900px) 80vw, 18vw"
                className="object-cover"
              />
              <div className="sesta-testi__corner">
                {c.name}, {c.age}
              </div>
              <div className="sesta-testi__active-pane" aria-hidden={!isActive}>
                <h3 className="goals">
                  reflection <span>//</span>
                </h3>
                <p className="quote">&ldquo;{c.quote}&rdquo;</p>
                <p className="label">highlight</p>
                <p className="caption">{c.highlight}</p>
                <p className="label">tasted</p>
                <ul>
                  {c.picks.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
