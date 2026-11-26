"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { profile, type Role } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function RoleItem({ role, index, last }: { role: Role; index: number; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const [lit, setLit] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 62%", "end 62%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setLit(v > 0));

  const year = role.start.slice(0, 4);

  return (
    <li
      ref={ref}
      className="grid grid-cols-[1.75rem_1fr] gap-x-5 md:grid-cols-[10rem_2rem_1fr] md:gap-x-8"
    >
      {/* period column (desktop) */}
      <div className="hidden pt-1.5 text-right md:block">
        <p className="font-mono text-3xl leading-none font-medium tracking-tight text-fg/90">
          {year}
        </p>
        <p className="label mt-3">{role.period}</p>
      </div>

      {/* rail */}
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-line-strong"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: fill }}
          className={`absolute top-0 bottom-0 left-1/2 w-px origin-top -translate-x-1/2 bg-accent ${
            last ? "[mask-image:linear-gradient(to_bottom,#000,transparent)]" : ""
          }`}
        />
        <span
          aria-hidden="true"
          className={`absolute top-[0.55rem] left-1/2 h-3.5 w-3.5 -translate-x-1/2 border transition-all duration-500 ${
            lit
              ? "border-accent bg-accent shadow-[0_0_0_5px_rgb(198_255_61/0.14)]"
              : "border-line-strong bg-bg"
          } ${role.kind === "recognition" ? "rotate-45" : ""}`}
        />
      </div>

      {/* card */}
      <Reveal
        as="article"
        className="group mb-10 border border-line bg-surface/70 p-6 transition-colors duration-300 hover:border-line-strong md:mb-14 md:p-9"
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="label md:hidden">{role.period}</span>
          {role.current ? (
            <span className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-2.5 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              <span className="label text-accent">Active</span>
            </span>
          ) : null}
          {role.kind === "recognition" ? (
            <span className="border border-line-strong px-2.5 py-1.5">
              <span className="label text-fg/80">Recognition</span>
            </span>
          ) : null}
          <span className="label ml-auto hidden md:inline">
            {String(index + 1).padStart(2, "0")} / {String(profile.roles.length).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-5 text-2xl leading-tight font-semibold tracking-[-0.025em] md:text-3xl">
          {role.title}
        </h3>
        <p className="mt-1.5 text-base text-muted md:text-lg">{role.org}</p>

        <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-fg/90">{role.summary}</p>

        <ul className="mt-6 space-y-3.5">
          {role.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-4 text-[0.95rem] leading-relaxed text-muted"
            >
              <span aria-hidden="true" className="mt-[0.6em] h-1 w-3 shrink-0 bg-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <ul
          className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6"
          aria-label="Technologies"
        >
          {role.tags.map((t) => (
            <li
              key={t}
              className="border border-line px-2.5 py-1.5 font-mono text-[0.72rem] tracking-wide text-muted transition-colors group-hover:border-line-strong"
            >
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </li>
  );
}

export function Journey() {
  return (
    <section id="journey" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading index="03" {...profile.sections.journey} />

        <ol className="relative">
          {profile.roles.map((role, i) => (
            <RoleItem key={role.id} role={role} index={i} last={i === profile.roles.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}
