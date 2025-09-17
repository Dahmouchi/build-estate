/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HostRegistrationData } from '@/lib/types';
import { PROPERTY_TYPES, AMENITIES, ADDITIONAL_SERVICES } from '@/constant/data';
import { RealEstateRegistrationData } from '@/hooks/useRegistrationFormEstate';

interface ReviewAndPublishStepProps {
  formData: RealEstateRegistrationData;
  onNext: () => void; // Pour la soumission finale
  onPrev: () => void;
  goToStep: (step: number) => void;
}

export const ReviewAndPublishStep: React.FC<ReviewAndPublishStepProps> = ({
  formData,
  onNext,
  onPrev,
  goToStep,
}) => {
  const getPropertyTypeName = (id: string) => {
    return PROPERTY_TYPES.find(type => type.id === id)?.name || id;
  };

  const getAmenityName = (id: string) => {
    return AMENITIES.find(amenity => amenity.id === id)?.name || id;
  };

  const getAdditionalServiceName = (id: string) => {
    return ADDITIONAL_SERVICES.find(service => service.id === id)?.name || id;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg space-y-8">
      {/* User Info */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Informations personnelles</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <p><strong>Prénom:</strong> {formData.firstName}</p>
          <p><strong>Nom:</strong> {formData.lastName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Téléphone:</strong> {formData.phone}</p>
        </div>
      </section>

      {/* Property Info */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Détails du bien</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <p><strong>Titre:</strong> {formData.title}</p>
          <p><strong>Type:</strong> {formData.propertyType}</p>
          <p><strong>Adresse:</strong> {formData.address}</p>
          <p><strong>Ville:</strong> {formData.city}</p>
          <p><strong>Pays:</strong> {formData.country}</p>
          <p><strong>Chambres:</strong> {formData.bedrooms}</p>
          <p><strong>Lits:</strong> {formData.beds}</p>
          <p><strong>Salles de bain:</strong> {formData.bathrooms}</p>
          <p><strong>Total pièces:</strong> {formData.totalRooms}</p>
          <p><strong>Surface:</strong> {formData.propertySize} m²</p>
          <p><strong>Prix de base:</strong> {formData.basePrice} MAD</p>
        </div>
        <p className="mt-2 text-sm text-gray-600"><strong>Description:</strong> {formData.description}</p>
      </section>

      {/* Amenities */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Équipements</h3>
        {formData.amenities.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-gray-600">
            {formData.amenities.map((amenity, i) => (
              <li key={i}>{amenity}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">Aucun équipement sélectionné</p>
        )}
      </section>

      {/* Additional Services */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Services supplémentaires</h3>
        {formData.additionalServices.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-gray-600">
            {formData.additionalServices.map((service, i) => (
              <li key={i}>{service}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">Aucun service sélectionné</p>
        )}
      </section>

      {/* Images */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Photos</h3>
        {formData.images.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {formData.images.map((file, i) => {
              const url = URL.createObjectURL(file);
              return (
                <div key={i} className="relative w-full h-40">
                  <img
                    src={url}
                    alt={`Photo ${i + 1}`}
                    className="object-cover rounded-md"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Aucune photo téléchargée</p>
        )}
      </section>

      {/* Matterport */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Tournage Matterport</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Date de tournage:</strong> {formData.filmingDate || "Non défini"}</p>
          <p><strong>Lien Matterport:</strong> {formData.matterportUrl || "Non défini"}</p>
          <p><strong>Notes:</strong> {formData.notes || "Aucune note"}</p>
        </div>
      </section>
    </div>
  );
};