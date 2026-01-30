import { useEffect, useMemo, useState } from "react";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FLIGHT_DATE = new Date("2026-03-04T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isDone: boolean;
}

const clamp0 = (n: number) => Math.max(0, n);
const pad2 = (n: number) => n.toString().padStart(2, "0");

function FlipNumber({ value, ariaLabel }: { value: string; ariaLabel: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5" aria-label={ariaLabel}>
      {value.split("").map((ch, i) => (
        <div
          key={`${i}-${ch}`}
          className="relative
            w-[36px] sm:w-[40px] md:w-[48px] lg:w-[56px]
            h-[52px] sm:h-[56px] md:h-[72px] lg:h-[84px]
            rounded-xl bg-card border border-border shadow-md overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${i}-${ch}`}
              initial={{ rotateX: 85, y: -4, opacity: 0 }}
              animate={{ rotateX: 0, y: 0, opacity: 1 }}
              exit={{ rotateX: -85, y: 4, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gradient leading-none">
                {ch}
              </span>
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-border/60" />
        </div>
      ))}
    </div>
  );
}

export default function CountdownTimerAltAnimation() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isDone: false,
  });

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const diff = FLIGHT_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isDone: true });
        return;
      }

      setTimeLeft({
        days: clamp0(Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: clamp0(Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: clamp0(Math.floor((diff / 1000 / 60) % 60)),
        seconds: clamp0(Math.floor((diff / 1000) % 60)),
        isDone: false,
      });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = useMemo(
    () => [
      { key: "days", label: "Days", value: String(timeLeft.days) },
      { key: "hours", label: "Hours", value: pad2(timeLeft.hours) },
      { key: "minutes", label: "Minutes", value: pad2(timeLeft.minutes) },
      { key: "seconds", label: "Seconds", value: pad2(timeLeft.seconds) },
    ],
    [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds]
  );

  return (
    <section className="relative overflow-hidden py-20 bg-background">
      <div className="relative container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-5">
              <Calendar className="w-4 h-4" />
              March 4, 2026 (Flight Day)
            </div>

            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Countdown to the <span className="text-gradient">Flight</span>
            </h2>

            <p className="text-muted-foreground text-sm md:text-base">
              Live ticking countdown with a flip-clock vibe.
            </p>
          </motion.div>

          {/* tighter horizontal layout */}
          <div className="flex items-stretch justify-center gap-2 sm:gap-3 md:gap-5">
            {units.map((u, idx) => (
              <motion.div
                key={u.key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-card/70 backdrop-blur-md rounded-2xl p-3 sm:p-4 md:p-6 border border-border shadow-md"
              >
                <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
                  <div className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-muted-foreground font-semibold text-center">
                    {u.label}
                  </div>

                  <FlipNumber value={u.value} ariaLabel={`${u.label} ${u.value}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
