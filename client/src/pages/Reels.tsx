import Navigation from "@/components/Navigation";
import ReelsSection from "@/components/ReelsSection";
import Footer from "@/components/Footer";

export default function Reels() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <ReelsSection />
      </main>
      <Footer />
    </div>
  );
}