import { motion } from "framer-motion";
import { useMemo } from "react";

type Line = {
  top: number;
  left: number;
  w: number;
  h: number;
  d: number;
  dur: number;
};

const NeuralDriftBackground = () => {
  const lines = useMemo<Line[]>(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      top: 10 + (i * 80) / 10 + Math.random() * 4,
      left: -10 + Math.random() * 20,
      w: 120 + Math.random() * 120,
      h: 1,
      d: Math.random() * 5,
      dur: 18 + Math.random() * 10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((l, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${l.top}%`,
            left: `${l.left}%`,
            width: `${l.w}%`,
            height: `${l.h}px`,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.16) 45%, rgba(255,255,255,0) 100%)",
            opacity: 0.45,
            filter: "blur(0.2px)",
          }}
          animate={{
            x: ["-8%", "8%", "-8%"],
            opacity: [0.1, 0.28, 0.1],
          }}
          transition={{
            duration: l.dur,
            delay: l.d,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.05), transparent 55%), radial-gradient(circle at 70% 75%, rgba(255,255,255,0.04), transparent 60%)",
        }}
        animate={{ opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default NeuralDriftBackground;
