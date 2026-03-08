import { motion } from "framer-motion";
import { ArrowLeft, Landmark, MapPin, Briefcase, Utensils, ChevronRight, Mountain, Star } from "lucide-react";
import { MOCK_DATA } from "@/lib/tripData";

interface ExploreHubProps {
  onBack: () => void;
  onSelectCategory: (cat: string) => void;
}

const options = [
  { id: "heritage", title: "Divine Heritage", subtitle: "Ancient temples, forts & monuments", icon: Landmark, color: "text-ts-saffron", bg: "bg-ts-saffron/10", count: MOCK_DATA.heritage?.length || 0 },
  { id: "nature", title: "Nature Escapes", subtitle: "Parks, lakes, backwaters & views", icon: MapPin, color: "text-ts-green", bg: "bg-ts-green/10", count: MOCK_DATA.nature?.length || 0 },
  { id: "shopping", title: "Market Hubs", subtitle: "Malls & local street markets", icon: Briefcase, color: "text-ts-purple", bg: "bg-ts-purple/10", count: MOCK_DATA.shopping?.length || 0 },
  { id: "food", title: "Culinary Trails", subtitle: "Street food, cafes & fine dining", icon: Utensils, color: "text-ts-rose", bg: "bg-ts-rose/10", count: MOCK_DATA.food?.length || 0 },
  { id: "adventure", title: "Adventures", subtitle: "Rafting, paragliding & more", icon: Mountain, color: "text-ts-sky", bg: "bg-ts-sky/10", count: MOCK_DATA.adventure?.length || 0 },
  { id: "spiritual", title: "Spiritual Journeys", subtitle: "Temples, ashrams & sacred sites", icon: Star, color: "text-ts-saffron", bg: "bg-ts-saffron/10", count: MOCK_DATA.spiritual?.length || 0 },
];

export default function ExploreHub({ onBack, onSelectCategory }: ExploreHubProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col"
    >
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground">Explore Hub</h2>
          <p className="text-[10px] text-muted-foreground font-medium">Choose a category to browse destinations</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3 ts-scrollbar-hide">
        {options.map((opt, i) => {
          const Icon = opt.icon;
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelectCategory(opt.id)}
              className="w-full bg-card p-4 rounded-3xl ts-shadow-card border border-border flex items-center gap-4 active:scale-[0.98] transition hover:border-primary/20 hover:shadow-md"
            >
              <div className={`${opt.bg} p-3 rounded-2xl`}>
                <Icon className={`w-6 h-6 ${opt.color}`} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-foreground">{opt.title}</p>
                <p className="text-[11px] text-muted-foreground">{opt.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground font-bold bg-muted px-2 py-1 rounded-lg">
                  {opt.count}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
