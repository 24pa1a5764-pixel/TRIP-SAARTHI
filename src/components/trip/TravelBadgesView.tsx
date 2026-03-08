import { motion } from "framer-motion";
import { ArrowLeft, Lock, Check } from "lucide-react";
import { TRAVEL_BADGES } from "@/lib/featureData";

interface TravelBadgesViewProps {
  onBack: () => void;
  savedTripsCount: number;
  visitedCategories: string[];
}

export default function TravelBadgesView({ onBack, savedTripsCount, visitedCategories }: TravelBadgesViewProps) {
  const isUnlocked = (badge: typeof TRAVEL_BADGES[0]): boolean => {
    if (badge.id === "trip_master") return savedTripsCount >= 5;
    if (badge.id === "food_connoisseur") return visitedCategories.filter(c => c === "food").length >= 5;
    if (badge.id === "temple_explorer") {
      return visitedCategories.filter(c => c === "heritage" || c === "spiritual").length >= 3;
    }
    if (badge.id === "mountain_traveler") {
      return visitedCategories.filter(c => c === "nature" || c === "adventure").length >= 3;
    }
    return savedTripsCount >= 1; // basic unlock for demo
  };

  const unlockedCount = TRAVEL_BADGES.filter(b => isUnlocked(b)).length;

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground">Travel Badges 🏅</h2>
          <p className="text-[10px] text-muted-foreground font-medium">{unlockedCount}/{TRAVEL_BADGES.length} unlocked</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-5 pb-4">
        <div className="w-full bg-muted rounded-full h-2.5">
          <motion.div initial={{ width: 0 }} animate={{ width: `${(unlockedCount / TRAVEL_BADGES.length) * 100}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-ts-saffron h-2.5 rounded-full" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 ts-scrollbar-hide">
        <div className="grid grid-cols-2 gap-3">
          {TRAVEL_BADGES.map((badge, i) => {
            const unlocked = isUnlocked(badge);
            return (
              <motion.div key={badge.id} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.05 }}
                className={`bg-card rounded-2xl ts-shadow-card border border-border p-4 text-center relative ${!unlocked ? "opacity-60" : ""}`}>
                {unlocked && (
                  <div className="absolute top-2 right-2 bg-ts-green/10 p-1 rounded-full">
                    <Check className="w-3 h-3 text-ts-green" />
                  </div>
                )}
                {!unlocked && (
                  <div className="absolute top-2 right-2 bg-muted p-1 rounded-full">
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
                <p className="text-3xl mb-2">{badge.emoji}</p>
                <p className="text-xs font-bold text-foreground">{badge.name}</p>
                <p className="text-[9px] text-muted-foreground mt-0.5">{badge.description}</p>
                <p className={`text-[8px] mt-2 font-bold px-2 py-1 rounded-lg ${unlocked ? `${badge.bg} ${badge.color}` : "bg-muted text-muted-foreground"}`}>
                  {unlocked ? "✓ Unlocked" : badge.requirement}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
