import { motion } from "framer-motion";
import {
  Search, Landmark, Sunset, Coffee, Briefcase, ShieldAlert,
  ChevronRight, Wand2, Star, Zap, TrendingUp, Mountain,
  Heart, Gem, Users, Palette, AlertTriangle, Leaf,
  Utensils, CloudSun, Medal, Bus, PartyPopper, Globe, Camera,
  AlertOctagon, Clock, Compass, Brain, Wind, Luggage, MapPin, BarChart3, Sunrise, Target, Mic, IndianRupee, Phone
} from "lucide-react";
import type { UserData, Place } from "@/lib/tripData";
import { MOCK_DATA } from "@/lib/tripData";
import { useTranslation } from "@/hooks/useTranslation";
import type { TranslationKey } from "@/lib/translations";

interface HomeOverlayProps {
  user: UserData;
  cartCount: number;
  onSearch: () => void;
  onStartJourney: () => void;
  onCategoryClick: (cat: string) => void;
  onSafetyClick: () => void;
  onCartClick: () => void;
  onMoodClick: () => void;
  onHiddenGemsClick: () => void;
  onCommunityClick: () => void;
  onEmergencyClick: () => void;
  onBudgetClick: () => void;
  onCarbonClick: () => void;
  onFoodFinderClick: () => void;
  onWeatherClick: () => void;
  onBadgesClick: () => void;
  onTransportClick: () => void;
  onFestivalsClick: () => void;
  onLanguageClick: () => void;
  onPhotoSpotsClick: () => void;
  onScamAlertClick: () => void;
  onTimeOptimizerClick: () => void;
  onSoloSafetyClick: () => void;
  onPersonalityClick: () => void;
  onSkillExperienceClick: () => void;
  onAirQualityClick: () => void;
  onLostItemClick: () => void;
  onRestStopClick: () => void;
  onTravelRiskClick: () => void;
  onDigitalPassportClick: () => void;
  onSunriseSunsetClick: () => void;
  onTravelChallengeClick: () => void;
  onVoiceAssistantClick: () => void;
  onBudgetTrackerClick: () => void;
  onFakeCallClick: () => void;
}

