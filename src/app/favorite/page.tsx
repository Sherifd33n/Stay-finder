"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { listings } from "@/data/listing";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import { IoIosArrowForward, IoIosBed } from "react-icons/io";
import { FaBath } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { GoArrowRight } from "react-icons/go";

const FavoritesPage = () => {
  // favorites are stored as strings
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  // Listen for changes from other components
  useEffect(() => {
    const handleFavoritesChange = () => {
      const stored = localStorage.getItem("favorites");
      setFavorites(stored ? JSON.parse(stored) : []);
    };

    window.addEventListener("favoritesChanged", handleFavoritesChange);
    return () =>
      window.removeEventListener("favoritesChanged", handleFavoritesChange);
  }, []);

  const removeFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((fav) => fav !== id); // no conversion needed
      localStorage.setItem("favorites", JSON.stringify(updated));
      window.dispatchEvent(new Event("favoritesChanged"));
      return updated;
    });
  };

  // filter favorite listings
  const favoriteListings = listings.filter((item) =>
    favorites.includes(item.id.toString())
  );

  return (
    <Container className="mt-6">
      <div className="flex items-center gap-4 text-sm pt-6">
        <Link href="/" className="text-[#667a93] hover:text-gray-800">
          Home
        </Link>
        <IoIosArrowForward />
        <p>favorites</p>
      </div>
      <h1 className="text-4xl font-semibold my-6">Your Favorites</h1>

      {favoriteListings.length === 0 ? (
        <p className="text-gray-500">No favorites yet ❤️</p>
      ) : (
        <div className="grid gap-6">
          {favoriteListings.map((item) => (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden border hover:shadow-lg transition relative">
              <div className="flex">
                <div className="relative h-76 w-1/2">
                  {/* REMOVE FAVORITE */}
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow hover:scale-110 transition">
                    <AiFillHeart className="text-red-500" size={20} />
                  </button>
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-3 w-1/2">
                  <div className="flex gap-5 justify-between items-center">
                    <div>
                      <h3 className="font-semibold font-serif text-lg">
                        {item.title}
                      </h3>
                      <p className="text-[12px] text-gray-500 my-1">
                        {item.location}
                      </p>
                    </div>
                    <p className="text-2xl font-serif font-semibold text-[#089589]">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>

                  {item.details && typeof item.details[0] === "object" && (
                    <div className="flex items-center gap-3 mt-4 text-sm text-gray-600">
                      <div>
                        <p className="text-[11px] font-bold">BEDROOMS</p>
                        <p className="flex gap-1 items-center text-[13px] font-semibold">
                          <IoIosBed size={14} className="text-[#089589]" />
                          {item.details[0].bedrooms} Beds
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-bold">BATHROOMS</p>
                        <p className="flex gap-1 items-center text-[13px] font-semibold">
                          <FaBath size={14} className="text-[#089589]" />
                          {item.details[0].bathrooms} Baths
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-bold">TOTAL AREA</p>
                        <p className="flex gap-1 items-center text-[13px] font-semibold">
                          <TfiRulerAlt2 size={14} className="text-[#089589]" />
                          {item.acres
                            ? `${item.acres}`
                            : `${item.sqareFeet}`}{" "}
                          {item.acres ? "Acres" : "Sqft"}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="font-serif italic bg-[#f9f8f5] text-gray-500 text-sm px-3 py-4 rounded-md mt-5 border-l-3 border-[#089589]">
                    {item.about}
                  </div>

                  <div className="flex items-end justify-end">
                    <Link
                      href={`/listing/${item.id}`}
                      className="bg-[#089589] px-4 py-3 text-white inline-flex items-center gap-2 mt-4 rounded-md hover:scale-105 transition-all duration-200">
                      View Details
                      <GoArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default FavoritesPage;
