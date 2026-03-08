import { motion } from "framer-motion";
import { ArrowLeft, Clock, CloudRain, Users, Zap, RefreshCw } from "lucide-react";
import { useState } from "react";

interface TimeOptimizerViewProps {
  onBack: () => void;
}

const SAMPLE_ITINERARY = [
  { id: 1, place: "Taj Mahal", time: "6:00 AM", status: "optimal", reason: "Lowest crowd + best light" },
  { id: 2, place: "Agra Fort", time: "9:30 AM", status: "optimal", reason: "Opens at 6 AM, less crowded by 9:30" },
  { id: 3, place: "Mehtab Bagh", time: "4:30 PM", status: "adjusted", reason: "Rain expected at 2 PM — moved to evening" },
  { id: 4, place: "Fatehpur Sikri", time: "Next Day 7:00 AM", status: "rescheduled", reason: "Too crowded today — better tomorrow morning" },
];

const ALERTS = [
  { icon: CloudRain, text: "Rain expected 2-4 PM. Outdoor activities shifted.", color: "text-ts-sky", bg: "bg-ts-sky/10" },
  { icon: Users, text: "Taj Mahal crowd peaks at 11 AM. Visit early.", color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  { icon: Clock, text: "You're 20 min behind schedule. Skipping lunch break.", color: "text-ts-rose", bg: "bg-ts-rose/10" },
];

const statusColors: Record<string, string> = {
  optimal: "bg-ts-green/10 text-ts-green",
  adjusted: "bg-ts-saffron/10 text-ts-saffron",
  rescheduled: "bg-ts-sky/10 text-ts-sky",
};

export default function TimeOptimizerView({ onBack }: TimeOptimizerViewProps) {
  const [optimizing, setOptimizing] = useState(false);

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => setOptimizing(false), 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-ts-purple" /> Smart Time Optimizer
          </h2>
          <p className="text-[10px] text-muted-foreground">AI auto-adjusts your itinerary in real-time</p>
        </div>
        <button onClick={handleOptimize} className="p-2 bg-primary/10 rounded-xl active:scale-95 transition">
          <RefreshCw className={`w-4 h-4 text-primary ${optimizing ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4 ts-scrollbar-hide">
        {/* Active Alerts */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-foreground">Active Adjustments</p>
          {ALERTS.map((alert, i) => {
            const Icon = alert.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className={`${alert.bg} rounded-xl p-3 flex items-center gap-3`}>
                <Icon className={`w-4 h-4 ${alert.color} shrink-0`} />
                <p className="text-[11px] font-medium text-foreground">{alert.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Optimized Timeline */}
        <div>
          <p className="text-xs font-bold text-foreground mb-3">Optimized Schedule</p>
          <div className="space-y-3">
            {SAMPLE_ITINERARY.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                className="bg-card rounded-2xl border border-border ts-shadow-card p-4 flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  {i < SAMPLE_ITINERARY.length - 1 && <div className="w-0.5 h-8 bg-border mt-1" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-bold text-foreground">{item.place}</p>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${statusColors[item.status]}`}>{item.status}</span>
                  </div>
                  <p className="text-[11px] font-medium text-primary">{item.time}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.reason}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
