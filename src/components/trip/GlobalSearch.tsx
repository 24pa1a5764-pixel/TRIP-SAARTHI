import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, X, ChevronRight, Star, MapPin, Clock } from "lucide-react";
import { flattenMockData, type Place } from "@/lib/tripData";

interface GlobalSearchProps {
  onClose: () => void;
  onSelectPlace: (item: Place) => void;
}

export default function GlobalSearch({ onClose, onSelectPlace }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const allPlaces = useMemo(() => flattenMockData(), []);
  const popular = useMemo(() => allPlaces.filter(p => (p.rating || 0) >= 4.6).slice(0, 4), [allPlaces]);

  const filtered = query.trim()
    ? allPlaces.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.loc.toLowerCase().includes(query.toLowerCase()) ||
          (p.category || "").toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col bg-background"
    >
      {/* Search Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3 shrink-0">
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 flex items-center bg-muted rounded-xl px-3 py-2.5 border border-border focus-within:border-primary transition">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            autoFocus
            placeholder="Search places, cities, activities..."
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

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {!query ? (
          <div className="pt-2">
            <p className="text-xs font-bold text-muted-foreground uppercase mb-3">Top Rated</p>
            <div className="space-y-2">
              {popular.map((place) => (
                <PlaceCard key={place.name} place={place} onSelect={onSelectPlace} />
              ))}
            </div>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Search className="w-8 h-8 text-muted-foreground/20 mb-2" />
              <p className="text-xs text-muted-foreground">Search for any destination in India</p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-sm text-muted-foreground">No places found for "{query}"</p>
            <p className="text-xs text-muted-foreground mt-1">Try "Delhi", "Kerala", or "Taj"</p>
          </div>
        ) : (
          <div className="space-y-2 pt-2">
            <p className="text-xs text-muted-foreground mb-2">{filtered.length} results found</p>
            {filtered.map((place) => (
              <PlaceCard key={place.name} place={place} onSelect={onSelectPlace} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PlaceCard({ place, onSelect }: { place: Place; onSelect: (p: Place) => void }) {
  return (
    <button
      onClick={() => onSelect(place)}
      className="w-full bg-card p-3 rounded-2xl flex items-center gap-3 hover:bg-primary/5 transition border border-border text-left active:scale-[0.98] ts-shadow-card"
    >
      <img src={place.img} alt={place.name} className="w-14 h-14 rounded-xl object-cover" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground truncate">{place.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
            <MapPin className="w-3 h-3" /> {place.loc}
          </span>
          {place.rating && (
            <span className="text-[10px] text-ts-saffron font-bold flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-ts-saffron" /> {place.rating}
            </span>
          )}
        </div>
        {place.duration && (
          <span className="text-[9px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
            <Clock className="w-2.5 h-2.5" /> {place.duration} • {place.price}
          </span>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </button>
  );
}
