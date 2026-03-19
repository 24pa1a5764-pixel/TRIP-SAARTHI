import { motion } from "framer-motion";
import {
  Home, Map, Users, MessageCircle, UserCircle,
  Utensils, CloudSun, Palette, Gem, Medal, Bus,
  PartyPopper, Globe, Camera, Leaf, ShieldAlert,
  AlertTriangle, Wand2, ChevronLeft, ChevronRight, Compass, Settings,
  AlertOctagon, Clock, Brain, Wind, Luggage, MapPin, BarChart3, Sunrise, Target, Mic,
  IndianRupee, Phone
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import type { TranslationKey } from "@/lib/translations";

interface DesktopSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onFeatureClick: (feature: string) => void;
  onSafetyClick: () => void;
  onEmergencyClick: () => void;
  cartCount: number;
}

const mainNav = [
  { id: "home", icon: Home, labelKey: "nav_home" as TranslationKey },
  { id: "discover", icon: Map, labelKey: "nav_discover" as TranslationKey },
  { id: "community", icon: Users, labelKey: "nav_community" as TranslationKey },
  { id: "chat", icon: MessageCircle, labelKey: "nav_chat" as TranslationKey },
  { id: "profile", icon: UserCircle, labelKey: "nav_profile" as TranslationKey },
];

