import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const PILLARS = [
  {
    code: "I",
    title: "Verified crew",
    body: "Real credits. Real references. Real peers vouching with their name attached. Not a self-written bio.",
    detail: [
      ["IMDb sync", "auto"],
      ["Peer vouches", "named"],
      ["Trust score", "live"],
    ],
  },
  {
    code: "II",
    title: "Trusted kit",
    body: "Cameras, lenses, lights, grip — listed by the people who actually own them. Real availability, real prices.",
    detail: [
      ["Owner-listed", "verified"],
      ["Live availability", "today"],
      ["Insurance status", "shown"],
    ],
  },
  {
    code: "III",
    title: "Fast hiring",
    body: "Post a call. Get matches in minutes, not days — from people you already trust, or people your trust does.",
    detail: [
      ["Median match", "12 min"],
      ["Direct booking", "no fees"],
      ["Replies", "tracked"],
    ],
  },
];

export function Solution() {
  return (
    <section id="solution" className="relative py-28 md:py-40">
      <Container>
        <SectionLabel index="03" title="KITFOLK" meta="THE OPERATING LAYER" />

        <div className="grid grid-cols-1 gap-10 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-6xl lg:text-7xl">
                One trusted layer <br />
                for <span className="italic">production.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal delay={0.1}>
              <p className="text-mute max-w-md text-lg leading-relaxed md:text-xl">
                Discovery, verification and booking — for the people and the
                kit. No middleman. No noise. No paying to message someone you
                already know.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px md:mt-20 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.code} delay={i * 0.08}>
              <article className="bg-surface border-rule-strong group relative h-full overflow-hidden border p-7 md:p-9">
                <div className="from-flare/8 absolute inset-x-0 top-0 h-px bg-gradient-to-r via-transparent to-transparent" />
                <div className="label text-flare flex items-center justify-between">
                  <span>PILLAR {p.code}</span>
                  <span className="text-dim">●</span>
                </div>
                <h3 className="serif text-ink mt-8 text-3xl md:text-4xl">
                  {p.title}
                </h3>
                <p className="text-mute mt-4 text-[15px] leading-relaxed">
                  {p.body}
                </p>
                <ul className="border-rule mt-8 space-y-2 border-t pt-5">
                  {p.detail.map(([k, v]) => (
                    <li
                      key={k}
                      className="label text-mute flex items-center justify-between"
                    >
                      <span>{k}</span>
                      <span className="text-bone">{v}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
