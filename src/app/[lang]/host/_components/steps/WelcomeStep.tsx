"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    title: "Étape 1",
    heading: "Parlez-nous de votre logement",
    description:
      "Au cours de cette étape, nous allons vous demander quel type de logement vous proposez et si les voyageurs pourront le réserver dans son intégralité ou si vous ne louez qu'une chambre. Nous vous demanderons ensuite d'indiquer son emplacement et sa capacité d'accueil.",
    image: "/images/step1.png",
  },
  {
    title: "Étape 2",
    heading: "Ajoutez des photos",
    description:
      "Les photos aident vos voyageurs à mieux comprendre votre logement. Téléchargez des images claires et représentatives.",
    image: "/images/step2.jpg",
  },
  {
    title: "Étape 3",
    heading: "Fixez votre prix",
    description:
      "Indiquez un prix pour votre logement. Vous pourrez toujours l'ajuster plus tard en fonction de la demande.",
    image: "/images/room.png",
  },
];
interface WelcomeStepProps {
  onNext: () => void;
}
export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="max-h-screen  bg-white">
      {/* Top Nav */}
      <div className="h-screen w-full flex flex-col justify-between">
        <header className="flex justify-between items-center p-4 border-b">
           <Link href={"/"} className="cursor-pointer"> <Image src="/images/logov1.png" alt="Logo" width={82} height={82} /></Link>
          <div className="flex gap-2 lg:text-md text-xs">
            <button className="px-4 py-2 border rounded-full">
              Des questions ?
            </button>
            <button className="px-4 py-2 border rounded-full">
              Enregistrer et quitter
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 container mx-auto px-8 py-12 flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left text */}
          <motion.div
            key={step.heading} // triggers animation when step changes
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 max-w-2xl"
          >
            <motion.h3
              className="text-gray-600 mb-3 text-lg md:text-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {step.title}
            </motion.h3>

            <motion.h1
              className="font-bold mb-6 text-3xl sm:text-4xl md:text-5xl leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }} // interactive effect
            >
              {step.heading}
            </motion.h1>

            <motion.p
              className="text-gray-700 text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {step.description}
            </motion.p>
          </motion.div>

          {/* Right image */}
          <div className="flex-1 flex justify-center">
            <motion.div
              key={step.image} // ensures animation triggers on step change
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.img
                src={step.image}
                alt={step.title}
                width={400}
                height={300}
                className="rounded-xl "
                animate={{ scale: [1, 1.05, 1] }} // breathing effect
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </main>

        {/* Footer Navigation */}
        <footer className="flex flex-col gap-4 p-4 border-t">
          {/* Progress bars */}
          <div className="flex justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-16 rounded-full transition-all duration-500 ${
                  index <= currentStep ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Nav buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="text-gray-600 hover:underline disabled:opacity-50"
            >
              Retour
            </button>
            <button
              onClick={handleNext}
              className="bg-black text-white px-6 py-2 rounded-lg"
            >
              {currentStep === steps.length - 1 ? "Terminer" : "Suivant"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
