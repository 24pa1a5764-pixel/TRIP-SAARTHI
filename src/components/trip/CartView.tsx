import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Trash2, Wand2, Briefcase } from "lucide-react";
import type { Place } from "@/lib/tripData";

interface CartViewProps {
  cart: Place[];
  toggleCart: (item: Place) => void;
  onBack: () => void;
  onGenerateItinerary: () => void;
  onGeneratePacking: () => void;
}

export default function CartView({ cart, toggleCart, onBack, onGenerateItinerary, onGeneratePacking }: CartViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col"
    >
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-display font-bold text-foreground">Your Chart</h2>
          <p className="text-[10px] text-muted-foreground">Review your selected destinations</p>
        </div>
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MapPin className="w-12 h-12 text-muted-foreground/20 mb-3" />
            <p className="text-sm text-muted-foreground mb-4">Your trip chart is completely empty.</p>
            <button
              onClick={onBack}
              className="text-xs font-bold text-primary underline"
            >
              Explore Places
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
              <img src={item.img} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{item.name}</p>
                <p className="text-[11px] text-muted-foreground">{item.loc}</p>
              </div>
              <button
                onClick={() => toggleCart(item)}
                className="text-destructive/60 p-2.5 hover:bg-destructive/10 rounded-full transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))
        )}
      </div>

      <div className="p-5 pt-2 space-y-2">
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
          <Wand2 className="w-4 h-4" /> Build My Itinerary
        </button>
      </div>
    </motion.div>
  );
}
