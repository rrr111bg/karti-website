"use client";

import { useMemo } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * WortelNetwerk — signature SVG from Brochure_Final.pdf page 3.
 * Deterministic "root network": ~60 dots + ~90 lines, drawn-in on scroll.
 *
 * Animation:
 *  - lines: stroke-dasharray draw-in, 1.4s ease-out, staggered by line index
 *  - dots:  fade-in + scale 0.6 → 1, 600ms ease-out, staggered by dot index
 *  - once per page-load, respects prefers-reduced-motion
 */

type Dot = { x: number; y: number; r: number; color: string };
type Line = { x1: number; y1: number; x2: number; y2: number; len: number };

const VIEW_W = 600;
const VIEW_H = 360;

function buildNetwork(): { dots: Dot[]; lines: Line[] } {
  const palette = ["#d4a5a8", "#b06b72", "#c9a854", "#e2cda0"];
  const dots: Dot[] = [];

  // deterministic pseudo-random via sine-hash
  const rnd = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  for (let i = 0; i < 60; i++) {
    // organic cluster: mix grid + jitter
    const col = i % 10;
    const row = Math.floor(i / 10);
    const jitterX = (rnd(i + 1) - 0.5) * 52;
    const jitterY = (rnd(i + 17) - 0.5) * 44;
    const x = 40 + col * 58 + jitterX;
    const y = 30 + row * 56 + jitterY;
    const sizeRoll = rnd(i + 31);
    const r = sizeRoll < 0.45 ? 1.6 : sizeRoll < 0.8 ? 2.4 : 3.4;
    dots.push({ x, y, r, color: palette[i % palette.length] });
  }

  // lines: each dot connects to its 2 nearest neighbors (dedup pairs)
  const lines: Line[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < dots.length; i++) {
    const di = dots[i];
    const neighbors = dots
      .map((d, j) => ({ j, dist: Math.hypot(d.x - di.x, d.y - di.y) }))
      .filter((n) => n.j !== i)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 2);
    for (const n of neighbors) {
      const key = i < n.j ? `${i}-${n.j}` : `${n.j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const dj = dots[n.j];
      const len = Math.hypot(dj.x - di.x, dj.y - di.y);
      lines.push({ x1: di.x, y1: di.y, x2: dj.x, y2: dj.y, len });
    }
  }
  return { dots, lines };
}

export function WortelNetwerk() {
  const { dots, lines } = useMemo(() => buildNetwork(), []);
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.25 });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="mx-auto w-full max-w-[560px] lg:max-w-[640px] opacity-90"
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-auto"
        style={{ overflow: "visible" }}
      >
        {lines.map((l, i) => {
          const delay = i * 10;
          return (
            <line
              key={`l-${i}`}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="#b08d3e"
              strokeWidth={0.5}
              strokeLinecap="round"
              style={{
                opacity: 0.35,
                strokeDasharray: l.len,
                strokeDashoffset: inView ? 0 : l.len,
                transition: `stroke-dashoffset 1400ms cubic-bezier(.16,.84,.32,1) ${delay}ms`,
              }}
            />
          );
        })}
        {dots.map((d, i) => {
          const delay = 200 + i * 16;
          return (
            <circle
              key={`d-${i}`}
              cx={d.x}
              cy={d.y}
              r={d.r}
              fill={d.color}
              style={{
                opacity: inView ? 0.85 : 0,
                transform: inView ? "scale(1)" : "scale(0.6)",
                transformOrigin: `${d.x}px ${d.y}px`,
                transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
