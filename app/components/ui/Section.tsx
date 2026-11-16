import type { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark" | "white";
};

const VARIANTS = {
  light: "bg-paper text-ink",
  dark: "grid-bg text-white",
  white: "bg-white text-ink",
} as const;

export function Section({ id, children, className = "", variant = "light" }: Props) {
  return (
    <section id={id} className={`${VARIANTS[variant]} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  tone = "dark",
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <div className="text-center">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-[0.18em] ${
          light ? "bg-white/10 text-cyan" : "bg-indigo/8 text-indigo"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        {eyebrow}
      </span>
      <h2 className={`mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {text && <p className={`mx-auto mt-4 max-w-2xl ${light ? "text-white/75" : "text-ink/65"}`}>{text}</p>}
    </div>
  );
}