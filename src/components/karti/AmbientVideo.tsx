import type { CSSProperties } from "react";

/* AmbientVideo: een cinematische loop als sfeerlaag áchter bestaande
   compositie, nooit als onderwerp. Bewust géén client-component en géén
   hooks: een <video> met autoplay/muted/loop werkt zonder JS, en de
   reduced-motion-terugval loopt volledig via CSS. Dat vermijdt de
   React 19 hydration-mismatch die useReducedMotion hier eerder opleverde.

   Mobiel toont het posterframe in plaats van de clip (CSS), zodat een
   telefoon geen videobytes betaalt voor een textuurlaag. */

type Props = {
  /** basisnaam in /public/videos, zonder extensie */
  name: string;
  className?: string;
  style?: CSSProperties;
  /** horizontaal spiegelen; zet compositorisch gewicht naar de andere kant */
  flip?: boolean;
};

export function AmbientVideo({ name, className = "", style, flip = false }: Props) {
  const poster = `/videos/${name}-poster.jpg`;

  return (
    <div
      aria-hidden
      className={`ambient-video ${className}`}
      style={{ ...style, ["--ambient-poster" as string]: `url(${poster})` }}
    >
      <video
        className={`ambient-video__el${flip ? " ambient-video__el--flip" : ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        tabIndex={-1}
      >
        <source src={`/videos/${name}.webm`} type="video/webm" />
        <source src={`/videos/${name}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
