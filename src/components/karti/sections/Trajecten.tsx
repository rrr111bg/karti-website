"use client";

import Link from "next/link";
import { MoonIcon } from "@/components/icons";
import { TRAJECTEN, BEWIJS } from "@/lib/content";
import { EVENT_MATCHCALL, matchCallHref } from "@/lib/links";
import { RevealWords } from "@/components/karti/RevealWords";
import { TiltCard } from "@/components/karti/TiltCard";
import { QuoteBand } from "./QuoteBand";

/* Trajecten */
export function Trajecten() {
  return (
    <section id="trajecten" className="py-20 lg:py-40">
      <div className="container-wide">
        <div className="text-center mb-10 lg:mb-20">
          <div className="t0-wordmark text-[#b08d3e] mb-3 lg:mb-6">K A R T I</div>
          <RevealWords text={TRAJECTEN.headline} className="t2-section mb-4 lg:mb-6" />
          <hr className="gold-divider mx-auto mb-4 lg:mb-6" />
          <p className="t3-quote text-[#3d3228] max-w-[640px] mx-auto">
            {TRAJECTEN.subline}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TRAJECTEN.cards.map((card) => {
            const featured = card.featured;
            return (
              <TiltCard key={card.name} className="flex">
              <div
                className={`relative flex flex-col w-full p-10 card-lift ${
                  featured
                    ? "night-bloom border border-[#b08d3e] lg:-mt-6 lg:mb-0 card-lift-featured"
                    : "bg-[#faf6f0] border border-[#b08d3e]/30"
                }`}
              >
                {featured && <div className="velvet-texture" />}
                <div className="relative flex-1 flex flex-col">
                  <div
                    className={`t6-label mb-4 ${
                      featured ? "text-[#e2cda0]" : "text-[#80662c]"
                    }`}
                  >
                    {card.tier}
                  </div>
                  <h3
                    className="font-[family-name:var(--font-heading)] font-bold mb-4"
                    style={{
                      fontSize: "clamp(26px, 2.2vw, 32px)",
                      lineHeight: 1.15,
                      color: featured ? "#e2cda0" : "#3d3228",
                    }}
                  >
                    {card.name}
                  </h3>
                  <hr
                    className="mb-6"
                    style={{
                      width: 60,
                      height: 1,
                      border: 0,
                      background: featured ? "#c9a854" : "#b08d3e",
                      opacity: featured ? 0.9 : 0.5,
                    }}
                  />
                  <p
                    className="t4-body mb-6"
                    style={{ color: featured ? "#fbf7f3" : "#2e2622" }}
                  >
                    {card.body}
                  </p>
                  <ul className="flex flex-col gap-3 flex-1">
                    {card.features.map((f) => (
                      <li key={f} className="flex gap-3 items-start">
                        <MoonIcon
                          className="w-4 h-4 mt-[6px] flex-shrink-0"
                          style={{ color: featured ? "#e2cda0" : "#d4a5a8" }}
                        />
                        <span
                          className="t4-body"
                          style={{ color: featured ? "#fbf7f3" : "#2e2622" }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {/* Prijs gedempt: substantie leidt, investering sluit af */}
                  <div className="mt-8 pt-5 border-t border-current/15 flex items-baseline justify-between gap-3">
                    <span
                      className="t6-label"
                      style={{ color: featured ? "#e2cda0" : "#80662c" }}
                    >
                      {TRAJECTEN.investeringLabel}
                    </span>
                    <span
                      className="font-[family-name:var(--font-heading)]"
                      style={{
                        fontSize: "17px",
                        color: featured ? "#fbf7f3" : "#3d3228",
                      }}
                    >
                      {card.price}
                    </span>
                  </div>
                </div>
              </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Bewijs op het beslismoment: haar Blueprint, in klantenwoorden */}
        <div className="mt-12 lg:mt-16 max-w-[720px] mx-auto bg-[#faf6f0] border border-[#b08d3e]/30 px-8 py-10 lg:px-12">
          <QuoteBand
            quote={BEWIJS.prijzen.quote}
            name={BEWIJS.prijzen.name}
            context={BEWIJS.prijzen.context}
          />
        </div>
        <div className="mt-14 lg:mt-20 text-center max-w-[720px] mx-auto">
          <p className="t3-quote text-balance text-[#3d3228] mb-6">{TRAJECTEN.closingQuote}</p>
          <p className="t4-body text-balance text-[#6e6557] mb-12 max-w-[560px] mx-auto">{TRAJECTEN.closingBody}</p>
          <Link
            href={matchCallHref("trajecten")}
            className={`btn-primary-lg ${EVENT_MATCHCALL}`}
          >
            {TRAJECTEN.finalCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
