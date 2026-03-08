import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import { getChatResponse, type ChatMessage } from "@/lib/tripData";
import { useTranslation } from "@/hooks/useTranslation";

interface ChatViewProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const quickPrompts = [
  "Safest areas for solo travel?",
  "Best street food spots?",
  "Tips to avoid crowds?",
  "Budget tips for India?",
  "Best time to visit?",
  "How to get around?",
];

export default function ChatView({ messages, setMessages }: ChatViewProps) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const sendMessage = async (textOverride?: string) => {
    const text = textOverride || input;
    if (!text.trim() || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay for more natural feel
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

    const response = getChatResponse(text);
    setMessages((prev) => [...prev, { role: "bot", text: response }]);
    setIsTyping(false);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0 border-b border-border">
        <div className="w-10 h-10 rounded-2xl ts-gradient-hero flex items-center justify-center relative">
          <Bot className="w-5 h-5 text-primary-foreground" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-ts-green rounded-full border-2 border-card" />
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-display font-bold text-foreground">{t("nav_chat")}</h2>
          <p className="text-[10px] text-ts-green font-bold">Online • Your travel expert</p>
        </div>
        <div className="bg-primary/10 px-2.5 py-1 rounded-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-[9px] font-bold text-primary">AI</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 ts-scrollbar-hide">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-3xl ts-gradient-hero flex items-center justify-center mb-4 ts-shadow-elevated">
              <Bot className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-sm font-bold text-foreground mb-1">Namaste! 🙏</p>
            <p className="text-xs text-muted-foreground max-w-[250px]">
              {t("saarthi_welcome")}
            </p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex mb-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "bot" && (
              <div className="w-6 h-6 rounded-lg ts-gradient-hero flex items-center justify-center mr-2 mt-1 shrink-0">
                <Bot className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            <div
              className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "ts-gradient-hero text-primary-foreground rounded-2xl rounded-br-md"
                  : "bg-card ts-shadow-card border border-border text-foreground rounded-2xl rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start mb-3"
          >
            <div className="w-6 h-6 rounded-lg ts-gradient-hero flex items-center justify-center mr-2 mt-1 shrink-0">
              <Bot className="w-3 h-3 text-primary-foreground" />
            </div>
            <div className="bg-card ts-shadow-card border border-border px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                  className="w-2 h-2 rounded-full bg-muted-foreground/40"
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-5 pb-2 flex gap-2 overflow-x-auto ts-scrollbar-hide shrink-0">
        {quickPrompts.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="shrink-0 bg-card border border-border px-3.5 py-2 rounded-full text-[11px] font-medium text-muted-foreground hover:border-primary hover:text-primary transition ts-shadow-card"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 pt-2 flex gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={t("ask_anything")}
          className="flex-1 bg-muted border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition text-foreground placeholder:text-muted-foreground"
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isTyping}
          className="ts-gradient-hero text-primary-foreground p-3 rounded-xl transition active:scale-95 disabled:opacity-40"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
