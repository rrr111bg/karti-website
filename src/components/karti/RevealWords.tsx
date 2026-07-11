"use client";

import type { CSSProperties } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Kop-reveal per woord: kalm, editorial, responsive-veilig (geen
 * regel-splitsing nodig). Verborgen beginstaat alleen onder html.js;
 * reduced-motion krijgt via useScrollReveal direct de eindstaat.
 * `as` bepaalt het element (default h2, backwards compatible).
 */
export function RevealWords({
  text,
  className = "",
  style,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const { ref, inView } = useScrollReveal<HTMLElement>({
    threshold: 0.4,
  });
  const words = text.split(" ");

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={style}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className={`reveal-word${inView ? " in" : ""}`}
          style={{ transitionDelay: `${i * 26}ms` }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
