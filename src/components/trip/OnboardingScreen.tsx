import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, User, Phone, Home, Loader2 } from "lucide-react";

interface OnboardingScreenProps {
  initialName?: string;
  onComplete: (data: { full_name: string; phone: string; address: string; city: string; latitude?: number; longitude?: number }) => void;
}

export default function OnboardingScreen({ initialName, onComplete }: OnboardingScreenProps) {
  const [name, setName] = useState(initialName || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [gettingLocation, setGettingLocation] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const getGPSLocation = () => {
    if (!navigator.geolocation) return alert("GPS not supported");
    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setAddress(`GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        setGettingLocation(false);
      },
      () => {
        alert("Could not get location. Please enter address manually.");
        setGettingLocation(false);
      },
      { timeout: 10000 }
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) return alert("Please enter your name");
    onComplete({
      full_name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      latitude: coords?.lat,
      longitude: coords?.lng,
    });
  };

  return (
    <div className="fixed inset-0 ts-gradient-hero flex flex-col">
      <div className="flex-1 flex flex-col px-6 pt-12 pb-6">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-2xl font-display font-bold text-primary-foreground mb-1">Complete Your Profile</h1>
          <p className="text-sm text-primary-foreground/50 mb-8">Help us personalize your travel experience</p>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs font-bold text-primary-foreground/70 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Full Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground placeholder:text-primary-foreground/30 px-4 py-3 rounded-xl border border-primary-foreground/20 text-sm focus:outline-none focus:border-primary-foreground/40"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-bold text-primary-foreground/70 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Phone Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              type="tel"
              className="w-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground placeholder:text-primary-foreground/30 px-4 py-3 rounded-xl border border-primary-foreground/20 text-sm focus:outline-none focus:border-primary-foreground/40"
            />
          </div>

          {/* City */}
          <div>
            <label className="text-xs font-bold text-primary-foreground/70 mb-1.5 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5" /> City
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Mumbai, Delhi, Bangalore"
              className="w-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground placeholder:text-primary-foreground/30 px-4 py-3 rounded-xl border border-primary-foreground/20 text-sm focus:outline-none focus:border-primary-foreground/40"
            />
          </div>

          {/* Address / GPS */}
          <div>
            <label className="text-xs font-bold text-primary-foreground/70 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Address
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your address or use GPS below"
              className="w-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground placeholder:text-primary-foreground/30 px-4 py-3 rounded-xl border border-primary-foreground/20 text-sm focus:outline-none focus:border-primary-foreground/40"
            />
            <button
              onClick={getGPSLocation}
              disabled={gettingLocation}
              className="mt-2 flex items-center gap-2 text-xs font-bold text-primary-foreground/70 bg-primary-foreground/10 px-4 py-2.5 rounded-xl border border-primary-foreground/20 transition active:scale-95 disabled:opacity-50"
            >
              {gettingLocation ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Navigation className="w-3.5 h-3.5" />}
              {gettingLocation ? "Getting location..." : "📍 Use GPS Location"}
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="px-6 pb-12">
        <button
          onClick={handleSubmit}
          className="w-full bg-card text-card-foreground font-bold py-4 rounded-2xl text-[15px] ts-shadow-elevated transition active:scale-95"
        >
          Start Exploring 🚀
        </button>
      </motion.div>
    </div>
  );
}
