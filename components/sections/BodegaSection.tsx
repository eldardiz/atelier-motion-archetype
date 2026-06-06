import Image from 'next/image'
import { PHOTOS } from '@/lib/placeholders'

// Sesta "The Bodega / Tradition meets innovation" — slice 06.
// Split: left text (eyebrow + display + body + button), right wine-cellar photo.

export default function BodegaSection() {
  return (
    <section className="sesta-bodega" id="bodega">
      <div className="sesta-bodega__inner">
        <div className="sesta-bodega__text">
          <p className="sesta-eyebrow">The Bodega</p>
          <h2 className="sesta-bodega__display">
            Tradition meets<br />innovation
          </h2>
          <p className="sesta-bodega__body">
            The development of the grapes&apos; very own aroma is of utmost importance at Ses
            Talaioles. Precise craftsmanship and the latest innovative techniques produce the
            highest quality.
          </p>
          <a href="#contact" className="sesta-btn" style={{ alignSelf: 'flex-start' }}>
            Discover more
          </a>
        </div>
        <div className="sesta-bodega__photo" aria-hidden="true">
          <Image
            src={PHOTOS.bodega}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
