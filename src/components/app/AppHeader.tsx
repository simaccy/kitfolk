"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export function AppHeader({
  title,
  subtitle,
  back,
  right,
}: {
  title: string;
  subtitle?: string;
  back?: boolean | string;
  right?: ReactNode;
}) {
  const router = useRouter();

  return (
    <header className="border-rule bg-bg/85 sticky top-0 z-30 border-b backdrop-blur-md">
      <div className="flex h-12 items-center px-3 md:h-14">
        {back ? (
          <button
            onClick={() => {
              if (typeof back === "string") router.push(back);
              else router.back();
            }}
            className="text-mute hover:text-ink -ml-2 flex h-10 w-10 items-center justify-center"
            aria-label="Back"
          >
            <ChevronLeft size={20} />
          </button>
        ) : (
          <div className="w-2" />
        )}

        <div className="flex-1 text-center">
          <p className="label text-bone">{title}</p>
          {subtitle && (
            <p className="mono text-dim mt-0.5 text-[10px] tracking-wide">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex w-10 items-center justify-end">{right}</div>
      </div>
    </header>
  );
}
