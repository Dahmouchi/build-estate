/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { Search, Sparkles, Handshake, Box } from "lucide-react";

export default function AboutUsSteps() {
  const steps = [
    {
      number: "1",
      title: "Découverte",
      text: "Nous analysons vos besoins, votre audience et vos objectifs pour cadrer une vision claire et mesurable.",
      icon: Search,
    },
    {
      number: "2",
      title: "Conception",
      text: "Design de l'expérience, scénarisation et prototypage. Nous choisissons les meilleurs outils et parcours.",
      icon: Sparkles,
    },
    {
      number: "3",
      title: "Production",
      text: "Captation 3D, intégrations (Matterport/BIM), contenus interactifs et automatisations prêtes à scaler.",
      icon: Box,
    },
    {
      number: "4",
      title: "Accompagnement",
      text: "Formation, analytics et itérations continues pour des résultats durables et un ROI tangible.",
      icon: Handshake,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f6ba13] via-orange-400 to-orange-600 lg:py-20 lg:pt pt-10">
      {/* background accents */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-3xl" />
      <img
        src="/images/pro22.png"
        className="absolute bottom-0 right-2/3 lg:block hidden w-1/5"
        alt=""
        data-aos="fade-up"
        data-aos-delay="200"
      />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-12 items-start">
        {/* Left: Title & intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative "
        >
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white">
            Notre approche,{" "}
            <span className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent">
              étape par étape
            </span>
          </h2>
          <p className="mt-4 text-slate-50 leading-relaxed">
            Nous combinons design, 3D et technologie pour créer des expériences
            immersives à fort impact. Voici comment nous travaillons pour
            transformer vos idées en résultats concrets.
          </p>

          {/* value chips */}

          {/* CTA */}
          <div className="mt-8 flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-4 py-2.5 font-medium shadow-sm hover:shadow-md transition"
            >
              Parlons de votre projet
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-xl border border-white/50 px-4 py-2.5 text-white hover:bg-white/5 transition"
            >
              Voir nos réalisations
            </a>
          </div>
        </motion.div>

        {/* Right: Step-by-step timeline */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/15 to-white/5" />

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4"  data-aos="fade-up"
        data-aos-delay="100">
            {steps.map((step, i) => (
              <li
                key={step.title}
                
                className="relative last:pb-0 h-full w-full"
              >
                {/* number badge 
              <div className="absolute left-0 top-0">
                <div className="grid place-items-center h-12 w-12 rounded-full bg-white text-orange-700 font-semibold shadow ring-4 ring-white/10">
                  {step.number}
                </div>
              </div>*/}

                {/* card */}
                <div className="group h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-indigo-950/20">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl text-orange-500 bg-white p-2 shadow-md">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-white leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </motion.ul>
      </div>
      <div
        className="flex justify-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <img
          src="/images/pro22.png"
          className=" block lg:hidden w-2/3 mt-4"
          alt=""
        />
      </div>
    </section>
  );
}
