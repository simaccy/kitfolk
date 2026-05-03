"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AppHeader } from "@/components/app/AppHeader";
import { SegmentedControl } from "@/components/app/SegmentedControl";

type CallType = "CREW" | "KIT" | "BOTH";
type Urgency = "URGENT" | "THIS_WEEK" | "FLEXIBLE";

export default function NewCallPage() {
  const router = useRouter();
  const [type, setType] = useState<CallType>("CREW");
  const [urgency, setUrgency] = useState<Urgency>("THIS_WEEK");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    router.push("/calls?posted=1");
  }

  return (
    <>
      <AppHeader title="POST A CALL" back="/calls" />

      <form onSubmit={onSubmit} className="space-y-6 px-4 pt-4 pb-24">
        <Step n="01" label="What do you need?">
          <SegmentedControl<CallType>
            value={type}
            onChange={setType}
            options={[
              { id: "CREW", label: "Crew" },
              { id: "KIT", label: "Kit" },
              { id: "BOTH", label: "Both" },
            ]}
          />
        </Step>

        <Step n="02" label="Title">
          <Input
            name="title"
            placeholder={
              type === "KIT"
                ? "e.g. FX6 + 24-70 in Manchester tomorrow"
                : "e.g. DOP with documentary credits"
            }
            required
          />
        </Step>

        <Step n="03" label="Where">
          <Input
            name="location"
            placeholder="City or 'Remote'"
            required
          />
        </Step>

        <Step n="04" label="When">
          <div className="grid grid-cols-2 gap-2">
            <Input name="start" type="date" required />
            <Input name="end" type="date" />
          </div>
          <div className="mt-3">
            <SegmentedControl<Urgency>
              value={urgency}
              onChange={setUrgency}
              options={[
                { id: "URGENT", label: "Urgent" },
                { id: "THIS_WEEK", label: "This week" },
                { id: "FLEXIBLE", label: "Flexible" },
              ]}
            />
          </div>
        </Step>

        <Step n="05" label="Rate or budget">
          <div className="grid grid-cols-2 gap-2">
            <Input
              name="budgetMin"
              type="number"
              placeholder="Min £"
              prefix="£"
            />
            <Input
              name="budgetMax"
              type="number"
              placeholder="Max £"
              prefix="£"
            />
          </div>
          <div className="mt-3">
            <SegmentedControl
              value="day"
              onChange={() => {}}
              options={[
                { id: "day", label: "Per day" },
                { id: "project", label: "Project" },
                { id: "hour", label: "Hourly" },
              ]}
            />
          </div>
        </Step>

        <Step n="06" label="Details">
          <textarea
            name="details"
            placeholder="Anything else they need to know — schedule, tone, kit constraints, travel."
            rows={4}
            className="border-rule-strong bg-surface text-ink placeholder:text-dim w-full border px-4 py-3 text-[14px] outline-none focus:border-white/30"
          />
        </Step>

        <Step n="07" label="Required verification">
          <label className="border-rule-strong bg-surface flex items-start gap-3 border px-4 py-3">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="mt-1 h-4 w-4 accent-orange-500"
            />
            <div>
              <p className="text-ink text-[14px]">
                Verified KitFolk users only
              </p>
              <p className="text-mute mt-1 text-[12px]">
                Only people with verified ID and credits can respond. Recommended
                for last-minute calls.
              </p>
            </div>
          </label>
        </Step>

        <button
          type="submit"
          disabled={submitting}
          className="bg-ink text-bg label flex w-full items-center justify-center gap-2 py-4 disabled:opacity-50"
        >
          {submitting ? "Posting…" : "Post call"} <ChevronRight size={14} />
        </button>

        <p className="label text-dim text-center">
          ● You can edit or close the call at any time
        </p>
      </form>
    </>
  );
}

function Step({
  n,
  label,
  children,
}: {
  n: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="label text-bone mb-2">
        <span className="text-flare">{n}</span>
        <span className="text-dim mx-1.5">/</span>
        {label.toUpperCase()}
      </p>
      {children}
    </div>
  );
}

function Input({
  prefix,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { prefix?: string }) {
  return (
    <div className="border-rule-strong bg-surface relative flex items-center border focus-within:border-white/30">
      {prefix && (
        <span className="text-mute mono pl-3 text-[14px]">{prefix}</span>
      )}
      <input
        {...props}
        className="text-ink placeholder:text-dim w-full bg-transparent px-4 py-3 text-[14px] outline-none"
      />
    </div>
  );
}
