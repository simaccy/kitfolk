"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

const SUGGESTIONS = [
  "DOP with documentary credits",
  "FX6 in Manchester tomorrow",
  "Drone op available in Bristol",
  "Sound recordist for interview shoot",
  "Editor with Channel 4 credits",
];

export function SearchBar({
  value,
  onChange,
  placeholder = "Search by what you need…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const showSuggestions = focused && !value;

  return (
    <div className="relative">
      <div className="border-rule-strong bg-surface flex items-stretch border focus-within:border-ink/30">
        <span className="text-mute flex w-12 shrink-0 items-center justify-center">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
          placeholder={placeholder}
          className="text-ink placeholder:text-dim flex-1 bg-transparent py-3.5 pr-3 text-[15px] outline-none"
          aria-label="Search"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="text-mute hover:text-ink flex w-10 shrink-0 items-center justify-center"
            aria-label="Clear"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showSuggestions && (
        <div className="border-rule-strong bg-surface absolute inset-x-0 top-full z-30 mt-1 border">
          <p className="label text-mute border-rule border-b px-3 py-2">
            TRY SEARCHING FOR
          </p>
          <ul>
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button
                  onMouseDown={() => onChange(s)}
                  className="text-ink hover:bg-ink/5 flex w-full items-center gap-2 px-3 py-2.5 text-left text-[14px]"
                >
                  <Search size={13} className="text-dim" />
                  <span>{s}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
