/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";

function withCors(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*") // or restrict to your domain
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  return res
}

// Handle preflight (OPTIONS request)
export async function OPTIONS() {
  return withCors(NextResponse.json({}, { status: 200 }))
}

// POST - Create new reservation
export async function POST(req: Request) {
  try {
    const data = await req.json()
    const reservation = await prisma.reservation.create({ data })
    return withCors(NextResponse.json({ success: true, data: reservation }))
  } catch (error) {
    return withCors(NextResponse.json({ success: false, error: "Failed to create reservation" }, { status: 500 }))
  }
}

// GET - Fetch reservations
export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({ orderBy: { createdAt: "desc" } })
    return withCors(NextResponse.json({ success: true, data: reservations }))
  } catch (error) {
    return withCors(NextResponse.json({ success: false, error: "Failed to fetch reservations" }, { status: 500 }))
  }
}

