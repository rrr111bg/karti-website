/**
 * Wortelsysteem-generator — deterministisch (vaste seed), zodat de
 * SVG-fallback en de WebGL-laag exact dezelfde geometrie delen en het
 * beeld een consistent merk-asset is in plaats van een willekeurige demo.
 *
 * Brand-metafoor (karti-brand-system): wortelsysteem = verankering & groei.
 * Vertakkende dunne lijnen met gouden uiteinden; hoofdlijnen Aged Gold,
 * fijnste vertakkingen Sage Olive. Deep Rose alleen als kleinste accent.
 */

export type RootBranch = {
  /** Polyline-punten in viewBox-coördinaten (0..1000 × 0..600) */
  points: [number, number][];
  /** 0 = hoofdtak, hoger = fijnere vertakking */
  depth: number;
  /** Geschatte padlengte in viewBox-eenheden (voor dasharray + duur) */
  length: number;
  /** Vaste z-positie voor de 3D-laag (diepte-parallax) */
  z: number;
  id: number;
};

export type RootDot = {
  x: number;
  y: number;
  z: number;
  r: number;
  /** "gold" | "rose" — rose is het zeldzame accent */
  tone: "gold" | "rose";
  delay: number;
};

/* Vaste seed: 30 maart 2026, de dag van de brand-elevatie. Niet wijzigen. */
const SEED = 20260330;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Oorsprong van het stelsel: net rechts van het midden, bovenrand visual. */
export const ROOT_ORIGIN: [number, number] = [620, 26];

function generate(): RootBranch[] {
  const rng = mulberry32(SEED);
  const branches: RootBranch[] = [];
  let id = 0;

  function grow(
    x0: number,
    y0: number,
    angle: number,
    segLen: number,
    segments: number,
    depth: number,
    z: number
  ) {
    const points: [number, number][] = [[x0, y0]];
    let x = x0;
    let y = y0;
    let a = angle;
    let length = 0;

    for (let i = 0; i < segments; i++) {
      // organische drift: kalme richtingsverandering per segment
      a += (rng() - 0.5) * 0.42;
      // zwaartekracht: wortels buigen langzaam richting beneden
      const down = Math.PI / 2;
      a += (down - a) * 0.045;
      // kwantiseer naar 2 decimalen: SSR en client serialiseren dan
      // gegarandeerd identiek (transcendente functies kunnen per
      // V8-versie 1 ULP verschillen → hydration mismatch)
      const nx = Math.round((x + Math.cos(a) * segLen) * 100) / 100;
      const ny = Math.round((y + Math.sin(a) * segLen) * 100) / 100;
      const dx = nx - x;
      const dy = ny - y;
      length += Math.sqrt(dx * dx + dy * dy);
      x = nx;
      y = ny;
      points.push([x, y]);

      // vertakking halverwege en richting het einde
      const t = i / segments;
      if (depth < 3 && (t > 0.3 || depth === 0) && rng() < (depth === 0 ? 0.34 : 0.24)) {
        const side = rng() < 0.5 ? -1 : 1;
        grow(
          x,
          y,
          a + side * (0.35 + rng() * 0.55),
          segLen * (0.62 + rng() * 0.16),
          Math.max(3, Math.round(segments * (0.55 + rng() * 0.2))),
          depth + 1,
          z + (rng() - 0.5) * 0.35
        );
      }
    }

    branches.push({
      points,
      depth,
      length: Math.round(length * 10) / 10,
      z: Math.round(z * 1000) / 1000,
      id: id++,
    });
  }

  // Drie hoofdtakken vanuit de oorsprong: links-onder, midden, rechts-onder
  const [ox, oy] = ROOT_ORIGIN;
  grow(ox, oy, Math.PI * 0.78, 46, 13, 0, 0); // diep naar links-onder
  grow(ox + 14, oy + 6, Math.PI * 0.55, 42, 12, 0, 0.18); // midden, licht links
  grow(ox + 26, oy, Math.PI * 0.34, 38, 11, 0, -0.22); // naar rechts-onder

  return branches;
}

export const ROOT_BRANCHES: RootBranch[] = generate();

/* ─── Gedeelde stijl-mapping (SVG én WebGL) ─── */

const COLORS = ["#b08d3e", "#b08d3e", "#c9a854", "#7a8466"] as const;
const OPACITY = [0.55, 0.48, 0.4, 0.32] as const;
const WIDTH = [2.4, 1.7, 1.1, 0.75] as const;

export function branchColor(depth: number): string {
  return COLORS[Math.min(depth, COLORS.length - 1)];
}
export function branchOpacity(depth: number): number {
  return OPACITY[Math.min(depth, OPACITY.length - 1)];
}
export function branchWidth(depth: number): number {
  return WIDTH[Math.min(depth, WIDTH.length - 1)];
}

/** Animatie-timing per tak — identiek in SVG (CSS vars) en WebGL (useFrame). */
export function branchDelayMs(b: RootBranch): number {
  return b.depth * 420 + (b.id % 5) * 90;
}
export function branchDurMs(b: RootBranch): number {
  return 1400 + b.length * 2.2;
}

/** Vloeiend SVG-pad: quadratic smoothing door de middens van segmenten. */
export function branchPathD(b: RootBranch): string {
  const pts = b.points;
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}

/** Gouden (en spaarzaam Deep Rose) puntjes op de uiteinden van fijne takken. */
export function tipDots(): RootDot[] {
  const rng = mulberry32(SEED + 1);
  const tips = ROOT_BRANCHES.filter((b) => b.depth >= 1);
  const dots: RootDot[] = [];
  let roseUsed = 0;
  for (const b of tips) {
    if (rng() < 0.7) {
      const [x, y] = b.points[b.points.length - 1];
      const rose = roseUsed < 3 && b.depth >= 2 && rng() < 0.16;
      if (rose) roseUsed++;
      dots.push({
        x,
        y,
        z: b.z,
        r: Math.round((1.8 + rng() * 1.4) * 100) / 100,
        tone: rose ? "rose" : "gold",
        delay: Math.round(branchDelayMs(b) + branchDurMs(b) * 0.85),
      });
    }
  }
  return dots;
}

/* ─── Mapping naar 3D-scène (orthografisch, deelt compositie met SVG) ─── */

export const SCENE_SCALE = 1 / 95;

export function toSceneX(x: number): number {
  return (x - 500) * SCENE_SCALE;
}
export function toSceneY(y: number): number {
  return (300 - y) * SCENE_SCALE;
}
