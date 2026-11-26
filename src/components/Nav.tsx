"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

const links = [
  { id: "about", label: "About" },
  { id: "impact", label: "Impact" },
  { id: "journey", label: "Journey" },
  { id: "stack", label: "Stack" },
  { id: "portfolio", label: "Portfolio" },
] as const;

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["top", ...links.map((l) => l.id), "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a
          href="#top"
          className="group flex items-center gap-3 font-mono text-sm font-medium tracking-tight"
          aria-label={`${profile.name} — back to top`}
          onClick={() => setOpen(false)}
        >
          <span className="grid h-7 w-7 place-items-center bg-accent text-[0.7rem] font-bold text-accent-ink">
            AC
          </span>
          <span className="hidden text-fg sm:inline">
            avery<span className="text-accent">.</span>chan
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
              className={`relative px-3 py-2 text-sm transition-colors ${
                active === l.id ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {l.label}
              {active === l.id ? (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-px h-px bg-accent"
                />
              ) : null}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 border border-line-strong px-4 py-2 font-mono text-xs tracking-[0.12em] uppercase transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center border border-line md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 h-px w-4 bg-fg transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-4 bg-fg transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav aria-label="Mobile" className="min-h-0 overflow-hidden">
          <ul className="container-x flex flex-col pb-6">
            {[...links, { id: "contact", label: "Contact" }].map((l, i) => (
              <li key={l.id} className="border-t border-line first:border-t-0">
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline gap-4 py-4 text-2xl font-medium tracking-tight"
                >
                  <span className="label text-accent">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
      />
    </header>
  );
}
