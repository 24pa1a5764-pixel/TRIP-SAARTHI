import { motion } from "framer-motion";
import { ArrowLeft, Compass, Bell, MapPin, Shield, UserCheck, Clock } from "lucide-react";
import { useState } from "react";

interface SoloSafetyViewProps {
  onBack: () => void;
}

const SAFETY_FEATURES = [
  { icon: Bell, title: "Periodic Check-ins", desc: "Auto-ping every 2 hours. If no response, alerts your emergency contacts.", active: true, color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  { icon: MapPin, title: "Live Location Sharing", desc: "Share real-time location with trusted contacts via a secure link.", active: false, color: "text-ts-sky", bg: "bg-ts-sky/10" },
  { icon: Shield, title: "Safe Zone Alerts", desc: "Get notified when entering or leaving pre-defined safe zones.", active: true, color: "text-ts-green", bg: "bg-ts-green/10" },
  { icon: UserCheck, title: "Trusted Contacts", desc: "Up to 3 contacts who receive your check-in status and alerts.", active: true, color: "text-ts-purple", bg: "bg-ts-purple/10" },
];

const SAFE_ZONES = [
  { name: "Connaught Place", city: "Delhi", score: 92, type: "Tourist Hub" },
  { name: "MG Road", city: "Bangalore", score: 88, type: "Commercial" },
  { name: "Marine Drive", city: "Mumbai", score: 90, type: "Promenade" },
  { name: "Lal Chowk", city: "Srinagar", score: 75, type: "Market Area" },
];

export default function SoloSafetyView({ onBack }: SoloSafetyViewProps) {
  const [features, setFeatures] = useState(SAFETY_FEATURES);

  const toggleFeature = (index: number) => {
    setFeatures(prev => prev.map((f, i) => i === index ? { ...f, active: !f.active } : f));
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <Compass className="w-5 h-5 text-ts-green" /> Solo Traveler Safety
          </h2>
          <p className="text-[10px] text-muted-foreground">Stay connected & protected on solo trips</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4 ts-scrollbar-hide">
        {/* Status Banner */}
        <div className="bg-ts-green/10 border border-ts-green/20 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-ts-green/20 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-ts-green" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Solo Safety Mode Active</p>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Next check-in in 1h 45m</p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-foreground">Safety Features</p>
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div key={feat.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border border-border ts-shadow-card p-4 flex items-center gap-3">
                <div className={`${feat.bg} p-2.5 rounded-xl`}><Icon className={`w-5 h-5 ${feat.color}`} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-foreground">{feat.title}</p>
                  <p className="text-[10px] text-muted-foreground">{feat.desc}</p>
                </div>
                <button onClick={() => toggleFeature(i)}
                  className={`w-10 h-6 rounded-full transition flex items-center px-0.5 ${feat.active ? "bg-ts-green" : "bg-muted"}`}>
                  <div className={`w-5 h-5 rounded-full bg-card ts-shadow-card transition-transform ${feat.active ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Safe Zones */}
        <div>
          <p className="text-xs font-bold text-foreground mb-2">Recommended Safe Zones</p>
          <div className="grid grid-cols-2 gap-2">
            {SAFE_ZONES.map((zone) => (
              <div key={zone.name} className="bg-card rounded-xl border border-border p-3">
                <p className="text-xs font-bold text-foreground">{zone.name}</p>
                <p className="text-[10px] text-muted-foreground">{zone.city}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] bg-muted px-2 py-0.5 rounded-lg text-muted-foreground">{zone.type}</span>
                  <span className={`text-[10px] font-bold ${zone.score >= 85 ? "text-ts-green" : "text-ts-saffron"}`}>{zone.score}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
