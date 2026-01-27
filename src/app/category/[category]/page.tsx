"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Container from "@/components/Container";
import { listings } from "@/data/listing";
import { IoIosArrowForward } from "react-icons/io";

// import StateListingsSlider from "@/components/ListingSlider";
import { toggleFavorite, getFavorites } from "./../../../../lib/favorite";
import CategoryPageSlider from "@/components/CategorySlider";

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();

  const category = (params.category as string).toLowerCase();
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  const [favorites, setFavorites] = useState<string[]>([]);

  const listingsByLocation = useMemo(() => {
    const filtered = listings.filter(
      (item) => item.category.toLowerCase() === category
    );

    return filtered.reduce<Record<string, typeof listings>>((acc, item) => {
      const city =
        item.location.split(",").pop()?.trim().toLowerCase() || "unknown";

      if (!acc[city]) {
        acc[city] = [];
      }

      acc[city].push(item);
      return acc;
    }, {});
  }, [category]);

  const locations = Object.keys(listingsByLocation);

  useEffect(() => {
    const syncFavorites = () => {
      setFavorites(getFavorites());
    };

    syncFavorites();
    window.addEventListener("favoritesChanged", syncFavorites);
    return () => window.removeEventListener("favoritesChanged", syncFavorites);
  }, []);

  return (
    <Container className="mx-auto flex flex-col gap-8">
      <div className="flex items-center gap-4 text-sm pt-6">
        <p
          onClick={() => router.back()}
          className="cursor-pointer text-[#667a93] hover:text-gray-800">
          Back
        </p>
        <IoIosArrowForward />
        <p className="capitalize">{category}</p>
      </div>

      {locations.length === 0 && (
        <p className="text-gray-500">
          No {categoryTitle.toLowerCase()}s found.
        </p>
      )}

      {/* Grouped Listings */}
      {locations.map((location) => (
        <div key={location} className="flex flex-col gap-1">
          {/* Location heading */}
          <p className="text-2xl font-semibold capitalize">
            {categoryTitle}s in {location}
          </p>

          {/* SLIDER */}
          <CategoryPageSlider
            state={""}
            listings={listingsByLocation[location]}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setFavorites={setFavorites}
            getFavorites={getFavorites}
          />
        </div>
      ))}
    </Container>
  );
}
