import Image from 'next/image'
import { PHOTOS } from '@/lib/placeholders'

// Sesta "The Bodega / Tradition meets innovation" — slice 06.
// Split: left text (eyebrow + display + body + button), right wine-cellar photo.

export default function BodegaSection() {
  return (
    <section className="sesta-bodega" id="bodega" data-parallax-trigger>
      <div className="sesta-bodega__inner">
        <div className="sesta-bodega__text">
          <p className="sesta-eyebrow" data-reveal>The Bodega</p>
          <h2 className="sesta-bodega__display" data-words-pullup>
            Tradition meets<br />innovation
          </h2>
          <p className="sesta-bodega__body" data-anim-para>
            The development of the grapes&apos; very own aroma is of utmost importance at Ses
            Talaioles. Precise craftsmanship and the latest innovative techniques produce the
            highest quality.
          </p>
          <a href="#contact" className="sesta-btn" style={{ alignSelf: 'flex-start' }} data-reveal>
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
            data-parallax="0.18"
          />
        </div>
      </div>
    </section>
  )
}
