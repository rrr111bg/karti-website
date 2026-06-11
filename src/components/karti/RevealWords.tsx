"use client";

import type { CSSProperties } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Kop-reveal per woord: kalm, editorial, responsive-veilig (geen
 * regel-splitsing nodig). Verborgen beginstaat alleen onder html.js;
 * reduced-motion krijgt via useScrollReveal direct de eindstaat.
 */
export function RevealWords({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, inView } = useScrollReveal<HTMLHeadingElement>({
    threshold: 0.4,
  });
  const words = text.split(" ");

  return (
    <h2 ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className={`reveal-word${inView ? " in" : ""}`}
          style={{ transitionDelay: `${i * 26}ms` }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}
