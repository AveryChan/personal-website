import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/ui/Icons";

export function Portfolio() {
  return (
    <section id="portfolio" className="border-y border-line bg-surface/40 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="06"
          label="Portfolio"
          title={
            <>
              Selected work, <span className="text-muted">landing soon.</span>
            </>
          }
          intro="Project write-ups, writing and tooling are on the way. Each slot below becomes a live link as it ships."
        />

        <ul className="grid gap-5 md:grid-cols-3">
          {profile.portfolio.map((item, i) => {
            const live = Boolean(item.href);
            const body = (
              <>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {live ? (
                    <ArrowUpRight className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  ) : (
                    <span className="inline-flex items-center gap-2 border border-line-strong px-2.5 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-dim" />
                      <span className="label text-muted">Coming soon</span>
                    </span>
                  )}
                </div>
                <div className="mt-28">
                  <p className="label text-accent">{item.tag}</p>
                  <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-[-0.025em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </>
            );
            const cls =
              "group relative flex h-full min-h-[22rem] flex-col justify-start overflow-hidden border border-line bg-bg p-7 transition-colors duration-300 md:p-8";
            return (
              <Reveal as="li" key={item.id} delay={i * 0.09}>
                {live ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cls} hover:border-accent`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={`${cls} border-dashed`}>{body}</div>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
