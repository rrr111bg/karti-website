"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, OrthographicCamera } from "@react-three/drei";
import type { Line2, LineMaterial } from "three-stdlib";
import {
  ROOT_BRANCHES,
  SCENE_SCALE,
  branchColor,
  branchDelayMs,
  branchDurMs,
  branchOpacity,
  branchWidth,
  tipDots,
  toSceneX,
  toSceneY,
  type RootBranch,
} from "@/lib/roots";

/**
 * WebGL-laag van het wortelsysteem (react-three-fiber).
 *
 * - Deelt exact dezelfde geometrie en timing met de SVG-fallback,
 *   zodat de overgang naadloos is wanneer deze laag actief wordt.
 * - Orthografische camera = zelfde compositie als de SVG.
 * - Procedurele lijnen, geen glTF en geen textures: de hele scene is
 *   een paar kilobyte geometrie; alleen de three.js-runtime weegt.
 * - Groei via dashOffset op LineMaterial (geen geometry-updates per frame).
 * - Daarna: trage diepte-parallax op muis en scroll. Kalm, nooit bouncy.
 */

type SceneProps = { onReady: () => void };

function easeOutCubic(k: number): number {
  return 1 - Math.pow(1 - k, 3);
}

function GrowingBranch({ b }: { b: RootBranch }) {
  const ref = useRef<Line2>(null);

  const points = useMemo(
    () =>
      b.points.map(
        ([x, y]) => new THREE.Vector3(toSceneX(x), toSceneY(y), b.z)
      ),
    [b]
  );
  const worldLen = b.length * SCENE_SCALE;
  const delay = branchDelayMs(b) / 1000;
  const dur = branchDurMs(b) / 1000;

  useFrame(({ clock }) => {
    const mat = ref.current?.material as LineMaterial | undefined;
    if (!mat) return;
    const k = Math.min(1, Math.max(0, (clock.getElapsedTime() - delay) / dur));
    mat.dashOffset = worldLen * (1 - easeOutCubic(k));
  });

  return (
    <Line
      ref={ref}
      points={points}
      color={branchColor(b.depth)}
      lineWidth={branchWidth(b.depth)}
      transparent
      opacity={Math.min(1, branchOpacity(b.depth) + 0.08)}
      dashed
      dashSize={worldLen}
      gapSize={worldLen}
      dashOffset={worldLen}
    />
  );
}

function TipDots() {
  const ref = useRef<THREE.Points>(null);
  const dots = useMemo(() => tipDots(), []);

  // ronde dot-sprite (PointsMaterial rendert standaard vierkantjes)
  const dotTexture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }
    return new THREE.CanvasTexture(c);
  }, []);

  useEffect(() => () => dotTexture.dispose(), [dotTexture]);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(dots.length * 3);
    const col = new Float32Array(dots.length * 3);
    const gold = new THREE.Color("#b08d3e");
    const rose = new THREE.Color("#8b3a4a");
    dots.forEach((d, i) => {
      pos[i * 3] = toSceneX(d.x);
      pos[i * 3 + 1] = toSceneY(d.y);
      pos[i * 3 + 2] = d.z;
      const c = d.tone === "rose" ? rose : gold;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    });
    return { positions: pos, colors: col };
  }, [dots]);

  useFrame(({ clock }) => {
    const mat = ref.current?.material as THREE.PointsMaterial | undefined;
    if (!mat) return;
    // dots verschijnen wanneer de fijne takken volgroeid raken (~na 2.6s)
    const k = Math.min(1, Math.max(0, (clock.getElapsedTime() - 2.6) / 1.2));
    mat.opacity = easeOutCubic(k) * 0.85;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        map={dotTexture}
        alphaTest={0.4}
        size={4.5}
        sizeAttenuation={false}
        transparent
        opacity={0}
        depthWrite={false}
      />
    </points>
  );
}

/** Trage parallax op muis en scroll — window-level, canvas blijft pointer-events:none. */
function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ rx: 0, ry: 0, ty: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.current.ry = nx * 0.055;
      target.current.rx = -ny * 0.03;
    };
    const onScroll = () => {
      target.current.ty = Math.min(window.scrollY, 900) * 0.00035;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y += (target.current.ry - g.rotation.y) * 0.03;
    g.rotation.x += (target.current.rx - g.rotation.x) * 0.03;
    g.position.y += (target.current.ty - g.position.y) * 0.05;
    // nauwelijks waarneembare ademing
    g.rotation.z = Math.sin(clock.getElapsedTime() * 0.07) * 0.004;
  });

  return <group ref={ref}>{children}</group>;
}

/** Camera-zoom declaratief afgestemd op containerhoogte: compositie spiegelt de SVG. */
function SceneCamera() {
  const height = useThree((s) => s.size.height);
  return (
    <OrthographicCamera
      makeDefault
      position={[0, 0, 10]}
      zoom={height / (600 * SCENE_SCALE)}
      near={0.1}
      far={100}
    />
  );
}

export default function KartiRootsScene({ onReady }: SceneProps) {
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ pointerEvents: "none", background: "transparent" }}
      onCreated={() => {
        // eerste frame staat → SVG-laag mag uitfaden
        requestAnimationFrame(() => requestAnimationFrame(onReady));
      }}
    >
      <SceneCamera />
      <ParallaxGroup>
        {ROOT_BRANCHES.map((b) => (
          <GrowingBranch key={b.id} b={b} />
        ))}
        <TipDots />
      </ParallaxGroup>
    </Canvas>
  );
}
