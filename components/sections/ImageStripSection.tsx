import Image from 'next/image'
import { PHOTOS } from '@/lib/placeholders'

// Sesta image strip — slice 02 top half.
// 3 staggered photos: stone wall texture (small), people group (wide), grape clusters (small).

export default function ImageStripSection() {
  return (
    <section className="sesta-strip" aria-hidden="true">
      <div className="sesta-strip__grid">
        <div className="sesta-strip__cell sesta-strip__cell--1">
          <Image src={PHOTOS.strip1} alt="" fill sizes="220px" className="object-cover" />
        </div>
        <div className="sesta-strip__cell sesta-strip__cell--2">
          <Image src={PHOTOS.strip2} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" className="object-cover" />
        </div>
        <div className="sesta-strip__cell sesta-strip__cell--3">
          <Image src={PHOTOS.strip3} alt="" fill sizes="320px" className="object-cover" />
        </div>
      </div>
    </section>
  )
}
