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
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative"
      >
        <div className="w-24 h-24 rounded-3xl bg-primary-foreground/10 backdrop-blur-xl flex items-center justify-center border border-primary-foreground/20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Compass className="w-12 h-12 text-primary-foreground" />
          </motion.div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-3xl border-2 border-primary-foreground/20"
        />
      </motion.div>

      <div className="text-center">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-display font-bold text-primary-foreground tracking-tight"
        >
          TripSaarthi
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-primary-foreground/60 text-sm font-medium mt-2"
        >
          Your Smart Travel Companion 🇮🇳
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex gap-1 mt-4"
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
            className="w-2 h-2 rounded-full bg-primary-foreground/40"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
