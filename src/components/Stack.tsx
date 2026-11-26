import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Stack() {
  return (
    <section id="stack" className="border-t border-line py-24 md:py-36">
      <div className="container-x">
        <SectionHeading index="04" {...profile.sections.stack} />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="border-t border-line-strong">
              {profile.stack.map((g, i) => (
                <Reveal
                  key={g.group}
                  delay={i * 0.07}
                  className="grid gap-4 border-b border-line py-7 sm:grid-cols-[11rem_1fr] sm:gap-8"
                >
                  <h3 className="label pt-2.5">{g.group}</h3>
                  <ul className="flex flex-wrap gap-2.5">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="border border-line-strong bg-surface px-4 py-2.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
            <h3 className="label border-b border-line-strong pb-4">Core disciplines</h3>
            <ul>
              {profile.skills.map((s, i) => (
                <li
                  key={s}
                  className="flex items-baseline gap-5 border-b border-line py-5 text-xl font-medium tracking-[-0.02em]"
                >
                  <span className="label w-6 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
