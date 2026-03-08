import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Leaf, Drumstick, Filter, Heart } from "lucide-react";
import { FOOD_SPOTS, type FoodSpot } from "@/lib/featureData";

interface FoodFinderViewProps {
  onBack: () => void;
}

export default function FoodFinderView({ onBack }: FoodFinderViewProps) {
  const [filter, setFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [priceFilter, setPriceFilter] = useState<"all" | "budget" | "mid" | "premium">("all");
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const filtered = FOOD_SPOTS.filter(f => {
    if (filter !== "all" && f.type !== filter && f.type !== "both") return false;
    if (priceFilter !== "all" && f.priceRange !== priceFilter) return false;
    return true;
  });

  const toggleLike = (name: string) => {
    setLiked(prev => { const n = new Set(prev); n.has(name) ? n.delete(name) : n.add(name); return n; });
  };

  const hygieneStars = (n: number) => "⭐".repeat(n) + "☆".repeat(5 - n);

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground">Smart Food Finder 🍲</h2>
          <p className="text-[10px] text-muted-foreground font-medium">Famous local food near you</p>
        </div>
      </div>

      {/* Filters */}
      <div className="px-5 pb-3 space-y-2">
        <div className="flex gap-2">
          {(["all", "veg", "non-veg"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition ${filter === f ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
              {f === "veg" && <Leaf className="w-3 h-3" />}
              {f === "non-veg" && <Drumstick className="w-3 h-3" />}
              {f === "all" && <Filter className="w-3 h-3" />}
              {f === "all" ? "All" : f === "veg" ? "Veg" : "Non-Veg"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(["all", "budget", "mid", "premium"] as const).map(p => (
            <button key={p} onClick={() => setPriceFilter(p)}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition ${priceFilter === p ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
              {p === "all" ? "Any Price" : p === "budget" ? "₹ Budget" : p === "mid" ? "₹₹ Mid" : "₹₹₹ Premium"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-3 ts-scrollbar-hide">
        {filtered.map((food, i) => (
          <motion.div key={food.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-card rounded-2xl ts-shadow-card border border-border flex overflow-hidden">
            <div className="relative w-24 shrink-0">
              <img src={food.img} alt={food.name} className="w-full h-full object-cover" />
              <button onClick={() => toggleLike(food.name)} className="absolute top-1.5 left-1.5 p-1 rounded-full bg-foreground/30 backdrop-blur-sm">
                <Heart className={`w-3 h-3 ${liked.has(food.name) ? "fill-ts-rose text-ts-rose" : "text-primary-foreground"}`} />
              </button>
              <span className={`absolute bottom-1 right-1 text-[8px] font-bold px-1.5 py-0.5 rounded ${food.type === "veg" ? "bg-ts-green/90 text-primary-foreground" : food.type === "non-veg" ? "bg-destructive/90 text-primary-foreground" : "bg-ts-saffron/90 text-primary-foreground"}`}>
                {food.type === "veg" ? "🟢 VEG" : food.type === "non-veg" ? "🔴 NON-VEG" : "🟡 BOTH"}
              </span>
            </div>
            <div className="flex-1 p-3">
              <p className="text-xs font-bold text-foreground">{food.name}</p>
              <p className="text-[10px] text-muted-foreground">{food.loc} • {food.dish}</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">{food.description}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] font-bold text-foreground">{food.price}</span>
                <span className="text-[10px] text-ts-saffron flex items-center gap-0.5"><Star className="w-2.5 h-2.5 fill-ts-saffron" /> {food.rating}</span>
              </div>
              <p className="text-[9px] text-muted-foreground mt-0.5">Hygiene: {hygieneStars(food.hygieneRating)}</p>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && <p className="text-center text-sm text-muted-foreground py-10">No food spots match your filters</p>}
      </div>
    </motion.div>
  );
}
