import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, X, MapPin, ChevronRight } from "lucide-react";
import { flattenMockData, type Place } from "@/lib/tripData";

interface GlobalSearchProps {
  onClose: () => void;
  onSelectPlace: (item: Place) => void;
}

export default function GlobalSearch({ onClose, onSelectPlace }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const allPlaces = useMemo(() => flattenMockData(), []);

  const filtered = query.trim()
    ? allPlaces.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.loc.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col"
    >
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 flex items-center bg-muted rounded-xl px-3 py-2.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            autoFocus
            placeholder="Search places, cities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 ml-3 bg-transparent outline-none text-sm font-medium text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {!query ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Search className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">Discover incredible India.</p>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground mt-12">
            No places found. Try "Delhi" or "Taj".
          </p>
        ) : (
          <div className="space-y-2 pt-2">
            {filtered.map((place) => (
              <button
                key={place.name}
                onClick={() => {
                  onSelectPlace(place);
                  onClose();
                }}
                className="w-full bg-card p-3 rounded-2xl flex items-center gap-4 hover:bg-primary/5 transition border border-border text-left active:scale-[0.98]"
              >
                <img src={place.img} alt={place.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{place.name}</p>
                  <p className="text-xs text-muted-foreground">{place.loc} • {place.category}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
