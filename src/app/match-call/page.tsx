import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendlyEmbed } from "@/components/karti/CalendlyEmbed";
import { CALENDLY_URL, HERO, MATCHCALL_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gratis match-call · 15 minuten · Karti",
  description:
    "Plan een gratis kennismaking van 15 minuten met Nasra. Geen script, geen verplichtingen: jullie kijken samen of het past.",
};

/**
 * De laatste meter, volledig in eigen hand: Dawn-branded boekingspagina
 * met de agenda direct ingebed. Eén taak, nul exits.
 */
export default async function MatchCallPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const utm =
    typeof sp.utm_content === "string" ? sp.utm_content : "matchcall-page";
  const fallbackUrl = `${CALENDLY_URL}?utm_source=website&utm_medium=cta&utm_campaign=matchcall&utm_content=${encodeURIComponent(utm)}`;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#f2eae0]/90 backdrop-blur-md border-b border-[#b08d3e]/25">
        <div className="container-wide flex items-center justify-between py-4">
          <Link href="/" className="t0-wordmark text-[#3d3228]">
            K A R T I
          </Link>
          <Link
            href="/"
            className="t6-label text-[#80662c] hover:text-[#3d3228] transition-colors"
          >
            Terug naar de site
          </Link>
        </div>
      </header>

      <main className="bg-[#f2eae0] min-h-screen">
        <div className="container-wide py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
            {/* Links: de-risk */}
            <div className="max-w-[560px]">
              <div className="t6-label text-[#80662c] mb-5">
                {MATCHCALL_PAGE.label}
              </div>
              <h1 className="t2-section mb-6">{MATCHCALL_PAGE.headline}</h1>
              <hr className="gold-divider mb-7" />
              <p className="t4-body text-[#2e2622] mb-9">
                {MATCHCALL_PAGE.intro}
              </p>

              <ol className="flex flex-col gap-5 mb-9">
                {MATCHCALL_PAGE.watWel.map((stap, i) => (
                  <li key={stap} className="flex items-start gap-4">
                    <span
                      className="flex-shrink-0 w-[30px] h-[30px] rounded-full border border-[#b08d3e]/50 flex items-center justify-center font-[family-name:var(--font-wordmark)] text-[#80662c]"
                      style={{ fontSize: "14px" }}
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <span className="t4-body text-[#2e2622]" style={{ fontSize: "17px" }}>
                      {stap}
                    </span>
                  </li>
                ))}
              </ol>

              <p
                className="font-[family-name:var(--font-heading)] italic text-[#8b3a4a] mb-10"
                style={{ fontSize: "clamp(18px, 1.6vw, 22px)", lineHeight: 1.5 }}
              >
                {MATCHCALL_PAGE.watNiet}
              </p>

              {/* klein geworteld portret: zij weet wie ze gaat spreken */}
              <div className="flex items-center gap-5">
                <div className="relative w-[72px] h-[72px] flex-shrink-0">
                  <div
                    aria-hidden
                    className="absolute -inset-2 rounded-full border border-[#c9a854]/40"
                  />
                  <div className="relative w-full h-full rounded-full overflow-hidden border border-[#b08d3e]/60 bg-[#faf6f0]">
                    <Image
                      src="/images/nasra-closeup.jpg"
                      alt="Nasra"
                      fill
                      sizes="72px"
                      className="object-cover scale-[1.04]"
                    />
                  </div>
                </div>
                <div className="t4-body text-[#2e2622]" style={{ fontSize: "15px" }}>
                  {HERO.trustLine}
                </div>
              </div>
            </div>

            {/* Rechts: de agenda zelf */}
            <div>
              <div className="t6-label text-[#80662c] mb-4">
                {MATCHCALL_PAGE.agendaLabel}
              </div>
              <CalendlyEmbed utmContent={utm} />
              <p className="t4-body text-[#6e6557] mt-4" style={{ fontSize: "14px" }}>
                {MATCHCALL_PAGE.fallbackText}{" "}
                <a
                  href={fallbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[#b08d3e] underline-offset-4 hover:text-[#3d3228]"
                >
                  {MATCHCALL_PAGE.fallbackCta}
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
