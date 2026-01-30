import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import StarsBackground from "./StarsBackground";
import OrbitsBackground from "./OrbitsBackground";
import GridBackground from "./GridBackground";
import AuroraBackground from "./AuroraBackground";

const backgrounds = [
  { id: "grid", Component: GridBackground },
  { id: "orbits", Component: OrbitsBackground },
  { id: "aurora", Component: AuroraBackground },
  { id: "stars", Component: StarsBackground },
];

const SWITCH_INTERVAL = 5000;
const FADE_DURATION = 1.8;

const BackgroundSwitcher = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % backgrounds.length);
    }, SWITCH_INTERVAL);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {backgrounds.map(({ id, Component }, i) => {
        const isActive = i === index;

        return (
          <motion.div
            key={id}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: FADE_DURATION, ease: [0.9, 0, 0.2, 1] }}
            style={{ willChange: "opacity" }}
          >
            <Component />
          </motion.div>
        );
      })}
    </div>
  );
};

export default BackgroundSwitcher;
