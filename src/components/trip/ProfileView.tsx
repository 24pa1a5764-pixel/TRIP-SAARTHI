import { motion } from "framer-motion";
import { Eye, Trash2, LogOut, MapPin } from "lucide-react";
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
      <div className="ts-gradient-hero px-5 pt-8 pb-6">
        <div className="flex items-center gap-4">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl border-2 border-primary-foreground/20" />
          <div>
            <h2 className="text-lg font-display font-bold text-primary-foreground">{user.name}</h2>
            <p className="text-xs text-primary-foreground/60">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Saved Trips */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3">Saved Trips</h3>
        {savedTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MapPin className="w-10 h-10 text-muted-foreground/20 mb-3" />
            <p className="text-sm text-muted-foreground">No saved trips yet.</p>
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
                <p className="text-sm font-bold text-foreground mb-1">{trip.data.title}</p>
                <p className="text-[11px] text-muted-foreground mb-3">
                  {trip.date} • {trip.places.join(", ")}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewTrip(trip)}
                    className="flex-1 bg-primary/10 text-primary text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition active:scale-95"
                  >
                    <Eye className="w-3 h-3" /> View
                  </button>
                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="bg-destructive/10 text-destructive p-2 rounded-xl transition active:scale-95"
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
      <div className="p-5 pt-2">
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
