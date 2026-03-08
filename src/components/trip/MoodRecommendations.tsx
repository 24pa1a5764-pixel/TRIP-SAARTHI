import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { MOOD_OPTIONS } from "@/lib/featureData";

interface MoodRecommendationsProps {
  onBack: () => void;
  onSelectMood: (categories: string[]) => void;
}

export default function MoodRecommendations({ onBack, onSelectMood }: MoodRecommendationsProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground">🎭 What's Your Mood?</h2>
          <p className="text-[10px] text-muted-foreground">We'll suggest the perfect places</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 ts-scrollbar-hide">
        <div className="ts-gradient-hero rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
            <span className="text-xs font-bold text-primary-foreground">AI Mood Match</span>
          </div>
          <p className="text-[11px] text-primary-foreground/60">Select your current mood and we'll curate destinations that match your energy</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {MOOD_OPTIONS.map((mood, i) => (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => onSelectMood(mood.categories)}
              className="bg-card rounded-2xl p-4 ts-shadow-card border border-border text-left active:scale-95 transition flex flex-col items-center"
            >
              <span className="text-3xl mb-2">{mood.emoji}</span>
              <span className="text-sm font-bold text-foreground">{mood.label}</span>
              <span className="text-[10px] text-muted-foreground text-center mt-0.5">{mood.description}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
