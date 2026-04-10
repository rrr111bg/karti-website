import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const SearchIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const UserIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </svg>
);

export const BagIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 7h14l-1.2 12.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8L5 7Z" />
    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const StarIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7L12 17.3 5.7 21l1.7-7L2 9.2l7.1-.6L12 2z" />
  </svg>
);

export const LeafMark = (p: P) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M24 6c6 6 10 12 10 20a10 10 0 0 1-20 0c0-8 4-14 10-20z" />
    <path d="M24 14v24" />
    <path d="M24 22l5-5M24 22l-5-5M24 30l5-5M24 30l-5-5" />
  </svg>
);

export const HumanMark = (p: P) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="24" cy="12" r="4" fill="currentColor" />
    <path d="M14 40c2-8 6-12 10-12s8 4 10 12" />
  </svg>
);

export const SpiralMark = (p: P) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
    <circle cx="24" cy="24" r="3" />
    <circle cx="24" cy="24" r="8" />
    <circle cx="24" cy="24" r="13" />
    <circle cx="24" cy="24" r="18" />
  </svg>
);

export const SunburstMark = (p: P) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}>
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * Math.PI * 2) / 16;
      const x1 = 24 + Math.cos(angle) * 6;
      const y1 = 24 + Math.sin(angle) * 6;
      const x2 = 24 + Math.cos(angle) * 18;
      const y2 = 24 + Math.sin(angle) * 18;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
    })}
    <circle cx="24" cy="24" r="3" fill="currentColor" />
  </svg>
);

export const SunLogoMark = (p: P) => (
  <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}>
    <circle cx="60" cy="60" r="18" />
    <path d="M60 50 l8 14 h-16 z" fill="currentColor" stroke="none" />
    {Array.from({ length: 16 }).map((_, i) => {
      const a = (i * Math.PI * 2) / 16;
      return (
        <line
          key={i}
          x1={60 + Math.cos(a) * 24}
          y1={60 + Math.sin(a) * 24}
          x2={60 + Math.cos(a) * (i % 2 === 0 ? 48 : 38)}
          y2={60 + Math.sin(a) * (i % 2 === 0 ? 48 : 38)}
        />
      );
    })}
  </svg>
);

export const XIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L6 22H2.9l7.5-8.6L2 2h6.5l4.5 6.6L18.9 2Z" />
  </svg>
);
export const FacebookIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M13 22v-8h3l.5-4H13V7.5c0-1.2.3-2 2-2h2V2.1C16.6 2 15.4 2 14.2 2 11.6 2 10 3.6 10 6.4V10H7v4h3v8h3Z" />
  </svg>
);
export const YouTubeIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23 7.2s-.2-1.6-.9-2.3c-.8-.9-1.8-.9-2.3-1C16.3 3.6 12 3.6 12 3.6s-4.3 0-7.8.3c-.5.1-1.5.1-2.3 1-.7.7-.9 2.3-.9 2.3S0 9 0 10.9v1.8c0 1.8.2 3.6.2 3.6s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.8.2 7.5.3 7.5.3s4.3 0 7.8-.3c.5-.1 1.5-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.8.2-3.6v-1.8c0-1.9-.2-3.7-.2-3.7ZM9.6 14.6V8.4l5.6 3.1-5.6 3.1Z" />
  </svg>
);
export const PinterestIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.3-5.6s-.3-.7-.3-1.6c0-1.6.9-2.7 2-2.7.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 2 0 3.5-2.1 3.5-5.1 0-2.7-1.9-4.5-4.6-4.5-3.1 0-5 2.3-5 4.8 0 1 .4 2 .8 2.5.1.1.1.2.1.3l-.3 1.2c-.1.2-.2.3-.4.2-1.4-.6-2.2-2.6-2.2-4.2 0-3.4 2.5-6.6 7.3-6.6 3.8 0 6.8 2.7 6.8 6.4 0 3.8-2.4 6.9-5.8 6.9-1.1 0-2.2-.6-2.6-1.3l-.7 2.7c-.3 1-1 2.3-1.5 3A10 10 0 1 0 12 2Z" />
  </svg>
);
export const InstagramIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
  </svg>
);

