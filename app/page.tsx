import MotionHeroSection from '@/components/sections/MotionHeroSection'
import FincaIntroSection from '@/components/sections/FincaIntroSection'
import ImageStripSection from '@/components/sections/ImageStripSection'
import OwnerQuoteSection from '@/components/sections/OwnerQuoteSection'
import DiscoverWinesSection from '@/components/sections/DiscoverWinesSection'
import WineLinesSection from '@/components/sections/WineLinesSection'
import TerroirSection from '@/components/sections/TerroirSection'
import BodegaSection from '@/components/sections/BodegaSection'
import WinemakerQuoteSection from '@/components/sections/WinemakerQuoteSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import Footer from '@/components/layout/Footer'

// Sesta Laioles homepage flow:
//   Hero → Finca intro → Image strip → Owner quote → Discover wines →
//   Wine lines (Terroir + Talvi) → Terroir manifesto (full-bleed) →
//   Bodega split → Winemaker quote → Newsletter → Footer

export default function HomePage() {
  return (
    <main className="page">
      <MotionHeroSection />
      <FincaIntroSection />
      <ImageStripSection />
      <OwnerQuoteSection />
      <DiscoverWinesSection />
      <WineLinesSection />
      <TerroirSection />
      <BodegaSection />
      <WinemakerQuoteSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
