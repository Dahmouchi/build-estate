/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma";
import { ReservationStatus } from "@prisma/client";

// PATCH - Update reservation status
export async function PATCH(
  req: NextRequest, 
   { params }: { params: Promise<{ id: any }>; }) {
  try {
    const { status } = await req.json()
    const resId = (await params).id;

    if (!Object.values(ReservationStatus).includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 })
    }

    const reservation = await prisma.reservation.update({
      where: { id: resId },
      data: { status },
    })

    return NextResponse.json({ success: true, data: reservation })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Failed to update reservation" }, { status: 500 })
  }
}
