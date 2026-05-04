import { BadgeCheck, MapPin, MessageCircle, Share2 } from "lucide-react";
import type { Call } from "@/lib/types";
import { dateRange, formatGBP, relativeTime } from "@/lib/utils";

const TYPE_TONE: Record<Call["type"], string> = {
  CREW: "text-flare",
  KIT: "text-bone",
  BOTH: "text-go",
};
const URGENCY_TONE: Record<Call["urgency"], { label: string; class: string }> = {
  URGENT: { label: "URGENT", class: "text-rec" },
  THIS_WEEK: { label: "This week", class: "text-flare" },
  FLEXIBLE: { label: "Flexible", class: "text-mute" },
};

export function CallCard({ call }: { call: Call }) {
  const u = URGENCY_TONE[call.urgency];
  return (
    <article className="border-rule-strong bg-surface relative border">
      <div className="flex items-center justify-between border-b border-ink/[0.04] px-4 py-2.5">
        <span className={`label ${TYPE_TONE[call.type]}`}>
          ● {call.type === "BOTH" ? "CREW + KIT" : call.type}
        </span>
        <span className={`label ${u.class}`}>{u.label.toUpperCase()}</span>
      </div>

      <div className="px-4 pt-4 pb-3">
        <h3 className="serif text-ink text-[20px] leading-tight">
          {call.title}
        </h3>

        <div className="text-mute mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {call.location}
          </span>
          <span className="text-dim">·</span>
          <span className="mono">
            {dateRange(call.startDate, call.endDate)}
          </span>
        </div>

        {call.budgetMin && (
          <p className="text-bone mt-3 text-[14px]">
            <span className="serif text-ink text-lg">
              {formatGBP(call.budgetMin)}
              {call.budgetMax && call.budgetMax !== call.budgetMin
                ? `–${formatGBP(call.budgetMax)}`
                : ""}
            </span>
            <span className="label text-dim ml-1.5">/{call.rateUnit}</span>
          </p>
        )}

        {call.requirements.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {call.requirements.slice(0, 4).map((r) => (
              <li
                key={r}
                className="border-rule text-bone label border bg-ink/[0.02] px-1.5 py-0.5"
                style={{ fontSize: 9 }}
              >
                {r}
              </li>
            ))}
          </ul>
        )}

        <div className="border-rule mt-4 flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2">
            <span className="text-ink text-[12px]">
              {call.postedByName}
              {call.postedByCompany && (
                <span className="text-mute"> · {call.postedByCompany}</span>
              )}
            </span>
            {call.verified && (
              <BadgeCheck size={13} className="text-flare shrink-0" />
            )}
          </div>
          <span className="label text-dim">
            {relativeTime(call.postedAt)} · {call.responses} replies
          </span>
        </div>
      </div>

      <div className="border-rule grid grid-cols-3 border-t">
        <button className="text-ink bg-ink/[0.04] hover:bg-ink/10 label col-span-1 flex items-center justify-center gap-1.5 py-2.5">
          <MessageCircle size={13} /> Respond
        </button>
        <button className="border-rule text-mute hover:text-ink hover:bg-ink/5 label flex items-center justify-center border-l py-2.5">
          Save
        </button>
        <button className="border-rule text-mute hover:text-ink hover:bg-ink/5 label flex items-center justify-center gap-1.5 border-l py-2.5">
          <Share2 size={13} /> Share
        </button>
      </div>
    </article>
  );
}
