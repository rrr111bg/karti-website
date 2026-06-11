"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { CALENDLY_URL } from "@/lib/content";

/**
 * Inline Calendly-agenda op eigen domein: de bezoekster verlaat het merk
 * niet meer op het beslismoment. UTM's gaan mee in de embed-URL, dus
 * Calendly registreert per boeking nog steeds welke CTA hem opleverde.
 * Brand-kleuren via Calendly's embed-parameters (Dawn-palet).
 */

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

export function CalendlyEmbed({ utmContent }: { utmContent?: string }) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const params = new URLSearchParams({
    hide_gdpr_banner: "1",
    primary_color: "b08d3e",
    text_color: "2e2622",
    background_color: "faf6f0",
    utm_source: "website",
    utm_medium: "cta",
    utm_campaign: "matchcall",
  });
  if (utmContent) params.set("utm_content", utmContent);
  const url = `${CALENDLY_URL}?${params.toString()}`;

  useEffect(() => {
    const el = holderRef.current;
    if (!scriptReady || !el || !window.Calendly) return;
    el.innerHTML = "";
    window.Calendly.initInlineWidget({ url, parentElement: el });
  }, [scriptReady, url]);

  return (
    <div>
      <div
        ref={holderRef}
        className="calendly-holder bg-[#faf6f0] border border-[#b08d3e]/30"
        aria-label="Agenda om een gratis match-call te plannen"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
    </div>
  );
}
