import { Container } from "./Container";
import { EmailCapture } from "./EmailCapture";
import { Reveal } from "./Reveal";

const VIDEO_SRC = "/hero-v3.mp4";
const VIDEO_POSTER = "";

export function HeroV3() {
  return (
    <section
      id="top"
      className="relative min-h-[88vh] overflow-hidden"
    >
      {/* ── Video background ── */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={VIDEO_POSTER}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* ── Warm paper scrim — heavy on the left where text sits, fades right ── */}
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(242,235,221,0.92)_0%,rgba(242,235,221,0.75)_45%,rgba(242,235,221,0.30)_100%)]" />

      {/* ── Secondary scrim — darkens bottom edge so text always readable ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(242,235,221,0.80)_0%,transparent_40%)]" />

      {/* ── Grain texture ── */}
      <div className="grain pointer-events-none absolute inset-0" />

      {/* ── Light orb sweep ── */}
      <div className="animate-hero-sweep pointer-events-none absolute inset-0 overflow-hidden">
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "-45%",
            width: "55%",
            aspectRatio: "1",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(251,247,238,0.38) 0%, rgba(251,247,238,0.18) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* ── REC indicator ── */}
      <div className="absolute top-24 right-9 z-10 flex items-center gap-2">
        <span className="animate-rec bg-rec h-2 w-2 rounded-full" />
        <span className="label text-[rgba(35,32,26,0.55)] text-[13px] tracking-[0.16em]">REC</span>
      </div>

      {/* ── Content ── */}
      <Container className="relative z-10 pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-3xl">
          <Reveal>
            <p className="label text-flare mb-6">
              ● CREW · KIT · SPACES · FILM &amp; TV
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="serif text-ink text-[52px] sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[116px]">
              Your Scene.{" "}
              <span className="relative inline-block">
                Your Circle.
                <span className="bg-flare absolute right-0 -bottom-1 left-0 h-px md:-bottom-2 md:h-[2px]" />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-mute mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
              The trusted network for finding, verifying and booking crew, kit
              and spaces — built by people who actually work in production.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10">
              <EmailCapture variant="hero" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
