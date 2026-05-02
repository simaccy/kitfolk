import { Container } from "./Container";
import { EmailCapture } from "./EmailCapture";
import { Reveal } from "./Reveal";

const ROLES = [
  { role: "DOP", name: "Asha P.", city: "London", status: "AVAILABLE", score: "94" },
  { role: "GAFFER", name: "Marc R.", city: "Bristol", status: "ON SET", score: "91" },
  { role: "SOUND MIX", name: "Lena K.", city: "Berlin", status: "AVAILABLE", score: "88" },
  { role: "1ST AD", name: "Daniel O.", city: "Manchester", status: "VOUCHED", score: "96" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Background composition */}
      <div className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(255,106,61,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_30%,rgba(212,200,168,0.07),transparent_45%)]" />
        <div className="vignette absolute inset-0" />
        {/* Film perforation rails */}
        <div className="border-rule absolute inset-y-0 left-0 hidden w-10 border-r md:block">
          <div className="flex h-full flex-col items-center justify-around py-10">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="bg-rule-strong block h-3 w-3 rounded-[2px]"
              />
            ))}
          </div>
        </div>
        <div className="border-rule absolute inset-y-0 right-0 hidden w-10 border-l md:block">
          <div className="flex h-full flex-col items-center justify-around py-10">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="bg-rule-strong block h-3 w-3 rounded-[2px]"
              />
            ))}
          </div>
        </div>
      </div>

      <Container className="relative">
        {/* Slate / call sheet header */}
        <div className="border-rule label text-mute flex flex-wrap items-center justify-between gap-y-2 border-b pb-3">
          <span className="text-bone">
            SCENE 01 <span className="text-dim mx-2">/</span> INTRO
          </span>
          <span className="hidden md:inline">ROLL A · TAKE 01 · 24FPS</span>
          <span className="text-rec">
            <span className="animate-rec">●</span> REC 00:00:21:14
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 pt-12 md:pt-20 lg:grid-cols-12 lg:gap-12">
          {/* Headline */}
          <div className="lg:col-span-8">
            <Reveal>
              <p className="label text-flare mb-6">
                ● THE TRUSTED NETWORK FOR FILM &amp; TV
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="serif text-ink text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[104px]">
                Production moves fast.
                <br />
                <span className="text-bone italic">Trust</span> needs to move{" "}
                <span className="relative inline-block">
                  faster.
                  <span className="bg-flare absolute right-0 -bottom-1 left-0 h-px md:-bottom-2 md:h-[2px]" />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-mute mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">
                KitFolk is the trusted network for finding, verifying and
                booking crew and kit. Built by people who actually work in
                production — not a marketplace, not a directory, not another
                group chat.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10">
                <EmailCapture variant="hero" />
              </div>
            </Reveal>
          </div>

          {/* Side: viewfinder card */}
          <div className="lg:col-span-4">
            <Reveal delay={0.3}>
              <div className="border-rule-strong bg-surface relative">
                <div className="border-rule-strong label text-mute flex items-center justify-between border-b px-4 py-3">
                  <span>● LIVE · UK / EU</span>
                  <span className="text-bone">04 ONLINE</span>
                </div>
                <ul className="divide-rule divide-y">
                  {ROLES.map((r) => (
                    <li
                      key={r.role + r.name}
                      className="grid grid-cols-12 items-center gap-3 px-4 py-4"
                    >
                      <span className="label text-bone col-span-3">
                        {r.role}
                      </span>
                      <span className="col-span-5 text-[15px] tracking-tight">
                        {r.name}
                        <span className="text-dim mono ml-2 text-[11px]">
                          · {r.city}
                        </span>
                      </span>
                      <span
                        className={`label col-span-2 ${
                          r.status === "AVAILABLE"
                            ? "text-go"
                            : r.status === "ON SET"
                              ? "text-flare"
                              : "text-bone"
                        }`}
                      >
                        {r.status}
                      </span>
                      <span className="mono text-mute col-span-2 text-right text-[12px]">
                        TS {r.score}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-rule-strong label text-dim flex items-center justify-between border-t px-4 py-3">
                  <span>NETWORK FEED</span>
                  <span>+ 2,184 verified</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
