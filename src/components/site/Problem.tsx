import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const PAINS = [
  {
    code: "01",
    title: "WhatsApp roulette",
    body: "Your go-to gaffer is on another job. So you're DM-ing strangers at midnight, hoping for a screenshot of their reel.",
  },
  {
    code: "02",
    title: "Last-minute scrambles",
    body: "Pre-light is in 36 hours. Your sound recordist just dropped. There is no back-up — just panic and a rate hike.",
  },
  {
    code: "03",
    title: "Unverified profiles",
    body: "A name on LinkedIn isn't a credit. A nice portfolio isn't a reference. You find out who someone really is on day one.",
  },
  {
    code: "04",
    title: "Tools everywhere",
    body: "Job boards, rental sites, Insta DMs, three group chats and a half-finished spreadsheet. Nothing talks to anything.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="relative py-28 md:py-40">
      <Container>
        <SectionLabel index="02" title="THE PROBLEM" meta="EXT. SET — DAY" />

        <div className="grid grid-cols-1 gap-10 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-6xl lg:text-7xl">
                The way crew gets <br />
                <span className="italic">hired</span> is broken.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:pt-6">
            <Reveal delay={0.1}>
              <p className="text-mute max-w-xl text-lg leading-relaxed md:text-xl">
                Production runs on group chats and gut feel. That stops working
                the moment you scale, travel, or need someone you&apos;ve never
                worked with before.
              </p>
              <p className="text-dim mt-6 max-w-xl text-base leading-relaxed">
                The talent is out there. The kit is out there. The trust is
                trapped in a hundred private threads.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Pain grid */}
        <div className="border-rule mt-16 grid grid-cols-1 border-t md:mt-24 md:grid-cols-2 lg:grid-cols-4">
          {PAINS.map((p, i) => (
            <Reveal key={p.code} delay={i * 0.06}>
              <article
                className={`border-rule p-6 md:p-8 lg:min-h-[260px] ${
                  i !== 0 ? "border-t md:border-t-0 md:border-l" : ""
                } ${
                  i === 1 ? "md:border-t-0" : ""
                } ${i >= 2 ? "border-t lg:border-t-0 lg:border-l" : ""}`}
              >
                <div className="label text-flare flex items-center justify-between">
                  <span>{p.code} / PAIN</span>
                  <span className="text-dim">○</span>
                </div>
                <h3 className="serif text-ink mt-6 text-2xl md:text-[28px]">
                  {p.title}
                </h3>
                <p className="text-mute mt-3 text-[15px] leading-relaxed">
                  {p.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
