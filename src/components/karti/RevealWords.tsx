"use client";

import { Fragment, type CSSProperties } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Kop-reveal per woord: kalm, editorial, responsive-veilig (geen
 * regel-splitsing nodig). Verborgen beginstaat alleen onder html.js;
 * reduced-motion krijgt via useScrollReveal direct de eindstaat.
 * `as` bepaalt het element (default h2, backwards compatible);
 * `lines` rendert een bewuste regelval (elke regel een block-span)
 * met doorlopende woord-stagger; `staggerMs` regelt het tempo.
 */
export function RevealWords({
  text,
  lines,
  className = "",
  style,
  as: Tag = "h2",
  staggerMs = 26,
}: {
  text?: string;
  lines?: string[];
  className?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3" | "p";
  staggerMs?: number;
}) {
  const { ref, inView } = useScrollReveal<HTMLElement>({
    threshold: 0.4,
  });
  const allLines = lines ?? (text ? [text] : []);
  const label = allLines.join(" ");
  // startindex per regel (prefix-som), zodat de stagger doorloopt
  const lineWords = allLines.map((line) => line.split(" "));
  const lineStart = lineWords.map((_, li) =>
    lineWords.slice(0, li).reduce((sum, w) => sum + w.length, 0)
  );

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={style}
      aria-label={label}
    >
      {lineWords.map((words, li) => (
        <span key={li} className={allLines.length > 1 ? "block" : undefined}>
          {words.map((word, i) => (
            // de spatie staat BUITEN de inline-block span: binnenin wordt
            // hij door de inline-block-regelafsluiting weggecollapsed
            <Fragment key={`${word}-${i}`}>
              <span
                aria-hidden
                className={`reveal-word${inView ? " in" : ""}`}
                style={{ transitionDelay: `${(lineStart[li] + i) * staggerMs}ms` }}
              >
                {word}
              </span>
              {i < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
