import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import InitialLoader from "./components/InitialLoader";
import NoCopy from "./components/NoCopy";
import SeoJsonLd from "./components/SeoJsonLd";
import {
  SEO_PERSON,
  defaultPageTitle,
  getMetadataBase,
  getSiteUrl,
} from "../lib/seo-config";

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

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: defaultPageTitle,
    template: `%s | ${SEO_PERSON.nameEn}`,
  },
  description: SEO_PERSON.description,
  keywords: [...SEO_PERSON.keywords],
  authors: [{ name: SEO_PERSON.nameEn, url: siteUrl }],
  creator: SEO_PERSON.nameEn,
  publisher: SEO_PERSON.nameEn,
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/icon.png", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar"],
    url: siteUrl,
    siteName: `${SEO_PERSON.nameEn} — Portfolio`,
    title: defaultPageTitle,
    description: SEO_PERSON.description,
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: `${SEO_PERSON.nameEn} — ${SEO_PERSON.jobTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultPageTitle,
    description: SEO_PERSON.description,
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
