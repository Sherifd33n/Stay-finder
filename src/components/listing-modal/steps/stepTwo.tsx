"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";

/* --------------------------------------------------
   Dynamically import the map (SSR disabled)
-------------------------------------------------- */
const LocationMap = dynamic(() => import("../../LocationMap"), {
  ssr: false,
});

/* --------------------------------------------------
   Types
-------------------------------------------------- */
interface LocationState {
  street: string;
  city: string;
  state: string;
  zip: string;
  unit: string;
}

interface StepTwoProps {
  location: LocationState;
  setLocation: React.Dispatch<React.SetStateAction<LocationState>>;
}

/* --------------------------------------------------
   Component
-------------------------------------------------- */
export default function StepTwo({ location, setLocation }: StepTwoProps) {
  const handleChange = useCallback(
    (field: keyof LocationState, value: string) => {
      setLocation((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [setLocation]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-2">
        <h2 className="text-xl font-semibold text-[#101418]">
          Property Location
        </h2>
        <p className="text-sm text-[#818891]">
          Click on the map to auto-fill the property address.
        </p>
      </div>

      {/* Content */}
      <div className="flex gap-6">
        {/* Address form */}
        <div className="w-1/2 space-y-4">
          <div>
            <label className="block mb-1.5 text-gray-700">
              Street Address
            </label>
            <input
              value={location.street}
              onChange={(e) => handleChange("street", e.target.value)}
              placeholder="Street"
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1.5 text-gray-700">City</label>
              <input
                value={location.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="City"
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <div className="w-1/2">
              <label className="block mb-1.5 text-gray-700">State</label>
              <input
                value={location.state}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="State"
                className="w-full rounded border px-3 py-2"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1.5 text-gray-700">ZIP Code</label>
              <input
                value={location.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
                placeholder="ZIP"
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <div className="w-1/2">
              <label className="block mb-1.5 text-gray-700">
                Unit / Suite (optional)
              </label>
              <input
                value={location.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
                placeholder="Unit / Suite"
                className="w-full rounded border px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-1/2 h-80 rounded overflow-hidden border">
          <LocationMap setLocation={setLocation} />
        </div>
      </div>
    </div>
  );
}
