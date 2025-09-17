/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSession } from "next-auth/react";

export interface RealEstateRegistrationData {
  // User info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;

  // Property info
  title: string;
  description: string;
  propertyType: string;
  address: string;
  country: string;
  city: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  totalRooms: number;
  propertySize: number; // m² or ft²
  basePrice: number; // user-provided before estimation

  // Matterport
  matterportUrl: string;
  filmingDate: string; // ISO date string (e.g. 2025-09-15T10:00:00Z)
  notes: string;
  // matterportScan will be filled after upload/scan

  // Media
  images:  File[];

  // Features
  amenities: string[];
  additionalServices: string[];
}

const initialFormData: RealEstateRegistrationData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
  acceptPrivacy: false,

  title: "",
  description: "",
  propertyType: "",
  address: "",
  country: "Maroc",
  city: "",
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  totalRooms: 1,
  propertySize: 0,
  basePrice: 0,

  matterportUrl: "",
  filmingDate: "",
  notes: "",

  images: [],
  amenities: [],
  additionalServices: [],
};

export const useRealEstateRegistrationForm = () => {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RealEstateRegistrationData>({
    ...initialFormData,
    email: session?.user?.email || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update session email
  React.useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({ ...prev, email: session.user.email || "" }));
    }
  }, [session?.user?.email]);

  const updateFormData = (
    field: keyof RealEstateRegistrationData,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // User info
        if (!formData.firstName.trim())
          newErrors.firstName = "Le prénom est requis";
        if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
        if (!formData.email.trim()) newErrors.email = "L’email est requis";
        if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis";
        if (!formData.password)
          newErrors.password = "Le mot de passe est requis";
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        }
        if (!formData.acceptTerms)
          newErrors.acceptTerms = "Vous devez accepter les conditions";
        if (!formData.acceptPrivacy)
          newErrors.acceptPrivacy =
            "Vous devez accepter la politique de confidentialité";
        break;

      case 2: // Property details
        if (!formData.title.trim()) newErrors.title = "Le titre est requis";
        if (!formData.propertyType)
          newErrors.propertyType = "Le type de propriété est requis";
        if (!formData.address.trim())
          newErrors.address = "L’adresse est requise";
        if (!formData.country.trim()) newErrors.country = "Le pays est requis";
        if (!formData.city.trim()) newErrors.city = "La ville est requise";
        if (formData.propertySize <= 0)
          newErrors.propertySize = "La superficie est requise";
        if (!formData.description.trim())
          newErrors.description = "La description est requise";
        break;

      case 3: // Amenities
        if (formData.amenities.length === 0) {
          newErrors.amenities = "Sélectionnez au moins un équipement";
        }
        break;

      case 4: // Photos
        if (formData.images.length !== 0) {
          newErrors.images = "Ajoutez au moins une photo";
        }
        break;

      case 5: // Matterport appointment
        if (!formData.filmingDate) {
          newErrors.filmingDate = "Choisissez une date de tournage";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
   
      setCurrentStep(prev => Math.min(prev + 1, 8));
       console.log(currentStep)
    
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
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
    return ((currentStep - 1) / 6) * 100;
  };

  return {
    currentStep,
    formData,
    errors,
    updateFormData,
    validateStep,
    goToStep,
    nextStep,
    prevStep,
    resetForm,
    getProgress,
  };
};
