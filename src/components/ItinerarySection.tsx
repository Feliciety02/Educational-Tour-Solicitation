import {
  Calendar,
  Building,
  Landmark,
  Coffee,
  Utensils,
  Hotel,
  Plane,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

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
    <section id="itinerary" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 mb-4">
            <Calendar className="w-7 h-7 text-secondary" />
          </div>
          <span className="block text-secondary font-medium mb-4">
            The Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            4-Day <span className="text-gradient">Itinerary</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A carefully planned schedule packed with learning opportunities and professional experiences.
          </p>
        </div>

        {/* Horizontal pathway scroller */}
        <div className="relative">
          {/* Path line behind cards */}
          <div className="pointer-events-none absolute left-0 right-0 top-10 md:top-12">
            <div className="h-[2px] w-full bg-border/70" />
            <div className="mt-2 h-[2px] w-full border-t border-dashed border-border/70" />
          </div>

          {/* Scroll area */}
          <div
            className="
              relative
              overflow-x-auto
              pb-6
              scroll-smooth
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            <div className="min-w-max flex gap-6 md:gap-8 snap-x snap-mandatory">
              {itinerary.map((day, index) => (
                <div
                  key={index}
                  className="
                    snap-start
                    w-[86vw]
                    sm:w-[520px]
                    md:w-[560px]
                    flex-shrink-0
                  "
                >
                  {/* Station marker */}
                  <div className="relative mb-4 h-14">
                    <div className="absolute left-6 top-7 -translate-y-1/2">
                      <div
                        className={`
                          w-12 h-12 rounded-2xl
                          bg-gradient-to-r ${day.color}
                          shadow-lg
                          flex items-center justify-center
                          ring-4 ring-background
                        `}
                      >
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Connector hint */}
                    <div className="absolute left-6 top-7 -translate-y-1/2 translate-x-14 text-xs text-muted-foreground">
                      station {index + 1}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-lg hover-lift">
                    {/* Day badge */}
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${day.color} text-white text-sm font-semibold mb-4`}
                    >
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
                        <div
                          key={actIndex}
                          className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                        >
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
                </div>
              ))}
            </div>
          </div>

          {/* Little helper text */}
          <p className="text-center text-sm text-muted-foreground mt-3">
            swipe sideways to follow the route…
          </p>
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;
