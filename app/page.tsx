import MotionHeroSection from '@/components/sections/MotionHeroSection'
import FincaIntroSection from '@/components/sections/FincaIntroSection'
import ImageStripSection from '@/components/sections/ImageStripSection'
import OwnerQuoteSection from '@/components/sections/OwnerQuoteSection'
import DiscoverWinesSection from '@/components/sections/DiscoverWinesSection'
import WineLinesSection from '@/components/sections/WineLinesSection'
import PlaylistSection from '@/components/sections/PlaylistSection'
import TerroirSection from '@/components/sections/TerroirSection'
import BodegaSection from '@/components/sections/BodegaSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import WinemakerQuoteSection from '@/components/sections/WinemakerQuoteSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import Footer from '@/components/layout/Footer'

// Sesta Laioles homepage flow:
//   Hero → Finca intro → Image strip → Owner quote → Discover wines →
//   Wine lines (Terroir + Talvi) → Playlist (forest) → Terroir manifesto
//   (full-bleed) → Bodega split → Testimonials (Polaroid spread) →
//   Winemaker quote → Newsletter → Footer

export default function HomePage() {
  return (
    <main className="page">
      <MotionHeroSection />
      <FincaIntroSection />
      <ImageStripSection />
      <OwnerQuoteSection />
      <DiscoverWinesSection />
      <WineLinesSection />
      <PlaylistSection />
      <TerroirSection />
      <BodegaSection />
      <TestimonialsSection />
      <WinemakerQuoteSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
