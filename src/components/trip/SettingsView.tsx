import { motion } from "framer-motion";
import { ArrowLeft, Sun, Moon, Bell, BellOff, Globe, ChevronRight, Check, Shield, Users, MapPin } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useSettings, LANGUAGES } from "@/hooks/useSettings";
import { useTranslation } from "@/hooks/useTranslation";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface SettingsViewProps {
  onBack: () => void;
}

export default function SettingsView({ onBack }: SettingsViewProps) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { language, notificationsEnabled, tripReminders, safetyAlerts, communityUpdates, updateSetting } = useSettings();
  const [showLangPicker, setShowLangPicker] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === language);

  if (showLangPicker) {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="flex items-center gap-3 px-5 pt-6 pb-4 border-b border-border">
          <button onClick={() => setShowLangPicker(false)} className="p-2 -ml-2 rounded-xl hover:bg-muted transition">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-base font-display font-bold text-foreground">{t("select_language")}</h2>
        </div>
        <div className="flex-1 overflow-y-auto ts-scrollbar-hide px-5 py-3">
          <div className="space-y-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  updateSetting("language", lang.code);
                  setShowLangPicker(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition ${
                  language === lang.code ? "bg-primary/10 border border-primary/20" : "hover:bg-muted border border-transparent"
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className={`text-sm font-semibold ${language === lang.code ? "text-primary" : "text-foreground"}`}>
                    {lang.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{lang.native}</span>
                </div>
                {language === lang.code && <Check className="w-5 h-5 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4 border-b border-border">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-muted transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-base font-display font-bold text-foreground">{t("settings")}</h2>
      </div>

      <div className="flex-1 overflow-y-auto ts-scrollbar-hide px-5 py-4 space-y-6">
        {/* Appearance */}
        <section>
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Appearance</h3>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border ts-shadow-card overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                {theme === "dark" ? (
                  <div className="w-9 h-9 rounded-xl bg-ts-purple/10 flex items-center justify-center">
                    <Moon className="w-4.5 h-4.5 text-ts-purple" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-ts-saffron/10 flex items-center justify-center">
                    <Sun className="w-4.5 h-4.5 text-ts-saffron" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">Dark Mode</p>
                  <p className="text-[10px] text-muted-foreground">{theme === "dark" ? "Currently dark" : "Currently light"}</p>
                </div>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>
          </motion.div>
        </section>

        {/* Language */}
        <section>
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Language</h3>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-card rounded-2xl border border-border ts-shadow-card overflow-hidden"
          >
            <button
              onClick={() => setShowLangPicker(true)}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-muted/50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Globe className="w-4.5 h-4.5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">App Language</p>
                  <p className="text-[10px] text-muted-foreground">
                    {currentLang?.label} ({currentLang?.native})
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </motion.div>
        </section>

        {/* Notifications */}
        <section>
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Notifications</h3>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border ts-shadow-card overflow-hidden divide-y divide-border"
          >
            {/* Master toggle */}
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${notificationsEnabled ? "bg-ts-green/10" : "bg-muted"}`}>
                  {notificationsEnabled ? (
                    <Bell className="w-4.5 h-4.5 text-ts-green" />
                  ) : (
                    <BellOff className="w-4.5 h-4.5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Notifications</p>
                  <p className="text-[10px] text-muted-foreground">{notificationsEnabled ? "Enabled" : "Disabled"}</p>
                </div>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={(v) => updateSetting("notificationsEnabled", v)}
              />
            </div>

            {notificationsEnabled && (
              <>
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm text-foreground">Trip Reminders</p>
                  </div>
                  <Switch
                    checked={tripReminders}
                    onCheckedChange={(v) => updateSetting("tripReminders", v)}
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-ts-saffron/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-ts-saffron" />
                    </div>
                    <p className="text-sm text-foreground">Safety Alerts</p>
                  </div>
                  <Switch
                    checked={safetyAlerts}
                    onCheckedChange={(v) => updateSetting("safetyAlerts", v)}
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-ts-purple/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-ts-purple" />
                    </div>
                    <p className="text-sm text-foreground">Community Updates</p>
                  </div>
                  <Switch
                    checked={communityUpdates}
                    onCheckedChange={(v) => updateSetting("communityUpdates", v)}
                  />
                </div>
              </>
            )}
          </motion.div>
        </section>

        {/* App info */}
        <section className="pb-6">
          <p className="text-center text-[10px] text-muted-foreground">TripSaarthi v1.0 • Made with ❤️ in India</p>
        </section>
      </div>
    </div>
  );
}
