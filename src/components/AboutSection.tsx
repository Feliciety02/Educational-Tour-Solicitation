import { BookOpen, Users, Lightbulb, Building2 } from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Hands-on Learning",
    description: "Experience real-world applications of computer science concepts outside the classroom.",
  },
  {
    icon: Building2,
    title: "Industry Exposure",
    description: "Visit tech companies and learn from professionals in the field.",
  },
  {
    icon: Users,
    title: "Team Building",
    description: "Strengthen bonds with classmates through shared experiences and adventures.",
  },
  {
    icon: Lightbulb,
    title: "Cultural Enrichment",
    description: "Discover the rich history and heritage of the Philippines.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About The Tour
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
            Why This Tour <span className="text-gradient">Matters</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            This educational tour is more than just a field trip, it's an investment in our students'
            futures. We'll explore historical landmarks, scientific institutions, and tech companies
            across three provinces.
          </p>
        </div>

        {/* Always 2x2 grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="
                group p-5 sm:p-6 rounded-2xl
                bg-card border border-border
                hover:shadow-lg transition-shadow
                cursor-pointer
              "
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl gradient-vibrant flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              <h3 className="text-base sm:text-lg font-semibold mb-1.5">
                {benefit.title}
              </h3>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight card */}
        <div className="mt-10 sm:mt-16 text-center px-5 py-8 sm:p-10 rounded-3xl gradient-vibrant text-white max-w-4xl mx-auto">
          <p className="text-sm sm:text-lg mb-2 text-white/90">
            This fundraising effort is for
          </p>

          <p className="text-3xl sm:text-5xl md:text-6xl font-bold mb-2 leading-tight">
            Fe Anne
          </p>

          <p className="text-white/85 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            a BS Computer Science student striving to represent her journey and pursue this educational opportunity
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
