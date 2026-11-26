"use client";

import { MotionConfig } from "motion/react";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Tells the inline script in layout.tsx that the app started, so it keeps
  // scroll reveals switched on.
  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
