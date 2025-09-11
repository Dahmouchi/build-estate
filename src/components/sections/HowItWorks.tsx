"use client";

import { motion } from "framer-motion";

interface HowItWorksProps {
  data: {
    steps: { title: string; description: string; img: string }[];
    title: string;
    subtitle: string;
    cta: string;
  };
  dir?: "ltr" | "rtl";
}

export default function HowItWorks({ data, dir = "ltr" }: HowItWorksProps) {
  return (
    <section className="bg-white" dir={dir}>
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 my-4">
            {data.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">
          {data.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
             
              className="relative flex w-80  flex-col rounded-xl border bg-white text-gray-700 shadow-md transform transition-all duration-300 hover:shadow-xl"
            >
              {/* Image */}
              <div
                className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-center shadow-lg"
                style={{
                  backgroundImage: `url('${step.img}')`,
                  backgroundSize: "cover",
                }}
              ></div>

              {/* Content */}
              <div className="p-6">
                <h5 className="mb-2 text-xl font-semibold text-slate-800">
                  {step.title}
                </h5>
                <p className="text-base text-slate-600">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 text-slate-600">
            <div className="w-8 h-0.5 bg-[#244B35]"></div>
            <span className="text-sm font-medium">{data.cta}</span>
            <div className="w-8 h-0.5 bg-[#244B35]"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
