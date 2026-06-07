// Sesta playlist — Passage Saint-Honoré style "On the bodega speakers".
//
// Off-grid asymmetric: copy + tracklist on the left, spinning vinyl on the
// right. The vinyl auto-spins via the `.playlist-vinyl` class which
// AnimationInit.tsx:208-212 binds to a 14s infinite GSAP rotation.

const TRACKS = [
  { num: '01', artist: 'Núria Graham', title: 'In the End' },
  { num: '02', artist: 'Joana Serrat', title: 'Lonesome Lady' },
  { num: '03', artist: 'Maria Rodés', title: 'Lluna' },
  { num: '04', artist: 'María José Llergo', title: 'Niña de las dunas' },
] as const

export default function PlaylistSection() {
  return (
    <section className="sesta-playlist" id="playlist">
      <div className="sesta-playlist__inner">
        <div className="sesta-playlist__copy">
          <p className="sesta-eyebrow" data-reveal>On the bodega speakers</p>
          <h2 className="sesta-playlist__display" data-words-pullup>
            Wines and songs <span className="stress">move</span> together
          </h2>
          <p className="sesta-playlist__body" data-reveal>
            The harvest sets its own tempo. These tracks accompany every pour in
            the tasting room from May through October.
          </p>
          <ol className="sesta-playlist__tracks" data-card-stagger>
            {TRACKS.map((t) => (
              <li key={t.num} className="sesta-playlist__track" data-card>
                <span className="num">{t.num}</span>
                <span className="meta">
                  <span className="artist">{t.artist}</span>
                  <span className="title">{t.title}</span>
                </span>
              </li>
            ))}
          </ol>
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="sesta-btn sesta-playlist__btn"
            data-reveal
          >
            Listen on Spotify
          </a>
        </div>

        <div className="sesta-playlist__visual" data-parallax-trigger aria-hidden="true">
          <div className="playlist-vinyl">
            <svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" role="presentation">
              {/* Record body */}
              <circle cx="240" cy="240" r="230" fill="#0a0a0a" />
              {/* Concentric grooves — give it the vinyl shimmer */}
              {Array.from({ length: 18 }).map((_, i) => (
                <circle
                  key={i}
                  cx="240"
                  cy="240"
                  r={70 + i * 8}
                  fill="none"
                  stroke="rgba(245, 240, 225, 0.05)"
                  strokeWidth="0.5"
                />
              ))}
              {/* Center label — cream with a hint of warmth */}
              <circle cx="240" cy="240" r="62" fill="#F5F0E1" />
              <circle
                cx="240"
                cy="240"
                r="62"
                fill="none"
                stroke="rgba(31, 58, 45, 0.18)"
                strokeWidth="1"
              />
              {/* Label text */}
              <text
                x="240"
                y="220"
                textAnchor="middle"
                fontFamily="serif"
                fontStyle="italic"
                fontSize="12"
                fill="#1F3A2D"
                letterSpacing="2"
              >
                SESTA
              </text>
              <text
                x="240"
                y="240"
                textAnchor="middle"
                fontFamily="serif"
                fontStyle="italic"
                fontSize="10"
                fill="#1F3A2D"
                letterSpacing="1.5"
              >
                Ses Talaioles
              </text>
              <text
                x="240"
                y="262"
                textAnchor="middle"
                fontFamily="sans-serif"
                fontSize="6"
                fill="rgba(31, 58, 45, 0.6)"
                letterSpacing="3"
              >
                MALLORCA
              </text>
              {/* Spindle hole */}
              <circle cx="240" cy="240" r="4" fill="#0a0a0a" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
