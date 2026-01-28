import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, GraduationCap, MapPin } from "lucide-react";

const HeroSection = () => {
  const scrollToDonate = () => {
    document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
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
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">BS Computer Science Educational Tour</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight animate-fade-in">
          Educational Tour 2025
          <br />
          <span className="text-white/90">Explore. Learn. Grow.</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in">
          Join us on an unforgettable journey through Manila, Cavite, and Laguna. 
          Help our students gain hands-on learning experiences that will shape their future in technology.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            <span className="font-semibold">40 Students</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            <span className="font-semibold">3 Destinations</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button
            size="lg"
            onClick={scrollToDonate}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Donate Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full font-semibold"
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
