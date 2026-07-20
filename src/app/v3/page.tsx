import { AppInAction } from "@/components/site/AppInAction";
import { CTA } from "@/components/site/CTA";
import { Features } from "@/components/site/Features";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { HeroV3 } from "@/components/site/HeroV3";
import { SceneCircles } from "@/components/site/SceneCircles";
import { Problem } from "@/components/site/Problem";
import { SiteShell } from "@/components/site/SiteShell";
import { Solution } from "@/components/site/Solution";
import { TrustSystem } from "@/components/site/TrustSystem";

export const metadata = {
  title: "SceneCircle — warm",
};

export default function V3Home() {
  return (
    <div data-theme="warm" className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      <SiteShell>
        <Header hideThemeToggle={true} />
        <main className="bg-[var(--color-bg)] text-[var(--color-ink)] relative">
          <HeroV3 />
          <Problem />
          <Solution />
          <SceneCircles />
          <TrustSystem />
          <AppInAction />
          <Features />
<CTA />
        </main>
        <Footer />
      </SiteShell>
    </div>
  );
}
