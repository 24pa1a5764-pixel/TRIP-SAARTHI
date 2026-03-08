export interface Place {
  name: string;
  loc: string;
  img: string;
  lat: number;
  lng: number;
  category?: string;
}

export const MOCK_DATA: Record<string, Place[]> = {
  heritage: [
    { name: "Taj Mahal", loc: "Agra", img: "https://images.unsplash.com/photo-1564507592209-4b471c0df1b8?w=400&q=80", lat: 27.1751, lng: 78.0421 },
    { name: "Lotus Temple", loc: "Delhi", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80", lat: 28.5535, lng: 77.2588 },
    { name: "Hawa Mahal", loc: "Jaipur", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80", lat: 26.9239, lng: 75.8267 },
    { name: "Golden Temple", loc: "Amritsar", img: "https://images.unsplash.com/photo-1589136142558-132d757d5494?w=400&q=80", lat: 31.6200, lng: 74.8765 },
  ],
  nature: [
    { name: "Lodhi Garden", loc: "Delhi", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80", lat: 28.5933, lng: 77.2195 },
    { name: "Pangong Lake", loc: "Ladakh", img: "https://images.unsplash.com/photo-1626083558364-783a45c61ea0?w=400&q=80", lat: 33.7595, lng: 78.6674 },
    { name: "Alleppey Backwaters", loc: "Kerala", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80", lat: 9.4981, lng: 76.3388 },
  ],
  shopping: [
    { name: "Dilli Haat", loc: "Delhi", img: "https://images.unsplash.com/photo-1533423996375-f914ab1848bc?w=400&q=80", lat: 28.5728, lng: 77.2086 },
    { name: "Colaba Causeway", loc: "Mumbai", img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400&q=80", lat: 18.9151, lng: 72.8258 },
    { name: "Johari Bazaar", loc: "Jaipur", img: "https://images.unsplash.com/photo-1629813286469-657e09710ea4?w=400&q=80", lat: 26.9124, lng: 75.8203 },
  ],
  food: [
    { name: "Chandni Chowk", loc: "Old Delhi", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", lat: 28.6606, lng: 77.2273 },
    { name: "Assi Ghat Cafes", loc: "Varanasi", img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&q=80", lat: 25.2818, lng: 83.0063 },
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
  role: 'user' | 'bot';
  text: string;
}

export interface UserData {
  name: string;
  email: string;
  avatar: string;
}

export const fetchWithRetry = async (url: string, options: RequestInit, retries = 5) => {
  const delays = [1000, 2000, 4000, 8000, 16000];
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
