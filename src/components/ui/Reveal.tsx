"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "p" | "h2" | "h3";
};

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts content into place once it scrolls into view. */
export function Reveal({ children, delay = 0, y = 24, className, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: easeOut }}
    >
      {children}
    </Component>
  );
}
