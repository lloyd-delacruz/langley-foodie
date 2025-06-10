import { motion } from "framer-motion";

export default function Footer() {
  const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#blog", label: "Blog" },
    { href: "#langley-bites", label: "Langley Bites" },
    { href: "#travels", label: "Travels" },
    { href: "#reels", label: "Reels" },
  ];

  const categories = [
    { href: "#", label: "Restaurant Reviews" },
    { href: "#", label: "Travel Guides" },
    { href: "#", label: "Family Recipes" },
    { href: "#", label: "Mom Life" },
    { href: "#", label: "Food Photography" },
  ];

  const socialLinks = [
    {
      href: "https://instagram.com/langleyfoodietravels",
      icon: "📱",
      color: "primary",
    },
    {
      href: "mailto:hello@langleyfoodietravels.com",
      icon: "📧",
      color: "secondary",
    },
    {
      href: "https://youtube.com/@langleyfoodietravels",
      icon: "🎥",
      color: "red-500",
    },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-serif font-semibold mb-4">
              <span
                className="font-script text-3xl"
                style={{ color: "hsl(var(--primary))" }}
              >
                Langley
              </span>{" "}
              Foodie Travels
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Sharing the joy of good food, meaningful travel, and the beautiful chaos of
              family life. Join our community of food lovers and adventure seekers.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{
                    backgroundColor: `hsl(var(--${link.color}))`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-white">{link.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.label}>
                  <a
                    href={category.href}
                    className="text-gray-300 hover:text-secondary transition-colors duration-200"
                  >
                    {category.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-600 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Langley Foodie Travels. Made with{" "}
            <span style={{ color: "hsl(var(--coral))" }}>❤️</span> in Beautiful BC.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <button
              onClick={() => handleLinkClick("#contact")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
