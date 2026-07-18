import { Baloo_2, Manrope } from "next/font/google";
import { Hero } from "@/components/sections/Hero";
import { CompanyIntro } from "@/components/sections/CompanyIntro";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ProductFamilies } from "@/components/sections/ProductFamilies";
import { ExportPreview } from "@/components/sections/ExportPreview";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

/**
 * Homepage-only typography. Loaded here rather than the root layout so
 * it never touches any other page — the two CSS vars are only
 * readable inside the wrapping div below, which is the only place
 * `font-homeDisplay`/`font-homeSans` (tailwind.config.ts) get used.
 *
 * Baloo 2 (bold, rounded, energetic) replaces the original Claude
 * Design mockup's Instrument Serif — it reads as editorial/formal,
 * which clashes with Kuicip's actual social/packaging voice (bold
 * chunky comic-style lettering). Baloo 2 is the closest Google Font
 * to that energy that still stays legible at heading length.
 */
const homeDisplay = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-home-display",
});

const homeSans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-home-sans",
});

export default function HomePage() {
  return (
    <div
      className={`${homeDisplay.variable} ${homeSans.variable} relative overflow-x-clip bg-homeBg font-homeSans text-homeInk`}
    >
      <Hero />
      <CompanyIntro />
      <FeaturedProducts />
      <ProductFamilies />
      <ExportPreview />
      <NewsPreview />
      <ContactCTA />
    </div>
  );
}
