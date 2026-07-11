import { Header } from "@/components/karti/sections/Header";
import { Hero } from "@/components/karti/sections/Hero";
import { BewijsOnderHero } from "@/components/karti/sections/BewijsOnderHero";
import { Herkenning } from "@/components/karti/sections/Herkenning";
import { Verschuiving } from "@/components/karti/sections/Verschuiving";
import { Methodiek } from "@/components/karti/sections/Methodiek";
import { Bouwstenen } from "@/components/karti/sections/Bouwstenen";
import { OverNasra } from "@/components/karti/sections/OverNasra";
import { Trajecten } from "@/components/karti/sections/Trajecten";
import { Tijdlijn } from "@/components/karti/sections/Tijdlijn";
import { Testimonials } from "@/components/karti/sections/Testimonials";
import { MatchCallFinale } from "@/components/karti/sections/MatchCallFinale";
import { Footer } from "@/components/karti/sections/Footer";
import { StickyMatchCall } from "@/components/karti/StickyMatchCall";
import { ScrollThread } from "@/components/karti/ScrollThread";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BewijsOnderHero />
        <Herkenning />
        <Verschuiving />
        <Methodiek />
        <Bouwstenen />
        <OverNasra />
        <Trajecten />
        <Tijdlijn />
        <Testimonials />
        <MatchCallFinale />
      </main>
      <Footer />
      <StickyMatchCall />
      <ScrollThread />
    </>
  );
}
