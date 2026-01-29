import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Heart, MapPin } from "lucide-react";

const HeroSection = () => {
  const scrollToDonate = () => {
    document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-vibrant opacity-90" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {/* Profile Photo Placeholder */}
        <div className="mb-8 animate-fade-in">
          <div className="relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 overflow-hidden mx-auto shadow-2xl">
              {/* Placeholder - replace src with your actual photo */}
              <img 
                src="/placeholder.svg" 
                alt="Feanne Malasarte"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Heart className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">BS Computer Science Educational Tour</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight animate-fade-in">
          Help Me Join the
          <br />
          <span className="text-white/90">Educational Tour 2025</span>
        </h1>

        {/* Personal message */}
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-4 animate-fade-in">
          Hi, I'm <span className="font-bold">Feanne</span>! I'm raising funds to join my class's educational tour.
        </p>
        <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-8 animate-fade-in">
          Your support will help me experience hands-on learning at tech companies, cultural sites, and more across Manila, Cavite, and Laguna.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-10 animate-fade-in">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">4 Days of Adventure</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            <span className="font-semibold">Every Peso Counts</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button
            size="lg"
            onClick={scrollToDonate}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Heart className="w-5 h-5 mr-2" />
            Support My Journey
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToAbout}
            className="border-2 border-white text-white bg-white/10 hover:bg-white/20 text-lg px-8 py-6 rounded-full font-semibold backdrop-blur-sm"
          >
            Learn More
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