const features = [
  { id: "food_finder", icon: Utensils, labelKey: "feat_food_finder" as TranslationKey, color: "text-ts-rose", bg: "bg-ts-rose/10" },
  { id: "weather", icon: CloudSun, labelKey: "feat_weather" as TranslationKey, color: "text-ts-sky", bg: "bg-ts-sky/10" },
  { id: "mood", icon: Palette, labelKey: "feat_mood_match" as TranslationKey, color: "text-ts-purple", bg: "bg-ts-purple/10" },
  { id: "hidden_gems", icon: Gem, labelKey: "feat_hidden_gems" as TranslationKey, color: "text-ts-sky", bg: "bg-ts-sky/10" },
  { id: "badges", icon: Medal, labelKey: "feat_badges" as TranslationKey, color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  { id: "transport", icon: Bus, labelKey: "feat_transport" as TranslationKey, color: "text-ts-green", bg: "bg-ts-green/10" },
  { id: "festivals", icon: PartyPopper, labelKey: "feat_festivals" as TranslationKey, color: "text-ts-purple", bg: "bg-ts-purple/10" },
  { id: "language", icon: Globe, labelKey: "feat_translator" as TranslationKey, color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  { id: "photo_spots", icon: Camera, labelKey: "feat_photo_spots" as TranslationKey, color: "text-ts-sky", bg: "bg-ts-sky/10" },
  { id: "carbon", icon: Leaf, labelKey: "feat_eco_track" as TranslationKey, color: "text-ts-green", bg: "bg-ts-green/10" },
  { id: "scam_alert", icon: AlertOctagon, labelKey: "feat_scam_alerts" as TranslationKey, color: "text-destructive", bg: "bg-destructive/10" },
  { id: "time_optimizer", icon: Clock, labelKey: "feat_time_optimizer" as TranslationKey, color: "text-ts-purple", bg: "bg-ts-purple/10" },
  { id: "solo_safety", icon: Compass, labelKey: "feat_solo_safety" as TranslationKey, color: "text-ts-green", bg: "bg-ts-green/10" },
  { id: "personality", icon: Brain, labelKey: "feat_personality" as TranslationKey, color: "text-ts-purple", bg: "bg-ts-purple/10" },
  { id: "skill_experience", icon: Palette, labelKey: "feat_experiences" as TranslationKey, color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  { id: "air_quality", icon: Wind, labelKey: "feat_air_quality" as TranslationKey, color: "text-ts-sky", bg: "bg-ts-sky/10" },
  { id: "lost_item", icon: Luggage, labelKey: "feat_lost_found" as TranslationKey, color: "text-ts-rose", bg: "bg-ts-rose/10" },
  { id: "rest_stop", icon: MapPin, labelKey: "feat_rest_stops" as TranslationKey, color: "text-ts-green", bg: "bg-ts-green/10" },
  { id: "travel_risk", icon: BarChart3, labelKey: "feat_risk_score" as TranslationKey, color: "text-ts-rose", bg: "bg-ts-rose/10" },
  { id: "digital_passport", icon: Globe, labelKey: "feat_passport" as TranslationKey, color: "text-primary", bg: "bg-primary/10" },
  { id: "sunrise_sunset", icon: Sunrise, labelKey: "feat_sunrise_set" as TranslationKey, color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  { id: "travel_challenge", icon: Target, labelKey: "feat_challenges" as TranslationKey, color: "text-ts-rose", bg: "bg-ts-rose/10" },
  { id: "voice_assistant", icon: Mic, labelKey: "feat_voice_guide" as TranslationKey, color: "text-primary", bg: "bg-primary/10" },
  { id: "budget_tracker", icon: IndianRupee, labelKey: "feat_budget_tracker" as TranslationKey, color: "text-ts-green", bg: "bg-ts-green/10" },
  { id: "fake_call", icon: Phone, labelKey: "feat_fake_call" as TranslationKey, color: "text-destructive", bg: "bg-destructive/10" },
];

export default function DesktopSidebar({
  activeTab, setActiveTab, onFeatureClick, onSafetyClick, onEmergencyClick, cartCount
}: DesktopSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`hidden md:flex flex-col h-full bg-card border-r border-border shrink-0 transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[240px]"}`}
    >
      {/* Logo */}
      <div className={`p-4 flex items-center ${collapsed ? "justify-center" : "gap-3"} border-b border-border`}>
        <div className="ts-gradient-hero w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
          <Compass className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-sm font-display font-bold text-foreground">TripSaarthi</h1>
            <p className="text-[9px] text-muted-foreground">Smart Travel Companion</p>
          </div>
        )}
      </div>

      {/* Main nav */}
      <div className="p-3 space-y-1">
        {!collapsed && <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">{t("navigation")}</p>}
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded-xl transition text-left ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-primary" : ""}`} />
              {!collapsed && <span className={`text-xs font-medium ${isActive ? "font-bold" : ""}`}>{t(item.labelKey)}</span>}
              {!collapsed && item.id === "home" && cartCount > 0 && (
                <span className="ml-auto text-[9px] font-bold bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="mx-3 border-t border-border" />

      {/* Quick Features */}
      <div className="p-3 flex-1 overflow-y-auto ts-scrollbar-hide space-y-1">
        {!collapsed && <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">{t("quick_tools")}</p>}
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <button
              key={feat.id}
              onClick={() => onFeatureClick(feat.id)}
              className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3 px-3"} py-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition`}
            >
              <div className={`${feat.bg} p-1.5 rounded-lg shrink-0`}>
                <Icon className={`w-3.5 h-3.5 ${feat.color}`} />
              </div>
              {!collapsed && <span className="text-[11px] font-medium">{t(feat.labelKey)}</span>}
            </button>
          );
        })}
      </div>

      <div className="p-3 border-t border-border space-y-1">
        <button
          onClick={() => onFeatureClick("settings")}
          className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3 px-3"} py-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="text-[11px] font-medium">{t("settings")}</span>}
        </button>
        <button
          onClick={onSafetyClick}
          className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3 px-3"} py-2 rounded-xl text-muted-foreground hover:bg-ts-saffron/10 hover:text-ts-saffron transition`}
        >
          <ShieldAlert className="w-4 h-4 text-ts-saffron shrink-0" />
          {!collapsed && <span className="text-[11px] font-medium">{t("safety_info")}</span>}
        </button>
        <button
          onClick={onEmergencyClick}
          className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3 px-3"} py-2 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition`}
        >
          <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
          {!collapsed && <span className="text-[11px] font-medium">{t("emergency")}</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-3 border-t border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </motion.div>
  );
}
