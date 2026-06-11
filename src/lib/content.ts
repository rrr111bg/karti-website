/**
 * Karti content — single source of truth
 *
 * All copy sourced from Brochure_Final.pdf (V8, march 2026),
 * patched via karti-dna + karti-funnel-copy audit (revision 2).
 * Pricing aangepast juni 2026 in opdracht van Karti: 295 / 1.400 / 3.000
 * (was 340 / 1.800 / 3.000).
 *
 * Do not edit copy here without checking against the authoritative brochure.
 */

export const CALENDLY_URL = "https://calendly.com/kartihealth/kennismaking/";

/**
 * Calendly-link met UTM-tagging per plek op de site.
 * Calendly bewaart UTM's per boeking, zodat zichtbaar is welke CTA
 * de match-call opleverde (zonder cookies of pixels).
 */
export function calendlyUrl(content: string): string {
  const params = new URLSearchParams({
    utm_source: "website",
    utm_medium: "cta",
    utm_campaign: "matchcall",
    utm_content: content,
  });
  return `${CALENDLY_URL}?${params.toString()}`;
}

export const NAV_LINKS = [
  { href: "#methode", label: "Methode" },
  { href: "#nasra", label: "Over Nasra" },
  { href: "#bouwstenen", label: "Bouwstenen" },
  { href: "#trajecten", label: "The Karti Way" },
] as const;

export const HERO = {
  label: "WIJSHEID VAN HET VROUWENLICHAAM",
  headline: ["Jouw lichaam fluistert.", "Ik leer je luisteren."],
  pullQuote: "De handleiding die je nooit hebt gekregen. Over jezelf.",
  primaryCta: "Plan mijn gratis match-call",
  ctaSub: "GRATIS · 15 MINUTEN · VRIJBLIJVEND",
  secondaryCta: "Lees hoe ik werk",
  trustLine: "1:1 begeleiding door Nasra · HBO-verpleegkundige",
} as const;

/* De boekingspagina: de laatste meter, volledig in eigen hand.
   Geen verkooppraatje-energie; de-risken en ruimte geven. */
export const MATCHCALL_PAGE = {
  label: "GRATIS MATCH-CALL · 15 MINUTEN",
  headline: "Eén gesprek. Geen verplichtingen.",
  intro:
    "Je spreekt Nasra zelf, niet een team. Jullie kijken samen of jouw vraag en haar manier van werken bij elkaar passen. Meer is het niet, en dat is precies genoeg.",
  watWel: [
    "Je vertelt wat er speelt, in jouw woorden",
    "Nasra stelt vragen en deelt hoe zij ernaar kijkt",
    "Past het? Dan hoor je hoe een traject eruit zou zien",
  ],
  watNiet:
    "Geen script, geen druk om te beslissen. Past het niet, dan zegt Nasra dat gewoon en denkt ze mee over wat wel bij je past.",
  agendaLabel: "KIES EEN MOMENT",
  fallbackText: "Opent de agenda hieronder niet?",
  fallbackCta: "Open de agenda direct",
} as const;

/* De verschuiving: van overleven naar begrijpen. Brug tussen
   herkenning en methode; uitkomst-taal zonder beloftes. */
export const VAN_NAAR = {
  label: "DE VERSCHUIVING",
  headline: "Wat er verandert als je je lichaam leert lezen",
  paren: [
    {
      van: "Moe ondanks acht uur slaap",
      naar: "Energie waar je dag op kan leunen",
    },
    {
      van: "Elke maand pijn die je wegdrukt",
      naar: "Een cyclus die je begrijpt en voelt aankomen",
    },
    {
      van: "Van arts naar arts, niemand kijkt verder",
      naar: "Eén iemand die het hele plaatje ziet",
    },
    {
      van: "Vechten tegen je lichaam",
      naar: "Leven mét je lichaam",
    },
  ],
} as const;

/* Jouw eerste drie maanden: maakt het hoofdaanbod tastbaar.
   Inspanningsgericht geformuleerd, geen resultaatbeloftes. */
export const TIJDLIJN = {
  label: "ZO ZIET HET ERUIT",
  headline: "Jouw eerste drie maanden",
  intro:
    "Geen losse tips, een opbouw. Dit is hoe The Body & Being Guide zich ontvouwt.",
  maanden: [
    {
      index: "Maand 1",
      title: "Het fundament",
      body: "Diepe intake en je Elementenprofiel. Nasra bouwt jouw Blueprint van 50+ pagina's en jullie starten bij bewustzijn: wat zegt je lichaam eigenlijk?",
    },
    {
      index: "Maand 2",
      title: "Voeden en reguleren",
      body: "De Fasekeuken gaat open: eten per cyclusfase, bloedsuiker als basis, je zenuwstelsel leren kalmeren. Maandelijkse deep dive plus WhatsApp-lijn met Nasra.",
    },
    {
      index: "Maand 3",
      title: "Jouw systeem",
      body: "Hormonen en cyclussynchronisatie vallen op hun plek. Je leert je eigen patronen lezen, zodat je verder kunt zonder afhankelijk te blijven.",
    },
  ],
} as const;

