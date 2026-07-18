import Header from "@/components/layout/Header";
import MainSection from "@/components/layout/MainSection";
import ShowcaseSection from "@/components/layout/ShowcaseSection";
import SocialProofStats from "@/components/layout/SocialProofStats";
import ValuePropositions from "@/components/layout/ValuePropositions";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-12 bg-accent">
        <MainSection />
        <ValuePropositions />
        <ShowcaseSection />
        <SocialProofStats />
      </main>
    </>
  );
}
