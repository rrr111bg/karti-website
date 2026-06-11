import type { Metadata } from "next";
import { LegalShell } from "@/components/karti/LegalShell";

export const metadata: Metadata = {
  title: "Algemene voorwaarden · Karti",
  description:
    "De afspraken rond de begeleiding van Karti Health: wat je mag verwachten, betaling, verzetten van sessies en aansprakelijkheid.",
};

/* Concept opgesteld juni 2026; laten toetsen door een jurist vóór
   substantiële wijzigingen in de dienstverlening. */
export default function VoorwaardenPage() {
  return (
    <LegalShell title="Algemene voorwaarden" updated="11 JUNI 2026">
      <h2>1. Wie en wat</h2>
      <p>
        Deze voorwaarden gelden voor alle diensten van Karti Health
        (&quot;Karti&quot;): de gratis match-call, De Inzicht Sessie, The Body
        &amp; Being Guide en The Embodiment Blueprint. Door een traject of
        sessie af te nemen ga je akkoord met deze voorwaarden. Contact:{" "}
        <a href="mailto:info@kartihealth.com">info@kartihealth.com</a>.
      </p>

      <h2>2. Aard van de dienstverlening</h2>
      <p>
        Karti biedt persoonlijke begeleiding en coaching rond leefstijl,
        voeding, cyclus en welzijn, gegeven door Nasra, opgeleid als
        HBO-verpleegkundige. De begeleiding is <strong>geen medische zorg</strong>:
        zij vervangt geen arts, stelt geen diagnoses en is geen behandeling
        van ziekte. Stop nooit met medicatie en wijzig geen medische
        behandeling zonder overleg met je eigen arts. Waar een traject een
        lab-analyse bevat, wordt die uitgevoerd door een gecertificeerd
        extern laboratorium; de bespreking ervan binnen het traject is
        educatief en vervangt geen medisch consult.
      </p>

      <h2>3. Totstandkoming</h2>
      <p>
        De match-call is gratis en geheel vrijblijvend. Een overeenkomst komt
        pas tot stand wanneer je een traject of sessie schriftelijk (per
        e-mail of via de betaalpagina) bevestigt en de betaling is voldaan.
      </p>

      <h2>4. Prijzen en betaling</h2>
      <p>
        De actuele prijzen staan op kartihealth.com en zijn inclusief btw
        waar van toepassing. Betaling verloopt vooraf via Mollie (o.a.
        iDEAL). Karti hanteert geen kortingen en geen betaling in termijnen.
      </p>

      <h2>5. Bedenktijd</h2>
      <p>
        Koop je als consument op afstand, dan heb je 14 dagen wettelijke
        bedenktijd vanaf de bevestiging. Wil je dat de begeleiding al binnen
        die 14 dagen start, dan vragen we daarvoor je uitdrukkelijke
        instemming; bij herroeping betaal je dan naar rato voor het deel dat
        al geleverd is.
      </p>

      <h2>6. Verzetten en annuleren van sessies</h2>
      <p>
        Een geplande sessie kun je tot 24 uur van tevoren kosteloos
        verzetten. Bij afmelding binnen 24 uur of niet verschijnen vervalt de
        sessie. Karti mag bij overmacht een sessie verzetten; je krijgt dan
        zo snel mogelijk een nieuw moment aangeboden.
      </p>

      <h2>7. Jouw inzet en verantwoordelijkheid</h2>
      <p>
        De begeleiding is een inspanningsverplichting, geen
        resultaatgarantie: ervaringen van anderen zijn persoonlijk en geen
        belofte voor jouw situatie. Het resultaat hangt mede af van je eigen
        inzet en omstandigheden. Je blijft zelf verantwoordelijk voor
        beslissingen over je gezondheid; deel relevante medische informatie
        met je arts.
      </p>

      <h2>8. Vertrouwelijkheid en materialen</h2>
      <p>
        Alles wat je in de begeleiding deelt wordt vertrouwelijk behandeld.
        De materialen die je ontvangt (waaronder je persoonlijke Blueprint)
        zijn voor persoonlijk gebruik en mogen niet worden gedeeld of
        commercieel gebruikt.
      </p>

      <h2>9. Aansprakelijkheid</h2>
      <p>
        Karti is niet aansprakelijk voor indirecte schade. Eventuele
        aansprakelijkheid is beperkt tot het bedrag dat je voor de betreffende
        dienst hebt betaald, behalve bij opzet of bewuste roekeloosheid.
      </p>

      <h2>10. Klachten en toepasselijk recht</h2>
      <p>
        Loop je ergens tegenaan, mail dan eerst naar{" "}
        <a href="mailto:info@kartihealth.com">info@kartihealth.com</a>; we
        zoeken samen naar een oplossing. Op deze voorwaarden is Nederlands
        recht van toepassing.
      </p>
    </LegalShell>
  );
}
