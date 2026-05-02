import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const STEPS = [
  {
    n: "01",
    title: "Build your profile",
    body: "Credits, kit, day rates, availability — pulled from work you've already done. Five minutes, not an afternoon.",
    aside: "AVG. 4 MIN",
  },
  {
    n: "02",
    title: "Get vouched for",
    body: "Invite the people you've actually worked with. Their vouches are the foundation of your trust.",
    aside: "PEER-VERIFIED",
  },
  {
    n: "03",
    title: "Find or get hired",
    body: "Browse, post a call, or get matched. Book direct. No fees per message. Move on with the day.",
    aside: "DIRECT BOOKING",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-28 md:py-40">
      <Container>
        <SectionLabel index="05" title="HOW IT WORKS" meta="THREE STEPS" />

        <div className="grid grid-cols-1 gap-10 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-6xl lg:text-7xl">
                Three steps. <br />
                <span className="italic">No paperwork.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <Reveal delay={0.1}>
              <p className="text-mute max-w-md text-lg leading-relaxed">
                Designed for someone who&apos;s walking to set, on a phone, with
                fifteen minutes between scenes.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="border-rule mt-16 grid grid-cols-1 border-t md:mt-24 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div
                className={`relative p-7 md:p-10 ${
                  i !== 0 ? "border-rule border-t md:border-t-0 md:border-l" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="serif text-flare text-7xl leading-none md:text-8xl">
                    {s.n}
                  </span>
                  <span className="label text-mute pt-3">{s.aside}</span>
                </div>
                <h3 className="serif text-ink mt-8 text-3xl md:text-4xl">
                  {s.title}
                </h3>
                <p className="text-mute mt-4 max-w-sm text-[15px] leading-relaxed">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
