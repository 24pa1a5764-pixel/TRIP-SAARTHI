export interface Place {
  name: string;
  loc: string;
  img: string;
  lat: number;
  lng: number;
  category?: string;
  rating?: number;
  duration?: string;
  price?: string;
  description?: string;
}

export const MOCK_DATA: Record<string, Place[]> = {
  heritage: [
    { name: "Taj Mahal", loc: "Agra", img: "https://images.unsplash.com/photo-1564507592209-4b471c0df1b8?w=400&q=80", lat: 27.1751, lng: 78.0421, rating: 4.9, duration: "3-4 hrs", price: "₹50", description: "UNESCO World Heritage Site, one of the seven wonders of the world" },
    { name: "Lotus Temple", loc: "Delhi", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80", lat: 28.5535, lng: 77.2588, rating: 4.5, duration: "1-2 hrs", price: "Free", description: "Bahá'í House of Worship, stunning lotus-shaped architecture" },
    { name: "Hawa Mahal", loc: "Jaipur", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80", lat: 26.9239, lng: 75.8267, rating: 4.6, duration: "1-2 hrs", price: "₹50", description: "Palace of Winds with 953 small windows" },
    { name: "Golden Temple", loc: "Amritsar", img: "https://images.unsplash.com/photo-1589136142558-132d757d5494?w=400&q=80", lat: 31.6200, lng: 74.8765, rating: 4.9, duration: "2-3 hrs", price: "Free", description: "Holiest Gurdwara and spiritual center of Sikhism" },
    { name: "Mysore Palace", loc: "Mysore", img: "https://images.unsplash.com/photo-1600100397608-28c01e4b9c5d?w=400&q=80", lat: 12.3052, lng: 76.6552, rating: 4.7, duration: "2-3 hrs", price: "₹70", description: "Royal palace with Indo-Saracenic architecture" },
    { name: "Konark Sun Temple", loc: "Odisha", img: "https://images.unsplash.com/photo-1590766940554-634856225441?w=400&q=80", lat: 19.8876, lng: 86.0945, rating: 4.6, duration: "2-3 hrs", price: "₹40", description: "13th-century temple shaped as a giant chariot" },
  ],
  nature: [
    { name: "Lodhi Garden", loc: "Delhi", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80", lat: 28.5933, lng: 77.2195, rating: 4.3, duration: "1-2 hrs", price: "Free", description: "Historic park with tombs from the Lodhi dynasty" },
    { name: "Pangong Lake", loc: "Ladakh", img: "https://images.unsplash.com/photo-1626083558364-783a45c61ea0?w=400&q=80", lat: 33.7595, lng: 78.6674, rating: 4.8, duration: "Half day", price: "Free", description: "Highest saltwater lake, famous for changing colors" },
    { name: "Alleppey Backwaters", loc: "Kerala", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80", lat: 9.4981, lng: 76.3388, rating: 4.7, duration: "Full day", price: "₹1500+", description: "Serene houseboat experience through palm-lined canals" },
    { name: "Valley of Flowers", loc: "Uttarakhand", img: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=400&q=80", lat: 30.7280, lng: 79.6050, rating: 4.8, duration: "Full day", price: "₹150", description: "UNESCO site with 600+ species of wildflowers" },
    { name: "Dudhsagar Falls", loc: "Goa", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80", lat: 15.3144, lng: 74.3143, rating: 4.5, duration: "Half day", price: "₹400", description: "Spectacular four-tiered waterfall on the Mandovi river" },
  ],
  shopping: [
    { name: "Dilli Haat", loc: "Delhi", img: "https://images.unsplash.com/photo-1533423996375-f914ab1848bc?w=400&q=80", lat: 28.5728, lng: 77.2086, rating: 4.2, duration: "2-3 hrs", price: "₹30 entry", description: "Open-air market with handicrafts from across India" },
    { name: "Colaba Causeway", loc: "Mumbai", img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400&q=80", lat: 18.9151, lng: 72.8258, rating: 4.1, duration: "2-3 hrs", price: "Free", description: "Vibrant street market with antiques, fashion and art" },
    { name: "Johari Bazaar", loc: "Jaipur", img: "https://images.unsplash.com/photo-1629813286469-657e09710ea4?w=400&q=80", lat: 26.9124, lng: 75.8203, rating: 4.4, duration: "2-3 hrs", price: "Free", description: "Famous gem and jewelry market of the Pink City" },
    { name: "Laad Bazaar", loc: "Hyderabad", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80", lat: 17.3616, lng: 78.4747, rating: 4.3, duration: "2-3 hrs", price: "Free", description: "Bangles, pearls and traditional Hyderabadi crafts" },
  ],
  food: [
    { name: "Chandni Chowk", loc: "Old Delhi", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", lat: 28.6606, lng: 77.2273, rating: 4.6, duration: "2-3 hrs", price: "₹200-500", description: "Asia's largest spice market with legendary street food" },
    { name: "Assi Ghat Cafes", loc: "Varanasi", img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&q=80", lat: 25.2818, lng: 83.0063, rating: 4.4, duration: "1-2 hrs", price: "₹100-300", description: "Riverside cafes with stunning Ganga views" },
    { name: "VV Puram Food Street", loc: "Bangalore", img: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80", lat: 12.9499, lng: 77.5724, rating: 4.5, duration: "1-2 hrs", price: "₹150-400", description: "South Indian delicacies on a vibrant food street" },
    { name: "Sardar Market", loc: "Jodhpur", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", lat: 26.2960, lng: 73.0209, rating: 4.3, duration: "2-3 hrs", price: "₹100-300", description: "Rajasthani snacks near the iconic Clock Tower" },
  ],
  adventure: [
    { name: "Rishikesh Rafting", loc: "Uttarakhand", img: "https://images.unsplash.com/photo-1530866495561-507c83d15e30?w=400&q=80", lat: 30.0869, lng: 78.2676, rating: 4.7, duration: "3-4 hrs", price: "₹1000+", description: "White water rafting on the holy Ganges river" },
    { name: "Manali Paragliding", loc: "Himachal", img: "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?w=400&q=80", lat: 32.2396, lng: 77.1887, rating: 4.6, duration: "1-2 hrs", price: "₹2500+", description: "Soar over Kullu Valley with Himalayan views" },
    { name: "Goa Water Sports", loc: "Goa", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80", lat: 15.2993, lng: 74.1240, rating: 4.4, duration: "Half day", price: "₹800+", description: "Jet ski, banana boat, parasailing on golden beaches" },
  ],
  spiritual: [
    { name: "Varanasi Ghats", loc: "Varanasi", img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&q=80", lat: 25.3176, lng: 83.0103, rating: 4.8, duration: "Half day", price: "Free", description: "Ancient riverside steps for sacred Hindu rituals" },
    { name: "Bodh Gaya", loc: "Bihar", img: "https://images.unsplash.com/photo-1591018653367-3a1e8e5e3e15?w=400&q=80", lat: 24.6961, lng: 84.9869, rating: 4.7, duration: "3-4 hrs", price: "Free", description: "Where Buddha attained enlightenment under the Bodhi Tree" },
    { name: "Tirupati Temple", loc: "Andhra Pradesh", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80", lat: 13.6288, lng: 79.4192, rating: 4.8, duration: "4-6 hrs", price: "Free", description: "Most visited religious site in the world" },
  ],
};

export const flattenMockData = (): Place[] => {
  const all: Place[] = [];
  Object.keys(MOCK_DATA).forEach((key) => {
    MOCK_DATA[key].forEach((item) => all.push({ ...item, category: key }));
  });
  return all;
};

export interface TripSettings {
  start: string;
  end: string;
  type: string;
  budget: string;
}

export interface ItineraryStep {
  time: string;
  plan: string;
  cost: string;
  tip: string;
}

export interface ItineraryData {
  title: string;
  greeting: string;
  itinerary: ItineraryStep[];
  foods: string[];
  isPacking?: boolean;
  items?: string[];
}

export interface SavedTrip {
  id: number;
  date: string;
  places: string[];
  data: ItineraryData;
}

export interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

export interface UserData {
  name: string;
  email: string;
  avatar: string;
}

export const fetchWithRetry = async (url: string, options: RequestInit, retries = 3) => {
  const delays = [1000, 2000, 4000];
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((r) => setTimeout(r, delays[i]));
    }
  }
};

// Mock AI generation when no API key available
export const generateMockItinerary = (places: Place[], type: string, budget: string, vibe: string): ItineraryData => {
  const budgetMap: Record<string, string> = { Economy: "₹500-1000", Standard: "₹1500-3000", Luxury: "₹5000-10000" };
  const foods: Record<string, string[]> = {
    Delhi: ["Paranthe wali Gali", "Karim's Kebabs", "Natraj Dahi Bhalle", "Old Delhi Jalebi"],
    Agra: ["Petha Sweets", "Mughlai Biryani", "Bedai & Jalebi"],
    Jaipur: ["Dal Baati Churma", "Pyaaz Kachori", "Lassi at Lassiwala"],
    Kerala: ["Appam & Stew", "Kerala Fish Curry", "Banana Chips"],
    default: ["Local Thali", "Street Chai", "Regional Sweets", "Fresh Lassi"],
  };

  const placeFoods = places.flatMap(p => foods[p.loc] || foods.default).slice(0, 6);

  const itinerary: ItineraryStep[] = [];
  const times = ["6:00 AM", "8:30 AM", "10:00 AM", "12:30 PM", "2:00 PM", "4:30 PM", "6:00 PM", "8:00 PM"];
  const activities = [
    { prefix: "🌅 Early morning", suffix: "visit for sunrise views and fewer crowds" },
    { prefix: "🍳 Breakfast at", suffix: "- try the local specialty" },
    { prefix: "🏛️ Explore", suffix: "with a guided tour for deeper insights" },
    { prefix: "🍽️ Lunch break at", suffix: "- authentic regional cuisine" },
    { prefix: "📸 Photography walk around", suffix: "area for Instagram-worthy shots" },
    { prefix: "☕ Chai break at", suffix: "- unwind and people-watch" },
    { prefix: "🌇 Evening stroll near", suffix: "for golden hour vibes" },
    { prefix: "🍛 Dinner at", suffix: "- don't miss the chef's special" },
  ];

  const tips = [
    "Carry a water bottle — stay hydrated!",
    "Bargain politely at local shops",
    "Wear comfortable walking shoes",
    "Keep small change handy for tipping",
    "Download offline maps before heading out",
    "Try the local street food — it's amazing!",
    "Book tickets online to skip queues",
    "Respect local customs and dress codes",
  ];

  places.forEach((place, idx) => {
    const startIdx = (idx * 3) % times.length;
    for (let j = 0; j < Math.min(3, times.length - startIdx); j++) {
      const actIdx = (startIdx + j) % activities.length;
      itinerary.push({
        time: times[startIdx + j],
        plan: `${activities[actIdx].prefix} ${place.name} ${activities[actIdx].suffix}`,
        cost: budgetMap[budget] || budgetMap.Standard,
        tip: tips[(startIdx + j) % tips.length],
      });
    }
  });

  const vibeGreetings: Record<string, string> = {
    Standard: "Welcome to your perfectly balanced Indian adventure!",
    Adventurous: "Get ready for an adrenaline-packed journey through incredible India!",
    Relaxed: "Slow down, breathe in, and savor every moment of this serene journey.",
    Historical: "Step back in time and walk through centuries of rich Indian history.",
    Foodie: "Your taste buds are about to go on the most epic journey of their life!",
  };

  return {
    title: `${vibe} ${type} Trip: ${places.map(p => p.name).join(" → ")}`,
    greeting: vibeGreetings[vibe] || vibeGreetings.Standard,
    itinerary: itinerary.slice(0, 8),
    foods: placeFoods,
  };
};

export const generateMockPackingList = (places: Place[], type: string): ItineraryData => {
  const baseItems = [
    "Comfortable walking shoes",
    "Sunscreen SPF 50+",
    "Reusable water bottle",
    "Power bank & chargers",
    "First aid kit",
    "Travel documents & ID copies",
    "Light cotton clothes",
    "Rain jacket / umbrella",
  ];
  const typeItems: Record<string, string[]> = {
    Solo: ["Portable lock", "Journal & pen", "Headphones", "Solo selfie stick"],
    Couple: ["Matching outfits for photos", "Travel games", "Couples journal"],
    Family: ["Kids' snacks", "Wet wipes", "Extra clothes for kids", "Travel toys"],
    Friends: ["Bluetooth speaker", "Card games", "Group first-aid kit"],
  };
  const placeItems = places.some(p => p.category === "nature")
    ? ["Hiking boots", "Insect repellent", "Binoculars"]
    : places.some(p => p.category === "spiritual")
    ? ["Modest clothing", "Head covering", "Offering flowers"]
    : ["Camera with extra battery", "Guidebook"];

  return {
    title: `Smart Packing List for ${type} Trip`,
    greeting: "",
    itinerary: [],
    foods: [],
    isPacking: true,
    items: [...baseItems, ...(typeItems[type] || typeItems.Solo), ...placeItems],
  };
};

export const MOCK_CHAT_RESPONSES: Record<string, string> = {
  "safest areas for solo travel?": "Delhi's South Delhi areas like Hauz Khas, Saket & Greater Kailash are super safe for solo travelers! Rajasthan's Udaipur and Kerala's Fort Kochi are also fantastic. Always share your live location with family! 🙏",
  "best street food spots?": "Oh you're in for a treat! Chandni Chowk in Delhi is street food heaven — try Paranthe wali Gali! Mumbai's Chowpatty Beach for Pav Bhaji, and Lucknow's Aminabad for the best Tunday Kebabs! 🍛",
  "tips to avoid crowds?": "Visit popular monuments at sunrise (6-7 AM) for magical empty photos! Travel mid-week instead of weekends. Off-season (July-Sept) means fewer tourists and lower prices. Book skip-the-line tickets online! ⏰",
  default: "That's a great question! India has so much to offer. I'd recommend starting with the Golden Triangle (Delhi-Agra-Jaipur) for first-timers, or head south to Kerala for a more relaxed vibe. What kind of experience are you looking for? 🇮🇳",
};

export const getChatResponse = (query: string): string => {
  const lower = query.toLowerCase();
  for (const [key, value] of Object.entries(MOCK_CHAT_RESPONSES)) {
    if (key !== "default" && lower.includes(key.replace("?", "").toLowerCase().slice(0, 15))) {
      return value;
    }
  }
  if (lower.includes("food") || lower.includes("eat")) return MOCK_CHAT_RESPONSES["best street food spots?"];
  if (lower.includes("safe") || lower.includes("solo")) return MOCK_CHAT_RESPONSES["safest areas for solo travel?"];
  if (lower.includes("crowd") || lower.includes("busy")) return MOCK_CHAT_RESPONSES["tips to avoid crowds?"];
  if (lower.includes("budget")) return "India is incredibly budget-friendly! A backpacker can easily get by on ₹1500-2000/day. Mid-range travelers can enjoy great comfort at ₹3000-5000/day. Luxury experiences start from ₹8000+ per day! 💰";
  if (lower.includes("weather") || lower.includes("best time")) return "October to March is peak season with perfect weather! April-June is hot but great for hill stations. Monsoon (July-Sept) is magical in Kerala and Northeast India! 🌦️";
  if (lower.includes("transport")) return "India has amazing train connectivity — book on IRCTC! For cities, use Uber/Ola. For scenic routes, try the toy trains in Shimla or Darjeeling. Domestic flights are affordable with IndiGo and SpiceJet! 🚂";
  return MOCK_CHAT_RESPONSES.default;
};
