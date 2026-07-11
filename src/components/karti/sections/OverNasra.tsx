"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { NASRA } from "@/lib/content";
import { EVENT_MATCHCALL, matchCallHref } from "@/lib/links";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealWords } from "@/components/karti/RevealWords";
import { PhotoSlot } from "@/components/karti/PhotoSlot";

/* Over Nasra: overlap-editorial.
   De kop loopt over de volle breedte en het portret schuift er op lg+
   onder (negatieve top-marge): de regel eindigt óp de foto. Het portret
   draagt het gouden offset-frame, de circulaire close-up en een
   gereserveerd PhotoSlot-paneel voor de toekomstige editorial shoot.
   Geen eyebrow (label blijft in content.ts). */
export function OverNasra() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.25 });
  return (
    <section id="nasra" className="py-20 lg:py-44 bg-[#f5eded]/60 overflow-clip">
      <div className="container-wide">
        <hr className="gold-divider mb-8" />
        <RevealWords
          text={NASRA.headline}
          className="t2-section relative z-10 mb-10 lg:mb-0 lg:max-w-[900px]"
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-0 items-start">
          <div className="relative z-10 lg:pt-14">
            <div className="lg:max-w-[520px]">
              {NASRA.body.map((p, i) => (
                <p key={i} className="t4-body text-[#2e2622] mb-6">
                  {p}
                </p>
              ))}
              <p
                className="font-[family-name:var(--font-heading)] italic mt-8 mb-8"
                style={{
                  fontSize: "clamp(24px, 2.4vw, 34px)",
                  lineHeight: 1.35,
                  color: "#8b3a4a",
                }}
              >
                {NASRA.deepRoseQuote}
              </p>
              <Link
                href={matchCallHref("nasra")}
                className={`btn-ghost-link inline-flex items-center gap-1 ${EVENT_MATCHCALL}`}
              >
                {NASRA.secondaryCta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div ref={ref} className="relative lg:pl-16 lg:-mt-16">
            {/* Primary portrait - file: /public/images/nasra-portrait.jpg */}
            <div className="relative aspect-[4/5] w-full bg-[#d6ccbe] overflow-hidden">
              <Image
                src="/images/nasra-portrait.jpg"
                alt="Nasra in haar praktijk"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover object-center image-reveal-scale${
                  inView ? " in" : ""
                }`}
              />
            </div>
            {/* Fine gold frame outside portrait */}
            <div className="pointer-events-none absolute -inset-4 lg:inset-y-[-16px] lg:right-[-16px] lg:left-[48px] border border-[#b08d3e]/50" />
            {/* Small circular overlapping portrait - /public/images/nasra-closeup.jpg
                mobiel kleiner en binnen de kaart; vanaf lg overlappend */}
            <div className="absolute -bottom-6 left-3 w-[96px] h-[96px] lg:-bottom-10 lg:left-6 lg:w-[140px] lg:h-[140px] rounded-full border border-[#b08d3e]/60 overflow-hidden bg-[#faf6f0]">
              <Image
                src="/images/nasra-closeup.jpg"
                alt="Nasra close-up"
                fill
                sizes="140px"
                className="object-cover object-center"
              />
            </div>
            {/* Gereserveerd editorial-slot: bewust paneel tot de shoot er is */}
            <PhotoSlot
              id="nasra-editorial-01"
              spec="staand 4:5, min 1600px breed"
              className="hidden lg:block absolute -bottom-14 -right-6 w-[190px] aspect-[4/5]"
            />
            {/* 3 gold dots cluster */}
            <div className="absolute -top-6 -right-4 gold-dots-cluster">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
