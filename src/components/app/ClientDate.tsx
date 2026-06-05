"use client";

import { useEffect, useState } from "react";

interface Props {
  /** The formatted string to render — pass the output of relativeTime / dateRange / toLocaleDateString */
  value: string;
  /** Shown during SSR and before hydration — default empty string avoids any mismatch */
  placeholder?: string;
  className?: string;
}

/**
 * Renders a date/time string only on the client to prevent hydration mismatches.
 * SSR outputs the placeholder (default: empty), the client swaps in the real value
 * after mount. Use this wherever relativeTime(), dateRange(), or locale-formatted
 * dates appear in server components or shared components that Next.js SSRs.
 */
export function ClientDate({ value, placeholder = "", className }: Props) {
  const [display, setDisplay] = useState(placeholder);

  useEffect(() => {
    setDisplay(value);
  }, [value]);

  return <span className={className}>{display}</span>;
}
