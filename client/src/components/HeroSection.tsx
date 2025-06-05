import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sand via-cream to-accent/20"
    >
      {/* Ocean wave background */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-secondary/10 to-transparent">
        <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1200 120" fill="none">
          <path d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z" fill="hsl(var(--secondary))" opacity="0.1"/>
          <path d="M0,80 C300,40 900,80 1200,40 L1200,120 L0,120 Z" fill="hsl(var(--primary))" opacity="0.1"/>
        </svg>
      </div>

      {/* Tropical leaf patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute top-10 left-10 w-24 h-24 text-secondary" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C30 30, 30 70, 50 90 C70 70, 70 30, 50 10 Z"/>
        </svg>
        <svg className="absolute top-20 right-16 w-20 h-20 text-primary rotate-45" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C30 30, 30 70, 50 90 C70 70, 70 30, 50 10 Z"/>
        </svg>
        <svg className="absolute bottom-32 left-1/4 w-16 h-16 text-secondary rotate-12" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C30 30, 30 70, 50 90 C70 70, 70 30, 50 10 Z"/>
        </svg>
        <svg className="absolute top-1/3 right-1/4 w-14 h-14 text-accent -rotate-12" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C30 30, 30 70, 50 90 C70 70, 70 30, 50 10 Z"/>
        </svg>
      </div>

      {/* Banana plant silhouettes */}
      <div className="absolute top-0 left-0 w-32 h-full opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 200" fill="none">
          <path d="M20 200 Q25 150, 30 100 Q35 50, 40 0" stroke="hsl(var(--secondary))" strokeWidth="8"/>
          <path d="M40 20 Q50 15, 60 25 Q65 35, 55 45" fill="hsl(var(--secondary))"/>
          <path d="M35 40 Q45 35, 55 45 Q60 55, 50 65" fill="hsl(var(--secondary))"/>
          <path d="M30 60 Q40 55, 50 65 Q55 75, 45 85" fill="hsl(var(--secondary))"/>
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-28 h-full opacity-5 transform scale-x-[-1]">
        <svg className="w-full h-full" viewBox="0 0 100 200" fill="none">
          <path d="M20 200 Q25 150, 30 100 Q35 50, 40 0" stroke="hsl(var(--primary))" strokeWidth="6"/>
          <path d="M40 30 Q50 25, 60 35 Q65 45, 55 55" fill="hsl(var(--primary))"/>
          <path d="M35 50 Q45 45, 55 55 Q60 65, 50 75" fill="hsl(var(--primary))"/>
        </svg>
      </div>
      
      {/* Floating tropical elements */}
      <motion.div
        className="absolute top-20 left-1/4 w-8 h-8 opacity-20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🌴
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-1/3 w-6 h-6 opacity-30"
        animate={{
          y: [0, -12, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        🥥
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-1/5 w-6 h-6 opacity-25"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        🍌
      </motion.div>
      <motion.div
        className="absolute top-2/3 right-1/5 w-5 h-5 opacity-20"
        animate={{
          y: [0, -8, 0],
          rotate: [0, -12, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        🌺
      </motion.div>

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
                src="/attached_assets/langley_foodie.jpg"
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
