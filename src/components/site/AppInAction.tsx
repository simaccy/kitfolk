import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

// ─── Reusable phone shell ────────────────────────────────────────────────────
function Phone({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: 248, height: 516, ...style }}
    >
      {/* Outer shell */}
      <div className="bg-ink absolute inset-0 rounded-[42px] shadow-2xl" />
      {/* Side buttons — volume */}
      <div className="bg-ink absolute -left-[3px] top-[88px] h-9 w-[3px] rounded-l-sm" />
      <div className="bg-ink absolute -left-[3px] top-[136px] h-14 w-[3px] rounded-l-sm" />
      {/* Side button — power */}
      <div className="bg-ink absolute -right-[3px] top-[112px] h-12 w-[3px] rounded-r-sm" />
      {/* Screen inset */}
      <div className="bg-bg absolute inset-[3px] overflow-hidden rounded-[39px]">
        {/* Dynamic island */}
        <div className="bg-ink absolute top-[10px] left-1/2 z-20 h-[26px] w-[84px] -translate-x-1/2 rounded-full" />
        {/* Status bar */}
        <div className="relative z-10 flex items-center justify-between px-7 pt-[44px] pb-1">
          <span className="font-mono text-[9px] tracking-wider opacity-60 text-ink">9:41</span>
          <div className="flex items-center gap-1 opacity-60 text-ink">
            <span className="font-mono text-[9px]">▲▲▲ ● ▊</span>
          </div>
        </div>
        {/* Content */}
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

