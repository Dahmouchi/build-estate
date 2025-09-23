/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { CityOption } from "./CitySearch";
import { PropertyType } from "@prisma/client";

// Define icons
const icons = {
  [PropertyType.APARTMENT]: L.icon({
    iconUrl: "/icons/apartment.png",
    iconSize: [52, 52],
    iconAnchor: [16, 32],
  }),
  [PropertyType.HOUSE]: L.icon({
    iconUrl: "/icons/house.png",
    iconSize: [52, 52],
    iconAnchor: [16, 32],
  }),
  [PropertyType.VILLA]: L.icon({
    iconUrl: "/icons/villa.png",
    iconSize: [52, 52],
    iconAnchor: [16, 32],
  }),
  [PropertyType.STUDIO]: L.icon({
    iconUrl: "/icons/studio.png",
    iconSize: [52, 52],
    iconAnchor: [16, 32],
  }),
  [PropertyType.CHAMBREPRIVE]: L.icon({
    iconUrl: "/icons/room.png",
    iconSize: [52, 52],
    iconAnchor: [16, 32],
  }),
  [PropertyType.CABANE]: L.icon({
    iconUrl: "/icons/cabane.png",
    iconSize: [52, 52],
    iconAnchor: [16, 32],
  }),
};
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type MapProps = {
  properties: any[];
  selectedCity?: CityOption | null; // 👈 pass from parent
};

function FlyToCity({
  city,
  properties,
}: {
  city?: CityOption | null;
  properties: any[];
}) {
  const map = useMap();

  useEffect(() => {
    if (!city) return;
    // find one property in that city
    map.flyTo([city.lat, city.lng], 12, { duration: 2 });
  }, [city, properties, map]);

  return null;
}

const Map=({ properties, selectedCity }: MapProps)=> {
  console.log(properties);
  return (
    <MapContainer
      center={[31.7917, -7.0926]} // Morocco center
      zoom={6}
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        attribution="&copy; Google"
        url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
      />
      {properties.map((p: any) => (
        <Marker
          key={p.id}
          position={[p.latitude, p.longitude]}
         icon={icons[p.type as PropertyType] || icon}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold">{p.title}</h3>
              <p>{p.basePrice.toLocaleString()} MAD</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* 👇 Auto zoom when city changes */}
      <FlyToCity city={selectedCity} properties={properties} />
    </MapContainer>
  );
}
export default Map