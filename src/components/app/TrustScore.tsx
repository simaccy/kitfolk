export function TrustScore({
  value,
  size = "md",
}: {
  value: number;
  size?: "sm" | "md" | "lg";
}) {
  const dim = size === "lg" ? 64 : size === "md" ? 44 : 32;
  const stroke = size === "lg" ? 4 : 3;
  const r = (dim - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  const fontSize =
    size === "lg" ? "text-3xl" : size === "md" ? "text-base" : "text-[12px]";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={dim} height={dim} className="-rotate-90">
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke="var(--color-flare)"
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${c}`}
          strokeLinecap="butt"
        />
      </svg>
      <span
        className={`serif text-ink absolute inset-0 flex items-center justify-center leading-none ${fontSize}`}
      >
        {value}
      </span>
    </div>
  );
}
