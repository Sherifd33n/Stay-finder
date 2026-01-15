"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import Container from "@/components/Container";
import { listings } from "@/data/listing";

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();

  const category = (params.category as string).toLowerCase();
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

 
  const listingsByLocation = useMemo(() => {
    const filtered = listings.filter(
      (item) => item.category.toLowerCase() === category
    );

    return filtered.reduce<Record<string, typeof listings>>((acc, item) => {
      const location = item.location.toLowerCase();

      if (!acc[location]) {
        acc[location] = [];
      }

      acc[location].push(item);
      return acc;
    }, {});
  }, [category]);

  const locations = Object.keys(listingsByLocation);

  return (
    <Container className="mx-auto flex flex-col gap-8">

      <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 w-max flex items-center gap-2">
        <IoMdArrowBack /> Back
      </button>

     
      {locations.length === 0 && (
        <p className="text-gray-500">
          No {categoryTitle.toLowerCase()}s found.
        </p>
      )}

      {/* Grouped Listings */}
      {locations.map((location) => (
        <div key={location} className="flex flex-col gap-4">
          {/* Location heading */}
          <p className="text-2xl font-semibold capitalize">
            {categoryTitle}s in {location}
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listingsByLocation[location].map((item) => (
              <div
                key={item.id}
                className="rounded-lg overflow-hidden border hover:shadow-lg transition relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow">
                  {favorites.includes(item.id) ? (
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
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>

                <p
                  className={`absolute top-1.5 left-1.5 px-2 py-1 rounded-md text-[12px] uppercase ${
                    item.mode === "for rent"
                      ? "bg-white text-black"
                      : "bg-[#d94d22] text-white"
                  }`}>
                  {item.mode}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
}
