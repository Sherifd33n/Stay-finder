"use client";

import Image from "next/image";
import React, { useState } from "react";
import { MediaFile } from "../UploadMedia";
import { BsDot } from "react-icons/bs";

interface StepFiveProps {
  active: "rent" | "sell";
  category: string;
  location: {
    street: string;
    city: string;
    state: string;
    zip: string;
    unit?: string;
  };
  media: MediaFile[];
  details: {
    price: string;
    area: string;
    bedrooms: number;
    bathrooms: number;
    description: string;
  };
}

function StepFive({
  active,
  category,
  location,
  media,
  details,
}: StepFiveProps) {
  const [showAll, setShowAll] = useState(false);

  const images = media.filter((m) => m.type === "image");
  const visibleImages = showAll ? images : images.slice(0, 5);
  const remaining = images.length - 5;

  return (
    <div className="space-y-3 bg-[#f9fafb] p-4">
      <h2 className="text-xl font-semibold">Review Your Listing</h2>

      {/* MEDIA */}
      <div className="bg-white rounded p-4 shadow-md">
        <h3 className="font-semibold text-gray-600 mb-3 font-sans">
          PROPERTY MEDIA
        </h3>

        {images.length > 0 ? (
          <div className="grid grid-cols-4 gap-2">
            {/* BIG IMAGE */}
            <div className="col-span-4 md:col-span-2 row-span-2 relative h-65 rounded overflow-hidden">
              <Image
                src={images[0].preview}
                alt="Main image"
                fill
                className="object-cover"
              />
            </div>

            {/* SMALL IMAGES */}
            {visibleImages.slice(1).map((img, index) => {
              const isLast = !showAll && index === 3 && remaining > 0;

              return (
                <div
                  key={index}
                  className="relative h-31.25 rounded overflow-hidden">
                  <Image
                    src={img.preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />

                  {/* +N OVERLAY */}
                  {isLast && (
                    <button
                      onClick={() => setShowAll(true)}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-semibold">
                      +{remaining}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p>No media uploaded</p>
        )}
      </div>
      <div className="flex gap-5">
        <div>
          <h3 className="font-semibold text-gray-700 text-sm">Listing Type</h3>
          <p className="text-sm">{active.toUpperCase()}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 text-sm">
            Property Category
          </h3>
          <p className="uppercase text-sm">{category}</p>
        </div>
      </div>

      <div className="bg-white rounded p-4 shadow-md space-y-2">
        <div>
          <p className="text-xl font-sans">
            ${details.price} {active === "rent" ? "/mo" : ""} - {location.city ? `${location.city},` : ""}{" "}
            {location.state}
          </p>
        </div>

        <div>
          <p className="flex gap-1 items-center text-[12px]">
            {details.bedrooms} Bed <BsDot /> {details.bathrooms} Bath <BsDot />{" "}
            {details.area} sqft
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">DESCRIPTION</h3>

          <p className="text-[16px] text-gray-600">{details.description}</p>
        </div>
      </div>

      {/* LOCATION */}
      {/* <div>
        <h3 className="font-semibold text-gray-700">Location</h3>
        <p>
          {location.street}, {location.unit && location.unit + ", "},{" "}
          {location.zip}
        </p>
      </div> */}

      {/* DETAILS */}
    </div>
  );
}

export default StepFive;
