import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to a server
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message sent!",
      description: "Thank you for your message! I'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@langleyfoodietravels",
      url: "https://instagram.com/langleyfoodietravels",
      icon: "📱",
      gradient: "from-pink-500 to-purple-500",
    },
    {
      name: "Email",
      handle: "hello@langleyfoodietravels.com",
      url: "mailto:hello@langleyfoodietravels.com",
      icon: "📧",
      color: "primary",
    },
    {
      name: "YouTube",
      handle: "Langley Foodie Travels",
      url: "https://youtube.com/@langleyfoodietravels",
      icon: "🎥",
      color: "red-500",
    },
  ];

  const stats = [
    { number: "150+", label: "Restaurants Reviewed" },
    { number: "25", label: "Countries Visited" },
    { number: "500+", label: "Family Meals Shared" },
    { number: "50K+", label: "Instagram Followers" },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-accent/10 to-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Have a restaurant recommendation? Planning a trip? Or just want to say hi? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 shadow-lg border-0">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                Send me a message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                    required
                  >
                    <option value="">Choose a topic</option>
                    <option value="restaurant-recommendation">Restaurant Recommendation</option>
                    <option value="travel-question">Travel Question</option>
                    <option value="collaboration">Collaboration Inquiry</option>
                    <option value="general">General Question</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Tell me about your question or recommendation..."
                    required
                    className="w-full resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-4 text-lg"
                  style={{ backgroundColor: "hsl(var(--primary))" }}
                >
                  📧 Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                Other Ways to Connect
              </h3>
              <p className="text-foreground/70 mb-6">
                Follow along on social media for daily food finds, travel tips, and behind-the-scenes moments.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white ${
                      link.gradient ? `bg-gradient-to-r ${link.gradient}` : ""
                    }`}
                    style={{
                      backgroundColor: !link.gradient ? `hsl(var(--${link.color}))` : undefined,
                    }}
                  >
                    <span className="text-xl">{link.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {link.name}
                    </h4>
                    <p className="text-sm text-foreground/60">{link.handle}</p>
                  </div>
                  <span className="ml-auto text-foreground/40 group-hover:text-primary transition-colors">
                    🔗
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Fun Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6 shadow-lg border-0">
                <h4 className="text-lg font-serif font-bold text-foreground mb-4 text-center">
                  My Journey in Numbers
                </h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                      <div className="text-sm text-foreground/60">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
