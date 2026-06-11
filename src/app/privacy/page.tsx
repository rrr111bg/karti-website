import type { Metadata } from "next";
import { LegalShell } from "@/components/karti/LegalShell";

export const metadata: Metadata = {
  title: "Privacybeleid · Karti",
  description:
    "Hoe Karti Health met je gegevens omgaat: welke gegevens we verwerken, waarom, hoe lang, en welke rechten je hebt.",
};

/* Concept opgesteld juni 2026; laten toetsen door een jurist vóór
   substantiële wijzigingen in de dienstverlening. */
export default function PrivacyPage() {
  return (
    <LegalShell title="Privacybeleid" updated="11 JUNI 2026">
      <p>
        Karti Health (&quot;Karti&quot;, &quot;wij&quot;) biedt 1:1 begeleiding
        voor vrouwengezondheid via kartihealth.com. We gaan terughoudend en
        zorgvuldig met je gegevens om: we verzamelen zo min mogelijk, verkopen
        nooit iets door en gebruiken geen tracking-cookies. Vragen? Mail naar{" "}
        <a href="mailto:info@kartihealth.com">info@kartihealth.com</a>.
      </p>

      <h2>Wie is verantwoordelijk</h2>
      <p>
        Karti Health is de verwerkingsverantwoordelijke voor de gegevens die
        via deze website worden verwerkt. Contact:{" "}
        <a href="mailto:info@kartihealth.com">info@kartihealth.com</a>.
      </p>

      <h2>Welke gegevens we verwerken, en waarom</h2>
      <ul>
        <li>
          <strong>Boeking van een match-call (Calendly).</strong> Als je een
          gratis match-call plant, vraagt onze agenda-partner Calendly je naam,
          e-mailadres en telefoonnummer. Die gegevens gebruiken we alleen om
          het gesprek in te plannen, te bevestigen en eraan te herinneren.
        </li>
        <li>
          <strong>Begeleiding.</strong> Word je cliënt, dan deel je informatie
          over je gezondheid en leefstijl met Nasra. Die informatie wordt
          alleen gebruikt voor jouw persoonlijke begeleiding, wordt nooit
          gedeeld met derden en wordt vertrouwelijk behandeld.
        </li>
        <li>
          <strong>E-mailcontact.</strong> Mail je ons, dan bewaren we de
          correspondentie zo lang dat nodig is om je vraag af te handelen.
        </li>
        <li>
          <strong>Websitestatistiek (Plausible).</strong> We meten bezoek met
          Plausible Analytics: cookieloos en zonder persoonsgegevens. We zien
          bijvoorbeeld hoeveel bezoekers een pagina heeft, niet wie jij bent.
          Daarom heeft deze site ook geen cookiebanner nodig.
        </li>
        <li>
          <strong>Betaling (Mollie).</strong> Betalingen verlopen via Mollie
          (o.a. iDEAL). Mollie verwerkt je betaalgegevens onder eigen
          verantwoordelijkheid; wij zien geen rekeninggegevens.
        </li>
        <li>
          <strong>Hosting (Netlify).</strong> Onze hostingpartij verwerkt
          technische logbestanden (zoals IP-adres) om de site veilig en
          bereikbaar te houden.
        </li>
      </ul>

      <h2>Grondslag en bewaartermijnen</h2>
      <p>
        We verwerken gegevens op basis van de uitvoering van de overeenkomst
        (je boeking of traject), je toestemming, of ons gerechtvaardigd belang
        bij een veilige, werkende website. We bewaren gegevens niet langer dan
        nodig: boekingsgegevens en correspondentie zo lang ze nodig zijn voor
        de dienstverlening, en daarna alleen wat wettelijk verplicht is (zoals
        facturen, 7 jaar voor de Belastingdienst).
      </p>

      <h2>Met wie we gegevens delen</h2>
      <p>
        Alleen met de verwerkers die hierboven staan (Calendly, Plausible,
        Mollie, Netlify), elk voor hun eigen taak en onder
        verwerkersafspraken. We verkopen of verhuren nooit gegevens. Sommige
        verwerkers (zoals Calendly en Netlify) zijn gevestigd in de Verenigde
        Staten; doorgifte gebeurt op basis van het EU-VS Data Privacy
        Framework of standaardcontractbepalingen.
      </p>

      <h2>Jouw rechten</h2>
      <p>
        Je mag je gegevens inzien, laten corrigeren of laten verwijderen, je
        toestemming intrekken, bezwaar maken tegen verwerking en je gegevens
        laten overdragen. Mail daarvoor naar{" "}
        <a href="mailto:info@kartihealth.com">info@kartihealth.com</a>; we
        reageren binnen 30 dagen. Niet tevreden? Je kunt een klacht indienen
        bij de Autoriteit Persoonsgegevens.
      </p>

      <h2>Beveiliging</h2>
      <p>
        De site draait volledig via een versleutelde verbinding (HTTPS) en we
        beperken de toegang tot gegevens tot wat strikt nodig is voor de
        begeleiding.
      </p>

      <h2>Wijzigingen</h2>
      <p>
        Als we dit beleid aanpassen, publiceren we de nieuwe versie op deze
        pagina met een nieuwe datum.
      </p>
    </LegalShell>
  );
}
