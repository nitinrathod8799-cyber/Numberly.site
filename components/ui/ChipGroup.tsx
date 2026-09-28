export function ChipGroup({
  options,
  activeValue,
  onSelect,
}: {
  options: { label: string; value: string }[];
  activeValue?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((opt) => {
        const active = opt.value === activeValue;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            aria-pressed={active}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "border-brand bg-brand text-white"
                : "border-line-strong bg-surface text-ink-soft hover:border-brand/40 hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
