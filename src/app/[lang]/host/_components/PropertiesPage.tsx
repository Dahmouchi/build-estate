/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";
import { useMemo } from "react";

export default function PropertiesPage({ properties }: { properties: any }) {
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
    <div className="">
      <div className="flex items-center justify-between w-full lg:flex-row flex-col">
        <div>
          {" "}
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Mes Propriétés
          </h1>
          <h2 className="text-sm text-muted-foreground">
            Consulter et gérer votre annonce.
          </h2>
        </div>
        <Link href="/host/dashboard/publicite/add">
          <button className="group relative cursor-pointer hover:shadow-2xl inline-flex items-center gap-3 px-4 py-2 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-[#244B35] to-[#2c754b] shadow-lg ">
            <LucideIcons.Plus className="relative z-10 w-6 h-6" />
            <span className="relative z-10">Ajouter Propriété</span>
          </button>
        </Link>
      </div>
      {properties.length === 0 ? (
        <div className="text-center text-slate-500 dark:text-slate-400">
          Aucune propriété ajoutée pour le moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {properties.map((property: any) => (
            <div key={property.id}>
              <Link href={`/host/dashboard/publicite/${property.id}`}>
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
                          €{property.pricePerNight}
                        </span>
                        <span className="text-slate-600 text-sm"> / nuit</span>
                      </div>
                      <div className="text-sm text-slate-600">
                        {property.reviews} avis
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
