"use client";

import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { kuicipProducts } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { MotionBackdrop } from "@/components/MotionBackdrop";

/** Kuicip category page: full 8-flavor catalog with playful accents. */
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

      <section ref={scope} className="relative overflow-hidden pb-20 lg:pb-28">
        <MotionBackdrop variant="kuicip" />
        <div className="container-page relative">
          <h2 data-reveal className="font-display text-2xl font-semibold">
            {t.kuicipPage.catalogTitle}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
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
