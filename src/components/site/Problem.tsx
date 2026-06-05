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
                The way crew gets <br />
                <span className="italic">hired</span> is broken.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:pt-6">
            <Reveal delay={0.1}>
              <p className="text-mute max-w-xl text-lg leading-relaxed md:text-xl">
                Production runs on group chats and gut feel. Your go-to gaffer
                is booked, pre-light is in 36 hours, and you&apos;re DM-ing
                strangers at midnight hoping their reel is real.
              </p>
              <p className="text-dim mt-6 max-w-xl text-base leading-relaxed">
                A LinkedIn name isn&apos;t a credit. A nice portfolio isn&apos;t
                a reference. And the answer isn&apos;t another job board, rental
                site, locations database, or half-finished spreadsheet. The
                talent is out there. The kit is out there. The spaces are out
                there. The trust is trapped in a hundred private threads.
              </p>
            </Reveal>
          </div>
        </div>

      </Container>
    </section>
  );
}
