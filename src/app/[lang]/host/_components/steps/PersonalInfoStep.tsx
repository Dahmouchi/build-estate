/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HostRegistrationData } from '@/lib/types';
import { Eye, EyeOff } from 'lucide-react';

interface PersonalInfoStepProps {
  formData: HostRegistrationData;
  errors: Record<string, string>;
  onUpdateField: (field: keyof HostRegistrationData, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  errors,
  onUpdateField,
  onNext,
  onPrev
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  
  return (
    <div className="w-full mx-auto lg:p-10">
      <Card className='border-2 border-amber-600/50 shadow-lg bg-white'>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Vos informations personnelles
          </CardTitle>
          <p className="text-center text-gray-600">
            Ces informations nous permettront de créer votre profil d&apos;hôte
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => onUpdateField('firstName', e.target.value)}
                placeholder="Votre prénom"
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => onUpdateField('lastName', e.target.value)}
                placeholder="Votre nom"
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Adresse e-mail *</Label>
            <Input
              disabled
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onUpdateField('email', e.target.value)}
              placeholder="votre.email@exemple.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Numéro de téléphone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => onUpdateField('phone', e.target.value)}
              placeholder="+33 6 12 34 56 78"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => onUpdateField('password', e.target.value)}
                placeholder="Créez un mot de passe sécurisé"
                className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => onUpdateField('confirmPassword', e.target.value)}
                placeholder="Confirmez votre mot de passe"
                className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={(e) => onUpdateField('acceptTerms', e.target.checked)}
                className="mt-1"
              />
              <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                J&apos;accepte les{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  conditions générales d&apos;utilisation
                </a>
              </Label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-500">{errors.acceptTerms}</p>
            )}

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="acceptPrivacy"
                checked={formData.acceptPrivacy}
                onChange={(e) => onUpdateField('acceptPrivacy', e.target.checked)}
                className="mt-1"
              />
              <Label htmlFor="acceptPrivacy" className="text-sm leading-relaxed">
                J&apos;ai lu et j&apos;accepte la{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  politique de confidentialité
                </a>
              </Label>
            </div>
            {errors.acceptPrivacy && (
              <p className="text-sm text-red-500">{errors.acceptPrivacy}</p>
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