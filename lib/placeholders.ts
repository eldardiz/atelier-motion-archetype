/**
 * Stock photos for the Sesta Laioles archetype template.
 * Vibe: warm Mediterranean / golden-hour vineyard / Mallorca finca / oak barrel.
 * Source: Pexels (CC0, no attribution required).
 *
 * Per-lead workflow: replace these URLs with `/images/...` local files when
 * the lead's photo folder is ready. The Atelier archetype expects 9 distinct
 * image slots across the homepage.
 */

const pex = (id: string, w = 1800, q = 80) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&fit=crop&w=${w}&q=${q}`

export const PHOTOS = {
  // Hero — full-bleed Tuscan vineyard at golden hour
  hero: pex('14515698', 2400),

  // Finca intro — small square (Sicily vineyard hillside)
  fincaSm: pex('36338455', 900),
  // Finca intro — wide (Mallorca / Sóller stone finca against Tramuntana)
  fincaWide: pex('33189514', 1800),

  // Image strip — 3 photos (vineyard detail, harvest hands, grape bin)
  strip1: pex('6492359', 900),
  strip2: pex('10923023', 1800),
  strip3: pex('32618106', 900),

  // Terroir — full-bleed sunset vineyard rows (Alsace golden hour)
  terroir: pex('18248851', 2400),

  // Bodega — oak barrels in stone cellar
  bodega: pex('16068126', 1600),

  // Winemaker quote — wine pour into glass (intimate, premium)
  winemaker: pex('29436323', 1400),
} as const
