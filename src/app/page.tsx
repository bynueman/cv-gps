import { Instrument_Serif, Manrope } from "next/font/google";
import { Hero } from "@/components/sections/Hero";
import { CompanyIntro } from "@/components/sections/CompanyIntro";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ProductFamilies } from "@/components/sections/ProductFamilies";
import { ExportPreview } from "@/components/sections/ExportPreview";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

/**
 * Homepage-only typography (Claude Design import). Loaded here rather
 * than the root layout so it never touches any other page — the two
 * CSS vars are only readable inside the wrapping div below, which is
 * the only place `font-homeDisplay`/`font-homeSans` (tailwind.config.ts)
 * get used.
 */
const homeDisplay = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
