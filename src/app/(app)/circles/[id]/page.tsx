import {
  MessageCircle,
  Megaphone,
  Plus,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppHeader } from "@/components/app/AppHeader";
import { Avatar } from "@/components/app/Avatar";
import { KitCard } from "@/components/app/KitCard";
import { findCircle } from "@/lib/mock/circles";
import { findKit } from "@/lib/mock/kit";
import { relativeTime } from "@/lib/utils";

export default async function CircleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const circle = findCircle(id);
  if (!circle) notFound();

  const kits = circle.kitIds.map(findKit).filter(Boolean);

  return (
    <>
      <AppHeader
        title="CIRCLE"
        back="/circles"
        right={
          <button className="text-mute hover:text-ink" aria-label="Settings">
            <Settings2 size={18} />
          </button>
        }
      />

      <section className="border-rule border-b px-4 pt-5 pb-5">
        <p className="label text-flare">● {circle.type}</p>
        <h1 className="serif text-ink mt-2 text-3xl leading-tight">
          {circle.name}
        </h1>
        {circle.description && (
          <p className="text-mute mt-2 text-[14px] leading-relaxed">
            {circle.description}
          </p>
        )}

        <div className="text-mute mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
          <span>{circle.members.length} members</span>
          {circle.kitIds.length > 0 && (
            <>
              <span className="text-dim">·</span>
              <span>{circle.kitIds.length} kit listings</span>
            </>
          )}
          <span className="text-dim">·</span>
          <span className="mono">
            Active {relativeTime(circle.lastActiveISO)}
          </span>
        </div>

        {circle.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {circle.tags.map((t) => (
              <span
                key={t}
                className="border-rule text-bone label border bg-white/[0.02] px-2 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Quick actions */}
      <section className="border-rule grid grid-cols-3 border-b">
        <ActionTile label="Group chat" Icon={MessageCircle} href={`/messages?circle=${circle.id}`} />
        <ActionTile label="Post to circle" Icon={Megaphone} href="/calls/new" border />
        <ActionTile label="Add member" Icon={Plus} href="#" border />
      </section>

      {/* Members */}
      <section className="border-rule border-b">
        <div className="flex items-center justify-between px-4 pt-5 pb-3">
          <p className="label text-bone">01 / MEMBERS</p>
          <p className="label text-dim">{circle.members.length}</p>
        </div>
        <ul className="divide-rule divide-y">
          {circle.members.map((m) => (
            <li key={m.id}>
              <Link
                href={`/crew/${m.id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02]"
              >
                <Avatar name={m.name} hue={m.avatarHue} size={36} />
                <div className="flex-1">
                  <p className="text-ink text-[14px]">{m.name}</p>
                  <p className="label text-mute mt-0.5">
                    {m.role.toUpperCase()}
                  </p>
                </div>
                <span className="text-dim">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Kit shared */}
      {kits.length > 0 && (
        <section className="border-rule border-b">
          <div className="flex items-center justify-between px-4 pt-5 pb-3">
            <p className="label text-bone">02 / KIT IN CIRCLE</p>
            <p className="label text-dim">{kits.length}</p>
          </div>
          <div className="space-y-3 px-4 pb-4">
            {kits.map((k) => k && <KitCard key={k.id} kit={k} />)}
          </div>
        </section>
      )}

      {/* Notes */}
      {circle.notes && (
        <section className="border-rule border-b">
          <div className="px-4 pt-5 pb-3">
            <p className="label text-bone">03 / NOTES</p>
          </div>
          <p className="text-mute px-4 pb-5 text-[14px] leading-relaxed">
            {circle.notes}
          </p>
        </section>
      )}
    </>
  );
}

function ActionTile({
  label,
  Icon,
  href,
  border,
}: {
  label: string;
  Icon: typeof MessageCircle;
  href: string;
  border?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-bone hover:text-ink hover:bg-white/[0.04] flex flex-col items-center justify-center gap-1.5 py-5 ${
        border ? "border-rule border-l" : ""
      }`}
    >
      <Icon size={18} className="text-flare" />
      <span
        className="text-[10px] tracking-wide uppercase"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </span>
    </Link>
  );
}
