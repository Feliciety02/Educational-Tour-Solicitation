import { MapPin, Calendar, Building, Landmark, Coffee, Utensils, Hotel, Plane, Camera, Sparkles, ShoppingBag } from "lucide-react";

const itinerary = [
  {
    day: "Day 1",
    date: "March 3, 2026",
    title: "Arrival and Company Visits",
    color: "from-[hsl(var(--gradient-pink))] to-[hsl(var(--gradient-purple))]",
    activities: [
      { name: "Travel from Davao to Manila", icon: Plane, time: "Early Morning" },
      { name: "Company Visit 1", icon: Building, time: "Morning" },
      { name: "Lunch", icon: Utensils, time: "12:00 PM" },
      { name: "Company Visit 2", icon: Building, time: "Afternoon" },
      { name: "Dinner", icon: Utensils, time: "Evening" },
      { name: "Hotel Check-in", icon: Hotel, time: "Night" },
    ],
  },
  {
    day: "Day 2",
    date: "March 4, 2026",
    title: "Tech Exploration & Cultural Immersion",
    color: "from-[hsl(var(--gradient-purple))] to-[hsl(var(--gradient-blue))]",
    activities: [
      { name: "Breakfast", icon: Coffee, time: "Morning" },
      { name: "Heritage/Cultural Tour", icon: Landmark, time: "Morning" },
      { name: "Lunch", icon: Utensils, time: "12:00 PM" },
      { name: "Company Visit 3", icon: Building, time: "Afternoon" },
      { name: "Dinner", icon: Utensils, time: "Evening" },
      { name: "Overnight", icon: Hotel, time: "Night" },
    ],
  },
  {
    day: "Day 3",
    date: "March 5, 2026",
    title: "Fun and Learning Day",
    color: "from-[hsl(var(--gradient-blue))] to-[hsl(var(--gradient-teal))]",
    activities: [
      { name: "Breakfast", icon: Coffee, time: "Morning" },
      { name: "Company Visit 4", icon: Building, time: "Morning" },
      { name: "Lunch", icon: Utensils, time: "12:00 PM" },
      { name: "Enchanted Kingdom Visit", icon: Sparkles, time: "Afternoon" },
      { name: "Dinner", icon: Utensils, time: "Evening" },
      { name: "Overnight", icon: Hotel, time: "Night" },
    ],
  },
  {
    day: "Day 4",
    date: "March 6, 2026",
    title: "Departure and Farewell",
    color: "from-[hsl(var(--gradient-teal))] to-[hsl(var(--gradient-pink))]",
    activities: [
      { name: "Breakfast", icon: Coffee, time: "Morning" },
      { name: "Hotel Check-out", icon: Hotel, time: "Morning" },
      { name: "Company Visit 5", icon: Building, time: "Late Morning" },
      { name: "Lunch", icon: Utensils, time: "12:00 PM" },
      { name: "Free & Easy/Shopping Time", icon: ShoppingBag, time: "Afternoon" },
      { name: "Dinner", icon: Utensils, time: "Evening" },
      { name: "Travel back to Davao", icon: Plane, time: "Night" },
    ],
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
            4-Day <span className="text-gradient">Itinerary</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A carefully planned schedule packed with learning opportunities and professional experiences.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {itinerary.map((day, index) => (
            <div
              key={index}
              className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-lg hover-lift"
            >
              {/* Day badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${day.color} text-white text-sm font-semibold mb-4`}>
                <Calendar className="w-4 h-4" />
                {day.day}
              </div>

              {/* Date & Title */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">{day.date}</p>
                <h3 className="text-xl md:text-2xl font-bold">{day.title}</h3>
              </div>

              {/* Activities */}
              <div className="space-y-3">
                {day.activities.map((activity, actIndex) => (
                  <div key={actIndex} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-medium truncate">{activity.name}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;
