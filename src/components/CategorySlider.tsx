"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Listing } from "../../.next/types/listing";

type Props = {
  state: string;
  listings: Listing[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  setFavorites: (v: string[]) => void;
  getFavorites: () => string[];
};

export default function CategoryPageSlider({
  state,
  listings,
  favorites,
  toggleFavorite,
}: Props) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-4xl font-serif font-medium">{state}</h2>

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
        {listings.map((item) => (
          <SwiperSlide key={item.id} className="rounded-lg border-gray-600 border">
           <Link
            href={`/listings/${item.id}`}
            key={item.id}
            className="overflow-hidden hover:shadow-lg transition relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault()
                toggleFavorite(item.id.toString());
              }}
              className="absolute top-2 right-2 z-20 bg-white rounded-full p-1.5 shadow hover:scale-110 transition">
              {favorites.includes(item.id.toString()) ? (
                <AiFillHeart size={20} className="text-red-500" />
              ) : (
                <AiOutlineHeart size={20} className="text-gray-600" />
              )}
            </button>

            <div className="relative h-36 w-full">
              <Image
                src={item.images[0]}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-3">
              <h3 className="font-semibold text-[#101418]">{item.title}</h3>
              <p className="text-sm text-gray-500">
                ₦{item.price.toLocaleString()}
              </p>
            </div>

            <p
              className={`absolute top-1.5 left-1.5 px-2 py-1 rounded-md text-[12px] uppercase ${
                item.mode === "rent"
                  ? "bg-white text-black"
                  : "bg-[#d94d22] text-white"
              }`}>
              {item.mode}
            </p>
          </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
