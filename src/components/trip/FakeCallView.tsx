import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Phone, PhoneOff, Clock, User, Volume2 } from "lucide-react";

interface Props {
  onBack: () => void;
}

export default function FakeCallView({ onBack }: Props) {
  const [mode, setMode] = useState<"setup" | "ringing" | "call">("setup");
  const [delay, setDelay] = useState(5);
  const [callerName, setCallerName] = useState("Mom");
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ringTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (ringTimerRef.current) clearTimeout(ringTimerRef.current);
    };
  }, []);

  const startFakeCall = () => {
    ringTimerRef.current = setTimeout(() => {
      setMode("ringing");
      // Vibrate if supported
      if (navigator.vibrate) navigator.vibrate([500, 200, 500, 200, 500]);
    }, delay * 1000);
    setMode("setup"); // keep on setup screen with countdown feel
    // Actually transition after delay
    setTimeout(() => setMode("ringing"), delay * 1000);
  };

  const answerCall = () => {
    setMode("call");
    setCallDuration(0);
    timerRef.current = setInterval(() => setCallDuration((d) => d + 1), 1000);
  };

  const endCall = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setMode("setup");
    setCallDuration(0);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="h-full overflow-y-auto ts-scrollbar-hide">
      <AnimatePresence mode="wait">
        {mode === "setup" && (
          <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
            <div className="px-5 pt-5 pb-3 flex items-center gap-3">
              <button onClick={onBack} className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center">
                <ArrowLeft className="w-4 h-4 text-foreground" />
              </button>
              <div>
                <h1 className="text-lg font-display font-bold text-foreground">Fake Call</h1>
                <p className="text-[10px] text-muted-foreground">Escape unsafe situations discreetly</p>
              </div>
            </div>

            <div className="flex-1 px-5 flex flex-col justify-center gap-6">
              <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-foreground mb-1.5 block">Caller Name</label>
                  <div className="flex gap-2">
                    {["Mom", "Dad", "Boss", "Friend"].map((n) => (
                      <button key={n} onClick={() => setCallerName(n)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${callerName === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Delay (seconds)
                  </label>
                  <div className="flex gap-2">
                    {[3, 5, 10, 30].map((s) => (
                      <button key={s} onClick={() => setDelay(s)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${delay === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {s}s
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={startFakeCall}
                className="w-full bg-ts-green text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Schedule Fake Call in {delay}s
              </button>

              <p className="text-[10px] text-muted-foreground text-center">
                💡 Keep your phone visible. The call screen will appear automatically after the delay.
              </p>
            </div>
          </motion.div>
        )}

        {mode === "ringing" && (
          <motion.div key="ringing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-full bg-gradient-to-b from-primary/90 to-primary flex flex-col items-center justify-center gap-8 px-8">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <div className="w-24 h-24 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
            </motion.div>

            <div className="text-center">
              <p className="text-primary-foreground/60 text-sm mb-1">Incoming Call</p>
              <h2 className="text-3xl font-bold text-primary-foreground">{callerName}</h2>
              <p className="text-primary-foreground/50 text-xs mt-1">Mobile</p>
            </div>

            <div className="flex items-center gap-12">
              <button onClick={endCall} className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center active:scale-95 transition shadow-lg">
                <PhoneOff className="w-7 h-7 text-white" />
              </button>
              <motion.button onClick={answerCall} animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-16 h-16 rounded-full bg-ts-green flex items-center justify-center active:scale-95 transition shadow-lg">
                <Phone className="w-7 h-7 text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {mode === "call" && (
          <motion.div key="call" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-full bg-gradient-to-b from-foreground/95 to-foreground flex flex-col items-center justify-between py-16 px-8">
            <div className="text-center">
              <p className="text-background/50 text-sm mb-1">{formatTime(callDuration)}</p>
              <h2 className="text-2xl font-bold text-background">{callerName}</h2>
            </div>

            <div className="w-20 h-20 rounded-full bg-background/10 flex items-center justify-center">
              <User className="w-10 h-10 text-background/60" />
            </div>

            <div className="flex items-center gap-8">
              <button className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-background/60" />
              </button>
              <button onClick={endCall} className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center active:scale-95 transition shadow-lg">
                <PhoneOff className="w-7 h-7 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
