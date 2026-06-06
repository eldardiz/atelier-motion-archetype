import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import AnimationInit from "@/components/providers/AnimationInit";
import Navbar from "@/components/layout/Navbar";
import { brand } from "@/lib/brand";

// Atelier (Sesta Laioles reference). Two free Google Fonts:
// - Cormorant Garamond — high-contrast elegant serif with characterful italic.
//   Used for ALL display headlines (italic for most, roman for the small
//   "Terroir Line" / "Talvi Line" labels). Captures Sesta's signature look.
// - Inter — clean sans, used for body, eyebrow labels, nav, and buttons.

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const LOCALE_OG_MAP: Record<typeof brand.identity.locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  de: "de_DE",
  es: "es_ES",
  it: "it_IT",
};

export const metadata: Metadata = {
  title: brand.identity.tagline
    ? `${brand.identity.name} · ${brand.identity.tagline}`
    : brand.identity.name,
  description: brand.identity.description,
  openGraph: {
    title: brand.identity.name,
    description: brand.identity.tagline,
    locale: LOCALE_OG_MAP[brand.identity.locale],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={brand.identity.locale}
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <LenisProvider>
          <Navbar />
          <AnimationInit />
          <div data-main style={{ position: "relative", zIndex: 2 }}>
            {children}
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
