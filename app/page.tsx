import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { SocialProofStats } from "@/components/sections/SocialProofStats";
import { ValuePropositions } from "@/components/sections/ValuePropositions";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-12 bg-accent">
        <HeroSection />
        <ValuePropositions />
        <ShowcaseSection />
        <SocialProofStats />
      </main>
      <Footer />
    </>
  );
}
