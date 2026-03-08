import type { Place } from "./tripData";

// ═══════════════════════════════════════
// 1. Crowd Density Predictor
// ═══════════════════════════════════════
export interface CrowdData {
  hour: string;
  density: number; // 0-100
  label: string;
}

export const getCrowdData = (placeName: string): CrowdData[] => {
  const patterns: Record<string, number[]> = {
    "Taj Mahal": [15, 20, 45, 70, 90, 95, 85, 75, 60, 50, 35, 20],
    "Golden Temple": [30, 25, 40, 55, 70, 80, 85, 75, 90, 95, 60, 35],
    default: [10, 15, 30, 50, 65, 75, 80, 70, 60, 45, 30, 15],
  };
  const hours = ["6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
  const densities = patterns[placeName] || patterns.default;
  return hours.map((hour, i) => ({
    hour,
    density: densities[i],
    label: densities[i] < 30 ? "Low" : densities[i] < 60 ? "Moderate" : densities[i] < 80 ? "High" : "Very High",
  }));
};

export const getBestVisitTime = (placeName: string): string => {
  const data = getCrowdData(placeName);
  const best = data.reduce((a, b) => (a.density < b.density ? a : b));
  return `${best.hour} (${best.label} crowd)`;
};

// ═══════════════════════════════════════
// 2. Hidden Gems
// ═══════════════════════════════════════
export interface HiddenGem {
  name: string;
  loc: string;
  img: string;
  lat: number;
  lng: number;
  type: string;
  secret: string;
  rating: number;
}

export const HIDDEN_GEMS: HiddenGem[] = [
  { name: "Spiti Valley", loc: "Himachal Pradesh", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80", lat: 32.246, lng: 78.035, type: "Hidden Valley", secret: "One of the least visited valleys with ancient monasteries", rating: 4.9 },
  { name: "Mawlynnong", loc: "Meghalaya", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", lat: 25.202, lng: 91.921, type: "Cleanest Village", secret: "Asia's cleanest village with living root bridges", rating: 4.8 },
  { name: "Chopta", loc: "Uttarakhand", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80", lat: 30.373, lng: 79.219, type: "Mini Switzerland", secret: "Stunning meadows with panoramic Himalayan views", rating: 4.7 },
  { name: "Gokarna", loc: "Karnataka", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80", lat: 14.551, lng: 74.316, type: "Secret Beach", secret: "Pristine beaches without Goa's crowds", rating: 4.6 },
  { name: "Ziro Valley", loc: "Arunachal Pradesh", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80", lat: 27.566, lng: 93.816, type: "Tribal Culture", secret: "UNESCO tentative list site with Apatani tribal culture", rating: 4.8 },
  { name: "Chettinad", loc: "Tamil Nadu", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80", lat: 10.155, lng: 78.814, type: "Food Paradise", secret: "Hidden mansion town with India's spiciest cuisine", rating: 4.5 },
  { name: "Majuli Island", loc: "Assam", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80", lat: 26.950, lng: 94.167, type: "River Island", secret: "World's largest river island, slowly disappearing", rating: 4.7 },
  { name: "Gandikota", loc: "Andhra Pradesh", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80", lat: 15.570, lng: 78.284, type: "Grand Canyon", secret: "India's Grand Canyon - almost nobody knows about it", rating: 4.6 },
];

// ═══════════════════════════════════════
// 3. Cultural Etiquette
// ═══════════════════════════════════════
export interface EtiquetteRule {
  do: string;
  dont: string;
  icon: string;
}

export const getCulturalEtiquette = (placeName: string): { place: string; rules: EtiquetteRule[] } => {
  const etiquette: Record<string, EtiquetteRule[]> = {
    "Taj Mahal": [
      { do: "Remove shoes at the main mausoleum", dont: "Don't bring tripods or drones", icon: "👟" },
      { do: "Dress modestly, cover shoulders", dont: "Don't touch the marble inlays", icon: "👗" },
      { do: "Visit at sunrise for best photos", dont: "Don't eat food inside the complex", icon: "📸" },
    ],
    "Golden Temple": [
      { do: "Cover your head before entering", dont: "Don't wear shoes inside", icon: "🧢" },
      { do: "Accept langar (free meal) graciously", dont: "Don't smoke or drink alcohol nearby", icon: "🍽️" },
      { do: "Walk clockwise around the temple", dont: "Don't point feet toward the holy book", icon: "🙏" },
    ],
    "Varanasi Ghats": [
      { do: "Ask permission before photographing rituals", dont: "Don't interrupt cremation ceremonies", icon: "📷" },
      { do: "Dress conservatively", dont: "Don't swim in the Ganga without local guidance", icon: "👗" },
      { do: "Attend the evening Ganga Aarti", dont: "Don't bargain aggressively with boat rowers", icon: "🪔" },
    ],
    default: [
      { do: "Greet with 'Namaste' and folded hands", dont: "Don't touch someone's head", icon: "🙏" },
      { do: "Remove shoes before entering homes/temples", dont: "Don't use left hand for eating or giving", icon: "👟" },
      { do: "Ask permission before photographing locals", dont: "Don't display public affection", icon: "📷" },
      { do: "Dress modestly at religious sites", dont: "Don't point feet at people or deities", icon: "👗" },
    ],
  };
  return { place: placeName, rules: etiquette[placeName] || etiquette.default };
};

// ═══════════════════════════════════════
// 4. Queue Predictor
// ═══════════════════════════════════════
export interface QueuePrediction {
  currentWait: string;
  bestTime: string;
  tip: string;
  level: "short" | "medium" | "long";
}

export const getQueuePrediction = (placeName: string): QueuePrediction => {
  const predictions: Record<string, QueuePrediction> = {
    "Taj Mahal": { currentWait: "45-60 min", bestTime: "6:00 AM (opens)", tip: "Book online to skip ticket queue", level: "long" },
    "Tirupati Temple": { currentWait: "3-5 hours", bestTime: "Special ₹300 darshan saves 2hrs", tip: "Arrive before 4 AM for shortest wait", level: "long" },
    "Mysore Palace": { currentWait: "15-20 min", bestTime: "10 AM weekdays", tip: "Visit on Sunday evenings for illumination", level: "short" },
    "Golden Temple": { currentWait: "30-45 min", bestTime: "Early morning 4-5 AM", tip: "Avoid weekends and full moon days", level: "medium" },
    default: { currentWait: "10-20 min", bestTime: "Early morning or late afternoon", tip: "Weekdays have shorter queues", level: "short" },
  };
  return predictions[placeName] || predictions.default;
};

// ═══════════════════════════════════════
// 5. Community Chat Messages
// ═══════════════════════════════════════
export interface CommunityMessage {
  id: number;
  user: string;
  avatar: string;
  city: string;
  text: string;
  time: string;
  likes: number;
}

export const COMMUNITY_MESSAGES: CommunityMessage[] = [
  { id: 1, user: "Priya M.", avatar: "https://ui-avatars.com/api/?name=Priya+M&background=e11d48&color=fff", city: "Jaipur", text: "Best lassi is at Lassiwala near MI Road, not the fancy cafes! 🥛", time: "2 min ago", likes: 24 },
  { id: 2, user: "Rahul K.", avatar: "https://ui-avatars.com/api/?name=Rahul+K&background=2563eb&color=fff", city: "Goa", text: "Palolem beach is much quieter than Baga. Perfect for couples! 🏖️", time: "5 min ago", likes: 18 },
  { id: 3, user: "Sneha R.", avatar: "https://ui-avatars.com/api/?name=Sneha+R&background=059669&color=fff", city: "Delhi", text: "The metro is the best way to reach Chandni Chowk. Don't take autos! 🚇", time: "12 min ago", likes: 31 },
  { id: 4, user: "Arjun P.", avatar: "https://ui-avatars.com/api/?name=Arjun+P&background=7c3aed&color=fff", city: "Kerala", text: "Book houseboats directly at Alleppey jetty — half the online price! 🛶", time: "18 min ago", likes: 42 },
  { id: 5, user: "Meera S.", avatar: "https://ui-avatars.com/api/?name=Meera+S&background=ea580c&color=fff", city: "Varanasi", text: "Evening Ganga Aarti is magical! Reach by 5:30 PM for good seats 🪔", time: "25 min ago", likes: 56 },
  { id: 6, user: "Dev T.", avatar: "https://ui-avatars.com/api/?name=Dev+T&background=0891b2&color=fff", city: "Manali", text: "Solang Valley is overcrowded. Try Sethan village instead — hidden gem! 🏔️", time: "32 min ago", likes: 37 },
  { id: 7, user: "Ananya B.", avatar: "https://ui-avatars.com/api/?name=Ananya+B&background=be185d&color=fff", city: "Mumbai", text: "Is the Gateway of India area safe at night? Visiting solo next week 🤔", time: "45 min ago", likes: 12 },
  { id: 8, user: "Karthik N.", avatar: "https://ui-avatars.com/api/?name=Karthik+N&background=4f46e5&color=fff", city: "Bangalore", text: "VV Puram food street closes early! Go before 9 PM for best variety 🍛", time: "1 hr ago", likes: 28 },
];

// ═══════════════════════════════════════
// 6. Mood-Based Recommendations
// ═══════════════════════════════════════
export interface MoodOption {
  id: string;
  label: string;
  emoji: string;
  color: string;
  bg: string;
  description: string;
  categories: string[];
}

export const MOOD_OPTIONS: MoodOption[] = [
  { id: "relax", label: "Relax", emoji: "😌", color: "text-ts-green", bg: "bg-ts-green/10", description: "Peaceful & serene getaways", categories: ["nature", "spiritual"] },
  { id: "adventure", label: "Adventure", emoji: "⚡", color: "text-ts-sky", bg: "bg-ts-sky/10", description: "Thrill-seeking experiences", categories: ["adventure", "nature"] },
  { id: "romantic", label: "Romantic", emoji: "💕", color: "text-ts-rose", bg: "bg-ts-rose/10", description: "Perfect for couples", categories: ["nature", "heritage"] },
  { id: "spiritual", label: "Spiritual", emoji: "🕉️", color: "text-ts-saffron", bg: "bg-ts-saffron/10", description: "Soul-searching journeys", categories: ["spiritual", "heritage"] },
  { id: "party", label: "Party", emoji: "🎉", color: "text-ts-purple", bg: "bg-ts-purple/10", description: "Nightlife & fun vibes", categories: ["food", "shopping"] },
  { id: "foodie", label: "Foodie", emoji: "🍛", color: "text-ts-rose", bg: "bg-ts-rose/10", description: "Culinary exploration", categories: ["food", "shopping"] },
];

// ═══════════════════════════════════════
// 7. Safety Route Data
// ═══════════════════════════════════════
export interface SafetyRoute {
  area: string;
  safetyScore: number;
  lighting: "Good" | "Moderate" | "Poor";
  crowdLevel: string;
  policeNearby: boolean;
  tip: string;
}

export const getSafetyRoutes = (city: string): SafetyRoute[] => {
  const routes: Record<string, SafetyRoute[]> = {
    Delhi: [
      { area: "Connaught Place", safetyScore: 85, lighting: "Good", crowdLevel: "High", policeNearby: true, tip: "Well-lit and patrolled till midnight" },
      { area: "Hauz Khas Village", safetyScore: 80, lighting: "Good", crowdLevel: "Moderate", policeNearby: true, tip: "Popular with tourists, safe for evening walks" },
      { area: "Chandni Chowk", safetyScore: 65, lighting: "Moderate", crowdLevel: "Very High", policeNearby: true, tip: "Watch for pickpockets in crowded areas" },
      { area: "Paharganj", safetyScore: 50, lighting: "Poor", crowdLevel: "Moderate", policeNearby: false, tip: "Avoid after 10 PM, especially solo" },
    ],
    default: [
      { area: "Main Tourist Area", safetyScore: 80, lighting: "Good", crowdLevel: "High", policeNearby: true, tip: "Stick to main roads and tourist zones" },
      { area: "Local Market Area", safetyScore: 70, lighting: "Moderate", crowdLevel: "High", policeNearby: true, tip: "Safe during day, be cautious at night" },
      { area: "Outskirts", safetyScore: 55, lighting: "Poor", crowdLevel: "Low", policeNearby: false, tip: "Travel in groups after dark" },
    ],
  };
  return routes[city] || routes.default;
};

// ═══════════════════════════════════════
// 8. Budget Optimizer
// ═══════════════════════════════════════
export interface BudgetSuggestion {
  category: string;
  original: string;
  optimized: string;
  saving: string;
  tip: string;
  icon: string;
}

export const getBudgetOptimizations = (budget: string): BudgetSuggestion[] => {
  const suggestions: BudgetSuggestion[] = [
    { category: "Transport", original: "₹2000", optimized: "₹500", saving: "₹1500", tip: "Use metro/local trains instead of taxis", icon: "🚇" },
    { category: "Food", original: "₹1500", optimized: "₹400", saving: "₹1100", tip: "Eat at local dhabas instead of restaurants", icon: "🍛" },
    { category: "Stay", original: "₹3000", optimized: "₹800", saving: "₹2200", tip: "Try hostels or homestays on Airbnb", icon: "🏠" },
    { category: "Activities", original: "₹2000", optimized: "₹500", saving: "₹1500", tip: "Many temples & parks are free entry", icon: "🎫" },
    { category: "Shopping", original: "₹1000", optimized: "₹400", saving: "₹600", tip: "Bargain at local markets, avoid tourist shops", icon: "🛍️" },
  ];
  return budget === "Economy" ? suggestions : suggestions.map(s => ({ ...s, saving: `Up to ${s.saving}` }));
};

// ═══════════════════════════════════════
// 9. Carbon Footprint
// ═══════════════════════════════════════
export interface CarbonData {
  transport: string;
  co2: string;
  ecoAlternative: string;
  ecoSaving: string;
}

export const getCarbonFootprint = (places: Place[]): { total: string; data: CarbonData[]; tips: string[] } => {
  const data: CarbonData[] = [
    { transport: "Flight (if applicable)", co2: "150 kg", ecoAlternative: "Train", ecoSaving: "120 kg saved" },
    { transport: "Local Taxi/Auto", co2: "8 kg/day", ecoAlternative: "Metro/Bus", ecoSaving: "6 kg saved/day" },
    { transport: "Hotel AC", co2: "5 kg/day", ecoAlternative: "Fan rooms / eco-lodges", ecoSaving: "4 kg saved/day" },
  ];
  const tips = [
    "🚂 Take trains instead of flights for short distances",
    "🚲 Rent bicycles for city exploration",
    "🥤 Carry reusable bottle — avoid plastic",
    "🌿 Choose eco-certified hotels",
    "🛍️ Use cloth bags while shopping",
  ];
  return { total: `~${places.length * 45} kg CO₂`, data, tips };
};

// ═══════════════════════════════════════
// 10. AR History (Mock descriptions)
// ═══════════════════════════════════════
export interface ARHistory {
  era: string;
  year: string;
  description: string;
  funFact: string;
}

export const getARHistory = (placeName: string): ARHistory[] => {
  const history: Record<string, ARHistory[]> = {
    "Taj Mahal": [
      { era: "Construction", year: "1632-1653", description: "20,000 workers built it over 21 years as a tomb for Mumtaz Mahal", funFact: "The minarets are slightly tilted outward to protect the tomb if they fall" },
      { era: "Mughal Glory", year: "1653-1857", description: "Jewels adorned the tomb, gardens were lush with rare flowers", funFact: "Shah Jahan planned a black marble twin across the river" },
      { era: "British Era", year: "1857-1947", description: "British looted gems, gardens became English-style lawns", funFact: "Lord Curzon restored the Taj after years of neglect" },
    ],
    "Hawa Mahal": [
      { era: "Built by Maharaja", year: "1799", description: "Built by Maharaja Sawai Pratap Singh for royal women to observe street life", funFact: "It has 953 small windows (jharokhas) designed as honeycombs" },
      { era: "Pink City Icon", year: "1800s", description: "Became the iconic symbol of Jaipur's Pink City heritage", funFact: "The building is only one room deep in many places!" },
    ],
    default: [
      { era: "Ancient Origins", year: "500+ years ago", description: "This site has witnessed centuries of Indian history", funFact: "Many monuments have secret underground chambers" },
      { era: "Colonial Period", year: "1700-1947", description: "Transformed under British rule and Indian independence movement", funFact: "Freedom fighters often used historical sites as meeting points" },
    ],
  };
  return history[placeName] || history.default;
};

// ═══════════════════════════════════════
// 11. Smart Packing (Weather-based)
// ═══════════════════════════════════════
export interface WeatherPacking {
  weather: string;
  temp: string;
  items: string[];
}

export const getWeatherPacking = (city: string): WeatherPacking => {
  const data: Record<string, WeatherPacking> = {
    Ladakh: { weather: "Cold & Dry ❄️", temp: "-5°C to 15°C", items: ["Heavy winter jacket", "Thermal innerwear", "UV sunglasses", "Altitude sickness medicine", "Lip balm & moisturizer"] },
    Kerala: { weather: "Warm & Humid 🌴", temp: "25°C to 35°C", items: ["Light cotton clothes", "Raincoat", "Mosquito repellent", "Waterproof bag", "Sandals"] },
    Jaipur: { weather: "Hot & Dry 🌞", temp: "30°C to 45°C", items: ["Sunscreen SPF 50+", "Wide hat", "Light loose clothing", "Electrolyte packets", "Cotton scarf"] },
    default: { weather: "Pleasant ☀️", temp: "20°C to 30°C", items: ["Comfortable walking shoes", "Light layers", "Sunscreen", "Reusable water bottle", "Rain jacket"] },
  };
  return data[city] || data.default;
};

// ═══════════════════════════════════════
// 12. Emergency Contacts
// ═══════════════════════════════════════
export const EMERGENCY_CONTACTS = [
  { label: "Police", number: "100", icon: "🚔", color: "bg-primary/10 text-primary" },
  { label: "Ambulance", number: "102", icon: "🚑", color: "bg-destructive/10 text-destructive" },
  { label: "Women Helpline", number: "1091", icon: "👩", color: "bg-ts-rose/10 text-ts-rose" },
  { label: "Tourist Helpline", number: "1363", icon: "🧳", color: "bg-ts-saffron/10 text-ts-saffron" },
  { label: "Fire", number: "101", icon: "🔥", color: "bg-accent/10 text-accent" },
  { label: "Disaster", number: "108", icon: "⚠️", color: "bg-ts-purple/10 text-ts-purple" },
];

// ═══════════════════════════════════════
// 13. AI Story Generator
// ═══════════════════════════════════════
export const generateTravelStory = (places: string[], tripTitle: string): string => {
  const intros = [
    `Our journey began with excitement and wonder as we set off to explore ${places[0]}.`,
    `The morning sun cast golden rays as we arrived at ${places[0]}, ready for adventure.`,
    `With bags packed and hearts full of anticipation, our first stop was the magnificent ${places[0]}.`,
  ];
  const middles = places.slice(1).map(p => {
    const templates = [
      `Next, we discovered the beauty of ${p}, a place that took our breath away.`,
      `The journey continued to ${p}, where every corner held a new surprise.`,
      `${p} welcomed us with open arms and unforgettable memories.`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  });
  const endings = [
    "As we headed home, we carried with us not just souvenirs, but stories that would last a lifetime. India had once again proven that it's not just a destination — it's an experience. 🇮🇳✨",
    "Looking back at the photos and memories, we realized this trip wasn't just about places — it was about the people we met, the food we tasted, and the moments we'll never forget. Until next time, India! 🙏💫",
  ];
  return [
    `# ${tripTitle}\n`,
    `*A Travel Story by TripSaarthi AI* ✍️\n`,
    intros[Math.floor(Math.random() * intros.length)],
    ...middles,
    "",
    endings[Math.floor(Math.random() * endings.length)],
  ].join("\n\n");
};
