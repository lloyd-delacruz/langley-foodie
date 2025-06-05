import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sand to-accent/30"
    >
      {/* Tropical background elements */}
      <div className="absolute inset-0 leaf-decoration opacity-30"></div>
      
      {/* Floating leaf decorations */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 rounded-full opacity-20"
        style={{ backgroundColor: "hsl(var(--secondary))" }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-12 h-12 rounded-full opacity-20"
        style={{ backgroundColor: "hsl(var(--primary))" }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-20 h-20 rounded-full opacity-20"
        style={{ backgroundColor: "hsl(var(--accent))" }}
        animate={{
          y: [0, -8, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Blogger Photo */}
          <div className="mb-8 flex justify-center">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
                alt="Langley - Food & Travel Blogger"
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover shadow-2xl border-4 border-white"
              />
              <motion.div
                className="absolute -top-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: "hsl(var(--primary))" }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-white text-lg">✨</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Title and Description */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span
              className="font-script text-5xl sm:text-6xl lg:text-7xl block mb-2"
              style={{ color: "hsl(var(--primary))" }}
            >
              Langley
            </span>
            Foodie Travels
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join me on a delicious journey through{" "}
            <span className="font-medium" style={{ color: "hsl(var(--primary))" }}>
              family-friendly eats
            </span>
            ,{" "}
            <span className="font-medium" style={{ color: "hsl(var(--secondary))" }}>
              tropical adventures
            </span>
            , and the beautiful chaos of{" "}
            <span className="font-medium" style={{ color: "hsl(var(--coral))" }}>
              mom life
            </span>
            .
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 rounded-full font-medium text-lg text-white shadow-lg transition-all duration-300"
              style={{ backgroundColor: "hsl(var(--primary))" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector("#langley-bites");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              🍽️ Explore Langley Bites
            </motion.button>
            <motion.button
              className="border-2 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
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
              onClick={() => {
                const element = document.querySelector("#travels");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              🗺️ View Travel Stories
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
