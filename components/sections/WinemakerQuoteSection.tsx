import Image from 'next/image'
import { PHOTOS } from '@/lib/placeholders'

// Sesta winemaker quote — slice 07.
// Left: harvest photo. Right: italic pull quote + attribution.

export default function WinemakerQuoteSection() {
  return (
    <section className="sesta-wm-quote">
      <div className="sesta-wm-quote__inner">
        <div className="sesta-wm-quote__photo" aria-hidden="true">
          <Image
            src={PHOTOS.winemaker}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <blockquote className="sesta-wm-quote__body">
          &ldquo;We give the wines the time they need to unfold their very own characteristics.&rdquo;
          <footer className="sesta-quote__attribution">
            <span className="name">Federico Zaina</span>
            Winemaker · Finca Ses Talaioles
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
