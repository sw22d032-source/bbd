import { CONTACT, NAV_LINKS } from "../../lib/data";
import { Logo } from "./ui/Logo";

const SOCIAL = [
  { href: CONTACT.facebook, label: "Facebook", icon: "f" },
  { href: CONTACT.instagram, label: "Instagram", icon: "◎" },
  { href: CONTACT.github, label: "GitHub", icon: "⌘" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-brand" />
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-indigo/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div>
            <Logo size={40} tone="light" withTagline gradientId="logo-footer" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              App development · Web design · Software development. Санаанаас бүтээгдэхүүн хүртэл.
            </p>
          </div>

          <div>
            <p className="font-display text-sm font-bold">Холбоос</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-cyan">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-bold">Холбоо барих</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li><a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-cyan">{CONTACT.phone}</a></li>
              <li><a href={`mailto:${CONTACT.email}`} className="break-all hover:text-cyan">{CONTACT.email}</a></li>
              <li>{CONTACT.address}</li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-bold">Дагах</p>
            <div className="mt-4 flex gap-2.5">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 font-bold transition-all hover:-translate-y-0.5 hover:bg-brand"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Triflow Digital Solutions. Бүх эрх хуулиар хамгаалагдсан.</p>
          <a href="#top" className="hover:text-cyan">Дээш буцах ↑</a>
        </div>
      </div>
    </footer>
  );
}