"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, Quote, Star } from "lucide-react";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";
import baliImage from "@/assets/bali.jpg";
import switzerlandImage from "@/assets/switzerland.jpg";
import keralaImage from "@/assets/kerala.jpg";
import kashmirImage from "@/assets/kashmir.jpg";
import chardhamImage from "@/assets/chardham-kedarnath.webp";
import dubaiImage from "@/assets/dubai.jpg";
import thailandImage from "@/assets/thailand.webp";
import rajasthanImage from "@/assets/rajasthan.jpg";
import goaImage from "@/assets/goa.webp";
import vaishnoDeviImage from "@/assets/vaishno-devi.webp";

const reviews = [
  {
    quote:
      "Every detail of our Bali honeymoon was beautifully planned. The private villa, smooth transfers and sunset dinner made the entire journey feel effortless and special.",
    author: "Rohan & Sneha M.",
    city: "Mumbai",
    packageName: "Bali Romantic Escape",
    image: baliImage,
    alt: "Tropical Bali coast and resort landscape",
  },
  {
    quote:
      "Our Switzerland family holiday was a dream. The scenic rail journeys, mountain stays and quick WhatsApp support gave us complete peace of mind throughout the trip.",
    author: "Ananya & Vikram K.",
    city: "New Delhi",
    packageName: "Switzerland Scenic Escape",
    image: switzerlandImage,
    alt: "Scenic Swiss Alps and mountain landscape",
  },
  {
    quote:
      "The Kerala houseboat and Munnar stay were the perfect combination of relaxation and discovery. Every hotel and transfer was thoughtfully selected for us.",
    author: "Dr. Rajesh Patel",
    city: "Ahmedabad",
    packageName: "Kerala Backwaters & Hills",
    image: keralaImage,
    alt: "Peaceful Kerala backwaters surrounded by palms",
  },
  {
    quote:
      "Kashmir was even more beautiful than we imagined. From the houseboat to Gulmarg, the itinerary had the right pace and the local support was excellent.",
    author: "Meera & Arjun S.",
    city: "Pune",
    packageName: "Kashmir Valley Retreat",
    image: kashmirImage,
    alt: "Kashmir valley with lake and mountain scenery",
  },
  {
    quote:
      "Our Char Dham journey was managed with patience and care. Comfortable stays, dependable transport and regular guidance made the yatra easier for our parents.",
    author: "Sunita Sharma",
    city: "Jaipur",
    packageName: "Char Dham Yatra",
    image: chardhamImage,
    alt: "Kedarnath temple in the Himalayan mountains",
  },
  {
    quote:
      "Dubai was perfectly organised for our family—from the city tour to the desert safari. The children loved every day and we never had to worry about logistics.",
    author: "Kunal & Priya A.",
    city: "Lucknow",
    packageName: "Dubai Luxury Experience",
    image: dubaiImage,
    alt: "Dubai skyline during a luxury holiday",
  },
  {
    quote:
      "Thailand had the perfect balance of beaches, sightseeing and free time. The hotels were excellent, and every transfer arrived exactly when promised.",
    author: "Nikhil & Pooja R.",
    city: "Bengaluru",
    packageName: "Thailand Explorer",
    image: thailandImage,
    alt: "Clear blue water and tropical islands in Thailand",
  },
  {
    quote:
      "Our Rajasthan tour felt truly royal. Jaipur, Jodhpur and Udaipur were connected smoothly, and the heritage stays made the journey unforgettable.",
    author: "Amit & Neha G.",
    city: "Kolkata",
    packageName: "Rajasthan Royal Experience",
    image: rajasthanImage,
    alt: "Historic Rajasthan palace and royal architecture",
  },
  {
    quote:
      "The Goa holiday was relaxed and very well paced. Our resort was close to the beach, the sightseeing was enjoyable and the sunset cruise was a highlight.",
    author: "Sahil Kapoor",
    city: "Chandigarh",
    packageName: "Goa Beach Holiday",
    image: goaImage,
    alt: "Sunny Goa beach and tropical coastline",
  },
  {
    quote:
      "The Vaishno Devi pilgrimage was arranged with great attention to our comfort. The transport, hotel and darshan guidance helped our family travel confidently.",
    author: "Kavita Verma",
    city: "Kanpur",
    packageName: "Vaishno Devi Pilgrimage",
    image: vaishnoDeviImage,
    alt: "Vaishno Devi pilgrimage route in the mountains",
  },
] as const;

