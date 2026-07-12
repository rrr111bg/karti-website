"use client";

import Link from "next/link";
import { InstagramIcon, EmailIcon } from "@/components/icons";
import { FOOTER } from "@/lib/content";

/* Footer in Night Bloom: voltooit de ene Dawn-naar-Night flip
   (testimonials tot en met hier). Zelfde content, links en legal;
   porcelain tekst, gold-haze labels, gouden hairlines. */
export function Footer() {
  return (
    <footer className="bg-[#1a1614] border-t border-[#c9a854]/25">
      {/* extra bodemruimte op mobiel voor de sticky match-call balk */}
      <div className="container-wide pt-16 pb-32 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link href="/" className="t0-wordmark text-[#fbf7f3] block mb-4">
              K A R T I
            </Link>
            <div className="t6-label text-[#e2cda0]">{FOOTER.tagline}</div>
          </div>
          <nav className="flex flex-col gap-2">
            <div className="t6-label text-[#e2cda0] mb-2">NAVIGATIE</div>
            {FOOTER.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[15px] text-[#fbf7f3]/80 hover:text-[#e2cda0]"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <div className="t6-label text-[#e2cda0] mb-2">CONTACT</div>
            <a
              href={`https://${FOOTER.contact.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-[#fbf7f3]/80 hover:text-[#e2cda0] inline-flex items-center gap-2"
            >
              <InstagramIcon className="w-4 h-4" /> {FOOTER.contact.instagram}
            </a>
            <a
              href={`mailto:${FOOTER.contact.email}`}
              className="text-[15px] text-[#fbf7f3]/80 hover:text-[#e2cda0] inline-flex items-center gap-2"
            >
              <EmailIcon className="w-4 h-4" /> {FOOTER.contact.email}
            </a>
          </div>
        </div>
        <hr
          className="mt-14 mb-6"
          style={{ width: "100%", height: 1, border: 0, background: "#c9a854", opacity: 0.25 }}
        />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#b5aca1]">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>{FOOTER.legal}</span>
            {FOOTER.legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="underline decoration-[#c9a854]/60 underline-offset-4 hover:text-[#fbf7f3]"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="gold-dots-cluster">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </footer>
  );
}
