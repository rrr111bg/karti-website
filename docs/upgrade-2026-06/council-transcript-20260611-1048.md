# Council-transcript · Vernieuwde kartihealth.com · 2026-06-11 10:48

## Oorspronkelijke vraag
"geef feedback op de hernieuwde site" (na oplevering van de upgrade-2026-06 preview-deploy).

## Geframede vraag aan alle adviseurs
Geef kritische feedback op de vernieuwde website van Karti (kartihealth.com, preview-deploy klaar voor livegang). Wat is sterk, wat is zwak, wat ontbreekt, en wat moet de eerstvolgende verbetering zijn vóór of direct na livegang?

Context: Karti = premium Nederlandstalige 1:1 coaching voor holistische vrouwengezondheid door Nasra, HBO-verpleegkundige. Het echte product is vertrouwen. Bezoeker: Nederlandstalige vrouw met hormonale/cyclusklachten, komt vrijwel altijd via TikTok/Instagram in-app browsers op mobiel. Enige taak: de 15-minuten match-call laten boeken (Calendly). Aanbod: De Inzicht Sessie €295 · The Body & Being Guide €1.400 · The Embodiment Blueprint €3.000; geen kortingen of termijnen. De upgrade bracht: wortelsysteem-hero (SVG + lazy WebGL), match-call CTA boven de vouw, sticky mobiele CTA, methodiek-sectie (4 pijlers), trust-regel HBO-verpleegkundige, werkend mobiel menu, nieuwe prijzen, Plausible + UTM per CTA. Sectievolgorde: Hero → Herkenning → Methode → Bouwstenen → Over Nasra → Trajecten → Testimonials → Nieuwsbrief → Instagram-band → Match-call → Footer.

