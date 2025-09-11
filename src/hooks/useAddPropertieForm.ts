/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from 'react';
import { PropertyData } from '@/lib/types';

const initialFormData: PropertyData = {
  // Détails de la propriété
  title:'',
  propertyType: '',
  country:'',
  city:'',
  address: '',
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  maxGuests: 2,
  description: '',
  googleMapsUrl:'',
  lat: 31.7917,
  lang:-7.0926,
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

export const usePropertyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: keyof PropertyData, value: any) => {
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
      case 1: // Détails de la propriété (première étape maintenant)
        if (!formData.title) newErrors.title = 'Le type de propriété est requis';
        if (!formData.propertyType) newErrors.propertyType = 'Le type de propriété est requis';
        if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
        if (!formData.country.trim()) newErrors.country = 'L\'adresse est requise';
        if (!formData.city.trim()) newErrors.city = 'L\'adresse est requise';
        if (!formData.googleMapsUrl.trim()) newErrors.googleMapsUrl = 'Le lien Google Maps est requis';
        if (!formData.description.trim()) newErrors.description = 'La description est requise';
        if (!formData.lat) newErrors.lat = 'Latitude est requise';
        if (!formData.lang) newErrors.lang = 'L angitude est requise';
        break;

      case 2: // Équipements
        if (formData.amenities.length === 0) {
          newErrors.amenities = 'Sélectionnez au moins un équipement';
        }
        break;

      case 3: // Photos
        if (formData.images.length === 0) {
          newErrors.images = 'Ajoutez au moins une photo';
        }
        break;

      case 5: // Tarification (étape ajustée)
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
      setCurrentStep(prev => Math.min(prev + 1, 6)); // Réduit de 8 à 6 étapes totales
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
    return ((currentStep - 1) / 5) * 100; // Ajusté pour 5 étapes au lieu de 7
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