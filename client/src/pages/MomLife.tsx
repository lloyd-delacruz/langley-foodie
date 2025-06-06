import Navigation from "@/components/Navigation";
import MomLifeSection from "@/components/MomLifeSection";
import Footer from "@/components/Footer";

export default function MomLife() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <MomLifeSection />
      </main>
      <Footer />
    </div>
  );
}