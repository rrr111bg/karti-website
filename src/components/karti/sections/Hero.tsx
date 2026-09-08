"use client";

import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArchitecturalArcIcon } from "@/components/icons";
import { HERO } from "@/lib/content";
import { EVENT_MATCHCALL, matchCallHref } from "@/lib/links";
import { AmbientVideo } from "@/components/karti/AmbientVideo";
import { RootsVisual } from "@/components/karti/RootsVisual";
import { MagneticButton } from "@/components/karti/MagneticButton";
import { RevealWords } from "@/components/karti/RevealWords";
import { ParallaxLayer } from "@/components/karti/motion/ParallaxLayer";

/* Hero: cinematische hemel op gouden uur, volle breedte.

   Het portret is hier weg; Nasra's gezicht draagt de Over Nasra-sectie,
   waar het meer werk doet dan als decoratie naast de kop.

   Wat dit Karti houdt en niet zomaar een mooie lucht: de onderrand lost
   op in het crème van de pagina, en daar groeit het wortelstelsel als
   goudlijnwerk de hemel in. Zonder die twee is dit een voorraadbeeld
   met tekst erover.

   Vier bewegingslagen, elk met een reden:
   1. de hemel zakt en schaalt heel traag mee met scroll  -> diepte
   2. de content tilt op en vervaagt bij het verlaten     -> overdracht
   3. filmkorrel over het geheel                          -> bindt de clip
      aan het ontwerp en haalt de voorraadbeeld-look eraf
   4. vignet                                              -> focus
   Alles transform/opacity, en alles plat onder reduced-motion.

   Nog steeds exact vier tekstelementen (eyebrow, kop, subtekst, CTA-paar);
   trustline en de-risk-tokens leven in de TrustBand hieronder. */

/* Eén plek om de clip te wisselen. */
const HERO_CLIP = "karti-hero-cinema";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // De hemel beweegt trager dan de pagina en schaalt bijna onmerkbaar op.
  const skyY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "12%"]);
  const skyScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.1]);
  // De content laat de hemel los in plaats van er stug bovenop te blijven.
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -72]);
  const contentFade = useTransform(scrollYProgress, [0, 0.78], reduce ? [1, 1] : [1, 0]);

  // Split pull quote: hoofdtekst in inkt, "Over jezelf." in het accent
  const pull = HERO.pullQuote;
  const accent = "Over jezelf.";
  const pullHead = pull.endsWith(accent)
    ? pull.slice(0, pull.length - accent.length)
    : pull;

  const enter = (delay: number) =>
    ({ "--enter-delay": `${delay}ms` } as CSSProperties);

  return (
    <section
      ref={ref}
      className="hero-cinema hero-cinema--noir relative overflow-hidden"
    >
      <motion.div
        className="hero-cinema__sky"
        style={{ y: skyY, scale: skyScale }}
        aria-hidden
      >
        <AmbientVideo name={HERO_CLIP} className="hero-cinema__bg" />
      </motion.div>

      {/* Scrim: draagt de leesbaarheid van de kop. Een zijwaartse wig houdt
          de tekstkolom rustig, de onderrand lost op in de sectie eronder. */}
      <div className="hero-cinema__scrim" aria-hidden />
      <div className="hero-cinema__vignette" aria-hidden />

      {/* Wortelstelsel als goudlijnwerk tegen de hemel */}
      <RootsVisual className="hero-cinema__roots absolute inset-x-0 bottom-0 h-[40%] sm:h-[46%] lg:h-[54%]" />

      <ParallaxLayer
        className="absolute -right-28 -top-40 w-[560px] h-[560px] pointer-events-none"
        from={20}
        to={-46}
      >
        <ArchitecturalArcIcon aria-hidden className="w-full h-full hero-cinema__arc" />
      </ParallaxLayer>

      <div className="hero-cinema__grain" aria-hidden />

      <motion.div
        style={{ y: contentY, opacity: contentFade }}
        className="container-wide relative flex items-center pt-16 pb-32 sm:pb-36 lg:pt-24 lg:pb-40 min-h-[92dvh]"
      >
        <div className="max-w-[820px] min-w-0 mx-auto lg:mx-0 text-center lg:text-left">
          <div
            className="t6-label hero-cinema__eyebrow mb-7 hero-enter-item"
            style={enter(0)}
          >
            {HERO.label}
          </div>
          <RevealWords
            as="h1"
            lines={[HERO.headline[0], HERO.headline[1]]}
            staggerMs={40}
            className="hero-cinema__head"
          />
          <hr
            className="gold-divider gold-divider-enter my-8 mx-auto lg:mx-0"
            style={enter(300)}
          />
          <p
            className="t3-quote hero-cinema__sub mb-10 hero-enter-item"
            style={enter(380)}
          >
            {pullHead}
            <span className="hero-cinema__accent">{accent}</span>
          </p>
          <div
            className="flex flex-col items-center lg:items-start sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start sm:items-center gap-4 hero-enter-item"
            style={enter(470)}
          >
            <MagneticButton className="w-full sm:w-auto">
              <Link
                href={matchCallHref("hero")}
                className={`btn-primary-lg w-full sm:w-auto ${EVENT_MATCHCALL}`}
              >
                {HERO.primaryCta} <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
            <a href="#methode" className="btn-outline-gold w-full sm:w-auto">
              {HERO.secondaryCta}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
