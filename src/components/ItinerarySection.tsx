import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Activity {
  name: string;
  icon: LucideIcon;
  time: string;
  badge: "Travel" | "Company" | "Meal" | "Leisure" | "Stay";
}

interface DayData {
  day: string;
  date: string;
  title: string;
  color: string;
  activities: Activity[];
}

const badgeColors: Record<Activity["badge"], string> = {
  Travel: "bg-blue-100 text-blue-700",
  Company: "bg-teal-light text-primary",
  Meal: "bg-amber-100 text-amber-700",
  Leisure: "bg-purple-100 text-purple-700",
  Stay: "bg-slate-100 text-slate-600",
};

const itinerary: DayData[] = [
  {
    day: "Day 1",
    date: "March 3, 2026",
    title: "Arrival and Company Visits",
    color: "from-[hsl(var(--gradient-pink))] to-[hsl(var(--gradient-purple))]",
    activities: [
      { name: "Travel from Davao to Manila", icon: Plane, time: "Early Morning", badge: "Travel" },
      { name: "Company Visit 1", icon: Building, time: "Morning", badge: "Company" },
      { name: "Lunch", icon: Utensils, time: "12:00 PM", badge: "Meal" },
      { name: "Company Visit 2", icon: Building, time: "Afternoon", badge: "Company" },
      { name: "Dinner", icon: Utensils, time: "Evening", badge: "Meal" },
      { name: "Hotel Check-in", icon: Hotel, time: "Night", badge: "Stay" },
    ],
  },
  {
    day: "Day 2",
    date: "March 4, 2026",
    title: "Tech Exploration & Cultural Immersion",
    color: "from-[hsl(var(--gradient-purple))] to-[hsl(var(--gradient-blue))]",
    activities: [
      { name: "Breakfast", icon: Coffee, time: "Morning", badge: "Meal" },
      { name: "Heritage/Cultural Tour", icon: Landmark, time: "Morning", badge: "Leisure" },
      { name: "Lunch", icon: Utensils, time: "12:00 PM", badge: "Meal" },
      { name: "Company Visit 3", icon: Building, time: "Afternoon", badge: "Company" },
      { name: "Dinner", icon: Utensils, time: "Evening", badge: "Meal" },
      { name: "Overnight", icon: Hotel, time: "Night", badge: "Stay" },
    ],
  },
  {
    day: "Day 3",
    date: "March 5, 2026",
    title: "Fun and Learning Day",
    color: "from-[hsl(var(--gradient-blue))] to-[hsl(var(--gradient-teal))]",
    activities: [
      { name: "Breakfast", icon: Coffee, time: "Morning", badge: "Meal" },
      { name: "Company Visit 4", icon: Building, time: "Morning", badge: "Company" },
      { name: "Lunch", icon: Utensils, time: "12:00 PM", badge: "Meal" },
      { name: "Enchanted Kingdom Visit", icon: Sparkles, time: "Afternoon", badge: "Leisure" },
      { name: "Dinner", icon: Utensils, time: "Evening", badge: "Meal" },
      { name: "Overnight", icon: Hotel, time: "Night", badge: "Stay" },
    ],
  },
  {
    day: "Day 4",
    date: "March 6, 2026",
    title: "Departure and Farewell",
    color: "from-[hsl(var(--gradient-teal))] to-[hsl(var(--gradient-pink))]",
    activities: [
      { name: "Breakfast", icon: Coffee, time: "Morning", badge: "Meal" },
      { name: "Hotel Check-out", icon: Hotel, time: "Morning", badge: "Stay" },
      { name: "Company Visit 5", icon: Building, time: "Late Morning", badge: "Company" },
      { name: "Lunch", icon: Utensils, time: "12:00 PM", badge: "Meal" },
      { name: "Free & Easy/Shopping Time", icon: ShoppingBag, time: "Afternoon", badge: "Leisure" },
      { name: "Dinner", icon: Utensils, time: "Evening", badge: "Meal" },
      { name: "Travel back to Davao", icon: Plane, time: "Night", badge: "Travel" },
    ],
  },
];

