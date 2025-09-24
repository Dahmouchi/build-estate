/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, PiggyBank, BarChart3, PlayCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const Demo = () => {
  const modelId = "UoqjwziqrZs"; // Replace with your actual Matterport model ID
  const mpUrl = useMemo(() => {
    const base = "https://my.matterport.com/show/";
    const params = new URLSearchParams({
      m: modelId,
      play: "0",
      brand: "0",
      qs: "1",
      title: "0",
      dh: "1",
    }).toString();
    return `${base}?${params}`;
  }, [modelId]);
  const mpUrlM = useMemo(() => {
    const base = "https://my.matterport.com/show/";
    const params = new URLSearchParams({
      m: modelId,
      play: "1",
      brand: "0",
      qs: "1",
      title: "0",
      dh: "1",
    }).toString();
    return `${base}?${params}`;
  }, [modelId]);
  const [open, setOpen] = useState(false);

  const stats = [
    {
      number: "1",
      title: "-50 % de déplacements",
      text: "Grâce aux visites virtuelles interactives.",
      icon: MapPin,
    },
    {
      number: "2",
      title: "+80 % d’engagement client",
      text: "Des espaces qui captivent et retiennent l’attention.",
      icon: Users,
    },
    {
      number: "3",
      title: "+70 % d’économies",
      text: "Sur les frais de relevés terrain et la création de fichiers BIM.",
      icon: PiggyBank,
    },
  ];

  return (
    <section className=" relative overflow-hidden bg-white  py-6 px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center lg:mt-16 mt-8"
      >
        <h2 className="text-4xl md:text-6xl font-bold dark:text-white mb-6 text-black">
          Pourquoi
          <span className="bg-gradient-to-r pl-2 from-orange-400 to-orange-600 bg-clip-text text-transparent">
            la visite virtuelle 3D
          </span>{" "}
          change tout ?
        </h2>
        <p className="lg:text-xl text-md dark:text-gray-300 text-gray-500 max-w-3xl mx-auto">
          De la capture à la diffusion, découvrez comment nous transformons vos
          espaces en expériences 3D immersives en quelques étapes simples
        </p>
      </motion.div>

      <section className="relative overflow-hidden py-14 lg:py-24 lg:px-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left column — Steps */}
          <div className="space-y-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                data-aos="fade-right"
                className="flex items-start space-x-5 group"
              >
                {/* Number circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r text-white from-[#f6ba13] to-orange-400 font-bold grid place-items-center shadow-md ring-4 ring-white/20">
                    {stat.number}
                  </div>
                  {/* connector line (desktop) */}
                  {i < stats.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 top-12 -translate-x-1/2 h-10 w-[2px] bg-black/30" />
                  )}
                </div>

                {/* Text */}
                <div className="transition-transform duration-200 group-hover:-translate-y-0.5">
                  <h3 className="text-gray-700 lg:font-black text-2xl font-bold lg:text-3xl flex items-center gap-2">
                    <span>{stat.title}</span>
                  </h3>
                  <p className="text-orange-400 text-md lg:text-lg font-light mt-1">
                    {stat.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right column — Matterport player with Play overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="relative rounded-2xl lg:block hidden overflow-hidden shadow-2xl ring-1 ring-white/10"
          >
            <div className="aspect-[16/9]">
              <iframe
                src={mpUrl}
                className="absolute inset-0 w-full h-full"
                title="Matterport Virtual Tour"
                allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; autoplay"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Mobile → trigger button/card that opens dialog */}
          <div className="block lg:hidden p-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  viewport={{ once: true }}
                  className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                >
                  {/* Thumbnail / Preview overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent flex items-center justify-center text-white font-medium"
                    style={{
                      backgroundImage:
                        "url('https://images.squarespace-cdn.com/content/v1/67d65f56ec463a6e9aff64be/5726358c-b613-4fd2-8c17-77f70812a357/SlavaBlazerPhotography_RealEstatePhotography103.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <PlayCircle className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </motion.button>
              </DialogTrigger>

              <DialogContent className="max-w-full w-11/12 h-[70vh] p-0 ">
                <iframe
                  src={mpUrlM}
                  className="w-full h-full rounded-lg"
                  title="Matterport Virtual Tour"
                  allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; autoplay"
                  allowFullScreen
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Demo;
