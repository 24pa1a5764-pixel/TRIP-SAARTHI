import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MapPin, Shield, AlertTriangle } from "lucide-react";
import { EMERGENCY_CONTACTS } from "@/lib/featureData";
import { useState } from "react";

interface EmergencyButtonProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyButton({ isOpen, onClose }: EmergencyButtonProps) {
  const [locationShared, setLocationShared] = useState(false);

  const shareLocation = () => {
    setLocationShared(true);
    setTimeout(() => setLocationShared(false), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-end justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="bg-card w-full max-w-md rounded-t-3xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-bold text-destructive flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Emergency Help
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition">
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={shareLocation}
                className={`rounded-2xl p-3 flex flex-col items-center gap-2 transition active:scale-95 ${
                  locationShared ? "bg-ts-green/10 border border-ts-green/20" : "bg-primary/10 border border-primary/20"
                }`}
              >
                <MapPin className={`w-5 h-5 ${locationShared ? "text-ts-green" : "text-primary"}`} />
                <span className={`text-[10px] font-bold ${locationShared ? "text-ts-green" : "text-primary"}`}>
                  {locationShared ? "✓ Location Shared!" : "Share Live Location"}
                </span>
              </button>
              <button className="bg-destructive/10 border border-destructive/20 rounded-2xl p-3 flex flex-col items-center gap-2 transition active:scale-95">
                <Shield className="w-5 h-5 text-destructive" />
                <span className="text-[10px] font-bold text-destructive">Find Safe Places</span>
              </button>
            </div>

            {/* Emergency Contacts */}
            <div className="space-y-2">
              {EMERGENCY_CONTACTS.map((contact, i) => (
                <motion.a
                  key={contact.label}
                  href={`tel:${contact.number}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-muted rounded-xl p-3 active:scale-[0.98] transition"
                >
                  <span className="text-lg">{contact.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{contact.label}</p>
                    <p className="text-[10px] text-muted-foreground">Tap to call</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-lg border border-border">
                    <Phone className="w-3 h-3 text-ts-green" />
                    <span className="text-xs font-bold text-foreground">{contact.number}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
