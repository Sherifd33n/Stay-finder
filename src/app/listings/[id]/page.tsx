"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import { listings } from "@/data/listing";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import Container from "@/components/Container";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Hotel Booking Component
const HotelBooking = () => {
  return (
    <form className="border rounded-xl p-4 space-y-4 shadow-lg">
      <h3 className="text-lg font-semibold">Book Your Stay</h3>
      <input
        type="date"
        name="checkIn"
        required
        className="w-full border rounded p-2"
      />
      <input
        type="date"
        name="checkOut"
        required
        className="w-full border rounded p-2"
      />
      <select
        name="guests"
        required
        defaultValue=""
        className="w-full border rounded p-2">
        <option value="" disabled>
          Select guests
        </option>
        <option value="1">1 Guest</option>
        <option value="2">2 Guests</option>
        <option value="3">3 Guests</option>
        <option value="4">4+ Guests</option>
      </select>
      <button
        type="submit"
        className="w-full bg-[#089589] text-white py-2 rounded hover:opacity-65 cursor-pointer">
        Reserve
      </button>
    </form>
  );
};

// House Buying Component
const HouseBuying = () => {
  return (
    <form className="border rounded-xl p-5 space-y-4 shadow-lg">
      <h3 className="text-xl font-semibold">Schedule a House Viewing</h3>
      <input
        type="date"
        name="date"
        required
        className="w-full border rounded-md p-2"
      />
      <input
        type="time"
        name="time"
        required
        className="w-full border rounded-md p-2"
      />
      <button
        type="submit"
        className="w-full bg-[#089589] cursor-pointer text-white py-2 rounded-md hover:opacity-90">
        Request Viewing
      </button>
    </form>
  );
};

// Apartment Buying Component
const ApartmentBuying = () => {
  return (
    <form className="border rounded-xl p-5 space-y-4 shadow-lg">
      <h3 className="text-xl font-semibold">Schedule Apartment Viewing</h3>
      <div className="">
        <input
          type="date"
          name="date"
          required
          className="w-full border rounded-md p-2"
        />
      </div>
      {/* <select className="w-full border rounded-md p-2">
        <option>Guests</option>
        <option>1 Guest</option>
        <option>2 Guests</option>
        <option>3 Guests</option>
      </select> */}
      <button className="w-full bg-[#089589] text-white py-2 rounded-md hover:opacity-90 cursor-pointer">
        Check Availability
      </button>
    </form>
  );
};

// Land Buying Component
const LandBuying = () => {
  return (
    <form className="border rounded-xl p-4 space-y-4 shadow-lg">
      <h3 className="text-lg font-semibold">Land Inquiry</h3>
      <textarea
        className="w-full border rounded p-2"
        placeholder="Your message"
        rows={4}
        required
      />
      <button className="w-full bg-[#089589] text-white py-2 rounded hover:opacity-90 cursor-pointer">
        Send Inquiry
      </button>
    </form>
  );
};

// Warehouse Booking Component
const WarehouseBooking = () => {
  return (
    <form className="border rounded-xl p-4 space-y-4 shadow-lg">
      <h3 className="text-lg font-semibold">Warehouse Inquiry</h3>
      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Intended use"
        required
      />
      <button className="w-full bg-[#089589] text-white py-2 rounded hover:opacity-90 cursor-pointer">
        Contact Agent
      </button>
    </form>
  );
};

// Booking Section Component
const BookingSection = ({ category }: { category?: string }) => {
  if (!category) return null;

  switch (category) {
    case "hotel":
      return <HotelBooking />;
    case "house":
      return <HouseBuying />;
    case "apartment":
      return <ApartmentBuying />;
    case "land":
      return <LandBuying />;
    case "warehouse":
      return <WarehouseBooking />;
    default:
      return null;
  }
};

