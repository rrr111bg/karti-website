# Accessibility & analytics (deliverable 7)

## WCAG 2.1 AA — wat deze branch doet
- **Contrast**: twee nieuwe tokens lossen de structurele goud-op-licht fout op: `--color-gold-text #80662C` (4.6:1 op Sandstone) voor alle kleine labels/prijzen op licht, `--color-stone-text #6E6557` (4.8:1) voor muted body. Espresso-op-goud knoppen: 4.75:1 ✓. Gold-haze op noir: 11.5:1 ✓.
- **Keyboard/focus**: globale `:focus-visible` gouden ring (2px, offset 3), lichte variant binnen `.night-bloom`. Mobiel menu is een echte dialog (aria-modal, Esc, autofocus sluitknop, scroll-lock). Carrousel-knoppen hebben aria-labels; decoratie overal `aria-hidden`.
- **Reduced motion**: globale kill-switch (bestond al) + expliciete eindstaten voor wortels/hero/sticky; `useScrollReveal` levert eindstaat direct; TiltCard en WebGL-laag schakelen zichzelf uit.
- **Zonder JavaScript**: reveal-verbergstaten zijn gescoped onder `html.js` (inline script vóór first paint) — content is dus nooit onzichtbaar in trage of beperkte webviews. SVG-hero animeert met pure CSS.
- **Structuur**: één h1, secties met logische h2/h3, methodiek als `<ol>` (volgorde is betekenis), portretten met beschrijvende alt.

## Bekende AA-restpunten (bewust, benoemd voor de EAA-context)
1. **Gouden sierlijnen/dividers** halen geen 3:1 tegen Sandstone — toegestaan als puur decoratief (geen informatiedrager), maar genoteerd.
2. **Decoratieve nummers** (Italiana "01–06") leunen op de titel ernaast voor betekenis.
3. **Tier-label op de donkere card** (`gold-haze` 11.5:1) is ruim AA; de *lichte* cards waren het probleem en zijn gefixt.
4. **Carrousel-autoplay** pauzeert op hover en bij reduced-motion, maar heeft nog geen expliciete pauzeknop (WCAG 2.2.2). Aanrader voor sprint 2: kleine pauze-toggle naast de dots.
5. Volledige screenreader-doorloop (VoiceOver/NVDA) staat in de QA-checklist en is nog niet door een mens uitgevoerd.

EAA-noot: Karti is een microbedrijf (<10 fte) en valt formeel buiten de dienstverplichting van de European Accessibility Act, maar we bouwen op AA-niveau omdat de doelgroep (vrouwen met o.a. brainfog/vermoeidheid) er direct baat bij heeft — toegankelijkheid ís hier merkbelofte.

## Analytics: cookieloos, AVG-proof, gezondheidscontext
**Besluit**: Plausible (EU-hosting, geen cookies, geen persoonsgegevens → geen cookiebanner nodig). **Geen Meta-pixel** en geen vergelijkbare advertentie-trackers: bezoek aan een vrouwengezondheidssite is gevoelige informatie; die hoort niet bij een adtech-partij. Retargeting-behoefte lossen we op met creative + landingspagina's per campagne (utm_content), niet met pixels.

### Implementatie (staat in deze branch)
- `layout.tsx`: `script.tagged-events.outbound-links.js`, `data-domain="kartihealth.com"`.
- Elke match-call CTA draagt class `plausible-event-name=matchcall-click` → custom event **matchcall-click**, met automatische outbound-tracking naar Calendly als vangnet.
- Elke CTA heeft een eigen `utm_content` (header / menu / hero / nasra / trajecten / final / sticky) via `calendlyUrl()` — **Calendly bewaart UTM's per boeking**, dus per geboekte call is zichtbaar welke knop hem opleverde, zonder tracking aan onze kant.

### Activatie (eenmalig, ~5 min)
1. Maak een Plausible-account en voeg site `kartihealth.com` toe (EU, €9/m of trial).
2. Markeer in Plausible het event `matchcall-click` als Goal.
3. Klaar — het script staat al live zodra deze branch deployt; zonder account faalt het stil en meet niets.

### KPI-definities
- **Primair**: geboekte match-calls (bron: Calendly, gesplitst op utm_content).
- **Proxy**: `matchcall-click` per sessie (Plausible Goal-conversie).
- **Ondersteunend**: scroll-depth tot #matchcall (Plausible scroll-depth), time-on-page, bounce per bron (tiktok/instagram via utm's in bio-links).