const categories = [
  { id: "heritage", icon: Landmark, labelKey: "cat_heritage" as TranslationKey, color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  { id: "nature", icon: Sunset, labelKey: "cat_nature" as TranslationKey, color: "text-ts-green", bg: "bg-ts-green/10" },
  { id: "food", icon: Coffee, labelKey: "cat_food" as TranslationKey, color: "text-ts-rose", bg: "bg-ts-rose/10" },
  { id: "shopping", icon: Briefcase, labelKey: "cat_markets" as TranslationKey, color: "text-ts-purple", bg: "bg-ts-purple/10" },
  { id: "adventure", icon: Mountain, labelKey: "cat_adventure" as TranslationKey, color: "text-ts-sky", bg: "bg-ts-sky/10" },
  { id: "spiritual", icon: Star, labelKey: "cat_spiritual" as TranslationKey, color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
];

const trending: Place[] = [
  MOCK_DATA.heritage[0],
  MOCK_DATA.nature[1],
  MOCK_DATA.adventure?.[0],
  MOCK_DATA.heritage[2],
  MOCK_DATA.nature[2],
  MOCK_DATA.food?.[0],
  MOCK_DATA.heritage[3],
  MOCK_DATA.shopping?.[0],
  MOCK_DATA.spiritual?.[0],
  MOCK_DATA.nature[3],
].filter(Boolean) as Place[];

const quickFeatures = [
  { icon: Utensils, labelKey: "feat_food_finder" as TranslationKey, color: "text-ts-rose", bg: "bg-ts-rose/10", key: "onFoodFinderClick" },
  { icon: CloudSun, labelKey: "feat_weather" as TranslationKey, color: "text-ts-sky", bg: "bg-ts-sky/10", key: "onWeatherClick" },
  { icon: Palette, labelKey: "feat_mood_match" as TranslationKey, color: "text-ts-purple", bg: "bg-ts-purple/10", key: "onMoodClick" },
  { icon: Gem, labelKey: "feat_hidden_gems" as TranslationKey, color: "text-ts-sky", bg: "bg-ts-sky/10", key: "onHiddenGemsClick" },
  { icon: Medal, labelKey: "feat_badges" as TranslationKey, color: "text-ts-saffron", bg: "bg-ts-saffron/10", key: "onBadgesClick" },
  { icon: Bus, labelKey: "feat_transport" as TranslationKey, color: "text-ts-green", bg: "bg-ts-green/10", key: "onTransportClick" },
  { icon: PartyPopper, labelKey: "feat_festivals" as TranslationKey, color: "text-ts-purple", bg: "bg-ts-purple/10", key: "onFestivalsClick" },
  { icon: Globe, labelKey: "feat_translator" as TranslationKey, color: "text-ts-saffron", bg: "bg-ts-saffron/10", key: "onLanguageClick" },
  { icon: Camera, labelKey: "feat_photo_spots" as TranslationKey, color: "text-ts-sky", bg: "bg-ts-sky/10", key: "onPhotoSpotsClick" },
  { icon: Users, labelKey: "feat_community" as TranslationKey, color: "text-ts-green", bg: "bg-ts-green/10", key: "onCommunityClick" },
  { icon: Leaf, labelKey: "feat_eco_track" as TranslationKey, color: "text-ts-green", bg: "bg-ts-green/10", key: "onCarbonClick" },
  { icon: AlertOctagon, labelKey: "feat_scam_alerts" as TranslationKey, color: "text-destructive", bg: "bg-destructive/10", key: "onScamAlertClick" },
  { icon: Clock, labelKey: "feat_time_optimizer" as TranslationKey, color: "text-ts-purple", bg: "bg-ts-purple/10", key: "onTimeOptimizerClick" },
  { icon: Compass, labelKey: "feat_solo_safety" as TranslationKey, color: "text-ts-green", bg: "bg-ts-green/10", key: "onSoloSafetyClick" },
  { icon: Brain, labelKey: "feat_personality" as TranslationKey, color: "text-ts-purple", bg: "bg-ts-purple/10", key: "onPersonalityClick" },
  { icon: Palette, labelKey: "feat_experiences" as TranslationKey, color: "text-ts-saffron", bg: "bg-ts-saffron/10", key: "onSkillExperienceClick" },
  { icon: Wind, labelKey: "feat_air_quality" as TranslationKey, color: "text-ts-sky", bg: "bg-ts-sky/10", key: "onAirQualityClick" },
  { icon: Luggage, labelKey: "feat_lost_found" as TranslationKey, color: "text-ts-rose", bg: "bg-ts-rose/10", key: "onLostItemClick" },
  { icon: MapPin, labelKey: "feat_rest_stops" as TranslationKey, color: "text-ts-green", bg: "bg-ts-green/10", key: "onRestStopClick" },
  { icon: BarChart3, labelKey: "feat_risk_score" as TranslationKey, color: "text-ts-rose", bg: "bg-ts-rose/10", key: "onTravelRiskClick" },
  { icon: Globe, labelKey: "feat_passport" as TranslationKey, color: "text-primary", bg: "bg-primary/10", key: "onDigitalPassportClick" },
  { icon: Sunrise, labelKey: "feat_sunrise_set" as TranslationKey, color: "text-ts-saffron", bg: "bg-ts-saffron/10", key: "onSunriseSunsetClick" },
  { icon: Target, labelKey: "feat_challenges" as TranslationKey, color: "text-ts-rose", bg: "bg-ts-rose/10", key: "onTravelChallengeClick" },
  { icon: Mic, labelKey: "feat_voice_guide" as TranslationKey, color: "text-primary", bg: "bg-primary/10", key: "onVoiceAssistantClick" },
  { icon: IndianRupee, labelKey: "feat_budget_tracker" as TranslationKey, color: "text-ts-green", bg: "bg-ts-green/10", key: "onBudgetTrackerClick" },
  { icon: Phone, labelKey: "feat_fake_call" as TranslationKey, color: "text-destructive", bg: "bg-destructive/10", key: "onFakeCallClick" },
];

export default function HomeOverlay({
  user, cartCount, onSearch, onStartJourney, onCategoryClick,
  onSafetyClick, onCartClick, onMoodClick, onHiddenGemsClick,
  onCommunityClick, onEmergencyClick, onBudgetClick, onCarbonClick,
  onFoodFinderClick, onWeatherClick, onBadgesClick, onTransportClick,
  onFestivalsClick, onLanguageClick, onPhotoSpotsClick,
  onScamAlertClick, onTimeOptimizerClick, onSoloSafetyClick,
  onPersonalityClick, onSkillExperienceClick, onAirQualityClick,
  onLostItemClick, onRestStopClick, onTravelRiskClick,
  onDigitalPassportClick, onSunriseSunsetClick, onTravelChallengeClick,
  onVoiceAssistantClick, onBudgetTrackerClick, onFakeCallClick,
}: HomeOverlayProps) {
  const featureClickMap: Record<string, () => void> = {
    onFoodFinderClick, onWeatherClick, onMoodClick, onHiddenGemsClick,
    onBadgesClick, onTransportClick, onFestivalsClick, onLanguageClick,
    onPhotoSpotsClick, onCommunityClick, onCarbonClick,
    onScamAlertClick, onTimeOptimizerClick, onSoloSafetyClick,
    onPersonalityClick, onSkillExperienceClick, onAirQualityClick,
    onLostItemClick, onRestStopClick, onTravelRiskClick,
    onDigitalPassportClick, onSunriseSunsetClick, onTravelChallengeClick,
    onVoiceAssistantClick, onBudgetTrackerClick, onFakeCallClick,
  };
  const { t } = useTranslation();

  return (
    <div className="h-full overflow-y-auto ts-scrollbar-hide">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-5 pt-5 pb-2 flex items-center justify-between"
      >
        <div>
          <p className="text-xs text-muted-foreground">{t("welcome_back")}</p>
          <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">{user.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onEmergencyClick} className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center active:scale-95 transition md:hidden">
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </button>
          <button onClick={onSafetyClick} className="w-10 h-10 rounded-xl bg-ts-saffron/10 flex items-center justify-center active:scale-95 transition md:hidden">
            <ShieldAlert className="w-4 h-4 text-ts-saffron" />
          </button>
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl border-2 border-border object-cover" />
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }} className="px-5 pb-4 pt-2">
        <button onClick={onSearch} className="w-full flex items-center gap-3 bg-card rounded-2xl px-4 py-3.5 ts-shadow-card border border-border">
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium flex-1 text-left">{t("search_placeholder")}</span>
          <div className="bg-muted px-2 py-1 rounded-lg"><span className="text-[9px] font-bold text-muted-foreground">AI</span></div>
        </button>
      </motion.div>

      {/* Desktop: Two-column layout */}
      <div className="md:grid md:grid-cols-3 md:gap-5 md:px-5">
        {/* Left column - Hero + Categories */}
        <div className="md:col-span-2">
          {/* Hero Banner */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="px-5 md:px-0 mb-4">
            <div className="ts-gradient-hero rounded-3xl p-5 md:p-8 ts-shadow-elevated relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,white_0%,transparent_60%)]" />
              <div className="absolute top-3 right-3 bg-primary-foreground/10 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3 text-primary-foreground" />
                <span className="text-[10px] text-primary-foreground font-bold">{t("ai_powered")}</span>
              </div>
              <div className="relative z-10">
                <h2 className="text-lg md:text-xl font-display font-bold text-primary-foreground mb-0.5">{t("plan_dream_trip")}</h2>
                <p className="text-primary-foreground/50 text-xs md:text-sm mb-4 max-w-[300px]">{t("plan_dream_desc")}</p>
                <button onClick={onStartJourney} className="bg-primary-foreground text-primary font-bold text-xs md:text-sm py-3 px-5 md:px-7 rounded-xl flex items-center gap-2 transition active:scale-95 ts-shadow-card">
                  <Wand2 className="w-4 h-4" />
                  {t("start_planning")}
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="px-5 md:px-0 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-display font-bold text-foreground">{t("explore_categories")}</h3>
              <span className="text-[10px] text-muted-foreground">{Object.keys(MOCK_DATA).length} types</span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <motion.button key={cat.id} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 + i * 0.03 }}
                    onClick={() => onCategoryClick(cat.id)} className="flex flex-col items-center gap-2 bg-card p-3 rounded-2xl ts-shadow-card border border-border active:scale-95 transition">
                    <div className={`${cat.bg} p-2.5 rounded-xl`}><Icon className={`w-5 h-5 ${cat.color}`} /></div>
                    <span className="text-[10px] font-bold text-foreground">{t(cat.labelKey)}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right column - Quick stats (desktop only) */}
        <div className="hidden md:block">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="space-y-3">
            {/* Trip stats */}
            <div className="bg-card rounded-2xl ts-shadow-card border border-border p-4">
              <h4 className="text-xs font-bold text-foreground mb-3">{t("quick_stats")}</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-ts-saffron/10 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-ts-saffron">{cartCount}</p>
                  <p className="text-[9px] text-muted-foreground">{t("in_cart")}</p>
                </div>
                <div className="bg-ts-sky/10 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-ts-sky">10+</p>
                  <p className="text-[9px] text-muted-foreground">{t("features")}</p>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-card rounded-2xl ts-shadow-card border border-border p-4">
              <h4 className="text-xs font-bold text-foreground mb-3">{t("quick_actions")}</h4>
              <div className="space-y-2">
                <button onClick={onStartJourney} className="w-full flex items-center gap-2 bg-primary/10 text-primary px-3 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition">
                  <Wand2 className="w-3.5 h-3.5" /> {t("plan_new_trip")}
                </button>
                <button onClick={onCartClick} className="w-full flex items-center gap-2 bg-muted px-3 py-2.5 rounded-xl text-xs font-medium text-foreground active:scale-95 transition">
                  <Heart className="w-3.5 h-3.5 text-ts-rose" /> {t("view_cart")} ({cartCount})
                </button>
                <button onClick={onBudgetClick} className="w-full flex items-center gap-2 bg-muted px-3 py-2.5 rounded-xl text-xs font-medium text-foreground active:scale-95 transition">
                  <TrendingUp className="w-3.5 h-3.5 text-ts-green" /> {t("budget_optimizer")}
                </button>
              </div>
            </div>

            {/* Weather widget */}
            <button onClick={onWeatherClick} className="w-full bg-card rounded-2xl ts-shadow-card border border-border p-4 text-left hover:border-ts-sky/30 transition">
              <div className="flex items-center gap-3">
                <span className="text-3xl">☀️</span>
                <div>
                  <p className="text-xs font-bold text-foreground">38°C - Delhi</p>
                  <p className="text-[10px] text-muted-foreground">{t("heat_wave_alert")}</p>
                </div>
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Quick Features - horizontal scroll on mobile, grid on desktop */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 }} className="px-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display font-bold text-foreground">{t("quick_tools")}</h3>
          <span className="text-[10px] text-muted-foreground">{quickFeatures.length} tools</span>
        </div>
        {/* Mobile: horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto ts-scrollbar-hide pb-1 md:hidden">
          {quickFeatures.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.button key={feat.key} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15 + i * 0.04 }}
                onClick={featureClickMap[feat.key]} className="shrink-0 flex items-center gap-2 bg-card px-3.5 py-2.5 rounded-xl ts-shadow-card border border-border active:scale-95 transition">
                <div className={`${feat.bg} p-1.5 rounded-lg`}><Icon className={`w-3.5 h-3.5 ${feat.color}`} /></div>
                <span className="text-[10px] font-bold text-foreground whitespace-nowrap">{t(feat.labelKey)}</span>
              </motion.button>
            );
          })}
        </div>
        {/* Desktop: wrapped grid */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-2">
          {quickFeatures.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.button key={feat.key} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15 + i * 0.02 }}
                onClick={featureClickMap[feat.key]} className="flex items-center gap-2 bg-card px-3 py-2.5 rounded-xl ts-shadow-card border border-border hover:border-primary/20 active:scale-95 transition">
                <div className={`${feat.bg} p-1.5 rounded-lg shrink-0`}><Icon className={`w-3.5 h-3.5 ${feat.color}`} /></div>
                <span className="text-[10px] font-bold text-foreground whitespace-nowrap truncate">{t(feat.labelKey)}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Trending */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }} className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display font-bold text-foreground flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-ts-saffron" /> {t("trending_now")}
          </h3>
          <span className="text-[10px] text-muted-foreground">{trending.length} {t("places")}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {trending.map((place, i) => (
            <motion.button
              key={place.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.03 }}
              onClick={() => onCategoryClick(place.category || "heritage")}
              className="bg-card rounded-2xl ts-shadow-card border border-border overflow-hidden active:scale-[0.98] transition text-left"
            >
              <div className="w-full h-28 md:h-32 bg-muted relative overflow-hidden">
                <img src={place.img} alt={place.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                {place.category && (
                  <span className="absolute top-2 left-2 text-[8px] font-bold bg-foreground/50 text-primary-foreground px-2 py-0.5 rounded-lg backdrop-blur-sm capitalize">{place.category}</span>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-foreground truncate">{place.name}</p>
                <p className="text-[10px] text-muted-foreground">{place.loc}</p>
                {place.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-ts-saffron fill-ts-saffron" />
                    <span className="text-[10px] font-bold text-foreground">{place.rating}</span>
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Bottom spacer for nav bar */}
      <div className="h-24 md:h-8" />

      {cartCount > 0 && (
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-30">
          <button onClick={onCartClick} className="ts-gradient-hero text-primary-foreground px-6 py-3.5 rounded-2xl ts-shadow-elevated flex items-center gap-3 font-bold text-sm active:scale-95 transition">
            <span className="bg-primary-foreground/20 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">{cartCount}</span>
            <span>{t("view_trip_chart")}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
