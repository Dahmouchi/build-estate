import React from "react";
import {  getPropertyByIdAllItems } from "@/actions/properties";
import { PropertyInfo } from "../_components/property-info";
import { PropertyHero } from "../_components/property-hero";
import { BookingCard } from "../_components/booking-card";
import { PropertyMap } from "../_components/property-map";
import Header from "../_components/Header";

export default async function UpdateTourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ⚠️ Await params before destructuring
  const { id } = await params;
  const result = await getPropertyByIdAllItems(id);
 
  if (!result) {
    return <div>Tour non trouvé</div>;
  }

  return (
     <div className="min-h-screen bg-white">
        <Header />
      <PropertyHero property={result} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Property info */}
          <div className="lg:col-span-2">
            <PropertyInfo property={result} />
          </div>

          {/* Right column - Booking card */}
          <div className="lg:col-span-1">
            <BookingCard property={result} />
          </div>
        </div>

        
        <PropertyMap property={result} />
        {/* Map section <FAQSection />*/}
      </div>
    </div>
  );
}