/**
 * A single stylized cassava chip. Several of these are scattered in the
 * hero and animated by GSAP as if emerging from an opened ziplock pouch.
 */
export function ChipSVG({
  color = "#E8B44A",
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 60 52" aria-hidden="true" className={className}>
      <path
        d="M6 30 C2 16 14 4 30 4 c16 0 28 10 24 26 c-3 13 -14 20 -26 18 C15 46 9 40 6 30 Z"
        fill={color}
      />
      <path
        d="M14 28 c-2 -9 6 -16 16 -16 c10 0 18 6 15 16 c-2 8 -9 12 -17 11 c-8 -1 -12 -5 -14 -11 Z"
        fill="#fff"
        opacity="0.22"
      />
      <circle cx="22" cy="20" r="1.6" fill="#9C6508" opacity="0.5" />
      <circle cx="38" cy="30" r="1.6" fill="#9C6508" opacity="0.5" />
      <circle cx="28" cy="36" r="1.4" fill="#9C6508" opacity="0.4" />
    </svg>
  );
}
