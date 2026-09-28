export function ResultStat({
  label,
  value,
  sub,
  emphasis = false,
}: {
  label: string;
  value: string;
  sub?: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        emphasis ? "border-brand/30 bg-brand-soft" : "border-line bg-surface"
      }`}
    >
      <p className={`text-xs font-medium ${emphasis ? "text-brand-dark" : "text-ink-soft"}`}>{label}</p>
      <p
        className={`mt-1 tabular-nums font-bold ${
          emphasis ? "text-2xl text-brand-dark" : "text-xl text-ink"
        }`}
      >
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-ink-faint">{sub}</p>}
    </div>
  );
}
