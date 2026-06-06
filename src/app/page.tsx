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
import { WhyNow } from "@/components/site/WhyNow";

export default function Home() {
  return (
    <SiteShell>
      <Header />
      <main className="bg-bg text-ink relative">
        <Hero />
        <Problem />
        <Solution />
        <TrustSystem />
        <AppInAction />
        <Features />
        <SceneCircles />
        <SocialProof />
        <WhyNow />
        <CTA />
      </main>
      <Footer />
    </SiteShell>
  );
}
