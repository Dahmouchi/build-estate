/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { ArrowRight, Play } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import Link from "next/link";

const HeroSection = () => {
  const logos = [
    "/images/logov1.png",
    "/images/logov1.png",
    "/images/logov1.png",
    "/images/logov1.png",
  ];
  const words = [
    {
      text: "Une",
    },
    {
      text: "expérience",
    },
    {
      text: "unique",
      className: "text-orange-400 dark:text-blue-500",
    },
  ];

  return (
  <div className="relative min-h-screen bg-white overflow-hidden">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 relative h-screen w-full text-black"
        style={{
          backgroundImage: "url(/images/Vector1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2 flex flex-col justify-center max-w-none sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl lg:pl-16 md:pl-8 sm:pl-4 p-2 mt-6 gap-2 sm:gap-3 md:gap-4 lg:gap-4">
          <div className="text-center sm:text-center md:text-left lg:text-left">
            <div className="flex justify-center sm:justify-center md:justify-start lg:justify-start">
              <TypewriterEffectSmooth
                words={words}
                className="text-2xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl font-bold font-poppins uppercase"
              />
            </div>

            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-poppins leading-tight sm:leading-tight md:leading-normal lg:leading-16">
              Vos Espaces en
              <span className="bg-gradient-to-r px-1 sm:px-2 from-[#f6ba13] to-orange-400 bg-clip-text text-transparent">
                3D
              </span>{" "}
              , Vivants et Immersifs
            </h1>
          </div>

          <h1 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl text-slate-500 text-center sm:text-center md:text-left lg:text-left font-poppins px-2 sm:px-0">
            Redéfinissez la façon dont vos clients découvrent vos biens, hôtels et projets au MONDE ENTIER
          </h1>

          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center sm:justify-center md:justify-start lg:justify-start items-center gap-2 sm:gap-3 md:gap-4 lg:gap-4">
            <Link
              href={"#contact"}
              className="flex justify-between items-center w-fit sm:w-fit max-w-xs sm:max-w-sm md:max-w-md mt-2 sm:mt-3 md:mt-4 bg-[#FCA311] rounded-full text-center pl-4 sm:pl-5 md:pl-6 pr-1 sm:pr-2 py-2 gap-4 sm:gap-6 md:gap-8"
            >
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-adlamn">
                Remplissez le formulaire
              </div>
              <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-orange-300 text-white text-center flex items-center justify-center">
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </div>
            </Link>
            <Link
              href={"#demo"}
              className="flex justify-between items-center w-fit sm:w-fit max-w-xs sm:max-w-sm md:max-w-md mt-2 sm:mt-3 md:mt-4 border border-[#FCA311]/50 rounded-full text-center pl-1 sm:pl-2 pr-4 sm:pr-5 md:pr-6 py-2 gap-2 sm:gap-3 md:gap-4"
            >
              <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-[#FCA311] text-white text-center flex items-center justify-center">
                <Play className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </div>
              <div className="text-sm sm:text-base md:text-lg lg:text-xl font-adlamn">Demo</div>
            </Link>
          </div>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 bg-gradient-to-r from-[#f6ba13] to-orange-400 p-4 sm:p-6 md:p-8 shadow-lg flex flex-col justify-center h-full relative">
          {/* Desktop and large tablet image */}
          <motion.img
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 4,
              ease: "easeInOut",
            }}
            src="/images/steps/test1.png"
            alt=""
            className="hidden md:block w-full max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[470px] z-50 h-auto absolute bottom-0 left-1/2 transform -translate-x-1/2"
          />

          {/* Mobile and small tablet image */}
          <motion.img
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 4,
              ease: "easeInOut",
            }}
            src="/images/test2.png"
            alt=""
            className="block md:hidden w-11/12  sm:max-w-[320px] h-auto absolute bottom-0 left-1/2 transform -translate-x-1/2"
          />
        </div>
      </div>

      <div className="flex flex-col antialiased bg-gradient-to-r from-[#f6ba13] to-orange-400 items-center justify-between relative overflow-hidden py-4 sm:py-6 md:py-8">
        <h1></h1>
        {/* Scrolling container<InfiniteMovingCards
        items={logos}
        direction="right"
        speed="fast"
      /> */}
      </div>
    </div>
  );
};

export default HeroSection;
