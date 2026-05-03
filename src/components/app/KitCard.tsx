import { ArrowRight, MapPin, Package, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { Kit } from "@/lib/types";
import { AvailabilityChip } from "./AvailabilityChip";

export function KitCard({ kit }: { kit: Kit }) {
  return (
    <article className="border-rule-strong bg-surface block border">
      <Link
        href={`/kit/${kit.id}`}
        className="block px-4 pt-4 pb-3 active:bg-white/[0.02]"
      >
        <div className="flex items-start gap-3">
          <span
            className="border-rule-strong relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border"
            style={{
              background: `radial-gradient(circle at 30% 30%, hsl(${kit.hue} 60% 35% / 0.45), hsl(${kit.hue} 30% 12% / 0.7))`,
            }}
            aria-hidden
          >
            <Package size={20} className="text-bone" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-ink truncate text-[15px] tracking-tight">
                {kit.name}
              </p>
              <p className="serif text-ink shrink-0 text-base">
                £{kit.dayRate}
                <span className="label text-dim ml-1">/day</span>
              </p>
            </div>
            <p className="label text-bone mt-0.5">
              {kit.category.toUpperCase()}
              <span className="text-dim ml-1.5">· {kit.ownerName}</span>
            </p>
            <p className="text-mute mt-2 flex items-center gap-1.5 text-[12px]">
              <MapPin size={12} className="shrink-0" />
              {kit.location}
              <span className="text-dim mx-1">·</span>
              <AvailabilityChip
                mode={
                  kit.availability === "BOOKED"
                    ? "BOOKED"
                    : kit.availability === "AVAILABLE_FROM"
                      ? "AVAILABLE_FROM"
                      : "AVAILABLE_NOW"
                }
                fromDate={kit.availableFrom}
              />
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          {kit.insured && (
            <span className="label text-go inline-flex items-center gap-1">
              <ShieldCheck size={11} /> Insured
            </span>
          )}
          <span className="label text-mute">
            Condition <span className="text-bone">{kit.conditionScore}</span>
          </span>
          {kit.operatorAvailable && (
            <span className="label text-flare">+ operator</span>
          )}
        </div>
      </Link>

      <div className="border-rule grid grid-cols-2 border-t">
        <Link
          href={`/kit/${kit.id}`}
          className="text-mute hover:text-ink hover:bg-white/5 label flex items-center justify-center gap-1.5 py-2.5"
        >
          View
          <ArrowRight size={13} />
        </Link>
        <Link
          href={`/kit/${kit.id}#book`}
          className="border-rule text-ink bg-white/[0.04] hover:bg-white/10 label flex items-center justify-center border-l py-2.5"
        >
          Request →
        </Link>
      </div>
    </article>
  );
}
