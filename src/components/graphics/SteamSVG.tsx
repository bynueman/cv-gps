/**
 * Warm rising steam / aroma curves for the beverage side of the hero.
 * Each path carries the class "steam-path" so GSAP can draw and float
 * them; they render as static curves when motion is reduced.
 */
export function SteamSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" aria-hidden="true" fill="none" className={className}>
      <path
        className="steam-path"
        d="M40 132 C28 108 52 96 40 72 C30 52 48 40 44 20"
        stroke="#C06B2D"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        className="steam-path"
        d="M64 136 C54 114 76 100 66 78 C58 60 74 48 70 30"
        stroke="#D98E23"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        className="steam-path"
        d="M88 130 C80 112 98 98 88 78 C80 62 94 52 90 36"
        stroke="#8A4A26"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
