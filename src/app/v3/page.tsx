import { AppInAction } from "@/components/site/AppInAction";
import { CTA } from "@/components/site/CTA";
import { Features } from "@/components/site/Features";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { SceneCircles } from "@/components/site/SceneCircles";
import { Problem } from "@/components/site/Problem";
import { SiteShell } from "@/components/site/SiteShell";
import { SocialProof } from "@/components/site/SocialProof";
import { Solution } from "@/components/site/Solution";
import { TrustSystem } from "@/components/site/TrustSystem";

export const metadata = {
  title: "SceneCircle — warm",
};

export default function V3Home() {
  return (
    <div data-theme="warm" className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      <SiteShell>
        <Header />
        <main className="bg-[var(--color-bg)] text-[var(--color-ink)] relative">
          <Hero showFilmRails={false} />
          <Problem />
          <Solution />
          <TrustSystem />
          <AppInAction />
          <Features />
          <SceneCircles />
          <SocialProof />
          <CTA />
        </main>
        <Footer />
      </SiteShell>
    </div>
  );
}
