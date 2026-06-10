# Implementatieplan, risico's, QA & KPI's (deliverable 8)

## Wat in deze release zit (branch `upgrade-2026-06`, één release zoals gekozen)
**Conversie**: match-call CTA in hero boven de vouw (mobiel én desktop) · header-CTA van nieuwsbrief → match-call, ook op mobiel · sticky match-call balk mobiel · trust-regel "HBO-verpleegkundige" in hero · "MEEST GEKOZEN" verwijderd · werkend mobiel menu (was dode knop) · UTM + event op elke CTA.
**Merk/visueel**: WebGL/SVG wortelsysteem-hero met portret in fine-line ringen · nieuwe methodiek-sectie (4 pijlers, vaste volgorde) · Instagram-placeholders → eerlijke volg-band · AA-kleurtokens.
**Techniek**: no-JS/in-app reveal-fallback · Plausible · OG/Twitter metadata + og.png · prijzen € 295 / € 1.400 / € 3.000 · 26MB dode assets weg · lint/typecheck/build groen.

## Uitrol
1. Netlify **deploy preview** vanaf deze branch (geen productie-impact) → review door Nasra op echte telefoon, in de Instagram in-app browser.
2. Na akkoord: merge/push naar `karti-redesign` → auto-deploy productie.
3. Binnen 24u: Plausible-account activeren (zie 05) en eerste cijfers checken.

## Risico's en mitigaties
| Risico | Kans | Mitigatie |
|---|---|---|
| WebGL-laag op een onverwacht apparaat traag | laag | strenge gate + `failIfMajorPerformanceCaveat`; laag is puur decoratief, SVG blijft de basis; kill-switch = `eligible` op false zetten in `RootsVisual` |
| In-app browser rendert SVG-animatie niet | zeer laag | CSS-animaties worden universeel ondersteund; zonder JS/CSS-animatie staat de volgroeide tekening er gewoon |
| Prijsverlaging geeft vragen bij bestaande leads | n.v.t. site | besluit van Karti (juni 2026); brochure/DM-templates apart bijwerken |
| Hydration/regressies | laag | `npm run check` groen; geen hydration-errors in verse console; QA-checklist hieronder |
| Plausible nog niet geactiveerd bij livegang | zeker | script faalt stil; activatie is non-blocking maar doe het dag 1, anders geen baseline |

## QA-checklist vóór productie-push
- [ ] Deploy preview op **iPhone Safari** en **Android Chrome**: hero-CTA boven de vouw, sticky balk verschijnt na scroll, menu opent/sluit.
- [ ] **Instagram in-app browser (iOS én Android)** via link in bio/DM: content direct zichtbaar (geen lege secties), SVG-wortels tekenen, géén canvas (verwacht), Calendly-link opent en is boekbaar.
- [ ] **TikTok in-app browser**: idem.
- [ ] Desktop Chrome/Safari/Firefox: WebGL-laag activeert (SVG fade), parallax kalm, tilt op aanbod-cards.
- [ ] `prefers-reduced-motion` aan (macOS: Verminder beweging): geen animatie, alles zichtbaar.
- [ ] Toetsenbord-only: alle CTA's bereikbaar met zichtbare focus; menu-dialog Esc.
- [ ] VoiceOver-doorloop van hero + trajecten + formulier.
- [ ] Nieuwsbrief-formulier submit → /thank-you (Netlify Forms blijft werken).
- [ ] Calendly-boeking maken met testnaam → check dat utm_content zichtbaar is in Calendly.
- [ ] OG-preview checken via opengraph.xyz (titel/beschrijving/og.png).
- [ ] Lighthouse mobiel op de preview-URL: performance ≥ 90.

## KPI's (meetbaar vanaf week 1)
| KPI | Bron | Doel eerste 30 dagen |
|---|---|---|
| Geboekte match-calls | Calendly (+utm_content) | baseline vestigen; richtpunt ≥ 2× huidige weekgemiddelde |
| matchcall-click rate | Plausible Goal | ≥ 4% van sessies |
| Scroll-depth tot #matchcall | Plausible | ≥ 35% van mobiele sessies |
| Bounce social-verkeer | Plausible (bron tiktok/ig) | −15% t.o.v. week 1-baseline |
| Time-on-page mobiel | Plausible | ≥ 60s mediaan |

Beslisregel na 30 dagen: best presterende `utm_content` bepaalt waar we de tweede CTA-iteratie op richten; `gl-active`-aandeel bepaalt of concept C de standaard wordt (zie 02).
