import { TESTIMONIALS } from "../../lib/data";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";

export function Testimonials() {
  return (
    <Section variant="light">
      <Reveal>
        <SectionHeading eyebrow="Сэтгэгдэл" title={<>Харилцагчид <span className="text-brand">юу гэж</span> хэлдэг</>} />
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 100} className="h-full">
            <figure className="relative flex h-full flex-col rounded-3xl border border-ink/5 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo/10">
              <span aria-hidden className="text-brand font-display text-6xl leading-none">“</span>
              <blockquote className="-mt-4 flex-1 leading-relaxed text-ink/75">{t.text}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/5 pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white">
                  {t.name.replace(/^[^ ]+ /, "").charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-ink">{t.name}</p>
                  <p className="truncate text-sm text-ink/55">{t.role}</p>
                </div>
                <div className="shrink-0 text-sm text-amber-400" aria-label={`${t.rating} од`}>
                  {"★".repeat(t.rating)}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}