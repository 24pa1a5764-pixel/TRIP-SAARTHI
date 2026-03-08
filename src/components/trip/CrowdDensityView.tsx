import { motion } from "framer-motion";
import { ArrowLeft, Users, Clock, TrendingDown, Zap } from "lucide-react";
import { getCrowdData, getBestVisitTime } from "@/lib/featureData";

interface CrowdDensityViewProps {
  placeName: string;
  onBack: () => void;
}

export default function CrowdDensityView({ placeName, onBack }: CrowdDensityViewProps) {
  const data = getCrowdData(placeName);
  const bestTime = getBestVisitTime(placeName);
  const maxDensity = Math.max(...data.map(d => d.density));

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground">👥 Crowd Density</h2>
          <p className="text-[10px] text-muted-foreground">{placeName}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 ts-scrollbar-hide">
        {/* Best Time Card */}
        <div className="ts-gradient-nature rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-primary-foreground" />
            <span className="text-xs font-bold text-primary-foreground">Best Time to Visit</span>
          </div>
          <p className="text-lg font-display font-bold text-primary-foreground">{bestTime}</p>
          <p className="text-[10px] text-primary-foreground/60 mt-1">Based on historical visitor patterns</p>
        </div>

        {/* Density Chart */}
        <div className="bg-card rounded-2xl p-4 ts-shadow-card border border-border mb-4">
          <h3 className="text-xs font-bold text-foreground mb-4 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-primary" /> Hourly Crowd Prediction
          </h3>
          <div className="flex items-end gap-1.5 h-32">
            {data.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.density / maxDensity) * 100}%` }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className={`w-full rounded-t-lg ${
                    d.density < 30 ? "bg-ts-green" : d.density < 60 ? "bg-ts-saffron" : d.density < 80 ? "bg-accent" : "bg-destructive"
                  }`}
                />
                <span className="text-[7px] text-muted-foreground font-bold">{d.hour}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-3">
            {[
              { color: "bg-ts-green", label: "Low" },
              { color: "bg-ts-saffron", label: "Moderate" },
              { color: "bg-accent", label: "High" },
              { color: "bg-destructive", label: "Very High" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${l.color}`} />
                <span className="text-[8px] text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-card rounded-2xl p-4 ts-shadow-card border border-border">
          <h3 className="text-xs font-bold text-foreground mb-3 flex items-center gap-1.5">
            <TrendingDown className="w-3.5 h-3.5 text-ts-green" /> Tips to Beat the Crowd
          </h3>
          <div className="space-y-2">
            {[
              "Visit during sunrise for magical empty views 🌅",
              "Weekdays are 40% less crowded than weekends",
              "Book skip-the-line tickets online ⚡",
              "Off-season months: July-September",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 bg-muted/50 rounded-xl p-3">
                <Clock className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                <span className="text-[11px] text-foreground">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
