import { motion } from "framer-motion";
import { ArrowLeft, Globe, MapPin, Calendar, Award } from "lucide-react";

interface DigitalPassportViewProps {
  onBack: () => void;
  savedTripsCount: number;
}

const VISITED_PLACES = [
  { name: "Taj Mahal", city: "Agra", date: "Jan 2026", lat: 27.175, lng: 78.042, stamp: "🕌" },
  { name: "Gateway of India", city: "Mumbai", date: "Dec 2025", lat: 18.922, lng: 72.835, stamp: "🌊" },
  { name: "Golden Temple", city: "Amritsar", date: "Nov 2025", lat: 31.620, lng: 74.877, stamp: "🛕" },
  { name: "Hawa Mahal", city: "Jaipur", date: "Oct 2025", lat: 26.924, lng: 75.827, stamp: "🏰" },
  { name: "Backwaters", city: "Kerala", date: "Sep 2025", lat: 9.498, lng: 76.338, stamp: "🛶" },
  { name: "Valley of Flowers", city: "Uttarakhand", date: "Aug 2025", lat: 30.728, lng: 79.605, stamp: "🌸" },
];

const STATS = [
  { label: "States Visited", value: "6", emoji: "🗺️" },
  { label: "Total Trips", value: "8", emoji: "✈️" },
  { label: "Km Traveled", value: "4,200", emoji: "🛤️" },
  { label: "Photos Taken", value: "320", emoji: "📸" },
];

export default function DigitalPassportView({ onBack, savedTripsCount }: DigitalPassportViewProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" /> Digital Travel Passport
          </h2>
          <p className="text-[10px] text-muted-foreground">Your travel history & achievements</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4 ts-scrollbar-hide">
        {/* Passport Header */}
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="ts-gradient-hero rounded-3xl p-5 text-primary-foreground text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_30%,white_0%,transparent_60%)]" />
          <div className="relative z-10">
            <Globe className="w-10 h-10 mx-auto mb-2 opacity-80" />
            <h3 className="text-lg font-display font-bold">Travel Passport</h3>
            <p className="text-xs opacity-70">Republic of India Explorer</p>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {STATS.map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-lg">{s.emoji}</p>
                  <p className="text-sm font-bold">{s.value}</p>
                  <p className="text-[8px] opacity-70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stamps */}
        <div>
          <p className="text-xs font-bold text-foreground mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-ts-saffron" /> Travel Stamps
          </p>
          <div className="grid grid-cols-2 gap-3">
            {VISITED_PLACES.map((place, i) => (
              <motion.div key={place.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border border-border ts-shadow-card p-3 text-center relative overflow-hidden">
                <div className="absolute top-1 right-1 opacity-10 text-5xl rotate-12">{place.stamp}</div>
                <span className="text-3xl relative z-10">{place.stamp}</span>
                <p className="text-xs font-bold text-foreground mt-2">{place.name}</p>
                <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3" /> {place.city}
                </p>
                <p className="text-[9px] text-muted-foreground flex items-center justify-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" /> {place.date}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Empty stamp slots */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="border-2 border-dashed border-border rounded-xl p-4 text-center">
              <p className="text-lg opacity-30">✈️</p>
              <p className="text-[9px] text-muted-foreground mt-1">Next destination?</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
