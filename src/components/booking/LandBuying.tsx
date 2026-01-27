// components/booking/LandBooking.tsx
const LandBuying = () => {
  return (
    <div className="border rounded-xl p-4 space-y-4">
      <h3 className="text-lg font-semibold">Land Inquiry</h3>

      <textarea
        className="w-full border rounded p-2"
        placeholder="Your message"
      />

      <button className="w-full bg-black text-white py-2 rounded">
        Send Inquiry
      </button>
    </div>
  );
};

export default LandBuying;
