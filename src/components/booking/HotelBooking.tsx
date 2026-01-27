"use client";

const HotelBooking = () => {
  return (
    <form className="border rounded-xl p-4 space-y-4">
      <h3 className="text-lg font-semibold">Book Your Stay</h3>
      <input type="date" name="checkIn" required className="w-full border rounded p-2" />
      <input type="date" name="checkOut" required className="w-full border rounded p-2" />
      <select name="guests" required defaultValue="" className="w-full border rounded p-2">
        <option value="" disabled>Select guests</option>
        <option value="1">1 Guest</option>
        <option value="2">2 Guests</option>
        <option value="3">3 Guests</option>
        <option value="4">4+ Guests</option>
      </select>
      <button type="submit" className="w-full bg-[#089589] text-white py-2 rounded hover:opacity-65">
        Reserve
      </button>
    </form>
  );
};

export default HotelBooking;
