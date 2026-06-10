# Figma-ready component specs (deliverable 4)

Alle maten in px @1x. Tokens verwijzen naar `01-designrichting-tokens.md`. States overal: default / hover / focus-visible (2px ring `gold-text`, offset 3px; op noir `gold-haze`) / reduced-motion (geen transform-animatie).

## Header
- Hoogte 72 (mobiel 64), sticky, `Sandstone @ 90%` + backdrop-blur 12, onderlijn `gold @ 25%`.
- Links wordmark T0 22px. Midden (≥1024): navlinks T6, hover `gold-text`.
- Rechts: CTA-pill `btn-primary btn-header` — mobiel 12/20px "Match-call", ≥640px "Plan mijn match-call". Daarnaast (<1024) hamburger 24px, tap-target 44px.
- **Mobiel menu**: fullscreen Night Bloom dialog (z-50, buiten de header gerenderd i.v.m. backdrop-filter containing block), velvet-textuur, links Lora 28px porcelain, gouden CTA, footer-regel "15 minuten · vrijblijvend · eerlijk". Esc + sluitknop; scroll-lock op html.

## Hero "het gewortelde portret"
- Grid ≥1024: `1.05fr / 0.95fr`, gap 80, min-height 88vh; mobiel één kolom, content eerst.
- Links: T6 label `gold-text` → T1 (clamp 34–68) → gouden divider 80×1 (groei-animatie) → T3 pull quote (accent "Over jezelf." Deep Rose) → CTA-rij (primair gold-pill 20/52 + secundair outline) → T6 sub `stone-text` → trust-regel (gold dot 5px + 15px body).
- Rechts: portret 400 (mobiel 200/250) in cirkel, rand `gold @ 60%`; ringen op -20 (`gold-warm @ 40%`) en -40 (`@ 20%`, alleen ≥1024); zwart-wit fotografie, scale 1.04.
- Achtergrond: RootsVisual bottom, hoogte 46/52/68%, mask-fade boven+onder; arc rechtsboven `gold-warm @ 7%`.
- Entrance: per element `hero-enter` 800ms, delays 0→630ms; puur CSS (draait vóór hydration).

## Methodiek-sectie (4 pijlers, vaste volgorde — nieuw)
- Vlak Morning Light, `py-28/36`; header centered: T6 `gold-text`, T2, divider, intro T4 (max 760).
- Pad: ≥1024 horizontale gradient-goudlijn door de icoon-cirkels; mobiel verticale lijn links (x=23).
- Pijler-item: icoon-cirkel 46 (rand `gold @ 50%`, icoon 24 `gold-text`) → nummer Italiana 20 `gold-text` → titel Lora Bold 20–24 → body 16/1.6.
- Iconen: 01 cirkel+kern (bewustzijn), 02 dubbele golf+dots (darmkanaal), 03 balanslijn (hormonen), 04 vierkwart-cirkel (seizoenen). Stroke 1.2, geometrisch, geen clipart.
- Afsluiter: Lora Italic 20–28 Deep Rose, centered. Reveal: stagger 140ms per pijler.

## Aanbod-cards (3 tiers, geen "aanbevolen"-labels)
- Grid 3×, gap 32, items-stretch. Card padding 40.
- Licht: Morning Light + rand `gold @ 30%`. Midden (anchor door positie, niet door label): Night Bloom + velvet + rand `gold`, ≥1024 -24px omhoog.
- Inhoud: T6 tier (`gold-text` / `gold-haze`) → naam Lora Bold 26–32 → prijs Lora Italic 22 (`gold-text` / `gold-haze`) → divider 60×1 → body → feature-lijst (maan-icoon 16, rose-soft / gold-haze).
- Prijzen: **€ 295 / € 1.400 / € 3.000** — geen kortingen, geen termijnen, nooit.
- Interactie: hover-lift -8px + `shadow-card`; pointer-fine bovendien TiltCard ±3.2° spring (motion, rAF-fallback). Touch: alleen lift. Focus-within: ring.

## Testimonials (Night Bloom carrousel)
- Noir + velvet, T2 porcelain centered, gouden lijn 80×1 erboven.
- Kaart: rand `gold-warm @ 30%`, padding 32–40, titel Lora Italic 16 gold-haze, quote Lora Italic 19/1.55 porcelain, naamlabel T6 gold-warm. Desktop 3 per slide / mobiel 1 (swipe).
- Autoplay 7s, pauze op hover, dots 6px + progressbar 240×2; reduced-motion: geen autoplay.

## CTA-sectie (match-call) & sticky balk
- Noir, arc + fine-line cirkel decoratie, T6 gold-haze → T1 porcelain → 2 vragen Lora Italic → gouden CTA-pill 20/52 → T6 sub → 2 slotregels gold-warm.
- Sticky balk (alleen <768): fixed bottom 14+safe-area, inset 16; gouden pill 17/24, `shadow` zwaar; verschijnt na 65% viewport-scroll, verdwijnt zodra #matchcall in beeld is; rise-in 420ms.

## Footer
- Sandstone, top-rand goud; 3 kolommen: wordmark+tagline (T6 `gold-text`), navigatie, contact (Instagram/e-mail, 15px). Legal 13px `stone-text`. Mobiel extra bodempadding 128 voor sticky balk.

## 3D-paneel (RootsVisual)
- Container: absolute, aria-hidden, pointer-events none, mask-fade.
- Laag 1 SVG: viewBox 1000×600, 44 paden + 31 dots uit `roots.ts`; kleur per diepte goud→goud-warm→sage; draw-in per tak (delay = diepte×420 + jitter, duur = 1400 + lengte×2.2ms).
- Laag 2 Canvas (lazy): orthografisch, dpr ≤1.75, flat tonemapping, fat lines met dash-groei, ronde dot-sprites; parallax rY ±0.055 rad / rX ±0.03 rad, lerp 0.03; scroll-shift 0.00035/px.
- Gate (alles moet slagen): geen reduced-motion · geen saveData/2g · deviceMemory ≥4 · cores ≥4 · geen in-app UA (instagram|fban|fbav|fb_iab|tiktok|musical_ly|bytedance|snapchat|pinterest|line) · WebGL2 zonder performance-caveat · in-view · idle-callback.
- Overgang: na eerste GL-frame fade SVG 600ms naar 0 (`.gl-active`).
