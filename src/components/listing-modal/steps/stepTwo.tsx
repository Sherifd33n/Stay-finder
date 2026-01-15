"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import "../../../../lib/leaflet";

interface StepTwoProps {
  location: {
    street: string;
    city: string;
    state: string;
    zip: string;
    unit: string;
  };
  setLocation: React.Dispatch<
    React.SetStateAction<{
      street: string;
      city: string;
      state: string;
      zip: string;
      unit: string;
    }>
  >;
}

function LocationPicker({
  setLocation,
}: {
  setLocation: StepTwoProps["setLocation"];
}) {
  const [position, setPosition] = useState<[number, number]>([6.5244, 3.3792]);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      // Reverse geocoding (OpenStreetMap)
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();

      setLocation((prev) => ({
        ...prev,
        street: data.address.road || "",
        city:
          data.address.city || data.address.town || data.address.village || "",
        state: data.address.state || "",
        zip: data.address.postcode || "",
      }));
    },
  });

  return <Marker position={position} />;
}

function StepTwo({ location, setLocation }: StepTwoProps) {
  const handleChange = (field: keyof typeof location, value: string) => {
    setLocation((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="border-b pb-2 border-gray-200">
        <h2 className="mb-1 text-xl font-semibold text-[#101418]">
          Property Location
        </h2>
        <p className="text-sm text-[#818891]">
          Click on the map to auto‑fill the property address.
        </p>
      </div>

      <div className="flex gap-5">
        <div className="mt-6 space-y-4 w-1/2">
          <div>
            <p className="mb-1.5 text-gray-700">Street Address</p>
            <input
              placeholder="Street"
              className="w-full border px-3 py-2 rounded"
              value={location.street}
              onChange={(e) => handleChange("street", e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div>
              <p className="mb-1.5 text-gray-700">City</p>
              <input
                placeholder="City"
                className="w-full border px-3 py-2 rounded"
                value={location.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>
            <div>
              <p className="mb-1.5 text-gray-700">State</p>

              <input
                placeholder="State"
                className="w-full border px-3 py-2 rounded"
                value={location.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <p className="mb-1.5 text-gray-700">ZIP Code</p>{" "}
              <input
                placeholder="ZIP"
                className="w-full border px-3 py-2 rounded"
                value={location.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
              />
            </div>

            <div>
              <p className="mb-1.5 text-gray-700">Unit / Suite (optional)</p>{" "}
              <input
                placeholder="Unit / Suite"
                className="w-full border px-3 py-2 rounded"
                value={location.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 h-75 w-1/2 rounded overflow-hidden border">
          <MapContainer
            center={[6.5244, 3.3792]}
            zoom={13}
            className="h-full w-full">
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationPicker setLocation={setLocation} />
          </MapContainer>
        </div>
      </div>

      {/* Address Inputs */}
    </div>
  );
}

export default StepTwo;
