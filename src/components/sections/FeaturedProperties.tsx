/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import * as LucideIcons from "lucide-react";
import { useMemo } from 'react';


interface FeaturedPropertiesProps {
  data: {
    title: string;
    subtitle: string;
    button: string;
  };
  lang:string;
  properties:any[];
}
export default function FeaturedProperties({ data,lang,properties }: FeaturedPropertiesProps) {
     function IconPreview({
       name,
       className,
     }: {
       name?: string | null;
       className?: string;
     }) {
       const map = useMemo(() => ({ ...LucideIcons }), []);
   
       const Cmp: any = name && (map as any)[name as keyof typeof map];
       return Cmp ? (
         <Cmp className={className ?? "h-4 w-4"} />
       ) : (
         <LucideIcons.Shapes className={className ?? "h-4 w-4"} />
       );
     }
  return (
     <section className="py-16 md:py-24 bg-[#e9e7d6]" id='properties'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties?.slice(0,6).map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`${lang}/properties/${property.id}`}>
                <Card className="border pt-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden bg-white">
                  {/* Image */}
                  <div className="relative ">
                    <motion.img
                      src={
                        property.images?.[0]
                          ? `${property.images?.[0]}`
                          : "/images/placeholder.png"
                      }
                      alt={property.title}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    {property.type && (
                      <Badge className="absolute top-4 left-4 bg-[#244B35] hover:bg-teal-700 text-white">
                        {property.type}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="">
                    {/* Title and Location */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-1">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-slate-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {property.city}, {property.country}
                        </span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center space-x-4 mb-4">
                      {property.amenities
                        .slice(0, 3)
                        .map((amenity: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center space-x-1 text-slate-500"
                          >
                            <IconPreview
                              name={amenity.amenity.icon}
                              className="h-5 w-5"
                            />
                            <span className="text-xs">
                              {amenity.amenity.name}
                            </span>
                          </div>
                        ))}

                      {property.amenities.length > 3 && (
                        <span className="text-xs text-slate-400">
                          +{property.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Price and Reviews */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-slate-800">
                          {property.pricePerNight} MAD
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">
                        {property.reviews} avis
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12 w-full flex items-center justify-center">
          <Link href={`/${lang}/properties`} className='w-fitt'>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#244B35] w-fit hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {data.button}
          </motion.div></Link>
        </div>
      </div>
    </section>
  );
}

