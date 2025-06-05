import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import AboutSection from "@/components/AboutSection";
import LangleyBitesSection from "@/components/LangleyBitesSection";
import MomLifeSection from "@/components/MomLifeSection";
import BlogSection from "@/components/BlogSection";
import TravelGallery from "@/components/TravelGallery";
import ReelsSection from "@/components/ReelsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeatureGrid />
        <AboutSection />
        <LangleyBitesSection />
        <MomLifeSection />
        <BlogSection />
        <TravelGallery />
        <ReelsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