export const HERKENNING = {
  headline: "Je bent het contact met jezelf kwijtgeraakt.",
  signals: [
    "De vermoeidheid die niet weggaat, hoe lang je ook slaapt",
    "De mist in je hoofd die je 'stress' noemt",
    "De stemmingswisselingen waarvan je denkt: dit ben ik toch niet?",
    "De pijn die je elke maand accepteert alsof het normaal is",
  ],
  body: "Je zoekt hulp, maar krijgt de pil als oplossing of de boodschap dat het erbij hoort.",
  deepRoseQuote: "Het hoort er niet bij!",
} as const;

export const METHODIEK = {
  label: "DE KARTI METHODE",
  headline: "Ik start niet bij je hormonen. Ik start bij jou.",
  intro:
    "Vier pijlers, altijd in dezelfde volgorde. Omdat klachten zelden beginnen waar ze pijn doen.",
  pijlers: [
    {
      index: "01",
      title: "Emotionele heling",
      body: "Alles begint bij bewustzijn. Onuitgesproken stress en oude patronen slaan zich op in je lichaam. We maken ze zichtbaar en doorbreken ze.",
    },
    {
      index: "02",
      title: "Darmen & voeding",
      body: "Je bloedsuiker en je darmen dragen je energie, je stemming en je hormonen. Hier leggen we het fundament, afgestemd op jou.",
    },
    {
      index: "03",
      title: "Hormonen",
      body: "Je hormonen zijn geen vijand, ze zijn een boodschapper. We herstellen de balans met voeding, ritme en gerichte ondersteuning.",
    },
    {
      index: "04",
      title: "Cyclussynchronisatie",
      body: "Vier fases, vier seizoenen. Je leert leven met je cyclus in plaats van ertegen. Winter, lente, zomer en herfst, elke maand opnieuw.",
    },
  ],
  closing: "Deze volgorde is geen toeval. Het is de reden dat het werkt.",
} as const;

export const BOUWSTENEN = {
  headline: "De bouwstenen van jouw transformatie",
  intro:
    "Alles wordt persoonlijk samengesteld door Nasra zelf. Geen team, geen standaardformulieren.",
  cards: [
    {
      index: "01",
      title: "Jouw Blueprint",
      body: "Jouw persoonlijke handleiding van meer dan 50 pagina's op basis van jouw hormonen, darmen, emotionele patronen en je cyclus.",
    },
    {
      index: "02",
      title: "Elementenprofiel",
      body: "Water, vuur, aarde of lucht. Jouw element verklaart waarom jij anders reageert op stress, voeding en je cyclus. Het fundament van je traject.",
    },
    {
      index: "03",
      title: "Emotioneel Kompas",
      body: "Je emoties zijn geen ruis, ze zijn data. Leer de patronen herkennen die zich fysiek uiten en doorbreek zo de cyclus van stress en onbalans.",
    },
    {
      index: "04",
      title: "Het Cyclus Seizoensplan",
      body: "Elke fase van je cyclus vraagt iets anders. Je ontvangt een compleet protocol voor voeding, beweging, energie en rust.",
    },
    {
      index: "05",
      title: "De Fasekeuken",
      body: "Wat je eet in week 1 is niet wat je nodig hebt in week 3. Je ontvangt fase-specifieke voedingslijsten en recepten op maat.",
    },
    {
      index: "06",
      title: "Het Rustprotocol",
      body: "Je zenuwstelsel bepaalt hoe je herstelt. Je ontvangt een protocol op maat voor rust, slaap en de regulatie van je zenuwstelsel, afgestemd op jouw profiel.",
    },
  ],
  closingQuote: "Alleen jij, je lichaam en de begeleiding die je verdient.",
} as const;

