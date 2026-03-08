import { motion } from "framer-motion";
import { Eye, Trash2, LogOut, MapPin, Settings, ChevronRight, Compass, Star } from "lucide-react";
import type { UserData, SavedTrip } from "@/lib/tripData";

interface ProfileViewProps {
  user: UserData;
  savedTrips: SavedTrip[];
  onViewTrip: (trip: SavedTrip) => void;
  onDeleteTrip: (id: number) => void;
  onLogout: () => void;
}

export default function ProfileView({ user, savedTrips, onViewTrip, onDeleteTrip, onLogout }: ProfileViewProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Profile Header */}
      <div className="ts-gradient-hero px-5 pt-8 pb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_80%,white_0%,transparent_60%)]" />
        <div className="relative z-10 flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-2xl border-2 border-primary-foreground/20 shadow-lg"
          />
          <div className="flex-1">
            <h2 className="text-lg font-display font-bold text-primary-foreground">{user.name}</h2>
            <p className="text-xs text-primary-foreground/50">{user.email}</p>
          </div>
        </div>
        {/* Stats */}
        <div className="relative z-10 flex gap-3 mt-4">
          {[
            { label: "Trips", value: savedTrips.length },
            { label: "Places", value: savedTrips.reduce((a, t) => a + t.places.length, 0) },
            { label: "Cities", value: [...new Set(savedTrips.flatMap(t => t.places))].length },
          ].map(stat => (
            <div key={stat.label} className="flex-1 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-2.5 text-center border border-primary-foreground/10">
              <p className="text-lg font-display font-bold text-primary-foreground">{stat.value}</p>
              <p className="text-[9px] text-primary-foreground/50 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Trips */}
      <div className="flex-1 overflow-y-auto px-5 py-4 ts-scrollbar-hide">
        <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3">Saved Trips</h3>
        {savedTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center mb-3">
              <Compass className="w-8 h-8 text-muted-foreground/20" />
            </div>
            <p className="text-sm font-bold text-foreground mb-1">No saved trips yet</p>
            <p className="text-xs text-muted-foreground">Plan your first adventure to see it here!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedTrips.map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl p-4 ts-shadow-card border border-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{trip.data.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      📅 {trip.date} • {trip.places.length} places
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {trip.places.slice(0, 3).map(p => (
                    <span key={p} className="text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-md">
                      {p}
                    </span>
                  ))}
                  {trip.places.length > 3 && (
                    <span className="text-[9px] bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-md">
                      +{trip.places.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewTrip(trip)}
                    className="flex-1 bg-primary/10 text-primary text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Plan
                  </button>
                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="bg-destructive/10 text-destructive p-2.5 rounded-xl transition active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="p-5 pt-2 shrink-0">
        <button
          onClick={onLogout}
          className="w-full bg-destructive/10 text-destructive font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition active:scale-95"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}
