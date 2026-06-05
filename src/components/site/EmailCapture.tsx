"use client";

import { useState, type FormEvent } from "react";
import { useRequestAccess } from "./RequestAccessContext";

type Variant = "hero" | "cta";

export function EmailCapture({
  variant = "hero",
  withRole = false,
}: {
  variant?: Variant;
  withRole?: boolean;
}) {
  const { open } = useRequestAccess();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("crew");
  const [error, setError] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError(true);
      return;
    }
    open(email);
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
            { id: "space", label: "Space owner" },
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
            if (error) setError(false);
          }}
          placeholder="you@production.co"
          className="text-ink placeholder:text-dim flex-1 bg-transparent px-4 py-4 text-[15px] outline-none md:px-5"
          aria-label="Email address"
        />
        <button
          type="submit"
          className="bg-ink text-bg label hover:bg-flare px-5 py-4 transition-colors md:px-6"
        >
          Request access →
        </button>
      </div>
      <p className={`label mt-3 ${error ? "text-rec" : "text-dim"}`}>
        {error ? "● Enter a valid email" : "● Curated rollout. We don't spam."}
      </p>
    </form>
  );
}
