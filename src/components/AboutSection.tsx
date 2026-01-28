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
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About The Tour
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why This Tour <span className="text-gradient">Matters</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            This educational tour is more than just a field trip—it's an investment in our students' 
            futures. We'll explore historical landmarks, scientific institutions, and tech companies 
            across three provinces.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border hover-lift cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl gradient-vibrant flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Student count highlight */}
        <div className="mt-16 text-center p-8 rounded-3xl gradient-vibrant text-white">
          <p className="text-lg mb-2">We're raising funds for</p>
          <p className="text-5xl md:text-6xl font-bold mb-2">40 Students</p>
          <p className="text-white/80">from the BS Computer Science program</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
