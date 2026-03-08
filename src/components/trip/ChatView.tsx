import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Loader2 } from "lucide-react";
import { fetchWithRetry, type ChatMessage } from "@/lib/tripData";

interface ChatViewProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const apiKey = "";

export default function ChatView({ messages, setMessages }: ChatViewProps) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (textOverride?: string) => {
    const text = textOverride || input;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);

    try {
      const prompt = `You are TripSaarthi AI, a friendly, helpful Indian travel expert. The user asks: "${text}". Answer concisely and practically. Keep it under 3 sentences. No markdown. Be enthusiastic.`;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const payload = { contents: [{ parts: [{ text: prompt }] }] };

      const result = await fetchWithRetry(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I missed that.";
      setMessages((prev) => [...prev, { role: "bot", text: responseText }]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Network error. Try asking again?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-2xl ts-gradient-hero flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-sm font-display font-bold text-foreground">Saarthi AI</h2>
          <p className="text-[10px] text-ts-green font-bold">● Online & Ready</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 ts-scrollbar-hide">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <Bot className="w-12 h-12 text-primary/20 mb-3" />
            <p className="text-sm font-bold text-foreground mb-1">Namaste! How can I help you travel better today?</p>
            <p className="text-[11px] text-muted-foreground">Ask me anything about India travel.</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex mb-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 text-sm rounded-2xl ${
                msg.role === "user"
                  ? "ts-gradient-hero text-primary-foreground rounded-br-md"
                  : "bg-card ts-shadow-card border border-border text-foreground rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start mb-3">
            <div className="bg-card ts-shadow-card border border-border px-4 py-3 rounded-2xl rounded-bl-md">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-5 pb-2 flex gap-2 overflow-x-auto ts-scrollbar-hide">
        {["Safest areas for solo travel?", "Best street food spots?", "Tips to avoid crowds?"].map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="shrink-0 bg-card border border-border px-4 py-2 rounded-full text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition ts-shadow-card"
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
          placeholder="Ask Saarthi..."
          className="flex-1 bg-muted border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition text-foreground placeholder:text-muted-foreground"
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim()}
          className="ts-gradient-hero text-primary-foreground p-3 rounded-xl transition active:scale-95 disabled:opacity-40"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
