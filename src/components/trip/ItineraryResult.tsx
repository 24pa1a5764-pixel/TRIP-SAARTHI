import { motion } from "framer-motion";
import { X, Wand2, MapPin, Check, Utensils } from "lucide-react";
import type { ItineraryData } from "@/lib/tripData";

interface ItineraryResultProps {
  data: ItineraryData | null;
  onClose: () => void;
  onSave: () => void;
  onRegenerate: (vibe?: string) => void;
}

export default function ItineraryResult({ data, onClose, onSave, onRegenerate }: ItineraryResultProps) {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col"
    >
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-primary" /> AI Generated Plan
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition">
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Vibe Chips */}
      {!data.isPacking && (
        <div className="px-5 pb-3 flex gap-2 overflow-x-auto ts-scrollbar-hide">
          {["Standard", "Adventurous", "Relaxed", "Historical", "Foodie"].map((vibe) => (
            <button
              key={vibe}
              onClick={() => onRegenerate(vibe)}
              className="shrink-0 bg-card border border-border px-4 py-1.5 rounded-full text-[11px] font-bold text-muted-foreground hover:border-primary hover:text-primary transition"
            >
              {vibe}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {data.isPacking ? (
          <div className="bg-card rounded-2xl p-5 ts-shadow-card border border-border">
            <h3 className="text-base font-display font-bold text-foreground mb-4">{data.title}</h3>
            <div className="space-y-2">
              {data.items?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <Check className="w-4 h-4 text-ts-green shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="bg-primary/5 rounded-2xl p-4 mb-4">
              <p className="text-sm text-foreground italic">"{data.greeting}"</p>
            </div>

            <div className="mb-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3">Timeline</h3>
              <div className="space-y-3">
                {data.itinerary.map((step, idx) => (
                  <div key={idx} className="bg-card rounded-2xl p-4 ts-shadow-card border border-border">
                    <p className="text-[10px] font-bold text-primary mb-1">{step.time}</p>
                    <p className="text-sm font-bold text-foreground mb-1">{step.plan}</p>
                    <p className="text-[11px] text-muted-foreground">Est. Cost: {step.cost}</p>
                    <p className="text-[11px] text-ts-saffron mt-1">💡 {step.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3 flex items-center gap-1">
                <Utensils className="w-3 h-3" /> Local Eats to Try
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {data.foods.map((food, i) => (
                  <div key={i} className="bg-ts-rose/5 border border-ts-rose/10 rounded-xl p-3">
                    <p className="text-xs font-medium text-foreground">🍽 {food}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-5 pt-2">
        <button
          onClick={data.isPacking ? onClose : onSave}
          className="w-full ts-gradient-hero text-primary-foreground font-bold py-4 rounded-2xl text-sm ts-shadow-elevated flex items-center justify-center gap-2 transition active:scale-[0.98]"
        >
          <Check className="w-4 h-4" />
          {data.isPacking ? "Generated Successfully" : "Save Plan to Profile"}
        </button>
      </div>
    </motion.div>
  );
}
