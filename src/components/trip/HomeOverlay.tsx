import { motion } from "framer-motion";
import {
  Search, Landmark, Sunset, Coffee, Briefcase, ShieldAlert,
  ChevronRight, Wand2,
} from "lucide-react";
import type { UserData } from "@/lib/tripData";

interface HomeOverlayProps {
  user: UserData;
  cartCount: number;
  onSearch: () => void;
  onStartJourney: () => void;
  onCategoryClick: (cat: string) => void;
  onSafetyClick: () => void;
  onCartClick: () => void;
}

const categories = [
  { id: "heritage", icon: Landmark, label: "Heritage", color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  { id: "nature", icon: Sunset, label: "Nature", color: "text-ts-green", bg: "bg-ts-green/10" },
  { id: "food", icon: Coffee, label: "Food", color: "text-ts-rose", bg: "bg-ts-rose/10" },
  { id: "shopping", icon: Briefcase, label: "Markets", color: "text-ts-purple", bg: "bg-ts-purple/10" },
  { id: "safety", icon: ShieldAlert, label: "Safety", color: "text-destructive", bg: "bg-destructive/10" },
];

export default function HomeOverlay({
  user,
  cartCount,
  onSearch,
  onStartJourney,
  onCategoryClick,
  onSafetyClick,
  onCartClick,
}: HomeOverlayProps) {
  return (
    <div className="h-full overflow-y-auto ts-scrollbar-hide pb-4">
      {/* Search Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-5 pt-4 pb-3"
      >
        <button
          onClick={onSearch}
          className="w-full flex items-center gap-3 bg-card rounded-2xl px-4 py-3.5 ts-shadow-card border border-border"
        >
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">Where do you want to go?</span>
        </button>
      </motion.div>

      {/* Hero Banner */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-5 mb-5"
      >
        <div className="ts-gradient-hero rounded-3xl p-6 ts-shadow-elevated relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,white_0%,transparent_60%)]" />
          <div className="relative z-10">
            <h2 className="text-xl font-display font-bold text-primary-foreground mb-1">
              Design Your Trip
            </h2>
            <p className="text-primary-foreground/60 text-xs mb-5">
              Let AI plan the perfect itinerary
            </p>
            <button
              onClick={onStartJourney}
              className="bg-card/20 backdrop-blur-sm text-primary-foreground font-bold text-xs py-3 px-5 rounded-xl border border-primary-foreground/20 flex items-center gap-2 transition active:scale-95"
            >
              <Wand2 className="w-4 h-4" />
              Start Planning
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Categories */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-5 mb-5"
      >
        <div className="flex gap-3 overflow-x-auto ts-scrollbar-hide pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => (cat.id === "safety" ? onSafetyClick() : onCategoryClick(cat.id))}
                className="shrink-0 flex flex-col items-center gap-2 bg-card p-3.5 rounded-2xl ts-shadow-card border border-border w-[84px] active:scale-95 transition"
              >
                <div className={`${cat.bg} p-2.5 rounded-xl`}>
                  <Icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <span className="text-[10px] font-bold text-foreground">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Greeting */}
      <div className="px-5 mb-4">
        <p className="text-xs text-muted-foreground">
          Welcome back, <span className="font-bold text-foreground">{user.name}</span> 🙏
        </p>
      </div>

      {/* Floating Cart */}
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30"
        >
          <button
            onClick={onCartClick}
            className="ts-gradient-hero text-primary-foreground px-6 py-3 rounded-2xl ts-shadow-elevated flex items-center gap-3 font-bold text-sm active:scale-95 transition"
          >
            <span className="bg-primary-foreground/20 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">
              {cartCount}
            </span>
            <span>View Chart</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
