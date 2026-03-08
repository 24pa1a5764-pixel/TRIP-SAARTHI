import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, CloudRain, Users, Shield, Heart, AlertTriangle } from "lucide-react";

interface TravelRiskViewProps {
  onBack: () => void;
}

const RISK_DATA = [
  { city: "Delhi", overall: 62, weather: 45, crowd: 80, safety: 65, health: 58, alerts: ["Heat wave active", "High AQI"] },
  { city: "Goa", overall: 35, weather: 55, crowd: 40, safety: 25, health: 20, alerts: ["Monsoon approaching"] },
  { city: "Shimla", overall: 22, weather: 20, crowd: 25, safety: 15, health: 28, alerts: [] },
  { city: "Mumbai", overall: 48, weather: 40, crowd: 70, safety: 40, health: 42, alerts: ["Flooding risk in monsoon"] },
  { city: "Varanasi", overall: 55, weather: 50, crowd: 75, safety: 50, health: 45, alerts: ["Pickpocket risk at ghats"] },
  { city: "Ladakh", overall: 45, weather: 60, crowd: 15, safety: 30, health: 75, alerts: ["Altitude sickness risk"] },
];

const getRiskLevel = (score: number) => score <= 30 ? { label: "Low", color: "text-ts-green", bg: "bg-ts-green" } : score <= 60 ? { label: "Moderate", color: "text-ts-saffron", bg: "bg-ts-saffron" } : { label: "High", color: "text-destructive", bg: "bg-destructive" };

const factors = [
  { key: "weather" as const, icon: CloudRain, label: "Weather" },
  { key: "crowd" as const, icon: Users, label: "Crowd" },
  { key: "safety" as const, icon: Shield, label: "Safety" },
  { key: "health" as const, icon: Heart, label: "Health" },
];

export default function TravelRiskView({ onBack }: TravelRiskViewProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-ts-rose" /> Travel Risk Analyzer
          </h2>
          <p className="text-[10px] text-muted-foreground">Risk scores based on weather, crowd, safety & health</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-3 ts-scrollbar-hide">
        {RISK_DATA.map((city, i) => {
          const risk = getRiskLevel(city.overall);
          return (
            <motion.div key={city.city} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="bg-card rounded-2xl border border-border ts-shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-foreground">{city.city}</p>
                  <span className={`text-[10px] font-bold ${risk.color}`}>{risk.label} Risk</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-muted flex flex-col items-center justify-center">
                  <p className={`text-lg font-bold ${risk.color}`}>{city.overall}</p>
                  <p className="text-[8px] text-muted-foreground">/100</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {factors.map(f => {
                  const val = city[f.key];
                  const Icon = f.icon;
                  const r = getRiskLevel(val);
                  return (
                    <div key={f.key} className="text-center">
                      <Icon className={`w-4 h-4 ${r.color} mx-auto mb-1`} />
                      <p className="text-[9px] text-muted-foreground">{f.label}</p>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div className={`h-1.5 rounded-full ${r.bg}`} style={{ width: `${val}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              {city.alerts.length > 0 && (
                <div className="flex items-start gap-2 bg-destructive/5 rounded-xl p-2 mt-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-[10px] text-muted-foreground">{city.alerts.join(" • ")}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
