import { profile } from "@/content/profile";
import { ArrowDown, ArrowUpRight, Check } from "@/components/ui/Icons";

/**
 * The entrance animations here are CSS only (see the `--animate-*` entries in
 * globals.css), staggered with `animationDelay`. No JavaScript is involved, so
 * this is a server component.
 */
const after = (seconds: number) => ({ animationDelay: `${seconds}s` });

const headlineSize =
  "block text-[clamp(4.25rem,26vw,10rem)] lg:text-[clamp(8rem,17vw,17rem)] leading-[0.86] font-semibold tracking-[-0.055em]";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24">
      {/* ambient accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[34rem] w-[34rem] rounded-full bg-accent/[0.07] blur-[120px]"
      />

      <div className="container-x">
        <div
          style={after(0.1)}
          className="flex animate-rise flex-wrap items-center gap-x-6 gap-y-3"
        >
          <span className="inline-flex items-center gap-2.5 border border-line-strong bg-surface/60 px-3 py-2 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
            <span className="label text-fg">{profile.status}</span>
          </span>
          <span className="label hidden sm:inline">
            {profile.location} · {profile.timezone}
          </span>
        </div>

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-14">
          <h1 className="lg:col-span-7">
            <span className="sr-only">
              {profile.name}, {profile.title}
            </span>
            <span aria-hidden="true" className="block">
              {/* The padding and negative margin keep the tail of the "y" from being clipped. */}
              <span className="-mb-[0.26em] block overflow-hidden pb-[0.32em]">
                <span style={after(0.19)} className={`${headlineSize} animate-mask-rise`}>
                  {profile.firstName}
                </span>
              </span>
              <span className="-mb-[0.26em] block overflow-hidden pb-[0.32em]">
                <span style={after(0.28)} className={`${headlineSize} animate-mask-rise`}>
                  <span className="outline-text">{profile.lastName}</span>
                  <span className="text-accent">.</span>
                </span>
              </span>
            </span>
          </h1>

          <div className="lg:col-span-7">
            <p style={after(0.37)} className="label animate-rise text-accent">
              {profile.title}
            </p>
            <p
              style={after(0.46)}
              className="mt-5 max-w-xl animate-rise text-2xl leading-[1.25] font-medium tracking-[-0.02em] text-balance md:text-3xl"
            >
              {profile.tagline}
            </p>
            <div style={after(0.55)} className="mt-9 flex animate-rise flex-wrap gap-3">
              <a
                href="#journey"
                className="group inline-flex items-center gap-3 bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
              >
                Career journey
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 border border-line-strong px-6 py-3.5 text-sm font-semibold transition-colors hover:border-fg"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div
            style={after(0.64)}
            className="animate-rise lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-end"
          >
            <div className="border border-line-strong bg-surface/80 backdrop-blur">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-line-strong" />
                  <span className="h-2 w-2 rounded-full bg-line-strong" />
                  <span className="h-2 w-2 rounded-full bg-line-strong" />
                </div>
                <span className="label">pipeline / career.run</span>
              </div>
              <ol className="space-y-3.5 px-4 py-5 font-mono text-[0.8rem] leading-snug">
                {profile.runLog.map((row, i) => (
                  <li
                    key={row.step}
                    style={after(1 + i * 0.28)}
                    className="flex animate-slide-in items-start gap-3"
                  >
                    <span className="mt-0.5 w-4 shrink-0">
                      {row.done ? (
                        <Check className="h-4 w-4 text-accent" />
                      ) : (
                        <span className="mx-auto mt-1.5 block h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
                      )}
                    </span>
                    <span className="w-[4.75rem] shrink-0 text-dim">{row.step}</span>
                    <span className="min-w-0 flex-1 text-fg/90">
                      {row.text}
                      {row.note ? <span className="ml-2 text-accent">[{row.note}]</span> : null}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="flex items-center gap-2 border-t border-line px-4 py-3 font-mono text-[0.8rem] text-dim">
                <span className="text-accent">$</span>
                <span>await next_role</span>
                <span className="h-4 w-2 animate-blink bg-accent" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
