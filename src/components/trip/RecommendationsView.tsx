import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Plus, X, Loader2, Star, Clock, ChevronRight, Info } from "lucide-react";
import { MOCK_DATA, type Place } from "@/lib/tripData";

interface RecommendationsViewProps {
  category: string;
  cart: Place[];
  toggleCart: (item: Place) => void;
  onBack: () => void;
  onViewCart: () => void;
}

const categoryTitles: Record<string, { title: string; emoji: string }> = {
  heritage: { title: "Heritage Sites", emoji: "🏛️" },
  nature: { title: "Nature Escapes", emoji: "🌿" },
  food: { title: "Food Trails", emoji: "🍛" },
  shopping: { title: "Market Hubs", emoji: "🛍️" },
  adventure: { title: "Adventures", emoji: "⛰️" },
  spiritual: { title: "Spiritual Journeys", emoji: "🕉️" },
};

export default function RecommendationsView({
  category,
  cart,
  toggleCart,
  onBack,
  onViewCart,
}: RecommendationsViewProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const places = MOCK_DATA[category] || MOCK_DATA.heritage;
  const catInfo = categoryTitles[category] || { title: category, emoji: "📍" };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground">
            {catInfo.emoji} {catInfo.title}
          </h2>
          <p className="text-[10px] text-muted-foreground">{places.length} destinations available</p>
        </div>
        <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1.5 rounded-full">
          {cart.length} in cart
        </span>
      </div>

      {/* Place Cards */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4 ts-scrollbar-hide">
        {places.map((item, i) => {
          const isSelected = cart.some((c) => c.name === item.name);
          const isExpanded = expandedCard === item.name;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-3xl ts-shadow-card border border-border overflow-hidden"
            >
              <div className="relative">
                <img src={item.img} alt={item.name} className="w-full h-44 object-cover" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {item.rating && (
                    <span className="bg-foreground/70 backdrop-blur-sm text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                      <Star className="w-3 h-3 fill-ts-saffron text-ts-saffron" /> {item.rating}
                    </span>
                  )}
                  {item.price && (
                    <span className="bg-foreground/70 backdrop-blur-sm text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-lg">
                      {item.price}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-ts-green text-primary-foreground text-[9px] font-bold px-2 py-1 rounded-lg">
                    ✓ Added
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-foreground">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                        <MapPin className="w-3 h-3" /> {item.loc}
                      </span>
                      {item.duration && (
                        <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                          <Clock className="w-3 h-3" /> {item.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : item.name)}
                    className="p-1.5 rounded-lg bg-muted hover:bg-primary/10 transition"
                  >
                    <Info className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>

                {isExpanded && item.description && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="text-xs text-muted-foreground mt-2 leading-relaxed"
                  >
                    {item.description}
                  </motion.p>
                )}

                <button
                  onClick={() => toggleCart(item)}
                  className={`w-full mt-3 text-[11px] font-bold py-2.5 rounded-xl transition active:scale-[0.98] flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-destructive/10 text-destructive border border-destructive/20"
                      : "bg-foreground text-background"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <X className="w-3 h-3" /> REMOVE FROM TRIP
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" /> ADD TO TRIP
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      {cart.length > 0 && (
        <div className="p-5 pt-2 shrink-0">
          <button
            onClick={onViewCart}
            className="w-full ts-gradient-hero text-primary-foreground font-bold py-3.5 rounded-2xl text-sm ts-shadow-elevated flex items-center justify-center gap-2 transition active:scale-95"
          >
            View Trip Chart ({cart.length}) <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
