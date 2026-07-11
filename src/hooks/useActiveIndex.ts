"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useActiveIndex: welk blok (van `count`) staat nu in de kijkband rond
 * het viewport-midden? IntersectionObserver, geen scroll-listener.
 * Voor de tijdlijn-cijfer-crossfade e.d. Reduced-motion heeft geen
 * aparte tak nodig: de waarde volgt de scrollpositie, er beweegt niets
 * dat niet door CSS/Motion zelf al gedempt wordt.
 */
export function useActiveIndex<T extends HTMLElement>(count: number) {
  const nodes = useRef<(T | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = nodes.current.indexOf(entry.target as T);
          if (i >= 0) setActive(i);
        }
      },
      // kijkband: het middelste derde van de viewport
      { rootMargin: "-33% 0px -33% 0px", threshold: 0 }
    );
    for (const el of nodes.current.slice(0, count)) {
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [count]);

  const setRef = useCallback(
    (i: number) => (el: T | null) => {
      nodes.current[i] = el;
    },
    []
  );

  return { active, setRef };
}
