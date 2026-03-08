import { motion } from "framer-motion";
import { ArrowLeft, Luggage, Plus, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

interface LostItemFinderViewProps {
  onBack: () => void;
}

const SAMPLE_REPORTS = [
  { id: 1, item: "Blue Backpack", location: "Jaipur Railway Station", time: "2 hours ago", status: "searching", reporter: "Amit K." },
  { id: 2, item: "iPhone 15 (Black)", location: "Taj Mahal Entrance", time: "5 hours ago", status: "found", reporter: "Sarah M." },
  { id: 3, item: "Passport (US)", location: "Delhi Airport T3", time: "1 day ago", status: "found", reporter: "James L." },
  { id: 4, item: "Camera Lens", location: "Varanasi Ghats", time: "3 hours ago", status: "searching", reporter: "Priya R." },
  { id: 5, item: "Wallet (Brown leather)", location: "Goa - Baga Beach", time: "6 hours ago", status: "searching", reporter: "Dev S." },
];

export default function LostItemFinderView({ onBack }: LostItemFinderViewProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <Luggage className="w-5 h-5 text-ts-saffron" /> Lost Item Finder
          </h2>
          <p className="text-[10px] text-muted-foreground">Community-powered lost & found</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="p-2 bg-primary/10 rounded-xl active:scale-95 transition">
          <Plus className="w-4 h-4 text-primary" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-3 ts-scrollbar-hide">
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            className="bg-card rounded-2xl border border-border ts-shadow-card p-4 space-y-3">
            <p className="text-xs font-bold text-foreground">Report Lost Item</p>
            <input placeholder="Item description (e.g., Black wallet)" className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground" />
            <input placeholder="Last seen location" className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground" />
            <button className="w-full bg-primary text-primary-foreground font-bold text-xs py-2.5 rounded-xl active:scale-95 transition">Post to Network</button>
          </motion.div>
        )}

        <div className="bg-ts-sky/10 border border-ts-sky/20 rounded-2xl p-3 text-[11px] text-foreground">
          🔍 <strong>{SAMPLE_REPORTS.filter(r => r.status === "searching").length}</strong> items being searched • <strong>{SAMPLE_REPORTS.filter(r => r.status === "found").length}</strong> items found recently
        </div>

        {SAMPLE_REPORTS.map((report, i) => (
          <motion.div key={report.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl border border-border ts-shadow-card p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-bold text-foreground">{report.item}</p>
                <p className="text-[10px] text-muted-foreground">Reported by {report.reporter}</p>
              </div>
              {report.status === "found" ? (
                <span className="flex items-center gap-1 text-[9px] font-bold text-ts-green bg-ts-green/10 px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3" /> Found
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[9px] font-bold text-ts-saffron bg-ts-saffron/10 px-2 py-1 rounded-full">
                  <AlertCircle className="w-3 h-3" /> Searching
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{report.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{report.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
