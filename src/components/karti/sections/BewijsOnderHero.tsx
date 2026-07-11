"use client";

import { BEWIJS } from "@/lib/content";
import { QuoteBand } from "./QuoteBand";

export function BewijsOnderHero() {
  return (
    <section className="bg-[#f2eae0] pb-14 lg:pb-24">
      <div className="container-narrow">
        <hr className="gold-divider-short mx-auto mb-8 lg:mb-10" />
        <QuoteBand
          quote={BEWIJS.hero.quote}
          name={BEWIJS.hero.name}
          context={BEWIJS.hero.context}
        />
      </div>
    </section>
  );
}
