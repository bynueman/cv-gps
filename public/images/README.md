# Image assets

All product photos, logos, and group cutouts referenced by
`src/lib/content.ts` live here. Every current SKU points at a real
file; if a future SKU has no photo yet, leave its `image: null` and
the site falls back to SVG placeholder packshots.

## Current inventory

| Path | What it is | Used by |
| --- | --- | --- |
| `logo/gps.png` | corporate mark (red flower + blue "GPS"), transparent, 4000×2250 | Header, Footer (`logos.gps`) |
| `logo/kuicip.png` | Kuicip cartoon wordmark, transparent, 2560×1440 | Hero trust line, ProductsOverview, ProductFamilies |
| `logo/putriteko.png` | Putri Teko art-nouveau emblem, transparent, 1440×2560 (portrait) | Hero trust line, ProductsOverview, ProductFamilies |
| `kuicip-nobg.png` | transparent 3-pouch fan (Seaweed · Original · Balado), 1080×1350 | Hero + ProductFamilies layered scenes (`groupShots.kuicip`) |
| `putriteko-nobg.png` | transparent 3-bottle group + spices, 1080×1350 | Hero + ProductFamilies layered scenes (`groupShots["putri-teko"]`) |
| `kuicip/kuicip-*.png` | 8 studio packshots (ori, balado, barbeque, chililime, rendang, seaweed, spicymala, truffle), opaque 1086×1448, warm cream backdrop | `kuicipProducts[*].image` |
| `putri-teko/boto*-*.png` | 3 RTD bottles: `boto-beraskencur` (note the filename typo — keep in sync with content.ts), `botol-gulaasam`, `botol-kuniasam` | botol SKUs |
| `putri-teko/kotak-*.png` | 4 batik sachet boxes: jahecoklat, jahemerah, jaheserai, wedanguwuh | kotak SKUs |
| `putri-teko/toples-*.png` | 4 jars: gulabatukristal, jahemerah, jaheserai, wedanguwuh | toples SKUs |
| `putri-teko/kemasan-ori.png` | 1 practical clear spice pack | kemasan SKU |
| `news/` | (empty) — articles currently reuse product shots; drop real editorial photos here and update `articles[*].image` | `articles[*].image` |

## Guidelines

- The studio packshots are opaque with a shared warm cream backdrop —
  they render `object-cover` inside rounded card frames
  (`ProductPackshot.tsx`), so keep new photos on the same backdrop
  and roughly 3:4 portrait to match.
- Transparent PNG cutouts (logos, `*-nobg`) render `object-contain`
  and can float on colored planes.
- Card aspect ratios per packaging live in `ProductPackshot.tsx`:
  pouch/botol/kotak 3:4 · toples ≈ square · kemasan 4:4.6.
