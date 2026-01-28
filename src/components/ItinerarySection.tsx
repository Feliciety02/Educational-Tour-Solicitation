import { MapPin, Calendar, Building, Landmark, TreePine, Cpu } from "lucide-react";

const itinerary = [
  {
    day: "Day 1",
    location: "Manila",
    color: "from-[hsl(var(--gradient-pink))] to-[hsl(var(--gradient-purple))]",
    destinations: [
      { name: "National Museum of Natural History", icon: Building, description: "Explore Philippine biodiversity and natural heritage" },
      { name: "Intramuros", icon: Landmark, description: "Walk through the historic Walled City" },
      { name: "Mind Museum", icon: Cpu, description: "Interactive science exhibits and technology displays" },
    ],
    objective: "Learn about Philippine history, culture, and scientific innovation",
  },
  {
    day: "Day 2",
    location: "Cavite",
    color: "from-[hsl(var(--gradient-purple))] to-[hsl(var(--gradient-blue))]",
    destinations: [
      { name: "Aguinaldo Shrine", icon: Landmark, description: "Witness where Philippine independence was declared" },
      { name: "Historical Sites", icon: Building, description: "Explore revolutionary landmarks" },
      { name: "Corregidor Island Tour", icon: MapPin, description: "WWII historical site and museum" },
    ],
    objective: "Understand Philippine revolutionary history and national identity",
  },
  {
    day: "Day 3",
    location: "Laguna",
    color: "from-[hsl(var(--gradient-blue))] to-[hsl(var(--gradient-teal))]",
    destinations: [
      { name: "UPLB Campus Tour", icon: Building, description: "Explore one of the top universities in the country" },
      { name: "Makiling Botanic Gardens", icon: TreePine, description: "Nature trails and environmental education" },
      { name: "Local Tech Companies", icon: Cpu, description: "Visit IT companies and learn about the industry" },
    ],
    objective: "Explore academic opportunities and tech industry insights",
  },
];

const ItinerarySection = () => {
  return (
    <section id="itinerary" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            The Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Tour <span className="text-gradient">Itinerary</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three days of exploration, learning, and unforgettable experiences across three beautiful provinces.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 gradient-vibrant-vertical rounded-full" />

          {itinerary.map((day, index) => (
            <div
              key={index}
              className={`relative mb-12 lg:mb-24 ${
                index % 2 === 0 ? "lg:pr-[50%]" : "lg:pl-[50%] lg:text-right"
              }`}
            >
              {/* Timeline dot */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background border-4 border-primary items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              {/* Card */}
              <div
                className={`bg-card rounded-3xl p-6 md:p-8 border border-border shadow-lg hover-lift ${
                  index % 2 === 0 ? "lg:mr-12" : "lg:ml-12"
                }`}
              >
                {/* Day badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${day.color} text-white text-sm font-semibold mb-4`}>
                  <Calendar className="w-4 h-4" />
                  {day.day}
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl md:text-3xl font-bold">{day.location}</h3>
                </div>

                {/* Destinations */}
                <div className={`space-y-4 mb-6 ${index % 2 === 1 ? "lg:text-left" : ""}`}>
                  {day.destinations.map((dest, destIndex) => (
                    <div key={destIndex} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <dest.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{dest.name}</p>
                        <p className="text-sm text-muted-foreground">{dest.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Objective */}
                <div className={`p-4 rounded-xl bg-muted/50 ${index % 2 === 1 ? "lg:text-left" : ""}`}>
                  <p className="text-sm font-medium text-muted-foreground">
                    <span className="text-primary">Educational Objective:</span> {day.objective}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;