Materiaal: preview-URL (https://6a29e9892dd5e92cbc16c6b2--frabjous-jalebi-faac61.netlify.app), volledige desktop/mobiel screenshots, src/lib/content.ts. De Outsider kreeg bewust géén merkcontext, alleen de site zelf.

---

## Adviseur-antwoorden

### De Contrarian
De fatale fout zit niet in het design, maar in het fundament: de site verkoopt vertrouwen en heeft juridisch niets. "Privacy · Voorwaarden" in de footer is dode tekst — geen links; /privacy en /voorwaarden geven 404. Je verzamelt e-mails zonder privacybeleid (AVG-overtreding) en verkoopt trajecten tot €3.000 zonder algemene voorwaarden, terwijl de site "Lab analyse: volledige hormonale screening" en "Medische deep dive" belooft naast de disclaimer "geen medische zorg", met testimonials die genezing claimen ("eczeem verdween", "Nasra ziet wat artsen missen"). Eén kritische bezoeker of één geschil en dit wordt duur.

Tweede breuk: het boekingsmoment zelf. Alle zeven CTA's zeggen "match-call", maar het Calendly-event heet "Kennismaking" — én de €295 Inzicht Sessie bevat een "kennismakingsgesprek". Is de call nu gratis of betaald? Precies op het beslismoment ontstaat verwarring, plus een stijlbreuk naar kale Calendly via target="_blank" in wispelturige TikTok/IG in-app browsers. Niemand heeft de funnel aantoonbaar end-to-end in een echte in-app browser getest. Ook de Netlify-nieuwsbrief is nooit met een echte submission geverifieerd.

Derde: het bewijs is verstopt. Tien testimonials, op mobiel één zichtbaar achter tien dots — 90% van je enige bewijs (voornamen, geen gezichten, geen aantallen) blijft ongezien. En er is nul bezwaarafhandeling: geen FAQ voor een €1.400-beslissing zonder termijnen.

Sterk: hero-copy, CTA boven de vouw, sticky balk, UTM-tagging, nette WebGL-fallback. Maar dat is glazuur.

Vóór livegang, niet erna: (1) privacy- en voorwaardenpagina's live en gelinkt; (2) Calendly hernoemen naar "Match-call · 15 minuten" en de funnel testen vanuit TikTok zelf; (3) minimaal drie testimonials statisch zichtbaar op mobiel. Zonder punt 1 en 2 zou ik dit niet live zetten.

### De First Principles Thinker
De baan van deze site is niet "vertrouwen opbouwen". De bezoeker arriveert mét vertrouwen — ze zag net een video van Nasra die haar raakte. De baan is: dat vertrouwen niet breken in de 60 seconden tot de boeking. Vanuit dat principe vallen drie dingen op.

Eén: de conversie gebeurt niet op deze site. Elke CTA opent met target="_blank" een kale Calendly-pagina — in een TikTok/Instagram-webview, waar nieuwe tabs onvoorspelbaar gedrag vertonen. Jullie hebben elke pixel vóór de klik geoptimaliseerd en nul woorden besteed aan wat ze ná de klik ziet. De zwakste schakel bepaalt de conversie, en die schakel is nu onbeheerd derde-partij-territorium.

Twee: het product van deze pagina is de match-call, niet de Guide — maar de match-call wordt nergens verkocht. "15 minuten · vrijblijvend · eerlijk" is een belofte zonder inhoud. Haar echte angst: een verkooppraatje. Nergens staat: je spreekt Nasra zelf, dit gebeurt er, en als het niet past zeg ik dat eerlijk. Drie regels die het grootste bezwaar van een €1.400-beslissing wegnemen, ontbreken.

Drie: het medium dat het vertrouwen bouwde, ontbreekt. Ze kent Nasra bewegend, pratend, in kleur. De site antwoordt met een zwart-wit portret in gouden ringen en tien tekst-testimonials zonder gezicht. Premium gedempt, terwijl haar bewijs levendigheid was. En de nieuwsbrief- plus Instagram-band geven de twijfelaar vlak voor de finale CTA een schuldvrije exit — terug naar waar ze vandaan kwam.

Sterk: herkenningssectie, "Ik start niet bij je hormonen", sticky CTA, trustregel, UTM-tagging per knop.

Vóór livegang: de laatste meter. Mini-sectie die de match-call de-riskt + Calendly Nederlands/branded + de hele flow zelf testen in de TikTok- én Instagram-app. Direct erna: video van Nasra op de site.

### De Expansionist
Sterk fundament, maar drie groeimotoren staan uit.

1. Nasra zelf is het onderbenutte asset — en de eerstvolgende verbetering. Al het verkeer komt via TikTok/IG, waar vrouwen verliefd worden op haar gezicht, stem en toon. De site vangt dat op met een zwart-wit stilstaande foto. Eén talking-head video van 45 seconden in de hero of Over Nasra-sectie verlengt het parasociale vertrouwen dat de bezoeker al méébrengt — en de reel-pipeline staat al. Dit is de goedkoopste conversie-vermenigvuldiger die er is.

2. Het Elementenprofiel is een verstopt leadmagneet-imperium. "Water, vuur, aarde of lucht" is een personality-quiz die zichzelf deelt. Bouw "Welk element ben jij?" als mini-quiz: TikTok-CTA → quiz → resultaat → e-mail + match-call. Dat maakt van de brochure een funnel en voedt de nieuwsbrief — die nu als wegwerpsectie onderaan staat, terwijl die bij een €1.400-ticket hét compound-asset is voor iedereen die vandaag nog niet boekt. Elke niet-boekende bezoeker is nu volledig verloren; dat is het grootste lek.

3. De testimonials zijn goud, begraven in een carrousel op positie 7. "Mijn huisarts zei dat mijn bloedwaarden 'prima' waren. Nasra zag in één gesprek waar het werkelijk zat" — dat is de hele positionering in klantenwoorden. Til de drie sterkste eruit: één direct onder de hero, één naast de €1.400-kaart, één bij de eind-CTA.

Bonus, twee regels werk: toon de Blueprint fysiek — "50+ pagina's" is een claim, een gemockt document is bewijs én begeerte (plus voorbeeldhoofdstuk = tweede leadmagneet). En benoem de eerlijke schaarste: Nasra werkt alleen, dus "beperkt aantal trajecten per maand" kost niets, verhoogt boekingsdruk en past bij geen-kortingen-premium.

### De Outsider
1. Eerste 3 seconden. Crèmekleurig, goud, serif: dit oogt als een duur wellnessmerk voor vrouwen. "Jouw lichaam fluistert. Ik leer je luisteren" is mooi, maar vertelt me níet wat dit is. Pas bij "1:1 begeleiding door Nasra · HBO-verpleegkundige" snap ik: een coach voor vrouwengezondheid. Welke klacht ze oplost (vermoeidheid, cycluspijn, hormonen) ontdek ik pas na scrollen.

2. Wat ik niet begrijp. "Match-call" — verzonnen woord, drie keer in beeld vóór enige uitleg. Is dat een verkoopgesprek? En cruciaal: nergens staat het woord "gratis". "Vrijblijvend · eerlijk" is niet hetzelfde; "eerlijk" maakt me juist achterdochtig. Verder een stapel jargon: "The Embodiment Blueprint", "Body & Being Guide", "Fasekeuken", "deep dive". En het "Elementenprofiel — water, vuur, aarde of lucht" botst frontaal met "HBO-verpleegkundige": is dit medisch of spiritueel? Bij €3.000 staat "Lab analyse" en "detoxprotocol" — wie voert dat lab uit, mag een verpleegkundige dat?

3. Vertrouwen. Half. Het design en de echte foto wekken vertrouwen, de prijzen (€295 / €1.400 / €3.000) zonder betaaltermijnen of garantie niet. Testimonials zijn alleen voornamen zonder gezicht, en "De huisarts zag niks" / "Nasra ziet wat artsen missen" klinkt als anti-dokter-retoriek. De slotvraag "Wat kost het je als je over een jaar nog steeds op dit punt staat?" voelt als druk uit een salesfunnel. Wat mij tegenhoudt om te boeken: ik vermoed dat de "match-call" een pitch voor €1.400+ is.

4. Veranderen.
- Zet "Gratis kennismaking · 15 min" letterlijk bij elke CTA; schrap "eerlijk".
- Hero: één concrete klachtenzin toevoegen.
- Mini-blok "Zo werkt de match-call" (telefoon/video, wat bespreken we, €0, geen verplichting).
- Elementenprofiel uitleggen of lager zetten; medisch en spiritueel nu onduidelijk gemengd.
- Testimonials voorzien van foto's of verifieerbare details; betaaltermijnen tonen bij €1.400/€3.000.

### De Executor
Mergen kan — maar in deze volgorde, en drie dingen eerst. De basis staat: één taak, scherpe copy, prijzen zichtbaar, Calendly-link geeft gewoon 200, vijf CTA's netjes getagd (header/hero/nasra/trajecten/final). Dat is geen reden voor uitstel, wel voor een checklist.

1. Vandaag, vóór de merge: Plausible-account aanmaken (10 minuten). Het script staat al op de preview en vuurt naar plausible.io — zonder account is elke klik vanaf dag één voorgoed weg. Je kunt niet optimaliseren wat je nooit gemeten hebt.

2. Vandaag: brochure en DM-templates naar nieuwe prijzen. Site zegt €1.400, de opvolging zegt €1.800. Het product is vertrouwen; één tegenstrijdig prijskaartje ná de match-call kost precies de boeking die de site net binnenhaalde. Dit is zoeken-en-vervangen, geen project.

3. Vóór de merge: één echte test op een telefoon via een TikTok-bio-link. In de uitgeserveerde HTML vind ik géén sticky onderbalk en geen zesde UTM-tag. Of die balk rendert alleen client-side, of hij ontbreekt — in beide gevallen wordt je drukst gebruikte mobiele knop mogelijk niet apart gemeten. Klik door tot een echte testboeking in de in-app browser.

4. In Calendly zelf (30 minuten): telefoonnummer als verplicht veld plus reminders 24 uur en 1 uur vooraf. No-shows op gratis calls zijn het grootste lek in dit pad, niet de website.

Overbodig: verder sleutelen aan de WebGL-hero, een Calendly-embed bouwen, secties herschikken. Nul extra boekingen.

Meetbaar deze week: Plausible live op dag één betekent dat je na zeven dagen wéét welke CTA boekt — dan snijd je gericht in plaats van te gokken.

---

## Peer-reviews (anonimisering: A = Executor, B = Contrarian, C = Outsider, D = Expansionist, E = First Principles)

### Review 1
1. Sterkste: B. Het vindt als enige echte blokkades: 404 op /privacy en /voorwaarden bij e-mailcapture (AVG) plus genezingsclaims naast "geen medische zorg" — bij €3.000-trajecten het hoogste risico. Daarnaast dekt het het beslismoment (gratis/betaald-verwarring, Calendly heet "Kennismaking") én begraven bewijs. Concreet, falsifieerbaar, geprioriteerd. E is conceptueel scherper, maar mist het juridische blok.
2. Grootste blinde vlek: D. Het beantwoordt een andere vraag: groei-ideeën in plaats van livegang-kritiek. Het ziet nul risico's, stelt extra funnelstappen voor terwijl de enige taak boeken is, en wil het Elementenprofiel uitvergroten dat C juist als geloofwaardigheidsbreuk aanwijst.
3. Alle vijf gemist: (a) laadtijd in TikTok/IG-webviews nooit gemeten; (b) de Calendly-agenda zelf (lege of verre beschikbaarheid breekt vertrouwen op het laatste scherm); (c) feitenconflict A vs B/E over de sticky balk — eerst beslechten op de echte deploy.

### Review 2
1. Sterkste: B. Launch-blockers (404's AVG, claims) en het scherpste conversiepunt: de gratis-of-betaald-verwarring exact op het beslismoment. E denkt het scherpst, maar B's vondsten kosten het meest als je ze negeert.
2. Grootste blinde vlek: D. Behandelt een livegang-review als groeibrainstorm; adviezen verergeren gevonden problemen — een quiz die e-mails verzamelt zonder privacybeleid (B's AVG-punt), en het uitvergroten van de "huisarts zag niks"-testimonial die B en C als risico markeren.
3. Gemist: performance (WebGL + fonts in TikTok-webview op 4G nooit gemeten) en het feitenconflict over de sticky balk — client-side-only rendert mogelijk juist niet in die webviews.

### Review 3
1. Sterkste: B. Harde, falsifieerbare launch-blockers; beantwoordt "wat moet eerst" het letterlijkst; juridisch risico heeft asymmetrische downside.
2. Grootste blinde vlek: D. Negeert het kader (preview vóór livegang, enige taak is de match-call), signaleert geen enkel defect en wil de nieuwsbrief uitbouwen die E overtuigend aanwijst als schuldvrije exit vlak voor de eind-CTA.
3. Allemaal gemist: laadprestatie (eerst snelheidsprobleem, dan pas copyprobleem). Veelzeggend feitenconflict: A vindt de sticky balk en zesde UTM-tag níet in de uitgeserveerde HTML; B en E prijzen die juist — wijst op client-side rendering; op een echt toestel beslechten vóór livegang.

### Review 4
1. Sterkste: B. Echte launch-blockers, scherpste conversievondst (gratis of betaald?), beantwoordt alle vier deelvragen. E tweede: beste strategische frame, minder harde vondsten.
2. Grootste blinde vlek: D. Negeert de brief, mist élke blocker, botst frontaal met E (nieuwsbrief = exit). Groei optimaliseren op een gescheurd fundament.
3. Alle vijf gemist: (a) het feitenconflict sticky balk/zesde UTM — minstens één adviseur beoordeelt een pagina die zo niet wordt geserveerd; (b) niemand stelt een test met echte doelgroepvrouwen voor: vijf expert-simulaties, nul gebruikers.

### Review 5
1. Sterkste: B. 404 privacy/voorwaarden (AVG, €3.000 zonder voorwaarden, claims naast disclaimer) én de gratis-of-betaald-verwarring; verifieerbaar, alle deelvragen. E conceptueel scherper maar mist het juridische blok.
2. Grootste blinde vlek: D. Groeibrainstorm in plaats van kritische review; quiz, leadmagneet en nieuwsbrief-amplificatie bouwen extra exits vóór de boeking — precies het lek dat E benoemt — en "schaarste" grenst aan de funneldruk die C als vertrouwensbreker aanwijst.
3. Gemist: laadprestaties op 4G-webviews én het feitenconflict over wat er werkelijk rendert; de synthese moet eerst feiten vaststellen.

### Feitencheck door de bouwer (toegevoegd aan de synthese-input)
De sticky balk bestaat en werkt, maar wordt bewust client-side gerenderd ná 65% viewport-scroll (daarom niet in de SSR-HTML; in-app browsers draaien JavaScript). De zesde UTM-tag (sticky) zit in die component. De WebGL-laag laadt bewust nooit in in-app browsers (UA-gate); die krijgen de SVG-animatie. Initial JS ~140KB gzip. Dit neutraliseert het feitenconflict deels; het punt "test het op een echt toestel in de echte app" blijft volledig geldig.

---

## Voorzitter-synthese

### Waar de council het eens is
1. De laatste meter is de zwakste schakel. Vier van de vijf adviseurs landen onafhankelijk op het boekingsmoment. Alles vóór de klik is geoptimaliseerd, daarna neemt een kale, Engelstalige Calendly het over via target="_blank" in een wispelturige in-app browser. De CTA's zeggen "match-call", het Calendly-event heet "Kennismaking", de €295-sessie bevat óók een "kennismakingsgesprek", en het woord "gratis" staat nergens. De Outsider verwoordt wat de bezoekster denkt: dit is vermoedelijk een verkooppraatje voor €1.400.
2. Het bewijs is begraven. Tien testimonials goud, op mobiel één zichtbaar achter tien dots, zonder gezicht, zonder verifieerbare details, op positie 7.
3. Niets is end-to-end getest. Echte telefoon, echte TikTok- en Instagram-app, echte boeking: nooit gedaan. Nieuwsbrief nooit getest, Plausible-account bestaat nog niet.
4. De richting is goed. Niemand wil terug; de site moet niet opnieuw ontworpen, hij moet afgemaakt.

Apart geval: het juridische blok (404 op privacy/voorwaarden, e-mailcapture zonder privacybeleid, €3.000-trajecten zonder voorwaarden, genezingsclaims naast de disclaimer) — één vinder, vijf bevestigers in review: dat telt als consensus.

### Waar de council botst
1. Nieuwsbrief: asset (Expansionist) of schuldvrije exit vlak voor de eind-CTA (First Principles). De briefing beslist: enige taak is de match-call, dus First Principles wint vóór livegang; het groeipunt blijft geldig voor later, ónder de eind-CTA en pas mét privacybeleid.
2. Schaarste en urgentie: premium-positionering (Expansionist) of funneldruk (Outsider). Voor een doelgroep met als grootste angst "verkocht worden" weegt de Outsider zwaarder: druk weghalen, niet toevoegen.
3. Elementenprofiel: kroonjuweel of geloofwaardigheidsbreuk. Niet schrappen (differentiator), wel uitleggen of lager zetten; niet uitvergroten zolang het onuitgelegd is.
4. Nu mergen (Executor) of eerst blokkades (Contrarian). Asymmetrische downside wint: de volgorde van de Contrarian met de discipline van de Executor erin verwerkt.

### Blinde vlekken die de council ving
1. Het feitenconflict over de sticky balk: waarneming van de Executor klopte (niet in SSR-HTML), conclusie niet (bewust client-side; werkt). De les blijft: de belangrijkste mobiele CTA hangt af van JavaScript plus een scroll-event in precies de omgeving die niemand op een echt toestel zag.
2. Performance is nooit gemeten (4 van 5 reviews): fonts en laadtijd op 4G in een TikTok-webview blijven ongemeten, ook al laadt WebGL daar bewust nooit.
3. Niemand keek in de Calendly-agenda zelf; plus telefoonnummer verplicht en reminders tegen no-shows.
4. Vijf expert-simulaties, nul gebruikers: drie echte doelgroepvrouwen laten boeken beslecht de halve discussielijst.
5. Het Expansionist-patroon als bevinding: zijn adviezen zijn niet fout als groeistrategie, maar verergeren gevonden problemen omdat hij de risicolaag niet zag. Bewaren voor week twee.

### De aanbeveling
Niet live vandaag. Wel live deze week. Fixlijst in volgorde:
1. Juridische laag (blokkade): privacy- en voorwaardenpagina's live, footer-links werkend; claims nalopen en herformuleren of van context voorzien.
2. Het beslismoment (blokkade): Calendly-event hernoemen naar "Gratis match-call · 15 minuten", Nederlandstalig en branded; drie regels boven de eind-CTA die de call de-risken; het woord "gratis" letterlijk bij elke CTA; "eerlijk" schrappen.
3. De bewijstest (blokkade): eerst Plausible-account en Calendly-agenda op orde (beschikbaarheid, telefoonnummer verplicht, reminders 24u/1u); dan end-to-end test vanuit TikTok én Instagram met testboeking en UTM-check.
4. Bewijs zichtbaar (sterk aangeraden): drie testimonials statisch op mobiel (onder hero, bij prijzen, bij eind-CTA); kies de drie zonder medische claims.
5. Consistentie buiten de site (parallel, dag één): brochure en DM-templates naar €295 / €1.400 / €3.000.
6. Nieuwsbrief- en Instagram-band onder de eind-CTA, of weg voor launch.

Direct ná livegang, week één: video van Nasra op de site, drie doelgroepvrouwen laten boeken terwijl je meekijkt, mini-FAQ voor de €1.400-beslissing, Elementenprofiel uitleggen of verlagen.

Niet doen: WebGL-tweaks, een Calendly-embed bouwen, secties herschikken, quiz of leadmagneet vóór de privacylaag, schaarste-copy.

### Het ene ding dat je eerst moet doen
Pak vanmiddag een telefoon, zet de preview-link in een TikTok-bio, en boek zelf één match-call van eerste scroll tot bevestigingsmail. Dit is de enige stap die nieuwe informatie oplevert die de rest van de lijst nog kan veranderen; al het andere is bekende uitvoering.
