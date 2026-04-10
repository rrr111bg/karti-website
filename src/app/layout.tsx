import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Karti · Wijsheid van het vrouwenlichaam",
  description:
    "1:1 begeleiding voor vrouwen door Nasra. Leer de signalen van je lichaam begrijpen. Hormonen, darmen, cyclus en emotionele patronen als één systeem.",
  icons: { icon: "/seo/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${italiana.variable} ${lora.variable} ${instrumentSans.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
