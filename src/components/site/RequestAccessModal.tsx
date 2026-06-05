"use client";

import { useEffect, useRef, useState } from "react";
import { useRequestAccess } from "./RequestAccessContext";

// ---------------------------------------------------------------------------
// Industries
// ---------------------------------------------------------------------------
const INDUSTRIES = [
  "Film",
  "Advertising",
  "Branded Content",
  "Social Media",
  "Creator",
  "TV Production",
  "Photography",
] as const;

type Industry = (typeof INDUSTRIES)[number];

// ---------------------------------------------------------------------------
// Roles per industry
// ---------------------------------------------------------------------------
const INDUSTRY_ROLES: Record<Industry, string[]> = {
  Film: [
    "DOP", "Camera Op", "1st AC", "2nd AC", "DIT",
    "Gaffer", "Best Boy", "Spark",
    "Sound Mixer", "Boom Op",
    "1st AD", "2nd AD", "3rd AD",
    "Producer", "Line Producer", "Production Manager",
    "Production Designer", "Art Director",
    "Editor", "Colourist", "Sound Design", "VFX", "Compositor",
    "Director", "Writer",
    "Costume", "Make-up & Hair", "Stunts",
    "Kit Owner",
  ],
  Advertising: [
    "DOP", "Camera Op", "1st AC", "2nd AC", "DIT",
    "Gaffer", "Best Boy", "Spark",
    "Sound Mixer", "Boom Op",
    "1st AD", "2nd AD",
    "Producer", "Production Manager",
    "Production Designer", "Art Director",
    "Editor", "Colourist", "Sound Design", "VFX", "Compositor",
    "Director",
    "Costume", "Make-up & Hair", "Stunts",
    "Kit Owner",
  ],
  "Branded Content": [
    "DOP", "Camera Op", "1st AC", "2nd AC", "DIT",
    "Gaffer", "Best Boy",
    "Sound Mixer", "Boom Op",
    "1st AD", "2nd AD",
    "Producer", "Production Manager",
    "Production Designer", "Art Director",
    "Editor", "Colourist", "Sound Design", "VFX",
    "Director", "Writer",
    "Make-up & Hair",
    "Kit Owner",
  ],
  "Social Media": [
    "DOP", "Camera Op", "1st AC",
    "Gaffer",
    "Sound Mixer", "Boom Op",
    "Producer",
    "Editor", "Colourist", "Sound Design",
    "Director", "Writer",
    "Make-up & Hair",
    "Kit Owner",
  ],
  Creator: [
    "DOP", "Camera Op", "1st AC",
    "Gaffer",
    "Sound Mixer",
    "Editor", "Colourist", "Sound Design",
    "Director", "Writer",
    "Make-up & Hair",
    "Kit Owner",
  ],
  "TV Production": [
    "DOP", "Camera Op", "1st AC", "2nd AC", "DIT",
    "Gaffer", "Best Boy", "Spark",
    "Sound Mixer", "Boom Op",
    "1st AD", "2nd AD", "3rd AD",
    "Producer", "Line Producer", "Production Manager",
    "Production Designer", "Art Director",
    "Editor", "Colourist", "Sound Design", "VFX", "Compositor",
    "Director", "Writer",
    "Costume", "Make-up & Hair", "Stunts",
    "Kit Owner",
  ],
  Photography: [
    "Photographer",
    "Gaffer", "Best Boy", "Spark",
    "1st AD", "2nd AD",
    "Producer", "Production Manager",
    "Production Designer", "Art Director",
    "Make-up & Hair", "Costume",
    "Retoucher",
    "Kit Owner",
  ],
};

const ROLE_ORDER = [
  "Photographer",
  "DOP", "Camera Op", "1st AC", "2nd AC", "DIT",
  "Gaffer", "Best Boy", "Spark",
  "Sound Mixer", "Boom Op",
  "1st AD", "2nd AD", "3rd AD",
  "Director", "Writer",
  "Producer", "Line Producer", "Production Manager",
  "Production Designer", "Art Director",
  "Editor", "Colourist", "Sound Design", "VFX", "Compositor", "Retoucher",
  "Costume", "Make-up & Hair", "Stunts",
  "Kit Owner",
];

