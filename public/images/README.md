# Image assets

Drop the real packshots here, then point the matching `image` field in
`src/lib/content.ts` at the file. Until a path is set, the site renders
built-in SVG placeholder packshots (pouch / bottle / sachet).

## Expected files

| Folder | File (suggested) | Used by |
| --- | --- | --- |
| `kuicip/` | one per flavor: `original.png`, `balado.png`, `barbeque.png`, `rendang.png`, `spicy-mala.png`, `seaweed.png`, `truffle.png`, `chili-lime.png` | `kuicipProducts[*].image` — hero, featured grid, catalog, detail pages |
| `putri-teko/` | one per SKU: `wedang-jahe.png`, `wedang-uwuh.png`, `kunyit-asam.png`, `wedang-uwuh-seduh.png`, `jahe-merah-seduh.png`, `wedang-rempah.png` | `putriTekoProducts[*].image` |
| `news/` | one per article, e.g. `kuicip-8-rasa.jpg` | `articles[*].image` |

## Guidelines

- Prefer transparent PNG/WebP packshots — products sit on colored
  planes and render with `object-contain` (`Packshot.tsx`).
- ~1000px on the long edge is plenty; next/image handles resizing.
- Reserved aspect ratios (adjust in `ProductPackshot.tsx` if needed):
  pouches 200:260 · bottles 120:300 · sachets 200:240.
