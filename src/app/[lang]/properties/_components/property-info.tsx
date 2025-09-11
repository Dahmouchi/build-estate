/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, Bed, Bath } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useMemo } from "react";

interface PropertyInfoProps {
  property: {
    title: string;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    maxGuests: number;
    type: string;
    description: string;
    amenities: Array<{ name: string; icon: string }>;
    owner: {
      name: string;
      avatar: string;
      joinedYear: string;
    };
    reviews: Array<{
      id: string;
      rating: number;
      comment: string;
      author: string;
      date: string;
      avatar: string;
    }>;
    aggregateRating: number;
    ratingCount: number;
  };
}

export function PropertyInfo({ property }: any) {
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
    <div className="space-y-8">
      {/* Property basics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {property.type} hosted by {property.owner.name}
            </h2>
            <div className="flex items-center gap-4 text-gray-600 mt-1">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {property.maxGuests} guests
              </span>
              <span className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                {property.bedrooms} bedrooms
              </span>
              <span className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                {property.bathrooms} bathrooms
              </span>
            </div>
          </div>
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={property.owner.avatar || "/placeholder.svg"}
              alt={property.owner.name}
            />
            <AvatarFallback>{property.owner.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <Separator />
      </div>

      {/* Description */}
      <div>
        <p className="text-gray-700 leading-relaxed text-pretty">
          {property.description}
        </p>
      </div>

      <Separator />

      {/* Amenities */}
      <div>
  <h3 className="text-xl font-semibold text-gray-900 mb-4">
    What this place offers
  </h3>

  {/* Amenities */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
    {property.amenities.map((amenity: any, index: number) => (
      <div key={index} className="flex items-center gap-3 py-2">
        <IconPreview name={amenity.amenity.icon} className="h-5 w-5" />
        <span className="text-xs">{amenity.amenity.name}</span>
      </div>
    ))}
  </div>

  {/* Services supplémentaires */}
  {property.services && property.services.length > 0 && (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-4">
        Services supplémentaires
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {property.services.map((service: any, index: number) => (
          <div key={index} className="flex items-center gap-3 py-2">
            <IconPreview name={service.service.icon} className="h-5 w-5" />
            <span className="text-xs">{service.service.name}</span>
          </div>
        ))}
      </div>
    </div>
  )}
</div>


      <Separator />

      {/* Reviews */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 fill-current text-black" />
          <span className="text-xl font-semibold">
            {property.aggregateRating}
          </span>
          <span className="text-gray-600">
            ({property.ratingCount} reviews)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {property.reviews.map((review: any) => (
            <div key={review.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.author}
                  />
                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{review.author}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed text-pretty">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
