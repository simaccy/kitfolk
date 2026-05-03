"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppHeader } from "@/components/app/AppHeader";
import { SegmentedControl } from "@/components/app/SegmentedControl";
import { CURRENT_USER } from "@/lib/mock/current-user";
import type { AvailabilityMode } from "@/lib/types";

export default function EditProfilePage() {
  const router = useRouter();
  const u = CURRENT_USER;
  const [availability, setAvailability] = useState<AvailabilityMode>(u.availability);
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    router.push("/profile");
  }

  return (
    <>
      <AppHeader title="EDIT PROFILE" back="/profile" />

      <form onSubmit={save} className="space-y-6 px-4 pt-4 pb-24">
        <Section title="01 / BASIC">
          <Field label="Name">
            <input
              defaultValue={u.name}
              className="border-rule-strong bg-surface text-ink w-full border px-4 py-3 text-[14px] outline-none focus:border-white/30"
            />
          </Field>
          <Field label="Location">
            <input
              defaultValue={u.location}
              className="border-rule-strong bg-surface text-ink w-full border px-4 py-3 text-[14px] outline-none focus:border-white/30"
            />
          </Field>
          <Field label="Main role">
            <input
              defaultValue={u.role}
              className="border-rule-strong bg-surface text-ink w-full border px-4 py-3 text-[14px] outline-none focus:border-white/30"
            />
          </Field>
          <Field label="Day rate (£)">
            <input
              type="number"
              defaultValue={u.dayRate}
              className="border-rule-strong bg-surface text-ink w-full border px-4 py-3 text-[14px] outline-none focus:border-white/30"
            />
          </Field>
        </Section>

        <Section title="02 / BIO">
          <textarea
            defaultValue={u.bio}
            rows={4}
            className="border-rule-strong bg-surface text-ink w-full border px-4 py-3 text-[14px] outline-none focus:border-white/30"
          />
        </Section>

        <Section title="03 / AVAILABILITY">
          <SegmentedControl<AvailabilityMode>
            value={availability}
            onChange={setAvailability}
            options={[
              { id: "AVAILABLE_NOW", label: "Now" },
              { id: "AVAILABLE_FROM", label: "From" },
              { id: "STANDBY", label: "Standby" },
              { id: "ON_SET", label: "On set" },
            ]}
          />
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              "REMOTE_ONLY",
              "TRAVEL_READY",
              "INTERNATIONAL_READY",
              "PENCIL",
            ].map((m) => (
              <button
                type="button"
                key={m}
                className="border-rule-strong text-bone hover:text-ink hover:bg-white/5 label border px-3 py-2.5"
              >
                + {m.replaceAll("_", " ").toLowerCase()}
              </button>
            ))}
          </div>
        </Section>

        <Section title="04 / TRUST SIGNALS">
          <ul className="border-rule divide-rule divide-y border-y">
            {[
              { label: "Verify identity", done: true },
              { label: "Verify credits", done: false, action: "Upload IMDb" },
              { label: "Add insurance", done: true },
              { label: "Invite peer vouches", done: false, action: "Send 3 invites" },
            ].map((s) => (
              <li
                key={s.label}
                className="flex items-center justify-between py-3"
              >
                <span className="text-ink flex items-center gap-2 text-[14px]">
                  <span
                    className={`inline-flex h-3 w-3 ${
                      s.done ? "bg-go" : "border-rule-strong border"
                    }`}
                    aria-hidden
                  />
                  {s.label}
                </span>
                <button
                  type="button"
                  className={`label ${
                    s.done ? "text-dim" : "text-flare hover:text-ink"
                  }`}
                  disabled={s.done}
                >
                  {s.done ? "Done" : (s.action ?? "Set up")}
                </button>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="05 / SHOWREEL">
          <Field label="URL">
            <input
              defaultValue={u.showreel}
              placeholder="vimeo.com/your-reel"
              className="border-rule-strong bg-surface text-ink w-full border px-4 py-3 text-[14px] outline-none focus:border-white/30"
            />
          </Field>
        </Section>

        <button
          type="submit"
          disabled={saving}
          className="bg-ink text-bg label flex w-full items-center justify-center py-4 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <p className="label text-bone">{title}</p>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="label text-mute mb-1.5">{label.toUpperCase()}</p>
      {children}
    </div>
  );
}
