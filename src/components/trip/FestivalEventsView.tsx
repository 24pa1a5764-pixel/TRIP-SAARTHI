import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { FESTIVALS } from "@/lib/featureData";

interface FestivalEventsViewProps {
  onBack: () => void;
}

export default function FestivalEventsView({ onBack }: FestivalEventsViewProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground">Festivals & Events 🎉</h2>
          <p className="text-[10px] text-muted-foreground font-medium">Experience local culture</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-3 ts-scrollbar-hide">
        {FESTIVALS.map((fest, i) => (
          <motion.div key={fest.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-card rounded-2xl ts-shadow-card border border-border overflow-hidden">
            <img src={fest.img} alt={fest.name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{fest.icon}</span>
                <p className="text-sm font-bold text-foreground">{fest.name}</p>
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded-lg ${fest.type === "festival" ? "bg-ts-saffron/10 text-ts-saffron" : fest.type === "fair" ? "bg-ts-purple/10 text-ts-purple" : "bg-ts-sky/10 text-ts-sky"}`}>
                  {fest.type.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">{fest.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {fest.loc}</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {fest.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
