import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const reelCategories = ["All Reels", "Food Reviews", "Travel Tips", "Mom Life", "Behind Scenes"];

const reels = [
  {
    id: 1,
    title: "Best Brunch Spots in Langley",
    views: "12.5K views",
    category: "Food Reviews",
    thumbnail: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=500",
  },
  {
    id: 2,
    title: "Packing Hacks for Family Travel",
    views: "8.2K views",
    category: "Travel Tips",
    thumbnail: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=500",
  },
  {
    id: 3,
    title: "15-Minute Dinner Solutions",
    views: "15.7K views",
    category: "Mom Life",
    thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=500",
  },
  {
    id: 4,
    title: "Behind the Reel: Food Styling",
    views: "6.9K views",
    category: "Behind Scenes",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=500",
  },
  {
    id: 5,
    title: "Beach Day Must-Haves",
    views: "11.3K views",
    category: "Travel Tips",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=500",
  },
  {
    id: 6,
    title: "Best Coffee Shops in Town",
    views: "9.8K views",
    category: "Food Reviews",
    thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=500",
  },
];

export default function ReelsSection() {
  const [activeCategory, setActiveCategory] = useState("All Reels");

  const filteredReels = activeCategory === "All Reels"
    ? reels
    : reels.filter(reel => reel.category === activeCategory);

  return (
    <section id="reels" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
            📱 Latest Reels
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Quick bites of food adventures, travel tips, and mom life moments
          </p>
        </motion.div>

        {/* Reel Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {reelCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "text-white shadow-lg scale-105"
                  : "bg-gray-100 text-foreground hover:bg-gray-200"
              }`}
              style={{
                background: activeCategory === category
                  ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))"
                  : undefined,
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReels.map((reel, index) => (
            <motion.div
              key={reel.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl aspect-[9/16]">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover"
                />

                {/* Play overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="text-primary text-xl ml-1" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Reel info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold mb-1">{reel.title}</h3>
                  <p className="text-sm opacity-80">{reel.views}</p>
                </div>

                {/* Instagram icon */}
                <div className="absolute top-4 right-4">
                  <span className="text-white text-2xl">📱</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More on Instagram */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="https://instagram.com/langleyfoodietravels"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 rounded-full font-medium text-lg text-white shadow-lg transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-3 text-xl">📱</span>
            Follow for More Reels
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
