import { motion } from "framer-motion";
import { ArrowLeft, Target, Trophy, Star, Landmark, Utensils, Gem, Camera, Map } from "lucide-react";
import { useState } from "react";

interface TravelChallengeViewProps {
  onBack: () => void;
}

const CHALLENGES = [
  { id: 1, title: "Heritage Hunter", emoji: "🏛️", icon: Landmark, desc: "Visit 5 heritage sites across India", target: 5, current: 2, reward: "Gold Heritage Badge", color: "text-ts-saffron", bg: "bg-ts-saffron/10",
    tasks: ["Visit Taj Mahal", "Explore Qutub Minar", "Tour Mysore Palace", "See Hawa Mahal", "Discover Konark Temple"] },
  { id: 2, title: "Foodie Explorer", emoji: "🍛", icon: Utensils, desc: "Try 10 famous local dishes", target: 10, current: 4, reward: "Master Chef Badge", color: "text-ts-rose", bg: "bg-ts-rose/10",
    tasks: ["Hyderabadi Biryani", "Lucknow Kebab", "Jaipur Lassi", "Mumbai Vada Pav", "Delhi Chaat", "Kolkata Rosogolla", "Chennai Dosa", "Goa Fish Curry", "Punjab Butter Chicken", "Rajasthani Dal Baati"] },
  { id: 3, title: "Hidden Gem Seeker", emoji: "💎", icon: Gem, desc: "Discover 3 offbeat destinations", target: 3, current: 1, reward: "Explorer Badge", color: "text-ts-sky", bg: "bg-ts-sky/10",
    tasks: ["Visit Spiti Valley", "Explore Mawlynnong", "Find Gandikota Canyon"] },
  { id: 4, title: "Photography Pro", emoji: "📸", icon: Camera, desc: "Capture sunrise/sunset at 4 spots", target: 4, current: 0, reward: "Photographer Badge", color: "text-ts-purple", bg: "bg-ts-purple/10",
    tasks: ["Tiger Hill Sunrise", "Kanyakumari Sunset", "Pangong Lake Sunset", "Marina Beach Sunrise"] },
  { id: 5, title: "State Hopper", emoji: "🗺️", icon: Map, desc: "Travel to 7 different states", target: 7, current: 3, reward: "Wanderer Badge", color: "text-ts-green", bg: "bg-ts-green/10",
    tasks: ["Rajasthan", "Kerala", "Himachal Pradesh", "Goa", "Tamil Nadu", "Uttarakhand", "Meghalaya"] },
];

export default function TravelChallengeView({ onBack }: TravelChallengeViewProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <Target className="w-5 h-5 text-ts-rose" /> Travel Challenges
          </h2>
          <p className="text-[10px] text-muted-foreground">Complete fun challenges & earn badges!</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-3 ts-scrollbar-hide">
        {/* Overview */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
          <Trophy className="w-8 h-8 text-primary" />
          <div>
            <p className="text-xs font-bold text-foreground">Active Challenges: {CHALLENGES.length}</p>
            <p className="text-[10px] text-muted-foreground">{CHALLENGES.reduce((a, c) => a + c.current, 0)} tasks completed overall</p>
          </div>
        </div>

        {CHALLENGES.map((ch, i) => {
          const Icon = ch.icon;
          const progress = (ch.current / ch.target) * 100;
          const isOpen = expanded === ch.id;
          return (
            <motion.div key={ch.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl border border-border ts-shadow-card overflow-hidden">
              <button onClick={() => setExpanded(isOpen ? null : ch.id)} className="w-full p-4 flex items-center gap-3 text-left">
                <div className={`${ch.bg} p-2.5 rounded-xl`}>
                  <span className="text-2xl">{ch.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-foreground">{ch.title}</p>
                  <p className="text-[10px] text-muted-foreground">{ch.desc}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div className={`h-2 rounded-full ${ch.bg.replace("/10", "")} transition-all`} style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-foreground">{ch.current}/{ch.target}</span>
                  </div>
                </div>
              </button>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  className="px-4 pb-4 border-t border-border">
                  <div className="pt-3 space-y-2">
                    {ch.tasks.map((task, ti) => (
                      <div key={ti} className="flex items-center gap-2 text-[11px]">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${ti < ch.current ? "bg-ts-green border-ts-green" : "border-border"}`}>
                          {ti < ch.current && <Star className="w-2.5 h-2.5 text-primary-foreground" />}
                        </div>
                        <span className={ti < ch.current ? "text-foreground line-through opacity-60" : "text-foreground"}>{task}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 mt-2 bg-ts-saffron/10 rounded-xl p-2">
                      <Trophy className="w-4 h-4 text-ts-saffron" />
                      <p className="text-[10px] font-bold text-foreground">Reward: {ch.reward}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
