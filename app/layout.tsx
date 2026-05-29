import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import InitialLoader from "./components/InitialLoader";
import NoCopy from "./components/NoCopy";
import SeoJsonLd from "./components/SeoJsonLd";
import { getRootLayoutMetadata } from "../lib/seo-config";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
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
        className={`${spaceGrotesk.variable} ${plexMono.variable} antialiased`}
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
