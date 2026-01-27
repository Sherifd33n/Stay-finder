"use client";

import HotelBooking from "./HotelBooking";
import HouseBuying from "./HouseBuying";
import ApartmentBuying from "./ApartmentBuying";
import LandBuying from "./LandBuying";
import WarehouseBooking from "./WarehouseBooking";

interface BookingSectionProps {
  category?: string;
}

const BookingSection = ({ category }: BookingSectionProps) => {
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

export default BookingSection;
