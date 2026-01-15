"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { PiBagFill, PiHouseFill } from "react-icons/pi";
import PropertyCategory from "../PropertyCategory";
import { MdApartment, MdHotel, MdLandscape, MdWarehouse } from "react-icons/md";
import { BsFillGiftFill } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";

interface StepOneProps {
  active: "rent" | "sell";
  setActive: Dispatch<SetStateAction<"rent" | "sell">>;
}

function StepOne({ active, setActive }: StepOneProps) {
  const [selected, setSelected] = useState<
    | "house"
    | "apartment"
    | "hotel"
    | "warehouse"
    | "land"
    | "office"
    | "retail"
    | "others"
  >("house");

  return (
    <div className="">
      <div className="border-b pb-2 border-gray-200">
        <h2 className="mb-1 text-xl font-semibold text-[#101418]">
          What are you listing?
        </h2>
        <p className="text-sm text-[#818891]">
          Select the type of property and your intention to help us customize
          your listing experience.
        </p>
      </div>

      <div className="mt-3">
        <p className="text-[#818891] font-semibold">I WANT TO:</p>
        <div className="bg-[#e2dfdf] inline-flex px-1 py-1 rounded-lg mt-2 gap-2">
          <button
            onClick={() => setActive("rent")}
            className={`px-10 py-2 rounded-lg transition-all
          ${
            active === "rent"
              ? "bg-white text-[#089589] shadow"
              : "text-gray-600 hover:bg-white"
          }
        `}>
            Rent
          </button>

          <button
            onClick={() => setActive("sell")}
            className={`px-10 py-2 rounded-lg transition-all
          ${
            active === "sell"
              ? "bg-white text-[#089589] shadow"
              : "text-gray-600 hover:bg-white"
          }
        `}>
            Sell
          </button>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[#818891] font-semibold">PROPERTY CATEGORY</p>

        <div className="mt-3">
          <div className="flex gap-4 flex-wrap">
            <PropertyCategory
              label="House"
              icon={<PiHouseFill size={30} />}
              isActive={selected === "house"}
              onClick={() => setSelected("house")}
            />

            <PropertyCategory
              label="Apartment"
              icon={<MdApartment size={30} />}
              isActive={selected === "apartment"}
              onClick={() => setSelected("apartment")}
            />

            <PropertyCategory
              label="Hotel"
              icon={<MdHotel size={30} />}
              isActive={selected === "hotel"}
              onClick={() => setSelected("hotel")}
            />

            <PropertyCategory
              label="Warehouse"
              icon={<MdWarehouse size={30} />}
              isActive={selected === "warehouse"}
              onClick={() => setSelected("warehouse")}
            />

            <PropertyCategory
              label="Land"
              icon={<MdLandscape size={30} />}
              isActive={selected === "land"}
              onClick={() => setSelected("land")}
            />

            <PropertyCategory
              label="Offices"
              icon={<PiBagFill size={30} />}
              isActive={selected === "office"}
              onClick={() => setSelected("office")}
            />

            <PropertyCategory
              label="Retail"
              icon={<BsFillGiftFill size={30} />}
              isActive={selected === "retail"}
              onClick={() => setSelected("retail")}
            />

            <PropertyCategory
              label="Others"
              icon={<HiDotsHorizontal size={30} />}
              isActive={selected === "others"}
              onClick={() => setSelected("others")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default StepOne;
