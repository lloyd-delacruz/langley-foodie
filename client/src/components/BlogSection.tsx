import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const categories = ["All", "Food", "Travel", "Parenting", "Reels"];

const blogPosts = [
  {
    id: 1,
    title: "The Best Smoothie Bowls in Langley",
    excerpt: "After trying every smoothie bowl in town, I'm sharing my top picks for the most Instagram-worthy and delicious...",
    category: "Food",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    color: "primary",
  },
  {
    id: 2,
    title: "Family Paradise: Our Maui Adventure",
    excerpt: "From snorkeling with sea turtles to the best shaved ice on the island, here's everything you need to know...",
    category: "Travel",
    date: "March 12, 2024",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    color: "secondary",
  },
  {
    id: 3,
    title: "Cooking with Toddlers: Chaos & Joy",
    excerpt: "Yes, there will be flour everywhere. No, it won't look Pinterest-perfect. But here's why it's worth it...",
    category: "Parenting",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    color: "coral",
  },
  {
    id: 4,
    title: "Pizza Night: Hidden Gems Review",
    excerpt: "Forget the chain restaurants! These local pizzerias are serving up slices that will change your Friday night...",
    category: "Food",
    date: "March 8, 2024",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    color: "primary",
  },
  {
    id: 5,
    title: "Beach Day Essentials for Families",
    excerpt: "After countless beach trips, I've perfected the art of family beach days. Here's my tried-and-true packing list...",
    category: "Travel",
    date: "March 5, 2024",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    color: "secondary",
  },
  {
    id: 6,
    title: "Behind the Scenes: Creating Food Reels",
    excerpt: "Ever wondered how those perfect food videos come together? Here's my honest take on creating content...",
    category: "Reels",
    date: "March 3, 2024",
    image: "https://images.unsplash.com/photo-1493804714600-6edb1cd93080?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    color: "accent",
  },
];

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
            Latest Stories
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Fresh takes on food, travel, and the beautiful mess of family life
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "text-white shadow-lg"
                  : "bg-gray-100 text-foreground hover:bg-gray-200"
              }`}
              style={{
                backgroundColor: activeCategory === category ? "hsl(var(--primary))" : undefined,
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer transform transition-all duration-300 hover:scale-105 bg-cream overflow-hidden shadow-lg hover:shadow-2xl border-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: `hsl(var(--${post.color}))` }}
                    >
                      {post.category}
                    </span>
                    <span className="text-foreground/60 text-sm ml-3">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="text-foreground/70 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div
                    className="flex items-center font-medium transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: `hsl(var(--${post.color}))` }}
                  >
                    <span>Read More</span>
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
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full font-medium text-lg text-white shadow-lg transition-all duration-300"
            style={{ backgroundColor: "hsl(var(--secondary))" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ➕ Load More Stories
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
