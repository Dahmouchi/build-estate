/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";


function cors(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "http://localhost:3000")
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  return res
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 200 }))
}

export async function POST(req: Request) {
  const data = await req.json()
  const reservation = await prisma.reservation.create({ data })
  return cors(NextResponse.json(reservation))
}

// GET - Fetch reservations
