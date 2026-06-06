import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import { brand } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Mentions légales · ${brand.identity.name}`,
  description: `Mentions légales et informations éditeur du site ${brand.identity.name}.`,
}

export default function MentionsLegalesPage() {
  const name = brand.identity.name
  const address = brand.contact.address ?? ''
  const phone = brand.contact.phone ?? ''
  const email = brand.contact.email ?? ''

  return (
    <>
      <main className="page legal-page">
        <div className="max">
          <div className="legal-head">
            <p className="eyebrow" style={{ marginTop: 18 }}>Informations légales</p>
            <h1 className="display" style={{ marginTop: 16 }}>
              Mentions&nbsp;<span className="ital">légales.</span>
            </h1>
          </div>

          <section className="legal-section">
            <h2 className="legal-h2">Éditeur du site</h2>
            <p className="legal-p">
              {name}<br />
              {address}<br />
              {phone && <>Téléphone&nbsp;: {phone}<br /></>}
              {email && <>Courriel&nbsp;: {email}<br /></>}
              SIRET&nbsp;: <em>[à compléter]</em><br />
              RCS&nbsp;: <em>[à compléter]</em><br />
              Directeur de la publication&nbsp;: <em>[à compléter]</em>
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-h2">Hébergement</h2>
            <p className="legal-p">
              Le site est hébergé par&nbsp;:<br />
              <strong>Vercel Inc.</strong> — 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis<br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-h2">Propriété intellectuelle</h2>
            <p className="legal-p">
              L&apos;ensemble des éléments présents sur ce site (textes, photographies, logos, marques, structure) est la propriété exclusive de {name} ou de ses partenaires. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable, est interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
            </p>
            <p className="legal-p">
              Conception et développement&nbsp;: <a href="https://softbird.fr" target="_blank" rel="noopener noreferrer">Softbird</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-h2">Données personnelles</h2>
            <p className="legal-p">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi «&nbsp;Informatique et Libertés&nbsp;», vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité des données personnelles vous concernant.
            </p>
            <p className="legal-p">
              Les données collectées via les formulaires (privatisation, candidature) sont uniquement utilisées pour répondre à votre demande et ne sont pas transmises à des tiers. Elles sont conservées pendant la durée nécessaire au traitement.
            </p>
            <p className="legal-p">
              Pour toute demande, contactez-nous à&nbsp;: {email && <a href={`mailto:${email}`}>{email}</a>}
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-h2">Cookies</h2>
            <p className="legal-p">
              Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie de mesure d&apos;audience, de personnalisation ou de publicité n&apos;est déposé sans votre consentement.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="legal-h2">Contact</h2>
            <p className="legal-p">
              Pour toute question relative au présent site, vous pouvez nous contacter&nbsp;:<br />
              {email && <>Par courriel&nbsp;: <a href={`mailto:${email}`}>{email}</a><br /></>}
              {phone && <>Par téléphone&nbsp;: {phone}<br /></>}
              {address && <>Par courrier&nbsp;: {address}</>}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
