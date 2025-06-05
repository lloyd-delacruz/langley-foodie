import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const restaurantReviews = [
  {
    id: 1,
    name: "The Keg Langley",
    cuisine: "Steakhouse",
    rating: 4.5,
    price: "$$$$",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    review: "Outstanding steaks and exceptional service. The kids menu is surprisingly good, and the atmosphere is perfect for family celebrations.",
    highlights: ["Great for families", "Excellent steaks", "Professional service"],
    location: "Langley City",
    visited: "December 2023"
  },
  {
    id: 2,
    name: "White Spot",
    cuisine: "Canadian Comfort",
    rating: 4.2,
    price: "$$",
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    review: "A Canadian classic that never disappoints. Their Triple O sauce is legendary, and the kids absolutely love the Pirate Pak meals.",
    highlights: ["Kid-friendly", "Canadian classic", "Great burgers"],
    location: "Langley Township",
    visited: "November 2023"
  },
  {
    id: 3,
    name: "Ricky's All Day Grill",
    cuisine: "Family Dining",
    rating: 4.0,
    price: "$$$",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    review: "Perfect for brunch with the family. Huge portions, friendly staff, and a menu that has something for everyone including picky eaters.",
    highlights: ["All-day breakfast", "Large portions", "Family atmosphere"],
    location: "Willowbrook",
    visited: "October 2023"
  },
  {
    id: 4,
    name: "Murrayville Grill",
    cuisine: "Pub & Grill",
    rating: 4.3,
    price: "$$$",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    review: "Local gem with fantastic fish and chips. The patio is great for summer dining, and they have high chairs for little ones.",
    highlights: ["Local favorite", "Great fish & chips", "Outdoor patio"],
    location: "Murrayville",
    visited: "September 2023"
  },
  {
    id: 5,
    name: "Denny's",
    cuisine: "American Diner",
    rating: 3.8,
    price: "$$",
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    review: "When you need late-night family dining, Denny's delivers. Not gourmet, but reliable comfort food that kids enjoy.",
    highlights: ["Open 24/7", "Kids eat free", "Comfort food"],
    location: "Langley City",
    visited: "August 2023"
  },
  {
    id: 6,
    name: "Boston Pizza",
    cuisine: "Pizza & Pasta",
    rating: 4.1,
    price: "$$$",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
    review: "Great for game nights and family gatherings. The pizza is consistently good, and the kids menu offers healthy options.",
    highlights: ["Sports atmosphere", "Good pizza", "Family-friendly"],
    location: "Walnut Grove",
    visited: "July 2023"
  }
];

export default function LangleyBitesSection() {
  return (
    <section id="langley-bites" className="py-20 bg-gradient-to-b from-primary/5 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
            🍽️ Langley Bites
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Honest reviews of Langley's best family-friendly restaurants, from hidden gems to local favorites
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurantReviews.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer transform transition-all duration-300 hover:scale-105 bg-white overflow-hidden shadow-lg hover:shadow-2xl border-0 h-full">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {restaurant.cuisine}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                      <span className="text-sm text-primary font-medium">{restaurant.price}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                    {restaurant.name}
                  </h3>
                  
                  <p className="text-sm text-foreground/60 mb-3">
                    {restaurant.location} • {restaurant.visited}
                  </p>
                  
                  <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                    {restaurant.review}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  
                  <div
                    className="flex items-center font-medium text-primary transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <span>Read Full Review</span>
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

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full font-medium text-lg text-white shadow-lg transition-all duration-300"
            style={{ backgroundColor: "hsl(var(--primary))" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🍴 View All Restaurant Reviews
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}