"use client";

import { useState } from "react";
import { FAQ as FAQ_DATA } from "../../lib/data";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" variant="white">
      <Reveal>
        <SectionHeading eyebrow="Асуулт" title={<>Түгээмэл <span className="text-brand">асуултууд</span></>} />
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {FAQ_DATA.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 50}>
              <div
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen ? "border-indigo/20 bg-paper shadow-lg shadow-indigo/5" : "border-ink/8 bg-white hover:border-indigo/20"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold text-ink"
                >
                  <span>{item.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg transition-all duration-300 ${
                      isOpen ? "rotate-45 bg-brand text-white" : "bg-indigo/8 text-indigo"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="px-6 pb-5 leading-relaxed text-ink/65">{item.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}