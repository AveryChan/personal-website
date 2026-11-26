import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

export function Contact() {
  const socials = profile.socials.filter((s) => s.href);
  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30%] left-1/2 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[120px]"
      />
      <div className="container-x">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="label text-accent">07</span>
            <span className="label">/ Contact</span>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-10 max-w-5xl text-5xl leading-[0.95] font-semibold tracking-[-0.045em] text-balance md:text-8xl">
            Have a data platform to <span className="text-accent">build, fix or migrate?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-14 inline-flex max-w-full items-center gap-4 border-b border-line-strong pb-4 text-xl font-medium tracking-[-0.02em] transition-colors hover:border-accent hover:text-accent sm:text-3xl md:text-4xl"
          >
            <span className="min-w-0 break-all">{profile.email}</span>
            <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 md:h-8 md:w-8" />
          </a>
        </Reveal>
        {socials.length > 0 ? (
          <Reveal delay={0.22}>
            <ul className="mt-10 flex gap-6">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label transition-colors hover:text-accent"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="container-x flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {profile.name} · {profile.title}
        </p>
        <p className="label flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
          All systems operational
        </p>
      </div>
    </footer>
  );
}
