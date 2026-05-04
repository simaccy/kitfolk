"use client";

import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Compass,
  Globe2,
  Package,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, type ReactNode } from "react";

type AccountType = "CREW" | "KIT_OWNER" | "PRODUCER" | "BOTH";
type Availability = "NOW" | "FROM_DATE" | "PENCIL" | "STANDBY";

const TOTAL = 5;

function markOnboarded() {
  // 365 days, lax. Production should also set Secure & a real domain.
  document.cookie = `kf-onboarded=1; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

export function OnboardingFlow({
  defaultName,
  avatarUrl,
  email,
}: {
  defaultName: string;
  avatarUrl?: string;
  email?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [availability, setAvailability] = useState<Availability>("NOW");

  function next() {
    if (step < TOTAL) {
      setStep(step + 1);
      return;
    }
    markOnboarded();
    router.push("/discover");
  }

  function skip() {
    markOnboarded();
    router.push("/discover");
  }

  return (
    <div className="bg-bg text-ink relative flex min-h-dvh flex-col">
      <div className="grain pointer-events-none absolute inset-0 opacity-50" />

      <header className="relative flex items-center justify-between px-4 py-4">
        <span className="serif text-ink text-xl">KitFolk</span>
        <span className="mono text-mute text-[11px] tracking-widest">
          STEP {String(step).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
      </header>

      <div className="px-4">
        <div className="bg-rule h-px w-full">
          <div
            className="bg-flare h-px transition-all duration-300"
            style={{ width: `${(step / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      <main className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-8 pb-8">
        {/* Signed-in identity strip */}
        {(defaultName || email) && (
          <div className="border-rule-strong bg-surface mb-6 flex items-center gap-3 border px-3 py-2.5">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt=""
                width={32}
                height={32}
                className="border-rule-strong h-8 w-8 border object-cover"
              />
            ) : (
              <span
                className="border-rule-strong serif text-ink flex h-8 w-8 items-center justify-center border"
                style={{
                  background: `linear-gradient(135deg, hsl(14 55% 86%), hsl(14 42% 72%))`,
                }}
              >
                {(defaultName || "?")[0]}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-ink truncate text-[13px]">
                {defaultName || "New member"}
              </p>
              {email && (
                <p className="text-mute mono mt-0.5 truncate text-[11px]">{email}</p>
              )}
            </div>
            <span className="label text-go">● VERIFIED</span>
          </div>
        )}

        {step === 1 && (
          <Step
            label="01 / WHO ARE YOU?"
            title="What kind of account are you setting up?"
            body="Pick what fits today — you can add the others later."
          >
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { id: "CREW" as const, label: "Crew", desc: "I get hired for shoots.", Icon: Users },
                { id: "KIT_OWNER" as const, label: "Kit owner", desc: "I have kit to rent out.", Icon: Package },
                { id: "PRODUCER" as const, label: "Producer / company", desc: "I hire crew and book kit.", Icon: Compass },
                { id: "BOTH" as const, label: "Crew + kit", desc: "I'm both. Most freelancers are.", Icon: ShieldCheck },
              ].map((o) => {
                const active = accountType === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => setAccountType(o.id)}
                    className={`flex items-center gap-3 border px-4 py-4 text-left transition-colors ${
                      active
                        ? "border-flare bg-flare/10"
                        : "border-rule-strong bg-surface hover:bg-ink/[0.03]"
                    }`}
                  >
                    <o.Icon size={18} className={active ? "text-flare" : "text-bone"} />
                    <div className="flex-1">
                      <p className="text-ink text-[15px]">{o.label}</p>
                      <p className="text-mute mt-0.5 text-[13px]">{o.desc}</p>
                    </div>
                    {active && <CheckCircle2 size={16} className="text-flare" />}
                  </button>
                );
              })}
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step
            label="02 / BASICS"
            title="Tell us who you are."
            body="Real name, real role. We verify both during early access."
          >
            <div className="space-y-3">
              <Field label="Name">
                <input
                  defaultValue={defaultName}
                  className="border-rule-strong bg-surface text-ink w-full border px-4 py-3.5 text-[15px] outline-none focus:border-ink/30"
                />
              </Field>
              <Field label="Location">
                <input
                  placeholder="City"
                  className="border-rule-strong bg-surface text-ink w-full border px-4 py-3.5 text-[15px] outline-none focus:border-ink/30"
                />
              </Field>
              <Field label="Main role">
                <input
                  placeholder="e.g. DOP, Sound Mixer, 1st AD"
                  className="border-rule-strong bg-surface text-ink w-full border px-4 py-3.5 text-[15px] outline-none focus:border-ink/30"
                />
              </Field>
              <Field label="Industry area">
                <select className="border-rule-strong bg-surface text-ink w-full border px-4 py-3.5 text-[15px] outline-none focus:border-ink/30">
                  <option>Drama</option>
                  <option>Documentary</option>
                  <option>Commercial</option>
                  <option>Music video</option>
                  <option>Branded content</option>
                </select>
              </Field>
            </div>
          </Step>
        )}

        {step === 3 && (
          <Step
            label="03 / TRUST"
            title="The signals that get you booked."
            body="Trust isn't assumed. It's earned, layered and visible."
          >
            <ul className="border-rule divide-rule divide-y border-y">
              {[
                { label: "Add credits (e.g. 3 recent jobs)", desc: "We can pull from IMDb." },
                { label: "Companies you've worked with", desc: "BBC, Pulse, Channel 4…" },
                { label: "Certifications", desc: "PL insurance, GVC, IPAF…" },
                { label: "Insurance document", desc: "PL £5m+ recommended." },
                { label: "Invite 3 peer vouches", desc: "From people you've shot with." },
              ].map((s, i) => (
                <li key={s.label} className="flex items-start gap-3 py-3.5">
                  <span className="mono text-dim w-5 pt-0.5 text-[11px]">
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-ink text-[14px]">{s.label}</p>
                    <p className="text-mute mt-0.5 text-[12px]">{s.desc}</p>
                  </div>
                  <button className="label text-flare hover:text-ink">Add</button>
                </li>
              ))}
            </ul>
            <p className="text-dim mt-4 text-[12px]">
              You can finish trust signals later — adding two now will get you
              into Discover faster.
            </p>
          </Step>
        )}

        {step === 4 && (
          <Step
            label="04 / AVAILABILITY"
            title="When are you working?"
            body="People filter Discover by availability first. Set this honestly."
          >
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "NOW" as const, label: "Available now", Icon: CheckCircle2 },
                { id: "FROM_DATE" as const, label: "Available from…", Icon: Camera },
                { id: "PENCIL" as const, label: "Pencilled", Icon: Package },
                { id: "STANDBY" as const, label: "Standby", Icon: Globe2 },
              ].map((o) => {
                const active = availability === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => setAvailability(o.id)}
                    className={`flex flex-col items-start gap-2 border px-4 py-4 text-left transition-colors ${
                      active
                        ? "border-flare bg-flare/10"
                        : "border-rule-strong bg-surface hover:bg-ink/[0.03]"
                    }`}
                  >
                    <o.Icon
                      size={18}
                      className={active ? "text-flare" : "text-bone"}
                    />
                    <p className="text-ink text-[14px]">{o.label}</p>
                  </button>
                );
              })}
            </div>
          </Step>
        )}

        {step === 5 && (
          <Step
            label="05 / WELCOME"
            title="You're in."
            body="Open enough to grow. Curated enough to trust."
          >
            <div className="border-rule-strong bg-surface space-y-3 border p-5">
              <p className="text-ink text-[14px]">Next steps</p>
              <ul className="text-mute space-y-2.5 text-[13px]">
                <li className="flex items-start gap-2">
                  <span className="text-flare mt-1">●</span>
                  Browse Discover and save 3 people you'd hire today.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-flare mt-1">●</span>
                  Build your first Circle — your go-to crew.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-flare mt-1">●</span>
                  Post a Call to test the network.
                </li>
              </ul>
            </div>
          </Step>
        )}

        <div className="mt-auto pt-8">
          <button
            onClick={next}
            disabled={step === 1 && !accountType}
            className="bg-ink text-bg label flex w-full items-center justify-center gap-2 py-4 disabled:opacity-50"
          >
            {step === TOTAL ? "Enter KitFolk" : "Continue"}
            <ArrowRight size={14} />
          </button>
          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="label text-mute hover:text-ink disabled:opacity-30"
            >
              ← Back
            </button>
            <button onClick={skip} className="label text-dim hover:text-ink">
              Skip for now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function Step({
  label,
  title,
  body,
  children,
}: {
  label: string;
  title: string;
  body?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="label text-flare">{label}</p>
      <h1 className="serif text-ink mt-3 text-3xl leading-tight">{title}</h1>
      {body && (
        <p className="text-mute mt-3 text-[14px] leading-relaxed">{body}</p>
      )}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="label text-mute mb-1.5">{label.toUpperCase()}</p>
      {children}
    </div>
  );
}
