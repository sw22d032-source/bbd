import { TRUST_STATS } from "../../lib/data";

export function TrustBar() {
  return (
    <section className="relative z-10 -mt-10 px-6">
      <div className="mx-auto grid max-w-5xl grid-cols-2 divide-ink/5 overflow-hidden rounded-3xl border border-ink/5 bg-white shadow-xl shadow-ink/5 sm:grid-cols-4 sm:divide-x">
        {TRUST_STATS.map(({ value, label }) => (
          <div key={label} className="px-4 py-7 text-center">
            <p className="font-display text-3xl font-bold text-brand">{value}</p>
            <p className="mt-1.5 text-xs font-medium text-ink/55 sm:text-sm">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}