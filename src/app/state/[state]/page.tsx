"use client";

import { useParams } from "next/navigation";
import Container from "@/components/Container";
import { listings } from "@/data/listing";
import { stateImages } from "../../../../lib/stateImage";
import Link from "next/link";
import { locationContent } from "../../../../lib/locationContent";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Category = "all" | "house" | "apartment" | "hotel" | "land" | "warehouse";

export default function StatePage() {
  const params = useParams();
  const stateParam = decodeURIComponent(params.state as string);
  const stateKey = stateParam.toLowerCase();

  const bgImage = stateImages[stateKey] || stateImages.default;

  const content = locationContent[stateKey] || locationContent.default;

  const [category, setCategory] = React.useState<
    "all" | "house" | "hotel" | "land" | "warehouse" | "apartment"
  >("all");

  const stateListings = React.useMemo(() => {
    return listings.filter((item) => item.state.toLowerCase() === stateKey);
  }, [stateKey]);

  const filteredListings = React.useMemo(() => {
    if (category === "all") return stateListings;

    return stateListings.filter((item) => item.category === category);
  }, [stateListings, category]);

  const emptyStateVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.25 },
    },
  };

  return (
    <>
      {/* ===== HERO OVERLAY ===== */}
      <div
        className="relative h-[65vh] w-full flex items-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // backgroundRepeat: "no-repeat"
        
        }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65"></div>

        {/* Text */}

        <div className="relative z-10 text-white px-4 text-left max-w-7xl md:px-12.5 lg:px-32">
          <h1 className="text-4xl md:text-5xl font-serif font-medium">
            {content.title}
          </h1>

          <p className="mt-3 text-gray-400 max-w-xl">{content.description}</p>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <Container className="mt-10">
        <Link
          href="/properties"
          className="text-base text-gray-500 hover:underline">
          ← Back
        </Link>

        {stateListings.length === 0 && (
          <p className="mt-6 text-gray-500">
            No properties found in {stateParam}.
          </p>
        )}

        <div className="flex flex-wrap gap-3 mt-6">
          {(
            [
              "all",
              "house",
              "apartment",
              "hotel",
              "land",
              "warehouse",
            ] as Category[]
          ).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm capitalize transition
          ${
            category === cat
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}>
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {filteredListings.length === 0 ? (
            <motion.div
              key="empty"
              variants={emptyStateVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-4">🏡</div>

              <h3 className="text-xl font-serif font-medium">
                No {category !== "all" ? category : ""} properties found
              </h3>

              <p className="mt-2 text-gray-500 max-w-md">
                Try switching categories or explore other locations.
              </p>

              <button
                onClick={() => setCategory("all")}
                className="mt-6 px-5 py-2 rounded-full bg-black text-white text-sm hover:opacity-90 transition">
                View all properties
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {filteredListings.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}>
                  <Link
                    href={`/listing/${item.id}`}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition block">
                    <div className="relative h-40 w-full">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="p-3">
                      <h3 className="font-medium line-clamp-1">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
}
