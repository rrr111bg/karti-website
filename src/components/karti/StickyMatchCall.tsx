"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useScroll } from "motion/react";
import { HERO } from "@/lib/content";
import { EVENT_MATCHCALL, matchCallHref } from "@/lib/links";
import { ArrowRight } from "@/components/icons";

/**
 * Sticky match-call balk, alleen op mobiel (CSS verbergt ≥768px).
 * Verschijnt zodra de bezoeker voorbij de hero scrolt en wijkt wanneer
 * de grote match-call sectie zelf in beeld is (geen dubbele CTA).
 * Scrollpositie via Motion useScroll (geen window scroll-listener);
 * setState alleen op de drempel-flip, dus geen re-render per frame.
 */
export function StickyMatchCall() {
  const [pastHero, setPastHero] = useState(false);
  const [finalInView, setFinalInView] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const check = (y: number) =>
      setPastHero(y > window.innerHeight * 0.65);
    check(scrollY.get());
    return scrollY.on("change", check);
  }, [scrollY]);

  useEffect(() => {
    const target = document.getElementById("matchcall");
    if (!target || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setFinalInView(entries.some((e) => e.isIntersecting)),
      { threshold: 0.12 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  if (!pastHero || finalInView) return null;

  return (
    <div className="sticky-cta">
      <Link href={matchCallHref("sticky")} className={EVENT_MATCHCALL}>
        {HERO.primaryCta} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
