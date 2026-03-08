import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/trip/SplashScreen";
import AuthScreen from "@/components/trip/AuthScreen";
import BottomNav from "@/components/trip/BottomNav";
import HomeOverlay from "@/components/trip/HomeOverlay";
import GlobalSearch from "@/components/trip/GlobalSearch";
import PlannerView from "@/components/trip/PlannerView";
import ExploreHub from "@/components/trip/ExploreHub";
import RecommendationsView from "@/components/trip/RecommendationsView";
import CartView from "@/components/trip/CartView";
import LoadingOverlay from "@/components/trip/LoadingOverlay";
import ItineraryResult from "@/components/trip/ItineraryResult";
import ChatView from "@/components/trip/ChatView";
import ProfileView from "@/components/trip/ProfileView";
import SafetyModal from "@/components/trip/SafetyModal";
import DiscoverView from "@/components/trip/DiscoverView";
import CrowdDensityView from "@/components/trip/CrowdDensityView";
import HiddenGemsView from "@/components/trip/HiddenGemsView";
import CulturalEtiquetteView from "@/components/trip/CulturalEtiquetteView";
import MoodRecommendations from "@/components/trip/MoodRecommendations";
import EmergencyButton from "@/components/trip/EmergencyButton";
import ARHistoryView from "@/components/trip/ARHistoryView";
import BudgetOptimizerView from "@/components/trip/BudgetOptimizerView";
import CarbonFootprintView from "@/components/trip/CarbonFootprintView";
import StoryGeneratorView from "@/components/trip/StoryGeneratorView";
import CommunityChat from "@/components/trip/CommunityChat";
import SafetyRouteView from "@/components/trip/SafetyRouteView";
import {
  generateMockItinerary,
  generateMockPackingList,
  type Place,
  type TripSettings,
  type ItineraryData,
  type SavedTrip,
  type ChatMessage,
  type UserData,
} from "@/lib/tripData";

