"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * rAF-fallback voor de tilt-microinteractie: zelfde gedrag als MotionTilt
 * maar zonder library. Lerp-gebaseerd, stopt zodra de kaart tot rust komt.
 */
export default function RafTilt({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ tx: 0, ty: 0, cx: 0, cy: 0, raf: 0, running: false });

  useEffect(() => {
    const s = state.current;
    return () => cancelAnimationFrame(s.raf);
  }, []);

  const tick = () => {
    const s = state.current;
    s.cx += (s.tx - s.cx) * 0.12;
    s.cy += (s.ty - s.cy) * 0.12;
    if (ref.current) {
      ref.current.style.transform = `perspective(900px) rotateX(${s.cy.toFixed(
        3
      )}deg) rotateY(${s.cx.toFixed(3)}deg)`;
    }
    if (Math.abs(s.tx - s.cx) > 0.01 || Math.abs(s.ty - s.cy) > 0.01) {
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

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform" }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        state.current.tx = ((e.clientX - r.left) / r.width - 0.5) * 6.4;
        state.current.ty = -((e.clientY - r.top) / r.height - 0.5) * 5.2;
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
