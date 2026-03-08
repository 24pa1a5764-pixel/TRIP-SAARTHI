import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Volume2 } from "lucide-react";
import { TRAVEL_PHRASES, type PhraseTranslation } from "@/lib/featureData";

interface LanguageAssistantViewProps {
  onBack: () => void;
}

const LANGUAGES = ["hindi", "telugu", "tamil", "bengali", "marathi"] as const;
type Language = typeof LANGUAGES[number];

const CATEGORIES = ["all", "greeting", "essential", "shopping", "food", "travel", "emergency"];

export default function LanguageAssistantView({ onBack }: LanguageAssistantViewProps) {
  const [language, setLanguage] = useState<Language>("hindi");
  const [category, setCategory] = useState("all");

  const filtered = category === "all" ? TRAVEL_PHRASES : TRAVEL_PHRASES.filter(p => p.category === category);

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground">Language Assistant 🌍</h2>
          <p className="text-[10px] text-muted-foreground font-medium">Communicate with locals</p>
        </div>
      </div>

      {/* Language selector */}
      <div className="px-5 pb-2 flex gap-2 overflow-x-auto ts-scrollbar-hide">
        {LANGUAGES.map(l => (
          <button key={l} onClick={() => setLanguage(l)}
            className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition capitalize whitespace-nowrap ${language === l ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>{l}</button>
        ))}
      </div>

      {/* Category filter */}
      <div className="px-5 pb-3 flex gap-2 overflow-x-auto ts-scrollbar-hide">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`text-[9px] font-bold px-2.5 py-1 rounded-lg transition capitalize whitespace-nowrap ${category === c ? "bg-ts-saffron/10 text-ts-saffron" : "bg-muted text-muted-foreground"}`}>
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-3 ts-scrollbar-hide">
        {filtered.map((phrase, i) => (
          <motion.div key={phrase.english} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="bg-card rounded-2xl ts-shadow-card border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-foreground">{phrase.english}</p>
              <span className="text-[8px] bg-muted text-muted-foreground px-2 py-0.5 rounded capitalize">{phrase.category}</span>
            </div>
            <div className="bg-muted/50 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-ts-saffron shrink-0" />
                <p className="text-sm font-bold text-foreground">{phrase[language]}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
