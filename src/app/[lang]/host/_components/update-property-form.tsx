/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PropertyData } from "@/lib/types";
import { useUpdatePropertyForm } from "@/hooks/useUpdatePropertyForm";
import { updateProperty } from "@/actions/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";

export default function EditPropertyPage({
  property,
  id,
  amenities,
  services,
}: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
 const propertyData: PropertyData = {
  ...property,
  amenities: property.amenities.map((a: any) => a.id),        // ["a1","a2"]
  additionalServices: property.services.map((s: any) => s.id) // ["s1","s2"]
};
  console.log("pro", propertyData);

  const form = useUpdatePropertyForm(propertyData as PropertyData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await updateProperty(id as string, form.formData);
    setLoading(false);

    if (success) {
      router.push(`/properties/${id}`);
    } else {
      alert("Update failed ❌");
    }
  };
const handleAmenityChange = (id: string) => {
  const exists = form.formData.amenities.includes(id);
  const updated = exists
    ? form.formData.amenities.filter((a) => a !== id)
    : [...form.formData.amenities, id];

  form.updateFormData("amenities", updated);
};

  const handleServiceChange = (id: string) => {
    const exists = form.formData.additionalServices.includes(id);
    const updated = exists
      ? form.formData.additionalServices.filter((s) => s !== id)
      : [...form.formData.additionalServices, id];

    form.updateFormData("additionalServices", updated);
  };
  function IconPreview({
    name,
    className,
  }: {
    name?: string | null;
    className?: string;
  }) {
    const map = useMemo(() => ({ ...LucideIcons }), []);

    const Cmp: any = name && (map as any)[name as keyof typeof map];
    return Cmp ? (
      <Cmp className={className ?? "h-4 w-4"} />
    ) : (
      <LucideIcons.Shapes className={className ?? "h-4 w-4"} />
    );
  }
  if (!property) return <p>Property not found</p>;

  return (
    <div className="mx-auto">
      <Card className="shadow-none border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Update Property</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Details */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Title"
                value={form.formData.title}
                onChange={(e) => form.updateFormData("title", e.target.value)}
              />
              <Input
                placeholder="Property Type"
                value={form.formData.propertyType}
                onChange={(e) =>
                  form.updateFormData("propertyType", e.target.value)
                }
              />
              <Input
                placeholder="City"
                value={form.formData.city}
                onChange={(e) => form.updateFormData("city", e.target.value)}
              />
              <Input
                placeholder="Country"
                value={form.formData.country}
                onChange={(e) => form.updateFormData("country", e.target.value)}
              />
              <Input
                placeholder="Address"
                value={form.formData.address}
                onChange={(e) => form.updateFormData("address", e.target.value)}
                className="col-span-2"
              />
            </div>
            <Textarea
              placeholder="Description"
              value={form.formData.description}
              onChange={(e) =>
                form.updateFormData("description", e.target.value)
              }
            />

            {/* Numbers */}
            <div className="grid grid-cols-4 gap-4">
              <Input
                type="number"
                placeholder="Bedrooms"
                value={form.formData.bedrooms}
                onChange={(e) =>
                  form.updateFormData("bedrooms", Number(e.target.value))
                }
              />
              <Input
                type="number"
                placeholder="Beds"
                value={form.formData.beds}
                onChange={(e) =>
                  form.updateFormData("beds", Number(e.target.value))
                }
              />
              <Input
                type="number"
                placeholder="Bathrooms"
                value={form.formData.bathrooms}
                onChange={(e) =>
                  form.updateFormData("bathrooms", Number(e.target.value))
                }
              />
              <Input
                type="number"
                placeholder="Max Guests"
                value={form.formData.maxGuests}
                onChange={(e) =>
                  form.updateFormData("maxGuests", Number(e.target.value))
                }
              />
            </div>

            {/* Amenities */}
            <div>
              <h3 className="font-semibold mb-2">Amenities</h3>
              <div className="grid grid-cols-5 gap-2">
               {amenities.map((amenity: any) => (
  <div
    key={amenity.id}
    className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
      form.formData.amenities.includes(amenity.id)
        ? "border-green-600 bg-green-50 text-green-700"
        : "border-gray-200 bg-white text-gray-800 hover:border-green-400"
    }`}
    onClick={() => handleAmenityChange(amenity.id)}
  >
    <span className="mt-2 text-sm text-center">{amenity.name}</span>
  </div>
))}

              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-2">Additional Services</h3>
              <div className="grid grid-cols-5 gap-2">
                {services.map((service: any) => (
                  <div
                    key={service.id}
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                      form.formData.additionalServices.includes(service.id)
                        ? "border-green-600 bg-green-50 text-green-700"
                        : "border-gray-200 bg-white text-gray-800 hover:border-green-400"
                    }`}
                    onClick={() => handleServiceChange(service.id)}
                  >
                    <IconPreview name={service.icon} className="h-5 w-5" />
                    <span className="mt-2 text-sm text-center">
                      {service.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos */}
            <div>
              <h3 className="font-semibold mb-2">Photos</h3>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  form.updateFormData(
                    "images",
                    e.target.files ? Array.from(e.target.files) : []
                  )
                }
              />
            </div>

            {/* Availability */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Min stay duration"
                value={form.formData.minStayDuration}
                onChange={(e) =>
                  form.updateFormData("minStayDuration", Number(e.target.value))
                }
              />
              <Input
                type="number"
                placeholder="Max stay duration"
                value={form.formData.maxStayDuration}
                onChange={(e) =>
                  form.updateFormData("maxStayDuration", Number(e.target.value))
                }
              />
            </div>

            {/* Pricing */}
            <div className="space-y-3">
              <Input
                type="number"
                placeholder="Price per night"
                value={form.formData.pricePerNight}
                onChange={(e) =>
                  form.updateFormData("pricePerNight", Number(e.target.value))
                }
              />
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={form.formData.seasonalPricing}
                  onCheckedChange={(checked) =>
                    form.updateFormData("seasonalPricing", Boolean(checked))
                  }
                />
                Seasonal Pricing
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={form.formData.longStayDiscounts}
                  onCheckedChange={(checked) =>
                    form.updateFormData("longStayDiscounts", Boolean(checked))
                  }
                />
                Long Stay Discounts
              </label>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
