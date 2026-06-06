// Sesta "The Wines" — slice 04.
// Two columns split by a vertical hairline. Each column = pager count
// ("01 / 02"), big italic name ("The Terroir Line"), body, pager strip.

type WineLine = {
  id: string
  count: string
  name: { italic: string; roman: string }
  body: string
  paging: { current: number; total: number }
}

const LINES: WineLine[] = [
  {
    id: 'terroir',
    count: '01 / 02',
    name: { italic: 'The', roman: 'Terroir Line' },
    body:
      'Minerality, profundity, and structure characterise the three wines of the Terroir line. Intense aromas of black-red berries dominate the bouquet.',
    paging: { current: 1, total: 3 },
  },
  {
    id: 'talvi',
    count: '02 / 02',
    name: { italic: 'The', roman: 'Talvi Line' },
    body:
      'Aromatic, fresh, and elegantly structured, the Talvi line carries the sun-soaked finesse of the Mediterranean into the glass.',
    paging: { current: 1, total: 3 },
  },
]

export default function WineLinesSection() {
  return (
    <section className="sesta-wines" id="wines">
      <div className="sesta-wines__inner">
        {LINES.map((line) => (
          <div key={line.id} className="sesta-wines__col">
            <p className="sesta-eyebrow">The wines</p>
            <h3 className="sesta-wines__count">
              <span className="num">{line.count.split('/')[0].trim()}</span>
              {' / '}
              <span className="num">{line.count.split('/')[1].trim()}</span>
            </h3>
            <h2 className="sesta-wines__title">
              {line.name.italic} <span className="roman">{line.name.roman}</span>
            </h2>
            <p className="sesta-wines__body">{line.body}</p>

            <div className="sesta-wines__pager">
              {Array.from({ length: line.paging.total }).map((_, i) => (
                <span key={i} className={i + 1 === line.paging.current ? 'is-active' : ''} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
