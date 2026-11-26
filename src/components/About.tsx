import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const { about, languages, location } = profile;
  return (
    <section id="about" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading index="01" label="About" title={about.lead} />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-6 lg:col-span-7">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="max-w-2xl text-lg leading-[1.7] text-muted text-pretty first:text-fg md:text-xl">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-line-strong">
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-5">
                <dt className="label pt-1">Focus</dt>
                <dd>
                  <ul className="space-y-2 text-[0.95rem]">
                    {about.focus.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-1 w-1 shrink-0 bg-accent"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-5">
                <dt className="label pt-1">Languages</dt>
                <dd className="text-[0.95rem]">
                  {languages.join(" · ")}
                  <span className="mt-1 block text-sm text-dim">Written and spoken</span>
                </dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-5">
                <dt className="label pt-1">Based in</dt>
                <dd className="text-[0.95rem]">{location}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
