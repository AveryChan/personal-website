import type { SectionCopy } from "@/content/profile";
import { Reveal } from "./Reveal";

type SectionHeadingProps = SectionCopy & {
  /** Two-digit section number, e.g. "02". */
  index: string;
};

export function SectionHeading({ index, label, title, muted, intro }: SectionHeadingProps) {
  return (
    <header className="mb-14 md:mb-20">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="label text-accent">{index}</span>
          <span className="label">/ {label}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-8 max-w-4xl text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance md:text-6xl">
          {title}
          {muted ? <span className="text-muted"> {muted}</span> : null}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{intro}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
