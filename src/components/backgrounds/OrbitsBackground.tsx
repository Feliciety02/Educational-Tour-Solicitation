import { motion } from "framer-motion";
import { useMemo } from "react";

const ORB_COUNT = 20;

type Orb = {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
};

const FloatingOrbsBackground = () => {
  const orbs = useMemo(() => {
    return Array.from({ length: ORB_COUNT }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 6 + Math.random() * 8, // 6px–14px
      duration: 15 + Math.random() * 10, // slow floating
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/20 blur-xl"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
          }}
          animate={{
            x: [-15, 15, -15], // gentle horizontal drift
            y: [-15, 15, -15], // gentle vertical drift
            scale: [0.8, 1.2, 0.8], // slight pulse
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbsBackground;
