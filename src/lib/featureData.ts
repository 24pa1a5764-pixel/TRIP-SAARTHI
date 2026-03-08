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

// ═══════════════════════════════════════
// 14. Smart Food Finder
// ═══════════════════════════════════════
export interface FoodSpot {
  name: string;
  loc: string;
  type: "veg" | "non-veg" | "both";
  dish: string;
  price: string;
  priceRange: "budget" | "mid" | "premium";
  hygieneRating: number; // 1-5
  rating: number;
  img: string;
  description: string;
}

export const FOOD_SPOTS: FoodSpot[] = [
  { name: "Karim's", loc: "Old Delhi", type: "non-veg", dish: "Mutton Burra", price: "₹300-600", priceRange: "mid", hygieneRating: 4, rating: 4.7, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", description: "Legendary Mughlai since 1913" },
  { name: "Paranthe Wali Gali", loc: "Chandni Chowk", type: "veg", dish: "Stuffed Paranthas", price: "₹50-150", priceRange: "budget", hygieneRating: 3, rating: 4.5, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", description: "200-year-old parantha street" },
  { name: "Lassiwala", loc: "Jaipur", type: "veg", dish: "Fresh Lassi", price: "₹30-60", priceRange: "budget", hygieneRating: 4, rating: 4.8, img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80", description: "Famous thick creamy lassi since 1944" },
  { name: "Leopold Cafe", loc: "Mumbai", type: "both", dish: "Butter Chicken", price: "₹400-800", priceRange: "mid", hygieneRating: 5, rating: 4.3, img: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80", description: "Iconic cafe since 1871" },
  { name: "MTR", loc: "Bangalore", type: "veg", dish: "Masala Dosa", price: "₹80-200", priceRange: "budget", hygieneRating: 5, rating: 4.6, img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80", description: "South Indian breakfast institution since 1924" },
  { name: "Paradise Biryani", loc: "Hyderabad", type: "non-veg", dish: "Hyderabadi Biryani", price: "₹200-500", priceRange: "mid", hygieneRating: 4, rating: 4.7, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", description: "The original Hyderabadi biryani" },
  { name: "Blue Tokai", loc: "Multiple Cities", type: "veg", dish: "Specialty Coffee", price: "₹200-400", priceRange: "mid", hygieneRating: 5, rating: 4.4, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80", description: "India's craft coffee pioneer" },
  { name: "Tunday Kebabi", loc: "Lucknow", type: "non-veg", dish: "Galouti Kebab", price: "₹100-300", priceRange: "budget", hygieneRating: 3, rating: 4.8, img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80", description: "Melt-in-mouth kebabs since 1905" },
];

// ═══════════════════════════════════════
// 15. Weather Alerts
// ═══════════════════════════════════════
export interface WeatherAlert {
  city: string;
  temp: string;
  condition: string;
  icon: string;
  alert: string | null;
  alertType: "rain" | "heat" | "storm" | "cold" | null;
  forecast: { day: string; temp: string; icon: string }[];
  tip: string;
}

export const getWeatherAlerts = (city: string): WeatherAlert => {
  const data: Record<string, WeatherAlert> = {
    Delhi: { city: "Delhi", temp: "38°C", condition: "Sunny", icon: "☀️", alert: "Heat wave warning! Stay hydrated", alertType: "heat", forecast: [{ day: "Mon", temp: "39°C", icon: "☀️" }, { day: "Tue", temp: "40°C", icon: "🌡️" }, { day: "Wed", temp: "37°C", icon: "⛅" }, { day: "Thu", temp: "35°C", icon: "🌧️" }, { day: "Fri", temp: "33°C", icon: "🌧️" }], tip: "Carry ORS packets and avoid outdoor activities 12-3 PM" },
    Goa: { city: "Goa", temp: "32°C", condition: "Partly Cloudy", icon: "⛅", alert: "Heavy rain expected tomorrow", alertType: "rain", forecast: [{ day: "Mon", temp: "32°C", icon: "⛅" }, { day: "Tue", temp: "28°C", icon: "🌧️" }, { day: "Wed", temp: "27°C", icon: "🌧️" }, { day: "Thu", temp: "30°C", icon: "⛅" }, { day: "Fri", temp: "31°C", icon: "☀️" }], tip: "Carry waterproof bags for electronics" },
    Ladakh: { city: "Ladakh", temp: "8°C", condition: "Clear & Cold", icon: "❄️", alert: "Extreme cold at night (-10°C)", alertType: "cold", forecast: [{ day: "Mon", temp: "8°C", icon: "❄️" }, { day: "Tue", temp: "6°C", icon: "❄️" }, { day: "Wed", temp: "10°C", icon: "☀️" }, { day: "Thu", temp: "7°C", icon: "❄️" }, { day: "Fri", temp: "9°C", icon: "☀️" }], tip: "Layer up! Altitude sickness pills recommended" },
    Mumbai: { city: "Mumbai", temp: "33°C", condition: "Humid", icon: "🌤️", alert: null, alertType: null, forecast: [{ day: "Mon", temp: "33°C", icon: "🌤️" }, { day: "Tue", temp: "32°C", icon: "⛅" }, { day: "Wed", temp: "31°C", icon: "🌧️" }, { day: "Thu", temp: "30°C", icon: "🌧️" }, { day: "Fri", temp: "32°C", icon: "⛅" }], tip: "Mumbai traffic is worst during rain — plan extra travel time" },
    default: { city: "India", temp: "30°C", condition: "Pleasant", icon: "☀️", alert: null, alertType: null, forecast: [{ day: "Mon", temp: "30°C", icon: "☀️" }, { day: "Tue", temp: "31°C", icon: "⛅" }, { day: "Wed", temp: "29°C", icon: "☀️" }, { day: "Thu", temp: "28°C", icon: "🌧️" }, { day: "Fri", temp: "30°C", icon: "☀️" }], tip: "Check local weather before heading out" },
  };
  return data[city] || data.default;
};

// ═══════════════════════════════════════
// 16. Gamified Travel Badges
// ═══════════════════════════════════════
export interface TravelBadge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requirement: string;
  category: string;
  color: string;
  bg: string;
}

export const TRAVEL_BADGES: TravelBadge[] = [
  { id: "temple_explorer", name: "Temple Explorer", emoji: "🛕", description: "Visited 3+ spiritual/heritage sites", requirement: "Visit 3 heritage or spiritual places", category: "heritage,spiritual", color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  { id: "food_connoisseur", name: "Food Connoisseur", emoji: "🍛", description: "Tried 5+ famous food spots", requirement: "Add 5 food places to trips", category: "food", color: "text-ts-rose", bg: "bg-ts-rose/10" },
  { id: "mountain_traveler", name: "Mountain Traveler", emoji: "🏔️", description: "Explored hill stations & peaks", requirement: "Visit 3 nature/adventure spots", category: "nature,adventure", color: "text-ts-sky", bg: "bg-ts-sky/10" },
  { id: "culture_buff", name: "Culture Buff", emoji: "🎭", description: "Immersed in local traditions", requirement: "View 5 cultural etiquette guides", category: "spiritual,heritage", color: "text-ts-purple", bg: "bg-ts-purple/10" },
  { id: "eco_warrior", name: "Eco Warrior", emoji: "🌿", description: "Tracked carbon footprint", requirement: "Use the eco tracker 3 times", category: "nature", color: "text-ts-green", bg: "bg-ts-green/10" },
  { id: "hidden_gem_hunter", name: "Gem Hunter", emoji: "💎", description: "Discovered hidden gems", requirement: "Explore 3 hidden gems", category: "nature", color: "text-ts-sky", bg: "bg-ts-sky/10" },
  { id: "trip_master", name: "Trip Master", emoji: "🧭", description: "Planned 5+ complete trips", requirement: "Save 5 trip itineraries", category: "all", color: "text-ts-saffron", bg: "bg-ts-saffron/10" },
  { id: "social_butterfly", name: "Social Butterfly", emoji: "🦋", description: "Active in community", requirement: "Send 10 community messages", category: "all", color: "text-ts-purple", bg: "bg-ts-purple/10" },
];

// ═══════════════════════════════════════
// 17. Local Transport Finder
// ═══════════════════════════════════════
export interface TransportOption {
  type: string;
  icon: string;
  name: string;
  distance: string;
  time: string;
  cost: string;
  isCheapest?: boolean;
  isFastest?: boolean;
}

export const getLocalTransport = (city: string): TransportOption[] => {
  const data: Record<string, TransportOption[]> = {
    Delhi: [
      { type: "metro", icon: "🚇", name: "Rajiv Chowk Metro", distance: "0.5 km", time: "2 min walk", cost: "₹20-60", isCheapest: true },
      { type: "bus", icon: "🚌", name: "DTC Bus Stop", distance: "0.3 km", time: "1 min walk", cost: "₹10-25", isCheapest: true },
      { type: "auto", icon: "🛺", name: "Auto Stand", distance: "0.1 km", time: "Nearby", cost: "₹50-150" },
      { type: "taxi", icon: "🚕", name: "Uber/Ola", distance: "3 min", time: "On demand", cost: "₹100-300", isFastest: true },
      { type: "bike", icon: "🚲", name: "Yulu Bike", distance: "0.2 km", time: "1 min walk", cost: "₹10/30min" },
    ],
    Mumbai: [
      { type: "train", icon: "🚂", name: "CST Local Station", distance: "0.4 km", time: "3 min walk", cost: "₹5-15", isCheapest: true },
      { type: "bus", icon: "🚌", name: "BEST Bus Stop", distance: "0.2 km", time: "1 min walk", cost: "₹6-20" },
      { type: "auto", icon: "🛺", name: "Auto Rickshaw", distance: "0.1 km", time: "Nearby", cost: "₹30-100" },
      { type: "taxi", icon: "🚕", name: "Kaali-Peeli Taxi", distance: "0.2 km", time: "2 min walk", cost: "₹80-250", isFastest: true },
    ],
    default: [
      { type: "bus", icon: "🚌", name: "City Bus Stand", distance: "0.3 km", time: "2 min walk", cost: "₹10-30", isCheapest: true },
      { type: "auto", icon: "🛺", name: "Auto Rickshaw", distance: "0.1 km", time: "Nearby", cost: "₹40-120" },
      { type: "taxi", icon: "🚕", name: "Cab (Uber/Ola)", distance: "5 min", time: "On demand", cost: "₹100-300", isFastest: true },
      { type: "bike", icon: "🚲", name: "Rental Bike", distance: "0.5 km", time: "3 min walk", cost: "₹50/hr" },
    ],
  };
  return data[city] || data.default;
};

// ═══════════════════════════════════════
// 18. Festival & Event Alerts
// ═══════════════════════════════════════
export interface FestivalEvent {
  name: string;
  loc: string;
  date: string;
  month: string;
  type: "festival" | "event" | "fair";
  description: string;
  icon: string;
  img: string;
}

export const FESTIVALS: FestivalEvent[] = [
  { name: "Pushkar Camel Fair", loc: "Rajasthan", date: "Nov 20-28", month: "November", type: "fair", description: "World's largest camel fair with cultural performances", icon: "🐪", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80" },
  { name: "Goa Carnival", loc: "Goa", date: "Feb 17-20", month: "February", type: "festival", description: "Colorful parades, music, and dance on the streets", icon: "🎭", img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80" },
  { name: "Holi Festival", loc: "Mathura & Vrindavan", date: "Mar 14", month: "March", type: "festival", description: "Festival of colors — most vibrant in Braj region", icon: "🎨", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80" },
  { name: "Hornbill Festival", loc: "Nagaland", date: "Dec 1-10", month: "December", type: "festival", description: "Festival of festivals showcasing Naga tribal culture", icon: "🦅", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
  { name: "Rann Utsav", loc: "Gujarat", date: "Nov-Feb", month: "November", type: "event", description: "White desert festival with folk music under moonlight", icon: "🌙", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80" },
  { name: "Mysore Dasara", loc: "Karnataka", date: "Oct 2-12", month: "October", type: "festival", description: "10-day royal celebration with palace illumination", icon: "👑", img: "https://images.unsplash.com/photo-1600100397608-28c01e4b9c5d?w=400&q=80" },
  { name: "Kumbh Mela", loc: "Prayagraj", date: "Jan-Feb", month: "January", type: "festival", description: "World's largest religious gathering", icon: "🕉️", img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&q=80" },
  { name: "Jaipur Literature Festival", loc: "Jaipur", date: "Jan 19-23", month: "January", type: "event", description: "World's largest free literary festival", icon: "📚", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80" },
];

// ═══════════════════════════════════════
// 19. Multi-Language Translator
// ═══════════════════════════════════════
export interface PhraseTranslation {
  english: string;
  hindi: string;
  telugu: string;
  tamil: string;
  bengali: string;
  marathi: string;
  category: string;
}

export const TRAVEL_PHRASES: PhraseTranslation[] = [
  { english: "Hello / Greetings", hindi: "Namaste (नमस्ते)", telugu: "Namaskaram (నమస్కారం)", tamil: "Vanakkam (வணக்கம்)", bengali: "Nomoshkar (নমস্কার)", marathi: "Namaskar (नमस्कार)", category: "greeting" },
  { english: "Thank you", hindi: "Dhanyavaad (धन्यवाद)", telugu: "Dhanyavaadalu (ధన్యవాదాలు)", tamil: "Nandri (நன்றி)", bengali: "Dhonnobad (ধন্যবাদ)", marathi: "Dhanyavaad (धन्यवाद)", category: "greeting" },
  { english: "How much does this cost?", hindi: "Yeh kitne ka hai? (यह कितने का है?)", telugu: "Idi entha? (ఇది ఎంత?)", tamil: "Idhu evvalavu? (இது எவ்வளவு?)", bengali: "Eta koto? (এটা কত?)", marathi: "He kiti aahe? (हे किती आहे?)", category: "shopping" },
  { english: "Where is the toilet?", hindi: "Bathroom kahan hai? (बाथरूम कहाँ है?)", telugu: "Bathroom ekkada? (బాత్రూమ్ ఎక్కడ?)", tamil: "Bathroom enga? (பாத்ரூம் எங்க?)", bengali: "Bathroom kothay? (বাথরুম কোথায়?)", marathi: "Bathroom kuthe aahe? (बाथरूम कुठे आहे?)", category: "essential" },
  { english: "I need help", hindi: "Mujhe madad chahiye (मुझे मदद चाहिए)", telugu: "Naaku sahayam kaavali (నాకు సహాయం కావాలి)", tamil: "Enakku uthavi venum (எனக்கு உதவி வேணும்)", bengali: "Amar shahajjo dorkar (আমার সাহায্য দরকার)", marathi: "Mala madad havi (मला मदत हवी)", category: "emergency" },
  { english: "Please call a doctor", hindi: "Doctor ko bulao (डॉक्टर को बुलाओ)", telugu: "Doctor ni pilawandi (డాక్టర్ ని పిలవండి)", tamil: "Doctor kuppidungal (டாக்டர் கூப்பிடுங்கள்)", bengali: "Doctor ke dakun (ডাক্তার কে ডাকুন)", marathi: "Doctor la bolava (डॉक्टरला बोलवा)", category: "emergency" },
  { english: "This food is delicious!", hindi: "Yeh bohot swadist hai! (यह बहुत स्वादिष्ट है!)", telugu: "Chaala baagundi! (చాలా బాగుంది!)", tamil: "Romba nalla irukku! (ரொம்ப நல்லா இருக்கு!)", bengali: "Khub bhalo! (খুব ভালো!)", marathi: "Khup chhan aahe! (खूप छान आहे!)", category: "food" },
  { english: "Can you take a photo?", hindi: "Kya aap photo le sakte hain? (क्या आप फोटो ले सकते हैं?)", telugu: "Photo theeyagalara? (ఫోటో తీయగలరా?)", tamil: "Photo edukka mudiyuma? (போட்டோ எடுக்க முடியுமா?)", bengali: "Photo tulte parben? (ফটো তুলতে পারবেন?)", marathi: "Photo kadhaal ka? (फोटो काढाल का?)", category: "travel" },
  { english: "I am a tourist", hindi: "Main tourist hoon (मैं टूरिस्ट हूँ)", telugu: "Nenu tourist ni (నేను టూరిస్ట్ ని)", tamil: "Naan tourist (நான் டூரிஸ்ட்)", bengali: "Ami tourist (আমি টুরিস্ট)", marathi: "Mi tourist aahe (मी टूरिस्ट आहे)", category: "travel" },
  { english: "What is this place called?", hindi: "Is jagah ka naam kya hai? (इस जगह का नाम क्या है?)", telugu: "Ee chotu peru enti? (ఈ చోటు పేరు ఏంటి?)", tamil: "Idhu enna idam? (இது என்ன இடம்?)", bengali: "Ei jaygar naam ki? (এই জায়গার নাম কি?)", marathi: "Ya jaageche naav kay? (या जागेचे नाव काय?)", category: "travel" },
];

// ═══════════════════════════════════════
// 20. AI Photo Spot Finder
// ═══════════════════════════════════════
export interface PhotoSpot {
  name: string;
  loc: string;
  bestTime: string;
  type: "sunrise" | "sunset" | "golden_hour" | "night" | "anytime";
  tip: string;
  icon: string;
  img: string;
  rating: number;
}

export const PHOTO_SPOTS: PhotoSpot[] = [
  { name: "Taj Mahal Sunrise", loc: "Agra", bestTime: "5:30 AM - 6:30 AM", type: "sunrise", tip: "Shoot from Mehtab Bagh across the river for reflection shots", icon: "🌅", img: "https://images.unsplash.com/photo-1564507592209-4b471c0df1b8?w=400&q=80", rating: 5.0 },
  { name: "Pangong Lake", loc: "Ladakh", bestTime: "6:00 AM - 8:00 AM", type: "sunrise", tip: "The lake changes 5 colors — capture the transition", icon: "🏔️", img: "https://images.unsplash.com/photo-1626083558364-783a45c61ea0?w=400&q=80", rating: 4.9 },
  { name: "Ganga Aarti", loc: "Varanasi", bestTime: "6:30 PM - 7:30 PM", type: "night", tip: "Book a boat for stunning fire ceremony shots from the water", icon: "🪔", img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&q=80", rating: 4.8 },
  { name: "Hawa Mahal Pink Hour", loc: "Jaipur", bestTime: "4:00 PM - 5:30 PM", type: "golden_hour", tip: "The facade glows pink during golden hour — shoot from the cafe across", icon: "🏰", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80", rating: 4.7 },
  { name: "Tea Gardens", loc: "Munnar, Kerala", bestTime: "7:00 AM - 9:00 AM", type: "sunrise", tip: "Morning mist creates magical layers — use a long lens", icon: "🍃", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80", rating: 4.8 },
  { name: "Gateway of India", loc: "Mumbai", bestTime: "5:30 PM - 6:30 PM", type: "sunset", tip: "Sunset behind the arch — arrive early to get the front spot", icon: "🌇", img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400&q=80", rating: 4.5 },
  { name: "Golden Temple Night", loc: "Amritsar", bestTime: "8:00 PM - 10:00 PM", type: "night", tip: "Reflection in the holy pool is magical — use tripod for long exposure", icon: "✨", img: "https://images.unsplash.com/photo-1589136142558-132d757d5494?w=400&q=80", rating: 4.9 },
  { name: "Alleppey Backwaters", loc: "Kerala", bestTime: "5:00 PM - 6:30 PM", type: "sunset", tip: "Sunset from the houseboat with palm silhouettes", icon: "🌴", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80", rating: 4.7 },
];
