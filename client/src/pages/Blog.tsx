import Navigation from "@/components/Navigation";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

export default function Blog() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}