import hero from "@/assets/hero.jpg";
import bali from "@/assets/bali.jpg";
import switzerland from "@/assets/switzerland.jpg";
import dubai from "@/assets/dubai.jpg";
import kashmir from "@/assets/kashmir.jpg";
import kerala from "@/assets/kerala.jpg";
import rajasthan from "@/assets/rajasthan.jpg";
import europe from "@/assets/europe.jpg";

export const images = { hero, bali, switzerland, dubai, kashmir, kerala, rajasthan, europe };

export type Scope = "international" | "domestic";
export interface Destination {
  slug: string;
  name: string;
  region: string;
  scope: Scope;
  image: string;
  blurb: string;
}

const regionImage: Record<string, string> = {
  Asia: bali,
  "Middle East": dubai,
  Europe: europe,
  Africa: hero,
  Americas: switzerland,
  Oceania: hero,
  "North India": kashmir,
  "South India": kerala,
  "West India": rajasthan,
  "East & Northeast": kashmir,
  Islands: hero,
};
const specific: Record<string, string> = {
  Bali: bali, Maldives: hero, Dubai: dubai, "Abu Dhabi": dubai, Switzerland: switzerland,
  Austria: switzerland, Greece: europe, Kashmir: kashmir, Kerala: kerala, Rajasthan: rajasthan,
  Goa: hero, Mauritius: hero, Seychelles: hero, Fiji: hero, Lakshadweep: hero,
  "Himachal Pradesh": kashmir, Uttarakhand: kashmir, Sikkim: kashmir,
};

