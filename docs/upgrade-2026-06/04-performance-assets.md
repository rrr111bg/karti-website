# Asset- en performanceplan (deliverable 6)

## Huidige stand (deze branch, gemeten)
- `public/` van **27MB → 0.9MB** (Solluna-restanten en ongebruikte hero-video/4MB-foto verwijderd).
- Initial JS homepage: **~445KB raw (~140KB gzip)** — three.js zit er níét in.
- three/r3f/drei: aparte lazy chunk (~888KB raw / ~230KB gzip), laadt alleen op capabele apparaten na idle; in-app browsers laden hem nooit.
- Wortelsysteem: procedureel — **0 bytes** aan modellen/textures; SVG ~8KB in HTML.
- Fonts: 5 woff2 via next/font, self-hosted, `display: swap`.
- Hero-LCP is nu tekst + 250px portret (next/image, AVIF/WebP via Netlify Image CDN) i.p.v. een 4MB foto.

## Budgetten (hard, voor al het toekomstige werk)
| Asset | Budget |
|---|---|
| Initial JS (gzip) | ≤ 160KB |
| Lazy 3D-chunk (gzip) | ≤ 250KB |
| LCP-afbeelding | ≤ 60KB (AVIF), `priority`, exacte `sizes` |
| Overige foto's | ≤ 120KB, lazy |
| 3D-model (indien ooit glTF) | ≤ 80K tris, Draco/Meshopt, **KTX2/Basis** textures ≤ 1024², LOD's op 50/25% |
| Fonts | geen extra weights zonder subsetting |

## Beeldformaten
Bron: 1600px lange zijde, AVIF (WebP-fallback automatisch via `next/image`). Portretten zwart-wit aanleveren (kleiner én on-brand). `sizes` verplicht per gebruik; nooit `fill` zonder `sizes`.

## Netlify caching
`@netlify/plugin-nextjs` zet dit goed: `/_next/static/*` immutable 1 jaar; HTML via durable cache met revalidatie; Image CDN cachet varianten per breedte. Niets extra's nodig behalve: assets altijd via hashed paden of `/_next/image`.

## Code-splitting regels
- 3D, motion en al het toekomstige zware werk: alleen via `next/dynamic` + capability-gate (patroon in `RootsVisual.tsx` / `TiltCard.tsx`).
- Geen library in de initial bundle die alleen onder de vouw werkt.

## Lighthouse-targets (mobiel, Moto G Power-profiel)
Performance **≥ 90** · Accessibility **≥ 95** · Best Practices ≥ 95 · SEO ≥ 95.
Verwachting deze branch: LCP < 2.0s (4G), CLS ≈ 0 (geen layout-shift: portret heeft vaste ratio, fonts swappen binnen serif-metriek), TBT laag (3D buiten main thread-pad tot idle).

## CI-checks (aanbevolen GitHub Action op PR's naar karti-redesign)
```yaml
- run: npm ci && npm run check          # lint + typecheck + build
- run: npx @lhci/cli autorun            # lighthouse-ci tegen netlify deploy preview
  # budgets: performance>=0.9, a11y>=0.95
- run: npx playwright test a11y.spec.ts # axe-core scan op / (geen serious/critical)
```
Plus de bestaande Netlify deploy preview per PR als visuele review.
