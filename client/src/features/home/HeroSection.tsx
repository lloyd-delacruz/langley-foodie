import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-300 via-pink-300 via-purple-300 to-blue-400"
    >
      {/* Tropical ocean wave background */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-teal-400/40 to-transparent">
        <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1200 120" fill="none">
          <path d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z" fill="#06b6d4" opacity="0.4"/>
          <path d="M0,80 C300,40 900,80 1200,40 L1200,120 L0,120 Z" fill="#0891b2" opacity="0.3"/>
          <path d="M0,90 C300,50 900,90 1200,50 L1200,120 L0,120 Z" fill="#0e7490" opacity="0.2"/>
        </svg>
      </div>

      {/* Tropical leaf patterns */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute top-10 left-10 w-32 h-32 text-green-600" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C30 30, 30 70, 50 90 C70 70, 70 30, 50 10 Z"/>
        </svg>
        <svg className="absolute top-20 right-16 w-28 h-28 text-green-700 rotate-45" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C30 30, 30 70, 50 90 C70 70, 70 30, 50 10 Z"/>
        </svg>
        <svg className="absolute bottom-32 left-1/4 w-24 h-24 text-green-500 rotate-12" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C30 30, 30 70, 50 90 C70 70, 70 30, 50 10 Z"/>
        </svg>
        <svg className="absolute top-1/3 right-1/4 w-20 h-20 text-green-600 -rotate-12" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C30 30, 30 70, 50 90 C70 70, 70 30, 50 10 Z"/>
        </svg>
        <svg className="absolute bottom-20 right-10 w-26 h-26 text-green-500 rotate-45" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C30 30, 30 70, 50 90 C70 70, 70 30, 50 10 Z"/>
        </svg>
      </div>

      {/* Enhanced tropical palm tree silhouettes */}
      <div className="absolute top-0 left-0 w-40 h-full opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 200" fill="none">
          {/* Palm trunk */}
          <path d="M20 200 Q25 150, 30 100 Q35 50, 40 0" stroke="#4a5568" strokeWidth="8"/>
          {/* Palm fronds */}
          <path d="M40 20 Q50 15, 65 25 Q70 35, 55 45" fill="#2d3748"/>
          <path d="M35 40 Q45 35, 60 45 Q65 55, 50 65" fill="#2d3748"/>
          <path d="M30 60 Q40 55, 55 65 Q60 75, 45 85" fill="#2d3748"/>
          <path d="M25 80 Q35 75, 50 85 Q55 95, 40 105" fill="#2d3748"/>
          <path d="M45 20 Q35 15, 20 25 Q15 35, 30 45" fill="#2d3748"/>
          <path d="M50 40 Q40 35, 25 45 Q20 55, 35 65" fill="#2d3748"/>
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-36 h-full opacity-30 transform scale-x-[-1]">
        <svg className="w-full h-full" viewBox="0 0 100 200" fill="none">
          {/* Palm trunk */}
          <path d="M20 200 Q25 150, 30 100 Q35 50, 40 0" stroke="#4a5568" strokeWidth="6"/>
          {/* Palm fronds */}
          <path d="M40 30 Q50 25, 65 35 Q70 45, 55 55" fill="#2d3748"/>
          <path d="M35 50 Q45 45, 60 55 Q65 65, 50 75" fill="#2d3748"/>
          <path d="M30 70 Q40 65, 55 75 Q60 85, 45 95" fill="#2d3748"/>
          <path d="M45 30 Q35 25, 20 35 Q15 45, 30 55" fill="#2d3748"/>
        </svg>
      </div>
      
      {/* Additional tropical silhouettes */}
      <div className="absolute bottom-10 left-10 w-32 h-32 opacity-25">
        <svg viewBox="0 0 100 100" fill="none">
          {/* Coconut tree */}
          <path d="M50 90 Q52 70, 55 50 Q58 30, 60 10" stroke="#2d3748" strokeWidth="4"/>
          <circle cx="58" cy="15" r="3" fill="#2d3748"/>
          <circle cx="62" cy="12" r="2.5" fill="#2d3748"/>
          <circle cx="54" cy="12" r="2" fill="#2d3748"/>
          {/* Fronds */}
          <path d="M60 15 Q70 10, 80 20" stroke="#2d3748" strokeWidth="2"/>
          <path d="M60 15 Q70 20, 75 30" stroke="#2d3748" strokeWidth="2"/>
          <path d="M60 15 Q50 10, 40 20" stroke="#2d3748" strokeWidth="2"/>
          <path d="M60 15 Q50 20, 45 30" stroke="#2d3748" strokeWidth="2"/>
        </svg>
      </div>
      
      {/* Floating tropical elements */}
      <motion.div
        className="absolute top-20 left-1/4 text-4xl opacity-60"
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
        className="absolute top-1/3 right-1/3 text-3xl opacity-70"
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
        className="absolute bottom-1/3 left-1/5 text-3xl opacity-60"
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
        className="absolute top-2/3 right-1/5 text-3xl opacity-60"
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
      <motion.div
        className="absolute top-40 right-1/2 text-2xl opacity-50"
        animate={{
          y: [0, -6, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        🌊
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
                src="/langley_foodie.jpg"
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
