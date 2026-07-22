import { Hero } from "@/components/sections/Hero";
import { CompanyIntro } from "@/components/sections/CompanyIntro";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ProductFamilies } from "@/components/sections/ProductFamilies";
import { ExportPreview } from "@/components/sections/ExportPreview";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

/**
 * Homepage sections now share the site-wide typography (loaded once in
 * the root layout) — no more homepage-scoped font loading here. The
 * `home*` color tokens (tailwind.config.ts) stay homepage-only.
 */
export default function HomePage() {
  return (
    <div className="relative overflow-x-clip bg-homeBg text-homeInk">
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
