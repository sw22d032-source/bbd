import { PRICING } from "../../lib/data";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";

export function Pricing() {
  return (
    <Section id="pricing" variant="white">
      <Reveal>
        <SectionHeading
          eyebrow="Үнэ"
          title={<>Танд тохирох <span className="text-brand">багц</span></>}
          text="Ил тод үнэ, далд төлбөр байхгүй. Бүх багцад source code, сургалт багтсан."
        />
      </Reveal>

      <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
        {PRICING.map((p, i) => (
          <Reveal key={p.name} delay={i * 100} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                p.popular
                  ? "bg-brand text-white shadow-2xl shadow-indigo/35 md:-my-4 md:py-11"
                  : "border border-ink/8 bg-paper text-ink hover:shadow-xl hover:shadow-ink/5"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                  ⭐ Хамгийн эрэлттэй
                </span>
              )}

              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className={`mt-1 text-sm ${p.popular ? "text-white/80" : "text-ink/55"}`}>{p.desc}</p>

              <div className={`mt-6 border-b pb-6 ${p.popular ? "border-white/20" : "border-ink/8"}`}>
                <p className="font-display text-3xl font-bold">{p.price}</p>
                <p className={`mt-1.5 text-xs font-medium ${p.popular ? "text-white/70" : "text-ink/50"}`}>⏱ {p.duration}</p>
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        p.popular ? "bg-white/20 text-white" : "bg-indigo/10 text-indigo"
                      }`}
                    >
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 block rounded-full py-3.5 text-center font-bold transition-all hover:-translate-y-0.5 ${
                  p.popular ? "bg-white text-indigo shadow-lg hover:shadow-xl" : "bg-ink text-white hover:bg-indigo"
                }`}
              >
                Захиалах
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-ink/55">
        💡 Том төсөл эсвэл тусгай шаардлагатай бол{" "}
        <a href="#contact" className="font-bold text-indigo underline-offset-4 hover:underline">
          холбоо барина уу
        </a>
        .
      </p>
    </Section>
  );
}