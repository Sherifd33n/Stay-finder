"use client";

import React from "react";
import Link from "next/link";

type ExploreCardProps = {
  imageUrl: string;
  title: string;
  text: string;
  href: string;
  buttonText?: string;
};

const ExploreCard: React.FC<ExploreCardProps> = ({
  imageUrl,
  title,
  text,
  href,
  buttonText = "Learn More",
}) => {
  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-lg h-72"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
        <h3 className="text-white text-2xl font-semibold font-sans">{title}</h3>
        <p className="text-white text-sm mt-2">{text}</p>

        <div>
          {" "}
          <Link
            href={href}
            className="mt-5 inline-block bg-transparent text-sm text-white border border-white px-4 py-1 rounded-full hover:opacity-50 transition uppercase">
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
