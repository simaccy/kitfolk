export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

export function relativeTime(iso: string, now = new Date()): string {
  const then = new Date(iso);
  const diff = (now.getTime() - then.getTime()) / 1000;
  if (diff < 60) return "now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return then.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function formatGBP(n: number): string {
  return `£${n.toLocaleString("en-GB")}`;
}

export function dateRange(startISO: string, endISO?: string): string {
  const s = new Date(startISO);
  if (!endISO) {
    return s.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }
  const e = new Date(endISO);
  const sameMonth = s.getMonth() === e.getMonth();
  const sameYear = s.getFullYear() === e.getFullYear();
  if (sameMonth && sameYear) {
    return `${s.getDate()}–${e.getDate()} ${e.toLocaleDateString("en-GB", { month: "short" })}`;
  }
  return `${s.toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${e.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`;
}
