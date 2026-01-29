import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";

const TOUR_DATE = new Date("2026-03-03T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = TOUR_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" />
            March 3, 2026
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Countdown to the <span className="text-gradient">Educational Tour</span>
          </h2>
          <p className="text-muted-foreground mb-10">
            Every second counts! Help me reach my goal before the adventure begins.
          </p>

          {/* Countdown Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className="bg-card rounded-2xl p-6 border border-border shadow-lg hover-lift"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-2">
                  {unit.value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          {/* Urgency message */}
          <div className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/10 text-secondary">
            <Clock className="w-5 h-5 animate-pulse" />
            <span className="font-medium">Time is ticking! Your support makes a difference.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
