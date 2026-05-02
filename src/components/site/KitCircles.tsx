import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const CIRCLES = [
  {
    name: "Bristol docs crew",
    members: 14,
    roles: ["DOP", "Sound", "1st AC", "Editor", "Producer"],
    note: "Active · 3 jobs this month",
    accent: "flare",
  },
  {
    name: "North-East commercial team",
    members: 22,
    roles: ["DOP", "Gaffer", "Grip", "1st AD", "Producer", "Production Designer"],
    note: "Active · 7 jobs this month",
    accent: "bone",
  },
  {
    name: "My grade & post chain",
    members: 6,
    roles: ["Editor", "Colourist", "Sound design", "VFX"],
    note: "Quiet · invite-only",
    accent: "go",
  },
];

export function KitCircles() {
  return (
    <section id="circles" className="relative py-28 md:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(212,200,168,0.06),transparent_50%)]" />

      <Container className="relative">
        <SectionLabel index="07" title="KIT CIRCLES" meta="PRIVATE NETWORKS" />

        <div className="grid grid-cols-1 gap-10 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-6xl lg:text-7xl">
                Your trusted crew. <br />
                Now <span className="italic">structured.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <Reveal delay={0.1}>
              <p className="text-mute max-w-md text-lg leading-relaxed">
                KitCircles are the people you actually want on your sets. Not a
                feed. Not a public list. WhatsApp intimacy, with hiring built
                in.
              </p>
              <p className="text-dim mt-4 max-w-md text-[15px] leading-relaxed">
                Spin one up for a project, a region, or just &quot;the people I
                trust on a 5am call.&quot;
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px md:mt-20 md:grid-cols-3">
          {CIRCLES.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <article className="bg-surface border-rule-strong relative h-full border p-7 md:p-9">
                <div className="label text-mute flex items-center justify-between">
                  <span className="text-flare">CIRCLE / 0{i + 1}</span>
                  <span>{c.note}</span>
                </div>

                <h3 className="serif text-ink mt-7 text-2xl md:text-[28px]">
                  {c.name}
                </h3>

                {/* Member chips */}
                <div className="mt-5 flex -space-x-2">
                  {Array.from({ length: Math.min(6, c.members) }).map((_, k) => (
                    <span
                      key={k}
                      className="border-rule-strong bg-bg flex h-9 w-9 items-center justify-center border"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${
                          k % 2 ? "#3a3a36" : "#2a2826"
                        }, #16161410)`,
                      }}
                    >
                      <span className="serif text-bone text-[13px]">
                        {String.fromCharCode(65 + ((i * 7 + k * 3) % 26))}
                      </span>
                    </span>
                  ))}
                  {c.members > 6 && (
                    <span className="border-rule-strong bg-bg label text-mute flex h-9 w-9 items-center justify-center border">
                      +{c.members - 6}
                    </span>
                  )}
                </div>

                <ul className="border-rule mt-6 flex flex-wrap gap-1.5 border-t pt-5">
                  {c.roles.map((r) => (
                    <li
                      key={r}
                      className="border-rule label text-bone border px-2 py-1"
                    >
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="border-rule mt-6 flex items-center justify-between border-t pt-5">
                  <span className="label text-mute">{c.members} MEMBERS</span>
                  <span className="label text-flare">OPEN CIRCLE →</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
