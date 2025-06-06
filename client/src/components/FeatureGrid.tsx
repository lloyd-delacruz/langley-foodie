import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

const features = [
  {
    id: "langley-bites",
    href: "/langley-bites",
    title: "Langley Bites",
    subtitle: "Restaurant reviews",
    description: "Honest reviews of Langley's best eats, from hidden gems to family favorites that won't break the bank.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    icon: "🍽️",
    color: "primary",
    gradient: "from-primary/10 to-primary/5",
  },
  {
    id: "tropical-travels",
    href: "/travels",
    title: "Tropical Travels",
    subtitle: "Highlighting my family-friendly trips",
    description: "Adventure awaits! Discover amazing destinations that are perfect for families, complete with kid-friendly activities.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    icon: "✈️",
    color: "secondary",
    gradient: "from-secondary/10 to-secondary/5",
  },
  {
    id: "mom-life-eats",
    href: "/mom-life",
    title: "Mom Life Eats",
    subtitle: "Kid-friendly food and experiences",
    description: "Real talk about feeding families, quick meal solutions, and creating food memories with little ones.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    icon: "❤️",
    color: "coral",
    gradient: "from-coral/10 to-coral/5",
  },
  {
    id: "reel-roundups",
    href: "/reels",
    title: "Reel Roundups",
    subtitle: "Focusing on my Instagram Reels",
    description: "Behind-the-scenes moments, quick food tips, and travel highlights in bite-sized video content.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    icon: "📱",
    color: "accent",
    gradient: "from-accent/10 to-accent/5",
  },
];

export default function FeatureGrid() {
  const handleFeatureClick = (id: string) => {
    const element = document.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
            Discover My World
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            From mouth-watering restaurant reviews to family adventures around the globe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 bg-gradient-to-br ${feature.gradient} p-8 shadow-lg hover:shadow-2xl border-0`}
                onClick={() => handleFeatureClick(feature.id)}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex items-center mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white"
                    style={{
                      backgroundColor: `hsl(var(--${feature.color}))`,
                    }}
                  >
                    <span className="text-lg">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/60">{feature.subtitle}</p>
                  </div>
                </div>
                <p className="text-foreground/70 mb-4">{feature.description}</p>
                <div
                  className="flex items-center font-medium transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: `hsl(var(--${feature.color}))` }}
                >
                  <span>Explore More</span>
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
