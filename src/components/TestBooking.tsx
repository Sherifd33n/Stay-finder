// Create a test file: /components/TestBooking.tsx
"use client";

import BookingSection from "./booking/BookingSection";

export default function TestBooking() {
  return (
    <div className="p-6">
      <h1>Test Booking Components</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2>Hotel</h2>
          <BookingSection category="hotel" />
        </div>
        <div>
          <h2>House</h2>
          <BookingSection category="house" />
        </div>
        <div>
          <h2>Apartment</h2>
          <BookingSection category="apartment" />
        </div>
        <div>
          <h2>Land</h2>
          <BookingSection category="land" />
        </div>
        <div>
          <h2>Warehouse</h2>
          <BookingSection category="warehouse" />
        </div>
      </div>
    </div>
  );
}