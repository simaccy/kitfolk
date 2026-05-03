"use client";

import { ChevronDown } from "lucide-react";

export type FilterChip = { id: string; label: string; active?: boolean };

export function FilterChips({
  chips,
  onToggle,
}: {
  chips: FilterChip[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4">
      <div className="flex gap-2 pb-1 whitespace-nowrap">
        {chips.map((c) => (
          <button
            key={c.id}
            onClick={() => onToggle(c.id)}
            className={`label inline-flex items-center gap-1.5 border px-3 py-2 transition-colors ${
              c.active
                ? "border-flare/50 bg-flare/10 text-ink"
                : "border-rule-strong text-mute hover:text-ink hover:border-white/30"
            }`}
          >
            {c.label}
            <ChevronDown size={11} className="opacity-60" />
          </button>
        ))}
      </div>
    </div>
  );
}
