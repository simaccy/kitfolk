"use client";

import { useState, type FormEvent } from "react";

type Variant = "hero" | "cta";

export function EmailCapture({
  variant = "hero",
  withRole = false,
}: {
  variant?: Variant;
  withRole?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("crew");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Simulate request — replace with real endpoint
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className={`border-rule-strong bg-surface relative w-full border ${
          variant === "hero" ? "max-w-xl" : "max-w-2xl"
        }`}
      >
        <div className="px-5 py-5 md:px-6 md:py-6">
          <p className="label text-go">● ON THE LIST</p>
          <p className="text-ink mt-2 text-base md:text-lg">
            You&apos;re in. We&apos;ll only email you once — when it&apos;s your
            turn.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full ${variant === "hero" ? "max-w-xl" : "max-w-2xl"}`}
    >
      {withRole && (
        <div
          role="radiogroup"
          aria-label="I am a"
          className="border-rule-strong divide-rule-strong bg-surface mb-3 flex divide-x border"
        >
          {[
            { id: "crew", label: "Crew" },
            { id: "production", label: "Production" },
            { id: "kit", label: "Kit owner" },
          ].map((r) => {
            const active = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setRole(r.id)}
                className={`label flex-1 px-4 py-3 text-left transition-colors ${
                  active
                    ? "bg-ink text-bg"
                    : "text-mute hover:text-ink hover:bg-ink/5"
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="border-rule-strong bg-surface flex items-stretch border focus-within:border-ink/30">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@production.co"
          className="text-ink placeholder:text-dim flex-1 bg-transparent px-4 py-4 text-[15px] outline-none md:px-5"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-ink text-bg label hover:bg-bone disabled:opacity-60 px-5 py-4 transition-colors md:px-6"
        >
          {status === "loading" ? "Sending…" : "Request access →"}
        </button>
      </div>
      <p
        className={`label mt-3 ${
          status === "error" ? "text-rec" : "text-dim"
        }`}
      >
        {status === "error"
          ? "● Enter a valid email"
          : "● Curated rollout. We don't spam."}
      </p>
    </form>
  );
}
