# Drie hero-concepten (deliverable 3)

Alle drie geworteld in Karti-metaforen; B is gebouwd en live in deze branch, A en C blijven beschikbaar als bewuste terugvalniveaus binnen dezelfde architectuur.

## A — Statisch premium: "Het portret in de ring"
**Metafoor:** fine-line cirkel (kader/heelheid) + gouden dividers.
**Vorm:** Dawn-vlak, links waardepropositie + CTA, rechts zwart-wit portret in dubbele gouden ring, statische SVG-wortels op de achtergrond (volgroeid, geen animatie).
**UX-doel:** maximale rust en snelheid; alles boven de vouw.
**Performance:** geen JS nodig; LCP = tekst/klein portret (~35KB AVIF); TTI direct.
**Fallback:** is zelf de fallback — identiek in elke browser.
**Voorbeelden ter inspiratie:** rivian.com (rustige editorial hero), aesop.com (typografische kalmte), goop.com wellness-pdp's (portret + serif).

## B — WebGL: "Het gewortelde portret" ✅ gebouwd
**Metafoor:** wortelsysteem = verankering & groei (karti-brand-system illustratie-bibliotheek).
**Vorm:** als A, maar het wortelsysteem **groeit** organisch in goud op Sandstone onder/rond het portret. Drie progressieve lagen die exact dezelfde geometrie delen (`src/lib/roots.ts`, seeded):
1. SVG met CSS draw-in — voor iedereen, ook in-app browsers en zonder JS;
2. lazy react-three-fiber scene (procedureel, geen glTF, geen textures) met diepte-parallax op muis en scroll — alleen op apparaten die slagen voor de capability-gate;
3. reduced-motion → volgroeid statisch beeld.
**UX-doel:** het "dit is een ander niveau"-moment binnen 3 seconden, zonder de CTA-zichtbaarheid te raken (canvas is achtergrond, content is HTML).
**Performance trade-offs:** three+r3f+drei = aparte lazy chunk (~888KB raw / ~230KB gzip) die **nooit** in de initial bundle zit en alleen laadt na first paint + idle op capabele apparaten. Initial JS van de pagina: ~445KB raw (~140KB gzip). SVG-laag kost ~8KB in de HTML.
**Fallback-gedrag in-app browsers:** Instagram/TikTok/Facebook/Snapchat UA's krijgen bewust **nooit** WebGL; zij zien de SVG-animatie (CSS), die 90% van de magie draagt. Zelfde voor `prefers-reduced-motion`, `saveData`, `deviceMemory < 4`, `hardwareConcurrency < 4`, ontbrekend WebGL2 of software-rendering (`failIfMajorPerformanceCaveat`).
**Voorbeelden:** lusion.co (organische lijnen-groei), basement.studio archief (canvas achter editorial type), unseen.co (kalme WebGL-sfeer zonder UI-blokkade).

## C — Hybride: "SVG + micro 3D-interactie"
**Metafoor:** zelfde wortelsysteem; 3D beperkt tot subtiele parallax op het portret (CSS transform op deviceorientation/pointer) en gouden dots die bij hover oplichten.
**Vorm:** laag 1 + 2 van concept B zonder three.js: parallax via 30 regels vanilla JS.
**UX-doel:** premium beweging met nul library-gewicht; veiligste keuze als analytics later laat zien dat de WebGL-laag zelden activeert bij de doelgroep (vrijwel alles in-app verkeer).
**Performance:** geen extra chunk; alles < 10KB.
**Fallback:** SVG zonder parallax.
**Voorbeelden:** stripe.com/sessions hero's (SVG-lijnwerk), linear.app (parallax-restraint).

**Aanrader voor vervolg:** meet via Plausible custom prop hoe vaak de GL-laag echt activeert (`gl-active`). Onder ~15% van sessies → overweeg C als permanente standaard en bewaar B voor desktop-campagnes.
