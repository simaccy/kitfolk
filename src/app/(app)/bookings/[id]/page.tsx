import {
  AlertOctagon,
  Camera,
  CheckCircle2,
  Circle,
  KeyRound,
  MessageCircle,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/app/AppHeader";
import { findBooking } from "@/lib/mock/bookings";
import type { Booking } from "@/lib/types";
import { dateRange, formatGBP } from "@/lib/utils";

const STATUS_LABEL: Record<Booking["status"], string> = {
  REQUESTED: "Requested",
  CONFIRMED: "Confirmed",
  AT_HANDOVER: "At handover",
  IN_USE: "In use",
  RETURNED: "Returned",
  DISPUTED: "Disputed",
  CANCELLED: "Cancelled",
};

const TIMELINE: Booking["status"][] = [
  "REQUESTED",
  "CONFIRMED",
  "AT_HANDOVER",
  "IN_USE",
  "RETURNED",
];

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const b = findBooking(id);
  if (!b) notFound();

  const currentIdx = TIMELINE.indexOf(b.status);

  return (
    <>
      <AppHeader title={b.ref} subtitle="BOOKING" back="/bookings" />

      {/* Summary */}
      <section className="border-rule border-b px-4 pt-5 pb-5">
        <p className="label text-flare">
          ● {STATUS_LABEL[b.status].toUpperCase()}
        </p>
        <h1 className="serif text-ink mt-2 text-2xl leading-tight">
          {b.subjectName}
        </h1>
        <p className="text-mute mt-1 text-[13px]">{b.subjectMeta}</p>

        <div className="border-rule mt-4 grid grid-cols-3 border-y">
          <Stat label="Dates" value={dateRange(b.startDate, b.endDate)} />
          <Stat label="Total" value={formatGBP(b.total)} border />
          <Stat label="Cover" value={b.protection.replace("_", " ")} border small />
        </div>
      </section>

      {/* Timeline */}
      <section className="border-rule border-b px-4 pt-5 pb-5">
        <p className="label text-bone mb-4">01 / TIMELINE</p>
        <ol className="relative space-y-3">
          <span className="bg-rule-strong absolute top-2 bottom-2 left-[7px] w-px" />
          {TIMELINE.map((s, i) => {
            const reached = i <= currentIdx;
            const current = i === currentIdx;
            return (
              <li key={s} className="relative flex items-center gap-3 pl-0">
                <span
                  className={`relative z-10 flex h-4 w-4 items-center justify-center ${
                    current
                      ? "bg-flare"
                      : reached
                        ? "bg-go"
                        : "bg-bg border-rule-strong border"
                  }`}
                  aria-hidden
                >
                  {reached && !current && (
                    <CheckCircle2 size={10} className="text-bg" />
                  )}
                </span>
                <span
                  className={`text-[14px] ${
                    current
                      ? "text-ink"
                      : reached
                        ? "text-bone"
                        : "text-mute"
                  }`}
                >
                  {STATUS_LABEL[s]}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Handover */}
      {b.type === "KIT" && (
        <section className="border-rule border-b">
          <div className="flex items-center justify-between px-4 pt-5 pb-3">
            <p className="label text-bone">02 / HANDOVER</p>
            <p className="label text-mute inline-flex items-center gap-1">
              <ShieldCheck size={11} className="text-go" />
              KitFolk-protected
            </p>
          </div>

          {/* PIN / QR */}
          <div className="border-rule mx-4 mb-4 grid grid-cols-2 border">
            <div className="border-rule border-r p-4">
              <p className="label text-mute mb-2">PIN</p>
              <p className="serif text-ink text-3xl tracking-widest">
                {b.handover.pin ?? "— —"}
              </p>
              <p className="text-dim mt-2 text-[11px]">
                Owner reads PIN at pickup.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-4">
              <div
                className="grid h-16 w-16 grid-cols-4 grid-rows-4 gap-px"
                aria-hidden
              >
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      [0, 1, 4, 5, 6, 9, 10, 11, 12, 14, 15].includes(i)
                        ? "bg-ink"
                        : "bg-bg"
                    }
                  />
                ))}
              </div>
              <p className="label text-dim">OR SCAN</p>
            </div>
          </div>

          {/* Pickup checklist */}
          <Block icon={PackageCheck} title="Pickup checklist">
            <ul className="divide-rule divide-y">
              {[
                "Body + lens cap",
                "Battery + charger",
                "Cables verified",
                "Media card formatted",
                "Case + accessories",
                "Photos uploaded",
              ].map((t, i) => {
                const done = i < b.handover.pickupChecklistDone;
                return (
                  <li
                    key={t}
                    className="flex items-center gap-3 px-4 py-2.5 text-[14px]"
                  >
                    {done ? (
                      <CheckCircle2 size={14} className="text-go shrink-0" />
                    ) : (
                      <Circle size={14} className="text-mute shrink-0" />
                    )}
                    <span className={done ? "text-ink" : "text-mute"}>{t}</span>
                  </li>
                );
              })}
            </ul>
            <div className="px-4 pt-3 pb-4">
              <button className="border-rule-strong text-ink hover:bg-ink/5 label flex w-full items-center justify-center gap-2 border py-3">
                <Camera size={13} /> Add pickup photos · {b.handover.pickupPhotos}
              </button>
            </div>
          </Block>

          {/* Return */}
          <Block icon={RotateCcw} title="Return">
            <div className="space-y-2 px-4 pb-4">
              <p className="text-mute text-[13px]">
                Return window opens 24h before end of booking.
              </p>
              <button
                disabled={b.status !== "IN_USE" && b.status !== "RETURNED"}
                className="bg-ink text-bg label flex w-full items-center justify-center gap-2 py-3 disabled:opacity-40"
              >
                <CheckCircle2 size={14} /> Confirm return
              </button>
            </div>
          </Block>

          {/* Dispute */}
          <Block icon={AlertOctagon} title="Damage dispute window">
            <div className="space-y-2 px-4 pb-4">
              <p className="text-mute text-[13px]">
                72-hour window after return. Both parties confirm or open a
                dispute. Deposit released after window closes.
              </p>
              <p className="label text-mute inline-flex items-center gap-1.5">
                <KeyRound size={11} className="text-flare" /> Deposit{" "}
                {b.handover.depositReleased ? "released" : "held"}
              </p>
            </div>
          </Block>
        </section>
      )}

      <div className="border-rule bg-bg/90 sticky bottom-16 z-20 grid grid-cols-2 border-t backdrop-blur-md">
        <Link
          href="/messages"
          className="text-mute hover:text-ink hover:bg-ink/5 label flex items-center justify-center gap-1.5 py-3.5"
        >
          <MessageCircle size={14} /> Message {b.counterpartName.split(" ")[0]}
        </Link>
        <button className="bg-ink text-bg label flex items-center justify-center gap-1.5 py-3.5">
          {b.status === "AT_HANDOVER" ? "Confirm pickup →" : "Open thread →"}
        </button>
      </div>
    </>
  );
}

function Stat({
  label,
  value,
  border,
  small,
}: {
  label: string;
  value: string;
  border?: boolean;
  small?: boolean;
}) {
  return (
    <div className={`px-4 py-3 ${border ? "border-rule border-l" : ""}`}>
      <p className="label text-mute">{label.toUpperCase()}</p>
      <p
        className={`serif text-ink mt-1 leading-tight ${
          small ? "text-base" : "text-xl"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Block({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof CheckCircle2;
  children: React.ReactNode;
}) {
  return (
    <div className="border-rule border-t">
      <p className="label text-bone flex items-center gap-2 px-4 pt-4 pb-3">
        <Icon size={13} className="text-flare" />
        {title.toUpperCase()}
      </p>
      {children}
    </div>
  );
}
