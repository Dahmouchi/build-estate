"use server";

import prisma from "@/lib/prisma";
import { AppointmentStatus } from "@prisma/client";


// ✅ Create Appointment
export async function createAppointment(data: {
  propertyId: string;
  scheduledAt: Date | string;
  notes?: string;
  status?: AppointmentStatus;
}) {
  return await prisma.matterportAppointment.create({
    data: {
      propertyId: data.propertyId,
      scheduledAt: new Date(data.scheduledAt),
      notes: data.notes || null,
      status: data.status || "PENDING",
    },
  });
}

// ✅ Get All Appointments
export async function getAppointments() {
  return await prisma.matterportAppointment.findMany({
    include: { property: {
        include:{
            owner:true,
        }
    } },
    orderBy: { scheduledAt: "asc" },
  });
}

// ✅ Get Appointment by ID
export async function getAppointmentById(id: string) {
  return await prisma.matterportAppointment.findUnique({
    where: { id },
    include: { property: true },
  });
}

// ✅ Update Appointment
export async function updateAppointment(
  id: string,
  data: {
    scheduledAt?: Date | string;
    status?: AppointmentStatus;
    notes?: string;
  }
) {
  return await prisma.matterportAppointment.update({
    where: { id },
    data: {
      ...(data.scheduledAt && { scheduledAt: new Date(data.scheduledAt) }),
      ...(data.status && { status: data.status }),
      ...(data.notes && { notes: data.notes }),
    },
  });
}

// ✅ Delete Appointment
export async function deleteAppointment(id: string) {
  return await prisma.matterportAppointment.delete({
    where: { id },
  });
}
