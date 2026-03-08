import { motion } from "framer-motion";
import { ArrowLeft, Palette, Star, MapPin, Clock, IndianRupee } from "lucide-react";

interface SkillExperienceViewProps {
  onBack: () => void;
}

const EXPERIENCES = [
  { name: "Pottery Workshop", loc: "Jaipur, Rajasthan", price: "₹500", duration: "2 hours", rating: 4.8, img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80", category: "Craft", desc: "Learn traditional blue pottery from local artisans" },
  { name: "Kathakali Dance Class", loc: "Kochi, Kerala", price: "₹800", duration: "3 hours", rating: 4.9, img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&q=80", category: "Dance", desc: "Experience classical Kerala dance and makeup" },
  { name: "Biryani Cooking Class", loc: "Hyderabad", price: "₹1200", duration: "4 hours", rating: 4.7, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", category: "Cooking", desc: "Cook authentic Hyderabadi biryani with a local chef" },
  { name: "Block Printing Workshop", loc: "Jaipur, Rajasthan", price: "₹600", duration: "2.5 hours", rating: 4.6, img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80", category: "Craft", desc: "Traditional hand block printing on fabric" },
  { name: "Yoga & Meditation", loc: "Rishikesh, Uttarakhand", price: "₹400", duration: "1.5 hours", rating: 4.9, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80", category: "Wellness", desc: "Morning yoga by the Ganges with certified instructor" },
  { name: "Warli Art Class", loc: "Mumbai, Maharashtra", price: "₹700", duration: "2 hours", rating: 4.5, img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80", category: "Art", desc: "Learn tribal Warli painting techniques" },
  { name: "Silk Weaving Demo", loc: "Varanasi, UP", price: "₹300", duration: "1 hour", rating: 4.4, img: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80", category: "Craft", desc: "Watch Banarasi silk being woven on traditional looms" },
  { name: "Spice Garden Tour", loc: "Thekkady, Kerala", price: "₹350", duration: "2 hours", rating: 4.7, img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80", category: "Nature", desc: "Walk through cardamom, pepper, and vanilla plantations" },
];

const categoryColors: Record<string, string> = {
  Craft: "bg-ts-saffron/10 text-ts-saffron",
  Dance: "bg-ts-purple/10 text-ts-purple",
  Cooking: "bg-ts-rose/10 text-ts-rose",
  Wellness: "bg-ts-green/10 text-ts-green",
  Art: "bg-ts-sky/10 text-ts-sky",
  Nature: "bg-ts-green/10 text-ts-green",
};

export default function SkillExperienceView({ onBack }: SkillExperienceViewProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <Palette className="w-5 h-5 text-ts-purple" /> Local Experiences
          </h2>
          <p className="text-[10px] text-muted-foreground">Book unique local skill workshops</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 ts-scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EXPERIENCES.map((exp, i) => (
            <motion.div key={exp.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="bg-card rounded-2xl border border-border ts-shadow-card overflow-hidden">
              <div className="h-32 relative overflow-hidden">
                <img src={exp.img} alt={exp.name} className="w-full h-full object-cover" loading="lazy" />
                <span className={`absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-lg ${categoryColors[exp.category] || "bg-muted text-muted-foreground"}`}>{exp.category}</span>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-foreground">{exp.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{exp.desc}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.loc}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{exp.duration}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-bold text-primary flex items-center gap-0.5"><IndianRupee className="w-3 h-3" />{exp.price}</span>
                  <span className="flex items-center gap-1 text-[10px]"><Star className="w-3 h-3 text-ts-saffron fill-ts-saffron" /><span className="font-bold text-foreground">{exp.rating}</span></span>
                </div>
                <button className="w-full mt-2 bg-primary/10 text-primary font-bold text-[11px] py-2 rounded-xl active:scale-95 transition">Book Now</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
