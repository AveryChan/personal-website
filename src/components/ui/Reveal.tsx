"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait after the element comes into view. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
};

/**
 * Fades and lifts content into place once it scrolls into view.
 *
 * The server renders the content fully visible. The hidden starting state lives in
 * globals.css and only applies once JavaScript is running, so the page stays
 * readable if scripts fail to load.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: RevealProps) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return (
    <Tag
      ref={setNode}
      data-reveal=""
      data-revealed={revealed ? "" : undefined}
      className={className}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
