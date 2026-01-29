import { Button } from "@/components/ui/button";
import FeanneImg from "@/components/Images/Feanne.svg";
import { ChevronDown, Sparkles, Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";
const HeroSection = () => {
  const scrollToDonate = () => {
    document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 gradient-vibrant opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white/20 border-4 border-white/25 overflow-hidden mx-auto shadow-xl">
            <img
              src={FeanneImg}
              alt="Feanne Malasarte"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/15 mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-xs md:text-sm font-medium">
            BS Computer Science Educational Tour 2026
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
        >
          Support My Educational
          <br />
          <span className="text-white/90">Tour Participation</span>
        </motion.h1>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6"
        >
          I’m <span className="font-bold">Feanne</span>, raising funds to join our 2026
          educational tour in Manila.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button
            size="lg"
            onClick={scrollToDonate}
            className="bg-white text-primary hover:bg-white/90 px-7 py-5 rounded-full font-semibold shadow-lg"
          >
            <Heart className="w-4 h-4 mr-2" />
            Support the Tour
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={scrollToAbout}
            className="border-2 border-white/80 text-white bg-white/10 hover:bg-white/20 px-7 py-5 rounded-full font-semibold"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
