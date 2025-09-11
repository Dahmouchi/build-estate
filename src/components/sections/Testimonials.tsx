/* eslint-disable @next/next/no-img-element */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Marie Dubois',
    location: 'Paris, France',
    rating: 5,
    comment: 'Une expérience exceptionnelle ! L\'appartement était exactement comme sur les photos, propre et bien situé. Je recommande vivement !',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    property: 'Villa moderne avec vue sur mer'
  },
  {
    id: 2,
    name: 'Thomas Martin',
    location: 'Lyon, France',
    rating: 5,
    comment: 'Séjour parfait en famille ! La maison était spacieuse, bien équipée et dans un quartier calme. Les enfants ont adoré la piscine. Nous reviendrons certainement !',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    property: 'Maison de campagne charme'
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    location: 'Marseille, France',
    rating: 5,
    comment: 'Excellent rapport qualité-prix ! Le studio était parfait pour un week-end en amoureux. Très bien décoré et idéalement situé pour visiter la ville. Service client au top !',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    property: 'Studio moderne quartier branché'
  },
  {
    id: 4,
    name: 'Pierre Moreau',
    location: 'Nice, France',
    rating: 5,
    comment: 'Voyage d\'affaires réussi grâce à ce logement. Connexion WiFi excellente, espace de travail confortable et proche du centre. L\'hôte a été très professionnel.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    property: 'Loft industriel design'
  },
  {
    id: 5,
    name: 'Julie Rousseau',
    location: 'Toulouse, France',
    rating: 5,
    comment: 'Week-end magique à la montagne ! Le chalet était chaleureux et authentique. Vue imprenable sur les sommets. L\'expérience parfaite pour se ressourcer.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    property: 'Chalet montagne authentique'
  },
  {
    id: 6,
    name: 'Antoine Leroy',
    location: 'Bordeaux, France',
    rating: 5,
    comment: 'Première fois sur cette plateforme et je suis conquis ! Réservation simple, communication fluide avec l\'hôte, et logement impeccable. Bravo !',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    property: 'Appartement cosy centre-ville'
  }
];
interface Testimo {
  data: {
    title: string;
    subtitle: string;
    stats: {
      value: string;
      label: string;
    }[];
  };
}
export default function Testimonials({ data }: Testimo) {
  return (
     <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ scale: 1.03, y: -5 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-[#244B35] opacity-50" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <Star
                        key={index}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-slate-700 mb-6 leading-relaxed">
                    &quot;{testimonial.comment}&quot;
                  </p>

                  {/* User Info */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-full w-full object-cover rounded-full"
                      />
                    </Avatar>
                    <div>
                      <div className="font-semibold text-slate-800">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-600">
                        {testimonial.location}
                      </div>
                      <div className="text-xs text-[#244B35] font-medium">
                        {testimonial.property}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {data.stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-[#244B35]">
                {item.value}
              </div>
              <div className="text-slate-600">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

