/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Camera,
  Sparkles,
  Sliders,
  Share2,
  Headphones,
} from "lucide-react";

export default function ProcessSteps() {
  const steps = [
    {
      number: "1",
      title: "Prise de rendez-vous",
      text: "Nous planifions ensemble la date et l’heure du scan, selon vos disponibilités.",
      icon: Calendar,
    },
    {
      number: "2",
      title: "Scan 3D sur site",
      text: "Grâce à notre matériel de pointe, nous capturons chaque détail de votre espace.",
      icon: Camera,
    },
    {
      number: "3",
      title: "Traitement & optimisation",
      text: "Transformation en visite virtuelle interactive, avec photos HDR, plans 2D/3D et tags personnalisés.",
      icon: Sparkles,
    },
    {
      number: "4",
      title: "Validation & personnalisation",
      text: "Vous visualisez le rendu et nous adaptons logos, vidéos, informations et points d’intérêt.",
      icon: Sliders,
    },
    {
      number: "5",
      title: "Livraison finale",
      text: "Lien prêt à partager et intégrer sur votre site, annonces, Airbnb, Booking ou Google Maps.",
      icon: Share2,
    },
    {
      number: "6",
      title: "Support & mises à jour",
      text: "Nous restons disponibles pour toute mise à jour ou assistance technique.",
      icon: Headphones,
    },
  ];

  return (
    <section className="relative overflow-hidden  py-10">
      {/* Brand accents */}
      <div className="pointer-events-none absolute hidden lg:block -top-24 -right-24 h-80 w-80 rounded-full bg-[#f6ba13]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center lg:mt-16 mt-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold dark:text-white mb-6 text-black">
            Comment{" "}
            <span className="bg-gradient-to-r pl-2 from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Build
            </span>
            360 Procéde
          </h2>
          <p className="lg:text-xl text-md dark:text-gray-300 text-gray-500 max-w-3xl mx-auto">
            Un parcours clair et transparent, de la prise de rendez-vous à la
            livraison, avec un accompagnement continu.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            {/* vertical line (left column) */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#f6ba13]/40 via-orange-400/40 to-orange-600/30" />
            {steps.slice(0, 3).map((step, i) => (
              <StepCard step={step} index={i} key={step.title} />
            ))}
          </div>

          <div className="relative">
            {/* vertical line (right column) */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#f6ba13]/40 via-orange-400/40 to-orange-600/30"
            />
            {steps.slice(3).map((step, i) => (
              <StepCard step={step} index={i + 3} key={step.title} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-white shadow-lg transition 
                       bg-gradient-to-r from-[#f6ba13] via-orange-400 to-orange-600 hover:brightness-110"
          >
            Demander mon devis gratuit
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/** Single step card */
function StepCard({
  step,
  index,
}: {
  step: {
    number: string;
    title: string;
    text: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };
  index: number;
}) {
  return (
    <div className="relative pl-16 pb-10 last:pb-0">
      {/* number badge */}
      <div className="absolute left-0 top-0">
        <div
          className="grid place-items-center h-12 w-12 rounded-full text-white font-bold shadow-lg ring-4 ring-white/10
                        bg-gradient-to-br from-[#f6ba13] via-orange-400 to-orange-600"
        >
          {step.number}
        </div>
      </div>

      {/* card */}
      <div
        className="group rounded-2xl border border-black/10 bg-orange-500/5 backdrop-blur-sm p-5 
                   transition hover:-translate-y-0.5 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-black/30"
      >
        <div className="flex items-start gap-3">
          <div
            className="rounded-xl p-2 text-white shadow-md
                       bg-gradient-to-tr from-[#f6ba13] via-orange-400 to-orange-600"
          >
            <step.icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-black font-semibold text-lg">{step.title}</h3>
            <p className="mt-1 text-slate-500 leading-relaxed">{step.text}</p>
          </div>
        </div>

        {/* subtle progress glow */}
        <div className="mt-4 h-1 w-full rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15 }}
            className="h-full bg-gradient-to-r from-[#f6ba13] via-orange-400 to-orange-600"
          />
        </div>
      </div>
    </div>
  );
}
