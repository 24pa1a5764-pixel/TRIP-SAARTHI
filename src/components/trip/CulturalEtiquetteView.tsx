import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, XCircle, BookOpen } from "lucide-react";
import { getCulturalEtiquette } from "@/lib/featureData";

interface CulturalEtiquetteViewProps {
  placeName: string;
  onBack: () => void;
}

export default function CulturalEtiquetteView({ placeName, onBack }: CulturalEtiquetteViewProps) {
  const { rules } = getCulturalEtiquette(placeName);

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground">🕌 Cultural Etiquette</h2>
          <p className="text-[10px] text-muted-foreground">{placeName}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 ts-scrollbar-hide">
        {/* Intro Card */}
        <div className="ts-gradient-saffron rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
            <span className="text-xs font-bold text-primary-foreground">Know Before You Go</span>
          </div>
          <p className="text-[11px] text-primary-foreground/70">
            Respecting local customs enriches your travel experience and shows appreciation for the culture.
          </p>
        </div>

        {/* Rules */}
        <div className="space-y-3">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-4 ts-shadow-card border border-border"
            >
              <div className="text-2xl mb-3">{rule.icon}</div>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="bg-ts-green/10 p-1 rounded-lg shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-ts-green" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-ts-green uppercase">Do</span>
                    <p className="text-xs text-foreground">{rule.do}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="bg-destructive/10 p-1 rounded-lg shrink-0 mt-0.5">
                    <XCircle className="w-3.5 h-3.5 text-destructive" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-destructive uppercase">Don't</span>
                    <p className="text-xs text-foreground">{rule.dont}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
