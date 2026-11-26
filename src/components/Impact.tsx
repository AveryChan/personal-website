import { profile } from "@/content/profile";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Impact() {
  return (
    <section id="impact" className="border-y border-line bg-surface/40 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Impact"
          title={
            <>
              Measured in runtime, cost <span className="text-muted">and hours returned.</span>
            </>
          }
        />

        <dl className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {profile.metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 0.08}
              className="group relative border-r border-b border-line p-7 transition-colors hover:bg-surface-2 md:p-9"
            >
              <dt className="label">{m.label}</dt>
              <dd className="mt-8">
                <span className="block text-6xl leading-none font-semibold tracking-[-0.05em] text-accent md:text-7xl">
                  {m.display ? (
                    m.display
                  ) : (
                    <CountUp value={m.value ?? 0} prefix={m.prefix} suffix={m.suffix} />
                  )}
                </span>
                <span className="mt-6 block min-h-[4.5rem] text-[0.95rem] leading-relaxed text-muted">
                  {m.detail}
                </span>
              </dd>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
              />
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
