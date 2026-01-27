// components/booking/WarehouseBooking.tsx
const WarehouseBooking = () => {
  return (
    <div className="border rounded-xl p-4 space-y-4">
      <h3 className="text-lg font-semibold">Warehouse Inquiry</h3>

      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Intended use"
      />

      <button className="w-full bg-black text-white py-2 rounded">
        Contact Agent
      </button>
    </div>
  );
};

export default WarehouseBooking;
