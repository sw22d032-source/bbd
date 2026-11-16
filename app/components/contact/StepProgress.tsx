"use client";

import { WIZARD_STEPS } from "../../../lib/discovery";

type Props = {
  current: number;
  total?: number;
};

export function StepProgress({ current, total = WIZARD_STEPS.length }: Props) {
  const active = WIZARD_STEPS[current - 1];

  return (
    <div className="mb-8">
      <ol className="flex items-center gap-2">
        {WIZARD_STEPS.map((step, i) => {
          const num = i + 1;
          const done = num < current;
          const isActive = num === current;

          return (
            <li key={step.id} className="flex flex-1 items-center gap-2 last:flex-none">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  done ? "bg-brand text-white" : isActive ? "bg-brand text-white ring-4 ring-indigo/15" : "bg-ink/5 text-ink/40"
                }`}
              >
                {done ? "✓" : num}
              </span>
              <span className={`hidden whitespace-nowrap text-sm font-bold sm:block ${isActive ? "text-ink" : "text-ink/45"}`}>
                {step.title}
              </span>
              {num < total && (
                <span className={`h-0.5 min-w-4 flex-1 rounded-full transition-colors ${done ? "bg-brand" : "bg-ink/10"}`} />
              )}
            </li>
          );
        })}
      </ol>

      {active && (
        <p className="mt-3 text-xs font-medium text-ink/50">
          Алхам {current}/{total} · {active.desc}
        </p>
      )}
    </div>
  );
}