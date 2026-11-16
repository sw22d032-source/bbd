"use client";

import { useMemo, useState } from "react";
import { PORTFOLIO, PORTFOLIO_CATEGORIES, TECH_ICONS, type PortfolioCategory } from "../../lib/data";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/Section";

export function Portfolio() {
  const [filter, setFilter] = useState<PortfolioCategory>("all");

  const shown = useMemo(() => {
    if (filter === "all") return PORTFOLIO;
    return PORTFOLIO.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="portfolio" className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Ажлууд"
            title={<>Хийсэн <span className="text-brand">төслүүд</span></>}
            text="Бидний хэрэгжүүлсэн зарим төслүүд. Таны төсөл дараагийнх байж болно."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-10 flex w-fit flex-wrap justify-center gap-1 rounded-full border border-ink/5 bg-white p-1.5 shadow-sm">
            {PORTFOLIO_CATEGORIES.map((c) => {
              const active = filter === c.key;
              const count = c.key === "all" ? PORTFOLIO.length : PORTFOLIO.filter((p) => p.category === c.key).length;

              return (
                <button
                  key={c.key}
                  onClick={() => setFilter(c.key)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                    active ? "bg-brand text-white shadow-lg shadow-indigo/30" : "text-ink/60 hover:bg-indigo/5 hover:text-indigo"
                  }`}
                >
                  {c.label}
                  <span className={`ml-1.5 text-xs ${active ? "opacity-80" : "opacity-60"}`}>({count})</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div key={filter} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((project, i) => (
            <Reveal key={project.id} delay={i * 50}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-brand p-8 text-center text-white shadow-2xl shadow-indigo/30 sm:p-12">
            <div className="dot-bg absolute inset-0 opacity-30 invert" />
            <h3 className="relative font-display text-xl font-bold sm:text-2xl lg:text-3xl">
              Таны төсөл дараагийнх байж болно
            </h3>
            <p className="relative mx-auto mt-3 max-w-xl text-sm text-white/85 sm:text-base">
              Санаагаа бидэнтэй хуваалцаарай. Үнэгүй зөвлөгөө, тодорхой үнэ, тогтсон хугацаа.
            </p>
            <a
              href="#contact"
              className="relative mt-7 inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-indigo shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:text-base"
            >
              Төслөө ярилцах →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type Project = (typeof PORTFOLIO)[number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo/15">
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${project.color}`}>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl transition-transform duration-500 group-hover:scale-110">{project.icon}</span>
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-ink backdrop-blur">
          {project.categoryLabel}
        </span>
        {project.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-ink">⭐</span>
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-ink/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-transform hover:scale-105"
              aria-label="GitHub repo"
            >
              ⌘ GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-105"
              aria-label="Live demo"
            >
              ↗ Demo
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-sm font-bold leading-snug text-ink">{project.title}</h3>
        <p className="mt-1.5 line-clamp-3 flex-1 text-xs leading-relaxed text-ink/70">{project.desc}</p>

        {project.features.length > 0 && (
          <ul className="mt-3 space-y-1">
            {project.features.slice(0, 2).map((f) => (
              <li key={f} className="flex items-start gap-1.5 text-[11px] text-ink/70">
                <span className="font-bold text-indigo">✓</span>
                <span className="line-clamp-1">{f}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-ink/5 pt-3">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 rounded-full bg-indigo/5 px-2 py-0.5 text-[10px] font-semibold text-indigo"
            >
              {TECH_ICONS[tech] && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={TECH_ICONS[tech]} alt="" width={12} height={12} loading="lazy" className="h-3 w-3" />
              )}
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="inline-flex items-center rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-medium text-ink/50">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}