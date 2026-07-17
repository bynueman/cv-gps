import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Image slot for product photography. While `src` is null (no real
 * packshot yet) it renders the SVG placeholder passed as children;
 * once a path is set in src/lib/content.ts it switches to next/image
 * with object-contain, so transparent PNG packshots sit cleanly on
 * any background.
 */
export function Packshot({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 20rem, 60vw",
  children,
}: {
  src: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  children: ReactNode;
}) {
  if (src) {
    return (
      <div className={`relative ${className ?? ""}`}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" />
      </div>
    );
  }
  return <div className={className}>{children}</div>;
}