function visibleRoles(industries: Industry[]): string[] {
  if (industries.length === 0) return ROLE_ORDER;
  const union = new Set(industries.flatMap((ind) => INDUSTRY_ROLES[ind]));
  return ROLE_ORDER.filter((r) => union.has(r));
}

// ---------------------------------------------------------------------------
// Referral validation (TODO: swap for real API)
// ---------------------------------------------------------------------------
const VALID_REFERRAL_CODES = new Set([
  "DAN-HARRIS-01",
  "ALEX-MASON-01",
  "FERNE-HART-01",
  "SCENECIRCLE-BETA",
  "EARLY-ACCESS-01",
]);

async function validateReferralCode(code: string): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 300));
  return VALID_REFERRAL_CODES.has(code.trim().toUpperCase());
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------
export function RequestAccessModal() {
  const { isOpen, initialEmail, close } = useRequestAccess();
  const scrollRef = useRef<HTMLDivElement>(null);

  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg/90 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />

      {/* Panel */}
      <div className="relative flex h-full flex-col overflow-hidden">
        {/* Sticky header bar */}
        <div className="border-rule-strong bg-bg relative z-10 flex items-center justify-between border-b px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <span className="text-flare animate-rec label">●</span>
            <span className="label text-mute">EARLY ACCESS APPLICATION</span>
          </div>
          <button
            onClick={close}
            aria-label="Close"
            className="label text-mute hover:text-ink border-rule hover:border-ink/30 flex h-8 w-8 items-center justify-center border transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scrollable form area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-10 md:px-6">
          <RequestAccessForm
            initialEmail={initialEmail}
            scrollRef={scrollRef}
            onSuccess={() => {/* success is shown inline */}}
            onClose={close}
          />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Form (internal — rendered inside the modal)
// ---------------------------------------------------------------------------
function RequestAccessForm({
  initialEmail,
  scrollRef,
  onClose,
}: {
  initialEmail: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [fields, setFields] = useState({
    name: "",
    email: initialEmail,
    phone: "",
    postcode: "",
    website: "",
    instagram: "",
    linkedin: "",
    imdb: "",
    job1: "",
    job2: "",
    job3: "",
    referral: "",
    gear: "" as "" | "kit" | "space" | "both" | "no",
  });
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync email if modal reopens with a new pre-filled address
  useEffect(() => {
    setFields((f) => ({ ...f, email: initialEmail }));
  }, [initialEmail]);

  function set(key: keyof typeof fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function toggleIndustry(ind: Industry) {
    setIndustries((prev) => {
      const next = prev.includes(ind)
        ? prev.filter((x) => x !== ind)
        : [...prev, ind];
      const allowed = new Set(visibleRoles(next));
      setRoles((r) => r.filter((role) => allowed.has(role)));
      return next;
    });
    setErrors((e) => ({ ...e, industries: "" }));
  }

  function toggleRole(r: string) {
    setRoles((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
    setErrors((e) => ({ ...e, roles: "" }));
  }

  function scrollToFirstError() {
    setTimeout(() => {
      const el = scrollRef.current?.querySelector("[data-error]");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!fields.name.trim()) errs.name = "Required";
    if (!fields.email.includes("@")) errs.email = "Valid email required";
    if (!fields.phone.trim()) errs.phone = "Required";
    if (!fields.postcode.trim()) errs.postcode = "Required";

    if (industries.length === 0) errs.industries = "Select at least one industry";
    if (roles.length === 0) errs.roles = "Select at least one role";

    const hasPresence =
      fields.website.trim() ||
      fields.instagram.trim() ||
      fields.linkedin.trim() ||
      fields.imdb.trim();
    if (!hasPresence) errs.presence = "Provide at least one profile or link";

    const workUrls = [fields.job1, fields.job2, fields.job3].filter((u) => u.trim());
    const hasValidWork = workUrls.some(isValidUrl);
    if (workUrls.length === 0) {
      errs.work = "Add at least one link to your work";
    } else if (!hasValidWork) {
      errs.work = "At least one link must be a valid URL (https://...)";
    }

    if (!fields.referral.trim()) {
      errs.referral = "Required - ask a member for their code";
    }

    if (Object.keys(errs).length) {
      setErrors(errs);
      scrollToFirstError();
      return;
    }

    setStatus("loading");

    const referralValid = await validateReferralCode(fields.referral);
    if (!referralValid) {
      setErrors({ referral: "Code not recognised - check with the person who gave it to you" });
      setStatus("idle");
      scrollToFirstError();
      return;
    }

    // TODO: wire to real submission endpoint
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
  }

  // ── Success state ────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="mx-auto max-w-lg py-10">
        <div className="border-rule-strong bg-surface border">
          <div className="border-rule-strong label text-mute flex items-center justify-between border-b px-5 py-3">
            <span className="text-go">● APPLICATION RECEIVED</span>
            <span>REF / {Math.random().toString(36).slice(2, 8).toUpperCase()}</span>
          </div>
          <div className="px-7 py-10 md:px-10">
            <h2 className="serif text-ink text-4xl md:text-5xl">You&apos;re on the list.</h2>
            <p className="text-mute mt-5 text-base leading-relaxed">
              We&apos;ll review your application and reach out when your region opens up. No spam - one email, when it&apos;s your turn.
            </p>
            <div className="border-rule mt-8 grid grid-cols-2 gap-4 border-t pt-6">
              <div>
                <p className="label text-mute">SUBMITTED BY</p>
                <p className="text-ink mt-1">{fields.name}</p>
              </div>
              <div>
                <p className="label text-mute">INDUSTRIES</p>
                <p className="text-ink mt-1">{industries.join(", ")}</p>
              </div>
              <div className="col-span-2">
                <p className="label text-mute">ROLES</p>
                <p className="text-ink mt-1">{roles.join(", ")}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="label text-flare mt-10 inline-block hover:underline"
            >
              ← Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const roleChoices = visibleRoles(industries);

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-2xl">

      {/* Page header */}
      <div className="border-rule-strong border-b pb-6">
        <p className="label text-flare mb-3">● EARLY ACCESS APPLICATION</p>
        <h1 className="serif text-ink text-4xl md:text-5xl lg:text-6xl">Request access.</h1>
        <p className="text-mute mt-4 max-w-lg text-base leading-relaxed">
          We review every application personally. The more you tell us, the faster we can place you in the right wave.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-0">

        {/* ── 01: YOU ── */}
        <Section index="01" title="YOU" meta="PERSONAL DETAILS" />
        <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2">
          <Field label="Full name" required error={errors.name}>
            <input
              value={fields.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Alex Mason"
              className={inputCls(errors.name)}
              data-error={errors.name ? true : undefined}
            />
          </Field>
          <Field label="Email" required error={errors.email}>
            <input
              type="email"
              value={fields.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="asha@production.co"
              className={inputCls(errors.email)}
              data-error={errors.email ? true : undefined}
            />
          </Field>
          <Field label="Phone number" required error={errors.phone}>
            <input
              type="tel"
              value={fields.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+44 7700 900000"
              className={inputCls(errors.phone)}
              data-error={errors.phone ? true : undefined}
            />
          </Field>
          <Field label="Postcode" required error={errors.postcode}>
            <input
              value={fields.postcode}
              onChange={(e) => set("postcode", e.target.value)}
              placeholder="E1 6RF"
              className={inputCls(errors.postcode)}
              data-error={errors.postcode ? true : undefined}
            />
          </Field>
        </div>

        {/* ── 02: YOUR INDUSTRY ── */}
        <Section index="02" title="YOUR INDUSTRY" meta="WHERE YOU WORK" />
        <div className="py-8">
          <p
            className="label text-mute mb-4"
            data-error={errors.industries ? true : undefined}
          >
            Which industries do you work in?{" "}
            <span className="text-flare">*</span>
            {errors.industries && (
              <span className="text-rec ml-3 font-sans normal-case">{errors.industries}</span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => {
              const active = industries.includes(ind);
              return (
                <button
                  key={ind}
                  type="button"
                  onClick={() => toggleIndustry(ind)}
                  className={`label border px-4 py-2.5 transition-colors ${
                    active
                      ? "border-flare bg-flare/10 text-flare"
                      : errors.industries
                        ? "border-rec/40 text-mute hover:border-ink/30 hover:text-ink"
                        : "border-rule text-mute hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {ind}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 03: YOUR CRAFT ── */}
        <Section index="03" title="YOUR CRAFT" meta="ROLES + GEAR" />
        <div className="py-8">
          <p
            className="label text-mute mb-4"
            data-error={errors.roles ? true : undefined}
          >
            {industries.length === 0
              ? "Select an industry above to filter roles, or pick from all below"
              : `Roles for ${industries.join(", ")}`}
            {" "}
            <span className="text-flare">*</span>
            {errors.roles && (
              <span className="text-rec ml-3 font-sans normal-case">{errors.roles}</span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {roleChoices.map((r) => {
              const active = roles.includes(r);
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleRole(r)}
                  className={`label border px-3 py-2 transition-colors ${
                    active
                      ? "border-flare bg-flare/10 text-flare"
                      : errors.roles
                        ? "border-rec/40 text-mute hover:border-ink/30 hover:text-ink"
                        : "border-rule text-mute hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>

          <p className="label text-mute mt-8 mb-4">Do you have kit or spaces to list?</p>
          <div className="flex flex-wrap gap-3">
            {(["kit", "space", "both", "no"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => set("gear", v)}
                className={`label border px-5 py-2.5 transition-colors ${
                  fields.gear === v
                    ? "border-flare bg-flare/10 text-flare"
                    : "border-rule text-mute hover:border-ink/30 hover:text-ink"
                }`}
              >
                {v === "kit" ? "Yes - kit" : v === "space" ? "Yes - spaces" : v === "both" ? "Yes - both" : "No - crew only"}
              </button>
            ))}
          </div>
        </div>

        {/* ── 04: YOUR PRESENCE ── */}
        <Section index="04" title="YOUR PRESENCE" meta="LINKS + PROFILES" />
        <div className="py-8">
          {errors.presence && (
            <p className="label text-rec mb-5" data-error>● {errors.presence}</p>
          )}
          <p className="text-mute mb-5 text-[13px] leading-relaxed">
            Fill in at least one.{" "}
            <span className="text-dim">All others are optional.</span>
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Website">
              <input
                type="url"
                value={fields.website}
                onChange={(e) => set("website", e.target.value)}
                placeholder="https://ashapatel.com"
                className={inputCls(errors.presence && !fields.website.trim() ? "highlight" : "")}
              />
            </Field>
            <Field label="Instagram">
              <div
                className={`${inputCls(errors.presence && !fields.instagram.trim() ? "highlight" : "")} flex items-center gap-0 p-0`}
              >
                <span className="label text-dim border-rule border-r px-3 py-[13px]">@</span>
                <input
                  value={fields.instagram}
                  onChange={(e) => set("instagram", e.target.value)}
                  placeholder="ashapatel_dop"
                  className="flex-1 bg-transparent px-3 py-3 text-[14px] text-ink outline-none placeholder:text-dim"
                />
              </div>
            </Field>
            <Field label="LinkedIn profile URL">
              <input
                type="url"
                value={fields.linkedin}
                onChange={(e) => set("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/ashapatel"
                className={inputCls(errors.presence && !fields.linkedin.trim() ? "highlight" : "")}
              />
            </Field>
            <Field label="IMDb page">
              <input
                type="url"
                value={fields.imdb}
                onChange={(e) => set("imdb", e.target.value)}
                placeholder="https://imdb.com/name/nm..."
                className={inputCls(errors.presence && !fields.imdb.trim() ? "highlight" : "")}
              />
            </Field>
          </div>
        </div>

        {/* ── 05: YOUR WORK ── */}
        <Section index="05" title="YOUR WORK" meta="LAST THREE JOBS" />
        <div className="py-8">
          {errors.work && (
            <p className="label text-rec mb-5" data-error>● {errors.work}</p>
          )}
          <p className="text-mute mb-5 text-[14px] leading-relaxed">
            At least one valid link required - YouTube, Vimeo, a production site, anything that shows the work.
          </p>
          <div className="space-y-4">
            {(["job1", "job2", "job3"] as const).map((key, i) => {
              const val = fields[key];
              const filled = val.trim().length > 0;
              const invalid = filled && !isValidUrl(val);
              return (
                <Field
                  key={key}
                  label={`Job ${i + 1}${i === 0 ? " *" : ""}`}
                  error={invalid ? "Must be a valid URL (https://...)" : undefined}
                >
                  <input
                    type="url"
                    value={val}
                    onChange={(e) => set(key, e.target.value)}
                    placeholder="https://vimeo.com/..."
                    className={inputCls(
                      (errors.work && i === 0 && !filled) || invalid ? "error" : ""
                    )}
                  />
                </Field>
              );
            })}
          </div>
        </div>

        {/* ── 06: YOUR IN ── */}
        <Section index="06" title="YOUR IN" meta="REFERRAL CODE" />
        <div className="py-8">
          <p className="text-mute mb-5 text-[14px] leading-relaxed">
            A referral code from an existing member is required to apply.
          </p>
          <Field label="Referral code" required error={errors.referral}>
            <input
              value={fields.referral}
              onChange={(e) => set("referral", e.target.value.toUpperCase())}
              placeholder="e.g. DAN-HARRIS-01"
              data-error={errors.referral ? true : undefined}
              className={`${inputCls(errors.referral)} font-mono tracking-widest`}
            />
          </Field>
          <p className="label text-dim mt-3">
            Don&apos;t have one? Ask someone already in the network.
          </p>
        </div>

        {/* Submit */}
        <div className="border-rule border-t pt-8 pb-16">
          {Object.keys(errors).length > 0 && (
            <p className="label text-rec mb-6">
              ● Some fields need attention - check above before resubmitting.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-ink text-bg label hover:bg-flare disabled:opacity-50 w-full py-5 text-[13px] tracking-widest transition-colors md:w-auto md:px-16"
          >
            {status === "loading" ? "Checking..." : "Submit application →"}
          </button>
          <p className="label text-dim mt-4">
            ● We review every application. No spam - ever.
          </p>
        </div>

      </form>
    </div>
  );
}

/* ─── Sub-components ─── */

function Section({ index, title, meta }: { index: string; title: string; meta: string }) {
  return (
    <div className="border-rule flex items-baseline justify-between border-t pt-8 pb-0">
      <div className="flex items-baseline gap-3">
        <span className="label text-flare">{index} /</span>
        <span className="serif text-ink text-2xl">{title}</span>
      </div>
      <span className="label text-dim hidden md:block">{meta}</span>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="label text-mute mb-2">
        {label.toUpperCase()}
        {required && <span className="text-flare ml-1">*</span>}
        {error && (
          <span className="text-rec ml-2 font-sans normal-case tracking-normal">{error}</span>
        )}
      </p>
      {children}
    </div>
  );
}

function inputCls(error?: string) {
  return `w-full border bg-surface text-ink text-[14px] px-4 py-3 outline-none transition-colors placeholder:text-dim focus:border-ink/40 ${
    error ? "border-rec" : "border-rule-strong"
  }`;
}
