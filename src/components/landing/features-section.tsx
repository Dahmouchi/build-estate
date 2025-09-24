/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { motion } from "framer-motion";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { 
  Rotate3d, 
  Eye, 
  Share2, 
  Zap, 
  Shield, 
  Smartphone,
  Camera,
  Globe,
  Download
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Scan 3D Ultra-Précis",
      description: "Technologie de pointe pour capturer chaque détail avec une précision millimétrique. Qualité professionnelle garantie.",
      link: "#",
      icon: <Rotate3d className="w-8 h-8" />,
    },
    {
      title: "Visite Virtuelle Immersive",
      description: "Explorez vos espaces en 3D avec une navigation fluide et intuitive. Expérience utilisateur exceptionnelle.",
      link: "#ff",
      icon: <Eye className="w-8 h-8" />,
    },
    {
      title: "Partage Instantané",
      description: "Partagez vos créations 3D en un clic sur toutes les plateformes. Intégration sociale complète.",
      link: "#aa",
      icon: <Share2 className="w-8 h-8" />,
    },
    {
      title: "Traitement Rapide",
      description: "IA avancée pour un traitement ultra-rapide de vos scans. Résultats en quelques heures seulement.",
      link: "#dd",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "Sécurité Maximale",
      description: "Vos données sont protégées par un chiffrement de niveau militaire. Confidentialité absolue.",
      link: "#gg",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: "Compatible Mobile",
      description: "Accédez à vos scans 3D depuis n'importe quel appareil. Responsive design optimisé.",
      link: "#hhh",
      icon: <Smartphone className="w-8 h-8" />,
    },
  ];

  const advancedFeatures = [
    {
      title: "Capture 4K HDR",
      description: "Qualité d'image exceptionnelle avec support HDR pour des couleurs éclatantes et des détails saisissants.",
      icon: <Camera className="w-12 h-12 text-blue-400" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Cloud Global",
      description: "Stockage sécurisé dans le cloud avec accès mondial instantané à vos projets 3D.",
      icon: <Globe className="w-12 h-12 text-purple-400" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Export Multi-Format",
      description: "Exportez vos scans dans tous les formats populaires : OBJ, PLY, FBX, et plus encore.",
      icon: <Download className="w-12 h-12 text-green-400" />,
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Fonctionnalités{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Révolutionnaires
            </span>
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez les technologies de pointe qui font de notre plateforme 
            la solution 3D la plus avancée du marché
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div
         
          className="mb-20"
        >
          <HoverEffect items={features} />
        </div>

        {/* Advanced Features with 3D Cards 
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {advancedFeatures.map((feature, index) => (
            <CardContainer key={index} className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white mb-4"
                >
                  {feature.title}
                </CardItem>
                
                <CardItem
                  translateZ="60"
                  className="flex justify-center mb-6"
                >
                  <div className={`p-4 rounded-full bg-gradient-to-r ${feature.gradient} bg-opacity-20`}>
                    {feature.icon}
                  </div>
                </CardItem>
                
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center"
                >
                  {feature.description}
                </CardItem>
                
                <CardItem
                  translateZ={20}
                  as="button"
                  className={`px-4 py-2 rounded-xl bg-gradient-to-r ${feature.gradient} text-white text-xs font-bold mt-6 w-full hover:scale-105 transition-transform duration-200`}
                >
                  En Savoir Plus
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </motion.div>*/}

       
      </div>
    </section>
  );
};

export default FeaturesSection;

