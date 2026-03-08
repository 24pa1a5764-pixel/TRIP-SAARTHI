import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Users, ChevronRight, ChevronDown } from "lucide-react";
import type { TripSettings } from "@/lib/tripData";

interface PlannerViewProps {
  settings: TripSettings;
  setSettings: (s: TripSettings) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function PlannerView({ settings, setSettings, onBack, onNext }: PlannerViewProps) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!settings.start || !settings.end) {
      setError("Please select both start and end dates.");
      return;
    }
    if (new Date(settings.end) < new Date(settings.start)) {
      setError("End date cannot be before start date.");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col"
    >
      <div className="px-5 pt-4 pb-3 flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-lg font-display font-bold text-foreground">Trip Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-5">
        {error && (
          <p className="text-xs text-destructive bg-destructive/10 p-3 rounded-xl font-medium">⚠️ {error}</p>
        )}

        <div className="bg-card rounded-2xl p-4 ts-shadow-card border border-border space-y-3">
          <p className="text-xs font-bold text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" /> Travel Dates
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-muted-foreground font-bold uppercase">Start Date</label>
              <input
                type="date"
                value={settings.start}
                onChange={(e) => setSettings({ ...settings, start: e.target.value })}
                className="w-full bg-muted border border-border rounded-xl px-3 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition text-foreground"
              />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground font-bold uppercase">End Date</label>
              <input
                type="date"
                value={settings.end}
                onChange={(e) => setSettings({ ...settings, end: e.target.value })}
                className="w-full bg-muted border border-border rounded-xl px-3 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition text-foreground"
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 ts-shadow-card border border-border space-y-4">
          <p className="text-xs font-bold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-ts-purple" /> Preferences
          </p>
          <div>
            <label className="text-[10px] text-muted-foreground font-bold uppercase">Who are you traveling with?</label>
            <div className="relative mt-1">
              <select
                value={settings.type}
                onChange={(e) => setSettings({ ...settings, type: e.target.value })}
                className="w-full bg-muted border border-border rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:border-primary appearance-none text-foreground"
              >
                <option value="Solo">🙋 Solo Backpacker</option>
                <option value="Couple">💑 Couple Getaway</option>
                <option value="Family">👨‍👩‍👧‍👦 Family Vacation</option>
                <option value="Friends">👯 Friends Trip</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-muted-foreground font-bold uppercase">Budget Level</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {["Economy", "Standard", "Luxury"].map((b) => (
                <button
                  key={b}
                  onClick={() => setSettings({ ...settings, budget: b })}
                  className={`py-3 px-1 rounded-xl text-xs font-bold transition border ${
                    settings.budget === b
                      ? "bg-primary/10 border-primary text-primary shadow-sm"
                      : "bg-muted border-border text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-2">
        <button
          onClick={handleNext}
          className="w-full ts-gradient-hero text-primary-foreground font-bold py-4 rounded-2xl text-sm ts-shadow-elevated flex items-center justify-center gap-2 transition active:scale-[0.98]"
        >
          Continue to Explore <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
