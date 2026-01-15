"use client";

import Container from "@/components/Container";
import { agents } from "@/data/listing";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { PiBuildingApartment } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const Agent = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");
  const [specialty, setSpecialty] = useState("all");
  const [filteredAgents, setFilteredAgents] = useState(agents);

  const handleSearch = () => {
    const results = agents.filter((agent) => {
      const matchesName =
        search === "" ||
        agent.name.toLowerCase().includes(search.toLowerCase());

      const matchesLocation =
        location === "all" ||
        agent.location.toLowerCase().includes(location.toLowerCase());

      const matchesSpecialty =
        specialty === "all" ||
        agent.specialty.some((s) =>
          s.toLowerCase().includes(specialty.toLowerCase())
        );

      return matchesName && matchesLocation && matchesSpecialty;
    });

    setFilteredAgents(results);
  };

  return (
    <div className="bg-[#f3f7f7]">
      <Container className=" mx-16">
        <div className="flex items-center gap-4 text-sm pt-6">
          <Link href="/" className="text-[#667a93] hover:text-gray-800">
            Home
          </Link>
          <IoIosArrowForward />
          <p>Agents Directory</p>
        </div>

        <div className="mt-6">
          <p className="text-[#0f172a] text-[35px] font-bold">
            Find Your Trusted Agent
          </p>
          <p className="text-[#979ea9] text-lg mr-[45%]">
            Browse over 500+ local property experts verified for excellence.
            Connect with the best professionals to buy, sell or rent your dream
            property.
          </p>
        </div>

        <div className="bg-white flex gap-6 items-center p-5 rounded-md border-[#e6ebf2] border my-6">
          <div className="flex items-center gap-2 border-[#e6ebf2] border rounded-md px-2 py-2">
            <IoIosSearch size={25} className="text-[#bbc5d3]" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search agents by name..."
              className="text-[#b3bac5] text-base outline-none"
            />
          </div>

          <div className="flex items-center gap-2 border-[#e6ebf2] border rounded-md px-2 py-2 text-base w-full">
            <FaLocationDot size={22} className="text-[#bbc5d3]" />{" "}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="outline-none text-[#5d5d5f] w-full">
              <option value="all">All Locations</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="portharcourt">Port Harcourt</option>
              <option value="ilorin">Ilorin</option>
              <option value="anambra">Anambra</option>
              <option value="ondo">Ondo</option>
              <option value="Oyo">Oyo</option>
              <option value="osun">Osun</option>
            </select>
          </div>

          <div className="flex items-center gap-2 border-[#e6ebf2] border rounded-md px-2 py-2 text-base w-full">
            <PiBuildingApartment size={22} className="text-[#bbc5d3]" />{" "}
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="outline-none text-[#5d5d5f] w-full">
              <option value="all">All Specialties</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="land">Land</option>
              <option value="hotel">Hotel</option>
              <option value="office">Office</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="px-4 py-2.5 flex justify-center items-center bg-[#089589] text-white rounded-md cursor-pointer hover:opacity-70">
            <BiRightArrowAlt size={20} />
          </button>
        </div>
        {filteredAgents.length === 0 && (
          <p className="text-gray-500">No agents found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="border rounded-md border-[#e6ebf2] p-4 hover:shadow-lg transition bg-white">
              <div className="relative h-15 w-15 mb-4 rounded-full">
                <Image
                  src={agent.image[0]}
                  alt={agent.name}
                  fill
                  className="object-contain rounded-full"
                />
                <RiVerifiedBadgeFill
                  size={20}
                  className="absolute top-10 left-10 text-[#089589]"
                />
              </div>

              <h3 className="font-semibold text-lg">{agent.name}</h3>
              <p className="text-sm text-gray-500">{agent.businessName}</p>

              <p className="text-sm text-gray-600 mt-2">
                {agent.experience} years experience • {agent.listings} listings
              </p>

              <p className="text-sm mt-1">{agent.location}</p>

              <p className="text-sm truncate text-[#222253] mt-2">
                {agent.about}
              </p>

              <div className="mt-3">
                <Link
                  href={`/agent/${agent.id}`}
                  className="w-full flex justify-center py-2 rounded-md bg-[#089589] text-white text-base hover:bg-white hover:text-[#089589] border hover:border-[#089589] transition-all duration-200">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Agent;
