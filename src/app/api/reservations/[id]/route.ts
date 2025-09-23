import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";
import { ReservationStatus } from "@prisma/client";

// PATCH - Update reservation status
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json()

    if (!Object.values(ReservationStatus).includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 })
    }

    const reservation = await prisma.reservation.update({
      where: { id: params.id },
      data: { status },
    })

    return NextResponse.json({ success: true, data: reservation })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Failed to update reservation" }, { status: 500 })
  }
}