// Main Listing Page Component
export default function ListingPage({ params }: PageProps) {
  const { id } = use(params);

  const item = listings.find((l) => l.id === id);

  // Gallery state
  const [openGallery, setOpenGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Listing not found
          </h1>
          <p className="text-gray-600">ID: {id || "No ID provided"}</p>
        </div>
      </div>
    );
  }

  // Gallery navigation
  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % item.images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));

  return (
    <Container className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:py-8">
        {/* Property Images */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[400px]">
            {/* Main image */}
            {item.images[0] && (
              <div className="relative rounded-xl overflow-hidden">
                <button
                  className="relative h-full w-full cursor-pointer"
                  onClick={() => {
                    setCurrentIndex(0);
                    setOpenGallery(true);
                  }}>
                  <Image
                    src={item.images[0]}
                    alt={`${item.title} 1`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </button>
              </div>
            )}

            {/* Side images */}
            <div className="grid grid-cols-1 gap-4">
              {[1, 2].map((index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden">
                  {item.images[index] && (
                    <button
                      className="relative h-full w-full cursor-pointer"
                      onClick={() => {
                        setCurrentIndex(index);
                        setOpenGallery(true);
                      }}>
                      <Image
                        src={item.images[index]}
                        alt={`${item.title} ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      {index === 2 && item.images.length > 3 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-xl font-semibold">
                            +{item.images.length - 3}
                          </span>
                        </div>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Property Header */}
          <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {item.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-600">📍</span>
                <p className="text-gray-600">
                  {item.location}, {item.city}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl lg:text-4xl font-bold text-[#089589]">
                ₦{item.price.toLocaleString()}
                {item.priceUnit === "night" && (
                  <span className="text-lg font-normal text-gray-600">
                    {" "}
                    / night
                  </span>
                )}
              </p>
              {item.rating && (
                <div className="flex items-center gap-1 mt-1 justify-end">
                  <span className="text-yellow-500">★</span>
                  <span className="text-gray-600">{item.rating}/5</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:w-2/3">
            {/* Property Features */}
            {item.details?.length &&
              typeof item.details[0] === "object" &&
              item.details[0] && (
                <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Property Features
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {item.details[0].bedrooms !== undefined && (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-[#089589]">
                          {item.details[0].bedrooms}
                        </div>
                        <div className="text-gray-600 text-sm">Bedrooms</div>
                      </div>
                    )}
                    {item.details[0].bathrooms !== undefined && (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-[#089589]">
                          {item.details[0].bathrooms}
                        </div>
                        <div className="text-gray-600 text-sm">Bathrooms</div>
                      </div>
                    )}
                    {item.details[0].kitchens !== undefined && (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-[#089589]">
                          {item.details[0].kitchens}
                        </div>
                        <div className="text-gray-600 text-sm">Kitchens</div>
                      </div>
                    )}
                    {item.details[0].livingRooms !== undefined && (
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-[#089589]">
                          {item.details[0].livingRooms}
                        </div>
                        <div className="text-gray-600 text-sm">
                          Living Rooms
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            {/* Area Info */}
            {(item.acres || item.sqareFeet) && (
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-4">Property Area</h2>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-[#089589]">
                    {item.acres ? item.acres : item.sqareFeet}
                  </div>
                  <div className="text-gray-600">
                    {item.acres ? "Acres" : "Square Feet"}
                  </div>
                </div>
              </div>
            )}

            {/* About Section */}
            {item.about && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  About this Property
                </h2>
                <p className="text-gray-700 leading-relaxed">{item.about}</p>
              </div>
            )}
          </div>

          {/* Right Column - Booking Section */}
          <div className="lg:w-1/3">
            <div className="sticky top-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">Quick Inquiry</h2>
                  <p className="text-gray-600 mb-4">
                    Fill out the form below to proceed
                  </p>

                  {/* This is where BookingSection gets rendered */}
                  <div className="mb-4">
                    <BookingSection category={item.category} />
                  </div>

                  {/* Additional Info */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-semibold capitalize">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Mode:</span>
                      <span className="font-semibold capitalize">
                        {item.mode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      {openGallery && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setOpenGallery(false)}
            className="absolute top-4 right-4 text-white text-3xl z-50 hover:bg-white/20 p-2 rounded-full transition-colors">
            ✕
          </button>

          <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center">
            <button
              onClick={prevImage}
              className="absolute left-4 text-white text-4xl p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10">
              <BsCaretLeftSquareFill />
            </button>

            <div className="relative w-full h-full">
              <Image
                src={item.images[currentIndex]}
                alt={`${item.title} ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 text-white text-4xl p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10">
              <BsCaretRightSquareFill />
            </button>
          </div>

          <div className="mt-6 text-white text-center">
            <p className="text-lg">
              {currentIndex + 1} / {item.images.length}
            </p>
            <p className="text-sm text-gray-400 mt-2">{item.title}</p>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-6 overflow-x-auto max-w-6xl">
            {item.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 ${
                  currentIndex === index ? "ring-2 ring-[#089589]" : ""
                }`}>
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
