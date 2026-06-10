import type { Metadata } from "next";
import Script from "next/script";
import { Italiana, Lora, Instrument_Sans, Work_Sans } from "next/font/google";
import "./globals.css";

const italiana = Italiana({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_TITLE = "Karti · Wijsheid van het vrouwenlichaam";
const SITE_DESCRIPTION =
  "1:1 begeleiding voor vrouwen door Nasra. Leer de signalen van je lichaam begrijpen. Hormonen, darmen, cyclus en emotionele patronen als één systeem.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kartihealth.com"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: { icon: "/seo/favicon.png" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://kartihealth.com",
    siteName: "Karti",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/seo/og.png",
        width: 1200,
        height: 630,
        alt: "Karti · Wijsheid van het vrouwenlichaam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/seo/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      suppressHydrationWarning
      className={`${italiana.variable} ${lora.variable} ${instrumentSans.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Progressive enhancement: reveal-animaties zijn alleen actief mét JS.
            Dit script draait vóór de eerste paint; zonder JS blijft alle
            content gewoon zichtbaar (in-app browsers, trage verbindingen). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        {children}
        {/* Cookieloze analytics (AVG-proof, geen banner nodig).
            tagged-events: named conversie-events op CTA's.
            outbound-links: automatische Calendly/Instagram klik-tracking. */}
        <Script
          src="https://plausible.io/js/script.tagged-events.outbound-links.js"
          data-domain="kartihealth.com"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
