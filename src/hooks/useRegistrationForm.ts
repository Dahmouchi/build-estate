/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { HostRegistrationData } from '@/lib/types';
import { useSession } from 'next-auth/react';

const initialFormData: HostRegistrationData = {
  // Informations personnelles
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  acceptPrivacy: false,
  country:'',
  city:'',
  // Détails de la propriété
  propertyType: '',
  address: '',
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  maxGuests: 2,
  description: '',

  // Équipements et services
  amenities: [],
  additionalServices: [],

  // Photos
  images: [],

  // Disponibilité
  availabilityCalendar: [],
  minStayDuration: 1,
  maxStayDuration: 30,
  bookingNotice: 'none',

  // Tarification
  pricePerNight: 50,
  seasonalPricing: false,
  longStayDiscounts: false,
};

export const useRegistrationForm = () => {
  const { data: session } = useSession();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<HostRegistrationData>({
    ...initialFormData,
    email: session?.user?.email || ''  // pre-fill email from session
  });

  // Update email if session changes after mount
  React.useEffect(() => {
    if (session?.user?.email) {
      setFormData(prev => ({ ...prev, email: session.user.email || ""}));
    }
  }, [session?.user?.email]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: keyof HostRegistrationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 2: // Informations personnelles
        if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
        if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
        if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
        if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
        if (!formData.password) newErrors.password = 'Le mot de passe est requis';
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        if (!formData.acceptTerms) newErrors.acceptTerms = 'Vous devez accepter les conditions';
        if (!formData.acceptPrivacy) newErrors.acceptPrivacy = 'Vous devez accepter la politique de confidentialité';
        break;

      case 3: // Détails de la propriété
        if (!formData.propertyType) newErrors.propertyType = 'Le type de propriété est requis';
        if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
         if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
        if (!formData.country.trim()) newErrors.country = 'L\'adresse est requise';
        if (!formData.description.trim()) newErrors.description = 'La description est requise';
        break;

      case 4: // Équipements
        if (formData.amenities.length === 0) {
          newErrors.amenities = 'Sélectionnez au moins un équipement';
        }
        break;

      case 5: // Photos
        if (formData.images.length === 0) {
          newErrors.images = 'Ajoutez au moins une photo';
        }
        break;

      case 7: // Tarification
        if (formData.pricePerNight <= 0) {
          newErrors.pricePerNight = 'Le prix doit être supérieur à 0';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 8));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setErrors({});
  };

  const getProgress = () => {
    return ((currentStep - 1) / 7) * 100;
  };

  return {
    currentStep,
    formData,
    errors,
    updateFormData,
    validateStep,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    getProgress
  };
};