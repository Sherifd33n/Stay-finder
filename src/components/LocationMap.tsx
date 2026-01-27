"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import "../../lib/leaflet";

type SetLocation = React.Dispatch<
  React.SetStateAction<{
    street: string;
    city: string;
    state: string;
    zip: string;
    unit: string;
  }>
>;

function LocationPicker({ setLocation }: { setLocation: SetLocation }) {
  const [position, setPosition] = useState<[number, number]>([6.5244, 3.3792]);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();

      setLocation((prev) => ({
        ...prev,
        street: data.address?.road || "",
        city:
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          "",
        state: data.address?.state || "",
        zip: data.address?.postcode || "",
      }));
    },
  });

  return <Marker position={position} />;
}

export default function LocationMap({
  setLocation,
}: {
  setLocation: SetLocation;
}) {
  return (
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
  );
}
