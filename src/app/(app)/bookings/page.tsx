"use client";

import Link from "next/link";
import { useState } from "react";
import { AppHeader } from "@/components/app/AppHeader";
import { SegmentedControl } from "@/components/app/SegmentedControl";
import { BOOKINGS } from "@/lib/mock/bookings";
import type { Booking } from "@/lib/types";
import { dateRange, formatGBP, relativeTime } from "@/lib/utils";

type Tab = "active" | "past";

const STATUS_TONE: Record<Booking["status"], string> = {
  REQUESTED: "text-flare",
  CONFIRMED: "text-go",
  AT_HANDOVER: "text-flare",
  IN_USE: "text-bone",
  RETURNED: "text-mute",
  DISPUTED: "text-rec",
  CANCELLED: "text-mute",
};

const STATUS_LABEL: Record<Booking["status"], string> = {
  REQUESTED: "Requested",
  CONFIRMED: "Confirmed",
  AT_HANDOVER: "At handover",
  IN_USE: "In use",
  RETURNED: "Returned",
  DISPUTED: "Disputed",
  CANCELLED: "Cancelled",
};

export default function BookingsPage() {
  const [tab, setTab] = useState<Tab>("active");

  const active = BOOKINGS.filter(
    (b) => b.status !== "RETURNED" && b.status !== "CANCELLED"
  );
  const past = BOOKINGS.filter(
    (b) => b.status === "RETURNED" || b.status === "CANCELLED"
  );
  const list = tab === "active" ? active : past;

  return (
    <>
      <AppHeader title="BOOKINGS" />

      <div className="bg-bg sticky top-12 z-20 px-4 pt-3 pb-3 md:top-14">
        <SegmentedControl<Tab>
          value={tab}
          onChange={setTab}
          options={[
            { id: "active", label: "Active", meta: String(active.length) },
            { id: "past", label: "Past", meta: String(past.length) },
          ]}
        />
      </div>

      <ul className="space-y-3 px-4 pb-6">
        {list.map((b) => (
          <li key={b.id}>
            <Link
              href={`/bookings/${b.id}`}
              className="border-rule-strong bg-surface block border hover:bg-ink/[0.02]"
            >
              <div className="border-rule label flex items-center justify-between border-b px-4 py-2.5">
                <span className="text-bone">{b.ref}</span>
                <span className={STATUS_TONE[b.status]}>
                  ● {STATUS_LABEL[b.status]}
                </span>
              </div>
              <div className="px-4 pt-3 pb-4">
                <p className="text-ink text-[15px] tracking-tight">
                  {b.subjectName}
                </p>
                <p className="text-mute mt-0.5 text-[12px]">{b.subjectMeta}</p>
                <div className="text-mute mono mt-2 flex items-center gap-2 text-[12px]">
                  <span>{dateRange(b.startDate, b.endDate)}</span>
                  <span className="text-dim">·</span>
                  <span>{formatGBP(b.total)}</span>
                  <span className="text-dim">·</span>
                  <span className="label">{b.protection.replace("_", " ")}</span>
                </div>
                <p className="label text-dim mt-3">
                  Booked {relativeTime(b.postedAt)}
                </p>
              </div>
            </Link>
          </li>
        ))}
        {list.length === 0 && (
          <li className="text-mute py-12 text-center text-[14px]">
            No {tab} bookings.
          </li>
        )}
      </ul>
    </>
  );
}
