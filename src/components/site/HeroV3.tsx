import { Container } from "./Container";
import { EmailCapture } from "./EmailCapture";
import { Reveal } from "./Reveal";

const ROLES = [
  { role: "DOP",    name: "Alex M.",     city: "London",     status: "AVAILABLE" },
  { role: "GAFFER", name: "Dan H.",      city: "Bristol",    status: "ON SET"    },
  { role: "SPACE",  name: "Studio, SE1", city: "London",     status: "AVAILABLE" },
  { role: "1ST AD", name: "Simon M.",    city: "Manchester", status: "VOUCHED"   },
];

export function HeroV3() {
  return (
    <section
      id="top"
      className="grain relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 opacity-40" />

        {/* Warm radial glow — rust tint from upper-right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_10%,rgba(188,90,46,0.09),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(110,122,94,0.07),transparent_50%)]" />

        {/* Camera operator figure — slow drift */}
        <div className="animate-hero-drift absolute inset-0">
          <svg
            viewBox="0 0 1440 720"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {/* ── Main figure: DOP behind a cinema camera ── */}
            <g fill="rgba(35,32,26,0.09)">
              {/* Head */}
              <ellipse cx="1020" cy="172" rx="34" ry="38" />
              {/* Body / legs */}
              <path d="M968 720 C968 470 990 408 1020 408 C1050 408 1074 470 1074 720 Z" />
              {/* Right arm — reaching forward to camera */}
              <path d="M1005 310 C975 295 930 278 892 270 L896 248 C940 256 984 272 1016 288 Z" />
              {/* Left arm — braced against camera body */}
              <path d="M1040 320 C1058 308 1072 295 1075 280 L1058 272 C1056 284 1045 296 1028 308 Z" />

              {/* ── Cinema camera on shoulder rig ── */}
              {/* Main camera body */}
              <rect x="720" y="232" width="174" height="98" rx="12" />
              {/* Grip / handle */}
              <rect x="700" y="250" width="38" height="52" rx="8" />
              {/* Top plate / handle */}
              <rect x="760" y="210" width="88" height="26" rx="6" />
              {/* Matte box hood */}
              <path d="M608 218 L720 232 L720 330 L608 342 Z" opacity="0.7" />
              {/* Follow focus / lens support rod */}
              <rect x="688" y="308" width="208" height="8" rx="4" />
              <rect x="688" y="322" width="208" height="8" rx="4" />
              {/* Monitor arm */}
              <rect x="892" y="220" width="8" height="52" rx="4" />
              <rect x="898" y="212" width="60" height="38" rx="6" />
            </g>

            {/* Lens — nested rings, slightly darker for depth */}
            <circle cx="664" cy="280" r="58" fill="rgba(35,32,26,0.11)" />
            <circle cx="664" cy="280" r="44" fill="rgba(35,32,26,0.10)" />
            <circle cx="664" cy="280" r="28" fill="rgba(35,32,26,0.08)" />
            <circle cx="664" cy="280" r="12" fill="rgba(35,32,26,0.06)" />

            {/* ── Second figure: background crew member ── */}
            <g fill="rgba(35,32,26,0.05)">
              <ellipse cx="240" cy="260" rx="24" ry="28" />
              <path d="M206 720 C206 500 220 448 240 448 C260 448 275 500 275 720 Z" />
              {/* Arm across body — looking at phone / call-sheet */}
              <path d="M228 345 C218 348 200 350 185 346 L184 330 C199 334 218 332 228 329 Z" />
              <rect x="170" y="316" width="32" height="40" rx="4" />
            </g>

            {/* ── Accent lines — rust, like cable or focus pull ── */}
            <g fill="none" stroke="rgba(188,90,46,0.30)" strokeWidth="2" strokeLinecap="round">
              {/* Cable from camera down to floor */}
              <path d="M780 330 q-10 60 -14 180 q-4 80 -2 210" />
              {/* Second cable */}
              <path d="M800 338 q12 80 10 220" />
              {/* Line from second figure */}
              <path d="M240 370 q4 80 6 200" />
            </g>

            {/* ── Subtle grid lines behind figure — film register feel ── */}
            <g stroke="rgba(35,32,26,0.03)" strokeWidth="1" fill="none">
              {[560, 620, 680, 740, 800, 860, 920, 980].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="720" />
              ))}
              {[160, 280, 400].map((y) => (
                <line key={y} x1="560" y1={y} x2="1100" y2={y} />
              ))}
            </g>
          </svg>
        </div>

        {/* Light sweep */}
        <div className="animate-hero-sweep absolute inset-0 overflow-hidden">
          <div
            className="absolute"
            style={{
              top: "-30%",
              left: "-40%",
              width: "38%",
              height: "160%",
              background:
                "linear-gradient(105deg, transparent, rgba(251,247,238,0.55), transparent)",
              transform: "rotate(8deg)",
            }}
          />
        </div>
      </div>

      <Container className="relative">
        {/* Slate header */}
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
                ● CREW · KIT · SPACES · FILM &amp; TV
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="serif text-ink text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[104px]">
                Your Scene.{" "}
                <span className="relative inline-block">
                  Your Circle.
                  <span className="bg-flare absolute right-0 -bottom-1 left-0 h-px md:-bottom-2 md:h-[2px]" />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-mute mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">
                SceneCircle is the trusted network for finding, verifying and
                booking crew, kit and spaces. Built by people who actually work
                in production — not a marketplace, not a directory, not another
                group chat.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10">
                <EmailCapture variant="hero" />
              </div>
            </Reveal>
          </div>

          {/* Network Feed widget */}
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
                      <span className="label text-bone col-span-3">{r.role}</span>
                      <span className="col-span-6 text-[15px] tracking-tight">
                        {r.name}
                        <span className="text-dim mono ml-2 text-[11px]">
                          · {r.city}
                        </span>
                      </span>
                      <span
                        className={`label col-span-3 text-right ${
                          r.status === "AVAILABLE"
                            ? "text-go"
                            : r.status === "ON SET"
                              ? "text-flare"
                              : "text-go"
                        }`}
                      >
                        {r.status}
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
