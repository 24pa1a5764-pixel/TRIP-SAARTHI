import { motion } from "framer-motion";
import { ArrowLeft, Camera, Clock, Star, Sunrise, Sunset, Moon, Sun } from "lucide-react";
import { PHOTO_SPOTS } from "@/lib/featureData";

interface PhotoSpotFinderViewProps {
  onBack: () => void;
}

const typeIcons: Record<string, { icon: string; label: string; color: string; bg: string }> = {
  sunrise: { icon: "🌅", label: "Sunrise", color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  sunset: { icon: "🌇", label: "Sunset", color: "text-ts-rose", bg: "bg-ts-rose/10" },
  golden_hour: { icon: "✨", label: "Golden Hour", color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  night: { icon: "🌙", label: "Night", color: "text-ts-purple", bg: "bg-ts-purple/10" },
  anytime: { icon: "📸", label: "Anytime", color: "text-ts-sky", bg: "bg-ts-sky/10" },
};

export default function PhotoSpotFinderView({ onBack }: PhotoSpotFinderViewProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground">Photo Spots 📸</h2>
          <p className="text-[10px] text-muted-foreground font-medium">Best photography locations</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-3 ts-scrollbar-hide">
        {PHOTO_SPOTS.map((spot, i) => {
          const typeInfo = typeIcons[spot.type];
          return (
            <motion.div key={spot.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="bg-card rounded-2xl ts-shadow-card border border-border overflow-hidden">
              <div className="relative">
                <img src={spot.img} alt={spot.name} className="w-full h-36 object-cover" />
                <div className={`absolute top-2 right-2 ${typeInfo.bg} backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1`}>
                  <span className="text-sm">{typeInfo.icon}</span>
                  <span className={`text-[9px] font-bold ${typeInfo.color}`}>{typeInfo.label}</span>
                </div>
                <div className="absolute bottom-2 left-2 bg-foreground/60 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Star className="w-3 h-3 text-ts-saffron fill-ts-saffron" />
                  <span className="text-[10px] font-bold text-primary-foreground">{spot.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-foreground">{spot.name}</p>
                <p className="text-[10px] text-muted-foreground">{spot.loc}</p>
                <div className="flex items-center gap-1.5 mt-2 bg-muted/50 rounded-xl px-3 py-2">
                  <Clock className="w-3.5 h-3.5 text-ts-saffron" />
                  <span className="text-[10px] font-bold text-foreground">Best: {spot.bestTime}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 bg-ts-sky/5 rounded-xl px-3 py-2">
                  <Camera className="w-3.5 h-3.5 text-ts-sky" />
                  <span className="text-[10px] text-muted-foreground">{spot.tip}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