// ─── Screen: Live calls board ─────────────────────────────────────────────────
function ScreenLive() {
  return (
    <div className="px-4">
      <div className="flex items-center justify-between pb-3">
        <span className="font-mono text-[9px] tracking-[0.14em] text-flare uppercase">● Live</span>
        <span className="font-mono text-[9px] tracking-[0.1em] text-mute uppercase">14 online</span>
      </div>
      <div className="space-y-2">
        {[
          { type: "CALL", text: "Sound mixer · Glasgow · 14 May", age: "2m", hot: true },
          { type: "SPACE", text: "Studio, SE1 · 16–18 May · commercial", age: "9m", hot: false },
          { type: "CALL", text: "Gaffer · London · 22 May · doc", age: "31m", hot: false },
          { type: "CALL", text: "Location house · Bristol · 1 Jun", age: "1h", hot: false },
          { type: "CALL", text: "1st AC · Berlin · 3 Jun · feature", age: "3h", hot: false },
        ].map((c, i) => (
          <div key={i} className="border-rule-strong border p-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] tracking-[0.12em] text-flare">{c.type}</span>
              <span className="font-mono text-[8px] text-dim">{c.age}</span>
            </div>
            <p className="text-ink mt-1 text-[11px] leading-tight">{c.text}</p>
          </div>
        ))}
      </div>
      <div className="border-rule mt-3 border-t pt-3">
        <div className="bg-ink text-bg font-mono text-[9px] tracking-[0.12em] uppercase flex items-center justify-center py-2.5">
          + Post a call →
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Crew profile ─────────────────────────────────────────────────────
function ScreenProfile() {
  return (
    <div className="px-4">
      <div className="flex items-center justify-between pb-3">
        <span className="font-mono text-[8px] tracking-[0.12em] text-mute uppercase">Profile / DOP</span>
        <span className="font-mono text-[8px] text-go">● Verified</span>
      </div>

      {/* Avatar */}
      <div className="border-rule bg-elev relative mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border">
        <span className="font-serif text-ink text-xl leading-none">AM</span>
      </div>

      <div className="text-center mb-3">
        <p className="font-serif text-ink text-[18px] leading-tight">Alex Mason</p>
        <p className="font-mono text-[8px] tracking-[0.1em] text-bone mt-0.5 uppercase">DOP · London · Open Apr–Jun</p>
      </div>

      {/* Circles */}
      <div className="border-rule border-t pt-2.5 pb-2.5">
        <p className="font-mono text-[8px] tracking-[0.12em] text-mute uppercase mb-1.5">Scene Circles</p>
        <div className="flex flex-wrap gap-1">
          {["London DOPs", "Commercial Crew UK"].map((c) => (
            <span key={c} className="font-mono text-[8px] text-flare border border-flare/40 px-1.5 py-0.5 rounded-full">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Referred */}
      <div className="border-rule border-t pt-2.5 pb-2.5">
        <p className="font-mono text-[8px] tracking-[0.12em] text-mute uppercase mb-1">Referred by</p>
        <p className="text-ink text-[11px]">Simon Macson <span className="text-mute">· 1st AD</span></p>
      </div>

      {/* Credits */}
      <div className="border-rule border-t pt-2.5 pb-2.5">
        <p className="font-mono text-[8px] tracking-[0.12em] text-mute uppercase mb-1.5">Recent Credits</p>
        {[
          ["Sundown / feature", "2026"],
          ["Northbound / spot", "2025"],
          ["After Hours / series", "2025"],
        ].map(([t, y]) => (
          <div key={t} className="flex justify-between py-0.5">
            <span className="text-ink text-[10px]">{t}</span>
            <span className="font-mono text-[8px] text-dim">{y}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-flare text-bg font-mono text-[9px] tracking-[0.12em] uppercase flex items-center justify-center py-2.5 mt-2">
        Request Booking →
      </div>
    </div>
  );
}

// ─── Screen: Scene Circle ─────────────────────────────────────────────────────
function ScreenCircle() {
  const members = 14;
  const avatarCount = 8;

  return (
    <div className="px-4">
      <div className="flex items-center justify-between pb-2">
        <span className="font-mono text-[8px] tracking-[0.12em] text-flare uppercase">● Active</span>
        <span className="font-mono text-[8px] text-mute uppercase">Circle / 01</span>
      </div>
      <p className="font-serif text-ink text-[16px] leading-tight mb-3">London DOPs</p>

      {/* Mini orbital ring */}
      <div className="relative mx-auto" style={{ width: 148, height: 148 }}>
        <div className="absolute inset-0 rounded-full border border-flare/25" />
        <div className="absolute rounded-full border border-dashed border-rule opacity-40" style={{ inset: 22 }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[8px] tracking-[0.1em] text-mute uppercase">
            {members} mbrs
          </span>
        </div>
        {Array.from({ length: avatarCount }).map((_, k) => {
          const angle = (k / avatarCount) * 2 * Math.PI - Math.PI / 2;
          const r = 66;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <span
              key={k}
              className={`absolute flex h-6 w-6 items-center justify-center rounded-full text-bone ${k % 2 ? "bg-elev" : "bg-surface"}`}
              style={{
                top: `calc(50% + ${y}px - 12px)`,
                left: `calc(50% + ${x}px - 12px)`,
                fontSize: 8,
                fontFamily: "serif",
              }}
            >
              {String.fromCharCode(65 + ((k * 3 + 7) % 26))}
            </span>
          );
        })}
      </div>

      {/* Roles */}
      <div className="border-rule border-t pt-2.5 pb-2.5 mt-2">
        <div className="flex flex-wrap gap-1">
          {["DOP", "Sound", "1st AC", "Editor", "Producer"].map((r) => (
            <span key={r} className="font-mono text-[8px] text-flare border border-flare/40 px-1.5 py-0.5 rounded-full">
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div className="border-rule border-t pt-2.5">
        <p className="font-mono text-[8px] tracking-[0.12em] text-mute uppercase mb-1.5">Recent Activity</p>
        {[
          ["Alex M. posted a call", "2m"],
          ["Dan H. confirmed gig", "1h"],
          ["Ferne H. joined circle", "3h"],
        ].map(([text, age]) => (
          <div key={text} className="flex items-center justify-between py-0.5">
            <span className="text-ink text-[10px]">{text}</span>
            <span className="font-mono text-[8px] text-dim">{age}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function AppInAction() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_80%,rgba(212,148,58,0.08),transparent_55%)]" />
      </div>

      <Container className="relative">
        <SectionLabel index="05" title="IN YOUR POCKET" meta="WEB APP · IOS · ANDROID" />

        <div className="grid grid-cols-1 gap-16 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-12">

          {/* Copy */}
          <div className="flex flex-col justify-center lg:col-span-4">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-6xl lg:text-7xl">
                Built for <br />
                <span className="italic">the field.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-mute mt-6 max-w-sm text-lg leading-relaxed">
                SceneCircle works on any device. Browse the live board, check
                crew profiles, and confirm bookings from wherever the job takes
                you.
              </p>
              <p className="text-dim mt-4 max-w-sm text-[15px] leading-relaxed">
                Native apps for iOS and Android are coming. In the meantime, the
                web app is built for mobile from day one.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  ["App Store", "Coming soon"],
                  ["Google Play", "Coming soon"],
                ].map(([platform, status]) => (
                  <div
                    key={platform}
                    className="border-rule-strong bg-surface flex flex-col border px-4 py-3"
                  >
                    <span className="label text-mute">{platform}</span>
                    <span className="text-ink mt-0.5 text-[13px]">{status}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Phone mockups */}
          <div className="flex items-end justify-center gap-4 lg:col-span-8 lg:justify-end">
            {/* Left phone — Live board */}
            <Reveal delay={0.1} className="hidden md:block">
              <Phone
                className="-translate-y-4"
                style={{ transform: "rotate(-6deg) translateY(32px)", width: 232, height: 484 }}
              >
                <ScreenLive />
              </Phone>
            </Reveal>

            {/* Centre phone — Crew profile (main) */}
            <Reveal delay={0.05}>
              <Phone className="z-10">
                <ScreenProfile />
              </Phone>
            </Reveal>

            {/* Right phone — Scene Circle */}
            <Reveal delay={0.15} className="hidden md:block">
              <Phone style={{ transform: "rotate(6deg) translateY(32px)", width: 232, height: 484 }}>
                <ScreenCircle />
              </Phone>
            </Reveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
