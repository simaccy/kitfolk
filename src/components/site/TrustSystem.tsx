import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const SIGNALS = [
  {
    code: "01",
    name: "Circles",
    desc: "The people you belong to, work with and are introduced by become part of your professional context.",
  },
  {
    code: "02",
    name: "Peer vouches",
    desc: "Recommendations link back to real people, productions and working relationships.",
  },
  {
    code: "03",
    name: "Verified profiles",
    desc: "Profiles can show credits, links, availability, kit, recent work and references.",
  },
  {
    code: "04",
    name: "Safer hiring",
    desc: "Kit inventory, insurance, check-in/check-out and rate guidance help make transactions clearer and safer.",
  },
];

export function TrustSystem() {
  return (
    <section
      id="trust"
      className="relative py-28 md:py-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(228,111,90,0.06),transparent_55%)]" />

      <Container className="relative">
        <SectionLabel index="04" title="TRUST YOU CAN SEE" meta="THE DIFFERENCE" />

        <div className="grid grid-cols-1 gap-10 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-6xl lg:text-7xl">
                Trust should not be hidden <br />
                in <span className="italic">private chats.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <Reveal delay={0.1}>
              <p className="text-mute max-w-md text-lg leading-relaxed md:text-xl">
                SceneCircle makes trust visible through circles, referrals,
                peer vouches, credits, profiles and working relationships. Not
                anonymous ratings. Not self-written claims. Real people, real
                work, real context.
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
                    <span className="text-go">●</span> VERIFIED · SCENECIRCLE
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-12 md:gap-8 md:p-8">
                  <div className="md:col-span-4">
                    {/* Avatar plate */}
                    <div className="border-rule bg-bg relative aspect-[4/5] w-full overflow-hidden border">
                      <img
                        src="/profile-alex-mason.jpg"
                        alt="Alex Mason — DOP"
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35)_0%,transparent_40%)]" />
                      <div className="label text-white/70 absolute top-3 left-3">
                        ID 01184
                      </div>
                      <div className="label text-white/70 absolute right-3 bottom-3">
                        24.05.26
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-8">
                    <h3 className="serif text-ink text-3xl md:text-4xl">
                      Alex Mason
                    </h3>
                    <p className="label text-bone mt-2">
                      DOP · LONDON · OPEN APR–JUN
                    </p>

                    <div className="border-rule mt-6 border-t pt-5">
                      <p className="label text-mute mb-3">SCENE CIRCLES</p>
                      <div className="flex flex-wrap gap-2">
                        {["London DOPs", "Commercial Crew UK", "Feature Film Network"].map((c) => (
                          <span
                            key={c}
                            className="border-flare/40 text-flare label border px-2.5 py-1.5"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-rule mt-6 border-t pt-5">
                      <p className="label text-mute mb-2">REFERRED BY</p>
                      <p className="text-ink text-[15px]">
                        Simon Macson{" "}
                        <span className="text-mute">· 1st AD</span>
                      </p>
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
                        {["D. Harris (Gaffer)", "F. Hart (Sound)", "S. Macson (1st AD)", "+ 9 others"].map(
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
