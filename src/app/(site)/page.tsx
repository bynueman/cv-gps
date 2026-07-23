import { Hero } from "@/components/sections/Hero";
import { CompanyIntro } from "@/components/sections/CompanyIntro";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ProductFamilies } from "@/components/sections/ProductFamilies";
import { ExportPreview } from "@/components/sections/ExportPreview";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getFeaturedArticles, articleCardFromDb } from "@/lib/articles";

/**
 * Homepage sections now share the site-wide typography (loaded once in
 * the root layout) — no more homepage-scoped font loading here. The
 * `home*` color tokens (tailwind.config.ts) stay homepage-only.
 *
 * Featured articles come from the DB (src/lib/articles.ts), but this
 * page stays statically generated like the rest of the site — the
 * admin CRUD routes call revalidatePath("/") on every save/delete, so
 * the cached HTML here is regenerated on demand instead of on a timer
 * or on every request.
 */
export default async function HomePage() {
  const featured = await getFeaturedArticles();
  const articles = featured.map(articleCardFromDb);

  return (
    <div className="relative overflow-x-clip bg-homeBg text-homeInk">
      <Hero />
      <CompanyIntro />
      <FeaturedProducts />
      <ProductFamilies />
      <ExportPreview />
      <NewsPreview articles={articles} />
      <ContactCTA />
    </div>
  );
}
