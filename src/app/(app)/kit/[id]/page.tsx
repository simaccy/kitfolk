import {
  CalendarDays,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Package,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/app/AppHeader";
import { AvailabilityChip } from "@/components/app/AvailabilityChip";
import { findKit } from "@/lib/mock/kit";
import { formatGBP } from "@/lib/utils";

export default async function KitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kit = findKit(id);
  if (!kit) notFound();

  return (
    <>
      <AppHeader title="KIT" back />

      {/* Hero photo */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/[0.06]"
        style={{
          background: `radial-gradient(circle at 30% 30%, hsl(${kit.hue} 60% 35% / 0.4), hsl(${kit.hue} 30% 10% / 0.85))`,
        }}
      >
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Package size={56} className="text-bone/60" />
        </div>
        <div className="absolute top-3 right-3 left-3 flex items-center justify-between">
          <span className="label text-mute">{kit.category.toUpperCase()}</span>
          <span className="label text-mute">PHOTO 1 / 1</span>
        </div>
        <div className="absolute right-3 bottom-3">
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
        </div>
      </div>

      <section className="border-rule border-b px-4 pt-5 pb-5">
        <h1 className="serif text-ink text-3xl leading-tight">{kit.name}</h1>

        <p className="text-mute mt-2 flex items-center gap-1.5 text-[13px]">
          <MapPin size={13} /> {kit.location}
          <span className="text-dim mx-1">·</span>
          <Link
            href={`/crew/${kit.ownerId}`}
            className="text-bone hover:text-ink underline-offset-2 hover:underline"
          >
            {kit.ownerName}
          </Link>
        </p>

        <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden border border-white/[0.06]">
          <RatePill label="Day" value={formatGBP(kit.dayRate)} />
          <RatePill label="Week" value={formatGBP(kit.weekRate)} />
          <RatePill label="Deposit" value={formatGBP(kit.deposit)} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {kit.insured && (
            <span className="label text-go inline-flex items-center gap-1">
              <ShieldCheck size={12} /> Insured by owner
            </span>
          )}
          <span className="label text-mute">
            Condition <span className="text-bone">{kit.conditionScore}</span>
          </span>
          {kit.operatorAvailable && (
            <span className="label text-flare inline-flex items-center gap-1">
              <User size={11} /> Operator available
            </span>
          )}
        </div>

        <p className="text-mute mt-5 text-[14px] leading-relaxed">
          {kit.description}
        </p>
      </section>

      <Section title="01 / WHAT'S INCLUDED">
        <ul className="divide-rule divide-y">
          {kit.includes.map((i) => (
            <li
              key={i}
              className="text-ink flex items-center gap-2 px-4 py-2.5 text-[14px]"
            >
              <CheckCircle2 size={14} className="text-go shrink-0" />
              {i}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="02 / HANDOVER">
        <div className="space-y-3 px-4 pb-4">
          <p className="text-mute flex items-center gap-2 text-[14px]">
            <Truck size={14} className="text-bone" />
            {kit.handoverPreference === "Either"
              ? "Pickup or delivery — owner is flexible"
              : `${kit.handoverPreference} preferred`}
          </p>
          <p className="text-dim text-[13px]">
            All bookings on KitFolk include the Handover protocol — PIN-confirmed
            pickup, photo checklist, and a damage dispute window.
          </p>
        </div>
      </Section>

      {/* Booking */}
      <section id="book" className="border-rule scroll-mt-20 border-b">
        <div className="flex items-center justify-between px-4 pt-5 pb-3">
          <p className="label text-bone">03 / REQUEST BOOKING</p>
        </div>

        <div className="space-y-3 px-4 pb-5">
          <div className="border-rule-strong bg-surface flex items-center gap-3 border px-4 py-3">
            <CalendarDays size={16} className="text-bone" />
            <div className="flex-1">
              <p className="label text-mute">DATES</p>
              <p className="text-ink mt-0.5 text-[14px]">
                Tap to select dates
              </p>
            </div>
            <span className="text-dim">→</span>
          </div>

          <div className="border-rule-strong bg-surface px-4 py-3">
            <p className="label text-mute mb-2">PROTECTION</p>
            <ul className="space-y-2">
              {[
                ["STANDARD", "No deposit · trust between parties"],
                ["DEPOSIT-BACKED", "Refundable deposit · standard for kit hires"],
                ["INSURED", "Owner insurance covers in-use damage"],
                ["PRODUCTION COVER", "Production company indemnifies"],
              ].map(([k, v], i) => (
                <li key={k as string} className="flex items-start gap-2.5">
                  <span
                    className={`mt-1 inline-flex h-3 w-3 items-center justify-center border ${
                      i === 1 ? "border-flare bg-flare" : "border-rule-strong"
                    }`}
                    aria-hidden
                  />
                  <div className="flex-1">
                    <p className="text-ink text-[13px]">{k}</p>
                    <p className="text-mute text-[12px]">{v}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="border-rule bg-bg/90 sticky bottom-16 z-20 grid grid-cols-2 border-t backdrop-blur-md">
        <Link
          href={`/messages?to=${kit.ownerId}`}
          className="text-mute hover:text-ink hover:bg-white/5 label flex items-center justify-center gap-1.5 py-3.5"
        >
          <MessageCircle size={14} /> Message owner
        </Link>
        <button className="bg-ink text-bg label flex items-center justify-center gap-1.5 py-3.5">
          Request booking →
        </button>
      </div>
    </>
  );
}

function RatePill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface px-3 py-3">
      <p className="label text-mute">{label.toUpperCase()}</p>
      <p className="serif text-ink mt-1 text-xl">{value}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-rule border-b">
      <div className="px-4 pt-5 pb-3">
        <p className="label text-bone">{title}</p>
      </div>
      {children}
    </section>
  );
}
