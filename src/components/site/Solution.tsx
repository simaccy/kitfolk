import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const PILLARS = [
  {
    code: "I",
    title: "Find people",
    body: "Find crew, collaborators, peers and last-minute recommendations through people connected to the work.",
    detail: [
      ["Peer vouches", "named"],
      ["Circle verified", "live"],
      ["Direct booking", "no fees"],
    ],
  },
  {
    code: "II",
    title: "Source kit",
    body: "Rent equipment directly from working freelancers and kit owners, with clearer availability, pricing and ownership.",
    detail: [
      ["Owner-listed", "verified"],
      ["Live availability", "today"],
      ["Insurance status", "shown"],
    ],
  },
  {
    code: "III",
    title: "Find spaces",
    body: "Discover studios, locations, houses and production spaces through trusted owners and working recommendations.",
    detail: [
      ["Owner-listed", "verified"],
      ["Live availability", "today"],
      ["Direct booking", "no fees"],
    ],
  },
  {
    code: "IV",
    title: "Ask the circle",
    body: "Post questions, ask for advice, solve problems, share opportunities and open up conversations.",
    detail: [
      ["Responses", "trusted"],
      ["From circles", "you know"],
      ["Or wider network", "opt-in"],
    ],
  },
  {
    code: "V",
    title: "Promote your work",
    body: "Create a profile that represents who you are, what you do, what you offer and where people can see your work.",
    detail: [
      ["Credits", "verified"],
      ["Kit listings", "live"],
      ["Availability", "shown"],
    ],
  },
];

export function Solution() {
  return (
    <section id="solution" className="relative py-28 md:py-40">
      <Container>
        <SectionLabel index="03" title="WHAT YOUR CIRCLE CAN HELP WITH" meta="USER JOBS" />

        <div className="grid grid-cols-1 gap-10 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-6xl lg:text-7xl">
                What your circle <br />
                can <span className="italic">help with.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal delay={0.1}>
              <p className="text-mute max-w-md text-lg leading-relaxed md:text-xl">
                SceneCircle brings the things production people already ask
                each other for into one trusted place.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px md:mt-20 md:grid-cols-2 lg:grid-cols-5">
          {PILLARS.map((p, i) => (
            <Reveal key={p.code} delay={i * 0.08}>
              <article className="bg-surface border-rule-strong group relative h-full overflow-hidden border p-7 md:p-9">
                <div className="from-flare/8 absolute inset-x-0 top-0 h-px bg-gradient-to-r via-transparent to-transparent" />
                <div className="label text-flare flex items-center justify-between">
                  <span>{p.code}</span>
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
