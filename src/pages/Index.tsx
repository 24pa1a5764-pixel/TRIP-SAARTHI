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
import {
  fetchWithRetry,
  type Place,
  type TripSettings,
  type ItineraryData,
  type SavedTrip,
  type ChatMessage,
  type UserData,
} from "@/lib/tripData";

const apiKey = "";

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
  const [itineraryResult, setItineraryResult] = useState<ItineraryData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAppState("auth"), 2000);
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

  const generateAIItinerary = async (vibe = "Standard") => {
    if (cart.length === 0) return alert("Please add places to your trip chart first!");
    setIsGenerating(true);
    setItineraryResult(null);
    setSubView("itinerary_loading");

    const prompt = `You are TripSaarthi. Create a daily itinerary for ${cart.map((c) => c.name).join(", ")}. Trip Type: ${tripSettings.type}. Budget: ${tripSettings.budget}. Vibe: ${vibe}. Return exactly matching the JSON schema provided.`;
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: "Act as a local guide. Provide exact JSON." }] },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            greeting: { type: "STRING" },
            itinerary: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: { time: { type: "STRING" }, plan: { type: "STRING" }, cost: { type: "STRING" }, tip: { type: "STRING" } },
              },
            },
            foods: { type: "ARRAY", items: { type: "STRING" } },
          },
          required: ["title", "greeting", "itinerary", "foods"],
        },
      },
    };

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const result = await fetchWithRetry(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const textResponse = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (textResponse) {
        setItineraryResult(JSON.parse(textResponse));
        setSubView("itinerary_result");
      } else throw new Error("Empty response");
    } catch {
      alert("Failed to generate itinerary. Please try again.");
      setSubView("cart");
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePackingList = async () => {
    if (cart.length === 0) return;
    setIsGenerating(true);
    setSubView("itinerary_loading");

    const prompt = `Provide a smart packing list for a ${tripSettings.type} trip to ${cart.map((c) => c.name).join(", ")} in India. Provide exact JSON.`;
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: { title: { type: "STRING" }, items: { type: "ARRAY", items: { type: "STRING" } } },
          required: ["title", "items"],
        },
      },
    };

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const result = await fetchWithRetry(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const textResponse = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (textResponse) {
        setItineraryResult({ isPacking: true, ...JSON.parse(textResponse) } as ItineraryData);
        setSubView("itinerary_result");
      }
    } catch {
      alert("Failed to generate packing list.");
      setSubView("cart");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveTrip = () => {
    if (!itineraryResult || itineraryResult.isPacking) return;
    const newTrip: SavedTrip = { id: Date.now(), date: new Date().toLocaleDateString(), places: cart.map((c) => c.name), data: itineraryResult };
    const updated = [newTrip, ...savedTrips];
    setSavedTrips(updated);
    localStorage.setItem("tripsaarthi_trips", JSON.stringify(updated));
    alert("Trip Saved to Profile!");
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
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="w-full max-w-md h-full bg-background flex flex-col relative overflow-hidden shadow-2xl">
        <div className="flex-1 overflow-hidden relative">
          {/* Map Background */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4zIi8+PC9zdmc+')] bg-repeat" />
          </div>

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
                  <RecommendationsView category={currentCategory} cart={cart} toggleCart={toggleCartItem} onBack={() => setSubView("explore")} onViewCart={() => setSubView("cart")} />
                )}
                {subView === "cart" && (
                  <CartView cart={cart} toggleCart={toggleCartItem} onBack={() => setSubView("home")} onGenerateItinerary={() => generateAIItinerary()} onGeneratePacking={generatePackingList} />
                )}
                {subView === "itinerary_loading" && <LoadingOverlay text="Building your perfect trip..." />}
                {subView === "itinerary_result" && (
                  <ItineraryResult data={itineraryResult} onClose={() => setSubView("cart")} onSave={saveTrip} onRegenerate={generateAIItinerary} />
                )}
              </>
            )}

            {activeTab === "chat" && <ChatView messages={chatMessages} setMessages={setChatMessages} />}

            {activeTab === "profile" && user && (
              <ProfileView
                user={user}
                savedTrips={savedTrips}
                onViewTrip={(trip) => { setItineraryResult(trip.data); setActiveTab("home"); setSubView("itinerary_result"); }}
                onDeleteTrip={deleteSavedTrip}
                onLogout={() => setAppState("auth")}
              />
            )}
          </div>
        </div>

        <AnimatePresence>
          {safetyModalOpen && <SafetyModal onClose={() => setSafetyModalOpen(false)} />}
        </AnimatePresence>

        <BottomNav active={activeTab} setActive={(tab) => { setActiveTab(tab); setSubView("home"); }} />
      </div>
    </div>
  );
}
