"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { NAV_LINKS, HERO } from "@/lib/content";
import { EVENT_MATCHCALL, matchCallHref } from "@/lib/links";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // scroll-lock terwijl het menu open is
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
    <header className="sticky top-0 z-40 bg-[#f2eae0]/90 backdrop-blur-md border-b border-[#b08d3e]/25">
      <div className="container-wide flex items-center justify-between py-3 sm:py-4 lg:py-5">
        <Link href="/" className="t0-wordmark header-wordmark whitespace-nowrap text-[#3d3228]">
          K A R T I
        </Link>
        <nav className="hidden xl:flex items-center gap-9 t6-label text-[#3d3228]">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap hover:text-[#80662c] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={matchCallHref("header")}
            className={`btn-primary btn-header whitespace-nowrap ${EVENT_MATCHCALL}`}
          >
            <span className="sm:hidden">Match-call</span>
            <span className="hidden sm:inline">{HERO.primaryCta}</span>
          </Link>
          <button
            type="button"
            className="xl:hidden text-[#3d3228] p-2 -mr-2"
            aria-label="Menu openen"
            aria-expanded={menuOpen}
            aria-controls="mobiel-menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>

      {/* Buiten de <header>: backdrop-filter maakt de header anders het
          containing block voor deze fixed overlay */}
      {menuOpen && (
        <div
          id="mobiel-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigatie"
          className="fixed inset-0 z-50 night-bloom flex flex-col"
        >
          <div className="velvet-texture" />
          <div className="container-wide relative flex items-center justify-between py-4">
            <span className="t0-wordmark text-[#fbf7f3]">K A R T I</span>
            <button
              type="button"
              autoFocus
              aria-label="Menu sluiten"
              onClick={() => setMenuOpen(false)}
              className="text-[#e2cda0] p-2 -mr-2"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="relative flex-1 flex flex-col items-center justify-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-[family-name:var(--font-heading)] text-[#fbf7f3] text-[28px] hover:text-[#e2cda0] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <Link
              href={matchCallHref("menu")}
              onClick={() => setMenuOpen(false)}
              className={`btn-primary-lg mt-6 ${EVENT_MATCHCALL}`}
            >
              {HERO.primaryCta}
            </Link>
          </nav>
          <div className="relative pb-10 text-center t6-label text-[#e2cda0]">
            {HERO.ctaSub}
          </div>
        </div>
      )}
    </>
  );
}
