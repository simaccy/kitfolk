import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const CIRCLES = [
  {
    name: "Bristol docs crew",
    members: 14,
    roles: ["DOP", "Sound", "1st AC", "Editor", "Producer"],
    note: "Active",
    jobs: "3 jobs this month",
    accent: "flare" as const,
  },
  {
    name: "North-East commercial team",
    members: 22,
    roles: ["DOP", "Gaffer", "Grip", "1st AD", "Producer", "Prod. Designer"],
    note: "Active",
    jobs: "7 jobs this month",
    accent: "bone" as const,
  },
  {
    name: "My grade & post chain",
    members: 6,
    roles: ["Editor", "Colourist", "Sound design", "VFX"],
    note: "Quiet",
    jobs: "Invite-only",
    accent: "go" as const,
  },
];

const ACCENT_CLASSES = {
  flare: { dot: "text-flare", ring: "border-flare/30", label: "text-flare", bg: "bg-flare/10" },
  bone:  { dot: "text-bone",  ring: "border-bone/30",  label: "text-bone",  bg: "bg-bone/10"  },
  go:    { dot: "text-go",    ring: "border-go/30",    label: "text-go",    bg: "bg-go/10"    },
};

export function SceneCircles() {
  return (
    <section id="circles" className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(212,200,168,0.06),transparent_50%)]" />

      <Container className="relative">
        <SectionLabel index="04" title="CIRCLES, NOT COLD SEARCHES" meta="THE BRAND IDEA" />

        <div className="grid grid-cols-1 gap-10 pt-8 md:pt-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-6xl lg:text-7xl">
                Circles, not <br />
                <span className="italic">cold searches.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <Reveal delay={0.1}>
              <p className="text-mute max-w-md text-lg leading-relaxed">
                Circles are the people you already trust, the people they
                trust, and the groups you build around projects, places, roles
                or recommendations. Keep conversations private, open them up
                to wider circles, or connect through friends of friends when
                you need to go beyond your immediate contacts.
              </p>
              <p className="text-dim mt-4 max-w-md text-[15px] leading-relaxed">
                Message members directly, create group conversations, ask for
                recommendations, pitch yourself, source kit, find spaces and
                build opportunities through the people around you.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3">
          {CIRCLES.map((c, i) => {
            const ac = ACCENT_CLASSES[c.accent];
            const avatarCount = Math.min(8, c.members);
            return (
              <Reveal key={c.name} delay={i * 0.08}>
                <article className="bg-surface border-rule-strong relative flex h-full flex-col overflow-hidden border p-7 md:p-8">

                  {/* Card header */}
                  <div className="label flex items-center justify-between">
                    <span className={ac.label}>CIRCLE / 0{i + 1}</span>
                    <span className="text-mute">{c.note}</span>
                  </div>

                  {/* ── Circular orbit diagram ── */}
                  <div className="relative mx-auto my-8 flex-shrink-0" style={{ width: 192, height: 192 }}>

                    {/* Outer orbit ring */}
                    <div
                      className={`absolute inset-0 rounded-full border ${ac.ring}`}
                    />
                    {/* Inner dashed ring */}
                    <div
                      className="border-rule absolute rounded-full border border-dashed opacity-30"
                      style={{ inset: 32 }}
                    />
                    {/* Faint glow */}
                    <div
                      className={`absolute rounded-full opacity-10 blur-2xl ${ac.bg}`}
                      style={{ inset: 16 }}
                    />

                    {/* Center label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className={`label text-[10px] ${ac.label}`}>●</span>
                      <span className="serif text-ink mt-1 text-[15px] leading-snug px-6">
                        {c.name}
                      </span>
                    </div>

                    {/* Member avatars on the orbit ring */}
                    {Array.from({ length: avatarCount }).map((_, k) => {
                      const angle = (k / avatarCount) * 2 * Math.PI - Math.PI / 2;
                      const r = 90;
                      const x = Math.cos(angle) * r;
                      const y = Math.sin(angle) * r;
                      const letter = String.fromCharCode(65 + ((i * 7 + k * 3) % 26));
                      return (
                        <span
                          key={k}
                          className={`border-rule-strong absolute flex h-8 w-8 items-center justify-center rounded-full ${k % 2 ? "bg-elev" : "bg-surface"}`}
                          style={{
                            top: `calc(50% + ${y}px - 16px)`,
                            left: `calc(50% + ${x}px - 16px)`,
                          }}
                        >
                          <span className="serif text-bone text-[11px]">{letter}</span>
                        </span>
                      );
                    })}

                    {/* Overflow member count — bottom of circle */}
                    {c.members > 8 && (
                      <span
                        className="border-rule-strong bg-rule label text-mute absolute flex h-8 w-8 items-center justify-center rounded-full text-[10px]"
                        style={{
                          bottom: -8,
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        +{c.members - 8}
                      </span>
                    )}
                  </div>

                  {/* Role pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {c.roles.map((r) => (
                      <span
                        key={r}
                        className={`label border px-2.5 py-1 text-[11px] rounded-full ${ac.label} border-current opacity-60`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-rule mt-5 flex items-center justify-between border-t pt-4">
                    <div>
                      <span className="label text-mute">{c.members} MEMBERS</span>
                      <span className="label text-dim mx-2">·</span>
                      <span className="label text-dim">{c.jobs}</span>
                    </div>
                    <span className={`label ${ac.label}`}>→</span>
                  </div>

                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
