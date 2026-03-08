import { motion } from "framer-motion";
import {
  Landmark, MapPin, Briefcase, Utensils, Mountain, Star, Clock,
  TrendingUp, ChevronRight, Search, Heart
} from "lucide-react";
import { MOCK_DATA, flattenMockData, type Place } from "@/lib/tripData";
import { useState, useMemo } from "react";

interface DiscoverViewProps {
  onSelectCategory: (cat: string) => void;
  onAddToCart: (place: Place) => void;
  cart: Place[];
}

const categoryIcons: Record<string, { icon: typeof Landmark; color: string; bg: string }> = {
  heritage: { icon: Landmark, color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  nature: { icon: MapPin, color: "text-ts-green", bg: "bg-ts-green/10" },
  shopping: { icon: Briefcase, color: "text-ts-purple", bg: "bg-ts-purple/10" },
  food: { icon: Utensils, color: "text-ts-rose", bg: "bg-ts-rose/10" },
  adventure: { icon: Mountain, color: "text-ts-sky", bg: "bg-ts-sky/10" },
  spiritual: { icon: Star, color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
};

export default function DiscoverView({ onSelectCategory, onAddToCart, cart }: DiscoverViewProps) {
  const allPlaces = useMemo(() => flattenMockData(), []);
  const topRated = useMemo(() => [...allPlaces].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 6), [allPlaces]);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const toggleLike = (name: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <div className="h-full overflow-y-auto ts-scrollbar-hide">
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-xl font-display font-bold text-foreground mb-1">Discover</h1>
        <p className="text-xs text-muted-foreground">Find your next adventure</p>
      </div>

      {/* Categories Grid */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display font-bold text-foreground">Browse by Category</h3>
        </div>
        <div className="flex gap-2.5 overflow-x-auto ts-scrollbar-hide pb-1">
          {Object.entries(categoryIcons).map(([id, config]) => {
            const Icon = config.icon;
            const count = MOCK_DATA[id]?.length || 0;
            return (
              <button
                key={id}
                onClick={() => onSelectCategory(id)}
                className="shrink-0 bg-card p-3 rounded-2xl ts-shadow-card border border-border flex flex-col items-center gap-1.5 w-[76px] active:scale-95 transition"
              >
                <div className={`${config.bg} p-2 rounded-xl`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <span className="text-[9px] font-bold text-foreground capitalize">{id}</span>
                <span className="text-[8px] text-muted-foreground">{count} spots</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Rated */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display font-bold text-foreground flex items-center gap-1.5">
            <Star className="w-4 h-4 text-ts-saffron fill-ts-saffron" /> Top Rated
          </h3>
          <span className="text-[10px] text-muted-foreground">{topRated.length} places</span>
        </div>
        <div className="space-y-2.5">
          {topRated.map((place, i) => {
            const isInCart = cart.some(c => c.name === place.name);
            const catConfig = categoryIcons[place.category || "heritage"];
            const CatIcon = catConfig?.icon || Landmark;
            return (
              <motion.div
                key={place.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card rounded-2xl ts-shadow-card border border-border flex overflow-hidden"
              >
                <div className="relative w-24 shrink-0">
                  <img src={place.img} alt={place.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => toggleLike(place.name)}
                    className="absolute top-1.5 left-1.5 p-1 rounded-full bg-foreground/30 backdrop-blur-sm"
                  >
                    <Heart className={`w-3 h-3 ${liked.has(place.name) ? "fill-ts-rose text-ts-rose" : "text-primary-foreground"}`} />
                  </button>
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className="text-xs font-bold text-foreground truncate">{place.name}</p>
                      <div className={`${catConfig?.bg} p-0.5 rounded`}>
                        <CatIcon className={`w-2.5 h-2.5 ${catConfig?.color}`} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground">{place.loc}</span>
                      {place.rating && (
                        <span className="text-[10px] text-ts-saffron font-bold flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-ts-saffron" /> {place.rating}
                        </span>
                      )}
                    </div>
                    {place.duration && (
                      <span className="text-[9px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                        <Clock className="w-2.5 h-2.5" /> {place.duration} • {place.price}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onAddToCart(place)}
                    className={`self-end text-[9px] font-bold px-2.5 py-1 rounded-lg transition ${
                      isInCart
                        ? "bg-ts-green/10 text-ts-green"
                        : "bg-foreground text-background"
                    }`}
                  >
                    {isInCart ? "✓ Added" : "+ Add"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
}
