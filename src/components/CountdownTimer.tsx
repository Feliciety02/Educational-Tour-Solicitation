import { useEffect, useMemo, useState } from "react";
import { Calendar, Clock } from "lucide-react";
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
    <div className="flex items-center justify-center gap-2" aria-label={ariaLabel}>
      {value.split("").map((ch, i) => (
        <div
          key={`${i}-${ch}`}
          className="relative w-[48px] md:w-[56px] lg:w-[64px] h-[68px] md:h-[80px] lg:h-[92px] rounded-2xl bg-card border border-border shadow-lg overflow-hidden"
        >
          {/* glossy top */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-transparent" />

          {/* flip layer */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${i}-${ch}`}
              initial={{ rotateX: 85, y: -6, opacity: 0 }}
              animate={{ rotateX: 0, y: 0, opacity: 1 }}
              exit={{ rotateX: -85, y: 6, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gradient leading-none">
                {ch}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* mid seam */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-border/70" />
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
      {/* background: drifting orbs + shimmer sweep (no icons) */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 -left-28 h-[560px] w-[560px] rounded-full bg-[hsl(var(--gradient-pink))/0.18] blur-3xl"
          animate={{ x: [0, 22, 0], y: [0, 16, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-10 right-[-190px] h-[700px] w-[700px] rounded-full bg-[hsl(var(--gradient-purple))/0.16] blur-3xl"
          animate={{ x: [0, -26, 0], y: [0, 14, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-52 left-1/3 h-[720px] w-[720px] rounded-full bg-[hsl(var(--gradient-teal))/0.14] blur-3xl"
          animate={{ x: [0, 18, 0], y: [0, -18, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -inset-x-40 top-[-30%] h-[220%] rotate-12"
          initial={{ x: "-35%" }}
          animate={{ x: "35%" }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/70 to-background" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              March 4, 2026 (Flight Day)
            </div>

            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Countdown to the <span className="text-gradient">Flight</span>
            </h2>

            <p className="text-muted-foreground">
              Live ticking countdown with a flip-clock vibe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {units.map((u, idx) => (
              <motion.div
                key={u.key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="bg-card/70 backdrop-blur-md rounded-3xl p-6 border border-border shadow-lg"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-sm md:text-base uppercase tracking-wider text-muted-foreground font-semibold text-center">
                    {u.label}
                  </div>

                  <FlipNumber value={u.value} ariaLabel={`${u.label} ${u.value}`} />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-10"
          >
          </motion.div>
        </div>
      </div>
    </section>
  );
}
