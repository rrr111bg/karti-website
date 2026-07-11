"use client";

import Link from "next/link";
import { InstagramIcon, EmailIcon } from "@/components/icons";
import { FOOTER } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-[#f2eae0] border-t border-[#b08d3e]/30">
      {/* extra bodemruimte op mobiel voor de sticky match-call balk */}
      <div className="container-wide pt-16 pb-32 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link href="/" className="t0-wordmark text-[#3d3228] block mb-4">
              K A R T I
            </Link>
            <div className="t6-label text-[#80662c]">{FOOTER.tagline}</div>
          </div>
          <nav className="flex flex-col gap-2">
            <div className="t6-label text-[#80662c] mb-2">NAVIGATIE</div>
            {FOOTER.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[15px] text-[#3d3228] hover:text-[#b08d3e]"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <div className="t6-label text-[#80662c] mb-2">CONTACT</div>
            <a
              href={`https://${FOOTER.contact.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-[#3d3228] hover:text-[#b08d3e] inline-flex items-center gap-2"
            >
              <InstagramIcon className="w-4 h-4" /> {FOOTER.contact.instagram}
            </a>
            <a
              href={`mailto:${FOOTER.contact.email}`}
              className="text-[15px] text-[#3d3228] hover:text-[#b08d3e] inline-flex items-center gap-2"
            >
              <EmailIcon className="w-4 h-4" /> {FOOTER.contact.email}
            </a>
          </div>
        </div>
        <hr className="gold-divider mt-14 mb-6" style={{ width: "100%", opacity: 0.3 }} />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#6e6557]">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>{FOOTER.legal}</span>
            {FOOTER.legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="underline decoration-[#b08d3e]/60 underline-offset-4 hover:text-[#3d3228]"
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
