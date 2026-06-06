import Image from 'next/image'
import { PHOTOS } from '@/lib/placeholders'

// Sesta "The Finca" — slice 01.
// Two-column head (left: eyebrow + display headline / right: body + button)
// Two photos below: small square stone-wall texture (left) + wide vineyard (right)

export default function FincaIntroSection() {
  return (
    <section className="sesta-finca" id="finca">
      <div className="sesta-finca__head">
        <div className="sesta-finca__title">
          <p className="sesta-eyebrow">The Finca</p>
          <h2 className="sesta-finca__display">
            Reinventing a<br />historical place
          </h2>
        </div>
        <div className="sesta-finca__copy">
          <p className="sesta-finca__body">
            In the east of the island, in close proximity to the Mediterranean Sea, lies the finca,
            full of traditions, full of history. A magical place that is reflected in the taste of
            its wines.
          </p>
          <a href="#wines" className="sesta-btn">Discover more</a>
        </div>
      </div>

      <div className="sesta-finca__photos">
        <div className="sesta-finca__photo sesta-finca__photo--sm" aria-hidden="true">
          <Image src={PHOTOS.fincaSm} alt="" fill sizes="280px" className="object-cover" />
        </div>
        <div className="sesta-finca__photo" aria-hidden="true">
          <Image src={PHOTOS.fincaWide} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" className="object-cover" />
        </div>
      </div>
    </section>
  )
}
