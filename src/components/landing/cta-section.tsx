/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, CheckCircle } from "lucide-react";

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
    city: "",
    objectives: "",
    surface: "",
    link: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      {/* 
       const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });*/}
      const res2 = await fetch(
        "http://localhost:3001/fr/api/reservations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "John Doe",
            email: "john@example.com",
            phone: "+123456789",
            projectType: "Apartment",
            message: "Interested in consultation",
            city: "Casablanca",
            objectives: "Investment",
            surface: "120m²",
            link: "https://example.com/project",
          }),
        }
      );

      if (res2.ok) {
        alert("✅ Email sent successfully");
      } else {
        console.error("❌ Failed to send email");
        console.log(res2);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      value: "06 64 09 10 68",
      description: "Lun-Ven 9h-18h",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "Contact@build360.ma ",
      description: "Réponse sous 2h",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Floating Elements */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Main CTA Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white  mb-6">
            Transformons Votre{" "}
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Vision
            </span>{" "}
            en Réalité 3D
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Prêt à révolutionner votre façon de présenter vos espaces ?
            Contactez-nous dès aujourd&apos;hui pour un devis personnalisé et
            gratuit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1  gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl lg:p-8 p-4 border border-gray-700 shadow-2xl">
              <h3 className="lg:text-2xl text-xl font-bold dark:text-white mb-6">
                Demandez votre devis{" "}
                <span className="text-amber-400 font-bold">Gratuit*</span>
              </h3>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informations de base */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        Nom & Prénom *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        Téléphone / WhatsApp *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                        placeholder="+212 6 12 34 56 78"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        Ville *
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                        placeholder="Ex: Casablanca, Marrakech..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        Type de projet *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-md px-3 py-2 focus:border-[#f6ba13] focus:outline-none"
                        required
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="immobilier">
                          Immobilier (vente / location)
                        </option>
                        <option value="hotel">Hôtel / Riad</option>
                        <option value="commerce">Commerce / showroom</option>
                        <option value="architecture">Architecture / BTP</option>
                        <option value="autre">
                          Autre (précisez ci-dessous)
                        </option>
                      </select>
                    </div>

                    {/* Surface */}
                    <div>
                      <label className="block text-gray-100 text-sm font-medium mb-2">
                        Surface approximative à scanner *
                      </label>
                      <select
                        name="surface"
                        value={formData.surface}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-md px-3 py-2 focus:border-[#f6ba13] focus:outline-none"
                        required
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="<100">{"< 100 m²"}</option>
                        <option value="100-300">100 – 300 m²</option>
                        <option value="300-600">300 – 600 m²</option>
                        <option value="600+">+600 m²</option>
                      </select>
                    </div>
                  </div>

                  {/* Type de projet */}

                  {/* Objectif principal */}
                  <div>
                    <label className="block text-gray-100 text-sm font-medium mb-2">
                      Objectif principal *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {[
                        "Visite virtuelle 3D",
                        "Photos HDR",
                        "Plan 2D / 3D",
                        "Export BIM",
                        "Vidéo promotionnelle",
                      ].map((obj) => (
                        <label
                          key={obj}
                          className="flex items-center space-x-2 text-gray-200"
                        >
                          <input
                            type="checkbox"
                            name="objectives"
                            value={obj}
                            checked={formData.objectives?.includes(obj)}
                            onChange={handleInputChange}
                            className="rounded border-gray-600 bg-gray-700/50 text-[#f6ba13] focus:ring-[#f6ba13]"
                          />
                          <span>{obj}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Détails complémentaires */}
                  <div>
                    <label className="block text-gray-100 text-sm font-medium mb-2">
                      Lien de site web (si existant)
                    </label>
                    <Input
                      type="url"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13]"
                      placeholder="votre site web"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-100 text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f6ba13] min-h-[120px]"
                      placeholder="informations supplémentaires ..."
                    />
                  </div>

                  {/* CTA */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r cursor-pointer from-[#f6ba13] to-orange-400 hover:from-orange-500 hover:to-orange-700 text-white py-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-102"
                  >
                    Demander mon devis gratuit
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-white mb-2">
                    Merci pour votre demande !
                  </h4>
                  <p className="text-gray-300">
                    Nous vous contacterons dans les plus brefs délais.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info & Quick Actions */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-[#f6ba13]/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-[#f6ba13] to-orange-400 rounded-lg text-white">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{info.title}</h4>
                    </div>
                  </div>
                  <p className="dark:text-gray-300 text-gray-50 font-medium">
                    {info.value}
                  </p>
                  <p className="dark:text-gray-500 text-slate-50 text-sm">
                    {info.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Action Buttons 
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>Appeler maintenant</span>
              </button>

              <button className="w-full bg-gradient-to-r from-[#f6ba13] to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>Envoyer un email</span>
              </button>
            </div>*/}
          </div>
        </div>

        {/* Bottom Stats 
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { number: "500+", label: "Projets réalisés" },
              { number: "99%", label: "Clients satisfaits" },
              { number: "24h", label: "Délai de réponse" },
              { number: "5★", label: "Note moyenne" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>*/}
      </div>
    </section>
  );
};

export default CTASection;
