import { SERVICES } from "../../lib/data";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";

export function Services() {
  return (
    <Section id="services" variant="light">
      <Reveal>
        <SectionHeading
          eyebrow="Үйлчилгээ"
          title={<>Бид <span className="text-brand">юу хийдэг</span> вэ</>}
          text="App development, web design, software development — таны бизнесийн хэрэгцээнд тохирсон бүрэн дижитал шийдэл."
        />
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 60}>
            <article className="ring-brand group h-full rounded-3xl border border-ink/5 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-2xl shadow-lg shadow-indigo/25 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                {s.icon}
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.text}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <li key={t} className="rounded-full bg-indigo/5 px-3 py-1 text-xs font-semibold text-indigo">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}