"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { voorkomWees } from "@/lib/tekst";

/* Verdeeld bewijs: één stem op het juiste moment */
export function QuoteBand({
  quote,
  name,
  context,
  tone = "light",
}: {
  quote: string;
  name: string;
  context: string;
  tone?: "light" | "dark";
}) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  const dark = tone === "dark";
  return (
    <div
      ref={ref}
      className={`scroll-reveal-init text-center ${inView ? "scroll-reveal-in" : ""}`}
    >
      <p
        className="font-[family-name:var(--font-heading)] italic mx-auto max-w-[680px] text-balance"
        style={{
          fontSize: "clamp(19px, 1.9vw, 26px)",
          lineHeight: 1.5,
          color: dark ? "#fbf7f3" : "#3d3228",
        }}
      >
        &ldquo;{voorkomWees(quote)}&rdquo;
      </p>
      <div className="mt-5">
        {/* dot ín de tekstflow: blijft aan de naam geplakt, ook bij wrap */}
        <span
          className="t6-label"
          style={{ color: dark ? "#e2cda0" : "#80662c" }}
        >
          <span className="gold-dot align-middle mr-3" aria-hidden />
          {name} · {context}
        </span>
      </div>
    </div>
  );
}
