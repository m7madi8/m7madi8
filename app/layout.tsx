import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans_Arabic,
  League_Spartan,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import InitialLoader from "./components/InitialLoader";
import NoCopy from "./components/NoCopy";
import SeoJsonLd from "./components/SeoJsonLd";
import { getRootLayoutMetadata } from "../lib/seo-config";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = getRootLayoutMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${leagueSpartan.variable} ${plexMono.variable} ${plexArabic.variable} antialiased`}
        suppressHydrationWarning
      >
        <SeoJsonLd />
        <NoCopy />
        <InitialLoader />
        {children}
      </body>
    </html>
  );
}
