import { STEPS } from "../../lib/data";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";

export function Process() {
  return (
    <Section id="process" variant="white">
      <Reveal>
        <SectionHeading
          eyebrow="Ажлын явц"
          title={<>Хэрхэн <span className="text-brand">ажилладаг</span> вэ</>}
          text="Тодорхой, ил тод 5 үе шат. Та хаана ч байсан явцаа хянах боломжтой."
        />
      </Reveal>

      <ol className="relative mt-16 grid gap-6 md:grid-cols-5">
        <div aria-hidden className="absolute left-[10%] right-[10%] top-8 hidden h-0.5 bg-brand opacity-30 md:block" />

        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 100}>
            <li className="relative flex flex-col items-center text-center">
              <div className="relative">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-ink/5 bg-white text-3xl shadow-lg shadow-indigo/10">
                  {s.icon}
                </span>
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand font-display text-xs font-bold text-white shadow-md">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{s.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}