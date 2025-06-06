import Navigation from "@/components/Navigation";
import LangleyBitesSection from "@/components/LangleyBitesSection";
import Footer from "@/components/Footer";

export default function LangleyBites() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <LangleyBitesSection />
      </main>
      <Footer />
    </div>
  );
}