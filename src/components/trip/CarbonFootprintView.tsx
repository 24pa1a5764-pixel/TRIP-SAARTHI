import { motion } from "framer-motion";
import { ArrowLeft, Leaf, TrendingDown, Recycle } from "lucide-react";
import { getCarbonFootprint } from "@/lib/featureData";
import type { Place } from "@/lib/tripData";

interface CarbonFootprintViewProps {
  cart: Place[];
  onBack: () => void;
}

export default function CarbonFootprintView({ cart, onBack }: CarbonFootprintViewProps) {
  const { total, data, tips } = getCarbonFootprint(cart);

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground">🌱 Carbon Footprint</h2>
          <p className="text-[10px] text-muted-foreground">Track your environmental impact</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 ts-scrollbar-hide">
        {/* Total Impact */}
        <div className="ts-gradient-nature rounded-2xl p-4 mb-4 text-center">
          <Leaf className="w-8 h-8 text-primary-foreground mx-auto mb-2" />
          <p className="text-[10px] text-primary-foreground/60 mb-1">Estimated Trip Carbon Footprint</p>
          <p className="text-2xl font-display font-bold text-primary-foreground">{total}</p>
          <p className="text-[10px] text-primary-foreground/50 mt-1">{cart.length} destinations • See how to reduce below</p>
        </div>

        {/* Breakdown */}
        <h3 className="text-xs font-bold text-foreground mb-3 flex items-center gap-1.5">
          <TrendingDown className="w-3.5 h-3.5 text-ts-green" /> Eco Alternatives
        </h3>
        <div className="space-y-2.5 mb-4">
          {data.map((d, i) => (
            <motion.div
              key={d.transport}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-3.5 ts-shadow-card border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-foreground">{d.transport}</span>
                <span className="text-[10px] text-destructive font-bold">{d.co2}</span>
              </div>
              <div className="bg-ts-green/5 border border-ts-green/10 rounded-xl p-2.5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-ts-green font-bold uppercase">Eco Choice</span>
                  <p className="text-xs text-foreground">{d.ecoAlternative}</p>
                </div>
                <span className="text-[10px] font-bold text-ts-green bg-ts-green/10 px-2 py-0.5 rounded-md">{d.ecoSaving}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <h3 className="text-xs font-bold text-foreground mb-3 flex items-center gap-1.5">
          <Recycle className="w-3.5 h-3.5 text-ts-green" /> Green Travel Tips
        </h3>
        <div className="space-y-2">
          {tips.map((tip, i) => (
            <div key={i} className="bg-muted/50 rounded-xl p-3 text-xs text-foreground">{tip}</div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
