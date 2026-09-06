import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./cafe.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cf-arabic",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-cf-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cf-mono",
  display: "swap",
});

export default function CafeMenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${arabic.variable} ${display.variable} ${mono.variable}`}
      lang="ar"
      dir="rtl"
    >
      {children}
    </div>
  );
}
