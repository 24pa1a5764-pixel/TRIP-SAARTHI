import { Home, MessageCircle, UserCircle, Map, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import type { TranslationKey } from "@/lib/translations";

interface BottomNavProps {
  active: string;
  setActive: (tab: string) => void;
  cartCount?: number;
}

const tabs = [
  { id: "home", icon: Home, labelKey: "nav_home" as TranslationKey },
  { id: "discover", icon: Map, labelKey: "nav_discover" as TranslationKey },
  { id: "community", icon: Users, labelKey: "nav_community" as TranslationKey },
  { id: "chat", icon: MessageCircle, labelKey: "nav_chat" as TranslationKey },
  { id: "profile", icon: UserCircle, labelKey: "nav_profile" as TranslationKey },
];

export default function BottomNav({ active, setActive, cartCount = 0 }: BottomNavProps) {
  const { t } = useTranslation();
  return (
    <div className="h-[72px] bg-card/95 backdrop-blur-xl border-t border-border flex items-center justify-around px-1 shrink-0 relative">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className="flex flex-col items-center justify-center flex-1 h-full transition duration-200 relative ts-no-min-touch"
          >
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <div className="relative">
              <Icon className={`w-5 h-5 mb-1 transition ${isActive ? "text-primary scale-110" : "text-muted-foreground"}`} />
            </div>
            <span className={`text-[9px] font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
              {t(tab.labelKey)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
