import Link from "next/link";

export const metadata = {
  title: "Dank je wel · Karti",
  description: "Je bent ingeschreven voor de wekelijkse brief van Nasra.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-[#f2eae0] px-6 py-24">
      <div className="container-narrow text-center max-w-[620px]">
        <Link href="/" className="t0-wordmark text-[#3d3228] inline-block mb-10">
          K A R T I
        </Link>
        <hr className="gold-divider mx-auto mb-8" />
        <h1 className="t2-section mb-8">Dank je wel.</h1>
        <p className="t4-body text-[#2e2622] mb-4">
          Je bent ingeschreven voor de wekelijkse brief.
        </p>
        <p className="t4-body text-[#2e2622] mb-12">
          De eerste komt volgende zondag in je inbox.
        </p>
        <p
          className="font-[family-name:var(--font-heading)] italic text-[#8a8070] mb-12"
          style={{ fontSize: "18px" }}
        >
          Liefs, Nasra
        </p>
        <Link href="/" className="btn-outline-gold inline-flex items-center gap-2">
          Terug naar home
        </Link>
      </div>
    </main>
  );
}
