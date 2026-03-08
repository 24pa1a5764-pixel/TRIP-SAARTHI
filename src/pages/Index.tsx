import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import SplashScreen from "@/components/trip/SplashScreen";
import AuthScreen from "@/components/trip/AuthScreen";
import OnboardingScreen from "@/components/trip/OnboardingScreen";
import BottomNav from "@/components/trip/BottomNav";
import DesktopSidebar from "@/components/trip/DesktopSidebar";
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
import FoodFinderView from "@/components/trip/FoodFinderView";
import WeatherAlertsView from "@/components/trip/WeatherAlertsView";
import TravelBadgesView from "@/components/trip/TravelBadgesView";
import TransportFinderView from "@/components/trip/TransportFinderView";
import FestivalEventsView from "@/components/trip/FestivalEventsView";
import LanguageAssistantView from "@/components/trip/LanguageAssistantView";
import PhotoSpotFinderView from "@/components/trip/PhotoSpotFinderView";
import SettingsView from "@/components/trip/SettingsView";
import SwipeableTabs from "@/components/trip/SwipeableTabs";
import ScamAlertView from "@/components/trip/ScamAlertView";
import TimeOptimizerView from "@/components/trip/TimeOptimizerView";
import SoloSafetyView from "@/components/trip/SoloSafetyView";
import PersonalityAnalyzerView from "@/components/trip/PersonalityAnalyzerView";
import SkillExperienceView from "@/components/trip/SkillExperienceView";
import AirQualityView from "@/components/trip/AirQualityView";
import LostItemFinderView from "@/components/trip/LostItemFinderView";
import RestStopFinderView from "@/components/trip/RestStopFinderView";
import TravelRiskView from "@/components/trip/TravelRiskView";
import DigitalPassportView from "@/components/trip/DigitalPassportView";
import SunriseSunsetView from "@/components/trip/SunriseSunsetView";
import TravelChallengeView from "@/components/trip/TravelChallengeView";
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
  const { user, profile, loading, needsOnboarding, signOut, updateProfile } = useAuth();

  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [subView, setSubView] = useState("home");

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
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Load saved trips from DB
  const loadTrips = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("saved_trips")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (data) {
      setSavedTrips(
        data.map((t) => ({
          id: parseInt(t.id.replace(/-/g, "").slice(0, 8), 16), // numeric id for compat
          date: new Date(t.created_at).toLocaleDateString(),
          places: t.places,
          data: t.trip_data as unknown as ItineraryData,
          dbId: t.id,
        }))
      );
    }
  }, [user]);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  const userData: UserData | null = user
    ? {
        name: profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "Traveler",
        email: user.email || "",
        avatar: profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || "User")}&background=2563eb&color=fff`,
      }
    : null;

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

  const saveTrip = async () => {
    if (!itineraryResult || itineraryResult.isPacking || !user) return;
    
    const { error } = await supabase.from("saved_trips").insert([{
      user_id: user.id,
      title: itineraryResult.title,
      places: cart.map((c) => c.name),
      trip_data: JSON.parse(JSON.stringify(itineraryResult)),
    }]);

    if (error) {
      alert("Failed to save trip: " + error.message);
      return;
    }
    
    alert("Trip Saved! 🎉");
    await loadTrips();
    setSubView("home");
    setCart([]);
  };

  const deleteSavedTrip = async (id: number) => {
    const trip = savedTrips.find((t) => t.id === id);
    if (!trip) return;
    const dbId = (trip as any).dbId;
    if (dbId) {
      await supabase.from("saved_trips").delete().eq("id", dbId);
    }
    await loadTrips();
  };

  const handleOnboarding = async (data: { full_name: string; phone: string; address: string; city: string; latitude?: number; longitude?: number }) => {
    await updateProfile(data);
  };

  if (showSplash) return <SplashScreen />;
  if (loading) return <SplashScreen />;
  if (!user) return <AuthScreen />;
  if (needsOnboarding) {
    return (
      <OnboardingScreen
        initialName={profile?.full_name || user.user_metadata?.full_name || ""}
        onComplete={handleOnboarding}
      />
    );
  }

  const handleSidebarFeature = (feature: string) => {
    setActiveTab("home");
    setSubView(feature);
  };

  const handleSidebarTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") setSubView("home");
  };

  return (
    <div className="fixed inset-0 bg-background flex">
      {/* Desktop Sidebar */}
      <DesktopSidebar
        activeTab={activeTab}
        setActiveTab={handleSidebarTab}
        onFeatureClick={handleSidebarFeature}
        onSafetyClick={() => setSafetyModalOpen(true)}
        onEmergencyClick={() => setEmergencyOpen(true)}
        cartCount={cart.length}
      />

      <div className="flex-1 h-full bg-background flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-hidden relative">
          <SwipeableTabs
            tabIds={["home", "discover", "community", "chat", "profile"]}
            activeTab={activeTab}
            onTabChange={(tab) => { setActiveTab(tab); if (tab === "home") setSubView("home"); }}
            enabled={subView === "home" || activeTab !== "home"}
          >
          <div className="relative z-10 h-full">
            {activeTab === "home" && (
              <>
                {subView === "home" && userData && (
                  <HomeOverlay
                    user={userData}
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
                    onFoodFinderClick={() => setSubView("food_finder")}
                    onWeatherClick={() => setSubView("weather")}
                    onBadgesClick={() => setSubView("badges")}
                    onTransportClick={() => setSubView("transport")}
                    onFestivalsClick={() => setSubView("festivals")}
                    onLanguageClick={() => setSubView("language")}
                    onPhotoSpotsClick={() => setSubView("photo_spots")}
                    onScamAlertClick={() => setSubView("scam_alert")}
                    onTimeOptimizerClick={() => setSubView("time_optimizer")}
                    onSoloSafetyClick={() => setSubView("solo_safety")}
                    onPersonalityClick={() => setSubView("personality")}
                    onSkillExperienceClick={() => setSubView("skill_experience")}
                    onAirQualityClick={() => setSubView("air_quality")}
                    onLostItemClick={() => setSubView("lost_item")}
                    onRestStopClick={() => setSubView("rest_stop")}
                    onTravelRiskClick={() => setSubView("travel_risk")}
                    onDigitalPassportClick={() => setSubView("digital_passport")}
                    onSunriseSunsetClick={() => setSubView("sunrise_sunset")}
                    onTravelChallengeClick={() => setSubView("travel_challenge")}
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
                {subView === "food_finder" && (
                  <FoodFinderView onBack={() => setSubView("home")} />
                )}
                {subView === "weather" && (
                  <WeatherAlertsView onBack={() => setSubView("home")} />
                )}
                {subView === "badges" && (
                  <TravelBadgesView onBack={() => setSubView("home")} savedTripsCount={savedTrips.length} visitedCategories={cart.map(c => c.category || "")} />
                )}
                {subView === "transport" && (
                  <TransportFinderView city={profile?.city || "Delhi"} onBack={() => setSubView("home")} />
                )}
                {subView === "festivals" && (
                  <FestivalEventsView onBack={() => setSubView("home")} />
                )}
                {subView === "language" && (
                  <LanguageAssistantView onBack={() => setSubView("home")} />
                )}
                {subView === "photo_spots" && (
                  <PhotoSpotFinderView onBack={() => setSubView("home")} />
                )}
                {subView === "settings" && (
                  <SettingsView onBack={() => setSubView("home")} />
                )}
                {subView === "scam_alert" && (
                  <ScamAlertView onBack={() => setSubView("home")} />
                )}
                {subView === "time_optimizer" && (
                  <TimeOptimizerView onBack={() => setSubView("home")} />
                )}
                {subView === "solo_safety" && (
                  <SoloSafetyView onBack={() => setSubView("home")} />
                )}
                {subView === "personality" && (
                  <PersonalityAnalyzerView onBack={() => setSubView("home")} />
                )}
                {subView === "skill_experience" && (
                  <SkillExperienceView onBack={() => setSubView("home")} />
                )}
                {subView === "air_quality" && (
                  <AirQualityView onBack={() => setSubView("home")} />
                )}
                {subView === "lost_item" && (
                  <LostItemFinderView onBack={() => setSubView("home")} />
                )}
                {subView === "rest_stop" && (
                  <RestStopFinderView onBack={() => setSubView("home")} />
                )}
                {subView === "travel_risk" && (
                  <TravelRiskView onBack={() => setSubView("home")} />
                )}
                {subView === "digital_passport" && (
                  <DigitalPassportView onBack={() => setSubView("home")} savedTripsCount={savedTrips.length} />
                )}
                {subView === "sunrise_sunset" && (
                  <SunriseSunsetView onBack={() => setSubView("home")} />
                )}
                {subView === "travel_challenge" && (
                  <TravelChallengeView onBack={() => setSubView("home")} />
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

            {activeTab === "profile" && userData && (
              <ProfileView
                user={userData}
                savedTrips={savedTrips}
                onViewTrip={(trip) => { setItineraryResult(trip.data); setActiveTab("home"); setSubView("itinerary_result"); }}
                onDeleteTrip={deleteSavedTrip}
                onLogout={signOut}
                onGenerateStory={(trip) => { setSelectedTrip(trip); setActiveTab("home"); setSubView("story"); }}
                onSettings={() => { setActiveTab("home"); setSubView("settings"); }}
              />
            )}
          </div>
          </SwipeableTabs>
        </div>

        <AnimatePresence>
          {safetyModalOpen && <SafetyModal onClose={() => setSafetyModalOpen(false)} />}
        </AnimatePresence>

        <EmergencyButton isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />

        {/* Bottom nav - mobile only */}
        <div className="md:hidden">
          <BottomNav active={activeTab} setActive={(tab) => { setActiveTab(tab); if (tab === "home") setSubView("home"); }} cartCount={cart.length} />
        </div>
      </div>
    </div>
  );
}
