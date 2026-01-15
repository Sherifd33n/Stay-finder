"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BsFilterRight } from "react-icons/bs";
import { MdApartment, MdLandscape, MdWarehouse } from "react-icons/md";
import { PiHouseFill } from "react-icons/pi";
import { RiHotelBedFill } from "react-icons/ri";
import { TbGridDots } from "react-icons/tb";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Container from "../Container";
import { listings } from "@/data/listing";
import HomeSearch, { Filters } from "./HomeSearch";
import Link from "next/link";
import {
  toggleFavorite,
  // isFavorite,
  getFavorites,
} from "../../../lib/favorite";

type Category = "all" | "house" | "hotel" | "warehouse" | "land" | "apartment";

const All = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  
  useEffect(() => {
    const syncFavorites = () => {
      setFavorites(getFavorites());
    };

    syncFavorites();
    window.addEventListener("favoritesChanged", syncFavorites);
    return () => window.removeEventListener("favoritesChanged", syncFavorites);
  }, []);

  // Tabs
  const [active, setActive] = useState<Category>("all");

  type CategoryOption = {
    id: Category;
    label: string;
    icon: React.ReactNode;
  };

  const options: CategoryOption[] = [
    { id: "all", label: "All", icon: <TbGridDots size={30} /> },
    { id: "house", label: "House", icon: <PiHouseFill size={30} /> },
    { id: "hotel", label: "Hotel", icon: <RiHotelBedFill size={30} /> },
    { id: "warehouse", label: "Warehouse", icon: <MdWarehouse size={30} /> },
    { id: "land", label: "Land", icon: <MdLandscape size={30} /> },
    { id: "apartment", label: "Apartment", icon: <MdApartment size={30} /> },
  ];

  // Filters
  const [searchFilters, setSearchFilters] = useState<Filters>({
    location: "",
    category: "all",
    mode: "",
  });

  const [appliedFilters, setAppliedFilters] = useState<Filters>(searchFilters);

  const handleSearch = () => {
    setAppliedFilters(searchFilters);
    setActive(searchFilters.category as Category);
  };

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const categoryMatch =
        appliedFilters.category === "all" ||
        item.category === appliedFilters.category;

      const modeMatch =
        !appliedFilters.mode ||
        item.mode.toLowerCase() === appliedFilters.mode.toLowerCase();

      const locationMatch =
        !appliedFilters.location ||
        item.location
          ?.toLowerCase()
          .includes(appliedFilters.location.toLowerCase());

      return categoryMatch && modeMatch && locationMatch;
    });
  }, [appliedFilters]);

  return (
    <Container className="mx-auto flex flex-col gap-6">
      {/* Hero */}
      <div className="text-center py-7">
        <p className="text-5xl font-semibold text-[#0f172a]">
          Find your{" "}
          <span className="text-[#089589] underline">perfect place.</span>
        </p>
        <p className="text-[#8490a2] text-[16px] mt-1">
          Houses, Apartments, Lands and Commercial Places for Rent or Sale.
        </p>
      </div>

      {/* Search */}
      <HomeSearch
        filters={searchFilters}
        setFilters={setSearchFilters}
        onSearch={handleSearch}
      />

      {/* Tabs */}
      <div className="flex justify-between items-center mt-8 flex-wrap">
        <div className="flex gap-10 items-center flex-wrap">
          {options.map((option) => {
            const isAll = option.id === "all";

            const content = (
              <>
                {option.icon}
                <p className="text-sm mt-0.5">{option.label}</p>
              </>
            );

            return isAll ? (
              <button
                key={option.id}
                onClick={() => setActive("all")}
                className={`flex flex-col gap-1 items-center py-1 transition ${
                  active === option.id
                    ? "text-[#0d1527] border-b-2 border-[#0d1527]"
                    : "text-[#6c707c]"
                }`}>
                {content}
              </button>
            ) : (
              <Link
                key={option.id}
                href={`/category/${option.id}`}
                onClick={() => setActive(option.id)}
                className={`flex flex-col gap-1 items-center py-1 transition ${
                  active === option.id
                    ? "text-[#0d1527] border-b-2 border-[#0d1527]"
                    : "text-[#6c707c]"
                }`}>
                {content}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3 border rounded-full px-3 py-2 text-sm border-gray-400 text-gray-600">
          <BsFilterRight size={30} /> Filters
        </div>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 border-t border-gray-300 pt-8">
        {filteredListings.map((item) => (
          <Link
            href={`/listing/${item.id}`}
            key={item.id}
            className="rounded-lg overflow-hidden border hover:shadow-lg transition relative">
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
        ))}
      </div>
    </Container>
  );
};

export default All;
