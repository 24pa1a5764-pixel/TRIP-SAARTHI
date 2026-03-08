import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 ts-gradient-hero flex flex-col items-center justify-center gap-6 z-50"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <Compass className="w-16 h-16 text-primary-foreground" />
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-display font-bold text-primary-foreground tracking-tight"
      >
        TripSaarthi
      </motion.h1>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-primary-foreground/70 text-sm font-medium"
      >
        Your Smart Travel Companion
      </motion.p>
    </motion.div>
  );
}
