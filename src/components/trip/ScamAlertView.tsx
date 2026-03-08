import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, Shield, MapPin, Eye } from "lucide-react";

interface ScamAlertViewProps {
  onBack: () => void;
}

const SCAM_ALERTS = [
  { area: "Taj Mahal, Agra", scams: [
    { type: "Unofficial Guides", risk: "High", tip: "Only hire ASI-approved guides. Ask for ID card.", icon: "🎤" },
    { type: "Overpriced Tickets", risk: "Medium", tip: "Check official ticket price (₹50 Indian / ₹1100 Foreign). Buy online.", icon: "🎫" },
    { type: "Shoe Cover Scam", risk: "Low", tip: "Free shoe covers are available. Don't pay extra.", icon: "👟" },
  ]},
  { area: "Gateway of India, Mumbai", scams: [
    { type: "Boat Tour Overcharging", risk: "High", tip: "Fixed rate for Elephanta is ₹200. Negotiate before boarding.", icon: "🚤" },
    { type: "Fake Photographers", risk: "Medium", tip: "They'll take photos and demand ₹500+. Politely decline.", icon: "📸" },
    { type: "Pickpockets", risk: "High", tip: "Keep valuables in front pockets. Avoid crowded evening hours.", icon: "👛" },
  ]},
  { area: "Jaipur Markets", scams: [
    { type: "Gem Stone Fraud", risk: "High", tip: "Never buy gems for 'resale abroad'. It's always fake.", icon: "💎" },
    { type: "Taxi Meter Tampering", risk: "Medium", tip: "Use Uber/Ola or agree on fare before riding.", icon: "🚕" },
    { type: "Tea/Carpet Shop Trap", risk: "Medium", tip: "Drivers get commission. Don't feel obligated to buy.", icon: "🍵" },
  ]},
  { area: "Varanasi Ghats", scams: [
    { type: "Puja Scam", risk: "High", tip: "Priests may demand ₹5000+ for rituals. Agree on price first.", icon: "🪔" },
    { type: "Boat Ride Overcharge", risk: "Medium", tip: "Government rate is ₹100-150/hour. Don't pay more.", icon: "🛶" },
    { type: "Silk Shop Fraud", risk: "Medium", tip: "Most 'Banarasi silk' is synthetic. Buy from trusted shops only.", icon: "🧣" },
  ]},
  { area: "Delhi Tourist Areas", scams: [
    { type: "Fake Tourism Office", risk: "High", tip: "Official office is at 88 Janpath only. Others are fake.", icon: "🏢" },
    { type: "Railway Ticket Scam", risk: "High", tip: "Book online via IRCTC. Don't trust agents near stations.", icon: "🚂" },
    { type: "Auto Meter Fraud", risk: "Medium", tip: "Insist on meter or use Uber/Ola. Pre-agree on fare.", icon: "🛺" },
  ]},
];

const riskColors: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-ts-saffron/10 text-ts-saffron",
  Low: "bg-ts-green/10 text-ts-green",
};

export default function ScamAlertView({ onBack }: ScamAlertViewProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-ts-saffron" /> Smart Scam Alerts
          </h2>
          <p className="text-[10px] text-muted-foreground">Stay safe from common tourist scams</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4 ts-scrollbar-hide">
        <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-foreground">General Safety Tips</p>
            <p className="text-[11px] text-muted-foreground mt-1">Never share personal/bank details • Always verify prices online first • Trust your instincts — if it feels wrong, walk away</p>
          </div>
        </div>

        {SCAM_ALERTS.map((area, i) => (
          <motion.div key={area.area} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl border border-border ts-shadow-card overflow-hidden">
            <div className="px-4 py-3 bg-muted/50 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-foreground">{area.area}</span>
            </div>
            <div className="p-3 space-y-2">
              {area.scams.map((scam) => (
                <div key={scam.type} className="flex items-start gap-3 bg-background rounded-xl p-3">
                  <span className="text-lg">{scam.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-bold text-foreground">{scam.type}</p>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${riskColors[scam.risk]}`}>{scam.risk}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground flex items-start gap-1">
                      <Eye className="w-3 h-3 shrink-0 mt-0.5" /> {scam.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
