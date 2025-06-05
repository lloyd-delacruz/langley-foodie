import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const momLifeContent = [
  {
    id: 1,
    title: "15-Minute Family Dinners That Actually Work",
    category: "Quick Meals",
    image: "https://images.unsplash.com/photo-1556909114-4f3bb1bd2e33?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    excerpt: "Real talk: some nights you just need food on the table fast. Here are my go-to recipes that take 15 minutes or less and actually get eaten by the kids.",
    tips: ["Sheet pan chicken fajitas", "5-ingredient pasta", "Breakfast for dinner"],
    date: "December 15, 2023",
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "Packing School Lunches Without Losing Your Mind",
    category: "School Life",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    excerpt: "After years of lunch box battles, I've cracked the code on stress-free school lunches that kids actually eat (most of the time).",
    tips: ["Prep on Sunday", "Let kids choose options", "Keep it simple"],
    date: "December 10, 2023",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Surviving Restaurant Outings with Toddlers",
    category: "Dining Out",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    excerpt: "Yes, you can still enjoy restaurant meals with little ones in tow. Here's my survival guide for dining out without meltdowns.",
    tips: ["Choose kid-friendly timing", "Bring quiet activities", "Know your backup plan"],
    date: "December 5, 2023",
    readTime: "5 min read"
  },
  {
    id: 4,
    title: "Kitchen Helpers: Cooking with Kids",
    category: "Family Cooking",
    image: "https://images.unsplash.com/photo-1556909114-c88c5e8b8b3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    excerpt: "Cooking with kids is messy, chaotic, and absolutely worth it. Here's how to make it work (and actually enjoy it).",
    tips: ["Age-appropriate tasks", "Embrace the mess", "Make it educational"],
    date: "November 28, 2023",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Snack Station Setup That Changed Our Lives",
    category: "Organization",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    excerpt: "No more constant 'I'm hungry' interruptions. Creating a self-serve snack station was a game-changer for our family.",
    tips: ["Low shelves for independence", "Healthy options at eye level", "Weekly rotation"],
    date: "November 20, 2023",
    readTime: "3 min read"
  },
  {
    id: 6,
    title: "Travel Snacks That Don't Create Chaos",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    excerpt: "Road trips and flights don't have to be snack disasters. These travel-friendly options keep everyone happy and the car clean.",
    tips: ["No-mess options", "Individual portions", "Mix of healthy and treats"],
    date: "November 15, 2023",
    readTime: "4 min read"
  }
];

const categories = ["All", "Quick Meals", "School Life", "Dining Out", "Family Cooking", "Organization", "Travel Tips"];

export default function MomLifeSection() {
  return (
    <section id="mom-life" className="py-20 bg-gradient-to-b from-coral/5 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
            ❤️ Mom Life Eats
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Real solutions for feeding families, from quick weeknight dinners to surviving restaurant outings with little ones
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <div className="text-3xl font-bold text-coral mb-1">500+</div>
            <div className="text-sm text-foreground/60">Family Meals Shared</div>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <div className="text-3xl font-bold text-primary mb-1">15min</div>
            <div className="text-sm text-foreground/60">Average Prep Time</div>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <div className="text-3xl font-bold text-secondary mb-1">2</div>
            <div className="text-sm text-foreground/60">Little Food Critics</div>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <div className="text-3xl font-bold text-accent mb-1">100%</div>
            <div className="text-sm text-foreground/60">Real Life Tested</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {momLifeContent.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white overflow-hidden shadow-lg hover:shadow-2xl border-0 h-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs bg-coral/10 text-coral">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-foreground/60">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-2 group-hover:text-coral transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-foreground/60 mb-3">{post.date}</p>
                  
                  <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">Key Tips:</h4>
                    <ul className="space-y-1">
                      {post.tips.map((tip, idx) => (
                        <li key={idx} className="text-xs text-foreground/60 flex items-center">
                          <span className="w-1 h-1 bg-coral rounded-full mr-2"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div
                    className="flex items-center font-medium text-coral transition-transform duration-200 group-hover:translate-x-1"
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

        {/* Featured Quote */}
        <motion.div
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-8 bg-gradient-to-r from-coral/10 to-primary/10 border-0">
            <blockquote className="text-xl font-serif italic text-foreground mb-4">
              "Motherhood is about embracing the beautiful chaos of family meals, 
              celebrating the small wins, and remembering that 'good enough' is often perfect."
            </blockquote>
            <cite className="text-primary font-medium">- Langley</cite>
          </Card>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full font-medium text-lg text-white shadow-lg transition-all duration-300"
            style={{ backgroundColor: "hsl(var(--coral))" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ❤️ More Mom Life Content
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}