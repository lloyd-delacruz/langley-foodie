import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-accent/10 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700"
              alt="Langley with her family"
              className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            className="lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-6">
              Hey there, I'm{" "}
              <span className="font-script" style={{ color: "hsl(var(--primary))" }}>
                Langley!
              </span>
            </h2>

            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
              <p>
                Welcome to my little corner of the internet! I'm a mom, foodie, and travel
                enthusiast based in beautiful{" "}
                <span className="font-medium" style={{ color: "hsl(var(--secondary))" }}>
                  British Columbia
                </span>
                . What started as a way to document our family adventures has grown into a
                passion project that celebrates the joy of good food and meaningful travel.
              </p>

              <p>
                My mission is simple: to help busy families discover amazing eats and create{" "}
                <span className="font-medium" style={{ color: "hsl(var(--primary))" }}>
                  unforgettable memories
                </span>{" "}
                without the overwhelm. Whether it's finding the perfect kid-friendly restaurant
                or planning your next tropical getaway, I'm here to share honest reviews and
                real-world tips that actually work.
              </p>

              <p>
                When I'm not exploring new restaurants or planning our next adventure, you'll
                find me in the kitchen experimenting with{" "}
                <span className="font-medium" style={{ color: "hsl(var(--coral))" }}>
                  family-friendly recipes
                </span>{" "}
                or capturing those everyday moments that make mom life so beautifully chaotic.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-primary">🍽️</span>
                <span className="text-sm font-medium">Food Enthusiast</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-secondary">✈️</span>
                <span className="text-sm font-medium">Travel Lover</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <span style={{ color: "hsl(var(--coral))" }}>❤️</span>
                <span className="text-sm font-medium">Mom of 2</span>
              </div>
            </div>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                className="px-6 py-3 rounded-full font-medium text-white transition-all duration-300"
                style={{ backgroundColor: "hsl(var(--primary))" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.querySelector("#contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                📧 Let's Connect
              </motion.button>
              <motion.button
                className="border-2 px-6 py-3 rounded-full font-medium transition-all duration-300"
                style={{
                  borderColor: "hsl(var(--secondary))",
                  color: "hsl(var(--secondary))",
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "hsl(var(--secondary))",
                  color: "white",
                }}
                whileTap={{ scale: 0.95 }}
              >
                📱 Follow My Journey
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
