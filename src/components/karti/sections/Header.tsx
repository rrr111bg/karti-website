"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { NAV_LINKS, HERO } from "@/lib/content";
import { EVENT_MATCHCALL, matchCallHref } from "@/lib/links";
import { DeriskDots } from "@/components/karti/DeriskDots";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* Boven de cinematische hero zweeft de header transparant; zodra je
     scrollt trekt hij dicht. Via Motion i.p.v. een scroll-listener, en
     de begintoestand is deterministisch false zodat server en client
     hetzelfde renderen. */
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));
  // trigger dat het menu opende: focus keert hier terug bij sluiten
  const triggerRef = useRef<HTMLButtonElement>(null);
  // container van de dialog: bron voor de focusbare elementen in de trap
  const dialogRef = useRef<HTMLDivElement>(null);

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

  // focus terug naar de hamburger-trigger zodra het menu sluit
  useEffect(() => {
    if (!menuOpen) return;
    const trigger = triggerRef.current;
    return () => {
      trigger?.focus();
    };
  }, [menuOpen]);

  // focus-trap: Tab/Shift+Tab wrapt binnen de open dialog
  const trapFocus = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const container = dialogRef.current;
    if (!container) return;
    const focusables = container.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
    <header
      className={`site-header fixed top-0 inset-x-0 z-40 ${
        solid ? "site-header--solid" : "site-header--over"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-[64px] sm:h-[72px]">
        <Link href="/" className="t0-wordmark header-wordmark whitespace-nowrap header-ink">
          K A R T I
        </Link>
        <nav className="hidden xl:flex items-center gap-9 t6-label header-ink">
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
            ref={triggerRef}
            type="button"
            className="xl:hidden header-ink p-2 -mr-2"
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
          ref={dialogRef}
          onKeyDown={trapFocus}
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
            <DeriskDots text={HERO.ctaSub} className="justify-center" />
          </div>
        </div>
      )}
    </>
  );
}
