import Navigation from "@/components/Navigation";
import TravelGallery from "@/components/TravelGallery";
import Footer from "@/components/Footer";

export default function Travels() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <TravelGallery />
      </main>
      <Footer />
    </div>
  );
}