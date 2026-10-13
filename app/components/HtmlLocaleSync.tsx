"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * يزامن lang و dir على <html> مع المسار (/ar = RTL).
 * يعمل بعد التنقل بين العربية والإنجليزية.
 */
export default function HtmlLocaleSync() {
  const pathname = usePathname();

  useEffect(() => {
    const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
    const html = document.documentElement;
    html.lang = isArabic ? "ar" : "en";
    html.dir = isArabic ? "rtl" : "ltr";
  }, [pathname]);

  return null;
}
