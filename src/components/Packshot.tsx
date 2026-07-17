import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Image slot for product photography. While `src` is null (no real
 * packshot yet) it renders the SVG placeholder passed as children;
 * once a path is set in src/lib/content.ts it switches to next/image.
 *
 * `fit="contain"` suits transparent cutouts; `fit="cover"` suits the
 * opaque studio shots (1086×1448, warm cream backdrop) that fill a
 * rounded frame edge-to-edge.
 */
export function Packshot({
  src,
  alt,
  className,
  imgClassName,
  fit = "contain",
  sizes = "(min-width: 1024px) 20rem, 60vw",
  children,
}: {
  src: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  fit?: "contain" | "cover";
  sizes?: string;
  children: ReactNode;
}) {
  if (src) {
    return (
      <div className={`relative ${className ?? ""}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`${fit === "cover" ? "object-cover" : "object-contain"} ${imgClassName ?? ""}`}
        />
      </div>
    );
  }
  return <div className={className}>{children}</div>;
}
