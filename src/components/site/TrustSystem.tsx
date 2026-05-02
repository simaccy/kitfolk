import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const SIGNALS = [
  {
    code: "01",
    name: "Trust Score",
    desc: "A composite of credits, vouches, response time and booking history. Earned. Not self-reported.",
  },
  {
    code: "02",
    name: "Peer vouches",
    desc: "Real names. Real productions. Every vouch links back to who you worked with, on what, and when.",
  },
  {
    code: "03",
    name: "Verified credits",
    desc: "IMDb sync plus peer-confirmed entries. Credit inflation gets weeded out fast.",
  },
  {
    code: "04",
    name: "Booking history",
    desc: "Past gigs. On-time rate. Completion. Visible to the people you'd accept a job from.",
  },
  {
    code: "05",
    name: "Response rate",
    desc: "How fast you reply. Production moves in hours, not days. We surface the people who actually answer.",
  },
];

export function TrustSystem() {
  return (
    <section
      id="trust"
      className="relative py-28 md:py-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,106,61,0.07),transparent_50%)]" />

      <Container className="relative">
        <SectionLabel index="04" title="TRUST SYSTEM" meta="THE DIFFERENCE" />

        <div className="grid grid-cols-1 gap-10 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-6xl lg:text-7xl">
                Trust isn&apos;t assumed. <br />
                It&apos;s <span className="italic">earned, layered,</span>
                <br />
                and visible.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <Reveal delay={0.1}>
              <p className="text-mute max-w-md text-lg leading-relaxed md:text-xl">
                Every profile carries the receipts. We don&apos;t score people —
                their work does.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Trust card showcase */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Profile card */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="border-rule-strong bg-surface relative">
                <div className="border-rule-strong label text-mute flex items-center justify-between border-b px-5 py-3">
                  <span className="text-bone">PROFILE / DOP</span>
                  <span>
                    <span className="text-go">●</span> VERIFIED · KITFOLK
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-12 md:gap-8 md:p-8">
                  <div className="md:col-span-4">
                    {/* Avatar plate */}
                    <div className="border-rule bg-bg relative aspect-[4/5] w-full overflow-hidden border">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,106,61,0.25),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(212,200,168,0.15),transparent_55%)]" />
                      <div className="grid-bg absolute inset-0 opacity-50" />
                      <div className="label text-mute absolute top-3 left-3">
                        ID 01184
                      </div>
                      <div className="label text-mute absolute right-3 bottom-3">
                        24.05.26
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="serif text-ink text-7xl">AP</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-8">
                    <div className="flex items-baseline justify-between">
                      <h3 className="serif text-ink text-3xl md:text-4xl">
                        Asha Patel
                      </h3>
                      <div className="text-right">
                        <p className="label text-mute">TRUST SCORE</p>
                        <p className="serif text-flare text-4xl leading-none md:text-5xl">
                          94
                        </p>
                      </div>
                    </div>
                    <p className="label text-bone mt-2">
                      DOP · LONDON · OPEN APR–JUN
                    </p>

                    {/* Trust bars */}
                    <div className="border-rule mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t pt-5">
                      {[
                        ["Credits", 96],
                        ["Vouches", 92],
                        ["On-time", 98],
                        ["Response", 89],
                      ].map(([k, v]) => (
                        <div key={k as string}>
                          <div className="label text-mute flex justify-between">
                            <span>{k}</span>
                            <span className="text-bone">{v}</span>
                          </div>
                          <div className="bg-rule mt-1.5 h-1 w-full">
                            <div
                              className="bg-flare h-full"
                              style={{ width: `${v}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-rule mt-6 border-t pt-5">
                      <p className="label text-mute mb-3">RECENT CREDITS</p>
                      <ul className="divide-rule divide-y">
                        {[
                          ["Sundown / feature", "DOP", "2026"],
                          ["Northbound / spot", "DOP", "2025"],
                          ["After Hours / series", "2nd unit DOP", "2025"],
                        ].map(([title, role, year]) => (
                          <li
                            key={title}
                            className="grid grid-cols-12 gap-3 py-2.5 text-[14px]"
                          >
                            <span className="text-ink col-span-7">{title}</span>
                            <span className="text-mute col-span-3">{role}</span>
                            <span className="mono text-dim col-span-2 text-right">
                              {year}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-rule mt-6 border-t pt-5">
                      <p className="label text-mute mb-3">VOUCHED BY</p>
                      <div className="flex flex-wrap gap-2">
                        {["M. Reyes (Gaffer)", "L. Karlsson (Sound)", "D. Okafor (1st AD)", "+ 9 others"].map(
                          (v) => (
                            <span
                              key={v}
                              className="border-rule text-bone label border px-2.5 py-1.5"
                            >
                              {v}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Signals list */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="border-rule border-t">
                {SIGNALS.map((s) => (
                  <div
                    key={s.code}
                    className="border-rule grid grid-cols-12 gap-4 border-b py-6"
                  >
                    <div className="col-span-2">
                      <span className="label text-flare">{s.code}</span>
                    </div>
                    <div className="col-span-10">
                      <h4 className="text-ink text-xl tracking-tight md:text-2xl">
                        {s.name}
                      </h4>
                      <p className="text-mute mt-2 text-[15px] leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
