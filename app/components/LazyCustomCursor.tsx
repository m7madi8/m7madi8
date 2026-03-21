"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

/**
 * يؤخر تحميل المؤشر المخصص لتقليل TBT في أول ثوانٍ.
 */
export default function LazyCustomCursor() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(true), 800);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;
  return <CustomCursor />;
}
