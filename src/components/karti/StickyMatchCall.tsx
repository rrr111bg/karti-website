"use client";

import { useEffect, useState } from "react";
import { HERO, calendlyUrl } from "@/lib/content";
import { ArrowRight } from "@/components/icons";

/**
 * Sticky match-call balk, alleen op mobiel (CSS verbergt ≥768px).
 * Verschijnt zodra de bezoeker voorbij de hero scrolt en wijkt wanneer
 * de grote match-call sectie zelf in beeld is (geen dubbele CTA).
 */
export function StickyMatchCall() {
  const [pastHero, setPastHero] = useState(false);
  const [finalInView, setFinalInView] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setPastHero(window.scrollY > window.innerHeight * 0.65)
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

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
      <a
        href={calendlyUrl("sticky")}
        target="_blank"
        rel="noopener noreferrer"
        className="plausible-event-name=matchcall-click"
      >
        {HERO.primaryCta} <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}
