/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { PropertyData } from "@/lib/types";
import { usePropertyForm } from "./useAddPropertieForm";

export function useUpdatePropertyForm(property: PropertyData) {
  const {
    formData,
    updateFormData,
    currentStep,
    errors,
    nextStep,
    prevStep,
    goToStep,
    validateStep,
    getProgress
  } = usePropertyForm();

  // Fill form when property is loaded
 
  return {
    formData,
    updateFormData,
    currentStep,
    errors,
    nextStep,
    prevStep,
    goToStep,
    validateStep,
    getProgress,
  };
}
