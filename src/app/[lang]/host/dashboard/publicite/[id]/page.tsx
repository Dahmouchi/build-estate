import React from "react";
import { getPropertyById } from "@/actions/properties";
import EditPropertyPage from "../../../_components/update-property-form";
import { listAmenities } from "@/actions/amenities";
import { listServices } from "@/actions/services";
//import { getHotels } from "@/actions/hotelsActions";

export default async function UpdateTourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ⚠️ Await params before destructuring
  const { id } = await params;
  const result = await getPropertyById(id);
  const amenities = await listAmenities();
  const services = await listServices();

 
  if (!result) {
    return <div>Tour non trouvé</div>;
  }

  return (
    <div>
        <EditPropertyPage property={result} id={id} amenities={amenities} services={services}/>
    </div>
  );
}