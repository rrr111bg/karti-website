"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/* NightTransition: de Dawn-naar-Night overgang als bewust scroll-moment
   tussen Tijdlijn en Testimonials. De basis is een statisch warm
   schemerverloop (precies wat no-JS en reduced-motion zien); met scroll
   stijgt een fijne gouden maan en lichten gold-dot-sterren op richting
   het noir-einde. Puur decoratief, transform/opacity-only, en bewust
   géén section[id]: de ScrollThread-ticks blijven ongemoeid. */

const STARS: { left: string; top: string; size: number; o: number }[] = [
  { left: "8%", top: "62%", size: 3, o: 0.5 },
  { left: "16%", top: "78%", size: 2, o: 0.35 },
  { left: "24%", top: "55%", size: 2, o: 0.4 },
  { left: "33%", top: "84%", size: 3, o: 0.55 },
  { left: "46%", top: "70%", size: 2, o: 0.3 },
  { left: "58%", top: "88%", size: 3, o: 0.5 },
  { left: "67%", top: "60%", size: 2, o: 0.4 },
  { left: "76%", top: "76%", size: 3, o: 0.55 },
  { left: "86%", top: "64%", size: 2, o: 0.35 },
  { left: "93%", top: "82%", size: 2, o: 0.45 },
];

export function NightTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const moonY = useTransform(
    scrollYProgress,
    [0.15, 0.8],
    reduce ? [0, 0] : [110, -30]
  );
  const moonOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.55],
    reduce ? [1, 1] : [0, 1]
  );
  const starsOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.8],
    reduce ? [0.9, 0.9] : [0, 0.9]
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="night-transition pointer-events-none relative h-[32vh] lg:h-[50vh] overflow-clip"
    >
      <motion.div
        className="absolute left-1/2 top-[38%] -translate-x-1/2"
        style={{ y: moonY, opacity: moonOpacity }}
      >
        <svg width="132" height="132" viewBox="0 0 132 132" fill="none">
          <circle
            cx="66"
            cy="66"
            r="26"
            stroke="#c9a854"
            strokeOpacity="0.8"
            strokeWidth="1"
          />
          <circle
            cx="66"
            cy="66"
            r="46"
            stroke="#c9a854"
            strokeOpacity="0.3"
            strokeWidth="0.75"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="0.55 0.45"
            transform="rotate(-64 66 66)"
          />
        </svg>
      </motion.div>
      <motion.div className="absolute inset-0" style={{ opacity: starsOpacity }}>
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              background: "#e2cda0",
              opacity: s.o,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
