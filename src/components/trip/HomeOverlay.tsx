import { motion } from "framer-motion";
import {
  Search, Landmark, Sunset, Coffee, Briefcase, ShieldAlert,
  ChevronRight, Wand2, Star, Zap, TrendingUp, Mountain,
} from "lucide-react";
import type { UserData, Place } from "@/lib/tripData";
import { MOCK_DATA } from "@/lib/tripData";

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
  { id: "adventure", icon: Mountain, label: "Adventure", color: "text-ts-sky", bg: "bg-ts-sky/10" },
  { id: "spiritual", icon: Star, label: "Spiritual", color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
];

const trending: Place[] = [
  MOCK_DATA.heritage[0], // Taj Mahal
  MOCK_DATA.nature[1], // Pangong Lake
  MOCK_DATA.adventure?.[0], // Rishikesh
].filter(Boolean) as Place[];

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
    <div className="h-full overflow-y-auto ts-scrollbar-hide">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-5 pt-5 pb-2 flex items-center justify-between"
      >
        <div>
          <p className="text-xs text-muted-foreground">Welcome back 🙏</p>
          <h1 className="text-xl font-display font-bold text-foreground">{user.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSafetyClick}
            className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center"
          >
            <ShieldAlert className="w-4 h-4 text-destructive" />
          </button>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-xl border-2 border-border object-cover"
          />
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="px-5 pb-4 pt-2"
      >
        <button
          onClick={onSearch}
          className="w-full flex items-center gap-3 bg-card rounded-2xl px-4 py-3.5 ts-shadow-card border border-border"
        >
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium flex-1 text-left">
            Search destinations, food, activities...
          </span>
          <div className="bg-muted px-2 py-1 rounded-lg">
            <span className="text-[9px] font-bold text-muted-foreground">AI</span>
          </div>
        </button>
      </motion.div>

      {/* Hero Banner */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-5 mb-5"
      >
        <div className="ts-gradient-hero rounded-3xl p-5 ts-shadow-elevated relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,white_0%,transparent_60%)]" />
          <div className="absolute top-3 right-3 bg-primary-foreground/10 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3 text-primary-foreground" />
            <span className="text-[10px] text-primary-foreground font-bold">AI Powered</span>
          </div>
          <div className="relative z-10">
            <h2 className="text-lg font-display font-bold text-primary-foreground mb-0.5">
              Plan Your Dream Trip
            </h2>
            <p className="text-primary-foreground/50 text-xs mb-4 max-w-[200px]">
              Select destinations, set preferences & let AI build your perfect itinerary
            </p>
            <button
              onClick={onStartJourney}
              className="bg-primary-foreground text-primary font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 transition active:scale-95 ts-shadow-card"
            >
              <Wand2 className="w-4 h-4" />
              Start Planning
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="px-5 mb-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display font-bold text-foreground">Explore Categories</h3>
          <span className="text-[10px] text-muted-foreground">{Object.keys(MOCK_DATA).length} types</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.03 }}
                onClick={() => onCategoryClick(cat.id)}
                className="flex flex-col items-center gap-2 bg-card p-3 rounded-2xl ts-shadow-card border border-border active:scale-95 transition"
              >
                <div className={`${cat.bg} p-2.5 rounded-xl`}>
                  <Icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <span className="text-[10px] font-bold text-foreground">{cat.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Trending */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="px-5 mb-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display font-bold text-foreground flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-ts-saffron" /> Trending Now
          </h3>
        </div>
        <div className="flex gap-3 overflow-x-auto ts-scrollbar-hide pb-1">
          {trending.map((place) => (
            <button
              key={place.name}
              onClick={() => onCategoryClick(place.category || "heritage")}
              className="shrink-0 w-[160px] bg-card rounded-2xl ts-shadow-card border border-border overflow-hidden active:scale-[0.98] transition text-left"
            >
              <img src={place.img} alt={place.name} className="w-full h-24 object-cover" />
              <div className="p-3">
                <p className="text-xs font-bold text-foreground truncate">{place.name}</p>
                <p className="text-[10px] text-muted-foreground">{place.loc}</p>
                {place.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-ts-saffron fill-ts-saffron" />
                    <span className="text-[10px] font-bold text-foreground">{place.rating}</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Spacer for floating cart */}
      {cartCount > 0 && <div className="h-20" />}

      {/* Floating Cart */}
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30"
        >
          <button
            onClick={onCartClick}
            className="ts-gradient-hero text-primary-foreground px-6 py-3.5 rounded-2xl ts-shadow-elevated flex items-center gap-3 font-bold text-sm active:scale-95 transition"
          >
            <span className="bg-primary-foreground/20 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">
              {cartCount}
            </span>
            <span>View Trip Chart</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
