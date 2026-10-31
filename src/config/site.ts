// Central business settings — replace placeholders with real details.
export const site = {
  name: "Shiv Shakti Holidays",
  tagline: "Explore the World. Experience More.",
  phone: "+91 00000 00000", // TODO: real business phone
  whatsapp: "910000000000", // TODO: real WhatsApp number, digits only with country code
  email: "hello@example.com", // TODO: real email
  address: "Address to be confirmed",
  social: { instagram: "#", facebook: "#", youtube: "#" },
};

export const waMessages = {
  general: "Hello Shiv Shakti Holidays, I would like to know more about your holiday packages.",
  international: "Hello, I am interested in planning an international holiday. Please share available packages.",
  domestic: "Hello, I want to explore domestic holiday packages. Please assist me.",
  honeymoon: "Hello, I am planning a honeymoon trip and would like a customized package.",
};

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
