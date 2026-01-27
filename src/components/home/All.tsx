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
import { motion } from "framer-motion";

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
    <Container className="mx-auto flex flex-col gap-6 pb-12">
      <div className="text-center pb-7 pt-12">
        <p className="text-5xl font-semibold text-[#0f172a]">
          Find your{" "}
          <span className="text-[#089589] underline">perfect place.</span>
        </p>
        <p className="text-[#8490a2] text-[16px] mt-2">
          Houses, Apartments, Lands and Commercial Places for Rent or Sale.
        </p>
      </div>

      <HomeSearch
        filters={searchFilters}
        setFilters={setSearchFilters}
        onSearch={handleSearch}
      />

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
                    ? "text-[#0d1527] border-b-3 border-[#0d1527]"
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
                    ? "text-[#0d1527] border-b-3 border-[#0d1527]"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 border-t border-gray-300 pt-8">
        {filteredListings.slice(0, 8).map((item) => (
          <div
            key={item.id}
            className="relative rounded-lg overflow-hidden border hover:shadow-lg transition">
            {/* Favorite button OUTSIDE Link */}
            <button
              onClick={() => toggleFavorite(item.id.toString())}
              className="absolute top-2 right-2 z-20 bg-white rounded-full p-1.5 shadow">
              {favorites.includes(item.id.toString()) ? (
                <AiFillHeart size={20} className="text-red-500" />
              ) : (
                <AiOutlineHeart size={20} className="text-gray-600" />
              )}
            </button>

            {/* Only navigation content inside Link */}
            <Link href={`/listings/${item.id}`} className="block">
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
            </Link>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-4">
        <Link href="/explore">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full border-4 border-gray-300 border-t-black cursor-pointer inline-flex items-center justify-center"></motion.div>
        </Link>
      </div>
    </Container>
  );
};

export default All;
