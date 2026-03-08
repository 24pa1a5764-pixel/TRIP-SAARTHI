import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, CloudRain, Thermometer, Wind } from "lucide-react";
import { getWeatherAlerts } from "@/lib/featureData";

interface WeatherAlertsViewProps {
  onBack: () => void;
}

const CITIES = ["Delhi", "Mumbai", "Goa", "Ladakh"];

export default function WeatherAlertsView({ onBack }: WeatherAlertsViewProps) {
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const weather = getWeatherAlerts(selectedCity);

  const alertColors: Record<string, string> = {
    rain: "bg-ts-sky/10 border-ts-sky/30 text-ts-sky",
    heat: "bg-destructive/10 border-destructive/30 text-destructive",
    storm: "bg-ts-purple/10 border-ts-purple/30 text-ts-purple",
    cold: "bg-ts-sky/10 border-ts-sky/30 text-ts-sky",
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground">Weather Alerts 🌦️</h2>
          <p className="text-[10px] text-muted-foreground font-medium">Plan around the weather</p>
        </div>
      </div>

      {/* City selector */}
      <div className="px-5 pb-3 flex gap-2 overflow-x-auto ts-scrollbar-hide">
        {CITIES.map(c => (
          <button key={c} onClick={() => setSelectedCity(c)}
            className={`text-[10px] font-bold px-4 py-2 rounded-xl transition whitespace-nowrap ${selectedCity === c ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>{c}</button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 ts-scrollbar-hide">
        {/* Current weather */}
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-3xl ts-shadow-card border border-border p-5 mb-4 text-center">
          <p className="text-5xl mb-2">{weather.icon}</p>
          <p className="text-3xl font-bold text-foreground">{weather.temp}</p>
          <p className="text-sm text-muted-foreground">{weather.condition}</p>
          <p className="text-xs text-muted-foreground mt-1">{weather.city}</p>
        </motion.div>

        {/* Alert */}
        {weather.alert && weather.alertType && (
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            className={`rounded-2xl border p-4 mb-4 flex items-start gap-3 ${alertColors[weather.alertType]}`}>
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold">⚠️ Weather Alert</p>
              <p className="text-[11px] mt-0.5">{weather.alert}</p>
            </div>
          </motion.div>
        )}

        {/* 5-day forecast */}
        <div className="mb-4">
          <h3 className="text-sm font-display font-bold text-foreground mb-3">5-Day Forecast</h3>
          <div className="flex gap-2">
            {weather.forecast.map((f, i) => (
              <motion.div key={f.day} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.05 }}
                className="flex-1 bg-card rounded-2xl ts-shadow-card border border-border p-3 text-center">
                <p className="text-[10px] text-muted-foreground font-bold">{f.day}</p>
                <p className="text-xl my-1">{f.icon}</p>
                <p className="text-xs font-bold text-foreground">{f.temp}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Travel tip */}
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
          className="bg-ts-saffron/10 rounded-2xl p-4 border border-ts-saffron/20">
          <p className="text-xs font-bold text-foreground mb-1">💡 Travel Tip</p>
          <p className="text-[11px] text-muted-foreground">{weather.tip}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
