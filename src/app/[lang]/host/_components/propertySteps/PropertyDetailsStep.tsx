/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyData } from "@/lib/types";
import { PROPERTY_TYPES } from "@/constant/data";
import LocationPicker from "@/components/LocationPicker";

interface PropertyDetailsStepProps {
  formData: PropertyData;
  errors: Record<string, string>;
  onUpdateField: (field: keyof PropertyData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({
  formData,
  errors,
  onUpdateField,
  onNext,
  onPrev,
}) => {
  return (
    <div className=" mx-auto">
      <Card>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                placeholder="Charmant appartement centre-ville"
                onChange={(e) => onUpdateField("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyType">Type de propriété *</Label>
              <select
                id="propertyType"
                value={formData.propertyType}
                onChange={(e) => onUpdateField("propertyType", e.target.value)}
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.propertyType ? "border-red-500" : ""
                }`}
              >
                <option value="">Sélectionnez un type</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {errors.propertyType && (
                <p className="text-sm text-red-500">{errors.propertyType}</p>
              )}
            </div>
          </div>

          <LocationPicker formData={formData} onUpdateField={onUpdateField} />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
            <Label htmlFor="address">Adresse complète *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => onUpdateField("address", e.target.value)}
              placeholder="Ex: 123 Rue de la Paix, 75001 Paris"
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Le lien de localisation </Label>
            <Input
              id="googleMapsUrl"
              value={formData.googleMapsUrl}
              onChange={(e) => onUpdateField("googleMapsUrl", e.target.value)}
              placeholder="Ex: https://maps.app.goo.gl/xxxx"
              className={errors.googleMapsUrl ? "border-red-500" : ""}
            />
            {errors.googleMapsUrl && (
              <p className="text-sm text-red-500">{errors.googleMapsUrl}</p>
            )}
          </div>
          </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lat">Latitude</Label>
              <Input
                id="lat"
                type="number"
                value={formData.lat}
                onChange={(e) =>
                  onUpdateField("lat", parseFloat(e.target.value))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lang">Longitude</Label>
              <Input
                id="lang"
                type="number"
                value={formData.lang}
                onChange={(e) =>
                  onUpdateField("lang", parseFloat(e.target.value))
                }
              
              />
            </div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Chambres</Label>
              <Input
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) =>
                  onUpdateField("bedrooms", parseInt(e.target.value))
                }
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="beds">Lits</Label>
              <Input
                id="beds"
                type="number"
                value={formData.beds}
                onChange={(e) =>
                  onUpdateField("beds", parseInt(e.target.value))
                }
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Salles de bain</Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) =>
                  onUpdateField("bathrooms", parseFloat(e.target.value))
                }
                step="0.5"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxGuests">Capacité d&apos;accueil</Label>
              <Input
                id="maxGuests"
                type="number"
                value={formData.maxGuests}
                onChange={(e) =>
                  onUpdateField("maxGuests", parseInt(e.target.value))
                }
                min="1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description de la propriété *</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => onUpdateField("description", e.target.value)}
              placeholder="Décrivez votre propriété en quelques mots. Mettez en avant ses atouts !"
              rows={5}
              className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onPrev}>
              Précédent
            </Button>
            <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
              Suivant
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
