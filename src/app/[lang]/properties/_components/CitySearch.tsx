/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { City } from "country-state-city";
import { useMemo } from "react";

// react-select dynamic import (avoids SSR issues)
const Select = dynamic(() => import("react-select"), { ssr: false });

export type CityOption = {
  value: string;
  label: string;
  lat: number;
  lng: number;
};

export default function CitySearch({
  selectedCity,
  onCityChange,
}: {
  selectedCity: CityOption | null;
  onCityChange: (city: CityOption | null) => void;
}) {
  // 🇲🇦 Morocco only
  const cityOptions = useMemo<CityOption[]>(() => {
    return (City.getCitiesOfCountry("MA") || []).map((ci: any) => ({
      value: ci.name.toLowerCase(),
      label: ci.name,
      lat: parseFloat(ci.latitude),
      lng: parseFloat(ci.longitude),
    }));
  }, []);

  return (
    <Select
      options={cityOptions}
      value={selectedCity}
      onChange={(opt: any) => {
        onCityChange(opt ?? null); // 👈 send full option object
        console.log("Selected city:", opt);
      }}
      isClearable
      isSearchable
      placeholder="Rechercher une ville..."
      noOptionsMessage={() => "Aucune ville trouvée"}
      className="w-full"
    />
  );
}
