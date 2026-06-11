import Link from "next/link";
import type { ReactNode } from "react";

/** Sobere Dawn-layout voor juridische pagina's. */
export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-40 bg-[#f2eae0]/90 backdrop-blur-md border-b border-[#b08d3e]/25">
        <div className="container-wide flex items-center justify-between py-4">
          <Link href="/" className="t0-wordmark text-[#3d3228]">
            K A R T I
          </Link>
          <Link
            href="/"
            className="t6-label text-[#80662c] hover:text-[#3d3228] transition-colors"
          >
            Terug naar de site
          </Link>
        </div>
      </header>
      <main className="bg-[#f2eae0] min-h-screen">
        <div className="container-narrow py-16 lg:py-20">
          <article className="legal-copy max-w-[720px]">
            <h1 className="t2-section mb-4">{title}</h1>
            <p className="t6-label text-[#80662c] mb-8">
              LAATST BIJGEWERKT: {updated}
            </p>
            <hr className="gold-divider mb-10" />
            {children}
          </article>
        </div>
      </main>
    </>
  );
}
