"use client";

import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { kuicipProducts } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";

/** Kuicip category page: full 8-flavor catalog. */
export function KuicipCatalog() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  return (
    <>
      <PageHeader
        kicker={t.kuicipPage.kicker}
        title={t.kuicipPage.title}
        lede={t.kuicipPage.subtitle}
        variant="kuicip"
        deps={[lang]}
      />

      <section ref={scope} className="pb-20 lg:pb-28">
        <div className="container-page">
          <h2 data-reveal className="font-display text-2xl font-semibold">
            {t.kuicipPage.catalogTitle}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {kuicipProducts.map((p) => (
              <li key={p.slug} data-reveal>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