export default function ItinerarySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeDay, setActiveDay] = useState(0);

  const setCardRef = (idx: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[idx] = el;
  };

  const scrollToIndex = (idx: number) => {
    const container = scrollRef.current;
    const card = cardRefs.current[idx];
    if (!container || !card) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const currentScrollLeft = container.scrollLeft;
    const cardLeftInContainer = cardRect.left - containerRect.left + currentScrollLeft;

    const target = cardLeftInContainer - (containerRect.width / 2 - cardRect.width / 2);
    container.scrollTo({ left: target, behavior: "smooth" });
  };

  const scroll = (direction: "left" | "right") => {
    const next = direction === "left" ? activeDay - 1 : activeDay + 1;
    const clamped = Math.max(0, Math.min(itinerary.length - 1, next));
    scrollToIndex(clamped);
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < cardRefs.current.length; i += 1) {
      const card = cardRefs.current[i];
      if (!card) continue;

      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = i;
      }
    }

    setActiveDay(bestIndex);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    handleScroll();

    const onResize = () => handleScroll();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const ariaLabel = useMemo(() => `Go to day ${activeDay + 1}`, [activeDay]);

  return (
    <section id="itinerary" className="py-16 sm:py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-light mb-4">
            <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>

          <span className="inline-flex px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            The Journey
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
            4-Day <span className="text-gradient">Itinerary</span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground">
            A carefully planned schedule packed with learning opportunities and professional experiences.
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-card shadow-lg border border-border items-center justify-center hover:bg-muted transition-colors hidden md:flex"
            aria-label="Previous day"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-card shadow-lg border border-border items-center justify-center hover:bg-muted transition-colors hidden md:flex"
            aria-label="Next day"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="
              overflow-x-auto scroll-smooth snap-x snap-mandatory
              pb-6 sm:pb-8
              md:px-16
              px-2
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
            aria-label={ariaLabel}
          >
            <div className="relative min-w-max">
              <div className="pointer-events-none absolute left-4 right-4 sm:left-6 sm:right-6 top-10 sm:top-12">
                <div className="h-[3px] w-full bg-gradient-to-r from-[hsl(var(--gradient-pink))] via-[hsl(var(--gradient-blue))] to-[hsl(var(--gradient-teal))] rounded-full opacity-25" />
                <div className="mt-3 h-px w-full border-t border-dashed border-border/80" />
              </div>

              <div className="relative flex items-start gap-4 sm:gap-6 px-3 sm:px-4 pt-16 sm:pt-20">
                {itinerary.map((day, index) => (
                  <div
                    key={index}
                    ref={setCardRef(index)}
                    className="relative flex-shrink-0 w-[92vw] max-w-[420px] sm:w-[420px] md:w-[440px] snap-center"
                  >
                    <div className="absolute left-1/2 -translate-x-1/2 -top-8 sm:-top-10 z-20">
                      <div
                        className={`
                          w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                          bg-gradient-to-br ${day.color}
                          shadow-lg flex items-center justify-center
                          ring-4 ring-background
                        `}
                      >
                        <span className="text-white font-bold text-base sm:text-lg">{index + 1}</span>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      className="
                        bg-card rounded-3xl border border-border shadow-lg
                        hover:shadow-xl transition-shadow
                        p-4 sm:p-5 md:p-6
                      "
                    >
                      <div
                        className={`
                          inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full
                          bg-gradient-to-r ${day.color}
                          text-white text-xs sm:text-sm font-semibold
                          mb-4
                        `}
                      >
                        <Calendar className="w-4 h-4" />
                        {day.day}
                      </div>

                      <div className="mb-4">
                        <p className="text-xs sm:text-sm text-muted-foreground mb-1">{day.date}</p>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground">
                          {day.title}
                        </h3>
                      </div>

                      <div className="space-y-2">
                        {day.activities.map((activity, actIndex) => (
                          <motion.div
                            key={actIndex}
                            initial={{ opacity: 0, x: -6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: actIndex * 0.03 }}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                          >
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                              <activity.icon className="w-4 h-4 text-primary" />
                            </div>

                            <div className="flex-grow min-w-0">
                              <p className="font-medium text-sm truncate text-foreground">{activity.name}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>

                            <span
                              className={`text-[11px] px-2 py-1 rounded-full font-medium flex-shrink-0 ${badgeColors[activity.badge]}`}
                            >
                              {activity.badge}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-2">
            {itinerary.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeDay === index
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2.5"
                }`}
                aria-label={`Go to day ${index + 1}`}
              />
            ))}
          </div>

          <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4">
            swipe sideways to explore each day
          </p>
        </div>
      </div>
    </section>
  );
}
