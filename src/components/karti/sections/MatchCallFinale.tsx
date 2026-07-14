"use client";

import Link from "next/link";
import { ArchitecturalArcIcon } from "@/components/icons";
import { MATCHCALL, BEWIJS } from "@/lib/content";
import { EVENT_MATCHCALL, matchCallHref } from "@/lib/links";
import { voorkomWees } from "@/lib/tekst";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealWords } from "@/components/karti/RevealWords";
import { MagneticButton } from "@/components/karti/MagneticButton";
import { DeriskDots } from "@/components/karti/DeriskDots";
import { QuoteBand } from "./QuoteBand";

/* Match-call finale: immersive-minimal Night Bloom slot.
   Eén gecentreerde adem van een volle viewport: eyebrow, kop, drie kalme
   de-risk regels (gestaggerd), bewijs op het beslismoment, de magnetische
   CTA en de poëtische sign-off die regel voor regel oplicht. */
export function MatchCallFinale() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const { ref: refClosing, inView: closingInView } =
    useScrollReveal<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section
      id="matchcall"
      className="relative night-bloom py-20 lg:py-28 lg:min-h-[100dvh] lg:flex lg:flex-col lg:justify-center overflow-hidden"
    >
      <div className="velvet-texture" />
      {/* decoratie alleen in de bovenste helft: de onderste helft blijft stil */}
      <ArchitecturalArcIcon
        aria-hidden
        className="absolute -right-40 top-0 -translate-y-1/3 w-[720px] h-[720px] text-[#c9a854] opacity-[0.06]"
      />
      <div className="container-narrow relative text-center">
        <div className="t6-label text-[#e2cda0] mb-5 lg:mb-6">{MATCHCALL.label}</div>
        <RevealWords
          text={MATCHCALL.headline}
          className="t1-hero text-[#fbf7f3] mb-8 lg:mb-10 text-balance"
        />
        <hr
          className="mx-auto mb-8 lg:mb-10"
          style={{ width: 80, height: 1, border: 0, background: "#c9a854", opacity: 0.8 }}
        />
        {/* De-risk in plaats van druk: wat het is, wat het niet is */}
        <div ref={ref} className="max-w-[560px] mx-auto flex flex-col gap-4">
          {MATCHCALL.derisk.map((line, i) => (
            <p
              key={line}
              className={`t4-body text-balance text-[#fbf7f3] scroll-reveal-init ${
                inView ? "scroll-reveal-in" : ""
              }`}
              style={{ fontSize: "17px", lineHeight: 1.6, transitionDelay: `${i * 160}ms` }}
            >
              {voorkomWees(line)}
            </p>
          ))}
        </div>

        {/* Bewijs exact op het beslismoment */}
        <div className="max-w-[560px] mx-auto mt-10 lg:mt-12 mb-10 lg:mb-12">
          <hr
            className="mx-auto mb-8"
            style={{ width: 56, height: 1, border: 0, background: "#c9a854", opacity: 0.55 }}
          />
          <QuoteBand
            quote={BEWIJS.final.quote}
            name={BEWIJS.final.name}
            context={BEWIJS.final.context}
            tone="dark"
          />
        </div>

        <div className="mb-5 flex justify-center">
          <MagneticButton>
            <Link
              href={matchCallHref("final")}
              className={`btn-primary-lg ${EVENT_MATCHCALL}`}
            >
              {MATCHCALL.cta}
            </Link>
          </MagneticButton>
        </div>
        <div className="t6-label text-[#e2cda0]">
          <DeriskDots text={MATCHCALL.ctaSub} className="justify-center" />
        </div>

        {/* poëtische sign-off: regel voor regel, groter en in gold-warm */}
        <div ref={refClosing} className="mt-14 lg:mt-20">
          {MATCHCALL.closing.map((line, i) => (
            <p
              key={line}
              className={`font-[family-name:var(--font-heading)] italic text-balance text-[#c9a854] mb-3 scroll-reveal-init ${
                closingInView ? "scroll-reveal-in" : ""
              }`}
              style={{
                fontSize: "clamp(22px, 2.2vw, 30px)",
                lineHeight: 1.5,
                transitionDelay: `${i * 260}ms`,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
