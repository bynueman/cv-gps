import type { Product } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import { Packshot } from "@/components/Packshot";
import { PouchSVG } from "@/components/graphics/PouchSVG";
import { BottleSVG } from "@/components/graphics/BottleSVG";
import { SachetSVG } from "@/components/graphics/SachetSVG";

/**
 * Picks the right placeholder packshot for a product (pouch for Kuicip,
 * bottle for Putri Teko RTD, sachet for brew packs) — or the real photo
 * once `product.image` is set in src/lib/content.ts.
 */
export function ProductPackshot({
  product,
  lang,
  className,
}: {
  product: Product;
  lang: Lang;
  className?: string;
}) {
  const alt =
    product.brand === "kuicip" ? `Kuicip ${product.name[lang]}` : `Putri Teko ${product.name[lang]}`;

  const aspect =
    product.brand === "kuicip"
      ? "aspect-[200/260]"
      : product.group === "brew"
        ? "aspect-[200/240]"
        : "aspect-[120/300]";

  return (
    <Packshot src={product.image} alt={alt} className={`${aspect} ${className ?? ""}`}>
      {product.brand === "kuicip" ? (
        <PouchSVG
          color={product.color}
          colorDark={product.colorDark}
          flavor={product.name[lang]}
          className="h-full w-full"
        />
      ) : product.group === "brew" ? (
        <SachetSVG label="Putri Teko" product={product.name[lang]} color={product.color} className="h-full w-full" />
      ) : (
        <BottleSVG label="Putri Teko" product={product.name[lang]} liquid={product.color} className="h-full w-full" />
      )}
    </Packshot>
  );
}
