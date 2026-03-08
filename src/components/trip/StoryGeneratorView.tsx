import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Sparkles, Copy, Check } from "lucide-react";
import { generateTravelStory } from "@/lib/featureData";
import type { SavedTrip } from "@/lib/tripData";

interface StoryGeneratorViewProps {
  trip: SavedTrip;
  onBack: () => void;
}

export default function StoryGeneratorView({ trip, onBack }: StoryGeneratorViewProps) {
  const [story, setStory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setStory(generateTravelStory(trip.places, trip.data.title));
    setLoading(false);
  };

  const copyStory = () => {
    if (story) {
      navigator.clipboard.writeText(story);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
      <div className="px-5 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-display font-bold text-foreground">📖 AI Story Generator</h2>
          <p className="text-[10px] text-muted-foreground">Create your travel narrative</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 ts-scrollbar-hide">
        {/* Trip Info */}
        <div className="bg-card rounded-2xl p-4 ts-shadow-card border border-border mb-4">
          <p className="text-sm font-bold text-foreground mb-1">{trip.data.title}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {trip.places.map(p => (
              <span key={p} className="text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-md">{p}</span>
            ))}
          </div>
        </div>

        {!story && !loading && (
          <motion.div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-3xl ts-gradient-saffron flex items-center justify-center mb-4 ts-shadow-elevated">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <p className="text-sm font-bold text-foreground mb-1">Generate Your Travel Story</p>
            <p className="text-xs text-muted-foreground max-w-[250px] mb-5">
              AI will craft a beautiful narrative from your trip with photos and memories
            </p>
            <button
              onClick={generate}
              className="ts-gradient-hero text-primary-foreground font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 ts-shadow-elevated active:scale-95 transition"
            >
              <Sparkles className="w-4 h-4" /> Generate Story
            </button>
          </motion.div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent mb-4"
            />
            <p className="text-sm font-bold text-foreground">Crafting your story...</p>
            <p className="text-[10px] text-muted-foreground mt-1">This takes a moment ✍️</p>
          </div>
        )}

        {story && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-card rounded-2xl p-5 ts-shadow-card border border-border">
              <div className="prose prose-sm max-w-none">
                {story.split("\n").map((line, i) => {
                  if (line.startsWith("# ")) return <h2 key={i} className="text-base font-display font-bold text-foreground mb-2">{line.slice(2)}</h2>;
                  if (line.startsWith("*")) return <p key={i} className="text-[10px] text-muted-foreground italic mb-3">{line.replace(/\*/g, "")}</p>;
                  if (line.trim() === "") return <br key={i} />;
                  return <p key={i} className="text-xs text-foreground leading-relaxed mb-2">{line}</p>;
                })}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={copyStory}
                className="flex-1 bg-card border border-border text-foreground font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 ts-shadow-card active:scale-[0.98] transition"
              >
                {copied ? <Check className="w-4 h-4 text-ts-green" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Story"}
              </button>
              <button
                onClick={generate}
                className="flex-1 ts-gradient-hero text-primary-foreground font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition"
              >
                <Sparkles className="w-4 h-4" /> Regenerate
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
