import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Credentials() {
  const { credentials, education } = profile;
  return (
    <section id="credentials" className="border-t border-line py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="05"
          label="Credentials"
          title={
            <>
              Certified across <span className="text-muted">Azure, AWS and SAS.</span>
            </>
          }
        />

        <ul className="grid gap-px border border-line bg-line md:grid-cols-3">
          {credentials.map((c, i) => (
            <Reveal
              as="li"
              key={c.title}
              delay={i * 0.08}
              className="flex min-h-56 flex-col justify-between bg-bg p-7 transition-colors hover:bg-surface-2 md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="label text-accent">{c.issuer}</span>
                <span className="label">{c.date}</span>
              </div>
              <p className="mt-10 text-2xl leading-tight font-semibold tracking-[-0.025em]">
                {c.title}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-px grid gap-6 border border-t-0 border-line bg-surface/50 p-7 md:grid-cols-[1fr_auto] md:items-end md:p-8">
          <div>
            <p className="label text-accent">Education</p>
            <p className="mt-5 text-2xl leading-tight font-semibold tracking-[-0.025em]">
              {education.degree}
            </p>
            <p className="mt-2 text-muted">
              {education.minor} · {education.school}
            </p>
          </div>
          <p className="label">{education.period}</p>
        </Reveal>
      </div>
    </section>
  );
}
