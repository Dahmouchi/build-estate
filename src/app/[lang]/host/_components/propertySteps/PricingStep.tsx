/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyData } from '@/lib/types';

interface PricingStepProps {
  formData: PropertyData;
  errors: Record<string, string>;
  onUpdateField: (field: keyof PropertyData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PricingStep: React.FC<PricingStepProps> = ({
  formData,
  errors,
  onUpdateField,
  onNext,
  onPrev,
}) => {
  const estimatedMonthlyRevenue = formData.pricePerNight * 20; // Exemple simple: 20 nuits par mois

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Fixez votre prix par nuit
          </CardTitle>
          <p className="text-center text-gray-600">
            Définissez un tarif compétitif pour attirer les voyageurs.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pricePerNight">Prix par nuit (€) *</Label>
            <Input
              id="pricePerNight"
              type="number"
              value={formData.pricePerNight}
              onChange={(e) => onUpdateField('pricePerNight', parseFloat(e.target.value))}
              min="1"
              className={errors.pricePerNight ? 'border-red-500' : ''}
            />
            {errors.pricePerNight && (
              <p className="text-sm text-red-500">{errors.pricePerNight}</p>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-4 text-blue-800">
            <h3 className="font-semibold mb-2">Estimation de vos revenus potentiels</h3>
            <p className="text-sm">
              Avec un prix de {formData.pricePerNight}€ par nuit et un taux d&apos;occupation estimé de 60%,
              vous pourriez gagner environ <span className="font-bold">{estimatedMonthlyRevenue}€</span> par mois.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seasonalPricing">Options de tarification avancées</Label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="seasonalPricing"
                checked={formData.seasonalPricing}
                onChange={(e) => onUpdateField('seasonalPricing', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label htmlFor="seasonalPricing">Activer les tarifs saisonniers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="longStayDiscounts"
                checked={formData.longStayDiscounts}
                onChange={(e) => onUpdateField('longStayDiscounts', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label htmlFor="longStayDiscounts">Appliquer des réductions pour les longs séjours</Label>
            </div>
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