import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Fuel, Bath, Coffee, Star, Navigation } from "lucide-react";

interface RestStopFinderViewProps {
  onBack: () => void;
}

const REST_STOPS = [
  { name: "Highway Dhaba - Murthal", distance: "45 km", type: "Food & Rest", rating: 4.5, amenities: ["food", "restroom", "parking"], highlight: "Famous paranthas on NH-1", img: "🍽️" },
  { name: "Indian Oil Petrol Pump", distance: "12 km", type: "Fuel Station", rating: 4.0, amenities: ["fuel", "restroom", "air"], highlight: "24/7 with clean restrooms", img: "⛽" },
  { name: "Cafe Coffee Day - Highway", distance: "28 km", type: "Cafe & Rest", rating: 4.2, amenities: ["food", "restroom", "wifi"], highlight: "AC seating with highway view", img: "☕" },
  { name: "NHAI Rest Area", distance: "35 km", type: "Rest Area", rating: 3.8, amenities: ["restroom", "parking", "water"], highlight: "Government rest area with shade", img: "🅿️" },
  { name: "Amrik Sukhdev Dhaba", distance: "52 km", type: "Food & Rest", rating: 4.7, amenities: ["food", "restroom", "parking"], highlight: "Legendary dhaba since 1956", img: "🍛" },
  { name: "HP Petrol Pump & Mart", distance: "18 km", type: "Fuel Station", rating: 4.1, amenities: ["fuel", "restroom", "snacks"], highlight: "Convenience store + ATM available", img: "⛽" },
  { name: "Haldiram's Highway", distance: "40 km", type: "Food & Rest", rating: 4.3, amenities: ["food", "restroom", "parking"], highlight: "Vegetarian-friendly, clean & fast", img: "🍔" },
];

const amenityIcons: Record<string, { icon: typeof Fuel; label: string }> = {
  fuel: { icon: Fuel, label: "Fuel" },
  restroom: { icon: Bath, label: "Restroom" },
  food: { icon: Coffee, label: "Food" },
  parking: { icon: Navigation, label: "Parking" },
  wifi: { icon: Star, label: "WiFi" },
  water: { icon: Coffee, label: "Water" },
  snacks: { icon: Coffee, label: "Snacks" },
  air: { icon: Navigation, label: "Air" },
};

export default function RestStopFinderView({ onBack }: RestStopFinderViewProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5 text-ts-green" /> Rest Stop Finder
          </h2>
          <p className="text-[10px] text-muted-foreground">Nearby stops for road trips</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-3 ts-scrollbar-hide">
        {REST_STOPS.map((stop, i) => (
          <motion.div key={stop.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-card rounded-2xl border border-border ts-shadow-card p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-2xl shrink-0">{stop.img}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-foreground truncate">{stop.name}</p>
                  <span className="text-[10px] font-bold text-primary shrink-0">{stop.distance}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{stop.type}</p>
                <p className="text-[10px] text-ts-sky mt-1">💡 {stop.highlight}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {stop.amenities.map(a => {
                    const info = amenityIcons[a];
                    if (!info) return null;
                    const Icon = info.icon;
                    return (
                      <span key={a} className="flex items-center gap-1 text-[9px] bg-muted px-2 py-0.5 rounded-lg text-muted-foreground">
                        <Icon className="w-3 h-3" /> {info.label}
                      </span>
                    );
                  })}
                  <span className="flex items-center gap-1 text-[10px] ml-auto">
                    <Star className="w-3 h-3 text-ts-saffron fill-ts-saffron" />
                    <span className="font-bold text-foreground">{stop.rating}</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
