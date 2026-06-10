# Designrichting & tokens — Dawn-modus (deliverable 2)

De website draait volledig in **Dawn**: de warme, conversiegerichte kant van het merk. Night Bloom verschijnt alleen als contrastvlak (testimonials, match-call sectie, featured card, Instagram-band) zodat de pagina ademt tussen licht en donker zonder haar vertrouwensbasis te verliezen.

## Moodboard in woorden
Travertijn en ochtendlicht, goud als architectuur (niet als glitter), één Deep Rose stem per sectie, fotografie zwart-wit in fine-line ringen. Referentiegevoel: een privékliniek in een herenhuis, niet een wellness-Instagram.

## Kleurtokens (in `src/app/globals.css` onder `@theme`)

| Token | Hex | Rol |
|---|---|---|
| `--color-background` | `#F2EAE0` | Sandstone, paginavlak |
| `--color-surface` | `#FAF6F0` | Morning Light, cards/secties |
| `--color-surface-sage` | `#EEF0E8` | Sage Breath, rustvlak |
| `--color-surface-rose` | `#F5EDED` | Rose Whisper, Nasra-sectie |
| `--color-heading` / `--color-bark` | `#3D3228` | H1/H2 |
| `--color-foreground` / `--color-espresso` | `#2E2622` | Body |
| `--color-stone-text` | `#6E6557` | **Nieuw**: AA-muted body op licht (4.8:1) |
| `--color-gold` | `#B08D3E` | Aged Gold: lijnen, dividers, knoppen, dots |
| `--color-gold-text` | `#80662C` | **Nieuw**: AA-goud voor kleine labels op licht (4.6:1) |
| `--color-gold-warm` / `-haze` / `-sand` | `#C9A854` / `#E2CDA0` / `#E4CFA0` | arcs, tekst-op-noir, sfeer |
| `--color-rose-deep` / `-mid` / `-soft` | `#8B3A4A` / `#B06B72` / `#D4A5A8` | emotionele drager, max 1 niveau dominant per sectie |
| `--color-noir` / `--color-porcelain` | `#1A1614` / `#FBF7F3` | Night Bloom vlakken |

Regel: Aged Gold is **decoratief** op licht (lijnen, vlakken, knop-achtergrond). Zodra goud *tekst* wordt op licht, gebruik `--color-gold-text`.

## Typografie (next/font, geen system fonts)
T0 wordmark **Italiana** `K A R T I` (dubbele spatiëring) · T1 hero **Lora Bold** clamp(34–68px) · T2 sectie **Lora Bold** clamp(28–48px) · T3 pull quote **Lora Italic** clamp(22–32px) · T4/T5 body **Instrument Sans** 18px/1.65 · T6 label **Work Sans** 12px caps, tracking .25em. Eén T1 per pagina.

## Elevatie
| Token | Waarde | Gebruik |
|---|---|---|
| `--shadow-card` | `0 24px 60px -24px rgba(26,22,20,.35)` | card hover-lift |
| `--shadow-card-gold` | `0 30px 70px -24px rgba(176,141,62,.45)` | featured card |
| sticky CTA | `0 18px 44px -16px rgba(26,22,20,.5)` | zwevende balk |

Vlakken zijn verder **plat**: scheiding via 1px gouden lijnen (0.25–0.5 alpha), niet via schaduw.

## Spacing
Secties: `py-28 lg:py-40` (112/160px). Containers: wide 1600px/96px inline, narrow 1080px/24px. Cards: 40–48px padding. Mobiel inline: 20px.

## Motion-taal: kalm, architecturaal, organisch groeiend
| Token | Waarde | Gebruik |
|---|---|---|
| `--motion-quick` | 200ms | hovers, kleur |
| `--motion-primary` | 420ms | primaire transities (altijd < 500ms) |
| `--motion-reveal` | 800ms | ambient reveals, hero-entrance |
| `--ease-organic` | `cubic-bezier(.16,.84,.32,1)` | alles; nooit bounce/elastic |

Principes: beweging is **groei** (wortels tekenen zich, dividers groeien uit hun anker, content stijgt 18–28px op), nooit spektakel. `prefers-reduced-motion`: alle animatie uit, eindstaat direct. Reveals zijn alleen actief mét JS (`html.js` scope) — zonder JS is alles gewoon zichtbaar.
