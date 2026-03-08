import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert, Phone, AlertTriangle, MapPin } from "lucide-react";

interface SafetyModalProps {
  onClose: () => void;
}

const tips = [
  { icon: Phone, title: "Emergency Numbers", desc: "Police: 100 | Ambulance: 102 | Women Helpline: 1091" },
  { icon: AlertTriangle, title: "Scam Awareness", desc: "Beware of overpriced guides and fake taxi meters." },
  { icon: MapPin, title: "Stay Connected", desc: "Share live location with family when exploring new areas." },
];

export default function SafetyModal({ onClose }: SafetyModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card w-full max-w-md rounded-t-3xl p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-destructive" /> Safety Guide
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <div className="space-y-3">
          {tips.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <div key={i} className="bg-muted rounded-2xl p-4 flex items-start gap-3">
                <div className="bg-destructive/10 p-2 rounded-xl shrink-0">
                  <Icon className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{tip.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{tip.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
