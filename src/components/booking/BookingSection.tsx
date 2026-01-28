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
export const BookingSection = ({ category }: { category?: string }) => {
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