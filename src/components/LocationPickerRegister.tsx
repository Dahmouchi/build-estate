/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LocationPicker.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { components } from "react-select";
import ReactCountryFlag from "react-country-flag";
import { Country, City } from "country-state-city";
// If you have a Label component in your UI library, import it; otherwise use a normal <label>
import { Label } from "@/components/ui/label"; // <- adjust to your project, or replace with <label>
import { HostRegistrationData } from "@/lib/types";
import dynamic from "next/dynamic";

// import Select dynamically so it skips SSR
const Select = dynamic(() => import("react-select"), { ssr: false });

type Option = { value: string; label: string };

export default function LocationPicker({
  formData,
  onUpdateField,
}: {
  formData: Pick<HostRegistrationData, "country" | "city">;
  onUpdateField: (field: keyof HostRegistrationData, value: any) => void;
}) {
  // build country options once
  const countryOptions = useMemo(() => {
    return Country.getAllCountries().map((c) => ({
      value: c.isoCode, // ISO2 code like 'FR', 'US'
      label: c.name,
    }));
  }, []);

  const [selectedCountry, setSelectedCountry] = useState<Option | null>(
    countryOptions.find((c) => c.value === formData.country) ?? null
  );
  const [cityOptions, setCityOptions] = useState<Option[]>([]);

  // when country changes, load cities for that country
  useEffect(() => {
    if (!selectedCountry) {
      setCityOptions([]);
      // optional: clear city in formData
      if (formData.city) onUpdateField("city", "");
      return;
    }

    // City.getCitiesOfCountry returns many city objects; map to simple options
    const cities = City.getCitiesOfCountry(selectedCountry.value) || [];
    // Some countries have lots of cities; you can slice to limit suggestions:
    const options = cities.map((ci: any) => ({
      value: ci.name,
      label: ci.name,
    }));
    setCityOptions(options);

    // if current selected city is not in new options, clear it
    if (formData.city && !options.find((o) => o.value === formData.city)) {
      onUpdateField("city", "");
    }
  }, [selectedCountry]); // note: formData used only to clear outdated city

  // custom option render to show flag + country name
  const CountryOption = (props: any) => (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <ReactCountryFlag
          countryCode={props.data.value}
          svg
          style={{ width: "1.4em", height: "1.4em" }}
          title={props.data.label}
        />
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );

  const SingleValue = (props: any) => (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        <ReactCountryFlag
          countryCode={props.data.value}
          svg
          style={{ width: "1.1em", height: "1.1em" }}
        />
        <span>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="country">Pays *</Label>
        <Select
          inputId="country"
          options={countryOptions}
          value={selectedCountry}
          onChange={(opt: any) => {
            setSelectedCountry(opt);
            onUpdateField("country", opt?.value ?? "");
          }}
          components={{ Option: CountryOption, SingleValue }}
          isClearable
          placeholder="Choisir un pays..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">Ville *</Label>
        <Select
          inputId="city"
          options={cityOptions}
          value={cityOptions.find((o) => o.value === formData.city) ?? null}
          onChange={(opt: any) => onUpdateField("city", opt?.value ?? "")}
          isClearable
          isSearchable
          placeholder={selectedCountry ? "Choisir / rechercher une ville..." : "Sélectionnez d'abord un pays"}
          noOptionsMessage={() =>
            selectedCountry ? "Aucune ville trouvée pour ce pays" : "Sélectionnez un pays"
          }
        />
      </div>
    </div>
  );
}
