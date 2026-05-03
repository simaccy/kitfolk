import { Bookmark, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/app/AppHeader";
import { Avatar } from "@/components/app/Avatar";
import { AvailabilityChip } from "@/components/app/AvailabilityChip";
import { TrustBadge } from "@/components/app/TrustBadge";
import { TrustScore } from "@/components/app/TrustScore";
import { findCrew } from "@/lib/mock/crew";

export default async function CrewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const crew = findCrew(id);
  if (!crew) notFound();

  return (
    <>
      <AppHeader
        title="CREW PROFILE"
        back
        right={
          <button className="text-mute hover:text-ink" aria-label="Save">
            <Bookmark size={18} />
          </button>
        }
      />

      {/* Hero */}
      <section className="border-rule border-b px-4 pt-5 pb-5">
        <div className="flex items-start gap-4">
          <Avatar name={crew.name} hue={crew.avatarHue} size={72} />
          <div className="min-w-0 flex-1">
            <h1 className="serif text-ink text-3xl leading-tight">
              {crew.name}
            </h1>
            <p className="label text-bone mt-1">
              {crew.role.toUpperCase()}
              {crew.secondaryRoles && (
                <span className="text-dim">
                  {crew.secondaryRoles.map((r) => ` · ${r}`).join("")}
                </span>
              )}
            </p>
            <p className="text-mute mt-2 flex items-center gap-1.5 text-[12px]">
              <MapPin size={12} /> {crew.location}
            </p>
          </div>
          <div className="text-right">
            <p className="label text-mute">TRUST</p>
            <div className="mt-1">
              <TrustScore value={crew.trustScore} size="lg" />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <AvailabilityChip
            mode={crew.availability}
            fromDate={crew.availableFrom}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {crew.badges.map((b) => (
            <TrustBadge key={b} type={b} />
          ))}
        </div>

        {crew.bio && (
          <p className="text-mute mt-5 text-[14px] leading-relaxed">
            {crew.bio}
          </p>
        )}
      </section>

      {/* Stats */}
      <section className="border-rule grid grid-cols-3 border-b">
        <Stat label="Day rate" value={crew.dayRate ? `£${crew.dayRate}` : "—"} />
        <Stat label="Reply rate" value={`${crew.responseRate}%`} border />
        <Stat label="Bookings" value={String(crew.bookingsCount)} border />
      </section>

      {/* Credits */}
      <Section title="04 / CREDITS" count={crew.credits.length}>
        <ul className="divide-rule divide-y">
          {crew.credits.map((c) => (
            <li
              key={c.title + c.year}
              className="grid grid-cols-12 gap-2 px-4 py-3 text-[14px]"
            >
              <span className="text-ink col-span-7 truncate">
                {c.title}
                {c.type && (
                  <span className="text-dim text-[11px]"> / {c.type}</span>
                )}
              </span>
              <span className="text-mute col-span-3 truncate">{c.role}</span>
              <span className="mono text-bone col-span-2 text-right">{c.year}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Companies */}
      <Section title="05 / COMPANIES">
        <div className="flex flex-wrap gap-1.5 px-4 pb-4">
          {crew.companies.map((c) => (
            <span
              key={c}
              className="border-rule text-bone label border bg-white/[0.02] px-2 py-1"
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      {/* Skills + Genres */}
      <Section title="06 / SKILLS &amp; GENRES">
        <div className="space-y-3 px-4 pb-4">
          <div>
            <p className="label text-mute mb-1.5">SKILLS</p>
            <div className="flex flex-wrap gap-1.5">
              {crew.skills.map((s) => (
                <span
                  key={s}
                  className="border-rule text-ink label border px-2 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="label text-mute mb-1.5">GENRES</p>
            <div className="flex flex-wrap gap-1.5">
              {crew.genres.map((g) => (
                <span
                  key={g}
                  className="border-rule text-ink label border px-2 py-1"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
          {crew.certifications.length > 0 && (
            <div>
              <p className="label text-mute mb-1.5">CERTIFICATIONS</p>
              <div className="flex flex-wrap gap-1.5">
                {crew.certifications.map((c) => (
                  <span
                    key={c}
                    className="border-rule text-bone label border px-2 py-1"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Kit */}
      {crew.kitOwned && crew.kitOwned.length > 0 && (
        <Section title="07 / OWN KIT">
          <ul className="divide-rule divide-y">
            {crew.kitOwned.map((k) => (
              <li key={k} className="text-ink px-4 py-3 text-[14px]">
                {k}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Vouches */}
      <Section
        title="08 / PEER VOUCHES"
        count={crew.vouches.length}
      >
        {crew.vouches.length === 0 ? (
          <p className="text-mute px-4 pb-4 text-[13px]">No vouches yet.</p>
        ) : (
          <ul className="divide-rule divide-y">
            {crew.vouches.map((v, i) => (
              <li key={i} className="px-4 py-4">
                <div className="flex items-start gap-3">
                  <Avatar name={v.fromName} hue={(i * 50) % 360} size={32} />
                  <div className="min-w-0 flex-1">
                    <p className="text-ink text-[14px]">{v.fromName}</p>
                    <p className="label text-mute mt-0.5">
                      {v.fromRole.toUpperCase()}
                    </p>
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
                      <p className="text-mute mt-2 text-[13px] leading-snug italic">
                        &ldquo;{v.note}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Showreel */}
      {crew.showreel && (
        <Section title="09 / SHOWREEL">
          <a
            href={`https://${crew.showreel}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-flare hover:underline block px-4 py-3 text-[14px]"
          >
            {crew.showreel} ↗
          </a>
        </Section>
      )}

      {/* Action bar (sticky bottom inset) */}
      <div
        className="border-rule bg-bg/90 sticky bottom-16 z-20 grid grid-cols-3 border-t backdrop-blur-md"
      >
        <button className="text-mute hover:text-ink hover:bg-white/5 label flex items-center justify-center gap-1.5 py-3.5">
          <Bookmark size={14} /> Save
        </button>
        <Link
          href={`/messages?to=${crew.id}`}
          className="border-rule text-mute hover:text-ink hover:bg-white/5 label flex items-center justify-center gap-1.5 border-x py-3.5"
        >
          <MessageCircle size={14} /> Message
        </Link>
        <button className="bg-ink text-bg label flex items-center justify-center gap-1.5 py-3.5">
          Book →
        </button>
      </div>
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

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="border-rule border-b">
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <p className="label text-bone">{title}</p>
        {typeof count === "number" && (
          <p className="label text-dim">{count}</p>
        )}
      </div>
      {children}
    </section>
  );
}
