import { Home, MessageCircle, UserCircle } from "lucide-react";

interface BottomNavProps {
  active: string;
  setActive: (tab: string) => void;
}

const tabs = [
  { id: "home", icon: Home, label: "Home" },
  { id: "chat", icon: MessageCircle, label: "Saarthi AI" },
  { id: "profile", icon: UserCircle, label: "Profile" },
];

export default function BottomNav({ active, setActive }: BottomNavProps) {
  return (
    <div className="h-[72px] bg-card/95 backdrop-blur-xl border-t border-border flex items-center justify-around px-2 shrink-0">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`flex flex-col items-center justify-center w-full h-full transition duration-300 ${
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className={`w-5 h-5 mb-1 transition ${isActive ? "scale-110" : ""}`} />
            <span className="text-[10px] font-semibold">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
