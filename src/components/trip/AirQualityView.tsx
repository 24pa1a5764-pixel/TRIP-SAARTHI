import { motion } from "framer-motion";
import { ArrowLeft, Wind, Thermometer, Droplets, AlertTriangle } from "lucide-react";

interface AirQualityViewProps {
  onBack: () => void;
}

const CITIES_AQI = [
  { city: "Delhi", aqi: 312, status: "Very Poor", color: "text-destructive", bg: "bg-destructive/10", tip: "Wear N95 mask outdoors. Avoid morning walks.", pm25: "180 μg/m³", humidity: "45%", temp: "38°C" },
  { city: "Mumbai", aqi: 142, status: "Moderate", color: "text-ts-saffron", bg: "bg-ts-saffron/10", tip: "Sensitive groups should limit outdoor activity.", pm25: "65 μg/m³", humidity: "78%", temp: "33°C" },
  { city: "Bangalore", aqi: 78, status: "Satisfactory", color: "text-ts-green", bg: "bg-ts-green/10", tip: "Air quality is acceptable. Enjoy your trip!", pm25: "30 μg/m³", humidity: "60%", temp: "28°C" },
  { city: "Jaipur", aqi: 198, status: "Poor", color: "text-ts-rose", bg: "bg-ts-rose/10", tip: "Reduce prolonged outdoor exertion.", pm25: "95 μg/m³", humidity: "35%", temp: "42°C" },
  { city: "Shimla", aqi: 42, status: "Good", color: "text-ts-green", bg: "bg-ts-green/10", tip: "Perfect air quality for outdoor activities!", pm25: "15 μg/m³", humidity: "55%", temp: "18°C" },
  { city: "Kolkata", aqi: 165, status: "Unhealthy", color: "text-ts-rose", bg: "bg-ts-rose/10", tip: "Everyone should reduce outdoor exposure.", pm25: "85 μg/m³", humidity: "82%", temp: "35°C" },
  { city: "Chennai", aqi: 95, status: "Satisfactory", color: "text-ts-saffron", bg: "bg-ts-saffron/10", tip: "Generally acceptable air quality.", pm25: "40 μg/m³", humidity: "75%", temp: "36°C" },
  { city: "Manali", aqi: 35, status: "Good", color: "text-ts-green", bg: "bg-ts-green/10", tip: "Excellent air! Breathe deep in the mountains.", pm25: "12 μg/m³", humidity: "50%", temp: "12°C" },
];

const getAqiBarWidth = (aqi: number) => Math.min((aqi / 500) * 100, 100);
const getAqiColor = (aqi: number) => aqi <= 50 ? "bg-ts-green" : aqi <= 100 ? "bg-ts-green" : aqi <= 200 ? "bg-ts-saffron" : aqi <= 300 ? "bg-ts-rose" : "bg-destructive";

export default function AirQualityView({ onBack }: AirQualityViewProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <Wind className="w-5 h-5 text-ts-sky" /> Air Quality Index
          </h2>
          <p className="text-[10px] text-muted-foreground">Real-time pollution & AQI for cities</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-3 ts-scrollbar-hide">
        {CITIES_AQI.map((city, i) => (
          <motion.div key={city.city} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-card rounded-2xl border border-border ts-shadow-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-bold text-foreground">{city.city}</p>
                <span className={`text-[10px] font-bold ${city.color}`}>{city.status}</span>
              </div>
              <div className={`${city.bg} px-3 py-1.5 rounded-xl text-center`}>
                <p className={`text-lg font-bold ${city.color}`}>{city.aqi}</p>
                <p className="text-[8px] text-muted-foreground">AQI</p>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div className={`h-2 rounded-full ${getAqiColor(city.aqi)} transition-all`} style={{ width: `${getAqiBarWidth(city.aqi)}%` }} />
            </div>
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2">
              <span className="flex items-center gap-1"><Wind className="w-3 h-3" /> PM2.5: {city.pm25}</span>
              <span className="flex items-center gap-1"><Droplets className="w-3 h-3" /> {city.humidity}</span>
              <span className="flex items-center gap-1"><Thermometer className="w-3 h-3" /> {city.temp}</span>
            </div>
            {city.aqi > 150 && (
              <div className="flex items-start gap-2 bg-destructive/5 rounded-xl p-2">
                <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                <p className="text-[10px] text-muted-foreground">{city.tip}</p>
              </div>
            )}
            {city.aqi <= 150 && (
              <p className="text-[10px] text-muted-foreground">💡 {city.tip}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