/* ─── Karti custom marks ──────────────────────────────── */

export const GoldDotIcon = (p: P) => (
  <svg viewBox="0 0 10 10" fill="currentColor" {...p}>
    <circle cx="5" cy="5" r="3" />
  </svg>
);

export const GoldCircleIcon = (p: P) => (
  <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.6" {...p}>
    <circle cx="60" cy="60" r="58" />
  </svg>
);

export const ArchitecturalArcIcon = (p: P) => (
  <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8" {...p}>
    <path d="M10 190 A 180 180 0 0 1 190 10" />
    <path d="M40 190 A 150 150 0 0 1 190 40" />
  </svg>
);

export const GeometricLeafIcon = (p: P) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8" {...p}>
    <path d="M50 10 C 20 30, 20 70, 50 90 C 80 70, 80 30, 50 10 Z" />
    <path d="M50 10 L 50 90" />
  </svg>
);

export const WaterElementIcon = (p: P) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M32 8 C 20 24, 14 36, 14 44 A 18 18 0 0 0 50 44 C 50 36, 44 24, 32 8 Z" />
  </svg>
);

export const FireElementIcon = (p: P) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M32 6 C 36 18, 46 22, 46 36 A 14 14 0 0 1 18 36 C 18 28, 24 22, 26 18 C 28 22, 30 26, 32 26 C 32 18, 28 14, 32 6 Z" />
  </svg>
);

export const EarthElementIcon = (p: P) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="32" cy="32" r="24" />
    <path d="M8 32 h 48 M 32 8 v 48" />
    <path d="M14 18 C 22 22, 30 22, 50 16" />
    <path d="M12 46 C 22 42, 34 44, 52 48" />
  </svg>
);

export const AirElementIcon = (p: P) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M8 22 h 34 a 6 6 0 1 0 -6 -6" />
    <path d="M6 34 h 46 a 7 7 0 1 1 -7 7" />
    <path d="M10 46 h 26 a 5 5 0 1 1 -5 5" />
  </svg>
);

/* ─── Revision 2: Moon, Email, Bouwsteen-iconen ─────────── */

export const MoonIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17 12a8 8 0 0 1-11.3-7.3 0.6 0.6 0 0 1 0.9-0.6A9.2 9.2 0 1 0 17.9 18.4 0.6 0.6 0 0 1 17 12z" />
  </svg>
);

export const FullMoonIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="12" cy="12" r="7" />
  </svg>
);

export const EmailIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
);

/* 6 bouwsteen-iconen, naar brochure pagina 3 */

// 01 · Jouw Blueprint — 4-dots grid
export const BlueprintDotsIcon = (p: P) => (
  <svg viewBox="0 0 32 32" fill="currentColor" {...p}>
    <circle cx="10" cy="10" r="2" />
    <circle cx="22" cy="10" r="2" />
    <circle cx="10" cy="22" r="2" />
    <circle cx="22" cy="22" r="2" />
  </svg>
);

// 02 · Elementenprofiel — diamond outline
export const DiamondMarkIcon = (p: P) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 5 L27 16 L16 27 L5 16 Z" />
  </svg>
);

// 03 · Emotioneel Kompas — crosshair in circle
export const CrosshairCircleIcon = (p: P) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" {...p}>
    <circle cx="16" cy="16" r="11" />
    <path d="M16 3v6M16 23v6M3 16h6M23 16h6" />
    <circle cx="16" cy="16" r="1.6" fill="currentColor" />
  </svg>
);

// 04 · Het Cyclus Seizoensplan — open curl / swirl
export const CycleSpiralIcon = (p: P) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M26 16a10 10 0 1 1-10-10 10 10 0 0 1 7 17" />
    <path d="M23 13v4h4" />
  </svg>
);

// 05 · De Fasekeuken — up/down arrows
export const UpDownArrowsIcon = (p: P) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M11 5v22M5 11l6-6 6 6" />
    <path d="M21 27V5M15 21l6 6 6-6" />
  </svg>
);

// 06 · Het Rustprotocol — sine wave
export const SineWaveIcon = (p: P) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 16 Q 8 6 13 16 T 23 16 T 29 16" />
  </svg>
);
