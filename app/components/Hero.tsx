import { LogoMark } from "./ui/Logo";

const PILLARS = [
  { icon: "📱", title: "App Development", text: "iOS & Android" },
  { icon: "🖥️", title: "Web Design", text: "UI/UX, вэб сайт" },
  { icon: "</>", title: "Software", text: "Захиалгат систем" },
];

export function Hero() {
  return (
    <section id="top" className="relative -mt-[68px] overflow-hidden pt-[68px]">
      <div className="dot-bg absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-cyan/25 blur-3xl" />
      <div className="absolute -right-32 top-20 h-[26rem] w-[26rem] rounded-full bg-magenta/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-14 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo/15 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Шинэ төсөл хүлээн авч байна
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
            Таны санааг <span className="text-brand">бодит бүтээгдэхүүн</span> болгоно
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/65">
            Вэб сайт, мобайл апп, захиалгат програм хангамж. Санаанаас эхлээд
            ашиглалтад оруулах хүртэл бүх шатыг нэг дор.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-bold text-white shadow-xl shadow-indigo/30 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo/40"
            >
              Үнэгүй зөвлөгөө авах
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center rounded-full border border-ink/10 bg-white px-7 py-3.5 font-bold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo/30 hover:text-indigo"
            >
              Ажлууд үзэх
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink/60">
            {["24 цагт хариу", "Үнэгүй зөвлөгөө", "Source code танд"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo/10 text-[11px] font-bold text-indigo">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-6 rounded-[2.5rem] bg-brand opacity-30 blur-2xl" />
          <div className="relative rounded-[2.5rem] border border-white bg-white/80 p-8 shadow-2xl shadow-indigo/15 backdrop-blur-xl">
            <div className="flex aspect-[6/5] items-center justify-center rounded-3xl bg-paper">
              <LogoMark
                size={240}
                gradientId="logo-hero"
                className="h-auto w-3/4 animate-float drop-shadow-[0_20px_30px_rgba(42,59,255,0.25)]"
              />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {PILLARS.map((p) => (
                <div key={p.title} className="rounded-2xl border border-ink/5 bg-white p-3 text-center shadow-sm">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
                    {p.icon}
                  </div>
                  <p className="mt-2 text-[11px] font-bold leading-tight text-ink">{p.title}</p>
                  <p className="mt-0.5 text-[10px] text-ink/50">{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -left-4 top-10 hidden rounded-2xl bg-white px-4 py-3 shadow-xl shadow-ink/10 sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/50">Хүргэлт</p>
            <p className="font-display text-sm font-bold text-ink">2–6 долоо хоног</p>
          </div>
        </div>
      </div>
    </section>
  );
}