import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mic, MicOff, Volume2, VolumeX, Send, Loader2 } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface VoiceAssistantViewProps {
  onBack: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function VoiceAssistantView({ onBack }: VoiceAssistantViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      synthRef.current.cancel();
      recognitionRef.current?.abort();
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!ttsEnabled) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-IN";
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  }, [ttsEnabled]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setTextInput("");
    setTranscript("");

    try {
      const { data, error } = await supabase.functions.invoke("travel-voice-assistant", {
        body: { message: text.trim(), history: messages.slice(-10) },
      });

      if (error) throw error;
      if (data?.error) {
        toast({ variant: "destructive", title: "Error", description: data.error });
        setIsLoading(false);
        return;
      }

      const reply = data?.reply || "Sorry, I couldn't process that.";
      const assistantMsg: Message = { role: "assistant", content: reply };
      setMessages(prev => [...prev, assistantMsg]);
      speak(reply);
    } catch (err: any) {
      console.error("Voice assistant error:", err);
      toast({ variant: "destructive", title: "Connection Error", description: "Could not reach the AI assistant." });
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, speak]);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ variant: "destructive", title: "Not Supported", description: "Speech recognition is not available in this browser." });
      return;
    }

    synthRef.current.cancel();
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (e: any) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          final += e.results[i][0].transcript;
        } else {
          interim += e.results[i][0].transcript;
        }
      }
      if (final) {
        setTranscript(final);
        sendMessage(final);
        setIsListening(false);
      } else {
        setTranscript(interim);
      }
    };

    recognition.onerror = (e: any) => {
      console.error("Speech recognition error:", e.error);
      setIsListening(false);
      if (e.error !== "aborted") {
        toast({ variant: "destructive", title: "Microphone Error", description: "Could not access microphone. Check permissions." });
      }
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setTranscript("");
  }, [sendMessage]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(textInput);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            🎙️ Voice Assistant
          </h2>
          <p className="text-[10px] text-muted-foreground">
            {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Tap mic or type to ask"}
          </p>
        </div>
        <button onClick={() => { synthRef.current.cancel(); setTtsEnabled(!ttsEnabled); }}
          className={`p-2 rounded-xl transition ${ttsEnabled ? "bg-primary/10" : "bg-muted"}`}>
          {ttsEnabled ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4 text-muted-foreground" />}
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3 ts-scrollbar-hide">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎙️</span>
            </div>
            <h3 className="text-base font-display font-bold text-foreground mb-1">AI Travel Companion</h3>
            <p className="text-xs text-muted-foreground max-w-[240px] mx-auto mb-4">
              Ask me anything about travel in India! Try:
            </p>
            <div className="space-y-2 max-w-[280px] mx-auto">
              {["What places are near me?", "Find food within ₹200", "Is it safe to travel solo in Goa?", "Best time to visit Ladakh?"].map((q) => (
                <button key={q} onClick={() => sendMessage(q)}
                  className="w-full bg-card border border-border rounded-xl px-3 py-2.5 text-[11px] text-foreground text-left hover:border-primary/30 transition ts-shadow-card">
                  "{q}"
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border ts-shadow-card rounded-bl-md"
              }`}>
                <p className={`text-xs leading-relaxed ${msg.role === "assistant" ? "text-foreground" : ""}`}>{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 ts-shadow-card">
              <div className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                <span className="text-[11px] text-muted-foreground">Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Live transcript */}
      {transcript && isListening && (
        <div className="px-5 pb-2">
          <div className="bg-primary/5 border border-primary/20 rounded-xl px-3 py-2">
            <p className="text-[11px] text-primary italic">🎤 {transcript}</p>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="px-5 pb-5 pt-2 border-t border-border shrink-0">
        <div className="flex items-center gap-2">
          {/* Mic button */}
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isLoading}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition active:scale-95 shrink-0 ${
              isListening
                ? "bg-destructive text-destructive-foreground animate-pulse"
                : "bg-primary text-primary-foreground"
            } ${isLoading ? "opacity-50" : ""}`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text input */}
          <form onSubmit={handleTextSubmit} className="flex-1 flex gap-2">
            <input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Or type your question..."
              className="flex-1 bg-card border border-border rounded-xl px-3 py-3 text-xs text-foreground placeholder:text-muted-foreground"
              disabled={isLoading}
            />
            <button type="submit" disabled={!textInput.trim() || isLoading}
              className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center active:scale-95 transition disabled:opacity-40">
              <Send className="w-4 h-4 text-primary" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
