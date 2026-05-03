import type { AvailabilityMode } from "@/lib/types";

const META: Record<
  AvailabilityMode | "BOOKED",
  { label: string; tone: "go" | "flare" | "bone" | "mute" | "rec" }
> = {
  AVAILABLE_NOW: { label: "Available now", tone: "go" },
  AVAILABLE_FROM: { label: "Available from", tone: "bone" },
  KIT_ONLY: { label: "Kit only", tone: "bone" },
  KIT_PLUS_OPERATOR: { label: "Kit + operator", tone: "bone" },
  REMOTE_ONLY: { label: "Remote only", tone: "bone" },
  TRAVEL_READY: { label: "Travel ready", tone: "bone" },
  INTERNATIONAL_READY: { label: "Int. ready", tone: "bone" },
  STANDBY: { label: "Standby", tone: "mute" },
  PENCIL: { label: "Pencilled", tone: "flare" },
  CONFIRMED: { label: "Confirmed", tone: "go" },
  ON_SET: { label: "On set", tone: "flare" },
  BOOKED: { label: "Booked", tone: "rec" },
};

const TONE_CLASS: Record<string, string> = {
  go: "text-go",
  flare: "text-flare",
  bone: "text-bone",
  mute: "text-mute",
  rec: "text-rec",
};

export function AvailabilityChip({
  mode,
  fromDate,
}: {
  mode: AvailabilityMode | "BOOKED";
  fromDate?: string;
}) {
  const meta = META[mode];
  const dateSuffix =
    mode === "AVAILABLE_FROM" && fromDate
      ? ` ${new Date(fromDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`
      : "";
  return (
    <span className={`label inline-flex items-center gap-1.5 ${TONE_CLASS[meta.tone]}`}>
      <span className="text-current">●</span>
      {meta.label}
      {dateSuffix}
    </span>
  );
}
