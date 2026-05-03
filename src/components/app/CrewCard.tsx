import { Bookmark, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import type { Crew } from "@/lib/types";
import { Avatar } from "./Avatar";
import { AvailabilityChip } from "./AvailabilityChip";
import { TrustScore } from "./TrustScore";

export function CrewCard({ crew }: { crew: Crew }) {
  return (
    <article className="border-rule-strong bg-surface group relative border">
      <Link
        href={`/crew/${crew.id}`}
        className="block px-4 pt-4 pb-3 active:bg-white/[0.02]"
      >
        <div className="flex items-start gap-3">
          <Avatar name={crew.name} hue={crew.avatarHue} size={48} />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-ink truncate text-[16px] tracking-tight">
                {crew.name}
              </p>
              <TrustScore value={crew.trustScore} size="sm" />
            </div>
            <p className="label text-bone mt-0.5">
              {crew.role.toUpperCase()}
              {crew.dayRate && (
                <span className="text-dim ml-1.5">
                  · £{crew.dayRate}/day
                </span>
              )}
            </p>
            <p className="text-mute mt-2 flex items-center gap-1.5 text-[12px]">
              <MapPin size={12} className="shrink-0" />
              {crew.location}
              <span className="text-dim mx-1">·</span>
              <AvailabilityChip
                mode={crew.availability}
                fromDate={crew.availableFrom}
              />
            </p>
          </div>
        </div>

        {crew.credits.length > 0 && (
          <ul className="border-rule mt-3 space-y-0.5 border-t pt-3">
            {crew.credits.slice(0, 2).map((c) => (
              <li
                key={c.title}
                className="grid grid-cols-12 gap-2 text-[12px]"
              >
                <span className="text-ink col-span-7 truncate">{c.title}</span>
                <span className="text-mute col-span-3 truncate">{c.role}</span>
                <span className="mono text-dim col-span-2 text-right">
                  {c.year}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3 flex items-center gap-3">
          <span className="label text-mute">
            <span className="text-go">●</span> {crew.responseRate}% reply
          </span>
          <span className="label text-mute">
            {crew.bookingsCount} bookings
          </span>
          {crew.vouches.length > 0 && (
            <span className="label text-mute">
              {crew.vouches.length} vouches
            </span>
          )}
        </div>
      </Link>

      <div className="border-rule grid grid-cols-2 border-t">
        <button
          className="text-mute hover:text-ink hover:bg-white/5 label flex items-center justify-center gap-1.5 py-2.5"
          aria-label="Message"
        >
          <MessageCircle size={13} />
          Message
        </button>
        <button
          className="border-rule text-mute hover:text-ink hover:bg-white/5 label flex items-center justify-center gap-1.5 border-l py-2.5"
          aria-label="Save"
        >
          <Bookmark size={13} />
          Save
        </button>
      </div>
    </article>
  );
}
