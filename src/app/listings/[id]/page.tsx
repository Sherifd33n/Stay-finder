"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import { listings } from "@/data/listing";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import BookingSection from "@/components/booking/BookingSection";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ListingPage({ params }: PageProps) {
  const { id } = use(params);

  const item = listings.find((l) => l.id.toString() === id);

  // Gallery state
  const [openGallery, setOpenGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!item) {
    return <p className="p-6 text-center">Listing not found</p>;
  }

  // Gallery navigation
  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % item.images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div>
        <div className="grid grid-cols-2 gap-2 h-[420px] rounded-lg overflow-hidden">
          {/* Main image - left side */}
          {item.images[0] && (
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
                className="object-cover"
              />
            </button>
          )}

          {/* Right side - two images stacked vertically */}
          <div className="flex flex-col gap-2 h-full">
            {/* Second image */}
            {item.images[1] && (
              <button
                className="relative h-1/2 w-full cursor-pointer"
                onClick={() => {
                  setCurrentIndex(1);
                  setOpenGallery(true);
                }}>
                <Image
                  src={item.images[1]}
                  alt={`${item.title} 2`}
                  fill
                  className="object-cover"
                />
              </button>
            )}

            {/* Third image with + overlay */}
            {item.images[2] && (
              <button
                className="relative h-1/2 w-full cursor-pointer"
                onClick={() => {
                  setCurrentIndex(2);
                  setOpenGallery(true);
                }}>
                <Image
                  src={item.images[2]}
                  alt={`${item.title} 3`}
                  fill
                  className="object-cover"
                />
                {item.images.length > 3 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-2xl font-semibold">
                      +{item.images.length - 3}
                    </span>
                  </div>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="mr-[30%]">
            <h1 className="text-4xl font-semibold">{item.title}</h1>
            <p className="text-sm text-gray-500 mt-2">{item.location}</p>
          </div>

          <p className="text-3xl text-[#089589] font-semibold">
            ₦{item.price.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex gap-10">
        <div className="flex gap-10">
          {/* Details Section */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-gray-700 w-2/3">
            {item.details?.length &&
              typeof item.details[0] === "object" &&
              item.details[0] && (
                <>
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-sm">Bedrooms</p>
                    <p className="text-lg font-semibold">
                      {item.details[0].bedrooms}
                    </p>
                  </div>
                  <hr className="h-10 w-px bg-gray-600" />
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-sm">Bathrooms</p>
                    <p className="text-lg font-semibold">
                      {item.details[0].bathrooms}
                    </p>
                  </div>
                  <hr className="h-10 w-px bg-gray-600" />
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-sm">Kitchens</p>
                    <p className="text-lg font-semibold">
                      {item.details[0].kitchens}
                    </p>
                  </div>
                  <hr className="h-10 w-px bg-gray-600" />
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-sm">Living Rooms</p>
                    <p className="text-lg font-semibold">
                      {item.details[0].livingRooms}
                    </p>
                  </div>
                </>
              )}

            {item.details?.length && typeof item.details[0] === "string" && (
              <div className="col-span-4 text-gray-700">
                <p>{item.details[0]}</p>
              </div>
            )}

            <hr className="h-10 w-px bg-gray-600" />

            {item.acres && (
              <div className="flex flex-col items-center">
                <p className="font-bold text-sm">Area</p>
                <p className="text-base font-semibold">{item.acres} sqft</p>
              </div>
            )}

            {/* About */}
            {item.about && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-gray-700">
                {item.about}
              </div>
            )}
          </div>

          {/* Right: BookingSection */}
          {/* <div className="w-full lg:w-1/3">
            {item?.category ? (
              <BookingSection category={item.category} />
            ) : null}
          </div> */}

          {/* Fullscreen Gallery */}
        </div>{" "}
        {openGallery && (
          <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
            <button
              onClick={() => setOpenGallery(false)}
              className="absolute top-6 right-6 text-white text-3xl z-50">
              ✕
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={prevImage}
                className="text-white text-3xl px-4 py-2 bg-black/50 rounded-lg">
                <BsCaretLeftSquareFill />
              </button>

              <div className="relative w-[80vw] h-[80vh]">
                <Image
                  src={item.images[currentIndex]}
                  alt={`${item.title} ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              <button
                onClick={nextImage}
                className="text-white text-3xl px-4 py-2 bg-black/50 rounded-lg">
                <BsCaretRightSquareFill />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
