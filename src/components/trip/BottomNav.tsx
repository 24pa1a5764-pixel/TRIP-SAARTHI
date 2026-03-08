import { Home, MessageCircle, UserCircle, Map } from "lucide-react";
import { motion } from "framer-motion";

interface BottomNavProps {
  active: string;
  setActive: (tab: string) => void;
  cartCount?: number;
}

const tabs = [
  { id: "home", icon: Home, label: "Home" },
  { id: "discover", icon: Map, label: "Discover" },
  { id: "chat", icon: MessageCircle, label: "Saarthi AI" },
  { id: "profile", icon: UserCircle, label: "Profile" },
];

export default function BottomNav({ active, setActive, cartCount = 0 }: BottomNavProps) {
  return (
    <div className="h-[72px] bg-card/95 backdrop-blur-xl border-t border-border flex items-center justify-around px-1 shrink-0 relative">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className="flex flex-col items-center justify-center flex-1 h-full transition duration-200 relative"
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
              {t.id === "chat" && cartCount > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-ts-rose text-primary-foreground text-[8px] font-black rounded-full flex items-center justify-center">
                  !
                </span>
              )}
            </div>
            <span className={`text-[10px] font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
