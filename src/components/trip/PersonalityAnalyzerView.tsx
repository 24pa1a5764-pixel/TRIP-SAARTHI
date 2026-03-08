import { motion } from "framer-motion";
import { ArrowLeft, Brain, Compass, Utensils, Wallet, Landmark, Sparkles } from "lucide-react";
import { useState } from "react";

interface PersonalityAnalyzerViewProps {
  onBack: () => void;
}

const QUESTIONS = [
  { q: "Your ideal vacation starts with?", opts: ["Hiking a mountain", "Visiting a museum", "Finding local street food", "Finding the cheapest hostel"] },
  { q: "You have a free afternoon. You'd rather?", opts: ["Go bungee jumping", "Explore an ancient temple", "Take a food tour", "Find free activities nearby"] },
  { q: "Your travel photos are mostly of?", opts: ["Scenic landscapes", "Architecture & art", "Food & drinks", "Budget hacks & deals"] },
  { q: "When packing, you prioritize?", opts: ["Adventure gear", "Comfortable walking shoes", "Empty stomach space", "Compact & minimal items"] },
];

const PERSONALITIES = [
  { type: "Adventure Traveler", emoji: "⚡", icon: Compass, color: "text-ts-sky", bg: "bg-ts-sky/10", desc: "You crave adrenaline and new experiences! Mountains, rafting, and offbeat trails are your thing.", tips: ["Try paragliding in Bir Billing", "Trek to Valley of Flowers", "Camp in Spiti Valley"] },
  { type: "Cultural Explorer", emoji: "🏛️", icon: Landmark, color: "text-ts-saffron", bg: "bg-ts-saffron/10", desc: "You love history, art, and local traditions. Every monument tells you a story.", tips: ["Explore Hampi ruins", "Visit Ajanta Ellora caves", "Attend Mysore Dasara"] },
  { type: "Food Traveler", emoji: "🍛", icon: Utensils, color: "text-ts-rose", bg: "bg-ts-rose/10", desc: "Your trips revolve around local cuisines. You eat first, sightsee later!", tips: ["Try Lucknow's Tunday Kebabs", "Explore Chandni Chowk food walk", "Visit Chettinad for spicy cuisine"] },
  { type: "Budget Traveler", emoji: "💰", icon: Wallet, color: "text-ts-green", bg: "bg-ts-green/10", desc: "You maximize experiences while minimizing costs. Smart travel is your superpower!", tips: ["Use IRCTC for cheap train tickets", "Stay in hostels via Hostelworld", "Travel during off-season"] },
];

export default function PersonalityAnalyzerView({ onBack }: PersonalityAnalyzerViewProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<typeof PERSONALITIES[0] | null>(null);

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate personality based on most chosen index
      const counts = [0, 0, 0, 0];
      newAnswers.forEach(a => counts[a]++);
      const maxIdx = counts.indexOf(Math.max(...counts));
      setResult(PERSONALITIES[maxIdx]);
    }
  };

  if (result) {
    const Icon = result.icon;
    return (
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
        <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
          <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
          <h2 className="text-lg font-display font-bold text-foreground">Your Travel Personality</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-6 ts-scrollbar-hide">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
            <div className={`w-20 h-20 ${result.bg} rounded-3xl flex items-center justify-center mx-auto mb-4`}>
              <span className="text-4xl">{result.emoji}</span>
            </div>
            <h3 className="text-xl font-display font-bold text-foreground">{result.type}</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">{result.desc}</p>
          </motion.div>
          <div className="bg-card rounded-2xl border border-border ts-shadow-card p-4">
            <p className="text-xs font-bold text-foreground mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> Recommended For You</p>
            {result.tips.map((tip, i) => (
              <div key={i} className="flex items-center gap-2 py-2 border-b border-border last:border-0">
                <Icon className={`w-4 h-4 ${result.color}`} />
                <p className="text-xs text-foreground">{tip}</p>
              </div>
            ))}
          </div>
          <button onClick={() => { setStep(0); setAnswers([]); setResult(null); }}
            className="w-full mt-4 bg-primary/10 text-primary font-bold text-xs py-3 rounded-xl active:scale-95 transition">
            Retake Quiz
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <Brain className="w-5 h-5 text-ts-purple" /> Travel Personality Analyzer
          </h2>
          <p className="text-[10px] text-muted-foreground">Question {step + 1} of {QUESTIONS.length}</p>
        </div>
      </div>
      <div className="flex-1 px-5 pb-6 flex flex-col justify-center">
        <div className="w-full bg-muted rounded-full h-1.5 mb-6">
          <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
        </div>
        <motion.p key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="text-base font-display font-bold text-foreground text-center mb-6">{QUESTIONS[step].q}</motion.p>
        <div className="space-y-3">
          {QUESTIONS[step].opts.map((opt, i) => (
            <motion.button key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => handleAnswer(i)}
              className="w-full bg-card border border-border rounded-2xl p-4 text-left text-sm font-medium text-foreground active:scale-[0.98] hover:border-primary/30 transition ts-shadow-card">
              {opt}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
