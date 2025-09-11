/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Heart, Bed, Bath, Square } from "lucide-react";
import Header from "./Header";
import Link from "next/link";
import Map from "./Map";
import CitySearch, { CityOption } from "./CitySearch";

const PropertiesPage = ({ properties, dict }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [selectedType, setSelectedType] = useState("");
  const [priceRange, setPriceRange] = useState("");

const filteredProperties = properties.filter((p: any) => {
  // Filter by search (matches city, title, or id)
  const matchesSearch =
    searchQuery === "" ||
    p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase());

  // Filter by selected city (compare with label or value)
  const matchesCity =
    !selectedCity || 
    p.city.toLowerCase() === selectedCity.value.toLowerCase() || 
    p.city.toLowerCase() === selectedCity.label.toLowerCase();

  // Filter by property type
  const matchesType = selectedType === "" || p.type === selectedType;

  // Filter by price range
  let matchesPrice = true;
  if (priceRange) {
    if (priceRange === "0-1000000") matchesPrice = p.price < 1000000;
    if (priceRange === "1000000-2000000")
      matchesPrice = p.price >= 1000000 && p.price <= 2000000;
    if (priceRange === "2000000-3000000")
      matchesPrice = p.price >= 2000000 && p.price <= 3000000;
    if (priceRange === "3000000+") matchesPrice = p.price > 3000000;
  }

  return matchesSearch && matchesCity && matchesType && matchesPrice;
});

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
    <div className="w-full flex justify-center">
       <div className="w-4/5">
       <div className="bg-white border-b ">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-80 w-1/2">
              {" "}
              <CitySearch
                selectedCity={selectedCity}
                onCityChange={(city) => {
                  console.log(city)
                  setSelectedCity(city)
                }}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40 h-12 border-gray-200 rounded-lg">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="APARTMENT">Apartment</SelectItem>
                <SelectItem value="VILLA">Villa</SelectItem>
                <SelectItem value="HOUSE">House</SelectItem>
                <SelectItem value="office">Office</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-40 h-12 border-gray-200 rounded-lg">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1000000">Under 1M MAD</SelectItem>
                <SelectItem value="1000000-2000000">1-2M MAD</SelectItem>
                <SelectItem value="2000000-3000000">2-3M MAD</SelectItem>
                <SelectItem value="3000000+">Above 3M MAD</SelectItem>
              </SelectContent>
            </Select>
           
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col h-[calc(100vh-180px)]">
        {/* Map Section - Left Side */}
        <div className="lg:w-1/2 w-full relative lg:block hidden z-0">
          <div className="h-full  relative overflow-hidden p-4 rounded-xl">
            <Map properties={filteredProperties} selectedCity={selectedCity} />
          </div>
        </div>

        {/* Properties List - Right Side */}
        <div className="lg:w-1/2 w-full bg-white overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  Rental Properties
                </h2>
                <p className="text-[#244B35] text-sm">
                  {properties.length} properties found
                </p>
              </div>
              <Select defaultValue="newest">
                <SelectTrigger className="w-40 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Lowest Price</SelectItem>
                  <SelectItem value="price-high">Highest Price</SelectItem>
                  <SelectItem value="area">Largest Area</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 grid grid-cols-2 gap-2.5">
              {filteredProperties.map((property: any) => (
                <Card
                  key={property.id}
                  className="overflow-hidden hover:shadow-md transition-shadow border-gray-100 py-0"
                >
                  <div className="relative w-full h-48">
                    <img
                      src={property.images[0] || "/placeholder.png"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white w-8 h-8 p-0 rounded-full"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    {property.featured && (
                      <Badge className="absolute bottom-2 left-2 bg-[#244B35] text-white text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold text-gray-800 text-base mb-1 line-clamp-1">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{property.city}</span>
                      </div>
                    </div>

                    <div className="text-lg font-bold text-gray-800 mb-2">
                      {property.price}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        <span>{property.area}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 text-xs"
                      >
                        {property.type}
                      </Badge>
                      <Link href={""}>
                        <Button
                          size="sm"
                          className="bg-[#244B35] hover:bg-[#E09B6B] text-white text-xs px-3"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
     </div>
    </div>
    </div>
  );
};
export default PropertiesPage;
