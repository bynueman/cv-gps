import { Hero } from "@/components/sections/Hero";
import { CompanyIntro } from "@/components/sections/CompanyIntro";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ProductFamilies } from "@/components/sections/ProductFamilies";
import { ExportPreview } from "@/components/sections/ExportPreview";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanyIntro />
      <FeaturedProducts />
      <ProductFamilies />
      <ExportPreview />
      <NewsPreview />
      <ContactCTA />
    </>
  );
}
