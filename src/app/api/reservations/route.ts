/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";


// POST - Create new reservation
export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      projectType,
      message,
      city,
      objectives,
      surface,
      link,
    } = await req.json()

    const reservation = await prisma.reservation.create({
      data: {
        name,
        email,
        phone,
        projectType,
        message,
        city,
        objectives,
        surface,
        link,
      },
    })

    return NextResponse.json({ success: true, data: reservation })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Failed to create reservation" }, { status: 500 })
  }
}

// GET - Get all reservations
export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ success: true, data: reservations })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch reservations" }, { status: 500 })
  }
}
