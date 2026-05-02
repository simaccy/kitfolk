import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-rule relative overflow-hidden border-t pt-20 pb-10">
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <p className="serif text-ink text-5xl tracking-tight md:text-6xl">
              KitFolk
            </p>
            <p className="text-mute mt-4 max-w-sm text-base leading-relaxed">
              The trusted network for crew, kit and production.
            </p>
            <p className="label text-dim mt-6">
              ● BUILT ON SET, NOT IN A SAAS DASHBOARD.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="label text-mute mb-4">Product</p>
            <ul className="space-y-2.5">
              {[
                ["Crew", "#solution"],
                ["Kit", "#solution"],
                ["Trust system", "#trust"],
                ["Kit Circles", "#circles"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a
                    href={h}
                    className="text-ink hover:text-flare text-[15px] transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label text-mute mb-4">Company</p>
            <ul className="space-y-2.5">
              {["About", "Careers", "Contact", "Press"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-ink hover:text-flare text-[15px] transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label text-mute mb-4">Stay close</p>
            <ul className="space-y-2.5">
              {[
                ["Early access", "#cta"],
                ["Newsletter", "#cta"],
                ["Instagram", "#"],
                ["LinkedIn", "#"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a
                    href={h}
                    className="text-ink hover:text-flare text-[15px] transition-colors"
                  >
                    {l} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Wordmark stretch */}
        <div className="mt-20 overflow-hidden">
          <p
            className="serif text-ink/[0.06] leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(80px, 22vw, 320px)" }}
          >
            KITFOLK
          </p>
        </div>

        <div className="border-rule mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <p className="label text-dim">
            © 2026 KITFOLK LTD · ALL RIGHTS RESERVED
          </p>
          <div className="label text-dim flex flex-wrap gap-6">
            <a href="#" className="hover:text-bone">
              PRIVACY
            </a>
            <a href="#" className="hover:text-bone">
              TERMS
            </a>
            <a href="#" className="hover:text-bone">
              COOKIES
            </a>
            <span>v1.0 · BUILD 0421</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
