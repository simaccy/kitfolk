import { CTA } from "@/components/site/CTA";
import { Features } from "@/components/site/Features";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { SceneCircles } from "@/components/site/SceneCircles";
import { Marquee } from "@/components/site/Marquee";
import { Problem } from "@/components/site/Problem";
import { SocialProof } from "@/components/site/SocialProof";
import { Solution } from "@/components/site/Solution";
import { TrustSystem } from "@/components/site/TrustSystem";
import { WhyNow } from "@/components/site/WhyNow";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-bg text-ink relative">
        <Hero />
        <Marquee />
        <Problem />
        <Solution />
        <TrustSystem />
        <HowItWorks />
        <Features />
        <SceneCircles />
        <SocialProof />
        <WhyNow />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
