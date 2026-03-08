import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Zap, Wallet } from "lucide-react";
import { getLocalTransport } from "@/lib/featureData";

interface TransportFinderViewProps {
  city: string;
  onBack: () => void;
}

const CITIES = ["Delhi", "Mumbai"];

export default function TransportFinderView({ city, onBack }: TransportFinderViewProps) {
  const [selectedCity, setSelectedCity] = useState(city || "Delhi");
  const options = getLocalTransport(selectedCity);

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground">Transport Finder 🚕</h2>
          <p className="text-[10px] text-muted-foreground font-medium">Nearby transport options</p>
        </div>
      </div>

      <div className="px-5 pb-3 flex gap-2">
        {CITIES.map(c => (
          <button key={c} onClick={() => setSelectedCity(c)}
            className={`text-[10px] font-bold px-4 py-2 rounded-xl transition ${selectedCity === c ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>{c}</button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-3 ts-scrollbar-hide">
        {options.map((opt, i) => (
          <motion.div key={opt.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl ts-shadow-card border border-border p-4 flex items-center gap-4">
            <div className="text-3xl shrink-0">{opt.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-foreground">{opt.name}</p>
                {opt.isCheapest && <span className="text-[8px] font-bold bg-ts-green/10 text-ts-green px-1.5 py-0.5 rounded flex items-center gap-0.5"><Wallet className="w-2.5 h-2.5" /> Cheapest</span>}
                {opt.isFastest && <span className="text-[8px] font-bold bg-ts-saffron/10 text-ts-saffron px-1.5 py-0.5 rounded flex items-center gap-0.5"><Zap className="w-2.5 h-2.5" /> Fastest</span>}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> {opt.distance}</span>
                <span className="text-[10px] text-muted-foreground">⏱️ {opt.time}</span>
                <span className="text-[10px] font-bold text-foreground">{opt.cost}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
