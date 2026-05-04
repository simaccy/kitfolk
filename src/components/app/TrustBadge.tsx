import {
  BadgeCheck,
  Globe2,
  PackageCheck,
  ShieldCheck,
  Star,
  UserCheck,
  Users,
} from "lucide-react";
import type { TrustBadge as TrustBadgeType } from "@/lib/types";

const META: Record<TrustBadgeType, { label: string; Icon: typeof BadgeCheck }> = {
  IDENTITY_VERIFIED: { label: "ID verified", Icon: UserCheck },
  CREDIT_VERIFIED: { label: "Credits verified", Icon: BadgeCheck },
  PEER_VOUCHED: { label: "Peer vouched", Icon: Users },
  KITFOLK_TRUSTED: { label: "KitFolk Trusted", Icon: Star },
  PRODUCTION_READY: { label: "Production ready", Icon: ShieldCheck },
  PREMIUM_KIT_OWNER: { label: "Premium kit", Icon: PackageCheck },
  INTERNATIONAL_READY: { label: "Int. ready", Icon: Globe2 },
};

export function TrustBadge({
  type,
  compact = false,
}: {
  type: TrustBadgeType;
  compact?: boolean;
}) {
  const { label, Icon } = META[type];
  return (
    <span
      className={`border-rule text-bone inline-flex items-center gap-1.5 border bg-ink/[0.02] ${
        compact ? "px-1.5 py-0.5" : "px-2 py-1"
      }`}
    >
      <Icon size={compact ? 11 : 13} className="text-go" />
      <span className="label" style={{ fontSize: compact ? 9 : 10 }}>
        {label}
      </span>
    </span>
  );
}
