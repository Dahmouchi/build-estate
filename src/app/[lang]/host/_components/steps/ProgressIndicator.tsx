"use client";

import React from "react";
import { motion } from "framer-motion";
import { REGISTRATION_STEPS } from "@/constant/data";
import Link from "next/link";
import Image from "next/image";

interface ProgressIndicatorProps {
  currentStep: number;
  progress: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  progress,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-10 px-4">
     
      <div className="flex justify-between items-center mb-4">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-medium text-gray-700"
        >
          Étape <span className="font-semibold text-[#244B35]">{currentStep}</span>{" "}
          sur {REGISTRATION_STEPS.length}
        </motion.div>

        <motion.div
          key={progress}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-medium text-gray-700"
        >
          {Math.round(progress)}% complété
        </motion.div>
      </div>

      {/* Progress + Steps */}
      <div className="flex flex-col md:items-start gap-6">
        {/* Progress bar (horizontal on mobile, vertical on desktop) */}
         <div className="relative w-full h-2 rounded-full bg-gray-200 mb-8 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#244B35] to-[#fe6100] rounded-full"
        />
      </div>

        {/* Steps indicators */}
       <div className="w-full flex justify-center">
         <div className="hidden md:grid lg:grid-cols-2 md:space-y-6 w-full ">
          {REGISTRATION_STEPS.map((step, index) => {
            const isCompleted = index + 1 < currentStep;
            const isCurrent = index + 1 === currentStep;

            return (
              <motion.div
                key={step.id}
                whileHover={{ scale: 1.05 }}
                className={`flex flex-col items-center text-center   place-items-center 
                            ${isCompleted || isCurrent ? "text-[#244B35]" : "text-gray-400"}`}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-2 shadow-md
                    ${
                      isCompleted
                        ? "bg-[#244B35] text-white"
                        : isCurrent
                        ? "bg-white text-[#244B35] border-2 border-[#244B35]"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {isCompleted ? "✓" : index + 1}
                </motion.div>

                <div className="text-sm font-semibold">{step.title}</div>
                <div className="text-xs text-gray-500 mt-1">{step.description}</div>
              </motion.div>
            );
          })}
        </div>
       </div>
      </div>
    </div>
  );
};


