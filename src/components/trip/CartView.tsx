import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Trash2, Wand2, Briefcase, ChevronRight, Star, TrendingDown, Leaf } from "lucide-react";
import type { Place } from "@/lib/tripData";
import { useTranslation } from "@/hooks/useTranslation";

interface CartViewProps {
  cart: Place[];
  toggleCart: (item: Place) => void;
  onBack: () => void;
  onGenerateItinerary: () => void;
  onGeneratePacking: () => void;
  onBudgetOptimizer: () => void;
  onCarbonFootprint: () => void;
}

export default function CartView({ cart, toggleCart, onBack, onGenerateItinerary, onGeneratePacking, onBudgetOptimizer, onCarbonFootprint }: CartViewProps) {
  const { t } = useTranslation();
  const uniqueLocations = [...new Set(cart.map(p => p.loc))];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col"
    >
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground">{t("trip_chart")}</h2>
          <p className="text-[10px] text-muted-foreground">
            {cart.length} {t("places")} • {uniqueLocations.length} {t("cities")}
          </p>
        </div>
      </div>

      {cart.length > 0 && (
        <div className="px-5 mb-3">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-3 flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold text-foreground">
                {uniqueLocations.join(" → ")}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {cart.reduce((acc, p) => acc + (p.rating || 0), 0) / cart.length >= 4.5 ? "⭐ Highly rated selections!" : "Great mix of destinations"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-2.5 ts-scrollbar-hide">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-muted-foreground/30" />
            </div>
            <p className="text-sm font-bold text-foreground mb-1">No places added yet</p>
            <p className="text-xs text-muted-foreground mb-4">
              Go back and explore categories to add destinations
            </p>
            <button onClick={onBack} className="text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-xl">
              ← Explore Places
            </button>
          </div>
        ) : (
          cart.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card p-3 rounded-2xl flex items-center gap-3 ts-shadow-card border border-border"
            >
              <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{item.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-muted-foreground">{item.loc}</span>
                  {item.rating && (
                    <span className="text-[10px] text-ts-saffron font-bold flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-ts-saffron" /> {item.rating}
                    </span>
                  )}
                </div>
                {item.duration && (
                  <span className="text-[9px] text-muted-foreground">{item.duration} • {item.price}</span>
                )}
              </div>
              <button
                onClick={() => toggleCart(item)}
                className="text-destructive/60 p-2.5 hover:bg-destructive/10 rounded-xl transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-2 space-y-2 shrink-0">
        {cart.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={onBudgetOptimizer}
              className="flex-1 bg-card border border-border text-foreground font-bold py-2.5 rounded-xl text-[10px] ts-shadow-card flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
            >
              <TrendingDown className="w-3.5 h-3.5" /> Budget AI
            </button>
            <button
              onClick={onCarbonFootprint}
              className="flex-1 bg-card border border-border text-foreground font-bold py-2.5 rounded-xl text-[10px] ts-shadow-card flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
            >
              <Leaf className="w-3.5 h-3.5" /> Eco Track
            </button>
          </div>
        )}
        <button
          onClick={onGeneratePacking}
          disabled={cart.length === 0}
          className="w-full bg-card border border-border text-foreground font-bold py-3.5 rounded-2xl text-sm ts-shadow-card flex items-center justify-center gap-2 transition active:scale-[0.98] disabled:opacity-40"
        >
          <Briefcase className="w-4 h-4" /> ✨ Smart Packing List
        </button>
        <button
          onClick={onGenerateItinerary}
          disabled={cart.length === 0}
          className="w-full ts-gradient-hero text-primary-foreground font-bold py-4 rounded-2xl text-sm ts-shadow-elevated flex items-center justify-center gap-2 transition active:scale-[0.98] disabled:opacity-40"
        >
          <Wand2 className="w-4 h-4" /> Build AI Itinerary
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