const groups: Array<[Scope, string, string[]]> = [
  ["international", "Asia", ["Bali", "Thailand", "Singapore", "Malaysia", "Vietnam", "Cambodia", "Maldives", "Sri Lanka", "Japan", "South Korea", "Indonesia", "Nepal", "Bhutan"]],
  ["international", "Middle East", ["Dubai", "Abu Dhabi", "Qatar", "Oman", "Saudi Arabia", "Turkey"]],
  ["international", "Europe", ["Switzerland", "France", "Italy", "United Kingdom", "Germany", "Austria", "Greece", "Spain", "Netherlands", "Iceland", "Norway", "Finland", "Sweden"]],
  ["international", "Africa", ["Mauritius", "Seychelles", "South Africa", "Egypt", "Kenya", "Tanzania", "Morocco"]],
  ["international", "Americas", ["United States", "Canada", "Mexico", "Brazil"]],
  ["international", "Oceania", ["Australia", "New Zealand", "Fiji"]],
  ["domestic", "North India", ["Kashmir", "Himachal Pradesh", "Uttarakhand", "Delhi", "Rajasthan", "Uttar Pradesh", "Punjab"]],
  ["domestic", "South India", ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh", "Telangana"]],
  ["domestic", "West India", ["Goa", "Gujarat", "Maharashtra"]],
  ["domestic", "East & Northeast", ["Sikkim", "Meghalaya", "Assam", "Arunachal Pradesh", "West Bengal", "Odisha"]],
  ["domestic", "Islands", ["Andaman and Nicobar Islands", "Lakshadweep"]],
];

export const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const destinations: Destination[] = groups.flatMap(([scope, region, names]) =>
  names.map((name) => ({
    slug: slugify(name),
    name,
    region,
    scope,
    image: specific[name] ?? regionImage[region],
    blurb: scope === "international"
      ? `Discover ${name} with a holiday planned around your pace, budget and interests.`
      : `Explore the landscapes, culture and flavours of ${name} on a tailored Indian holiday.`,
  })),
);

export const regions = (scope: Scope) => Array.from(new Set(destinations.filter((d) => d.scope === scope).map((d) => d.region)));

export const categories = [
  "International", "Domestic", "Honeymoon", "Family", "Luxury", "Adventure",
  "Group Tours", "Weekend Getaways", "Spiritual & Pilgrimage", "Customized",
] as const;

export interface Pkg {
  slug: string;
  name: string;
  destination: string; // destination slug
  place: string;
  scope: Scope;
  nights: number;
  price: number; // sample "starting from" INR per person — to be confirmed
  types: string[];
  image: string;
  summary: string;
  highlights: string[];
}

const P = (name: string, dest: string, place: string, scope: Scope, nights: number, price: number, types: string[], image: string, highlights: string[]): Pkg => ({
  slug: slugify(name), name, destination: slugify(dest), place, scope, nights, price, types, image,
  summary: `A thoughtfully planned ${nights + 1}-day journey through ${place}, balancing signature sights with time to unwind.`,
  highlights,
});

export const packages: Pkg[] = [
  P("Bali Romantic Escape", "Bali", "Ubud & Seminyak, Bali", "international", 5, 54999, ["Honeymoon", "Luxury"], bali, ["Private pool villa stay", "Ubud rice terraces", "Sunset at Tanah Lot", "Couple spa experience"]),
  P("Dubai Luxury Experience", "Dubai", "Dubai, UAE", "international", 4, 49999, ["Luxury", "Family"], dubai, ["Burj Khalifa observation deck", "Desert safari with dinner", "Dhow cruise at Marina", "Free day for shopping"]),
  P("Maldives Island Retreat", "Maldives", "North Malé Atoll, Maldives", "international", 4, 89999, ["Honeymoon", "Luxury"], hero, ["Overwater villa option", "Snorkelling excursion", "Sunset cruise", "Speedboat transfers"]),
  P("Thailand Explorer", "Thailand", "Bangkok, Phuket & Krabi", "international", 6, 42999, ["Family", "Adventure"], bali, ["Phi Phi island tour", "Bangkok temples", "Krabi four-island hop", "Night markets"]),
  P("Singapore Family Holiday", "Singapore", "Singapore", "international", 4, 59999, ["Family"], dubai, ["Universal Studios", "Gardens by the Bay", "Sentosa island", "Night safari"]),
  P("Switzerland Scenic Escape", "Switzerland", "Zurich, Lucerne & Interlaken", "international", 6, 149999, ["Luxury", "Honeymoon"], switzerland, ["Mt Titlis excursion", "Lake Lucerne cruise", "Scenic rail journeys", "Interlaken stay"]),
  P("Europe Grand Tour", "France", "Paris, Swiss Alps, Italy", "international", 11, 219999, ["Group Tours", "Luxury"], europe, ["Eiffel Tower visit", "Swiss Alps", "Venice gondola", "Rome & Vatican"]),
  P("Vietnam Discovery", "Vietnam", "Hanoi, Halong Bay & Ho Chi Minh", "international", 6, 64999, ["Adventure"], bali, ["Halong Bay overnight cruise", "Hoi An old town", "Cu Chi tunnels", "Street food walk"]),
  P("Mauritius Beach Holiday", "Mauritius", "Mauritius", "international", 5, 84999, ["Honeymoon", "Family"], hero, ["Beach resort stay", "Île aux Cerfs", "South island tour", "Catamaran cruise"]),
  P("Turkey Cultural Journey", "Turkey", "Istanbul & Cappadocia", "international", 7, 99999, ["Adventure", "Luxury"], europe, ["Hot-air balloon option", "Bosphorus cruise", "Hagia Sophia", "Cave hotel stay"]),
  P("Japan Cherry Blossom Tour", "Japan", "Tokyo, Kyoto & Osaka", "international", 7, 179999, ["Group Tours"], switzerland, ["Seasonal sakura viewing", "Bullet train ride", "Kyoto temples", "Mt Fuji day trip"]),
  P("Australia Adventure", "Australia", "Sydney, Gold Coast & Melbourne", "international", 9, 199999, ["Adventure", "Family"], hero, ["Sydney Opera House", "Great Ocean Road", "Theme parks", "Wildlife encounters"]),
  P("Kashmir Paradise", "Kashmir", "Srinagar, Gulmarg & Pahalgam", "domestic", 5, 24999, ["Honeymoon", "Family"], kashmir, ["Houseboat stay on Dal Lake", "Gulmarg gondola", "Shikara ride", "Betaab Valley"]),
  P("Himachal Mountain Escape", "Himachal Pradesh", "Shimla & Manali", "domestic", 5, 19999, ["Family", "Adventure"], kashmir, ["Solang Valley", "Mall Road walks", "Hadimba temple", "Mountain views"]),
  P("Kerala Backwaters", "Kerala", "Munnar, Thekkady & Alleppey", "domestic", 5, 22999, ["Honeymoon", "Family"], kerala, ["Houseboat cruise", "Munnar tea gardens", "Spice plantation", "Kathakali show"]),
  P("Goa Beach Holiday", "Goa", "North & South Goa", "domestic", 3, 12999, ["Weekend Getaways", "Family"], hero, ["Beach resort stay", "Old Goa churches", "Sunset cruise", "Free beach days"]),
  P("Rajasthan Royal Experience", "Rajasthan", "Jaipur, Jodhpur & Udaipur", "domestic", 6, 29999, ["Luxury", "Family"], rajasthan, ["Amber Fort", "Mehrangarh Fort", "Lake Pichola boat ride", "Heritage hotel option"]),
  P("Uttarakhand Nature Retreat", "Uttarakhand", "Rishikesh, Mussoorie & Nainital", "domestic", 5, 18999, ["Adventure", "Weekend Getaways"], kashmir, ["Ganga aarti", "River rafting option", "Lake Naini", "Hill walks"]),
  P("Andaman Island Holiday", "Andaman and Nicobar Islands", "Port Blair, Havelock & Neil", "domestic", 5, 32999, ["Honeymoon", "Adventure"], hero, ["Radhanagar Beach", "Cellular Jail light show", "Snorkelling", "Ferry island-hopping"]),
  P("Sikkim Himalayan Tour", "Sikkim", "Gangtok, Lachung & Pelling", "domestic", 6, 26999, ["Adventure", "Family"], kashmir, ["Tsomgo Lake", "Yumthang Valley", "Monastery visits", "Kanchenjunga views"]),
  P("Northeast Explorer", "Meghalaya", "Shillong, Cherrapunji & Kaziranga", "domestic", 6, 28999, ["Adventure"], kerala, ["Living root bridges", "Kaziranga safari", "Dawki river", "Waterfalls"]),
  P("Char Dham Yatra", "Uttarakhand", "Yamunotri, Gangotri, Kedarnath, Badrinath", "domestic", 10, 34999, ["Spiritual & Pilgrimage", "Group Tours"], kashmir, ["All four dhams", "Guided darshan support", "Comfortable stays en route", "Assistance throughout"]),
];

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

export function itinerary(p: Pkg) {
  return Array.from({ length: p.nights + 1 }, (_, i) => ({
    day: i + 1,
    title: i === 0 ? `Arrival in ${p.place.split(",")[0]}` : i === p.nights ? "Departure" : p.highlights[(i - 1) % p.highlights.length],
    text: i === 0
      ? "Meet and assist on arrival, transfer to your hotel and spend the evening at leisure."
      : i === p.nights
        ? "Breakfast at the hotel, check out and transfer for your onward journey."
        : "After breakfast, set out for the day's experiences. Return to the hotel for a relaxed evening.",
  }));
}
