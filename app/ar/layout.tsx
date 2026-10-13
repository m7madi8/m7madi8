import type { Metadata } from "next";
import LocaleDocument from "../components/LocaleDocument";
import { getArabicRootLayoutMetadata } from "../../lib/seo-config";

export const metadata: Metadata = getArabicRootLayoutMetadata();

export default function ArabicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LocaleDocument locale="ar" />
      <div className="locale-root min-h-dvh" dir="rtl" lang="ar">
        {children}
      </div>
    </>
  );
}
