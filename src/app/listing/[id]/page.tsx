"use client";

import React from "react";
import Image from "next/image";
import { listings } from "@/data/listing";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ListingPage({ params }: PageProps) {
  const { id } = use(params); // ✅ unwrap the promise

  const item = listings.find((l) => l.id === id);

  if (!item) {
    return <p className="p-6 text-center">Listing not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="relative h-80 w-full rounded-lg overflow-hidden">
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <h1 className="mt-4 text-2xl font-bold">{item.title}</h1>
      <p className="text-gray-600 mt-1">₦{item.price.toLocaleString()}</p>
      <p className="mt-4 text-sm text-gray-500">{item.location}</p>
    </div>
  );
}
