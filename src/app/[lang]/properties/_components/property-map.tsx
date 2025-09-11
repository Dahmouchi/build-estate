/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface PropertyMapProps {
  property: {
    city: string
    country: string
    googleMapsUrl: string
    latitude?: number
    longitude?: number
  }
}

export function PropertyMap({ property }: any) {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Where you&apos;ll be</h3>

      <Card className="overflow-hidden">
        <div className="mb-3 rounded overflow-hidden   w-full">
            <iframe
              className="w-full rounded-xl"
              src={property.googleMapsUrl}
              width={600}
              height={450}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-2">
            {property.city}, {property.country}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            This area is known for its stunning coastal views and vibrant local culture. You&apos;ll find excellent
            restaurants, beautiful beaches, and plenty of outdoor activities nearby.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
