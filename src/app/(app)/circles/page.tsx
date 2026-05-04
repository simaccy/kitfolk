"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { AppHeader } from "@/components/app/AppHeader";
import { CircleCard } from "@/components/app/CircleCard";
import { EmptyState } from "@/components/app/EmptyState";
import { SearchBar } from "@/components/app/SearchBar";
import { CIRCLES } from "@/lib/mock/circles";

export default function CirclesPage() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const list = q
    ? CIRCLES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)) ||
          c.members.some((m) => m.name.toLowerCase().includes(q))
      )
    : CIRCLES;

  return (
    <>
      <AppHeader
        title="CIRCLES"
        subtitle="YOUR TRUSTED NETWORKS"
        right={
          <button className="text-mute hover:text-ink" aria-label="New circle">
            <Plus size={18} />
          </button>
        }
      />

      <div className="space-y-3 px-4 pt-3">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search circles or members…"
        />

        <button className="border-rule-strong bg-surface text-bone hover:text-ink hover:bg-ink/5 label flex w-full items-center justify-between border px-4 py-3.5 text-left">
          <span className="inline-flex items-center gap-2">
            <Plus size={14} className="text-flare" />
            New circle
          </span>
          <span className="text-dim">→</span>
        </button>
      </div>

      <div className="space-y-3 px-4 pt-3 pb-6">
        {list.length === 0 ? (
          <EmptyState
            title="No circles yet."
            body="Spin one up for the people you actually rebook. Drop in your kit, post calls just to them."
          />
        ) : (
          list.map((c) => <CircleCard key={c.id} circle={c} />)
        )}
      </div>
    </>
  );
}
