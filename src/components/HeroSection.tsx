import { Button } from "@/components/ui/button";
import FeanneImg from "@/components/Images/Feanne.svg";
import { ChevronDown, Sparkles, Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import BackgroundSwitcher from "@/components/backgrounds/BackgroundSwitcher";

const HeroSection = () => {
  const scrollToDonate = () => {
    document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex items-start justify-center overflow-hidden pt-28 md:pt-36 pb-20 md:pb-24">
      
      {/* Base gradient */}
      <div className="absolute inset-0 gradient-vibrant opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

      {/* 🎓 Academic Animated Background (auto-rotates daily) */}
      <BackgroundSwitcher />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-6"
        >
          <div className="relative inline-block">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/25 overflow-hidden mx-auto shadow-2xl">
              <img
                src={FeanneImg}
                alt="Feanne Malasarte"
                className="w-full h-full object-cover"
              />
            </div>

            <motion.div
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-4 h-4 text-primary" />
            </motion.div>
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/15 mb-5"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-xs md:text-sm font-medium">
            BS Computer Science Educational Tour 2026
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight"
        >
          An Educational Journey
          <br />
          <span className="text-white/90">in Motion</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-2"
        >
          I’m <span className="font-bold">Feanne</span>, raising funds to join our
          2026 educational tour.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-sm md:text-base text-white/75 max-w-2xl mx-auto mb-7"
        >
          Your support helps cover travel and learning activities across Manila.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/10">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-semibold">4 Days</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/10">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-semibold">
              Every Contribution Helps
            </span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-10 md:mb-12"
        >
          <Button
            size="lg"
            onClick={scrollToDonate}
            className="bg-white text-primary hover:bg-white/90 px-7 py-5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            <Heart className="w-4 h-4 mr-2" />
            Support the Tour
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={scrollToAbout}
            className="border-2 border-white/80 text-white bg-white/10 hover:bg-white/20 px-7 py-5 rounded-full font-semibold backdrop-blur-sm"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
