import heroAsset from "@/assets/hero.jpg";
import baliAsset from "@/assets/bali.jpg";
import switzerlandAsset from "@/assets/switzerland.jpg";
import dubaiAsset from "@/assets/dubai.jpg";
import kashmirAsset from "@/assets/kashmir.jpg";
import keralaAsset from "@/assets/kerala.jpg";
import rajasthanAsset from "@/assets/rajasthan.jpg";
import europeAsset from "@/assets/europe.jpg";
import charDhamAsset from "@/assets/chardham-kedarnath.webp";
import singaporeAsset from "@/assets/singapore.webp";
import thailandAsset from "@/assets/thailand.webp";
import malaysiaAsset from "@/assets/malaysia.webp";
import vietnamAsset from "@/assets/vietnam.webp";
import phuketAsset from "@/assets/phuket.webp";
import goaAsset from "@/assets/goa.webp";
import shimlaManaliAsset from "@/assets/shimla-manali.webp";
import gujaratAsset from "@/assets/gujarat.webp";
import northeastIndiaAsset from "@/assets/northeast-india.webp";
import vaishnoDeviAsset from "@/assets/vaishno-devi.webp";
import ayodhyaAsset from "@/assets/ayodhya.webp";
import varanasiAsset from "@/assets/varanasi.webp";
import mathuraVrindavanAsset from "@/assets/mathura-vrindavan.webp";
import baliSingaporeAsset from "@/assets/bali-singapore.webp";
import malaysiaSingaporeAsset from "@/assets/malaysia-singapore.webp";

const hero = heroAsset.src;
const bali = baliAsset.src;
const switzerland = switzerlandAsset.src;
const dubai = dubaiAsset.src;
const kashmir = kashmirAsset.src;
const kerala = keralaAsset.src;
const rajasthan = rajasthanAsset.src;
const europe = europeAsset.src;
const charDham = charDhamAsset.src;
const singapore = singaporeAsset.src;
const thailand = thailandAsset.src;
const malaysia = malaysiaAsset.src;
const vietnam = vietnamAsset.src;
const phuket = phuketAsset.src;
const goa = goaAsset.src;
const shimlaManali = shimlaManaliAsset.src;
const gujarat = gujaratAsset.src;
const northeastIndia = northeastIndiaAsset.src;
const vaishnoDevi = vaishnoDeviAsset.src;
const ayodhya = ayodhyaAsset.src;
const varanasi = varanasiAsset.src;
const mathuraVrindavan = mathuraVrindavanAsset.src;
const baliSingapore = baliSingaporeAsset.src;
const malaysiaSingapore = malaysiaSingaporeAsset.src;

export const images = {
  hero,
  bali,
  switzerland,
  dubai,
  kashmir,
  kerala,
  rajasthan,
  europe,
  charDham,
  singapore,
  thailand,
  malaysia,
  vietnam,
  phuket,
  goa,
  shimlaManali,
  gujarat,
  northeastIndia,
  vaishnoDevi,
  ayodhya,
  varanasi,
  mathuraVrindavan,
  baliSingapore,
  malaysiaSingapore,
};

export type Scope = "international" | "domestic";
export interface Destination {
  slug: string;
  name: string;
  region: string;
  scope: Scope;
  image: string;
  imageAlt: string;
  imagePosition: string;
  blurb: string;
  overview?: string | undefined;
  idealDuration?: string | undefined;
  bestFor?: string | undefined;
  planningLabel?: string | undefined;
  featured?: boolean | undefined;
  seoTitle?: string | undefined;
  seoDescription?: string | undefined;
  socialImage?: string | undefined;
  noIndex?: boolean | undefined;
  canonicalUrl?: string | undefined;
  updatedAt?: string | undefined;
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
  Bali: bali,
  Maldives: hero,
  Dubai: dubai,
  Singapore: singapore,
  Thailand: thailand,
  Malaysia: malaysia,
  Vietnam: vietnam,
  "Abu Dhabi": dubai,
  Switzerland: switzerland,
  Austria: switzerland,
  Greece: europe,
  Kashmir: kashmir,
  Goa: goa,
  Gujarat: gujarat,
  Meghalaya: northeastIndia,
  "Uttar Pradesh": varanasi,
  Kerala: kerala,
  Rajasthan: rajasthan,
  Mauritius: hero,
  Seychelles: hero,
  Fiji: hero,
  Lakshadweep: hero,
  "Himachal Pradesh": shimlaManali,
  Uttarakhand: charDham,
  Sikkim: kashmir,
};

