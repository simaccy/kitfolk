import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Circle } from "@/lib/types";
import { Avatar } from "./Avatar";
import { relativeTime } from "@/lib/utils";

const TYPE_LABEL: Record<Circle["type"], string> = {
  CREW: "CREW",
  REGION: "REGION",
  PROJECT: "PROJECT",
  POST: "POST CHAIN",
};

export function CircleCard({ circle }: { circle: Circle }) {
  return (
    <Link
      href={`/circles/${circle.id}`}
      className="border-rule-strong bg-surface group relative block border active:bg-white/[0.02]"
    >
      <div className="border-rule label text-mute flex items-center justify-between border-b px-4 py-2.5">
        <span className="text-flare">● {TYPE_LABEL[circle.type]}</span>
        <span className="text-dim">{relativeTime(circle.lastActiveISO)}</span>
      </div>

      <div className="px-4 pt-4 pb-4">
        <h3 className="serif text-ink text-[20px]">{circle.name}</h3>
        {circle.description && (
          <p className="text-mute mt-1.5 text-[13px] leading-snug">
            {circle.description}
          </p>
        )}

        <div className="mt-4 flex -space-x-2">
          {circle.members.slice(0, 5).map((m) => (
            <Avatar key={m.id} name={m.name} hue={m.avatarHue} size={32} />
          ))}
          {circle.members.length > 5 && (
            <span className="border-rule-strong bg-bg label text-mute flex h-8 w-8 items-center justify-center border">
              +{circle.members.length - 5}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="label text-mute">
              {circle.members.length} members
            </span>
            {circle.kitIds.length > 0 && (
              <span className="label text-mute">
                {circle.kitIds.length} kit
              </span>
            )}
          </div>
          <ChevronRight size={16} className="text-dim group-hover:text-ink" />
        </div>
      </div>
    </Link>
  );
}
