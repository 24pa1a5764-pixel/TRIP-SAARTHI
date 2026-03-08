import { motion } from "framer-motion";
import { ArrowLeft, TrendingDown, IndianRupee, Lightbulb } from "lucide-react";
import { getBudgetOptimizations } from "@/lib/featureData";

interface BudgetOptimizerViewProps {
  budget: string;
  onBack: () => void;
}

export default function BudgetOptimizerView({ budget, onBack }: BudgetOptimizerViewProps) {
  const suggestions = getBudgetOptimizations(budget);
  const totalSaved = suggestions.reduce((acc, s) => acc + parseInt(s.saving.replace(/[^\d]/g, "") || "0"), 0);

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground">💰 Budget Optimizer</h2>
          <p className="text-[10px] text-muted-foreground">Smart savings for your trip</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 ts-scrollbar-hide">
        {/* Savings Banner */}
        <div className="ts-gradient-hero rounded-2xl p-4 mb-4 text-center">
          <p className="text-[10px] text-primary-foreground/60 mb-1">Potential Daily Savings</p>
          <p className="text-2xl font-display font-bold text-primary-foreground">₹{totalSaved.toLocaleString()}</p>
          <p className="text-[10px] text-primary-foreground/50 mt-1">Without compromising your experience</p>
        </div>

        {/* Suggestions */}
        <div className="space-y-2.5">
          {suggestions.map((s, i) => (
            <motion.div
              key={s.category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-card rounded-2xl p-4 ts-shadow-card border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-sm font-bold text-foreground">{s.category}</span>
                </div>
                <span className="text-[10px] font-bold text-ts-green bg-ts-green/10 px-2 py-0.5 rounded-md">
                  Save {s.saving}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-muted-foreground">Typical</span>
                    <span className="text-foreground font-bold line-through opacity-50">{s.original}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-ts-green font-bold">Optimized</span>
                    <span className="text-ts-green font-bold">{s.optimized}</span>
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 rounded-xl p-2.5 flex items-start gap-2">
                <Lightbulb className="w-3 h-3 text-ts-saffron mt-0.5 shrink-0" />
                <span className="text-[10px] text-muted-foreground">{s.tip}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
