import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Features() {
  return (
    <section id="features" className="relative py-28 md:py-40">
      <Container>
        <SectionLabel index="06" title="V1 FEATURES" meta="WHAT SHIPS" />

        <div className="grid grid-cols-1 gap-10 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-6xl lg:text-7xl">
                Built for the way <br />
                production <span className="italic">actually</span> works.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <Reveal delay={0.1}>
              <p className="text-mute max-w-md text-lg leading-relaxed">
                Five things, done well. We&apos;re not building a SaaS suite.
                We&apos;re building the tool you reach for at 6am on a wrap day.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px md:mt-20 md:grid-cols-6">
          {/* Wide: Crew profiles */}
          <Reveal className="md:col-span-4">
            <article className="bg-surface border-rule-strong relative h-full overflow-hidden border p-7 md:min-h-[420px] md:p-10">
              <div className="label text-flare flex items-center justify-between">
                <span>F-01</span>
                <span className="text-dim">●</span>
              </div>
              <h3 className="serif text-ink mt-6 text-3xl md:text-4xl">
                Crew profiles
              </h3>
              <p className="text-mute mt-3 max-w-md text-[15px] leading-relaxed">
                Visual, credits-led, peer-vouched. Know exactly who you&apos;re
                hiring before the call.
              </p>

              {/* Tiny crew row preview */}
              <div className="border-rule-strong absolute right-7 bottom-7 left-7 border md:right-10 md:left-10">
                <div className="border-rule-strong label text-mute flex items-center justify-between border-b px-4 py-2">
                  <span>RESULTS · &quot;DOP · LDN · APR&quot;</span>
                  <span className="text-bone">12</span>
                </div>
                <ul className="divide-rule divide-y">
                  {[
                    ["A. Patel", "DOP", "94"],
                    ["J. Mwangi", "DOP", "91"],
                    ["C. Suzuki", "DOP", "89"],
                  ].map(([n, r, s]) => (
                    <li
                      key={n}
                      className="grid grid-cols-12 items-center gap-3 px-4 py-2.5 text-[14px]"
                    >
                      <span className="text-ink col-span-6">{n}</span>
                      <span className="label text-mute col-span-3">{r}</span>
                      <span className="mono text-bone col-span-3 text-right">
                        TS {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          {/* Tall: Live calls */}
          <Reveal delay={0.05} className="md:col-span-2 md:row-span-2">
            <article className="bg-surface border-rule-strong relative h-full overflow-hidden border p-7 md:p-9">
              <div className="label text-flare flex items-center justify-between">
                <span>F-02</span>
                <span className="text-rec animate-rec">●</span>
              </div>
              <h3 className="serif text-ink mt-6 text-3xl md:text-4xl">
                Live &quot;Looking for…&quot; board
              </h3>
              <p className="text-mute mt-3 text-[15px] leading-relaxed">
                Post a call, get DMs from verified pros within minutes.
              </p>

              <ul className="border-rule mt-8 space-y-3 border-t pt-5">
                {[
                  {
                    text: "Sound mixer · Glasgow · 14 May · 1 day",
                    age: "2m",
                  },
                  {
                    text: "1st AC · Berlin · 16–18 May · commercial",
                    age: "9m",
                  },
                  { text: "Gaffer · London · 22 May · doc", age: "31m" },
                  { text: "Steadicam · Bristol · 1 Jun · feature", age: "1h" },
                ].map((c) => (
                  <li
                    key={c.text}
                    className="border-rule-strong border p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="label text-flare">CALL</span>
                      <span className="mono text-dim text-[11px]">
                        {c.age}
                      </span>
                    </div>
                    <p className="text-ink mt-1.5 text-[14px] leading-snug">
                      {c.text}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* Kit listings */}
          <Reveal delay={0.1} className="md:col-span-2">
            <article className="bg-surface border-rule-strong relative h-full overflow-hidden border p-7 md:min-h-[260px] md:p-9">
              <div className="label text-flare flex items-center justify-between">
                <span>F-03</span>
                <span className="text-dim">●</span>
              </div>
              <h3 className="serif text-ink mt-6 text-2xl md:text-3xl">
                Kit listings
              </h3>
              <p className="text-mute mt-3 text-[14px] leading-relaxed">
                Real availability. Real prices. Real owners. No phantom rentals.
              </p>
              <div className="border-rule mt-5 border-t pt-3">
                <ul className="space-y-1.5">
                  {[
                    ["ARRI Alexa 35", "£950 / day", "go"],
                    ["Cooke S4/i set", "£420 / day", "go"],
                    ["Aputure 600D", "£85 / day", "bone"],
                  ].map(([n, p, c]) => (
                    <li
                      key={n}
                      className="grid grid-cols-12 gap-2 text-[13px]"
                    >
                      <span className="text-ink col-span-7 truncate">{n}</span>
                      <span className="text-mute mono col-span-4 text-right">
                        {p}
                      </span>
                      <span
                        className={`label col-span-1 text-right ${
                          c === "go" ? "text-go" : "text-bone"
                        }`}
                      >
                        ●
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.15} className="md:col-span-2">
            <article className="bg-surface border-rule-strong relative h-full overflow-hidden border p-7 md:min-h-[260px] md:p-9">
              <div className="label text-flare flex items-center justify-between">
                <span>F-04</span>
                <span className="text-dim">●</span>
              </div>
              <h3 className="serif text-ink mt-6 text-2xl md:text-3xl">
                Map discovery
              </h3>
              <p className="text-mute mt-3 text-[14px] leading-relaxed">
                Find local crew and kit without sifting through every city.
              </p>

              {/* Mini map */}
              <div className="border-rule bg-bg relative mt-5 aspect-[2/1] w-full overflow-hidden border">
                <div className="grid-bg absolute inset-0 opacity-50" />
                <div className="absolute inset-0">
                  {[
                    [22, 30],
                    [40, 55],
                    [60, 35],
                    [75, 60],
                    [50, 70],
                    [30, 65],
                    [85, 25],
                  ].map(([x, y], i) => (
                    <span
                      key={i}
                      className="bg-flare absolute h-1.5 w-1.5 rounded-full"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        opacity: 0.4 + (i % 3) * 0.2,
                      }}
                    />
                  ))}
                  <span className="border-flare absolute h-3 w-3 rounded-full border-2" style={{ left: '38%', top: '52%' }} />
                </div>
              </div>
            </article>
          </Reveal>

          {/* Messaging */}
          <Reveal delay={0.2} className="md:col-span-4">
            <article className="bg-surface border-rule-strong relative h-full overflow-hidden border p-7 md:min-h-[260px] md:p-10">
              <div className="label text-flare flex items-center justify-between">
                <span>F-05</span>
                <span className="text-dim">●</span>
              </div>
              <h3 className="serif text-ink mt-6 text-2xl md:text-3xl">
                Direct messaging
              </h3>
              <p className="text-mute mt-3 max-w-md text-[15px] leading-relaxed">
                One thread per booking. No more lost WhatsApps. Call sheets,
                rates and confirmations stay where the conversation is.
              </p>

              <div className="border-rule absolute right-7 bottom-7 left-7 border md:right-10 md:left-10">
                <div className="border-rule label text-mute flex items-center justify-between border-b px-4 py-2">
                  <span>THREAD · SUNDOWN · DOP</span>
                  <span className="text-go">● BOOKED</span>
                </div>
                <ul className="space-y-2 px-4 py-3">
                  <li className="text-[13px]">
                    <span className="label text-mute">14:02</span>{" "}
                    <span className="text-ink">
                      Confirmed for May 22–28. Sending kit list.
                    </span>
                  </li>
                  <li className="text-[13px]">
                    <span className="label text-mute">14:04</span>{" "}
                    <span className="text-mute">
                      Call sheet attached · v3.pdf
                    </span>
                  </li>
                </ul>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
