/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"

interface BookingCardProps {
  property: {
    pricePerNight: number
    aggregateRating: number
    ratingCount: number
  }
}

export function BookingCard({ property }: any) {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)
  const [nights, setNights] = useState(5)

  const subtotal = property.pricePerNight * nights
  const serviceFee = Math.round(subtotal * 0.14)
  const total = subtotal + serviceFee

  return (
    <div className="lg:sticky lg:top-8">
      <Card className="shadow-xl border-0 rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold">${property.pricePerNight}</span>
              <span className="text-gray-600">night</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-current text-black" />
              <span className="font-medium">{property.aggregateRating}</span>
              <span className="text-gray-600">({property.ratingCount})</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Date inputs */}
          <div className="grid grid-cols-2 gap-0 border rounded-lg overflow-hidden">
            <div className="p-3 border-r">
              <Label htmlFor="checkin" className="text-xs font-semibold uppercase tracking-wide">
                Check-in
              </Label>
              <Input
                id="checkin"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border-0 p-0 text-sm font-medium focus-visible:ring-0"
                placeholder="Add date"
              />
            </div>
            <div className="p-3">
              <Label htmlFor="checkout" className="text-xs font-semibold uppercase tracking-wide">
                Check-out
              </Label>
              <Input
                id="checkout"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border-0 p-0 text-sm font-medium focus-visible:ring-0"
                placeholder="Add date"
              />
            </div>
          </div>

          {/* Guests selector */}
          <div className="border rounded-lg p-3">
            <Label htmlFor="guests" className="text-xs font-semibold uppercase tracking-wide">
              Guests
            </Label>
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border-0 p-0 text-sm font-medium bg-transparent focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} guest{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Reserve button */}
          <Button
            className="w-full bg-[#244B35] hover:bg-[#E00007] text-white font-semibold py-3 rounded-lg text-base"
            size="lg"
          >
            Reserve
          </Button>

          <p className="text-center text-sm text-gray-600">You won&apos;t be charged yet</p>

          {/* Price breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="underline">
                ${property.pricePerNight} × {nights} nights
              </span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="underline">Service fee</span>
              <span>${serviceFee}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
