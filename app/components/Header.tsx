"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "../../lib/data";
import { Logo } from "./ui/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-ink/5 bg-white/85 shadow-[0_8px_30px_-12px_rgba(11,11,30,0.15)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="#top" aria-label="Triflow — нүүр хуудас">
          <Logo size={34} gradientId="logo-header" />
        </a>

        <div className="hidden items-center gap-1 text-sm font-semibold lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-ink/70 transition-colors hover:bg-indigo/5 hover:text-indigo"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-3 rounded-full bg-brand px-5 py-2.5 font-bold text-white shadow-lg shadow-indigo/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo/30"
          >
            Захиалах
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Меню хаах" : "Меню нээх"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-ink hover:bg-ink/5 lg:hidden"
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all ${open ? "top-2 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-2 h-0.5 w-5 rounded bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all ${open ? "top-2 -rotate-45" : "top-4"}`} />
          </span>
        </button>
      </nav>

      <div className={`overflow-hidden transition-[max-height] duration-300 lg:hidden ${open ? "max-h-[30rem]" : "max-h-0"}`}>
        <div className="space-y-1 border-t border-ink/5 px-6 py-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 font-semibold text-ink/80 hover:bg-indigo/5 hover:text-indigo"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-brand px-4 py-3 text-center font-bold text-white"
          >
            Захиалах
          </a>
        </div>
      </div>
    </header>
  );
}