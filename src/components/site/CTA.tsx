import { Container } from "./Container";
import { EmailCapture } from "./EmailCapture";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,106,61,0.18),transparent_60%)]" />
        <div className="vignette absolute inset-0" />
      </div>

      <Container className="relative">
        <SectionLabel index="10" title="EARLY ACCESS" meta="INVITE-BASED ROLLOUT" />

        <div className="grid grid-cols-1 gap-10 pt-12 md:pt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="serif text-ink text-5xl md:text-7xl lg:text-[96px]">
                Get on the list.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-mute mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
                Early access is curated. We&apos;re onboarding crew, production
                companies and kit owners in waves — region by region, role by
                role.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10">
                <EmailCapture variant="cta" withRole />
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="border-rule mt-12 grid grid-cols-3 border-t pt-6">
                {[
                  ["WAITLIST", "2,184"],
                  ["CITIES", "37"],
                  ["NEXT WAVE", "OPEN"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="label text-mute">{k}</p>
                    <p className="serif text-ink mt-2 text-3xl md:text-4xl">
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="border-rule-strong bg-surface relative h-full">
                <div className="border-rule-strong label text-mute flex items-center justify-between border-b px-5 py-3">
                  <span className="text-bone">CALL SHEET / INVITE</span>
                  <span>
                    <span className="text-rec animate-rec">●</span> CURATED
                  </span>
                </div>
                <div className="space-y-5 p-6 md:p-8">
                  <div className="border-rule grid grid-cols-3 gap-4 border-b pb-5">
                    <span className="label text-mute">PRODUCTION</span>
                    <span className="serif text-ink col-span-2 text-2xl">
                      KitFolk · v1
                    </span>
                  </div>
                  <div className="border-rule grid grid-cols-3 gap-4 border-b pb-5">
                    <span className="label text-mute">CALL TIME</span>
                    <span className="serif text-ink col-span-2 text-2xl">
                      Soon
                    </span>
                  </div>
                  <div className="border-rule grid grid-cols-3 gap-4 border-b pb-5">
                    <span className="label text-mute">LOCATION</span>
                    <span className="serif text-ink col-span-2 text-xl md:text-2xl">
                      UK · EU · expanding
                    </span>
                  </div>
                  <div className="border-rule grid grid-cols-3 gap-4 border-b pb-5">
                    <span className="label text-mute">ROLES</span>
                    <span className="text-ink col-span-2">
                      Crew · Production · Kit owners
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <span className="label text-mute">NOTES</span>
                    <span className="text-mute col-span-2 text-[15px] leading-relaxed">
                      Invitations roll out by region and role. We&apos;ll only
                      email when it&apos;s your turn.
                    </span>
                  </div>
                </div>
                <div className="border-rule-strong label text-dim flex items-center justify-between border-t px-5 py-3">
                  <span>v1.0</span>
                  <span>SIGNED · KITFOLK</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
