"use client";

import { HERO } from "@/lib/content";
import { DeriskDots } from "@/components/karti/DeriskDots";

/**
 * TrustBand: dunne metadataband direct onder de hero. Vangt de
 * de-risk-tokens (gratis / 15 minuten / vrijblijvend) en de trustline
 * op die uit de hero-stapel verhuisd zijn; separators zijn de
 * architecturale gold dots, geen typografische puntjes.
 */
export function TrustBand() {
  return (
    <aside aria-label="Praktische informatie" className="trust-band bg-[#f2eae0]">
      <div className="container-wide flex flex-col items-center gap-2 py-4 md:flex-row md:justify-between md:gap-6 md:py-0 md:h-[56px]">
        <span className="t6-label text-[#6e6557] inline-flex items-center gap-3">
          <span className="gold-dot" aria-hidden />
          {HERO.trustLine}
        </span>
        <DeriskDots text={HERO.ctaSub} className="t6-label text-[#6e6557] justify-center" />
      </div>
    </aside>
  );
}
