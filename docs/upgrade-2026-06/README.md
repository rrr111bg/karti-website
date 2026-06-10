# Karti website-upgrade juni 2026 — README & handoff (deliverable 9)

Eén grote release op branch `upgrade-2026-06`: conversie-architectuur + WebGL-wortelsysteem-hero + methodiek-sectie + analytics + a11y. Volledige documentenset in deze map:

| Doc | Inhoud |
|---|---|
| `01-designrichting-tokens.md` | Dawn-tokens, typografie, elevatie, motion-taal |
| `02-hero-concepten.md` | Concepten A/B/C, rationale en fallbacks (B = gebouwd) |
| `03-component-specs.md` | Figma-ready specs van alle componenten + 3D-paneel |
| `04-performance-assets.md` | Budgetten, formaten, caching, Lighthouse, CI |
| `05-a11y-analytics.md` | AA-status + restpunten, Plausible/Calendly meetplan |
| `06-implementatieplan-qa.md` | Uitrol, risico's, QA-checklist, KPI's |
| `vanilla-hero/index.html` | Standalone hero (HTML/CSS/JS + three via CDN) voor statische pagina's |

## Stack
Next.js 16.2.1 · React 19 · Tailwind v4 · three / @react-three/fiber / @react-three/drei (lazy) · motion (lazy) · Netlify + `@netlify/plugin-nextjs` v5 · Plausible (cookieloos).

## Commands
```bash
npm ci          # installeren (node ≥ 20.9; lokaal draait 24)
npm run dev     # dev-server (lokale launch-config gebruikt poort 3456)
npm run check   # lint + typecheck + productie-build — moet groen zijn vóór elke push
npm run build && npm start   # productie lokaal proeven
```

## Deploy
- Netlify-project `frabjous-jalebi-faac61` → kartihealth.com, bouwt **branch `karti-redesign`** automatisch.
- Preview: push deze branch en open de branch/deploy-preview-URL in Netlify, of `netlify deploy --build` vanaf de repo.
- Productie: merge `upgrade-2026-06` → `karti-redesign`, push. Klaar.

## Sleutelbestanden
- `src/lib/content.ts` — alle copy en prijzen (één bron van waarheid; CTA-links via `calendlyUrl("plek")`).
- `src/lib/roots.ts` — deterministische wortelsysteem-generator (seed vast; SVG en WebGL delen geometrie).
- `src/components/karti/RootsVisual.tsx` — SVG-laag + capability-gate + lazy canvas.
- `src/components/karti/KartiRootsScene.tsx` — r3f-scene (groei, parallax, dots).
- `src/components/karti/StickyMatchCall.tsx`, `TiltCard.tsx` (+ `MotionTilt`/`RafTilt`).
- `src/app/globals.css` — tokens, reveal/no-JS-scoping, focus states, knoppen.
- `src/app/layout.tsx` — fonts, OG/Twitter-metadata, no-JS script, Plausible.

## Ship-checklist (one-pager)
1. [ ] `npm run check` groen
2. [ ] QA-checklist uit `06` afgevinkt op de deploy preview (incl. Instagram in-app, iOS + Android)
3. [ ] Plausible-account + Goal `matchcall-click` actief
4. [ ] Testboeking in Calendly toont `utm_content`
5. [ ] Merge naar `karti-redesign`, push, deploy-log groen
6. [ ] Live smoke-test: /, /start, /thank-you + één echte mobiele boekingsflow
7. [ ] Brochure/DM-templates bijwerken naar € 295 / € 1.400 (buiten de site)

## Bewust niet gedaan (en waarom)
- Geen Meta-pixel of vergelijkbare trackers: gezondheidscontext (zie 05).
- Geen Instagram-feed-API: nep-tegels vervangen door eerlijke volg-band; echte feed kan later via Behold/EmbedSocial als gewenst.
- Geen glTF/KTX2 in de hero: procedureel is lichter én meer on-brand; het budget- en LOD-recept voor toekomstige 3D-assets staat in `04`.
