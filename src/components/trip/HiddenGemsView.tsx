import { motion } from "framer-motion";
import { ArrowLeft, Gem, Star, MapPin, Sparkles } from "lucide-react";
import { HIDDEN_GEMS, type HiddenGem } from "@/lib/featureData";
import type { Place } from "@/lib/tripData";

interface HiddenGemsViewProps {
  onBack: () => void;
  onAddToCart: (place: Place) => void;
  cart: Place[];
}

export default function HiddenGemsView({ onBack, onAddToCart, cart }: HiddenGemsViewProps) {
  const toPlace = (gem: HiddenGem): Place => ({
    name: gem.name, loc: gem.loc, img: gem.img, lat: gem.lat, lng: gem.lng, rating: gem.rating, category: "nature",
    description: gem.secret, duration: "Full day", price: "Varies",
  });

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground">💎 Hidden Gems</h2>
          <p className="text-[10px] text-muted-foreground">Secret places tourists usually miss</p>
        </div>
        <div className="bg-ts-purple/10 px-2.5 py-1 rounded-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-ts-purple" />
          <span className="text-[9px] font-bold text-ts-purple">AI Picks</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3 ts-scrollbar-hide">
        {HIDDEN_GEMS.map((gem, i) => {
          const isInCart = cart.some(c => c.name === gem.name);
          return (
            <motion.div
              key={gem.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl ts-shadow-card border border-border overflow-hidden"
            >
              <div className="relative">
                <img src={gem.img} alt={gem.name} className="w-full h-36 object-cover" />
                <div className="absolute top-2 left-2 bg-ts-purple/90 backdrop-blur-sm text-primary-foreground text-[9px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Gem className="w-3 h-3" /> {gem.type}
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/60 to-transparent p-3 pt-8">
                  <p className="text-sm font-bold text-primary-foreground">{gem.name}</p>
                  <p className="text-[10px] text-primary-foreground/80 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {gem.loc}
                  </p>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-3 h-3 fill-ts-saffron text-ts-saffron" />
                  <span className="text-[10px] font-bold text-foreground">{gem.rating}</span>
                  <span className="text-[10px] text-muted-foreground">• Secret spot</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">🤫 {gem.secret}</p>
                <button
                  onClick={() => onAddToCart(toPlace(gem))}
                  className={`w-full text-[11px] font-bold py-2.5 rounded-xl transition active:scale-[0.98] ${
                    isInCart ? "bg-ts-green/10 text-ts-green" : "bg-foreground text-background"
                  }`}
                >
                  {isInCart ? "✓ Added to Trip" : "+ Add to Trip"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
