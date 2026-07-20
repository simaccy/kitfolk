"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = (localStorage.getItem("sc-theme") ?? "dark") as Theme;
    setTheme(stored);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("sc-theme", next);
  }

  // Reserve space while hydrating to avoid layout shift
  if (theme === null) return <span className="w-14" />;

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="label text-mute hover:text-ink border-rule hover:border-ink/30 flex items-center gap-1.5 border px-3 py-2 transition-colors"
    >
      <span>{theme === "dark" ? "◐" : "◑"}</span>
      <span className="hidden md:inline">{theme === "dark" ? "LIGHT" : "DARK"}</span>
    </button>
  );
}
