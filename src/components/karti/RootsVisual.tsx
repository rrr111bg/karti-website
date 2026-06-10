"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import {
  ROOT_BRANCHES,
  branchColor,
  branchDelayMs,
  branchDurMs,
  branchOpacity,
  branchPathD,
  branchWidth,
  tipDots,
} from "@/lib/roots";

/**
 * Wortelsysteem-visual met drie progressieve lagen:
 *
 * 1. SVG (server-gerenderd, altijd aanwezig) — tekent zichzelf met pure
 *    CSS-animatie, dus ook in Instagram/TikTok in-app browsers en zonder JS.
 * 2. WebGL-scene (lazy) — alleen geladen op apparaten die het aantoonbaar
 *    aankunnen, buiten in-app browsers, na first paint, in idle time.
 * 3. prefers-reduced-motion — volgroeid statisch beeld, geen beweging.
 */

const KartiRootsScene = dynamic(() => import("./KartiRootsScene"), {
  ssr: false,
});

const IN_APP_BROWSER =
  /instagram|fban|fbav|fb_iab|tiktok|musical_ly|bytedance|snapchat|pinterest|line\//i;

function useGlEligible(inView: boolean): boolean {
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    if (!inView || eligible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
    };
    if (nav.connection?.saveData) return;
    if (/2g/.test(nav.connection?.effectiveType ?? "")) return;
    if ((nav.deviceMemory ?? 8) < 4) return;
    if ((navigator.hardwareConcurrency ?? 8) < 4) return;
    if (IN_APP_BROWSER.test(navigator.userAgent)) return;

    // WebGL2-probe; failIfMajorPerformanceCaveat weert software-rendering
    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = document
        .createElement("canvas")
        .getContext("webgl2", { failIfMajorPerformanceCaveat: true });
    } catch {
      return;
    }
    if (!gl) return;
    gl.getExtension("WEBGL_lose_context")?.loseContext();

    // Pas laden als de main thread er ruimte voor heeft
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => setEligible(true), {
        timeout: 2500,
      });
    } else {
      timeoutId = window.setTimeout(() => setEligible(true), 1400);
    }
    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [inView, eligible]);

  return eligible;
}

export function RootsVisual({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [glActive, setGlActive] = useState(false);
  const eligible = useGlEligible(inView);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // fallback voor zeer oude browsers: async, buiten de render-cyclus
      const t = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dots = tipDots();

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 14%, black 78%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 14%, black 78%, transparent 100%)",
      }}
    >
      <svg
        className={`roots-svg w-full h-full${glActive ? " gl-active" : ""}`}
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
        role="presentation"
      >
        {ROOT_BRANCHES.map((b) => (
          <path
            key={b.id}
            className="roots-path"
            d={branchPathD(b)}
            stroke={branchColor(b.depth)}
            strokeWidth={branchWidth(b.depth)}
            strokeLinecap="round"
            opacity={branchOpacity(b.depth)}
            style={
              {
                "--len": `${Math.ceil(b.length * 1.1)}`,
                "--dur": `${Math.round(branchDurMs(b))}ms`,
                "--delay": `${Math.round(branchDelayMs(b))}ms`,
              } as CSSProperties
            }
          />
        ))}
        {dots.map((d, i) => (
          <circle
            key={i}
            className="roots-dot"
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={d.tone === "rose" ? "#8b3a4a" : "#b08d3e"}
            style={
              {
                "--delay": `${Math.round(d.delay)}ms`,
                "--dot-o": d.tone === "rose" ? 0.65 : 0.8,
              } as CSSProperties
            }
          />
        ))}
      </svg>

      {eligible && (
        <div className="absolute inset-0">
          <KartiRootsScene onReady={() => setGlActive(true)} />
        </div>
      )}
    </div>
  );
}
