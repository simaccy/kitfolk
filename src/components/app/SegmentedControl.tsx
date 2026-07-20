"use client";

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string; meta?: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div
      role="tablist"
      className="border-rule-strong divide-rule-strong flex divide-x border"
    >
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.id)}
            className={`label flex-1 px-3 py-3 transition-colors ${
              active ? "bg-ink text-bg" : "text-mute hover:text-ink hover:bg-ink/5"
            }`}
          >
            {o.label}
            {o.meta && (
              <span className={`ml-1.5 ${active ? "text-bg/50" : "text-dim"}`}>
                {o.meta}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
