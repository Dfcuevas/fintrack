import Header from "@/components/layout/Header";
import MainSection from "@/components/layout/MainSection";
import ValuePropositions from "@/components/layout/ValuePropositions";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto bg-accent">
        <MainSection />
        <ValuePropositions />
      </main>
    </>
  );
}
