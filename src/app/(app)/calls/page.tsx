"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AppHeader } from "@/components/app/AppHeader";
import { CallCard } from "@/components/app/CallCard";
import { FilterChips } from "@/components/app/FilterChips";
import { SegmentedControl } from "@/components/app/SegmentedControl";
import { CALLS } from "@/lib/mock/calls";

type Tab = "live" | "responded" | "mine";

export default function CallsPage() {
  const [tab, setTab] = useState<Tab>("live");
  const [filters, setFilters] = useState<Record<string, boolean>>({
    crew: false,
    kit: false,
    urgent: false,
  });

  const toggle = (id: string) =>
    setFilters((f) => ({ ...f, [id]: !f[id] }));

  let calls = CALLS;
  if (filters.crew) calls = calls.filter((c) => c.type === "CREW" || c.type === "BOTH");
  if (filters.kit) calls = calls.filter((c) => c.type === "KIT" || c.type === "BOTH");
  if (filters.urgent) calls = calls.filter((c) => c.urgency === "URGENT");
  if (tab === "responded") calls = calls.slice(0, 2);
  if (tab === "mine") calls = calls.slice(2, 4);

  return (
    <>
      <AppHeader
        title="CALLS"
        subtitle="LIVE PRODUCTION REQUESTS"
        right={
          <Link
            href="/calls/new"
            className="text-mute hover:text-ink"
            aria-label="Post a call"
          >
            <Plus size={18} />
          </Link>
        }
      />

      <div className="bg-bg sticky top-12 z-20 space-y-3 px-4 pt-3 pb-3 md:top-14">
        <SegmentedControl<Tab>
          value={tab}
          onChange={setTab}
          options={[
            { id: "live", label: "Live", meta: String(CALLS.length) },
            { id: "responded", label: "Responded" },
            { id: "mine", label: "Mine" },
          ]}
        />
        <FilterChips
          chips={[
            { id: "urgent", label: "Urgent only", active: filters.urgent },
            { id: "crew", label: "Crew calls", active: filters.crew },
            { id: "kit", label: "Kit calls", active: filters.kit },
          ]}
          onToggle={toggle}
        />
      </div>

      <div className="space-y-3 px-4 pb-6">
        {calls.map((c) => (
          <CallCard key={c.id} call={c} />
        ))}
      </div>

      <Link
        href="/calls/new"
        className="bg-ink text-bg label fixed right-4 bottom-24 z-40 flex items-center gap-2 px-5 py-3 shadow-lg shadow-black/40"
      >
        <Plus size={14} /> Post a call
      </Link>
    </>
  );
}
