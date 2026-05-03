"use client";

import { Map, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { AppHeader } from "@/components/app/AppHeader";
import { CrewCard } from "@/components/app/CrewCard";
import { EmptyState } from "@/components/app/EmptyState";
import { FilterChips } from "@/components/app/FilterChips";
import { KitCard } from "@/components/app/KitCard";
import { SearchBar } from "@/components/app/SearchBar";
import { SegmentedControl } from "@/components/app/SegmentedControl";
import { CREW } from "@/lib/mock/crew";
import { KIT } from "@/lib/mock/kit";

type Mode = "crew" | "kit" | "both";

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<Mode>("crew");
  const [filters, setFilters] = useState<Record<string, boolean>>({
    "available-now": false,
    "verified-only": false,
    london: false,
    "this-week": false,
    "kit-plus-op": false,
  });

  const toggle = (id: string) =>
    setFilters((f) => ({ ...f, [id]: !f[id] }));

  const q = query.trim().toLowerCase();

  const crewResults = useMemo(() => {
    let out = CREW;
    if (filters["available-now"]) out = out.filter((c) => c.availability === "AVAILABLE_NOW");
    if (filters["verified-only"]) out = out.filter((c) => c.badges.includes("CREDIT_VERIFIED"));
    if (filters.london) out = out.filter((c) => c.location === "London");
    if (q) {
      out = out.filter((c) => {
        const hay = [
          c.name,
          c.role,
          c.location,
          ...(c.skills ?? []),
          ...(c.genres ?? []),
          ...c.credits.map((x) => x.title + " " + (x.company ?? "")),
          ...c.companies,
        ]
          .join(" ")
          .toLowerCase();
        return q.split(/\s+/).every((tok) => hay.includes(tok));
      });
    }
    return out.sort((a, b) => b.trustScore - a.trustScore);
  }, [filters, q]);

  const kitResults = useMemo(() => {
    let out = KIT;
    if (filters["available-now"])
      out = out.filter((k) => k.availability === "AVAILABLE_NOW");
    if (filters.london) out = out.filter((k) => k.location === "London");
    if (filters["kit-plus-op"]) out = out.filter((k) => k.operatorAvailable);
    if (q) {
      out = out.filter((k) =>
        [k.name, k.category, k.location, k.ownerName, k.description, ...k.includes]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    return out.sort((a, b) => b.conditionScore - a.conditionScore);
  }, [filters, q]);

  const showCrew = mode === "crew" || mode === "both";
  const showKit = mode === "kit" || mode === "both";

  return (
    <>
      <AppHeader
        title="DISCOVER"
        right={
          <button className="text-mute hover:text-ink" aria-label="Map view">
            <Map size={18} />
          </button>
        }
      />

      <div className="bg-bg sticky top-12 z-20 space-y-3 px-4 pt-3 pb-3 md:top-14">
        <SearchBar value={query} onChange={setQuery} />
        <SegmentedControl<Mode>
          value={mode}
          onChange={setMode}
          options={[
            { id: "crew", label: "Crew", meta: String(CREW.length) },
            { id: "kit", label: "Kit", meta: String(KIT.length) },
            { id: "both", label: "Both" },
          ]}
        />
        <FilterChips
          chips={[
            { id: "available-now", label: "Available now", active: filters["available-now"] },
            { id: "this-week", label: "This week", active: filters["this-week"] },
            { id: "london", label: "London", active: filters.london },
            { id: "verified-only", label: "Verified only", active: filters["verified-only"] },
            { id: "kit-plus-op", label: "Kit + operator", active: filters["kit-plus-op"] },
          ]}
          onToggle={toggle}
        />
        <div className="flex items-center justify-between">
          <p className="label text-mute">
            {showCrew && `${crewResults.length} crew`}
            {showCrew && showKit && " · "}
            {showKit && `${kitResults.length} kit`}
          </p>
          <button className="label text-mute hover:text-ink inline-flex items-center gap-1">
            <SlidersHorizontal size={11} /> More filters
          </button>
        </div>
      </div>

      <div className="space-y-3 px-4 pb-6">
        {showCrew && crewResults.map((c) => <CrewCard key={c.id} crew={c} />)}
        {showKit && kitResults.map((k) => <KitCard key={k.id} kit={k} />)}
        {(showCrew ? crewResults.length : 0) +
          (showKit ? kitResults.length : 0) ===
          0 && (
          <EmptyState
            title="Nothing matches yet."
            body="Try a wider search, or post a call and let people come to you."
            action={
              <a
                href="/calls/new"
                className="bg-ink text-bg label inline-flex px-4 py-2"
              >
                Post a call →
              </a>
            }
          />
        )}
      </div>
    </>
  );
}
