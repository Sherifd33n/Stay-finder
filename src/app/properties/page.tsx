"use client";

import Container from "@/components/Container";
import React, { useMemo, useState } from "react";
import { getFavorites, toggleFavorite } from "../../../lib/favorite";
import { listings } from "@/data/listing";
import "swiper/css";
import "swiper/css/navigation";
import StateListingsSlider from "@/components/ListingSlider";
type Category = "all" | "house" | "apartment" | "hotel" | "land" | "warehouse";
type Mode = "all" | "rent" | "sale";

const Properties = () => {
  const [favorites, setFavorites] = useState<string[]>(getFavorites());
  const [locationSearch, setLocationSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category>("all");
  const [modeFilter, setModeFilter] = useState<Mode>("all");

  React.useEffect(() => {
    const syncFavorites = () => setFavorites(getFavorites());
    window.addEventListener("favoritesChanged", syncFavorites);
    return () => window.removeEventListener("favoritesChanged", syncFavorites);
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const locationMatch = item.location
        .toLowerCase()
        .includes(locationSearch.toLowerCase());
      const categoryMatch =
        categoryFilter === "all" || item.category === categoryFilter;
      const modeMatch = modeFilter === "all" || item.mode === modeFilter;

      return locationMatch && categoryMatch && modeMatch;
    });
  }, [locationSearch, categoryFilter, modeFilter]);


  const groupedByState = useMemo(() => {
    const groups: Record<string, typeof filteredListings> = {};

    filteredListings.forEach((item) => {
      if (!groups[item.state]) {
        groups[item.state] = [];
      }
      groups[item.state].push(item);
    });

    return groups;
  }, [filteredListings]);

  return (
    <div>
      <div
        className="relative h-100 w-full flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url(/images/house-1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Text content */}
        <div className="relative z-10 text-white px-4">
          <h1 className="text-4xl font-semibold">Find Your Next Masterpiece</h1>
          <p className="mt-3 text-gray-100">
            Curated listings across the most prestigious locations
          </p>
        </div>{" "}
        <div className="flex flex-col md:flex-row gap-4 mb-6 relative bg-[#ecf0f1]/40 backdrop-blur-lg w-[80vw] p-4 rounded-md mt-6 justify-between">
          <input
            type="text"
            placeholder="Search by city, neighborhood or state..."
            className="flex-1 px-4 py-2 rounded-md bg-[#e5e0db] outline-none"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
          />

          <div className="px-7 py-2 border rounded-md bg-[#e5e0db] w-75">
            {" "}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as Category)}
              className="w-full outline-none text-gray-800">
              <option value="all">All Categories</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="hotel">Hotel</option>
              <option value="land">Land</option>
              <option value="warehouse">Warehouse</option>
            </select>
          </div>

          <div className="px-7 py-2 border rounded-md bg-[#e5e0db] w-75">
            {" "}
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value as Mode)}
              className="w-full outline-none text-gray-800">
              <option value="all">All Modes</option>
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
          </div>
        </div>
      </div>

      <Container className="mt-8">
        {Object.entries(groupedByState).map(([state, listings]) => (
          <StateListingsSlider
            key={state}
            state={state}
            listings={listings}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setFavorites={setFavorites}
            getFavorites={getFavorites}
          />
        ))}

        {filteredListings.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No properties match your search/filter.
          </p>
        )}
      </Container>
    </div>
  );
};

export default Properties;
