// Mock event data for MVP demonstration
// In production, this would come from a database or the blockchain

export interface Event {
  id: string;
  name: string;
  description: string;
  date: number; // Unix timestamp
  venue: string;
  image: string;
  ticketPrice: string; // In ETH
  maxSupply: number;
  ticketsSold: number;
  contractAddress: string;
  category: string;
  organizer: string;
}

// Sample events for demonstration
export const MOCK_EVENTS: Event[] = [
  {
    id: "tech-conf-2026",
    name: "Tech Conference 2026",
    description: "Join the most innovative minds in technology for a day of cutting-edge presentations, workshops, and networking opportunities. Explore the future of AI, Web3, and sustainable tech.",
    date: Math.floor(new Date("2026-06-15T09:00:00").getTime() / 1000),
    venue: "Convention Center, San Francisco",
    image: "/images/tech-conf.jpg",
    ticketPrice: "0.0001",
    maxSupply: 1000,
    ticketsSold: 342,
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
    category: "Technology",
    organizer: "TechEvents Inc.",
  },
  {
    id: "web3-summit",
    name: "Web3 Summit",
    description: "The premier gathering for blockchain enthusiasts, developers, and entrepreneurs. Dive deep into DeFi, NFTs, DAOs, and the decentralized future.",
    date: Math.floor(new Date("2026-07-20T10:00:00").getTime() / 1000),
    venue: "Crypto Arena, Miami",
    image: "/images/web3-summit.jpg",
    ticketPrice: "0.0002",
    maxSupply: 500,
    ticketsSold: 189,
    contractAddress: "",
    category: "Blockchain",
    organizer: "Web3 Foundation",
  },
  {
    id: "music-fest",
    name: "Decentralized Music Festival",
    description: "Experience live performances from top artists while owning a piece of history. All tickets are NFTs that unlock exclusive digital content and future perks.",
    date: Math.floor(new Date("2026-08-05T16:00:00").getTime() / 1000),
    venue: "Central Park, New York",
    image: "/images/music-fest.jpg",
    ticketPrice: "0.0005",
    maxSupply: 2000,
    ticketsSold: 1523,
    contractAddress: "",
    category: "Music",
    organizer: "NFT Music Collective",
  },
  {
    id: "art-gallery",
    name: "NFT Art Gallery Opening",
    description: "An exclusive gallery opening featuring groundbreaking digital art from renowned NFT artists. Network with collectors and creators in an intimate setting.",
    date: Math.floor(new Date("2026-05-10T18:00:00").getTime() / 1000),
    venue: "Modern Art Museum, Los Angeles",
    image: "/images/art-gallery.jpg",
    ticketPrice: "0.0003",
    maxSupply: 150,
    ticketsSold: 98,
    contractAddress: "",
    category: "Art",
    organizer: "Digital Art Guild",
  },
];

// Get event by ID
export function getEventById(id: string): Event | undefined {
  return MOCK_EVENTS.find((event) => event.id === id);
}

// Get events by category
export function getEventsByCategory(category: string): Event[] {
  return MOCK_EVENTS.filter((event) => event.category === category);
}

// Get upcoming events
export function getUpcomingEvents(): Event[] {
  const now = Math.floor(Date.now() / 1000);
  return MOCK_EVENTS.filter((event) => event.date > now).sort(
    (a, b) => a.date - b.date
  );
}

// Get featured event (first upcoming event with most tickets sold)
export function getFeaturedEvent(): Event | undefined {
  const upcoming = getUpcomingEvents();
  return upcoming.sort((a, b) => b.ticketsSold - a.ticketsSold)[0];
}

// Categories
export const EVENT_CATEGORIES = [
  "All",
  "Technology",
  "Blockchain",
  "Music",
  "Art",
  "Sports",
  "Gaming",
];

// Format date from unix timestamp
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
