import { motion } from "framer-motion";

const destinations = [
  {
    id: 1,
    name: "Santorini",
    description: "Greek Island Paradise",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
  },
  {
    id: 2,
    name: "Costa Rica",
    description: "Rainforest Adventure",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
  },
  {
    id: 3,
    name: "Tokyo",
    description: "Urban Food Culture",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
  },
  {
    id: 4,
    name: "Maldives",
    description: "Tropical Paradise",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
  },
  {
    id: 5,
    name: "Venice",
    description: "Italian Romance",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
  },
  {
    id: 6,
    name: "Banff",
    description: "Canadian Rockies",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
  },
  {
    id: 7,
    name: "Iceland",
    description: "Northern Lights",
    image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
  },
  {
    id: 8,
    name: "Marrakech",
    description: "Moroccan Markets",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d30ae4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
  },
];

export default function TravelGallery() {
  return (
    <section id="travels" className="py-20 bg-gradient-to-b from-secondary/5 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
            Travel Gallery
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Adventures around the world with family in tow
          </p>
        </motion.div>

        {/* Travel Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-serif font-semibold mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm opacity-90">{destination.description}</p>
                </div>
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-white text-sm">🔍</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
