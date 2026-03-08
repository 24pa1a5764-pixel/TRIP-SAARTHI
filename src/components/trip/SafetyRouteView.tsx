import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";
import { getSafetyRoutes } from "@/lib/featureData";

interface SafetyRouteViewProps {
  city: string;
  onBack: () => void;
}

export default function SafetyRouteView({ city, onBack }: SafetyRouteViewProps) {
  const routes = getSafetyRoutes(city);

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground">🚨 Safety Scanner</h2>
          <p className="text-[10px] text-muted-foreground">{city} area safety report</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 ts-scrollbar-hide">
        <div className="space-y-2.5">
          {routes.map((route, i) => (
            <motion.div
              key={route.area}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-4 ts-shadow-card border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-foreground">{route.area}</span>
                <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                  route.safetyScore >= 80 ? "bg-ts-green/10 text-ts-green" :
                  route.safetyScore >= 60 ? "bg-ts-saffron/10 text-ts-saffron" :
                  "bg-destructive/10 text-destructive"
                }`}>
                  {route.safetyScore}/100
                </div>
              </div>

              {/* Safety Bar */}
              <div className="w-full h-2 bg-muted rounded-full mb-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${route.safetyScore}%` }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
                  className={`h-full rounded-full ${
                    route.safetyScore >= 80 ? "bg-ts-green" :
                    route.safetyScore >= 60 ? "bg-ts-saffron" :
                    "bg-destructive"
                  }`}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="text-center bg-muted/50 rounded-lg p-2">
                  <span className="text-[8px] text-muted-foreground">Lighting</span>
                  <p className="text-[10px] font-bold text-foreground">{route.lighting}</p>
                </div>
                <div className="text-center bg-muted/50 rounded-lg p-2">
                  <span className="text-[8px] text-muted-foreground">Crowds</span>
                  <p className="text-[10px] font-bold text-foreground">{route.crowdLevel}</p>
                </div>
                <div className="text-center bg-muted/50 rounded-lg p-2">
                  <span className="text-[8px] text-muted-foreground">Police</span>
                  <p className="text-[10px] font-bold text-foreground">{route.policeNearby ? "✓ Nearby" : "✗ Far"}</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-2.5 flex items-start gap-2">
                <Lightbulb className="w-3 h-3 text-ts-saffron mt-0.5 shrink-0" />
                <span className="text-[10px] text-muted-foreground">{route.tip}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
