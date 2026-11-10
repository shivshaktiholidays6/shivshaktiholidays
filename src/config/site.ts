// Central business settings — replace placeholders with real details.
export const site = {
  name: "Shiv Shakti Holidays",
  url: "https://shivshaktiholidays.com",
  locale: "en_IN",
  language: "en-IN",
  tagline: "Explore the World. Experience More.",
  phone: "+91 95680 00777",
  phoneSecondary: "+91 98975 99995",
  whatsapp: "919568000777",
  email: "shivshaktiholidays.rke@gmail.com",
  address: "Opp. Old Kachari Gate, Bus Stand, Roorkee, Uttarakhand 247667",
  location: {
    streetAddress: "Opp. Old Kachari Gate, Bus Stand",
    locality: "Roorkee",
    region: "Uttarakhand",
    postalCode: "247667",
    country: "IN",
  },
  social: {
    instagram: "https://www.instagram.com/shiv.shaktiholidays/",
    facebook: "#",
    youtube: "#",
  },
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export const waMessages = {
  general: "Hello Shiv Shakti Holidays, I would like to know more about your holiday packages.",
  international:
    "Hello, I am interested in planning an international holiday. Please share available packages.",
  domestic: "Hello, I want to explore domestic holiday packages. Please assist me.",
  honeymoon: "Hello, I am planning a honeymoon trip and would like a customized package.",
};

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
