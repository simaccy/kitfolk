import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const REASONS = [
  {
    n: "01",
    title: "Shoots are smaller, faster, more international.",
    body: "A two-day commercial in three cities. A doc rig pulled together in 48 hours. The old way of crewing up can't keep up.",
  },
  {
    n: "02",
    title: "Freelancers are juggling three jobs at once.",
    body: "Every day spent in your inbox is a day off set. People need to find work and confirm work in the time it takes to drink a coffee.",
  },
  {
    n: "03",
    title: "Kit is more expensive — and sits idle most of the year.",
    body: "An owner with a serious package is essentially running a small business. They need real demand, not Instagram DMs.",
  },
  {
    n: "04",
    title: "Trust is harder than ever, and more valuable.",
    body: "AI-generated reels. Fake credits. Inflated rates. Reputation has to be portable, verifiable, and worth something.",
  },
];

export function WhyNow() {
  return (
    <section id="why-now" className="relative py-28 md:py-40">
      <Container>
        <SectionLabel index="09" title="WHY NOW" meta="THE WINDOW" />

        <div className="grid grid-cols-1 gap-10 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-6xl lg:text-7xl">
                Production has <br />
                changed. Hiring <br />
                <span className="italic">hasn&apos;t.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <ul className="border-rule mt-2 border-t md:mt-6">
              {REASONS.map((r, i) => (
                <Reveal key={r.n} delay={i * 0.05}>
                  <li className="border-rule grid grid-cols-12 gap-4 border-b py-7 md:py-8">
                    <div className="col-span-2">
                      <span className="serif text-flare text-4xl leading-none md:text-5xl">
                        {r.n}
                      </span>
                    </div>
                    <div className="col-span-10">
                      <h3 className="text-ink text-xl tracking-tight md:text-2xl">
                        {r.title}
                      </h3>
                      <p className="text-mute mt-2 text-[15px] leading-relaxed">
                        {r.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
