type MarkProps = {
  size?: number;
  className?: string;
  gradientId?: string;
};

export function LogoMark({ size = 36, className = "", gradientId = "triflow-g" }: MarkProps) {
  return (
    <svg viewBox="0 0 120 100" width={size} height={(size * 100) / 120} className={className} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#00D4FF" />
          <stop offset=".45" stopColor="#2A3BFF" />
          <stop offset=".75" stopColor="#5B21F0" />
          <stop offset="1" stopColor="#C026FF" />
        </linearGradient>
      </defs>
      <path fill={`url(#${gradientId})`} d="M6 40 L26 12 Q31 5 40 5 L117 5 L107 21 Q103 27 96 27 L52 27 Q45 27 40 33 L35 40 Z" />
      <path fill={`url(#${gradientId})`} d="M28 74 L45 42 Q50 33 61 33 L104 33 L95 47 Q91 53 84 53 L60 53 Q51 53 45 60 Z" />
      <path fill={`url(#${gradientId})`} d="M36 97 L52 68 Q56 60 65 60 L88 60 L74 84 Q67 94 55 95 Z" />
    </svg>
  );
}

type LogoProps = {
  size?: number;
  tone?: "dark" | "light";
  withTagline?: boolean;
  className?: string;
  gradientId?: string;
};

export function Logo({ size = 36, tone = "dark", withTagline = false, className = "", gradientId }: LogoProps) {
  const text = tone === "dark" ? "text-ink" : "text-white";
  const sub = tone === "dark" ? "text-ink/55" : "text-white/60";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} gradientId={gradientId} />
      <span className="flex flex-col leading-none">
        <span
          className={`inline-block -skew-x-12 font-display font-extrabold tracking-tight ${text}`}
          style={{ fontSize: size * 0.58 }}
        >
          TRIFLOW
        </span>
        {withTagline && (
          <span className={`mt-1 font-semibold tracking-[0.32em] ${sub}`} style={{ fontSize: Math.max(8, size * 0.2) }}>
            DIGITAL SOLUTIONS
          </span>
        )}
      </span>
    </span>
  );
}