const groups: Array<[Scope, string, string[]]> = [
  [
    "international",
    "Asia",
    [
      "Bali",
      "Thailand",
      "Singapore",
      "Malaysia",
      "Vietnam",
      "Cambodia",
      "Maldives",
      "Sri Lanka",
      "Japan",
      "South Korea",
      "Indonesia",
      "Nepal",
      "Bhutan",
    ],
  ],
  [
    "international",
    "Middle East",
    ["Dubai", "Abu Dhabi", "Qatar", "Oman", "Saudi Arabia", "Turkey"],
  ],
  [
    "international",
    "Europe",
    [
      "Switzerland",
      "France",
      "Italy",
      "United Kingdom",
      "Germany",
      "Austria",
      "Greece",
      "Spain",
      "Netherlands",
      "Iceland",
      "Norway",
      "Finland",
      "Sweden",
    ],
  ],
  [
    "international",
    "Africa",
    ["Mauritius", "Seychelles", "South Africa", "Egypt", "Kenya", "Tanzania", "Morocco"],
  ],
  ["international", "Americas", ["United States", "Canada", "Mexico", "Brazil"]],
  ["international", "Oceania", ["Australia", "New Zealand", "Fiji"]],
  [
    "domestic",
    "North India",
    ["Kashmir", "Himachal Pradesh", "Uttarakhand", "Delhi", "Rajasthan", "Uttar Pradesh", "Punjab"],
  ],
  ["domestic", "South India", ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh", "Telangana"]],
  ["domestic", "West India", ["Goa", "Gujarat", "Maharashtra"]],
  [
    "domestic",
    "East & Northeast",
    ["Sikkim", "Meghalaya", "Assam", "Arunachal Pradesh", "West Bengal", "Odisha"],
  ],
  ["domestic", "Islands", ["Andaman and Nicobar Islands", "Lakshadweep"]],
];

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const destinations: Destination[] = groups.flatMap(([scope, region, names]) =>
  names.map((name) => ({
    slug: slugify(name),
    name,
    region,
    scope,
    image: specific[name] ?? regionImage[region] ?? hero,
    imageAlt: `${name} holiday destination`,
    imagePosition: "center",
    blurb:
      scope === "international"
        ? `Discover ${name} with a holiday planned around your pace, budget and interests.`
        : `Explore the landscapes, culture and flavours of ${name} on a tailored Indian holiday.`,
  })),
);

export const regions = (scope: Scope) =>
  Array.from(new Set(destinations.filter((d) => d.scope === scope).map((d) => d.region)));

export const categories = [
  "International",
  "Domestic",
  "Honeymoon",
  "Family",
  "Luxury",
  "Adventure",
  "Group Tours",
  "Weekend Getaways",
  "Spiritual & Pilgrimage",
  "Customized",
] as const;

export const mostBookedPackageSlugs = [
  "char-dham-yatra",
  "dubai-luxury-experience",
  "singapore-family-holiday",
  "thailand-explorer",
  "bali-romantic-escape",
  "malaysia-city-and-highlands",
  "vietnam-discovery",
  "phuket-beach-escape",
  "bali-and-singapore-dual-escape",
  "malaysia-and-singapore-highlights",
  "goa-beach-holiday",
  "himachal-mountain-escape",
  "kashmir-paradise",
  "kerala-backwaters",
  "rajasthan-royal-experience",
  "uttarakhand-nature-retreat",
  "gujarat-heritage-escape",
  "northeast-explorer",
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
  imageAlt: string;
  imagePosition: string;
  summary: string;
  highlights: string[];
  mostBooked: boolean;
  itineraryItems?: Array<{ title: string; text: string }>;
  inclusions?: string[];
  exclusions?: string[];
  featured?: boolean;
  seoTitle?: string | undefined;
  seoDescription?: string | undefined;
  socialImage?: string | undefined;
  noIndex?: boolean | undefined;
  canonicalUrl?: string | undefined;
  updatedAt?: string | undefined;
}

const P = (
  name: string,
  dest: string,
  place: string,
  scope: Scope,
  nights: number,
  price: number,
  types: string[],
  image: string,
  highlights: string[],
  mostBooked = false,
): Pkg => ({
  slug: slugify(name),
  name,
  destination: slugify(dest),
  place,
  scope,
  nights,
  price,
  types,
  image,
  imageAlt: `${name} holiday package`,
  imagePosition: "center",
  summary: `A thoughtfully planned ${nights + 1}-day journey through ${place}, balancing signature sights with time to unwind.`,
  highlights,
  mostBooked: mostBooked || mostBookedPackageSlugs.some((slug) => slug === slugify(name)),
});

export const packages: Pkg[] = [
  P(
    "Bali Romantic Escape",
    "Bali",
    "Ubud & Seminyak, Bali",
    "international",
    4,
    29999,
    ["Honeymoon", "Luxury"],
    bali,
    [
      "Private pool villa stay",
      "Ubud rice terraces",
      "Sunset at Tanah Lot",
      "Couple spa experience",
    ],
  ),
  P(
    "Dubai Luxury Experience",
    "Dubai",
    "Dubai, UAE",
    "international",
    4,
    49999,
    ["Luxury", "Family"],
    dubai,
    [
      "Burj Khalifa observation deck",
      "Desert safari with dinner",
      "Dhow cruise at Marina",
      "Free day for shopping",
    ],
    true,
  ),
  P(
    "Maldives Island Retreat",
    "Maldives",
    "North Malé Atoll, Maldives",
    "international",
    4,
    89999,
    ["Honeymoon", "Luxury"],
    hero,
    ["Overwater villa option", "Snorkelling excursion", "Sunset cruise", "Speedboat transfers"],
  ),
  P(
    "Thailand Explorer",
    "Thailand",
    "Bangkok, Phuket & Krabi",
    "international",
    4,
    24999,
    ["Family", "Adventure"],
    thailand,
    ["Phi Phi island tour", "Bangkok temples", "Krabi four-island hop", "Night markets"],
    true,
  ),
  P(
    "Singapore Family Holiday",
    "Singapore",
    "Singapore",
    "international",
    4,
    34999,
    ["Family"],
    singapore,
    ["Universal Studios", "Gardens by the Bay", "Sentosa island", "Night safari"],
    true,
  ),
  P(
    "Switzerland Scenic Escape",
    "Switzerland",
    "Zurich, Lucerne & Interlaken",
    "international",
    6,
    149999,
    ["Luxury", "Honeymoon"],
    switzerland,
    ["Mt Titlis excursion", "Lake Lucerne cruise", "Scenic rail journeys", "Interlaken stay"],
  ),
  P(
    "Europe Grand Tour",
    "France",
    "Paris, Swiss Alps, Italy",
    "international",
    11,
    219999,
    ["Group Tours", "Luxury"],
    europe,
    ["Eiffel Tower visit", "Swiss Alps", "Venice gondola", "Rome & Vatican"],
  ),
  P(
    "Vietnam Discovery",
    "Vietnam",
    "Hanoi, Halong Bay & Ho Chi Minh",
    "international",
    5,
    32999,
    ["Adventure"],
    vietnam,
    ["Halong Bay overnight cruise", "Hoi An old town", "Cu Chi tunnels", "Street food walk"],
  ),
  P(
    "Mauritius Beach Holiday",
    "Mauritius",
    "Mauritius",
    "international",
    5,
    84999,
    ["Honeymoon", "Family"],
    hero,
    ["Beach resort stay", "Île aux Cerfs", "South island tour", "Catamaran cruise"],
  ),
  P(
    "Turkey Cultural Journey",
    "Turkey",
    "Istanbul & Cappadocia",
    "international",
    7,
    99999,
    ["Adventure", "Luxury"],
    europe,
    ["Hot-air balloon option", "Bosphorus cruise", "Hagia Sophia", "Cave hotel stay"],
  ),
  P(
    "Japan Cherry Blossom Tour",
    "Japan",
    "Tokyo, Kyoto & Osaka",
    "international",
    7,
    179999,
    ["Group Tours"],
    switzerland,
    ["Seasonal sakura viewing", "Bullet train ride", "Kyoto temples", "Mt Fuji day trip"],
  ),
  P(
    "Australia Adventure",
    "Australia",
    "Sydney, Gold Coast & Melbourne",
    "international",
    9,
    199999,
    ["Adventure", "Family"],
    hero,
    ["Sydney Opera House", "Great Ocean Road", "Theme parks", "Wildlife encounters"],
  ),
  P(
    "Kashmir Paradise",
    "Kashmir",
    "Srinagar, Gulmarg & Pahalgam",
    "domestic",
    4,
    13999,
    ["Honeymoon", "Family"],
    kashmir,
    ["Houseboat stay on Dal Lake", "Gulmarg gondola", "Shikara ride", "Betaab Valley"],
  ),
  P(
    "Himachal Mountain Escape",
    "Himachal Pradesh",
    "Shimla & Manali",
    "domestic",
    4,
    9999,
    ["Family", "Adventure"],
    shimlaManali,
    ["Solang Valley", "Mall Road walks", "Hadimba temple", "Mountain views"],
  ),
  P(
    "Kerala Backwaters",
    "Kerala",
    "Munnar, Thekkady & Alleppey",
    "domestic",
    4,
    13999,
    ["Honeymoon", "Family"],
    kerala,
    ["Houseboat cruise", "Munnar tea gardens", "Spice plantation", "Kathakali show"],
  ),
  P(
    "Goa Beach Holiday",
    "Goa",
    "North & South Goa",
    "domestic",
    3,
    8999,
    ["Weekend Getaways", "Family"],
    goa,
    ["Beach resort stay", "Old Goa churches", "Sunset cruise", "Free beach days"],
  ),
  P(
    "Rajasthan Royal Experience",
    "Rajasthan",
    "Jaipur, Jodhpur & Udaipur",
    "domestic",
    5,
    14999,
    ["Luxury", "Family"],
    rajasthan,
    ["Amber Fort", "Mehrangarh Fort", "Lake Pichola boat ride", "Heritage hotel option"],
  ),
  P(
    "Uttarakhand Nature Retreat",
    "Uttarakhand",
    "Rishikesh, Mussoorie & Nainital",
    "domestic",
    4,
    10999,
    ["Adventure", "Weekend Getaways"],
    charDham,
    ["Ganga aarti", "River rafting option", "Lake Naini", "Hill walks"],
  ),
  P(
    "Andaman Island Holiday",
    "Andaman and Nicobar Islands",
    "Port Blair, Havelock & Neil",
    "domestic",
    5,
    32999,
    ["Honeymoon", "Adventure"],
    hero,
    ["Radhanagar Beach", "Cellular Jail light show", "Snorkelling", "Ferry island-hopping"],
  ),
  P(
    "Sikkim Himalayan Tour",
    "Sikkim",
    "Gangtok, Lachung & Pelling",
    "domestic",
    6,
    26999,
    ["Adventure", "Family"],
    kashmir,
    ["Tsomgo Lake", "Yumthang Valley", "Monastery visits", "Kanchenjunga views"],
  ),
  P(
    "Northeast Explorer",
    "Meghalaya",
    "Shillong, Cherrapunji & Kaziranga",
    "domestic",
    5,
    16999,
    ["Adventure"],
    northeastIndia,
    ["Living root bridges", "Kaziranga safari", "Dawki river", "Waterfalls"],
  ),
  P(
    "Malaysia City & Highlands",
    "Malaysia",
    "Kuala Lumpur & Genting Highlands",
    "international",
    4,
    27999,
    ["Family", "Luxury"],
    malaysia,
    ["Petronas Twin Towers", "Genting Highlands", "Batu Caves", "Kuala Lumpur city tour"],
  ),
  P(
    "Phuket Beach Escape",
    "Thailand",
    "Phuket, Thailand",
    "international",
    4,
    26999,
    ["Honeymoon", "Family"],
    phuket,
    ["Phuket beach stay", "Phi Phi island tour", "Old Phuket Town", "Sunset viewpoint"],
  ),
  P(
    "Bali & Singapore Dual Escape",
    "Bali",
    "Bali & Singapore",
    "international",
    5,
    44999,
    ["Honeymoon", "Family"],
    baliSingapore,
    ["Bali temple tour", "Ubud landscapes", "Singapore city highlights", "Sentosa island"],
  ),
  P(
    "Malaysia & Singapore Highlights",
    "Malaysia",
    "Kuala Lumpur & Singapore",
    "international",
    5,
    39999,
    ["Family", "Group Tours"],
    malaysiaSingapore,
    ["Petronas Twin Towers", "Genting Highlands", "Marina Bay", "Gardens by the Bay"],
  ),
  P(
    "Gujarat Heritage Escape",
    "Gujarat",
    "Ahmedabad, Dwarka & Somnath",
    "domestic",
    3,
    7999,
    ["Family", "Spiritual & Pilgrimage"],
    gujarat,
    ["Somnath Temple", "Dwarkadhish Temple", "Ahmedabad heritage", "Comfortable road transfers"],
  ),
  P(
    "Char Dham Yatra",
    "Uttarakhand",
    "Yamunotri, Gangotri, Kedarnath, Badrinath",
    "domestic",
    10,
    34999,
    ["Spiritual & Pilgrimage", "Group Tours"],
    charDham,
    [
      "All four dhams",
      "Guided darshan support",
      "Comfortable stays en route",
      "Assistance throughout",
    ],
    true,
  ),
  P(
    "Do Dham Yatra",
    "Uttarakhand",
    "Kedarnath & Badrinath, Uttarakhand",
    "domestic",
    6,
    24999,
    ["Spiritual & Pilgrimage", "Group Tours"],
    charDham,
    [
      "Kedarnath temple darshan",
      "Badrinath temple darshan",
      "Scenic Himalayan road journey",
      "Trip coordinator assistance",
    ],
  ),
  P(
    "Kedarnath Yatra",
    "Uttarakhand",
    "Haridwar, Guptkashi & Kedarnath",
    "domestic",
    4,
    16999,
    ["Spiritual & Pilgrimage", "Adventure"],
    charDham,
    [
      "Kedarnath temple darshan",
      "Haridwar Ganga aarti",
      "Himalayan trek support",
      "Comfortable road transfers",
    ],
  ),
  P(
    "Vaishno Devi Pilgrimage",
    "Kashmir",
    "Jammu & Katra",
    "domestic",
    3,
    12999,
    ["Spiritual & Pilgrimage", "Family"],
    vaishnoDevi,
    [
      "Mata Vaishno Devi darshan",
      "Katra hotel stay",
      "Jammu sightseeing option",
      "Station and airport transfers",
    ],
  ),
  P(
    "Ayodhya Varanasi Spiritual Journey",
    "Uttar Pradesh",
    "Ayodhya, Prayagraj & Varanasi",
    "domestic",
    5,
    21999,
    ["Spiritual & Pilgrimage", "Family"],
    ayodhya,
    [
      "Shri Ram Mandir visit",
      "Sangam in Prayagraj",
      "Kashi Vishwanath darshan",
      "Evening Ganga aarti",
    ],
  ),
  P(
    "Mathura Vrindavan Pilgrimage",
    "Uttar Pradesh",
    "Mathura, Vrindavan & Govardhan",
    "domestic",
    3,
    11999,
    ["Spiritual & Pilgrimage", "Weekend Getaways"],
    mathuraVrindavan,
    [
      "Krishna Janmabhoomi",
      "Banke Bihari temple",
      "Prem Mandir evening visit",
      "Govardhan and Barsana excursion",
    ],
  ),
];

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

const pilgrimageItineraries: Record<string, Array<{ title: string; text: string }>> = {
  "char-dham-yatra": [
    {
      title: "Arrival in Haridwar",
      text: "Meet your trip coordinator, check in and attend the evening Ganga aarti.",
    },
    {
      title: "Haridwar to Barkot",
      text: "Drive through the Himalayan foothills and settle into your hotel in Barkot.",
    },
    {
      title: "Yamunotri Darshan",
      text: "Travel to Janki Chatti and complete the Yamunotri visit with trek assistance.",
    },
    {
      title: "Barkot to Uttarkashi",
      text: "Continue to Uttarkashi with time for Kashi Vishwanath Temple.",
    },
    {
      title: "Gangotri Darshan",
      text: "Visit Gangotri Temple and return to Uttarkashi after darshan.",
    },
    {
      title: "Uttarkashi to Guptkashi",
      text: "A scenic full-day drive leads to the Kedarnath base region.",
    },
    {
      title: "Kedarnath Journey",
      text: "Proceed to Gaurikund and continue towards Kedarnath by trek or pre-booked transport option.",
    },
    {
      title: "Kedarnath Darshan",
      text: "Attend temple darshan before descending and returning to Guptkashi.",
    },
    {
      title: "Guptkashi to Badrinath",
      text: "Drive via the mountain route and check in near Badrinath.",
    },
    {
      title: "Badrinath Darshan",
      text: "Visit Badrinath Temple and nearby Mana village, subject to local conditions.",
    },
    {
      title: "Return to Haridwar",
      text: "Check out after breakfast and travel back with scheduled comfort stops.",
    },
  ],
  "do-dham-yatra": [
    {
      title: "Haridwar to Guptkashi",
      text: "Meet your coordinator and drive into the Garhwal Himalayas.",
    },
    {
      title: "Journey to Kedarnath",
      text: "Continue from Gaurikund with trek and local assistance.",
    },
    { title: "Kedarnath Darshan", text: "Attend darshan and descend towards Guptkashi." },
    {
      title: "Guptkashi to Badrinath",
      text: "Travel through mountain valleys to the Badrinath region.",
    },
    {
      title: "Badrinath Darshan",
      text: "Visit the temple and explore Mana village if time and conditions allow.",
    },
    {
      title: "Badrinath to Rudraprayag",
      text: "Begin the return journey with an overnight stop en route.",
    },
    { title: "Return to Haridwar", text: "Drive back to Haridwar after breakfast." },
  ],
  "kedarnath-yatra": [
    {
      title: "Haridwar to Guptkashi",
      text: "Meet and assist, followed by a scenic road journey to Guptkashi.",
    },
    {
      title: "Guptkashi to Kedarnath",
      text: "Reach Gaurikund and begin the supported trek towards Kedarnath.",
    },
    {
      title: "Kedarnath Darshan",
      text: "Attend temple darshan and spend time in the sacred valley.",
    },
    { title: "Descend to Guptkashi", text: "Return from Kedarnath and transfer to your hotel." },
    { title: "Return to Haridwar", text: "Check out after breakfast and drive back to Haridwar." },
  ],
  "vaishno-devi-pilgrimage": [
    {
      title: "Arrival in Jammu and Katra",
      text: "Receive assistance on arrival and transfer to your Katra hotel.",
    },
    {
      title: "Vaishno Devi Darshan",
      text: "Proceed to Banganga and complete the yatra with flexible return timing.",
    },
    {
      title: "Katra Leisure Day",
      text: "Rest after the yatra or choose an optional local excursion.",
    },
    {
      title: "Departure from Jammu",
      text: "Transfer to Jammu railway station or airport for your onward journey.",
    },
  ],
  "ayodhya-varanasi-spiritual-journey": [
    {
      title: "Arrival in Ayodhya",
      text: "Check in and begin with an evening visit to the Saryu riverfront.",
    },
    {
      title: "Ayodhya Temple Circuit",
      text: "Visit Shri Ram Mandir and other important sites around the holy city.",
    },
    {
      title: "Ayodhya to Prayagraj",
      text: "Travel to Prayagraj for Sangam and key spiritual landmarks.",
    },
    {
      title: "Prayagraj to Varanasi",
      text: "Continue to Varanasi and attend the evening Ganga aarti.",
    },
    {
      title: "Kashi Darshan",
      text: "Visit Kashi Vishwanath Temple and explore the old-city spiritual circuit.",
    },
    { title: "Departure from Varanasi", text: "Check out and transfer for your onward journey." },
  ],
  "mathura-vrindavan-pilgrimage": [
    {
      title: "Arrival in Mathura",
      text: "Check in and visit Krishna Janmabhoomi and nearby temples.",
    },
    { title: "Vrindavan Darshan", text: "Visit Banke Bihari Temple, ISKCON and Prem Mandir." },
    { title: "Govardhan and Barsana", text: "Take a guided excursion to Govardhan and Barsana." },
    { title: "Departure", text: "Check out after breakfast and transfer for your onward journey." },
  ],
};

export function itinerary(p: Pkg) {
  if (p.itineraryItems?.length) {
    return p.itineraryItems.map((item, index) => ({ day: index + 1, ...item }));
  }
  const tailored = pilgrimageItineraries[p.slug];
  if (tailored) return tailored.map((item, index) => ({ day: index + 1, ...item }));
  return Array.from({ length: p.nights + 1 }, (_, i) => ({
    day: i + 1,
    title:
      i === 0
        ? `Arrival in ${p.place.split(",")[0]}`
        : i === p.nights
          ? "Departure"
          : p.highlights.length
            ? p.highlights[(i - 1) % p.highlights.length]
            : "Explore local highlights",
    text:
      i === 0
        ? "Meet and assist on arrival, transfer to your hotel and spend the evening at leisure."
        : i === p.nights
          ? "Breakfast at the hotel, check out and transfer for your onward journey."
          : "After breakfast, set out for the day's experiences. Return to the hotel for a relaxed evening.",
  }));
}