export const NASRA = {
  label: "OVER NASRA",
  headline: "Ik zag wat niemand zag: de verbinding tussen alles.",
  body: [
    "Als HBO-verpleegkundige zag ik van dichtbij hoe het medische systeem vrouwen faalde. Losse symptomen, snelle oplossingen, en niemand die het geheel zag. Ik verliet het systeem om de vrouwen te helpen die tussen wal en schip vielen.",
    "Ik combineer mijn medische achtergrond met diepgaande kennis van hormonen, darmen, voeding en emotionele patronen. Waar nodig verweef ik elementen uit het islamitische kader, niet als religie, maar als praktische wijsheid voor rust en regulatie.",
  ],
  deepRoseQuote: "Gezondheid begint niet bij wat je eet. Het begint bij wat je voelt.",
  secondaryCta: "Plan een gratis match-call",
} as const;

export const TRAJECTEN = {
  headline: "The Karti Way",
  subline: "Drie wegen. Eén richting: terug naar jezelf.",
  cards: [
    {
      tier: "EENMALIGE DEEP DIVE",
      name: "De Inzicht Sessie",
      price: "€ 295",
      body: "Helderheid over een specifieke klacht. In 1 sessie.",
      features: [
        "Intakevragen vooraf + kennismakingsgesprek",
        "60 minuten deep dive met Nasra (1-op-1)",
        "Persoonlijk advies en actieplan na afloop",
      ],
      featured: false,
    },
    {
      tier: "DE TRANSFORMATIE",
      name: "The Body & Being Guide",
      price: "€ 1.400",
      body: "De handleiding die je nooit hebt gekregen. Over jezelf.",
      features: [
        "Jouw persoonlijke Blueprint (50+ pagina's, op jouw profiel)",
        "Elementenprofiel: waarom jij anders reageert",
        "Psycho-emotioneel profiel: diepe patronen blootgelegd",
        "3 maanden intensieve begeleiding met Nasra",
        "Maandelijkse deep dive sessie (1-op-1)",
        "WhatsApp-toegang tot Nasra binnen het traject",
        "De Fasekeuken: jouw eetpatroon per fase, op maat",
      ],
      featured: true,
    },
    {
      tier: "HET VOLLEDIGE PAD",
      name: "The Embodiment Blueprint",
      price: "€ 3.000",
      body: "Alles uit de Body & Being Guide, plus:",
      features: [
        "Lab-analyse van je hormoonwaarden via een gecertificeerd laboratorium",
        "Verdieping op je labwaarden, vertaald naar je Blueprint",
        "2 extra deep dive sessies + priority support",
        "6 maanden toegang tot de WhatsApp supportlijn",
        "Persoonlijk supplementen- en herstelprotocol op maat",
      ],
      featured: false,
    },
  ],
  investeringLabel: "INVESTERING",
  closingQuote:
    "Dit is niet voor vrouwen op zoek naar een magic pill. Dit is voor vrouwen die bereid zijn zichzelf te ontmoeten.",
  closingBody:
    "Na drie maanden begrijp je waarom je reageert zoals je reageert. Je hebt een systeem dat werkt. Voor de rest van je leven.",
  finalCta: "Plan mijn gratis match-call",
} as const;

/* Curatie juni 2026: eczeem-testimonial (genezingsclaim huidaandoening)
   uit de launch-set; arts-vergelijkende TITELS verzacht. Quotes zelf zijn
   citaten en worden nooit herschreven, alleen geselecteerd. */
export const TESTIMONIALS = {
  headline: "Vrouwen die je voorgingen",
  expandLabel: "Lees meer verhalen",
  collapseLabel: "Toon minder",
  items: [
    {
      title: "Eindelijk écht gezien",
      quote:
        "Ik voel me eindelijk echt gezien in wat ik doormaak. Nasra luistert, denkt mee en geeft praktische handvatten die werken. Het is geen protocol, het is echt op mij afgestemd.",
      name: "Lamya",
    },
    {
      title: "Geloof en gezondheid als eenheid",
      quote:
        "Wat ik zo fijn vond, is dat mijn geloof en mijn gezondheid niet gescheiden werden. Nasra snapt beide werelden en weet ze samen te brengen zonder dat één de ander overstemt.",
      name: "Sarah",
    },
    {
      title: "Mijn cyclus compleet veranderd",
      quote:
        "Mijn cyclus is compleet veranderd. Geen pijn meer, geen extreme stemmingswisselingen. Ik wist niet dat het zó anders kon voelen. Ik wilde dat ik dit tien jaar eerder had gedaan.",
      name: "Delayla",
    },
    {
      title: "Eindelijk het hele plaatje",
      quote:
        "Mijn huisarts zei dat mijn bloedwaarden 'prima' waren. Nasra zag in één gesprek waar het werkelijk zat. Zij kijkt naar het systeem, niet naar losse labels.",
      name: "Yasmin",
    },
    {
      title: "Pijn eindelijk draaglijk",
      quote:
        "De pijn tijdens mijn menstruatie is voor het eerst in mijn leven draaglijk geworden. Ik had geaccepteerd dat dit erbij hoorde. Het hoorde er niet bij.",
      name: "Sanne",
    },
    {
      title: "Scherp, warm en precies",
      quote:
        "Ik ben van arts naar arts gegaan. Nasra zag binnen twee gesprekken wat niemand had gezien. Haar blik is scherp, warm en ongelooflijk precies.",
      name: "Sofia",
    },
    {
      title: "Twee weken, al verschil",
      quote:
        "Ik voelde al binnen twee weken een duidelijk verschil in energie en focus. Mijn hoofd was stiller, mijn lijf lichter. Dat had ik niet verwacht dat zó snel kon.",
      name: "Soraya",
    },
    {
      title: "Veilige ruimte om te helen",
      quote:
        "Nasra creëert een veilige ruimte waarin je echt kunt helen. Ze oordeelt niet, ze vertraagt je waar nodig en wijst je aan waar je zelf al het antwoord had.",
      name: "Noor",
    },
    {
      title: "50+ pagina's handleiding",
      quote:
        "Mijn Blueprint is meer dan 50 pagina's en leest als een brief aan mezelf. Alles klopt, tot aan details die ik nooit eerder had durven benoemen.",
      name: "Fatima",
    },
  ],
} as const;

