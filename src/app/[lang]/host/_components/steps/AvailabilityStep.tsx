/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HostRegistrationData } from '@/lib/types';
import { BOOKING_NOTICE_OPTIONS } from '@/constant/data';

interface AvailabilityStepProps {
  formData: HostRegistrationData;
  errors: Record<string, string>;
  onUpdateField: (field: keyof HostRegistrationData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const AvailabilityStep: React.FC<AvailabilityStepProps> = ({
  formData,
  errors,
  onUpdateField,
  onNext,
  onPrev,
}) => {
  // Note: Pour un calendrier complet, une bibliothèque comme react-day-picker ou react-calendar serait nécessaire.
  // Ici, nous simulons avec des champs simples pour la démo.

  return (
    <div className="w-full mx-auto lg:p-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Définissez votre calendrier
          </CardTitle>
          <p className="text-center text-gray-600">
            Indiquez quand votre propriété est disponible et vos règles de réservation.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Section Calendrier (simplifiée) */}
          <div className="space-y-2">
            <Label htmlFor="availability">Disponibilité générale</Label>
            <p className="text-sm text-gray-500">
              (Un calendrier interactif serait implémenté ici pour sélectionner les dates)
            </p>
            <Input
              id="availability"
              type="text"
              value="Toute l'année (modifiable plus tard)"
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minStayDuration">Durée minimale du séjour (nuits)</Label>
              <Input
                id="minStayDuration"
                type="number"
                value={formData.minStayDuration}
                onChange={(e) => onUpdateField(
                  'minStayDuration',
                  parseInt(e.target.value)
                )}
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxStayDuration">Durée maximale du séjour (nuits)</Label>
              <Input
                id="maxStayDuration"
                type="number"
                value={formData.maxStayDuration}
                onChange={(e) => onUpdateField(
                  'maxStayDuration',
                  parseInt(e.target.value)
                )}
                min="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookingNotice">Préavis de réservation</Label>
            <select
              id="bookingNotice"
              value={formData.bookingNotice}
              onChange={(e) => onUpdateField('bookingNotice', e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {BOOKING_NOTICE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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