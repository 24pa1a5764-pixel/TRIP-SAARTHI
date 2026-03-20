import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, MapPin, Send, Users } from "lucide-react";
import { COMMUNITY_MESSAGES, type CommunityMessage } from "@/lib/featureData";

interface CommunityChatProps {
  onBack: () => void;
}

export default function CommunityChat({ onBack }: CommunityChatProps) {
  const [messages, setMessages] = useState<CommunityMessage[]>(COMMUNITY_MESSAGES);
  const [input, setInput] = useState("");
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, likes: likedIds.has(id) ? m.likes - 1 : m.likes + 1 } : m));
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg: CommunityMessage = {
      id: Date.now(),
      user: "You",
      avatar: "https://ui-avatars.com/api/?name=You&background=2563eb&color=fff",
      city: "Traveler",
      text: input,
      time: "Just now",
      likes: 0,
    };
    setMessages(prev => [msg, ...prev]);
    setInput("");
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-sm font-display font-bold text-foreground flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" /> Community Chat
          </h2>
          <p className="text-[10px] text-ts-green font-bold">{messages.length} travelers online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3 ts-scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="bg-card rounded-2xl p-3.5 ts-shadow-card border border-border"
          >
            <div className="flex items-start gap-2.5">
              <img src={msg.avatar} alt={msg.user} className="w-8 h-8 rounded-xl" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">{msg.user}</span>
                  <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5" /> {msg.city}
                  </span>
                  <span className="text-[9px] text-muted-foreground ml-auto">{msg.time}</span>
                </div>
                <p className="text-xs text-foreground mt-1 leading-relaxed">{msg.text}</p>
                <button
                  onClick={() => toggleLike(msg.id)}
                  className="flex items-center gap-1 mt-2 active:scale-95 transition"
                >
                  <Heart className={`w-3 h-3 ${likedIds.has(msg.id) ? "fill-ts-rose text-ts-rose" : "text-muted-foreground"}`} />
                  <span className={`text-[10px] font-bold ${likedIds.has(msg.id) ? "text-ts-rose" : "text-muted-foreground"}`}>
                    {msg.likes}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 pt-2 flex gap-2 shrink-0 border-t border-border">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Share a tip with travelers..."
          className="flex-1 bg-muted border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition text-foreground placeholder:text-muted-foreground"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="ts-gradient-hero text-primary-foreground p-3 rounded-xl transition active:scale-95 disabled:opacity-40"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