export function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeReview, setActiveReview] = useState(0);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;

    track.scrollBy({
      left: direction * (firstCard.offsetWidth + 24),
      behavior: "smooth",
    });
  }

  function updateActiveReview() {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;
    const step = firstCard.offsetWidth + 24;
    setActiveReview(Math.min(reviews.length - 1, Math.max(0, Math.round(track.scrollLeft / step))));
  }

  return (
    <section className="overflow-hidden border-y border-border/50 bg-muted/45 py-12 sm:py-16 lg:py-20">
      <div className="container-x grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-center lg:gap-10 xl:grid-cols-[19rem_minmax(0,1fr)] xl:gap-14">
        <div>
          <p className="eyebrow">Guest Stories</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-primary sm:text-4xl">
            What Our Travellers Say
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Real travel moments from holidays planned with care, comfort and personal support.
          </p>

          <div className="mt-6 flex gap-7 border-y border-border/70 py-4 sm:gap-9 lg:mt-8">
            <div>
              <strong className="block text-xl font-bold text-primary sm:text-2xl">500+</strong>
              <span className="text-[0.68rem] font-medium uppercase tracking-wider text-muted-foreground">
                Happy Guests
              </span>
            </div>
            <div>
              <strong className="flex items-center gap-1.5 text-xl font-bold text-primary sm:text-2xl">
                4.9 <Star className="size-4 fill-accent text-accent" />
              </strong>
              <span className="text-[0.68rem] font-medium uppercase tracking-wider text-muted-foreground">
                Guest Rating
              </span>
            </div>
          </div>

          <div className="mt-6 hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Show previous guest review"
              className="grid size-11 place-items-center rounded-full border border-accent/40 bg-card text-primary shadow-xs transition hover:-translate-x-0.5 hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Show next guest review"
              className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground shadow-soft transition hover:translate-x-0.5 hover:bg-accent/90"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="min-w-0">
          <div
            ref={trackRef}
            onScroll={updateActiveReview}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Traveller reviews"
          >
            {reviews.map((review) => (
              <article
                key={`${review.author}-${review.packageName}`}
                className="group min-w-0 shrink-0 basis-[88%] snap-start overflow-hidden rounded-[1.35rem] border border-border/70 bg-card shadow-xs transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft sm:basis-[calc(50%-0.75rem)]"
              >
                <div className="relative h-44 overflow-hidden sm:h-52">
                  <ResponsiveImage
                    src={review.image}
                    alt={review.alt}
                    fill
                    sizes="(max-width: 639px) 88vw, (max-width: 1279px) 44vw, 32vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-1.5 rounded-full bg-primary/75 px-3 py-1.5 text-[0.65rem] font-semibold text-white backdrop-blur-md">
                    <MapPin className="size-3 text-accent" />
                    {review.packageName}
                  </span>
                </div>

                <div className="relative p-5 sm:p-6">
                  <Quote className="absolute right-5 top-4 size-8 text-accent/15" aria-hidden="true" />
                  <div className="flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="size-3.5 fill-accent" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                    “{review.quote}”
                  </p>
                  <div className="mt-5 border-t border-border/60 pt-4">
                    <h3 className="text-base font-semibold text-primary">{review.author}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{review.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5 lg:hidden" aria-hidden="true">
            {reviews.map((review, index) => (
              <span
                key={review.author}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeReview ? "w-6 bg-accent" : "w-1.5 bg-primary/20"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-[0.68rem] text-muted-foreground lg:hidden">
            Swipe to read more stories
          </p>
        </div>
      </div>
    </section>
  );
}
