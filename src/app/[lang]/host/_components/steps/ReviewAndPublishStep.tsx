/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HostRegistrationData } from '@/lib/types';
import { PROPERTY_TYPES, AMENITIES, ADDITIONAL_SERVICES } from '@/constant/data';

interface ReviewAndPublishStepProps {
  formData: HostRegistrationData;
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
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Vérifiez et publiez votre annonce
          </CardTitle>
          <p className="text-center text-gray-600">
            Veuillez vérifier toutes les informations avant de publier votre annonce.
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Section Informations personnelles */}
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-3 flex justify-between items-center">
              Informations personnelles
              <Button variant="link" onClick={() => goToStep(2)} className="p-0 h-auto">
                Modifier
              </Button>
            </h3>
            <p><strong>Nom:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Téléphone:</strong> {formData.phone}</p>
          </div>

          {/* Section Détails de la propriété */}
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-3 flex justify-between items-center">
              Détails de la propriété
              <Button variant="link" onClick={() => goToStep(3)} className="p-0 h-auto">
                Modifier
              </Button>
            </h3>
            <p><strong>Type:</strong> {getPropertyTypeName(formData.propertyType)}</p>
            <p><strong>Adresse:</strong> {formData.address}</p>
            <p><strong>Chambres:</strong> {formData.bedrooms}</p>
            <p><strong>Lits:</strong> {formData.beds}</p>
            <p><strong>Salles de bain:</strong> {formData.bathrooms}</p>
            <p><strong>Capacité:</strong> {formData.maxGuests} personnes</p>
            <p><strong>Description:</strong> {formData.description}</p>
          </div>

          {/* Section Équipements et services */}
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-3 flex justify-between items-center">
              Équipements et services
              <Button variant="link" onClick={() => goToStep(4)} className="p-0 h-auto">
                Modifier
              </Button>
            </h3>
            <p><strong>Équipements:</strong> {formData.amenities.map(getAmenityName).join(", ") || "Aucun"}</p>
            <p><strong>Services supplémentaires:</strong> {formData.additionalServices.map(getAdditionalServiceName).join(", ") || "Aucun"}</p>
          </div>

          {/* Section Photos */}
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-3 flex justify-between items-center">
              Photos
              <Button variant="link" onClick={() => goToStep(5)} className="p-0 h-auto">
                Modifier
              </Button>
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {formData.images.length > 0 ? (
                formData.images.map((file, index) => (
                  <img key={index} src={URL.createObjectURL(file)} alt={`Photo ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                ))
              ) : (
                <p>Aucune photo ajoutée.</p>
              )}
            </div>
          </div>

          {/* Section Disponibilité */}
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-3 flex justify-between items-center">
              Disponibilité
              <Button variant="link" onClick={() => goToStep(6)} className="p-0 h-auto">
                Modifier
              </Button>
            </h3>
            <p><strong>Durée min. séjour:</strong> {formData.minStayDuration} nuits</p>
            <p><strong>Durée max. séjour:</strong> {formData.maxStayDuration} nuits</p>
            <p><strong>Préavis:</strong> {formData.bookingNotice}</p>
          </div>

          {/* Section Tarification */}
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-3 flex justify-between items-center">
              Tarification
              <Button variant="link" onClick={() => goToStep(7)} className="p-0 h-auto">
                Modifier
              </Button>
            </h3>
            <p><strong>Prix par nuit:</strong> {formData.pricePerNight}€</p>
            <p><strong>Tarifs saisonniers:</strong> {formData.seasonalPricing ? "Oui" : "Non"}</p>
            <p><strong>Réductions longs séjours:</strong> {formData.longStayDiscounts ? "Oui" : "Non"}</p>
          </div>

          {/* Boutons de navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onPrev}>
              Précédent
            </Button>
            <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
              Publier mon annonce
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};