import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const QUOTES = [
  {
    quote:
      "It's the first thing I've seen that feels like it was built by someone who's actually been on a set at 5am.",
    name: "Asha P.",
    role: "DOP · London",
    project: "Currently shooting feature, indie",
  },
  {
    quote:
      "Most of my year's bookings come from three WhatsApp groups. KitFolk is the version of that I've been waiting for.",
    name: "Marc R.",
    role: "Producer · Bristol",
    project: "Documentary & branded",
  },
  {
    quote:
      "If trust scores work the way they're describing, this changes how I crew up films.",
    name: "Daniel O.",
    role: "1st AD · Berlin",
    project: "Long-form drama",
  },
];

export function SocialProof() {
  return (
    <section id="proof" className="relative py-28 md:py-40">
      <Container>
        <SectionLabel index="08" title="FROM THE FIELD" meta="EARLY ACCESS · UK / EU" />

        <div className="grid grid-cols-1 gap-10 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-6xl lg:text-7xl">
                Built by people <br />
                in <span className="italic">production.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <Reveal delay={0.1}>
              <p className="text-mute max-w-md text-lg leading-relaxed">
                We&apos;ve been talking to crew, producers and kit owners since
                day one. Here&apos;s what came back.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="border-rule mt-16 grid grid-cols-1 border-t md:mt-20 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08}>
              <figure
                className={`flex h-full flex-col p-7 md:p-10 ${
                  i !== 0 ? "border-rule border-t md:border-t-0 md:border-l" : ""
                }`}
              >
                <span className="serif text-flare/40 -mb-6 text-7xl leading-none">
                  &ldquo;
                </span>
                <blockquote className="serif text-ink text-2xl leading-snug md:text-[28px]">
                  {q.quote}
                </blockquote>
                <figcaption className="border-rule mt-auto border-t pt-5">
                  <p className="text-bone tracking-tight">{q.name}</p>
                  <p className="label text-mute mt-1">{q.role}</p>
                  <p className="label text-dim mt-1">{q.project}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Logo strip placeholder */}
        <Reveal delay={0.1}>
          <div className="border-rule mt-20 grid grid-cols-2 items-center gap-px border-t md:grid-cols-6">
            {[
              "NORTHWIND",
              "FRAME · 24",
              "GOLDEN HOUR",
              "PARALLAX",
              "DAYLIGHT CO.",
              "RIGSET",
            ].map((name) => (
              <div
                key={name}
                className="border-rule serif text-mute hover:text-bone flex items-center justify-center border-r border-b py-8 text-xl tracking-tight transition-colors last:border-r-0 md:border-b-0"
              >
                {name}
              </div>
            ))}
          </div>
          <p className="label text-dim mt-5 text-center md:text-left">
            ● PARTNER PRODUCTION COMPANIES — EARLY ACCESS COHORT
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
