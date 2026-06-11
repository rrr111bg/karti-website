"use client";

import { useRef, type ReactNode } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";

/**
 * Magnetische CTA, zwaar gedempt: de knop beweegt maximaal 4px richting
 * de cursor en veert kalm terug. rAF-lerp (zelfde patroon als RafTilt),
 * alleen met fijne pointer en zonder reduced-motion; anders een gewone
 * wrapper zonder gedrag.
 */
export function MagneticButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ tx: 0, ty: 0, cx: 0, cy: 0, raf: 0, running: false });
  const enabled = useFinePointer();

  const tick = () => {
    const s = state.current;
    s.cx += (s.tx - s.cx) * 0.16;
    s.cy += (s.ty - s.cy) * 0.16;
    if (ref.current) {
      ref.current.style.transform = `translate(${s.cx.toFixed(2)}px, ${s.cy.toFixed(2)}px)`;
    }
    if (Math.abs(s.tx - s.cx) > 0.05 || Math.abs(s.ty - s.cy) > 0.05) {
      s.raf = requestAnimationFrame(tick);
    } else {
      s.running = false;
    }
  };

  const kick = () => {
    if (!state.current.running) {
      state.current.running = true;
      state.current.raf = requestAnimationFrame(tick);
    }
  };

  if (!enabled) return <div className={`inline-block ${className}`}>{children}</div>;

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ willChange: "transform" }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        state.current.tx = Math.max(-4, Math.min(4, dx * 0.08));
        state.current.ty = Math.max(-3, Math.min(3, dy * 0.12));
        kick();
      }}
      onPointerLeave={() => {
        state.current.tx = 0;
        state.current.ty = 0;
        kick();
      }}
    >
      {children}
    </div>
  );
}
