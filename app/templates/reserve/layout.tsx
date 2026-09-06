import { Fraunces, Outfit } from "next/font/google";
import "./reserve.css";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-nr-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-nr-sans",
  display: "swap",
});

export default function ReserveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${display.variable} ${sans.variable}`} lang="en" dir="ltr">
      {children}
    </div>
  );
}
