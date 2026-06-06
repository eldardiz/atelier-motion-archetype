import { brand } from '@/lib/brand'

// Sesta footer — slice 08 bottom.
// Three text columns (Press/Legal links + Contact + socials) and a monogram on the right.

const LEGAL = ['Press', 'Terms & Conditions', 'Privacy Policy', 'Imprint'] as const

export default function Footer() {
  const name: string = brand.identity.name
  const email: string = brand.contact.email || 'info@example.com'
  const monogram = (name?.[0] ?? 'S').toUpperCase() + (name?.[1] ?? 'T').toUpperCase()
  const year = 2026

  return (
    <footer className="sesta-footer">
      <div className="sesta-footer__inner">
        <div className="sesta-footer__col">
          {LEGAL.map((l) => (
            <a key={l} href="#">
              {l}
            </a>
          ))}
        </div>

        <div className="sesta-footer__col">
          <p className="sesta-footer__heading">Contact</p>
          <a href={`mailto:${email}`}>{email}</a>
          <div className="sesta-footer__socials">
            <a href={brand.social.instagramUrl || '#'} aria-label="Instagram">
              IG
            </a>
            <a href={brand.social.facebook || '#'} aria-label="Facebook">
              FB
            </a>
          </div>
        </div>

        <div className="sesta-footer__col">
          {/* spacer / future address column */}
        </div>

        <div className="sesta-footer__mono" aria-hidden="true">
          {monogram}
        </div>

        <p className="sesta-footer__copyright">© {year} {name}</p>
      </div>
    </footer>
  )
}
