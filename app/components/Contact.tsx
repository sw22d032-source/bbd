import { CONTACT } from "../../lib/data";
import { ProjectWizard } from "./contact/ProjectWizard";
import { Reveal } from "./ui/Reveal";

const WHY = [
  "24 цагийн дотор хариу",
  "Үнэгүй 30 минутын зөвлөгөө",
  "Тодорхой үнэ, далд төлбөргүй",
  "Source code бүрэн танд",
  "Багц бүрд үнэгүй дэмжлэг",
];

export function Contact() {
  const items = [
    { label: "Утас", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, "")}`, icon: "📞" },
    { label: "Имэйл", value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: "✉️" },
    { label: "Хаяг", value: CONTACT.address, href: undefined, icon: "📍" },
  ];

  return (
    <section id="contact" className="grid-bg text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_1.45fr]">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              Холбоо барих
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Төслөө эхлүүлье</h2>
            <p className="mt-4 max-w-sm leading-relaxed text-white/75">
              Хэдэн минутын дотор хүсэлтээ үлдээгээрэй. Бид 24 цагийн дотор холбогдож, үнэгүй зөвлөгөө өгнө.
            </p>

            <ul className="mt-8 space-y-3">
              {items.map((it) => {
                const inner = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">{it.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-white/60">{it.label}</span>
                      <span className="block truncate font-semibold">{it.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={it.label}>
                    {it.href ? (
                      <a
                        href={it.href}
                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-cyan/40 hover:bg-white/10"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="font-display text-sm font-bold">Яагаад Triflow гэж?</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/80">
                {WHY.map((w) => (
                  <li key={w} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/20 text-[10px] font-bold text-cyan">✓</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <ProjectWizard />
        </Reveal>
      </div>
    </section>
  );
}