/* Verdeeld bewijs: drie claim-arme quotes op de beslismomenten.
   Context-labels parafraseren alleen wat de quote zelf zegt. */
export const BEWIJS = {
  hero: {
    quote:
      "Ik voelde al binnen twee weken een duidelijk verschil in energie en focus. Mijn hoofd was stiller, mijn lijf lichter.",
    name: "Soraya",
    context: "na twee weken",
  },
  prijzen: {
    quote:
      "Mijn Blueprint is meer dan 50 pagina's en leest als een brief aan mezelf. Alles klopt, tot aan details die ik nooit eerder had durven benoemen.",
    name: "Fatima",
    context: "over haar Blueprint",
  },
  final: {
    quote:
      "Ik voel me eindelijk echt gezien in wat ik doormaak. Het is geen protocol, het is echt op mij afgestemd.",
    name: "Lamya",
    context: "over de begeleiding",
  },
} as const;

export const NEWSLETTER = {
  label: "NIEUWSBRIEF",
  headline: "Een brief van Nasra. Elke week.",
  body:
    "Schrijf je in voor een wekelijkse brief over hormonen, darmen, cyclus en alles wat artsen missen. Geen spam. Alleen wijsheid.",
  placeholder: "jouw@email.nl",
  cta: "Stuur me de brief",
  signoff: "Liefs, Nasra",
} as const;

export const INSTAGRAM = {
  label: "VOLG @KARTIHEALTH",
  headline: "Hier deel ik wat ik zie.",
  link: "https://instagram.com/kartihealth",
  handle: "@KARTIHEALTH",
  linkLabel: "Bekijk alles",
} as const;

export const MATCHCALL = {
  label: "THE KARTI WAY",
  headline: "Ben jij klaar om je lichaam te leren begrijpen?",
  /* Geen urgentie, geen druk: de-risk regels vanuit overvloed. */
  derisk: [
    "Je spreekt Nasra zelf, vijftien minuten, gratis.",
    "Geen script en geen verplichting. Jullie kijken alleen of het past.",
    "Past het niet, dan hoor je dat gewoon, met een eerlijke gedachte over wat wel bij je past.",
  ],
  cta: "Plan mijn gratis match-call",
  ctaSub: "GRATIS · 15 MINUTEN · VRIJBLIJVEND",
  closing: [
    "Je lichaam liegt niet. Het vraagt om aandacht.",
    "En jij verdient het om te luisteren.",
  ],
} as const;

export const FOOTER = {
  tagline: "WIJSHEID VAN HET VROUWENLICHAAM",
  disclaimer: "Karti biedt 1:1 begeleiding, geen medische zorg.",
  contact: {
    instagram: "instagram.com/kartihealth",
    email: "info@kartihealth.com",
  },
  links: [
    { href: "#methode", label: "Methode" },
    { href: "#nasra", label: "Over Nasra" },
    { href: "#bouwstenen", label: "Bouwstenen" },
    { href: "#trajecten", label: "The Karti Way" },
  ],
  legal: "© 2026 Karti Health",
  legalLinks: [
    { href: "/privacy", label: "Privacy" },
    { href: "/voorwaarden", label: "Voorwaarden" },
  ],
} as const;
