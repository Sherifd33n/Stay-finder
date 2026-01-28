"use client";

import React from "react";
import { IoSearch } from "react-icons/io5";

export type Filters = {
  location: string;
  category: string;
  mode: string;
};

type HomeSearchProps = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  onSearch: () => void;
};

const HomeSearch: React.FC<HomeSearchProps> = ({ filters, setFilters, onSearch }) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center gap-6 bg-white border border-gray-200 shadow-md px-5 rounded-full py-4 flex-wrap">
        {/* Location */}
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-[#4a4a4b]">LOCATION</p>
          <input
            type="search"
            placeholder="Where do you want to live?"
            className="text-[#8b9cb3] outline-none border-gray-300"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />
        </div>

        {/* Property Type */}
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-[#4a4a4b]">PROPERTY TYPE</p>
          <select
            className="w-50 outline-none border-gray-300"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="all">All</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="land">Land</option>
            <option value="hotel">Hotel</option>
            <option value="warehouse">Warehouse</option>
          </select>
        </div>

        {/* Mode */}
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-[#4a4a4b]">MODE</p>
          <select
            className="w-50 outline-none border-gray-300"
            value={filters.mode}
            onChange={(e) =>
              setFilters({ ...filters, mode: e.target.value })
            }
          >
            <option value="">Any</option>
            <option value="rent">Rent</option>
            <option value="sale">Sell</option>
          </select>
        </div>

        {/* Search Button */}
        <div
          onClick={onSearch}
          className="bg-[#089589] rounded-full h-12.5 w-12.5 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200"
        >
          <IoSearch size={25} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
