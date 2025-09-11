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
import { WelcomeStep } from "../_components/steps/WelcomeStep";
import { PersonalInfoStep } from "../_components/steps/PersonalInfoStep";
import { PropertyDetailsStep } from "../_components/steps/PropertyDetailsStep";
import { AmenitiesStep } from "../_components/steps/AmenitiesStep";
import { PhotosStep } from "../_components/steps/PhotosStep";
import { AvailabilityStep } from "../_components/steps/AvailabilityStep";
import { PricingStep } from "../_components/steps/PricingStep";
import { ReviewAndPublishStep } from "../_components/steps/ReviewAndPublishStep";
import { ProgressIndicator } from "../_components/steps/ProgressIndicator";

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
  } = useRegistrationForm();

  /** ----------------
   *  Handle Finish
   * ---------------- */
  const finish = async () => {
    if (!session) return;
    startTransition(async () => {
      const result = await createPropertyAndUpdateUser(formData);

      if (result.success) {
        const res = await UpdateToHost(session?.user.id);

        if (res.success) {
          await update({ role: "HOST" });

          toast.success(
            "Félicitations ! Votre annonce a été publiée avec succès !"
          );

          router.push("/host/dashboard");
        }
      } else {
        toast.error("Erreur: " + result.error);
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
        return <WelcomeStep onNext={nextStep} />;
      case 2:
        return <PersonalInfoStep {...stepProps} />;
      case 3:
        return <PropertyDetailsStep {...stepProps} />;
      case 4:
        return <AmenitiesStep {...stepProps} />;
      case 5:
        return <PhotosStep {...stepProps} />;
      case 6:
        return <AvailabilityStep {...stepProps} />;
      case 7:
        return <PricingStep {...stepProps} />;
      case 8:
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
   *  Redirect if host or not logged in
   * ---------------- */
  
  useEffect(() => {
    if (session?.user.role === "HOST") {
      router.push("/host/dashboard");
    }
  }, [session, router]);

  if (!session) {
    router.push("/");
    return null;
  }

  /** ----------------
   *  Render App
   * ---------------- */
  return (
    <div className="min-h-screen relative bg-gray-50 w-full">
      {currentStep > 1 && (
        <div className="container mx-auto px-4">
          {/* Header */}
          <header className="flex justify-between items-center p-4 border-b bg-white z-50 relative">
            <Link href="/" className="cursor-pointer">
              <Image src="/images/logov1.png" alt="Logo" width={82} height={82} />
            </Link>

            <div className="flex gap-2 lg:text-md text-xs">
              <button className="px-4 py-2 border rounded-full">
                Des questions ?
              </button>
              <button className="px-4 py-2 border rounded-full">
                Enregistrer et quitter
              </button>
            </div>
          </header>

          {/* Progress Bar */}
         
        </div>
      )}
 {currentStep > 1 && (
          <div className="w-full h-full absolute top-0 z-10 bg-cover opacity-50" style={{backgroundImage:`url('/images/lines.png')`}}></div>

           )}
      {/* Main Content */}
      <main className={`${currentStep > 1 ? "relative z-20 flex flex-col lg:flex-row items-center p-4 gap-12" : ""} `} >
          
           {currentStep > 1 && currentStep < 8 && (
            <ProgressIndicator
            currentStep={currentStep}
            progress={getProgress()}
          />

           )}
           
          {renderStep()}</main>
    </div>
  );
}

export default App;
