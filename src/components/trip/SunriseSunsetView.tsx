import { motion } from "framer-motion";
import { ArrowLeft, Sunrise, Sunset, MapPin, Camera, Clock } from "lucide-react";

interface SunriseSunsetViewProps {
  onBack: () => void;
}

const SPOTS = [
  { name: "Tiger Hill", city: "Darjeeling", sunrise: "5:12 AM", sunset: "5:48 PM", bestFor: "sunrise", tip: "Arrive by 4:30 AM. Kanchenjunga views on clear days.", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", rating: 4.9 },
  { name: "Kanyakumari", city: "Tamil Nadu", sunrise: "6:18 AM", sunset: "6:22 PM", bestFor: "both", tip: "Only place in India to see sunrise & sunset from same spot.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80", rating: 4.8 },
  { name: "Pangong Lake", city: "Ladakh", sunrise: "5:45 AM", sunset: "7:15 PM", bestFor: "sunset", tip: "The lake changes 7 colors during sunset.", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80", rating: 4.9 },
  { name: "Rann of Kutch", city: "Gujarat", sunrise: "6:30 AM", sunset: "6:45 PM", bestFor: "both", tip: "White desert + full moon nights = magical.", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80", rating: 4.7 },
  { name: "Marina Beach", city: "Chennai", sunrise: "6:05 AM", sunset: "6:10 PM", bestFor: "sunrise", tip: "India's longest urban beach. Perfect for morning photography.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80", rating: 4.5 },
  { name: "Nagalapuram Hills", city: "Andhra Pradesh", sunrise: "5:55 AM", sunset: "6:20 PM", bestFor: "sunrise", tip: "Trek to the peak for 360° sunrise views.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80", rating: 4.6 },
];

export default function SunriseSunsetView({ onBack }: SunriseSunsetViewProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <Sunrise className="w-5 h-5 text-ts-saffron" /> Sunrise & Sunset Planner
          </h2>
          <p className="text-[10px] text-muted-foreground">Best spots & exact timings for photography</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-3 ts-scrollbar-hide">
        {SPOTS.map((spot, i) => (
          <motion.div key={spot.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-card rounded-2xl border border-border ts-shadow-card overflow-hidden">
            <div className="h-32 relative overflow-hidden">
              <img src={spot.img} alt={spot.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                <div>
                  <p className="text-sm font-bold text-primary-foreground">{spot.name}</p>
                  <p className="text-[10px] text-primary-foreground/70 flex items-center gap-1"><MapPin className="w-3 h-3" />{spot.city}</p>
                </div>
                <span className={`text-[9px] font-bold px-2 py-1 rounded-lg backdrop-blur-sm ${spot.bestFor === "sunrise" ? "bg-ts-saffron/30 text-primary-foreground" : spot.bestFor === "sunset" ? "bg-ts-rose/30 text-primary-foreground" : "bg-ts-purple/30 text-primary-foreground"}`}>
                  {spot.bestFor === "both" ? "🌅 Both" : spot.bestFor === "sunrise" ? "🌅 Sunrise" : "🌇 Sunset"}
                </span>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1.5">
                  <Sunrise className="w-4 h-4 text-ts-saffron" />
                  <div>
                    <p className="text-[9px] text-muted-foreground">Sunrise</p>
                    <p className="text-xs font-bold text-foreground">{spot.sunrise}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sunset className="w-4 h-4 text-ts-rose" />
                  <div>
                    <p className="text-[9px] text-muted-foreground">Sunset</p>
                    <p className="text-xs font-bold text-foreground">{spot.sunset}</p>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground flex items-start gap-1">
                <Camera className="w-3 h-3 shrink-0 mt-0.5" /> {spot.tip}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
