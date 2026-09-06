import { Readex_Pro, Syne } from "next/font/google";
import "./burger.css";

const readex = Readex_Pro({
  subsets: ["arabic", "latin"],
  variable: "--font-gb-arabic",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-gb-display",
  display: "swap",
});

export default function BurgerMenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${readex.variable} ${syne.variable}`} lang="ar" dir="rtl">
      {children}
    </div>
  );
}
