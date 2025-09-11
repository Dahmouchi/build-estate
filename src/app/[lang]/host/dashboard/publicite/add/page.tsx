/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { createPropertyAndUpdateUser, UpdateToHost } from "@/actions/host";

// Steps Components
import { PropertyDetailsStep } from "../../../_components/propertySteps/PropertyDetailsStep";
import { AmenitiesStep } from "../../../_components/propertySteps/AmenitiesStep";
import { PhotosStep } from "../../../_components/propertySteps/PhotosStep";
import { AvailabilityStep } from "../../../_components/propertySteps/AvailabilityStep";
import { PricingStep } from "../../../_components/propertySteps/PricingStep";
import { ReviewAndPublishStep } from "../../../_components/propertySteps/ReviewAndPublishStep";
import { ProgressIndicator } from "../../../_components/propertySteps/ProgressIndicator";
import { usePropertyForm } from "@/hooks/useAddPropertieForm";
import { createProperty } from "@/actions/properties";

function App() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [isPending, startTransition] = useTransition();

  const {
    currentStep,
    formData,
    errors,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    getProgress,
  } = usePropertyForm();

  /** ----------------
   *  Handle Finish
   * ---------------- */
  const finish = async () => {
    if (!session) return;
    startTransition(async () => {
      const result = await createProperty(formData, session.user.id);

      if (result.success) {
          toast.success(
            "Félicitations ! Votre annonce a été publiée avec succès !"
          );
          router.push("/host/dashboard/publicite");
        }
    });
  };

  /** ----------------
   *  Render Step
   * ---------------- */
  const renderStep = () => {
    const stepProps = {
      formData,
      errors,
      onUpdateField: updateFormData,
      onNext: nextStep,
      onPrev: prevStep,
    };

    switch (currentStep) {
      case 1:
        return <PropertyDetailsStep {...stepProps} />;
      case 2:
        return <AmenitiesStep {...stepProps} />;
      case 3:
        return <PhotosStep {...stepProps} />;
      case 4:
        return <AvailabilityStep {...stepProps} />;
      case 5:
        return <PricingStep {...stepProps} />;
      case 6:
        return (
          <ReviewAndPublishStep
            formData={formData}
            onNext={finish}
            onPrev={prevStep}
            goToStep={goToStep}
          />
        );
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Étape inconnue</h2>
            <p className="text-gray-600 mb-8">
              Veuillez revenir à la première étape.
            </p>
            <button
              onClick={() => goToStep(1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Retour à l&apos;accueil
            </button>
          </div>
        );
    }
  };

  /** ----------------
   *  Render App
   * ---------------- */
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        Nouvelle propriété
      </h1>
      <h2 className="text-sm text-muted-foreground">
        Complétez les étapes pour créer votre annonce.
      </h2>
      <div className="my-4">
        <ProgressIndicator current={currentStep} progress={getProgress()} />
      </div>
      {/* Main Content */}
      <main>{renderStep()}</main>
    </div>
  );
}

export default App;
