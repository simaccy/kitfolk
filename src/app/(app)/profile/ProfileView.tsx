"use client";

import {
  CalendarDays,
  ChevronRight,
  LogOut,
  MapPin,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AppHeader } from "@/components/app/AppHeader";
import { Avatar } from "@/components/app/Avatar";
import { AvailabilityChip } from "@/components/app/AvailabilityChip";
import { TrustBadge } from "@/components/app/TrustBadge";
import { TrustScore } from "@/components/app/TrustScore";
import type { Crew } from "@/lib/types";

type ViewUser = Crew & { email?: string | null; image?: string | null };
type Tab = "about" | "credits" | "kit" | "vouches";

export function ProfileView({
  user,
  onSignOut,
}: {
  user: ViewUser;
  onSignOut: () => Promise<void>;
}) {
  const [tab, setTab] = useState<Tab>("about");

  return (
    <>
      <AppHeader
        title="PROFILE"
        right={
          <Link
            href="/profile/edit"
            className="text-mute hover:text-ink"
            aria-label="Edit"
          >
            <Settings size={18} />
          </Link>
        }
      />

      <section className="border-rule border-b px-4 pt-6 pb-5">
        <div className="flex items-start gap-4">
          <Avatar
            name={user.name}
            hue={user.avatarHue}
            size={72}
            src={user.image ?? undefined}
          />
          <div className="min-w-0 flex-1">
            <h1 className="serif text-ink text-3xl leading-tight">{user.name}</h1>
            <p className="label text-bone mt-1">
              {user.role.toUpperCase()}
              {user.secondaryRoles && (
                <span className="text-dim">
                  {user.secondaryRoles.map((r) => ` · ${r}`).join("")}
                </span>
              )}
            </p>
            <p className="text-mute mt-2 flex items-center gap-1.5 text-[12px]">
              <MapPin size={12} /> {user.location}
            </p>
            {user.email && (
              <p className="mono text-dim mt-1 truncate text-[11px]">
                {user.email}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="label text-mute">TRUST</p>
            <div className="mt-1">
              <TrustScore value={user.trustScore} size="lg" />
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <AvailabilityChip mode={user.availability} fromDate={user.availableFrom} />
          <button className="label text-flare inline-flex items-center gap-1">
            <CalendarDays size={11} /> Update
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {user.badges.map((b) => (
            <TrustBadge key={b} type={b} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-rule grid grid-cols-3 border-b">
        <Stat label="Day rate" value={user.dayRate ? `£${user.dayRate}` : "—"} />
        <Stat label="Reply rate" value={`${user.responseRate}%`} border />
        <Stat label="Bookings" value={String(user.bookingsCount)} border />
      </section>

      {/* Tabs */}
      <div className="border-rule sticky top-12 z-20 grid grid-cols-4 border-b bg-bg/85 backdrop-blur-md md:top-14">
        {(["about", "credits", "kit", "vouches"] as Tab[]).map((t) => {
          const active = t === tab;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`label py-3 transition-colors ${
                active ? "text-ink" : "text-mute hover:text-ink"
              }`}
            >
              <span
                className={`relative pb-2 ${
                  active ? "border-flare border-b-2" : ""
                }`}
              >
                {t.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>

      <div className="px-4 py-5">
        {tab === "about" && <AboutTab user={user} />}
        {tab === "credits" && <CreditsTab user={user} />}
        {tab === "kit" && <KitTab user={user} />}
        {tab === "vouches" && <VouchesTab user={user} />}
      </div>

      {/* Quick links */}
      <section className="border-rule border-t">
        <ul className="divide-rule divide-y">
          {[
            { href: "/bookings", label: "My bookings" },
            { href: "/profile/edit", label: "Edit profile" },
            { href: "/messages", label: "Messages" },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-ink hover:bg-ink/[0.02] flex items-center justify-between px-4 py-4 text-[14px]"
              >
                {l.label}
                <ChevronRight size={16} className="text-dim" />
              </Link>
            </li>
          ))}
          <li>
            <form action={onSignOut}>
              <button
                type="submit"
                className="text-mute hover:text-ink hover:bg-ink/[0.02] flex w-full items-center gap-2 px-4 py-4 text-left text-[14px]"
              >
                <LogOut size={14} /> Sign out
              </button>
            </form>
          </li>
        </ul>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  border,
}: {
  label: string;
  value: string;
  border?: boolean;
}) {
  return (
    <div className={`px-4 py-4 ${border ? "border-rule border-l" : ""}`}>
      <p className="label text-mute">{label.toUpperCase()}</p>
      <p className="serif text-ink mt-1 text-2xl">{value}</p>
    </div>
  );
}

function AboutTab({ user }: { user: ViewUser }) {
  return (
    <div className="space-y-5">
      {user.bio && (
        <p className="text-ink text-[15px] leading-relaxed">{user.bio}</p>
      )}

      <Block title="GENRES">
        <Chips items={user.genres} />
      </Block>
      <Block title="SKILLS">
        <Chips items={user.skills} />
      </Block>
      <Block title="COMPANIES WORKED WITH">
        <Chips items={user.companies} />
      </Block>
      {user.certifications.length > 0 && (
        <Block title="CERTIFICATIONS">
          <Chips items={user.certifications} />
        </Block>
      )}
    </div>
  );
}

function CreditsTab({ user }: { user: ViewUser }) {
  return (
    <ul className="border-rule divide-rule divide-y border-y">
      {user.credits.map((c) => (
        <li
          key={c.title + c.year}
          className="grid grid-cols-12 gap-2 py-3 text-[14px]"
        >
          <span className="text-ink col-span-7 truncate">{c.title}</span>
          <span className="text-mute col-span-3 truncate">{c.role}</span>
          <span className="mono text-bone col-span-2 text-right">{c.year}</span>
        </li>
      ))}
    </ul>
  );
}

function KitTab({ user }: { user: ViewUser }) {
  if (!user.kitOwned || user.kitOwned.length === 0) {
    return <p className="text-mute text-[14px]">No kit listed yet.</p>;
  }
  return (
    <ul className="border-rule divide-rule divide-y border-y">
      {user.kitOwned.map((k) => (
        <li key={k} className="text-ink py-3 text-[14px]">
          {k}
        </li>
      ))}
    </ul>
  );
}

function VouchesTab({ user }: { user: ViewUser }) {
  if (user.vouches.length === 0)
    return <p className="text-mute text-[14px]">No vouches yet.</p>;
  return (
    <ul className="border-rule divide-rule divide-y border-y">
      {user.vouches.map((v, i) => (
        <li key={i} className="py-4">
          <p className="text-ink text-[14px]">{v.fromName}</p>
          <p className="label text-mute mt-0.5">{v.fromRole.toUpperCase()}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {v.tags.map((t) => (
              <span
                key={t}
                className="border-rule text-bone label border px-1.5 py-0.5"
                style={{ fontSize: 9 }}
              >
                {t}
              </span>
            ))}
          </div>
          {v.note && (
            <p className="text-mute mt-2 text-[13px] italic leading-snug">
              &ldquo;{v.note}&rdquo;
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="label text-mute mb-2">{title}</p>
      {children}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <span
          key={i}
          className="border-rule text-bone label border bg-ink/[0.02] px-2 py-1"
        >
          {i}
        </span>
      ))}
    </div>
  );
}
