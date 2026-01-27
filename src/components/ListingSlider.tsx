"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Listing } from "../../.next/types/listing";

type Props = {
  state: string;
  listings: Listing[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  setFavorites: (v: string[]) => void;
  getFavorites: () => string[];
};

export default function StateListingsSlider({ state, listings }: Props) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link href={`/state/${encodeURIComponent(state)}`}>
          <h2 className="text-4xl font-serif font-medium hover:underline cursor-pointer">
            {state}
          </h2>
        </Link>

        <div className="flex gap-2">
          <button
            ref={prevRef}
            className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-100 transition">
            ←
          </button>
          <button
            ref={nextRef}
            className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-100 transition">
            →
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        onBeforeInit={(swiper: SwiperType) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}>
        {listings.map((item, index) => (
          <SwiperSlide key={`${item.id}-${location}-${index}`}>
            <div className="relative block overflow-hidden transition">
              <div>
                {" "}
                <p className="text-white bg-[#498fc0]/40 text-sm border-2 px-3 py-1 rounded-full border-[#81b0d2] absolute top-2 right-2 z-10">
                  ₦{item.price.toLocaleString()}
                </p>
              </div>

              <div className="relative h-80 w-full">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="py-3">
                <h3 className="font-serif font-medium text-lg line-clamp-1">
                  {item.title}
                </h3>
              </div>

              <Link href={`/listing/${item.id}`}>
                <button className="text-center w-full bg-[#d4d2d3] py-1.5 font-medium border border-gray-400 rounded-lg hover:text-[#d4d2d3] hover:bg-white transition duration-200 cursor-pointer">
                  View Details
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
