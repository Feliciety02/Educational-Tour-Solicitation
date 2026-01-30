import { motion } from "framer-motion";

const GridBackground = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
      animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />
  );
};

export default GridBackground;
