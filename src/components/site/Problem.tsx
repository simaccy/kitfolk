import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Problem() {
  return (
    <section id="problem" className="relative pt-28 pb-12 md:pt-40 md:pb-16">
      <Container>
        <SectionLabel index="02" title="THE PROBLEM" meta="EXT. SET - DAY" />

        <div className="grid grid-cols-1 gap-10 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-6xl lg:text-7xl">
                The way production finds people, kit and spaces is too{" "}
                <span className="italic">fragmented.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:pt-6">
            <Reveal delay={0.1}>
              <p className="text-mute max-w-xl text-lg leading-relaxed md:text-xl">
                Production runs on recommendations, favours, group chats and
                gut feel. The right person, kit or space is usually out there
                — but the trust is trapped in WhatsApp threads, Facebook
                groups, phonebooks, talent managers, cold DMs and old
                conversations.
              </p>
              <p className="text-dim mt-6 max-w-xl text-base leading-relaxed">
                SceneCircle brings that trust into one place, so production
                people can find answers, make connections and move faster
                without starting from zero every time.
              </p>
            </Reveal>
          </div>
        </div>

      </Container>
    </section>
  );
}
