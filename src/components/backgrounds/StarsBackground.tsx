import { motion } from "framer-motion";
import { useMemo } from "react";

// Layers for depth: far, mid, near
const layers = [
  { count: 40, size: 1, speed: 50, opacity: 0.15 }, // far stars
  { count: 30, size: 2, speed: 35, opacity: 0.25 }, // mid stars
  { count: 20, size: 3, speed: 20, opacity: 0.35 }, // near stars
];

type Star = {
  top: string;
  left: string;
  delay: number;
  drift: number;
  twinkleDelay: number;
};

const StarsBackground = () => {
  const starsByLayer = useMemo(() => {
    return layers.map((layer) =>
      Array.from({ length: layer.count }).map((): Star => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 10,
        drift: Math.random() * 12,
        twinkleDelay: Math.random() * 6,
      }))
    );
  }, []);

  // Shooting stars
  const shootingStars = useMemo(
    () =>
      Array.from({ length: 5 }).map(() => ({
        top: `${10 + Math.random() * 60}%`,
        delay: Math.random() * 10,
        rotate: -15 - Math.random() * 10, // slightly varied angle
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Star layers */}
      {layers.map((layer, layerIndex) =>
        starsByLayer[layerIndex].map((star, i) => (
          <motion.span
            key={`${layerIndex}-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: layer.size,
              height: layer.size,
              top: star.top,
              left: star.left,
              opacity: layer.opacity,
            }}
            animate={{
              y: ["0%", "-120%"],
              opacity: [
                layer.opacity,
                Math.min(layer.opacity + 0.25, 0.7),
                layer.opacity,
              ],
            }}
            transition={{
              y: {
                duration: layer.speed + star.drift,
                delay: star.delay,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: {
                duration: 4,
                delay: star.twinkleDelay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))
      )}

      {/* Shooting stars */}
      {shootingStars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute left-[-30%] w-64 h-[2px] bg-gradient-to-r from-white/80 via-white/40 to-transparent"
          style={{ top: star.top, rotate: star.rotate }}
          animate={{ x: ["0%", "180%"], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5 + Math.random() * 0.5,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 12 + Math.random() * 8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;
