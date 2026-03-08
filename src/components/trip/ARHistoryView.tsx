import { motion } from "framer-motion";
import { ArrowLeft, History, Sparkles, Eye } from "lucide-react";
import { getARHistory } from "@/lib/featureData";

interface ARHistoryViewProps {
  placeName: string;
  onBack: () => void;
}

export default function ARHistoryView({ placeName, onBack }: ARHistoryViewProps) {
  const history = getARHistory(placeName);

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground">🏛️ AR History View</h2>
          <p className="text-[10px] text-muted-foreground">{placeName}</p>
        </div>
        <div className="bg-ts-saffron/10 px-2.5 py-1 rounded-lg flex items-center gap-1">
          <Eye className="w-3 h-3 text-ts-saffron" />
          <span className="text-[9px] font-bold text-ts-saffron">AR</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 ts-scrollbar-hide">
        {/* AR Simulation Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-4">
          <div className="bg-gradient-to-br from-foreground/80 to-foreground/60 p-6 text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 mx-auto rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mb-3 border border-primary-foreground/20"
            >
              <Eye className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <p className="text-sm font-bold text-primary-foreground mb-1">Point Camera at Monument</p>
            <p className="text-[10px] text-primary-foreground/50">AR view will overlay historical imagery</p>
            <div className="mt-3 bg-primary-foreground/10 backdrop-blur-sm px-3 py-1.5 rounded-full inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-ts-saffron" />
              <span className="text-[9px] text-primary-foreground font-bold">AR Feature Preview</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3 flex items-center gap-1.5">
          <History className="w-3 h-3" /> Historical Timeline
        </h3>
        <div className="space-y-3 relative">
          <div className="absolute left-[17px] top-6 bottom-6 w-[2px] bg-border" />
          {history.map((era, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-4 ts-shadow-card border border-border relative pl-10"
            >
              <div className="absolute left-2.5 top-4 w-4 h-4 rounded-full bg-ts-saffron/10 border-2 border-ts-saffron flex items-center justify-center z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-ts-saffron" />
              </div>
              <span className="text-[9px] font-bold text-ts-saffron bg-ts-saffron/10 px-2 py-0.5 rounded-md">{era.year}</span>
              <h4 className="text-sm font-bold text-foreground mt-1.5">{era.era}</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{era.description}</p>
              <div className="mt-2 bg-ts-purple/5 border border-ts-purple/10 rounded-xl p-2.5">
                <p className="text-[10px] text-ts-purple">💡 Fun Fact: {era.funFact}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
