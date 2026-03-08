import { motion } from "framer-motion";
import { X, Wand2, Check, Utensils, Clock, MapPin, IndianRupee } from "lucide-react";
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
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg ts-gradient-hero flex items-center justify-center">
            <Wand2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-display font-bold text-foreground">AI Generated</h2>
            <p className="text-[9px] text-muted-foreground">Powered by Saarthi AI</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition">
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Vibe Chips */}
      {!data.isPacking && (
        <div className="px-5 pb-3 flex gap-2 overflow-x-auto ts-scrollbar-hide shrink-0">
          {["Standard", "Adventurous", "Relaxed", "Historical", "Foodie"].map((vibe) => (
            <button
              key={vibe}
              onClick={() => onRegenerate(vibe)}
              className="shrink-0 bg-card border border-border px-4 py-1.5 rounded-full text-[11px] font-bold text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition"
            >
              {vibe === "Adventurous" && "⚡ "}
              {vibe === "Relaxed" && "😌 "}
              {vibe === "Historical" && "🏛️ "}
              {vibe === "Foodie" && "🍛 "}
              {vibe === "Standard" && "✨ "}
              {vibe}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 ts-scrollbar-hide">
        {data.isPacking ? (
          <div className="bg-card rounded-2xl p-5 ts-shadow-card border border-border">
            <h3 className="text-base font-display font-bold text-foreground mb-4">{data.title}</h3>
            <div className="space-y-1.5">
              {data.items?.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-muted/50 border border-border"
                >
                  <div className="w-5 h-5 rounded-md bg-ts-green/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-ts-green" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Title */}
            <div className="ts-gradient-hero rounded-2xl p-4 mb-4">
              <h3 className="text-sm font-display font-bold text-primary-foreground mb-1">{data.title}</h3>
              <p className="text-xs text-primary-foreground/70 italic">"{data.greeting}"</p>
            </div>

            {/* Timeline */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3 flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> Day Timeline
              </h3>
              <div className="space-y-2.5 relative">
                <div className="absolute left-[21px] top-4 bottom-4 w-[2px] bg-border" />
                {data.itinerary.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-card rounded-2xl p-4 ts-shadow-card border border-border relative pl-12"
                  >
                    <div className="absolute left-3 top-4 w-5 h-5 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-[10px] font-bold text-primary mb-1">{step.time}</p>
                    <p className="text-sm font-medium text-foreground mb-1.5">{step.plan}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <IndianRupee className="w-3 h-3" /> {step.cost}
                      </span>
                    </div>
                    <p className="text-[10px] text-ts-saffron mt-1.5 bg-ts-saffron/5 px-2 py-1 rounded-lg inline-block">
                      💡 {step.tip}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Foods */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3 flex items-center gap-1.5">
                <Utensils className="w-3 h-3" /> Must-Try Local Food
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {data.foods.map((food, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="bg-ts-rose/5 border border-ts-rose/10 rounded-xl p-3"
                  >
                    <p className="text-xs font-medium text-foreground">🍽 {food}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Save Button */}
      <div className="p-5 pt-2 shrink-0">
        <button
          onClick={data.isPacking ? onClose : onSave}
          className="w-full ts-gradient-hero text-primary-foreground font-bold py-4 rounded-2xl text-sm ts-shadow-elevated flex items-center justify-center gap-2 transition active:scale-[0.98]"
        >
          <Check className="w-4 h-4" />
          {data.isPacking ? "Done" : "Save Plan to Profile"}
        </button>
      </div>
    </motion.div>
  );
}