export default function Index() {
  const [appState, setAppState] = useState<"splash" | "auth" | "main">("splash");
  const [activeTab, setActiveTab] = useState("home");
  const [subView, setSubView] = useState("home");

  const [user, setUser] = useState<UserData | null>(null);
  const [tripSettings, setTripSettings] = useState<TripSettings>({ start: "", end: "", type: "Solo", budget: "Standard" });
  const [cart, setCart] = useState<Place[]>([]);
  const [currentCategory, setCurrentCategory] = useState("heritage");
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [itineraryResult, setItineraryResult] = useState<ItineraryData | null>(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedTrip, setSelectedTrip] = useState<SavedTrip | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAppState("auth"), 2500);
    const loaded = JSON.parse(localStorage.getItem("tripsaarthi_trips") || "[]");
    setSavedTrips(loaded);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (type: string) => {
    if (type === "Google") {
      setUser({ name: "Aditya Sharma", email: "aditya.sharma@gmail.com", avatar: "https://ui-avatars.com/api/?name=Aditya+Sharma&background=2563eb&color=fff" });
    } else {
      setUser({ name: "Guest Explorer", email: "guest@tripsaarthi.com", avatar: "https://ui-avatars.com/api/?name=Guest+User&background=2563eb&color=fff" });
    }
    setAppState("main");
  };

  const toggleCartItem = (item: Place) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.name === item.name);
      if (exists) return prev.filter((c) => c.name !== item.name);
      return [...prev, item];
    });
  };

  const generateItinerary = async (vibe = "Standard") => {
    if (cart.length === 0) return alert("Please add places to your trip chart first!");
    setItineraryResult(null);
    setSubView("itinerary_loading");
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
    const result = generateMockItinerary(cart, tripSettings.type, tripSettings.budget, vibe);
    setItineraryResult(result);
    setSubView("itinerary_result");
  };

  const generatePacking = async () => {
    if (cart.length === 0) return;
    setSubView("itinerary_loading");
    await new Promise((r) => setTimeout(r, 1200));
    const result = generateMockPackingList(cart, tripSettings.type);
    setItineraryResult(result);
    setSubView("itinerary_result");
  };

  const saveTrip = () => {
    if (!itineraryResult || itineraryResult.isPacking) return;
    const newTrip: SavedTrip = { id: Date.now(), date: new Date().toLocaleDateString(), places: cart.map((c) => c.name), data: itineraryResult };
    const updated = [newTrip, ...savedTrips];
    setSavedTrips(updated);
    localStorage.setItem("tripsaarthi_trips", JSON.stringify(updated));
    alert("Trip Saved to Profile! 🎉");
    setSubView("home");
    setCart([]);
  };

  const deleteSavedTrip = (id: number) => {
    const updated = savedTrips.filter((t) => t.id !== id);
    setSavedTrips(updated);
    localStorage.setItem("tripsaarthi_trips", JSON.stringify(updated));
  };

  if (appState === "splash") return <SplashScreen />;
  if (appState === "auth") return <AuthScreen onLogin={handleLogin} />;

  return (
    <div className="fixed inset-0 bg-foreground/5 flex items-center justify-center">
      <div className="w-full max-w-md h-full bg-background flex flex-col relative overflow-hidden shadow-2xl">
        <div className="flex-1 overflow-hidden relative">
          <div className="relative z-10 h-full">
            {activeTab === "home" && (
              <>
                {subView === "home" && user && (
                  <HomeOverlay
                    user={user}
                    cartCount={cart.length}
                    onSearch={() => setSubView("search")}
                    onStartJourney={() => setSubView("planner")}
                    onCategoryClick={(cat) => { setCurrentCategory(cat); setSubView("recommendations"); }}
                    onSafetyClick={() => setSafetyModalOpen(true)}
                    onCartClick={() => setSubView("cart")}
                    onMoodClick={() => setSubView("mood")}
                    onHiddenGemsClick={() => setSubView("hidden_gems")}
                    onCommunityClick={() => { setActiveTab("community"); }}
                    onEmergencyClick={() => setEmergencyOpen(true)}
                    onBudgetClick={() => setSubView("budget")}
                    onCarbonClick={() => setSubView("carbon")}
                  />
                )}
                {subView === "search" && (
                  <GlobalSearch onClose={() => setSubView("home")} onSelectPlace={(item) => { toggleCartItem(item); setSubView("cart"); }} />
                )}
                {subView === "planner" && (
                  <PlannerView settings={tripSettings} setSettings={setTripSettings} onBack={() => setSubView("home")} onNext={() => setSubView("explore")} />
                )}
                {subView === "explore" && (
                  <ExploreHub onBack={() => setSubView("planner")} onSelectCategory={(cat) => { setCurrentCategory(cat); setSubView("recommendations"); }} />
                )}
                {subView === "recommendations" && (
                  <RecommendationsView
                    category={currentCategory}
                    cart={cart}
                    toggleCart={toggleCartItem}
                    onBack={() => setSubView("explore")}
                    onViewCart={() => setSubView("cart")}
                    onCrowdDensity={(name) => { setSelectedPlace(name); setSubView("crowd_density"); }}
                    onEtiquette={(name) => { setSelectedPlace(name); setSubView("etiquette"); }}
                    onARHistory={(name) => { setSelectedPlace(name); setSubView("ar_history"); }}
                  />
                )}
                {subView === "cart" && (
                  <CartView
                    cart={cart}
                    toggleCart={toggleCartItem}
                    onBack={() => setSubView("home")}
                    onGenerateItinerary={() => generateItinerary()}
                    onGeneratePacking={generatePacking}
                    onBudgetOptimizer={() => setSubView("budget")}
                    onCarbonFootprint={() => setSubView("carbon")}
                  />
                )}
                {subView === "itinerary_loading" && <LoadingOverlay text="Building your perfect trip..." />}
                {subView === "itinerary_result" && (
                  <ItineraryResult data={itineraryResult} onClose={() => setSubView("cart")} onSave={saveTrip} onRegenerate={generateItinerary} />
                )}
                {subView === "mood" && (
                  <MoodRecommendations
                    onBack={() => setSubView("home")}
                    onSelectMood={(cats) => { setCurrentCategory(cats[0]); setSubView("recommendations"); }}
                  />
                )}
                {subView === "hidden_gems" && (
                  <HiddenGemsView onBack={() => setSubView("home")} onAddToCart={toggleCartItem} cart={cart} />
                )}
                {subView === "crowd_density" && (
                  <CrowdDensityView placeName={selectedPlace} onBack={() => setSubView("recommendations")} />
                )}
                {subView === "etiquette" && (
                  <CulturalEtiquetteView placeName={selectedPlace} onBack={() => setSubView("recommendations")} />
                )}
                {subView === "ar_history" && (
                  <ARHistoryView placeName={selectedPlace} onBack={() => setSubView("recommendations")} />
                )}
                {subView === "budget" && (
                  <BudgetOptimizerView budget={tripSettings.budget} onBack={() => setSubView("cart")} />
                )}
                {subView === "carbon" && (
                  <CarbonFootprintView cart={cart} onBack={() => setSubView("cart")} />
                )}
                {subView === "safety_route" && (
                  <SafetyRouteView city="Delhi" onBack={() => setSubView("home")} />
                )}
                {subView === "story" && selectedTrip && (
                  <StoryGeneratorView trip={selectedTrip} onBack={() => { setSubView("home"); setActiveTab("profile"); }} />
                )}
              </>
            )}

            {activeTab === "discover" && (
              <DiscoverView
                onSelectCategory={(cat) => { setCurrentCategory(cat); setActiveTab("home"); setSubView("recommendations"); }}
                onAddToCart={toggleCartItem}
                cart={cart}
              />
            )}

            {activeTab === "community" && (
              <CommunityChat onBack={() => { setActiveTab("home"); setSubView("home"); }} />
            )}

            {activeTab === "chat" && <ChatView messages={chatMessages} setMessages={setChatMessages} />}

            {activeTab === "profile" && user && (
              <ProfileView
                user={user}
                savedTrips={savedTrips}
                onViewTrip={(trip) => { setItineraryResult(trip.data); setActiveTab("home"); setSubView("itinerary_result"); }}
                onDeleteTrip={deleteSavedTrip}
                onLogout={() => setAppState("auth")}
                onGenerateStory={(trip) => { setSelectedTrip(trip); setActiveTab("home"); setSubView("story"); }}
              />
            )}
          </div>
        </div>

        <AnimatePresence>
          {safetyModalOpen && <SafetyModal onClose={() => setSafetyModalOpen(false)} />}
        </AnimatePresence>

        <EmergencyButton isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />

        <BottomNav active={activeTab} setActive={(tab) => { setActiveTab(tab); if (tab === "home") setSubView("home"); }} cartCount={cart.length} />
      </div>
    </div>
  );
}
