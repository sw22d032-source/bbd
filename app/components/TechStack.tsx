"use client";

import { useMemo, useState, useTransition } from "react";
import { TECH, TECH_STATS } from "../../lib/data";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/Section";

export function TechStack() {
  const [tab, setTab] = useState<string>("Бүгд");
  const [isPending, startTransition] = useTransition();

  const cats = useMemo(() => Object.keys(TECH), []);

  const shown = useMemo(() => {
    if (tab === "Бүгд") {
      return cats.flatMap((c) => TECH[c].map((t) => ({ name: t[0], icon: t[1], cat: c })));
    }
    return (TECH[tab] ?? []).map((t) => ({ name: t[0], icon: t[1], cat: tab }));
  }, [tab, cats]);

  function handleTab(c: string) {
    startTransition(() => setTab(c));
  }

  return (
    <section id="stack" className="grid-bg text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            tone="light"
            eyebrow="Технологи"
            title="Технологийн стек"
            text="Орчин үеийн технологиудыг ашиглан таны бизнесийн хэрэгцээнд тохирсон өндөр чанартай системүүдийг хөгжүүлнэ."
          />
        </Reveal>

        <div role="tablist" aria-label="Технологийн категори" className="mt-10 flex flex-wrap justify-center gap-2">
          {["Бүгд", ...cats].map((c) => {
            const active = tab === c;
            const count = c === "Бүгд" ? Object.values(TECH).reduce((s, arr) => s + arr.length, 0) : TECH[c].length;

            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                aria-controls="tech-panel"
                onClick={() => handleTab(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  active ? "bg-white text-indigo shadow-lg shadow-cyan/20" : "bg-white/10 text-white/85 hover:bg-white/20"
                }`}
              >
                {c}
                <span className={`ml-1.5 ${active ? "opacity-80" : "opacity-60"}`}>({count})</span>
              </button>
            );
          })}
        </div>

        <div
          id="tech-panel"
          role="tabpanel"
          aria-live="polite"
          className={`mt-8 transition-opacity duration-200 ${isPending ? "opacity-50" : "opacity-100"}`}
        >
          {shown.length === 0 ? (
            <p className="text-white/70">Технологи олдсонгүй.</p>
          ) : (
            <ul key={tab} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {shown.map(({ name, icon, cat }, i) => (
                <li
                  key={`${cat}-${name}`}
                  style={{ animation: `fadeIn 0.35s ease-out ${i * 40}ms both` }}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/95 p-4 text-ink shadow-lg shadow-black/20 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon} alt="" width={36} height={36} loading="lazy" className="h-9 w-9 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate font-bold leading-tight">{name}</p>
                    <p className="text-xs text-ink/60">{cat}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/15 pt-10 text-center md:grid-cols-4">
          {TECH_STATS.map(([v, l]) => (
            <Reveal key={l}>
              <div>
                <dd className="bg-gradient-to-r from-cyan to-white bg-clip-text font-display text-2xl font-bold text-transparent sm:text-3xl">
                  {v}
                </dd>
                <dt className="mt-1 text-sm text-white/75">{l}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}