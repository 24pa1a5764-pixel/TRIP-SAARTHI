import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Plus, X, Loader2, ChevronRight } from "lucide-react";
import { MOCK_DATA, fetchWithRetry, type Place } from "@/lib/tripData";

interface RecommendationsViewProps {
  category: string;
  cart: Place[];
  toggleCart: (item: Place) => void;
  onBack: () => void;
  onViewCart: () => void;
}

const apiKey = "";

export default function RecommendationsView({
  category,
  cart,
  toggleCart,
  onBack,
  onViewCart,
}: RecommendationsViewProps) {
  const [loadingInsight, setLoadingInsight] = useState<string | null>(null);
  const places = MOCK_DATA[category] || MOCK_DATA.heritage;

  const handleInsight = async (placeName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingInsight(placeName);
    const prompt = `Fascinating cultural secret or survival tip about ${placeName} for a tourist. Keep it punchy and under 150 chars. No Markdown.`;
    const payload = { contents: [{ parts: [{ text: prompt }] }] };
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const result = await fetchWithRetry(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      alert(`✨ Saarthi Insight for ${placeName}:\n\n${text}`);
    } catch {
      alert("Insight failed to load. Please check your connection.");
    } finally {
      setLoadingInsight(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col"
    >
      <div className="px-5 pt-4 pb-3 flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-lg font-display font-bold text-foreground capitalize flex-1">{category}</h2>
        <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full">
          {cart.length} Added
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4">
        {places.map((item, i) => {
          const isSelected = cart.some((c) => c.name === item.name);
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-3xl ts-shadow-card border border-border overflow-hidden"
            >
              <img src={item.img} alt={item.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-foreground">{item.name}</h3>
                  <button
                    onClick={(e) => handleInsight(item.name, e)}
                    disabled={loadingInsight === item.name}
                    className="text-[9px] bg-ts-purple/10 hover:bg-ts-purple/20 text-ts-purple px-2 py-1 rounded-lg font-black transition flex items-center gap-1 shrink-0"
                  >
                    {loadingInsight === item.name ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      "✨ INSIGHT"
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3" /> {item.loc}
                </p>
                <button
                  onClick={() => toggleCart(item)}
                  className={`w-full text-[11px] font-bold py-2.5 rounded-xl transition active:scale-[0.98] flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-destructive/10 text-destructive border border-destructive/20"
                      : "bg-foreground text-background"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <X className="w-3 h-3" /> REMOVE
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

      {cart.length > 0 && (
        <div className="p-5 pt-2">
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
